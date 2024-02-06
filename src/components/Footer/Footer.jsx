import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer (){
    const location = useLocation();
    const urlTarget = 'https://cyril-chenet.surge.sh/';
    const className = location.pathname != '/works' ? 'Footer-Home' : 'Footer-Works';

    return (
        <div className="Footer">
            <a href={urlTarget} target='_blank' rel="noreferrer"><p className={className}>@Cyril</p></a>
        </div>
    )
}

export default Footer;