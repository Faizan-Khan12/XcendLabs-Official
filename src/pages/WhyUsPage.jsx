import { XCircle, CheckCircle, X, Check } from 'lucide-react';
import styles from './WhyUsPage.module.css';

const comparison = {
    others: [
        'Generic solutions that don\'t fit',
        'Slow turnaround times',
        'Communication gaps',
        'Focus on deliverables, not outcomes',
        'Cookie-cutter strategies',
        'Unpredictable pricing',
    ],
    xcendlabs: [
        'Custom solutions for your business',
        'Fast, agile delivery',
        'Dedicated team & transparent updates',
        'Revenue-first approach',
        'Data-driven, tailored strategies',
        'Clear, upfront pricing',
    ],
};

const process = [
    {
        step: '01',
        title: 'Deep Diagnosis',
        desc: 'We analyze your current systems, identify bottlenecks, and map out opportunities for automation and growth.',
    },
    {
        step: '02',
        title: 'Strategic Planning',
        desc: 'We create a custom roadmap with prioritized initiatives based on impact and effort.',
    },
    {
        step: '03',
        title: 'Rapid Execution',
        desc: 'Our team implements solutions quickly with weekly updates and collaborative refinement.',
    },
    {
        step: '04',
        title: 'Optimize & Scale',
        desc: 'We continuously monitor, test, and improve to maximize your ROI.',
    },
];

const WhyUsPage = () => {
    return (
        <main className={styles.page}>
            <section className={`section theme-a ${styles.hero}`}>
                <div className="container">
                    <span className={styles.eyebrow}>Why XcendLabs</span>
                    <h1>Built Different</h1>
                    <p className={styles.lead}>
                        We don't just deliver — we partner with you to drive real business outcomes.
                    </p>
                </div>
            </section>

            <div className="divider"></div>

            <section className={`section ${styles.comparisonSection}`}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>The XcendLabs Difference</h2>
                    <div className={styles.comparisonGrid}>
                        <div className={styles.comparisonCard}>
                            <h3 className={styles.cardTitleBad}><XCircle size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Other Agencies</h3>
                            <ul className={styles.list}>
                                {comparison.others.map((item, i) => (
                                    <li key={i}>
                                        <span className={styles.bad}><X size={16} /></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`${styles.comparisonCard} ${styles.highlight}`}>
                            <h3 className={styles.cardTitleGood}><CheckCircle size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> XcendLabs</h3>
                            <ul className={styles.list}>
                                {comparison.xcendlabs.map((item, i) => (
                                    <li key={i}>
                                        <span className={styles.good}><Check size={16} /></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            <section className={`section theme-b ${styles.processSection}`}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Our Process</h2>
                    <p className={styles.sectionDesc}>A proven 4-step approach to transform your business</p>
                    <div className={styles.processGrid}>
                        {process.map((item, i) => (
                            <div key={i} className={styles.processCard}>
                                <span className={styles.stepNumber}>{item.step}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`section theme-c ${styles.ctaSection}`}>
                <div className="container">
                    <div className={styles.cta}>
                        <h2>See the Difference Yourself</h2>
                        <p>Book a call and experience our approach firsthand.</p>
                        <a href="https://calendly.com/xcendlabs/30min" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            Book Your Strategy Call →
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default WhyUsPage;
