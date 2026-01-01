import styles from './Services.module.css';

const services = [
    {
        title: 'AI Automation',
        description: 'Custom workflows that eliminate repetitive tasks, boost efficiency, and unlock new capacity.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="10" rx="4" />
                <path d="M12 2v3M8 22h8" />
                <circle cx="8" cy="13" r="1.5" />
                <circle cx="16" cy="13" r="1.5" />
            </svg>
        )
    },
    {
        title: 'Web Development',
        description: 'High‑performance, responsive sites engineered for speed, SEO, and conversions.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        )
    },
    {
        title: 'Performance Marketing',
        description: 'Data‑driven campaigns across channels that optimize for real results and scalable growth.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
        )
    },
    {
        title: 'Email Marketing',
        description: 'Lifecycle sequences and campaigns that nurture, close, and retain at scale.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16v16H4z" />
                <path d="m22 6-10 7L2 6" />
            </svg>
        )
    },
    {
        title: 'Social Media Management',
        description: 'Strategy + content systems to grow brand and pipeline across platforms.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.59 13.51 15.42 17.5M15.41 6.5 8.59 10.49" />
            </svg>
        )
    },
    {
        title: 'Growth Acceleration',
        description: 'Data‑driven experimentation to cut waste, scale winners, and lift ROI.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2 3 14h7l-1 8 11-12h-7l1-8z" />
            </svg>
        )
    }
];

const Services = () => {
    return (
        <section id="services" className={`${styles.services} section theme-b`}>
            <div className={styles.container}>
                <h2 className={`${styles.sectionTitle} scroll-reveal`}>Our Services</h2>
                <p className={`${styles.sectionDesc} scroll-reveal`}>
                    Cutting‑edge solutions designed to elevate your business.
                </p>
                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <article key={index} className={styles.card}>
                            <div className={styles.icon} aria-hidden="true">
                                {service.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
