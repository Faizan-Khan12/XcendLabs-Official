import { motion } from 'framer-motion';
import { Zap, Layout, Users, TrendingUp, Cpu, CreditCard } from 'lucide-react';
import styles from './WhyUs.module.css';

const premiumFeatures = [
    {
        icon: <Cpu />,
        title: 'Bespoke AI Architecture',
        desc: 'Custom-engineered systems designed solely for your unique stack and scale.'
    },
    {
        icon: <Zap />,
        title: 'Rapid Agile Delivery',
        desc: 'High-velocity execution with continuous iteration and immediate impact.'
    },
    {
        icon: <Layout />,
        title: 'End-to-End Automation',
        desc: 'Seamless workflows that eliminate manual bottlenecks and drive efficiency.'
    },
    {
        icon: <Users />,
        title: 'Dedicated Partnership',
        desc: 'Proactive ownership with a team that integrates deep into your vision.'
    },
    {
        icon: <TrendingUp />,
        title: 'Revenue-First Approach',
        desc: 'Strategies strictly aligned with clear KPIs and measurable ROI.'
    },
    {
        icon: <CreditCard />,
        title: 'Transparent Pricing',
        desc: 'Clear, upfront structures with no hidden costs or surprises.'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const WhyUs = () => {
    return (
        <section id="why" className={`${styles.whyUs} section theme-c`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={styles.logoWrapper}
                    >
                        <img src="/xcendlabs logo.png" alt="XcendLabs" className={styles.heroLogo} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={styles.sectionTitle}
                    >
                        The XcendLabs Standard
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.sectionDesc}
                    >
                        We don't just deliver projects; we engineer outcomes using elite tech and strategy.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={styles.featuresGrid}
                >
                    {premiumFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={styles.featureCard}
                        >
                            <div className={styles.iconWrapper}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDesc}>{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyUs;
