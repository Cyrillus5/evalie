import PropTypes from 'prop-types';

import Line from "../Line/Line";

import './Recap.css';

function Recap ({ selectedItem, typeHouse, nameCollectivity, zipCode, lineClassName, setStep }) {
    return(
        <>
            <p><strong>Récapitulatif de vos données</strong></p>
            <Line className={lineClassName} />
            <p>Travaux souhaités</p>
            <p className="Recap-text">{ selectedItem }</p>
            <Line className={lineClassName} />
            <p>Type de logement</p>
            <p className="Recap-text">{ typeHouse }</p>
            <Line className={lineClassName} />
            <p>Code postal du logement concerné</p>
            <p className="Recap-text">{ nameCollectivity } { zipCode }</p>
            <button type="button" onClick={() => setStep("third")}>Etape précédente</button>
            {nameCollectivity ? 
                (<button type="submit" className="Recap-buttonSubmit">Trouver les aides possibles</button>) 
                : <p className="Recap-textBeforeSubmit">Chargement des données ...</p>
            }
        </>
    )
}

Recap.propTypes = {
    selectedItem: PropTypes.string.isRequired,
    typeHouse: PropTypes.string.isRequired,
    nameCollectivity: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    lineClassName: PropTypes.string.isRequired,
    setStep: PropTypes.func.isRequired,
};

export default Recap;