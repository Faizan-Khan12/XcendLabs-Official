import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <img src="/xcendlabs logo.png" alt="XcendLabs Logo" className={styles.logoImg} />
                </Link>
                <p className={styles.copyright}>© {currentYear} XcendLabs. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
