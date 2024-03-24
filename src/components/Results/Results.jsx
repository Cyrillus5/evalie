import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

import pictureHomePage from '/house-evalie.png';

import './Results.css';


function Results () {
    const results = useSelector((state) => state.results);
    const work = useSelector((state) => state.workSelected);
    const navigation = useSelector((state) => state.navigation);
    const navigate = useNavigate();

    useEffect(() => {
        if (!navigation) {
            navigate('/');
        }
    }, [navigation, navigate]);

    return(
        <>
            { results.length > 0 ?
                (
                    <div className='Results'>
                        <h1 className='Results-h1'>Aides financières possibles</h1>
                        <h3>{ work }</h3>
                        <p className='Results-p'>Nous avons trouvé <strong>{ results.length }</strong> résultats.</p>
                        { results.map(result =>(
                            <table key={result.id}>
                                <thead>
                                    <tr>
                                        <th>Financeur</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td >{result.financeur}</td>
                                    </tr>
                                </tbody>
                                <thead>
                                    <tr>
                                        <th>Intitulé</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{result.intitule}</td>
                                    </tr>
                                </tbody>
                                <thead>
                                    <tr>
                                        <th>Descriptif</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(result.descriptif) }} />
                                    </tr>
                                </tbody>
                            </table>                   
                        ))}
                    </div> 
                ) 
                : (
                    <div className='NoResults'>
                        <img src={pictureHomePage} className='NoResults-picture'/>
                        <div className='NoResults-main'>
                            <h1 className='NoResults-h1'>Aides financières possibles</h1>
                            <h3>{ work }</h3>
                            <p className='NoResults-p'>Pas de resultats pour ce type de travaux :/</p>
                        </div>                    
                    </div>
                )
            }
        </>               
    )
}

export default Results;