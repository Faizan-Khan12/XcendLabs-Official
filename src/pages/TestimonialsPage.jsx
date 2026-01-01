import { Star } from 'lucide-react';
import styles from './TestimonialsPage.module.css';

const testimonials = [
    {
        name: 'Sarah Mitchell',
        role: 'CEO, TechStart Inc.',
        text: 'XcendLabs transformed our entire sales process with AI automation. We\'re now closing deals 3x faster with half the manual work. Their team truly understands what it takes to scale.',
        avatar: 'SM',
        rating: 5,
    },
    {
        name: 'Michael Chen',
        role: 'Founder, GrowthHub',
        text: 'The website they built for us isn\'t just beautiful — it converts. Our lead generation increased by 180% in the first month. Worth every penny.',
        avatar: 'MC',
        rating: 5,
    },
    {
        name: 'Emily Rodriguez',
        role: 'Marketing Director, Scale Co.',
        text: 'What sets XcendLabs apart is their strategic thinking. They don\'t just execute — they challenge our assumptions and push us toward better solutions.',
        avatar: 'ER',
        rating: 5,
    },
    {
        name: 'David Kim',
        role: 'COO, Fintech Solutions',
        text: 'We\'ve worked with many agencies, but XcendLabs is different. Their AI automation saved us 20+ hours per week in manual data entry alone.',
        avatar: 'DK',
        rating: 5,
    },
    {
        name: 'Lisa Thompson',
        role: 'E-commerce Owner',
        text: 'From email sequences to social media management, they handle everything seamlessly. My revenue has doubled since partnering with them.',
        avatar: 'LT',
        rating: 5,
    },
    {
        name: 'James Wilson',
        role: 'Startup Founder',
        text: 'The team at XcendLabs feels like an extension of our company. Responsive, creative, and always delivering ahead of schedule.',
        avatar: 'JW',
        rating: 5,
    },
];

const TestimonialsPage = () => {
    return (
        <main className={styles.page}>
            <section className={`section theme-a ${styles.hero}`}>
                <div className="container">
                    <span className={styles.eyebrow}>Testimonials</span>
                    <h1>What Our Clients Say</h1>
                    <p className={styles.lead}>
                        Real results from real businesses. Here's what partnering with XcendLabs looks like.
                    </p>
                </div>
            </section>

            <div className="divider"></div>

            <section className={`section ${styles.testimonialsSection}`}>
                <div className="container">
                    <div className={styles.grid}>
                        {testimonials.map((testimonial, index) => (
                            <article key={index} className={styles.testimonialCard}>
                                <div className={styles.stars}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className={styles.star} size={16} fill="currentColor" />
                                    ))}
                                </div>
                                <blockquote className={styles.quote}>
                                    "{testimonial.text}"
                                </blockquote>
                                <div className={styles.author}>
                                    <div className={styles.avatar}>
                                        {testimonial.avatar}
                                    </div>
                                    <div className={styles.authorInfo}>
                                        <strong className={styles.name}>{testimonial.name}</strong>
                                        <span className={styles.role}>{testimonial.role}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`section theme-b ${styles.statsSection}`}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>500+</span>
                            <span className={styles.statLabel}>Projects Delivered</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>98%</span>
                            <span className={styles.statLabel}>Client Satisfaction</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>150+</span>
                            <span className={styles.statLabel}>Happy Clients</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`section theme-c ${styles.ctaSection}`}>
                <div className="container">
                    <div className={styles.cta}>
                        <h2>Ready to Join Them?</h2>
                        <p>Start your growth journey with a free strategy call.</p>
                        <a href="https://calendly.com/xcendlabs/30min" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            Book Your Free Call →
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TestimonialsPage;
