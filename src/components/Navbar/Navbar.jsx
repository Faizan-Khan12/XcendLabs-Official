import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.navbar}`)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  // Close menu on route change - this is intentional behavior for navigation
  // eslint-disable-next-line react-hooks/set-state-in-effect
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Only close menu and scroll if route actually changed (not initial mount)
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/why-us', label: 'Why Us' },
    { to: '/testimonials', label: 'Testimonials' },

  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.navBarFlex}>
        <Link to="/" className={styles.navLogo} onClick={closeMenu}>
          <img src="/xcendlabs logo.png" alt="XcendLabs Logo" className={styles.logoImg} />
        </Link>

        <button
          className={`${styles.navToggle} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`${styles.navLink} ${isActive(item.to) ? styles.active : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://calendly.com/xcendlabs/30min"
              className={styles.bookCallBtn}
              onClick={closeMenu}
            >
              Book a Call
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
