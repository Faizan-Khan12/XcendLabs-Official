import { useEffect, useRef, useState } from 'react';
import styles from './Stats.module.css';

// Stats data moved outside component to avoid re-creation on each render
const STATS_DATA = [
    { value: 500, suffix: '+', label: 'Automations Built' },
    { value: 16, suffix: '+', label: 'Hours Saved Per Week' },
    { value: 98, suffix: '%', label: 'Success Rate' },
];

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const [counts, setCounts] = useState([0, 0, 0]);

    useEffect(() => {
        const currentRef = sectionRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [isVisible]);

    // Animation effect with proper cleanup
    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const startTime = Date.now();
        let animationId;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setCounts(STATS_DATA.map(stat => Math.floor(progress * stat.value)));

            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isVisible]);

    return (
        <section className={styles.statsSection} ref={sectionRef}>
            <div className="container">
                <div className={styles.statsGrid}>
                    {STATS_DATA.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statNumber}>
                                {counts[index]}{stat.suffix}
                            </div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
