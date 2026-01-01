import styles from './WhyUs.module.css';

const otherAgencies = [
    'Generic, one‑size‑fits‑all packages',
    'Slow delivery and stale playbooks',
    'Minimal automation; heavy manual work',
    'Reactive comms, limited ownership',
    'Vague metrics, weak ROI'
];

const xcendLabsAdvantages = [
    'Custom AI‑driven systems for your stack',
    'Lightning‑fast shipping and iteration',
    'End‑to‑end automation for real efficiency',
    'Proactive communication and ownership',
    'Clear KPIs, measurable ROI'
];

const WhyUs = () => {
    return (
        <section id="why" className={`${styles.whyUs} section theme-c`}>
            <div className={styles.container}>
                <h2 className={`${styles.sectionTitle} scroll-reveal`}>
                    Raising the Bar for Business Growth
                </h2>
                <p className={`${styles.sectionDesc} scroll-reveal`}>
                    What sets us apart - beyond pretty decks.
                </p>
                <div className={styles.compare}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Other Agencies</h3>
                        <ul className={styles.list}>
                            {otherAgencies.map((item, index) => (
                                <li key={index} className={`${styles.listItem} ${styles.isBad}`}>
                                    <span className={`${styles.mark} ${styles.markBad}`}>✕</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`${styles.card} ${styles.cardHighlight}`}>
                        <h3 className={`${styles.cardTitle} ${styles.cardTitleHighlight}`}>XcendLabs</h3>
                        <ul className={styles.list}>
                            {xcendLabsAdvantages.map((item, index) => (
                                <li key={index} className={`${styles.listItem} ${styles.isGood}`}>
                                    <span className={`${styles.mark} ${styles.markGood}`}>✔</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
