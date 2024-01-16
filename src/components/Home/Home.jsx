import { useNavigate } from 'react-router-dom';

import './Home.css';

import pictureHomePage from '/house-evalie.png';

function Home () {
    const navigate = useNavigate();

    const handleWorksClick = () => {
        navigate('/works');
    };

    return (
        <div className='Home'>
            <div className='Home-card'>
                <img src={pictureHomePage} className='Home-card-picture'/>                
                <div className='Home-card-main'>
                    <h1 className='Home-card-main-title'>Rénovez votre logement</h1>  
                    <p className='Home-card-main-text'>Des aides financières existent pour vous <br/>aider à renover votre logement</p>
                    <button onClick={handleWorksClick} className='Home-card-main-button'>Quelles aides pour mes travaux ?</button>   
                </div>
                
            </div>
            
        </div>
    )
}

export default Home;