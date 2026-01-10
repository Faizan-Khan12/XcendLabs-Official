import { Bot, Monitor, BarChart3, Mail, Share2, Rocket, Check } from 'lucide-react';
import styles from './ServicesPage.module.css';

const services = [
    {
        title: 'AI Automation',
        desc: 'Eliminate repetitive tasks and scale your operations with intelligent automation systems that work around the clock.',
        details: [
            'Custom AI chatbots and assistants',
            'Workflow automation (Zapier, Make, n8n)',
            'Document processing & data extraction',
            'Email automation and lead nurturing',
            'CRM integration and sync',
        ],
        icon: <Bot size={32} />,
    },
    {
        title: 'Web Development',
        desc: 'High-performance, conversion-optimized websites that turn visitors into customers and establish your digital presence.',
        details: [
            'Custom React/Next.js development',
            'E-commerce solutions',
            'Landing pages & funnels',
            'Web app development',
            'API integrations',
        ],
        icon: <Monitor size={32} />,
    },
    {
        title: 'Performance Marketing',
        desc: 'Data-driven advertising strategies that maximize your ROI across all digital channels.',
        details: [
            'Google & Meta Ads management',
            'Conversion rate optimization',
            'Analytics & tracking setup',
            'A/B testing frameworks',
            'Retargeting campaigns',
        ],
        icon: <BarChart3 size={32} />,
    },
    {
        title: 'Email Marketing',
        desc: 'Build and nurture your audience with strategic email campaigns that drive engagement and sales.',
        details: [
            'Email sequence design',
            'Newsletter management',
            'Segmentation strategies',
            'Automated drip campaigns',
            'Deliverability optimization',
        ],
        icon: <Mail size={32} />,
    },
    {
        title: 'Social Media Management',
        desc: 'Grow your brand presence and engage your audience across all major social platforms.',
        details: [
            'Content strategy & planning',
            'Daily posting & engagement',
            'Community management',
            'Influencer partnerships',
            'Social analytics & reporting',
        ],
        icon: <Share2 size={32} />,
    },
    {
        title: 'Growth Acceleration',
        desc: 'Comprehensive growth strategies that combine all channels for exponential business scaling.',
        details: [
            'Growth audits & roadmaps',
            'Funnel optimization',
            'Revenue operations setup',
            'Customer acquisition systems',
            'Retention & loyalty programs',
        ],
        icon: <Rocket size={32} />,
    },
];

const ServicesPage = () => {
    return (
        <main className={styles.page}>
            <section className={`section theme-a ${styles.hero}`}>
                <div className="container">
                    <span className={styles.eyebrow}>Our Services</span>
                    <h1>Full-Stack Digital Solutions</h1>
                    <p className={styles.lead}>
                        From AI automation to growth marketing — everything you need to scale your business in one place.
                    </p>
                </div>
            </section>

            <div className="divider"></div>

            <section className={`section ${styles.servicesGrid}`}>
                <div className="container">
                    <div className={styles.grid}>
                        {services.map((service, index) => (
                            <article key={index} className={styles.serviceCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.icon}>{service.icon}</span>
                                    <h2>{service.title}</h2>
                                </div>
                                <p className={styles.desc}>{service.desc}</p>
                                <ul className={styles.features}>
                                    {service.details.map((detail, i) => (
                                        <li key={i}>
                                            <span className={styles.check}><Check size={16} /></span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action: Encourages users to book a strategy call */}
            <section className={`section theme-b ${styles.ctaSection}`}>
                <div className="container">
                    <div className={styles.cta}>
                        <h2>Ready to Get Started?</h2>
                        <p>Book a free strategy call and let's discuss how we can help.</p>
                        <a href="https://calendly.com/xcendlabs/30min" className="btn btn-primary">
                            Book Your Free Call →
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ServicesPage;
