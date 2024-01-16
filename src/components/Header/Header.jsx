import { useNavigate } from 'react-router-dom';

import logo from "/logo-evalie.png";
import './Header.css';

function Header () {
    const navigate = useNavigate();

    const handleWorksClick = () => {
        navigate('/');
    };

    return (
        <div className="Header">
            <a onClick={handleWorksClick}><img src={logo} className="Header-logo"/></a>
        </div>
    )
}

export default Header;