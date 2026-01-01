import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Monitor, BarChart3, Rocket, XCircle, CheckCircle, Check, Star } from 'lucide-react';
import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import WhatsAppModal from '../components/WhatsAppModal/WhatsAppModal';
import styles from './Home.module.css';

// ... (existing data arrays: services, whyUsPoints, testimonials, team) ...

// Services data
const services = [
    {
        title: 'AI Automation',
        desc: 'Eliminate repetitive tasks and scale your operations with intelligent automation systems that work around the clock.',
        features: ['Custom AI chatbots', 'Workflow automation', 'Document processing', 'Email automation'],
        icon: <Bot size={28} />,
    },
    {
        title: 'Web Development',
        desc: 'High-performance, conversion-optimized websites that turn visitors into customers.',
        features: ['React/Next.js apps', 'E-commerce solutions', 'Landing pages', 'API integrations'],
        icon: <Monitor size={28} />,
    },
    {
        title: 'Performance Marketing',
        desc: 'Data-driven advertising strategies that maximize your ROI across all digital channels.',
        features: ['Google & Meta Ads', 'Conversion optimization', 'Analytics setup', 'Retargeting campaigns'],
        icon: <BarChart3 size={28} />,
    },
    {
        title: 'Growth Acceleration',
        desc: 'Comprehensive growth strategies that combine all channels for exponential business scaling.',
        features: ['Growth audits', 'Funnel optimization', 'Revenue operations', 'Customer acquisition'],
        icon: <Rocket size={28} />,
    },
];

// Why Us comparison
const whyUsPoints = [
    { us: 'Custom solutions for your business', others: 'Generic templates that don\'t fit' },
    { us: 'Revenue-first approach', others: 'Focus on deliverables, not outcomes' },
    { us: 'Fast, agile delivery', others: 'Slow turnaround times' },
    { us: 'Dedicated team & transparent updates', others: 'Communication gaps' },
];

// Testimonials Data: Client reviews and success stories
const testimonials = [
    {
        name: 'Sarah Mitchell',
        role: 'CEO, TechStart Inc.',
        text: 'XcendLabs transformed our entire sales process with AI automation. We\'re now closing deals 3x faster with half the manual work.',
        avatar: 'SM',
    },
    {
        name: 'Michael Chen',
        role: 'Founder, GrowthHub',
        text: 'The website they built for us isn\'t just beautiful — it converts. Our lead generation increased by 180% in the first month.',
        avatar: 'MC',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Marketing Director, Scale Co.',
        text: 'What sets XcendLabs apart is their strategic thinking. They challenge our assumptions and push us toward better solutions.',
        avatar: 'ER',
    },
    {
        name: 'David Kim',
        role: 'COO, Fintech Solutions',
        text: 'Their AI automation saved us 20+ hours per week in manual data entry alone. Game-changing results.',
        avatar: 'DK',
    },
];

// Team Members Data: Founder, Engineer, and Strategist
const team = [
    {
        name: 'Sharib Sufi',
        role: 'Founder',
        bio: 'Visionary leader with 10+ years in AI and automation.',
        avatar: 'SS',
    },
    {
        name: 'Waris Rawa',
        role: 'Engineer',
        bio: 'Full-stack expert specializing in high-performance web apps.',
        avatar: 'WR',
    },
    {
        name: 'Faizan Khan',
        role: 'Growth Strategist',
        bio: 'Data-driven marketer who has helped 50+ companies scale.',
        avatar: 'FK',
    },
];

