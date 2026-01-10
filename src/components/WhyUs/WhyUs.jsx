import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import styles from './WhyUs.module.css';

const comparisonData = [
    {
        bad: 'Generic, one‑size‑fits‑all packages',
        good: 'Custom AI‑driven systems for your stack'
    },
    {
        bad: 'Slow delivery and stale playbooks',
        good: 'Lightning‑fast shipping and iteration'
    },
    {
        bad: 'Minimal automation; heavy manual work',
        good: 'End‑to‑end automation for real efficiency'
    },
    {
        bad: 'Reactive comms, limited ownership',
        good: 'Proactive communication and ownership'
    },
    {
        bad: 'Vague metrics, weak ROI',
        good: 'Clear KPIs, measurable ROI'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

const WhyUs = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="why" className={`${styles.whyUs} section theme-c`}>
            <div className={styles.container}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={styles.sectionTitle}
                >
                    Raising the Bar for Business Growth
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={styles.sectionDesc}
                >
                    What sets us apart - beyond pretty decks.
                </motion.p>

                <div className={styles.compare}>
                    {/* Other Agencies Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.card}
                    >
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Other Agencies</h3>
                        </div>
                        <ul className={styles.list}>
                            {comparisonData.map((item, index) => (
                                <li
                                    key={index}
                                    className={`${styles.listItem} ${styles.isBad} ${hoveredIndex !== null && hoveredIndex === index
                                            ? styles.active
                                            : hoveredIndex !== null
                                                ? styles.dimmed
                                                : ''
                                        }`}
                                >
                                    <span className={`${styles.mark} ${styles.markBad}`}>
                                        <X />
                                    </span>
                                    <span>{item.bad}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* XcendLabs Highlights Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`${styles.card} ${styles.cardHighlight}`}
                    >
                        <div className={styles.cardHeader}>
                            <h3 className={`${styles.cardTitle} ${styles.cardTitleHighlight}`}>XcendLabs</h3>
                        </div>
                        <motion.ul
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className={styles.list}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {comparisonData.map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    className={`${styles.listItem} ${styles.isGood}`}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                >
                                    <span className={`${styles.mark} ${styles.markGood}`}>
                                        <Check />
                                    </span>
                                    <span>{item.good}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
