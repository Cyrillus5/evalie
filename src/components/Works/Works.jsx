import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setResults } from "../../store/slices/resultsSlice";
import { setNavigation } from "../../store/slices/navigationSlice";
import axios from 'axios';

import Item from "../Item/Item";
import KindHouse from "../KindHouse/KindHouse";
import ZipCode from "../ZipCode/ZipCode";
import Recap from "../Recap/Recap";

import './Works.css';

function Works () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const endPointUrl ="api.evalie.fr";

    const [nameCollectivity, setNameCollectivity] = useState("");
    const [codeCollectivity, setCodeCollectivity] = useState("");
    const [codeCollectivityRegion, setCodeCollectivityRegion] = useState("");
    const [codeCollectivityDepartment, setCodeCollectivityDepartment] = useState("");
    const [step, setStep] = useState('first');
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const selectedItem = useSelector((state) => state.workSelected);
    const zipCode = useSelector((state) => state.zipCodeSelected);
    const typeHouse = useSelector((state) => state.houseTypeSelected);

    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const maxRetries = 3;

    const fetchWithRetry = async (url, params, retries = maxRetries, delayDuration = 2000) => {
        try {
            const response = await axios.get(url, { params, timeout: 10000 });
            return response;
        } catch (error) {
            if (retries === 0) throw error;
            console.log(`Tentative restante : ${retries}. Nouvel essai...`);
            await delay(delayDuration);
            return await fetchWithRetry(url, params, retries - 1, delayDuration);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (step === "third") {
            setStep("fourth");
        } else if (step === "fourth") {
            setIsLoading(true);
            try{
                const typeHouseLowerCase = typeHouse.toLowerCase();
                const response = await fetchWithRetry(
                    `https://${endPointUrl}/eligible-systems`, 
                    {
                        codeCollectivity, codeCollectivityDepartment, codeCollectivityRegion, selectedItem, typeHouseLowerCase
                    }
                );
                dispatch(setResults(response.data));
                setError("");
                navigate('/results');
            } catch(error) {
                console.log(error);
                setError("An error occured to get eligible systems");
            }
            setIsLoading(false);
            dispatch(setNavigation(true));
        }
    };

    return (
        <div className="Works">
            <form onSubmit={handleSubmit} className="Works-form">
                {step === "first" ? (
                    <Item 
                        lineClassName="Works-line" 
                        selectClassName="Works-form-select" 
                        errorClassName="Works-form-error" 
                        errorMessage={error} 
                        setError={setError}
                        setStep={setStep}
                        endPointUrl={endPointUrl}
                    />
                ) : null}
                { step === "second" ? (
                    <KindHouse 
                        lineClassName="Works-line" 
                        typeHouseSelected={typeHouse}
                        errorMessage={error} 
                        errorClassName="Works-form-error"
                        setError={setError}
                        setStep={setStep}
                    />
                ) : null}
                { step === "third" ? (
                    <ZipCode
                        lineClassName="Works-line"
                        errorMessage={error}
                        errorClassName="Works-form-error"
                        endPointUrl={endPointUrl}
                        setError={setError}
                        setStep={setStep}
                        setCodeCollectivity={setCodeCollectivity}
                        setCodeCollectivityRegion={setCodeCollectivityRegion}
                        setCodeCollectivityDepartment={setCodeCollectivityDepartment}
                        setNameCollectivity={setNameCollectivity}
                    />
                ) : null }
                { step === "fourth" ? (
                    <Recap
                        lineClassName="Works-line-recap"
                        selectedItem={selectedItem}
                        typeHouse={typeHouse}
                        nameCollectivity={nameCollectivity}
                        zipCode={zipCode}
                        setStep={setStep}
                    />
                ) : null}
                { (isLoading) ? (
                    <div className="Works-loading">
                        <span className="Works-loading-loader"></span>
                    </div>
                ) : null}
            </form>            
      </div>
    )
}

export default Works;