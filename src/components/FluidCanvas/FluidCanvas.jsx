import { useEffect, useRef, useCallback } from 'react';

const CURSOR_CONFIG = {
    SIM_RESOLUTION: 64,
    DYE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 3.5,      // Lower = longer lasting effect
    VELOCITY_DISSIPATION: 2.0,     // Lower = smoother trails
    PRESSURE: 0.15,
    PRESSURE_ITERATIONS: 15,
    CURL: 2.0,
    SPLAT_RADIUS: 0.18,            // Larger splats
    SPLAT_FORCE: 4500,             // Stronger force
    SHADING: false,
    COLOR_UPDATE_SPEED: 8
};

const FluidCanvas = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const glRef = useRef(null);
    const extRef = useRef(null);
    const pointersRef = useRef([]);
    const programsRef = useRef({});
    const fbosRef = useRef({});
    const isMobileRef = useRef(false);
    const lastUpdateTimeRef = useRef(Date.now());
    const colorUpdateTimerRef = useRef(0);
    const blitRef = useRef(null);

    const pointerPrototype = useCallback(() => ({
        id: -1,
        texcoordX: 0,
        texcoordY: 0,
        prevTexcoordX: 0,
        prevTexcoordY: 0,
        deltaX: 0,
        deltaY: 0,
        down: false,
        moved: false,
        color: { r: 0, g: 0, b: 0 }
    }), []);

    const scaleByPixelRatio = useCallback((input) => {
        const pixelRatio = window.devicePixelRatio || 1;
        return Math.floor(input * pixelRatio);
    }, []);

    const HSVtoRGB = useCallback((h, s, v) => {
        let r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
            default: break;
        }
        return { r, g, b };
    }, []);

    const generateColor = useCallback(() => {
        let c = HSVtoRGB(Math.random(), 1.0, 1.0);  // Full saturation & brightness
        c.r *= 0.25;  // More visible intensity
        c.g *= 0.25;
        c.b *= 0.25;
        return c;
    }, [HSVtoRGB]);

    const wrap = useCallback((value, min, max) => {
        const range = max - min;
        if (range === 0) return min;
        return ((value - min) % range) + min;
    }, []);

    const getResolution = useCallback((resolution) => {
        const gl = glRef.current;
        if (!gl) return { width: resolution, height: resolution };
        let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
        if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
        const min = Math.round(resolution);
        const max = Math.round(resolution * aspectRatio);
        if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
        return { width: min, height: max };
    }, []);

    const compileShader = useCallback((type, source, keywords) => {
        const gl = glRef.current;
        if (!keywords) keywords = [];
        let keywordsString = '';
        keywords.forEach(keyword => {
            keywordsString += '#define ' + keyword + '\n';
        });
        source = keywordsString + source;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }, []);

    const createProgram = useCallback((vertexShader, fragmentShader) => {
        const gl = glRef.current;
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.bindAttribLocation(program, 0, 'aPosition');
        gl.linkProgram(program);
        return program;
    }, []);

    const getUniforms = useCallback((program) => {
        const gl = glRef.current;
        let uniforms = {};
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            let uniformName = gl.getActiveUniform(program, i).name;
            uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
    }, []);

    const correctRadius = useCallback((radius) => {
        const canvas = canvasRef.current;
        if (!canvas) return radius;
        let aspectRatio = canvas.width / canvas.height;
        if (aspectRatio > 1) radius *= aspectRatio;
        return radius;
    }, []);

    const correctDeltaX = useCallback((delta) => {
        const canvas = canvasRef.current;
        if (!canvas) return delta;
        let aspectRatio = canvas.width / canvas.height;
        if (aspectRatio < 1) delta *= aspectRatio;
        return delta;
    }, []);

    const correctDeltaY = useCallback((delta) => {
        const canvas = canvasRef.current;
        if (!canvas) return delta;
        let aspectRatio = canvas.width / canvas.height;
        if (aspectRatio > 1) delta /= aspectRatio;
        return delta;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        isMobileRef.current = window.matchMedia('(max-width: 768px)').matches ||
            /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

        if (isMobileRef.current) return;

        pointersRef.current = [pointerPrototype()];

        const params = {
            alpha: true,
            depth: false,
            stencil: false,
            antialias: false,
            preserveDrawingBuffer: false
        };

        let gl = canvas.getContext('webgl2', params);
        const isWebGL2 = !!gl;
        if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);

        if (!gl) return;

        glRef.current = gl;

        let halfFloat;
        let supportLinearFiltering;
        if (isWebGL2) {
            gl.getExtension('EXT_color_buffer_float');
            supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
        } else {
            halfFloat = gl.getExtension('OES_texture_half_float');
            supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
        }
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat?.HALF_FLOAT_OES;

        const getSupportedFormat = (internalFormat, format, type) => {
            const supportRenderTextureFormat = (internalFormat, format, type) => {
                const texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
                const fbo = gl.createFramebuffer();
                gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
                const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
                return status === gl.FRAMEBUFFER_COMPLETE;
            };

            if (!supportRenderTextureFormat(internalFormat, format, type)) {
                switch (internalFormat) {
                    case gl.R16F:
                        return getSupportedFormat(gl.RG16F, gl.RG, type);
                    case gl.RG16F:
                        return getSupportedFormat(gl.RGBA16F, gl.RGBA, type);
                    default:
                        return null;
                }
            }
            return { internalFormat, format };
        };

        let formatRGBA, formatRG, formatR;
        if (isWebGL2) {
            formatRGBA = getSupportedFormat(gl.RGBA16F, gl.RGBA, halfFloatTexType);
            formatRG = getSupportedFormat(gl.RG16F, gl.RG, halfFloatTexType);
            formatR = getSupportedFormat(gl.R16F, gl.RED, halfFloatTexType);
        } else {
            formatRGBA = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
            formatRG = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
            formatR = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
        }

        extRef.current = {
            formatRGBA,
            formatRG,
            formatR,
            halfFloatTexType,
            supportLinearFiltering
        };

        // Initialize shaders
        const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);

        const copyShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      void main () { gl_FragColor = texture2D(uTexture, vUv); }
    `);

        const clearShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main () { gl_FragColor = value * texture2D(uTexture, vUv); }
    `);

        const displayShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
      }
    `);

        const splatShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `);

        const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
      }
    `, supportLinearFiltering ? null : ['MANUAL_FILTERING']);

        const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) L = -C.x;
        if (vR.x > 1.0) R = -C.x;
        if (vT.y > 1.0) T = -C.y;
        if (vB.y < 0.0) B = -C.y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `);

        const curlShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `);

        const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `);

        const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `);

        const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `);

        // Create programs
        const createProgramObj = (vs, fs) => {
            const program = createProgram(vs, fs);
            return { program, uniforms: getUniforms(program), bind: () => gl.useProgram(program) };
        };

        programsRef.current = {
            copy: createProgramObj(baseVertexShader, copyShader),
            clear: createProgramObj(baseVertexShader, clearShader),
            splat: createProgramObj(baseVertexShader, splatShader),
            advection: createProgramObj(baseVertexShader, advectionShader),
            divergence: createProgramObj(baseVertexShader, divergenceShader),
            curl: createProgramObj(baseVertexShader, curlShader),
            vorticity: createProgramObj(baseVertexShader, vorticityShader),
            pressure: createProgramObj(baseVertexShader, pressureShader),
            gradientSubtract: createProgramObj(baseVertexShader, gradientSubtractShader),
            display: createProgramObj(baseVertexShader, displayShader)
        };

        // Setup blit
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        blitRef.current = (target, clear = false) => {
            if (target == null) {
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            } else {
                gl.viewport(0, 0, target.width, target.height);
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
            }
            if (clear) {
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        };

        // Create FBOs
        const createFBO = (w, h, internalFormat, format, type, param) => {
            gl.activeTexture(gl.TEXTURE0);
            let texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
            let fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            gl.viewport(0, 0, w, h);
            gl.clear(gl.COLOR_BUFFER_BIT);
            return {
                texture, fbo, width: w, height: h,
                texelSizeX: 1.0 / w, texelSizeY: 1.0 / h,
                attach: (id) => { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; }
            };
        };

        const createDoubleFBO = (w, h, internalFormat, format, type, param) => {
            let fbo1 = createFBO(w, h, internalFormat, format, type, param);
            let fbo2 = createFBO(w, h, internalFormat, format, type, param);
            return {
                width: w, height: h, texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY,
                get read() { return fbo1; }, set read(v) { fbo1 = v; },
                get write() { return fbo2; }, set write(v) { fbo2 = v; },
                swap() { let temp = fbo1; fbo1 = fbo2; fbo2 = temp; }
            };
        };

        const initFramebuffers = () => {
            const ext = extRef.current;
            const simRes = getResolution(CURSOR_CONFIG.SIM_RESOLUTION);
            const dyeRes = getResolution(CURSOR_CONFIG.DYE_RESOLUTION);
            const texType = ext.halfFloatTexType;
            const rgba = ext.formatRGBA;
            const rg = ext.formatRG;
            const r = ext.formatR;
            const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
            gl.disable(gl.BLEND);

            fbosRef.current.dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
            fbosRef.current.velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
            fbosRef.current.divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
            fbosRef.current.curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
            fbosRef.current.pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        };

        initFramebuffers();

        // Animation loop
        const splat = (x, y, dx, dy, color) => {
            const { splat: splatProgram } = programsRef.current;
            const { velocity, dye } = fbosRef.current;
            splatProgram.bind();
            gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
            gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
            gl.uniform2f(splatProgram.uniforms.point, x, y);
            gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
            gl.uniform1f(splatProgram.uniforms.radius, correctRadius(CURSOR_CONFIG.SPLAT_RADIUS / 100.0));
            blitRef.current(velocity.write);
            velocity.swap();
            gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
            gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
            blitRef.current(dye.write);
            dye.swap();
        };

        const step = (dt) => {
            const progs = programsRef.current;
            const fbos = fbosRef.current;
            gl.disable(gl.BLEND);

            progs.curl.bind();
            gl.uniform2f(progs.curl.uniforms.texelSize, fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
            gl.uniform1i(progs.curl.uniforms.uVelocity, fbos.velocity.read.attach(0));
            blitRef.current(fbos.curl);

            progs.vorticity.bind();
            gl.uniform2f(progs.vorticity.uniforms.texelSize, fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
            gl.uniform1i(progs.vorticity.uniforms.uVelocity, fbos.velocity.read.attach(0));
            gl.uniform1i(progs.vorticity.uniforms.uCurl, fbos.curl.attach(1));
            gl.uniform1f(progs.vorticity.uniforms.curl, CURSOR_CONFIG.CURL);
            gl.uniform1f(progs.vorticity.uniforms.dt, dt);
            blitRef.current(fbos.velocity.write);
            fbos.velocity.swap();

            progs.divergence.bind();
            gl.uniform2f(progs.divergence.uniforms.texelSize, fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
            gl.uniform1i(progs.divergence.uniforms.uVelocity, fbos.velocity.read.attach(0));
            blitRef.current(fbos.divergence);

            progs.clear.bind();
            gl.uniform1i(progs.clear.uniforms.uTexture, fbos.pressure.read.attach(0));
            gl.uniform1f(progs.clear.uniforms.value, CURSOR_CONFIG.PRESSURE);
            blitRef.current(fbos.pressure.write);
            fbos.pressure.swap();

            progs.pressure.bind();
            gl.uniform2f(progs.pressure.uniforms.texelSize, fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
            gl.uniform1i(progs.pressure.uniforms.uDivergence, fbos.divergence.attach(0));
            for (let i = 0; i < CURSOR_CONFIG.PRESSURE_ITERATIONS; i++) {
                gl.uniform1i(progs.pressure.uniforms.uPressure, fbos.pressure.read.attach(1));
                blitRef.current(fbos.pressure.write);
                fbos.pressure.swap();
            }

            progs.gradientSubtract.bind();
            gl.uniform2f(progs.gradientSubtract.uniforms.texelSize, fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
            gl.uniform1i(progs.gradientSubtract.uniforms.uPressure, fbos.pressure.read.attach(0));
            gl.uniform1i(progs.gradientSubtract.uniforms.uVelocity, fbos.velocity.read.attach(1));
            blitRef.current(fbos.velocity.write);
            fbos.velocity.swap();

            progs.advection.bind();
            gl.uniform2f(progs.advection.uniforms.texelSize, fbos.velocity.texelSizeX, fbos.velocity.texelSizeY);
            let velocityId = fbos.velocity.read.attach(0);
            gl.uniform1i(progs.advection.uniforms.uVelocity, velocityId);
            gl.uniform1i(progs.advection.uniforms.uSource, velocityId);
            gl.uniform1f(progs.advection.uniforms.dt, dt);
            gl.uniform1f(progs.advection.uniforms.dissipation, CURSOR_CONFIG.VELOCITY_DISSIPATION);
            blitRef.current(fbos.velocity.write);
            fbos.velocity.swap();

            gl.uniform1i(progs.advection.uniforms.uVelocity, fbos.velocity.read.attach(0));
            gl.uniform1i(progs.advection.uniforms.uSource, fbos.dye.read.attach(1));
            gl.uniform1f(progs.advection.uniforms.dissipation, CURSOR_CONFIG.DENSITY_DISSIPATION);
            blitRef.current(fbos.dye.write);
            fbos.dye.swap();
        };

        const render = () => {
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
            programsRef.current.display.bind();
            gl.uniform1i(programsRef.current.display.uniforms.uTexture, fbosRef.current.dye.read.attach(0));
            blitRef.current(null);
        };

        const resizeCanvas = () => {
            let width = scaleByPixelRatio(canvas.clientWidth);
            let height = scaleByPixelRatio(canvas.clientHeight);
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                return true;
            }
            return false;
        };

        const updateFrame = () => {
            let now = Date.now();
            let dt = (now - lastUpdateTimeRef.current) / 1000;
            dt = Math.min(dt, 0.016666);
            lastUpdateTimeRef.current = now;

            if (resizeCanvas()) initFramebuffers();

            colorUpdateTimerRef.current += dt * CURSOR_CONFIG.COLOR_UPDATE_SPEED;
            if (colorUpdateTimerRef.current >= 1) {
                colorUpdateTimerRef.current = wrap(colorUpdateTimerRef.current, 0, 1);
                pointersRef.current.forEach(p => { p.color = generateColor(); });
            }

            pointersRef.current.forEach(p => {
                if (p.moved) {
                    p.moved = false;
                    let dx = p.deltaX * CURSOR_CONFIG.SPLAT_FORCE;
                    let dy = p.deltaY * CURSOR_CONFIG.SPLAT_FORCE;
                    splat(p.texcoordX, p.texcoordY, dx, dy, p.color);
                }
            });

            step(dt);
            render();
            animationRef.current = requestAnimationFrame(updateFrame);
        };

        updateFrame();

        // Event listeners
        const updatePointerMoveData = (pointer, posX, posY, color) => {
            pointer.prevTexcoordX = pointer.texcoordX;
            pointer.prevTexcoordY = pointer.texcoordY;
            pointer.texcoordX = posX / canvas.width;
            pointer.texcoordY = 1.0 - posY / canvas.height;
            pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
            pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
            pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
            pointer.color = color;
        };

        const updatePointerDownData = (pointer, id, posX, posY) => {
            pointer.id = id;
            pointer.down = true;
            pointer.moved = false;
            pointer.texcoordX = posX / canvas.width;
            pointer.texcoordY = 1.0 - posY / canvas.height;
            pointer.prevTexcoordX = pointer.texcoordX;
            pointer.prevTexcoordY = pointer.texcoordY;
            pointer.deltaX = 0;
            pointer.deltaY = 0;
            pointer.color = generateColor();
        };

        const handleMouseMove = (e) => {
            let pointer = pointersRef.current[0];
            let posX = scaleByPixelRatio(e.clientX);
            let posY = scaleByPixelRatio(e.clientY);
            updatePointerMoveData(pointer, posX, posY, pointer.color);
        };

        const handleMouseDown = (e) => {
            let pointer = pointersRef.current[0];
            let posX = scaleByPixelRatio(e.clientX);
            let posY = scaleByPixelRatio(e.clientY);
            updatePointerDownData(pointer, -1, posX, posY);
            const color = generateColor();
            color.r *= 10.0; color.g *= 10.0; color.b *= 10.0;
            splat(pointer.texcoordX, pointer.texcoordY, 10 * (Math.random() - 0.5), 30 * (Math.random() - 0.5), color);
        };

        const handleTouchMove = (e) => {
            const touches = e.targetTouches;
            let pointer = pointersRef.current[0];
            for (let i = 0; i < touches.length; i++) {
                let posX = scaleByPixelRatio(touches[i].clientX);
                let posY = scaleByPixelRatio(touches[i].clientY);
                updatePointerMoveData(pointer, posX, posY, pointer.color);
            }
        };

        const handleTouchStart = (e) => {
            const touches = e.targetTouches;
            let pointer = pointersRef.current[0];
            for (let i = 0; i < touches.length; i++) {
                let posX = scaleByPixelRatio(touches[i].clientX);
                let posY = scaleByPixelRatio(touches[i].clientY);
                updatePointerDownData(pointer, touches[i].identifier, posX, posY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('touchmove', handleTouchMove, false);
        window.addEventListener('touchstart', handleTouchStart);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchStart);
        };
    }, [pointerPrototype, scaleByPixelRatio, generateColor, wrap, getResolution, compileShader, createProgram, getUniforms, correctRadius, correctDeltaX, correctDeltaY, HSVtoRGB]);

    if (typeof window !== 'undefined' && (window.matchMedia('(max-width: 768px)').matches || /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent))) {
        return null;
    }

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none', width: '100%', height: '100%', opacity: 0.22 }}>
            <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh', display: 'block', background: 'transparent' }} />
        </div>
    );
};

export default FluidCanvas;

