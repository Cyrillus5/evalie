import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from "/logo-evalie-without-colors.png";

import './Header.css';

function Header() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);
    const [headerStyle, setHeaderStyle] = useState({
        backgroundColor: 'rgba(255, 255, 255, 0)'
    });    

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(lastScrollY > currentScrollY || currentScrollY < 10);
            setLastScrollY(currentScrollY);

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
            <a onClick={handleWorksClick}><img src={logo} className="Header-logo"/></a>
        </div>
    );
}

export default Header;