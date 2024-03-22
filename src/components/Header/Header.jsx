import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from "/logo-evalie-without-colors.png";

import './Header.css';

function Header() {
    const navigate = useNavigate();
    // Header visibility
    const [isVisible, setIsVisible] = useState(true);
    // Last vertical window scroll position
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);
    const [headerStyle, setHeaderStyle] = useState({
        backgroundColor: 'rgba(255, 255, 255, 0)'
    });

    // Header visility when we scroll
    useEffect(() => {
        const handleScroll = () => {
            // Handle header visibility
            const currentScrollY = window.scrollY;
            setIsVisible(lastScrollY > currentScrollY || currentScrollY < 10);
            setLastScrollY(currentScrollY);
            // Handle header opacity
            if (currentScrollY < 60) {
                setHeaderStyle({
                    backgroundColor: 'rgba(255, 255, 255, 0)'
                });
            } else {
                setHeaderStyle({
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleWorksClick = () => {
        navigate('/');
    };

    return (
        <div className={`Header ${!isVisible ? 'Header-hide' : ''}`} style={headerStyle}>
            <a onClick={handleWorksClick}>
                <img src={logo} className="Header-logo"/>
            </a>
        </div>
    );
}

export default Header;