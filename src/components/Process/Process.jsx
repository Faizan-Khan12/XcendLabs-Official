import styles from './Process.module.css';

const steps = [
    {
        title: 'Deep Diagnosis',
        description: 'We map bottlenecks and quantify impact using data, not guesses.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
        )
    },
    {
        title: 'Automation Setup',
        description: 'We implement workflows that actually move revenue, then integrate.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        )
    },
    {
        title: 'Profit Optimization',
        description: 'We cut waste, scale winners, and keep improving with experiments.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18" />
                <path d="M7 12c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5" />
            </svg>
        )
    }
];

const Process = () => {
    return (
        <section id="process" className={`${styles.process} section theme-b`}>
            <div className={styles.container}>
                <div className="center mb-20">
                    <span className={`${styles.eyebrow} scroll-reveal`}>Process</span>
                </div>
                <h2 className={`${styles.sectionTitle} scroll-reveal`}>
                    Our simple 3‑step path to results
                </h2>
                <div className={styles.stepsGrid}>
                    {steps.map((step, index) => (
                        <article key={index} className={styles.card}>
                            <div className={styles.icon} aria-hidden="true">
                                {step.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{step.title}</h3>
                            <p className={styles.cardDesc}>{step.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
