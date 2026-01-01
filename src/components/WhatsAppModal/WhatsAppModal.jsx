import { useState } from 'react';
import { X, Send, Phone, User, Mail, Globe, Briefcase, MessageSquare } from 'lucide-react';
import styles from './WhatsAppModal.module.css';

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

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct the structured message
        const message = `*New Lead Inquiry via Website*
---------------------------
*Name:* ${formData.firstName} ${formData.lastName}
*Business:* ${formData.business}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Website:* ${formData.website || 'N/A'}

*Looking For:*
${formData.interest}
---------------------------`;

        // Encode the message for utility URL
        const encodedMessage = encodeURIComponent(message);

        // Open WhatsApp
        window.open(`https://wa.me/919906826941?text=${encodedMessage}`, '_blank');

        // Close modal after sending
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={24} />
                </button>

                <div className={styles.header}>
                    <h2>Let's Talk Business</h2>
                    <p>Fill in the details below to start a WhatsApp chat with us.</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>First Name</label>
                            <input
                                className={styles.input}
                                type="text"
                                name="firstName"
                                required
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Last Name</label>
                            <input
                                className={styles.input}
                                type="text"
                                name="lastName"
                                required
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                className={styles.input}
                                type="email"
                                name="email"
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone</label>
                            <input
                                className={styles.input}
                                type="tel"
                                name="phone"
                                required
                                placeholder="+1 234..."
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Business Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            name="business"
                            required
                            placeholder="Your Company Ltd."
                            value={formData.business}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Website (Optional)</label>
                        <input
                            className={styles.input}
                            type="url"
                            name="website"
                            placeholder="https://example.com"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>What are you looking for?</label>
                        <textarea
                            className={styles.textarea}
                            name="interest"
                            required
                            placeholder="I need help with AI automation for my sales team..."
                            value={formData.interest}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        <Send size={18} />
                        Continue to WhatsApp
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WhatsAppModal;