const Home = () => {
    const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

    return (
        <main>
            <Hero />
            <div className="divider"></div>

            <Stats />
            <div className="divider"></div>

            {/* Services Section */}
            <section id="services" className={`section theme-b ${styles.servicesSection}`}>
                <div className="container">
                    <span className={styles.eyebrow}>Our Services</span>
                    <h2 className={styles.sectionTitle}>What We Do</h2>
                    <p className={styles.sectionDesc}>
                        End-to-end digital solutions to scale your business — from AI automation to growth marketing.
                    </p>
                    <div className={styles.servicesGrid}>
                        {services.map((service, i) => (
                            <div key={i} className={styles.serviceCard}>
                                <span className={styles.serviceIcon}>{service.icon}</span>
                                <h3>{service.title}</h3>
                                <p className={styles.serviceDesc}>{service.desc}</p>
                                <ul className={styles.serviceFeatures}>
                                    {service.features.map((f, j) => (
                                        <li key={j}><span className={styles.check}><Check size={16} /></span> {f}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <Link to="/services" className={`btn btn-primary ${styles.learnMoreBtn}`}>
                        View All Services →
                    </Link>
                </div>
            </section>
            <div className="divider"></div>

            {/* Why Us Section */}
            <section id="why-us" className={`section theme-c ${styles.whyUsSection}`}>
                <div className="container">
                    <span className={styles.eyebrow}>Why Choose Us</span>
                    <h2 className={styles.sectionTitle}>The XcendLabs Difference</h2>
                    <p className={styles.sectionDesc}>
                        We don't just deliver — we partner with you to drive real business outcomes.
                    </p>
                    <div className={styles.comparisonTable}>
                        <div className={styles.comparisonHeader}>
                            <span></span>
                            <span className={styles.headerOthers}><XCircle size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Other Agencies</span>
                            <span className={styles.headerUs}><CheckCircle size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> XcendLabs</span>
                        </div>
                        {whyUsPoints.map((point, i) => (
                            <div key={i} className={styles.comparisonRow}>
                                <span className={styles.rowNum}>{i + 1}</span>
                                <span className={styles.rowOthers}>{point.others}</span>
                                <span className={styles.rowUs}>{point.us}</span>
                            </div>
                        ))}
                    </div>
                    <Link to="/why-us" className={`btn btn-primary ${styles.learnMoreBtn}`}>
                        Learn More →
                    </Link>
                </div>
            </section>
            <div className="divider"></div>

            {/* Testimonials Section */}
            <section id="testimonials" className={`section theme-a ${styles.testimonialsSection}`}>
                <div className="container">
                    <span className={styles.eyebrow}>Testimonials</span>
                    <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
                    <p className={styles.sectionDesc}>
                        Real results from real businesses. Here's what partnering with XcendLabs looks like.
                    </p>
                    <div className={styles.testimonialsGrid}>
                        {testimonials.map((t, i) => (
                            <div key={i} className={styles.testimonialCard}>
                                <div className={styles.stars}><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                                <blockquote className={styles.quote}>"{t.text}"</blockquote>
                                <div className={styles.author}>
                                    <div className={styles.authorAvatar}>{t.avatar}</div>
                                    <div>
                                        <strong className={styles.authorName}>{t.name}</strong>
                                        <span className={styles.authorRole}>{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/testimonials" className={`btn btn-primary ${styles.learnMoreBtn}`}>
                        Read More Reviews →
                    </Link>
                </div>
            </section>
            <div className="divider"></div>

            {/* Team Section */}
            <section id="team" className={`section theme-b ${styles.teamSection}`}>
                <div className="container">
                    <span className={styles.eyebrow}>Our Team</span>
                    <h2 className={styles.sectionTitle}>Meet the Experts</h2>
                    <p className={styles.sectionDesc}>
                        A team of passionate technologists on a mission to help businesses thrive.
                    </p>
                    <div className={styles.teamGrid}>
                        {team.map((member, i) => (
                            <div key={i} className={styles.teamCard}>
                                <div className={styles.teamAvatar}>{member.avatar}</div>
                                <h3 className={styles.teamName}>{member.name}</h3>
                                <span className={styles.teamRole}>{member.role}</span>
                                <p className={styles.teamBio}>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                    <Link to="/about" className={`btn btn-primary ${styles.learnMoreBtn}`}>
                        Our Story →
                    </Link>
                </div>
            </section>
            <div className="divider"></div>

            {/* Final CTA Section: Includes Calendly, Email, and WhatsApp links */}
            <section className={`section theme-a ${styles.ctaSection}`}>
                <div className="container">
                    <div className={styles.ctaBand}>
                        <h2>Ready to scale?</h2>
                        <p className={styles.ctaDesc}>
                            Let's design and deploy the automations and digital systems that set you apart.
                        </p>
                        <div className={styles.ctaButtons}>
                            <a className="btn btn-primary" href="https://calendly.com/xcendlabs/30min" target="_blank" rel="noopener noreferrer">
                                Book a Call
                            </a>
                            <span className={styles.dividerText}>or</span>
                            <a href="mailto:hello@xcendlabs.com" className={`${styles.ctaBtn} ${styles.ctaBtnEmail}`}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                Email Us
                            </a>
                            <button
                                onClick={() => setIsWhatsAppModalOpen(true)}
                                className={`${styles.ctaBtn} ${styles.ctaBtnWhatsapp}`}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <WhatsAppModal isOpen={isWhatsAppModalOpen} onClose={() => setIsWhatsAppModalOpen(false)} />
        </main>
    );
};

export default Home;
