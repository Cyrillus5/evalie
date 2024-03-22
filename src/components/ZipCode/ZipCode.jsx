import axios from 'axios';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedZipCode } from "../../store/slices/selectedZipCodeSlice";

import Line from "../Line/Line";
import PropTypes from 'prop-types';
import isZipCode from "../../services/isZipCode";

const ZipCode = ({lineClassName, errorMessage, errorClassName, setStep, setError, setCodeCollectivity, setCodeCollectivityRegion, setCodeCollectivityDepartment, setNameCollectivity, endPointUrl}) => {
    const dispatch = useDispatch();
    const [zipCode, setZipCode] = useState('');

    const handleSetCollectivity = async (zipCode) => {
        try{
            const response = await axios.get(
                `https://${endPointUrl}/collectivities-list`, 
                {
                    params: { zipCode }
                }
            );
            setCodeCollectivity(response.data.code);
            setCodeCollectivityRegion(response.data.codeRegion);
            setCodeCollectivityDepartment(response.data.codeDepartement);
            setNameCollectivity(response.data.nom);
            setError("");
            setStep("fourth");
        } catch(error) {
            console.log(error);
            setError("Ce code postal n'est pas connu.");
        }
    };

    const handleClickZipCode = () => {
        if (isZipCode(zipCode)){
            setError("");
            dispatch(setSelectedZipCode(zipCode));
            handleSetCollectivity(zipCode);
        } else {
            setError("Merci de rentrer un code postal au bon format");
        }
    };

    return(
        <>
            <label>
                <p>* Code postal du logement concerné</p>
                <Line className={lineClassName} />
                <input type='text' placeholder='Code postal...' value={zipCode} onChange={(e) => setZipCode(e.target.value)}></input>
            </label>
            { (errorMessage) ? <p className={errorClassName}>{errorMessage}</p> : null }
            <button type="button" onClick={() => setStep("second")}>Etape précédente</button>
            <button type="button" onClick={() => handleClickZipCode()}>Etape suivante</button>                        
        </>
    )
};

ZipCode.propTypes = {
    lineClassName: PropTypes.string,
    errorMessage: PropTypes.string,
    errorClassName: PropTypes.string,
    endPointUrl: PropTypes.string,
    setStep: PropTypes.func.isRequired, 
    setError: PropTypes.func.isRequired, 
    setCodeCollectivity: PropTypes.func.isRequired, 
    setCodeCollectivityRegion: PropTypes.func.isRequired, 
    setCodeCollectivityDepartment: PropTypes.func.isRequired, 
    setNameCollectivity: PropTypes.func.isRequired,
};

export default ZipCode;