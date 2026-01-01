import { Target, Handshake, Zap, FlaskConical } from 'lucide-react';
import styles from './AboutUsPage.module.css';

const team = [
    {
        name: 'Sharib Sufi',
        role: 'Founder & CEO',
        bio: 'Visionary leader with 10+ years in AI and automation. Passionate about helping businesses scale through technology.',
        linkedin: 'https://www.linkedin.com/in/sharib-sufi-398964222'
    },
    {
        name: 'Waris Rawa',
        role: 'Head of Engineering',
        bio: 'Full-stack expert specializing in building high-performance web applications and AI-driven systems.',
        linkedin: 'https://www.linkedin.com/in/waris-rawa-41959a216'
    },
    {
        name: 'Faizan Khan',
        role: 'Growth Strategist',
        bio: 'Data-driven marketer who has helped 50+ companies achieve exponential growth through automation.',
        linkedin: 'https://www.linkedin.com/in/faizan-khan-5b6b0b1b0'
    }
];

const values = [
    {
        icon: <Target size={32} />,
        title: 'Results-First',
        desc: 'We measure success by your ROI, not just deliverables.',
    },
    {
        icon: <Handshake size={32} />,
        title: 'Partnership',
        desc: 'We become an extension of your team, not just a vendor.',
    },
    {
        icon: <Zap size={32} />,
        title: 'Speed',
        desc: 'Fast execution without compromising on quality.',
    },
    {
        icon: <FlaskConical size={32} />,
        title: 'Innovation',
        desc: 'Constantly exploring new technologies to keep you ahead.',
    },
];

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);



const AboutUsPage = () => {
    return (
        <main className={styles.page}>
            <section className={`section theme-a ${styles.hero}`}>
                <div className="container">
                    <span className={styles.eyebrow}>About Us</span>
                    <h1>We Build the Future</h1>
                    <p className={styles.lead}>
                        A team of passionate technologists on a mission to help businesses thrive in the age of AI.
                    </p>
                </div>
            </section>

            <div className="divider"></div>

            {/* Story Section */}
            <section className={`section ${styles.storySection}`}>
                <div className="container">
                    <div className={styles.storyContent}>
                        <h2>Our Story</h2>
                        <div className={styles.storyText}>
                            <p>
                                <strong>XcendLabs was born from a simple observation:</strong> while technology was advancing at lightning speed, most businesses were still stuck with manual processes that drained their time and resources.
                            </p>
                            <p>
                                In 2020, our founder Sharib Sufi was consulting for a growing e-commerce company. He watched their talented team spend hours each day on repetitive tasks — copying data between systems, sending follow-up emails, generating reports. Tasks that should take seconds were consuming weeks of productivity.
                            </p>
                            <p>
                                That's when the vision crystallized: <strong>What if we could build an agency that didn't just deliver projects, but actually transformed how businesses operate?</strong>
                            </p>
                            <p>
                                We assembled a team of engineers, marketers, and automation specialists who shared this vision. Together, we've helped over 150 businesses reclaim thousands of hours through intelligent automation, stunning websites that actually convert, and growth strategies backed by data.
                            </p>
                            <p className={styles.highlight}>
                                Today, XcendLabs isn't just an agency — we're your growth partner. We don't measure success by hours billed or features shipped. We measure it by the impact we create: revenue generated, time saved, and businesses transformed.
                            </p>
                            <p>
                                <strong>Our mission is simple:</strong> Help you work smarter, scale faster, and build a business that runs itself — so you can focus on what matters most.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* Values */}
            <section className={`section theme-b ${styles.valuesSection}`}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>What We Believe</h2>
                    <div className={styles.valuesGrid}>
                        {values.map((value, i) => (
                            <div key={i} className={styles.valueCard}>
                                <span className={styles.valueIcon}>{value.icon}</span>
                                <h3>{value.title}</h3>
                                <p>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="divider"></div>

            {/* Team Section: Displaying profiles with social media links */}
            <section className={`section theme-c ${styles.teamSection}`}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Meet Our Team</h2>
                    <p className={styles.sectionDesc}>The experts behind your business transformation.</p>
                    <div className={styles.teamGrid}>
                        {team.map((member, index) => (
                            <article key={index} className={styles.teamCard}>
                                <h3 className={styles.memberName}>{member.name}</h3>
                                <p className={styles.memberRole}>{member.role}</p>
                                <p className={styles.memberBio}>{member.bio}</p>
                                <div className={styles.socials}>
                                    <a href={member.linkedin} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                        <LinkedInIcon />
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`section theme-a ${styles.ctaSection}`}>
                <div className="container">
                    <div className={styles.cta}>
                        <h2>Let's Build Something Great</h2>
                        <p>Ready to start your transformation journey with us?</p>
                        <a href="https://calendly.com/xcendlabs/30min" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            Book a Call →
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUsPage;
