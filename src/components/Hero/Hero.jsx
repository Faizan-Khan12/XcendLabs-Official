import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section id="home" className={`${styles.hero} section theme-a`}>
            <div className={styles.container}>
                <div className="mb-24">
                    <span className={styles.eyebrow}>Automate. Scale. Dominate.</span>
                </div>
                <h1 className={styles.title}>
                    We build <strong className={styles.highlight}>AI systems</strong> that remove bottlenecks and drive profit.
                </h1>
                <p className={styles.lead}>
                    From intelligent workflows to conversion‑first web experiences, we ship fast, measurable outcomes - not just deliverables.
                </p>
                <div className={styles.cta}>
                    <a className="btn btn-primary" href="https://calendly.com/xcendlabs/30min">
                        Start Your Transformation
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
