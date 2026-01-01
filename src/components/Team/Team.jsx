import styles from './Team.module.css';

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

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);



const Team = () => {
    return (
        <section id="team" className={`${styles.team} section theme-c`}>
            <div className={styles.container}>
                <h2 className={`${styles.sectionTitle} scroll-reveal`}>Meet Our Team</h2>
                <p className={`${styles.sectionDesc} scroll-reveal`}>
                    The experts behind your business transformation.
                </p>
                <div className={styles.grid}>
                    {team.map((member, index) => (
                        <article key={index} className={styles.card}>
                            <h3 className={styles.name}>{member.name}</h3>
                            <p className={styles.role}>{member.role}</p>
                            <p className={styles.bio}>{member.bio}</p>
                            <div className={styles.socials}>
                                <a href={member.linkedin} className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                    <LinkedInIcon />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
