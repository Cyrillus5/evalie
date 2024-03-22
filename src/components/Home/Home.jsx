import { useNavigate } from 'react-router-dom';

import './Home.css';

function Home () {
    const navigate = useNavigate();

    const handleWorksClick = () => {
        navigate('/works');
    };

    return (
        <div className='Home'>
            <div className='Home-main'>
                <h1 className='Home-main-title'>Rénovez votre logement</h1>  
                <p className='Home-main-text'>Des aides financières existent pour vous <br/>aider à renover votre logement</p>
                <button onClick={handleWorksClick} className='Home-main-button'>Quelles aides pour mes travaux ?</button>   
            </div>                
        </div>            
    )
}

export default Home;