import { Cpu, TrendingUp, Sparkles, Unlock, Zap, BarChart3, Shield, Globe } from 'lucide-react';
import styles from './WhyUsPage.module.css';

const features = [
    {
        title: 'Bespoke Engineering',
        desc: 'We don\'t use templates. We build custom, scalable architectures tailored exactly to your operational needs.',
        icon: <Cpu size={24} />,
    },
    {
        title: 'Revenue Velocity',
        desc: 'Every system we build is optimized for one thing: accelerating your business growth and ROI.',
        icon: <TrendingUp size={24} />,
    },
    {
        title: 'AI-Native Integration',
        desc: 'Leveraging the latest in artificial intelligence to automate workflows and create intelligent user experiences.',
        icon: <Sparkles size={24} />,
    },
    {
        title: 'Radical Transparency',
        desc: 'No account managers filtering the truth. Direct access to your engineering team with real-time updates.',
        icon: <Unlock size={24} />,
    },
    {
        title: 'Future-Proof Stack',
        desc: 'We build on modern, robust technologies that scale with you, ensuring long-term reliability and performance.',
        icon: <Zap size={24} />,
    },
    {
        title: 'Data-Driven Strategy',
        desc: 'Every decision is backed by analytics. We turn raw data into actionable insights to refine your growth engine.',
        icon: <BarChart3 size={24} />,
    },
    {
        title: 'Enterprise Security',
        desc: 'Security isn\'t an afterthought. We implement bank-grade encryption and compliance standards from day one.',
        icon: <Shield size={24} />,
    },
    {
        title: 'Global Scalability',
        desc: 'Systems designed to handle millions of users. We build with global distribution and high availability in mind.',
        icon: <Globe size={24} />,
    }
];

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

            <section className={`section ${styles.differenceSection}`}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>The XcendLabs Difference</h2>
                    <p className={styles.sectionDesc}>We bridge the gap between complex technology and tangible business results.</p>
                    <div className={styles.featureGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.iconWrapper}>
                                    {feature.icon}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
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
                        <a href="https://calendly.com/xcendlabs/30min" className="btn btn-primary">
                            Book Your Strategy Call →
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default WhyUsPage;
