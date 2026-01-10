import { useState } from 'react';
import { X, Send } from 'lucide-react';
import styles from './WhatsAppModal.module.css';

// Sanitize user input to prevent XSS and injection attacks
const sanitizeInput = (str) => {
    if (!str) return '';
    return str
        .replace(/[<>]/g, '') // Remove HTML brackets
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .trim()
        .slice(0, 1000); // Limit length
};

const WhatsAppModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        website: '',
        business: '',
        interest: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Sanitize all inputs before constructing message
        const sanitized = {
            firstName: sanitizeInput(formData.firstName),
            lastName: sanitizeInput(formData.lastName),
            email: sanitizeInput(formData.email),
            phone: sanitizeInput(formData.phone),
            website: sanitizeInput(formData.website),
            business: sanitizeInput(formData.business),
            interest: sanitizeInput(formData.interest),
        };

        // Construct the structured message
        const message = `*New Lead Inquiry via Website*
---------------------------
*Name:* ${sanitized.firstName} ${sanitized.lastName}
*Business:* ${sanitized.business}
*Email:* ${sanitized.email}
*Phone:* ${sanitized.phone}
*Website:* ${sanitized.website || 'N/A'}

*Looking For:*
${sanitized.interest}
---------------------------`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);

        // Open WhatsApp
        window.open(`https://wa.me/919906826941?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');

        // Close modal after sending
        setIsSubmitting(false);
        onClose();
    };

    // Handle overlay click to close
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle escape key to close
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div
            className={styles.overlay}
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-modal-title"
        >
            <div className={styles.modal}>
                <button
                    className={styles.closeBtn}
                    onClick={onClose}
                    aria-label="Close modal"
                    type="button"
                >
                    <X size={24} />
                </button>

                <div className={styles.header}>
                    <h2 id="whatsapp-modal-title">Let&apos;s Talk Business</h2>
                    <p>Fill in the details below to start a WhatsApp chat with us.</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                className={styles.input}
                                type="text"
                                name="firstName"
                                required
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleChange}
                                maxLength={50}
                                autoComplete="given-name"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                className={styles.input}
                                type="text"
                                name="lastName"
                                required
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleChange}
                                maxLength={50}
                                autoComplete="family-name"
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input
                                id="email"
                                className={styles.input}
                                type="email"
                                name="email"
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                maxLength={100}
                                autoComplete="email"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="phone">Phone</label>
                            <input
                                id="phone"
                                className={styles.input}
                                type="tel"
                                name="phone"
                                required
                                placeholder="+1 234..."
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength={20}
                                autoComplete="tel"
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="business">Business Name</label>
                        <input
                            id="business"
                            className={styles.input}
                            type="text"
                            name="business"
                            required
                            placeholder="Your Company Ltd."
                            value={formData.business}
                            onChange={handleChange}
                            maxLength={100}
                            autoComplete="organization"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="website">Website (Optional)</label>
                        <input
                            id="website"
                            className={styles.input}
                            type="url"
                            name="website"
                            placeholder="https://example.com"
                            value={formData.website}
                            onChange={handleChange}
                            maxLength={200}
                            autoComplete="url"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="interest">What are you looking for?</label>
                        <textarea
                            id="interest"
                            className={styles.textarea}
                            name="interest"
                            required
                            placeholder="I need help with AI automation for my sales team..."
                            value={formData.interest}
                            onChange={handleChange}
                            maxLength={500}
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                    >
                        <Send size={18} />
                        {isSubmitting ? 'Opening WhatsApp...' : 'Continue to WhatsApp'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WhatsAppModal;
