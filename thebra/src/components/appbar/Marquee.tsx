import React, { useRef, useEffect } from 'react';
import './style/Marquee.scss'
const Marquee: React.FC = () => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marqueeElement = marqueeRef.current;
        const handleAnimationEnd = () => {
            // Reset the marquee to its initial position
            if (marqueeElement) {
                marqueeElement.style.transform = 'translateX(100%)';
                marqueeElement.style.animation = 'none';
                marqueeElement.offsetHeight; // Trigger reflow to restart the animation
                marqueeElement.style.animation = "";
            }
        };
        marqueeElement?.addEventListener('animationend', handleAnimationEnd);
        return () => {
            marqueeElement?.removeEventListener('animationend', handleAnimationEnd);
        };
    }, []);

    return (
        <div className='marquee-container'>
            <div className="marquee" ref={marqueeRef}>
                <span>✈️ Enjoy Free Standard Shipping for Orders Over 49€ within 🇫🇮 Finland 🇫🇮 ! &nbsp; &nbsp; <span style={{color:"red"}}>Get 10% Off Your Next Order!</span></span>
            </div>
        </div>

    );
};

export default Marquee;
