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
                <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, vel? Voluptatem error voluptas libero fuga dolorum dolor eos voluptatibus enim rem, molestias unde eveniet impedit molestiae suscipit nesciunt architecto odio?</span>
            </div>
        </div>

    );
};

export default Marquee;
