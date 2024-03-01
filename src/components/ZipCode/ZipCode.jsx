import Line from "../Line/Line";
import PropTypes from 'prop-types';

const ZipCode = ({lineClassName, zipCodeSelected, setZipCodeFunction, errorMessage, errorClassName, setTypeHouseSelectedFunction, handleClickZipCodeFunction}) => {
    return(
        <>
            <label>
                <p>* Code postal du logement concerné</p>
                <Line className={lineClassName} />
                <input type='text' placeholder='Code postal...' value={zipCodeSelected} onChange={(e) => setZipCodeFunction(e.target.value)}></input>
            </label>
            { (errorMessage) ? <p className={errorClassName}>{errorMessage}</p> : null }
            <button type="button" onClick={() => setTypeHouseSelectedFunction("off")}>Etape précédente</button>
            <button type="button" onClick={() => handleClickZipCodeFunction()}>Etape suivante</button>                        
        </>
    )
}

ZipCode.propTypes = {
    lineClassName: PropTypes.string,
    zipCodeSelected: PropTypes.string,
    setZipCodeFunction: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    errorClassName: PropTypes.string,
    setTypeHouseSelectedFunction: PropTypes.func.isRequired,
    handleClickZipCodeFunction: PropTypes.func.isRequired
};

export default ZipCode;