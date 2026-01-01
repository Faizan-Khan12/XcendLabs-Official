import { useState, useEffect } from 'react';

const useScrollSpy = (sectionIds) => {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

    useEffect(() => {
        const observers = sectionIds.map(id => {
            const element = document.getElementById(id);
            if (!element) return null;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setActiveSection(id);
                        }
                    });
                },
                { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 }
            );

            observer.observe(element);
            return { observer, element };
        }).filter(Boolean);

        return () => {
            observers.forEach(({ observer, element }) => {
                observer.unobserve(element);
            });
        };
    }, [sectionIds]);

    return activeSection;
};

export default useScrollSpy;
