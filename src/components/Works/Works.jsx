import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setResults } from "../../store/slices/resultsSlice";
import { setSelectedWork } from "../../store/slices/selectedWorkSlice";
import { setNavigation } from "../../store/slices/navigationSlice";

import axios from 'axios';

import Line from "../Line/Line";
import isZipCode from "../../services/isZipCode";

import './Works.css';

function Works () {
    const kindHouse = ["Maison", "Appartement"];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [typeHouse, setTypeHouse] = useState("Maison");
    const [zipCode, setZipCode] = useState('');    
    const [nameCollectivity, setNameCollectivity] = useState("");
    const [codeCollectivity, setCodeCollectivity] = useState("");
    const [codeCollectivityRegion, setCodeCollectivityRegion] = useState("");
    const [codeCollectivityDepartment, setCodeCollectivityDepartment] = useState("");

    const [itemsSelected, setItemsSelected] = useState("off");
    const [typeHouseSelected, setTypeHouseSelected] = useState("off");
    const [zipCodeSelected, setZipCodeSelected] = useState("off");

    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    
    const selectedItem = useSelector((state) => state.workSelected);

    const handleSelectChange = (event) => {
        dispatch(setSelectedWork(event.target.value));
    };

    const handleSelectChangeTypeHouse = (event) => {
        setTypeHouse(event.target.value);
        };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try{
            const typeHouseLowerCase = typeHouse.toLowerCase();
            const response = await axios.get('http://localhost:3001/eligible-systems', {
                params: { codeCollectivity, codeCollectivityDepartment, codeCollectivityRegion, selectedItem, typeHouseLowerCase }
            });
            dispatch(setResults(response.data));
            setError("");
            navigate('/results');
        } catch(error) {
            console.log(error);
            setError("An error occured to get eligible systems");
        }
        setIsLoading(false);
        dispatch(setNavigation(true))
    };

    const handleSetCollectivity = async (zipCode) => {
        try{
            const response = await axios.get('http://localhost:3001/collectivities-list', {
                params: { zipCode }
            });
            setCodeCollectivity(response.data.code);
            setCodeCollectivityRegion(response.data.codeRegion);
            setCodeCollectivityDepartment(response.data.codeDepartement);
            setNameCollectivity(response.data.nom);
            setError("");
        } catch(error) {
            console.log(error);
            setError(" Une erreur est intervenue pour récupérer les informations concernant la collectivité.")
        }
    };

    const handleClickWorks = () => {
        if (selectedItem){
            setItemsSelected("on");
            setError("");
        } else {
            setError("Merci de selectionner des travaux à réaliser")
        }
    };

    const handleClickTypeHouse = () => {
        if(typeHouse){
            setTypeHouseSelected("on");
            setError("")
        } else {
            setError("Merci de sélectionner le type de logement")
        }
    }

    const handleClickZipCode = () => {
        if (isZipCode(zipCode)){
            setZipCodeSelected("on");
            setError("");
            handleSetCollectivity(zipCode)
        } else {
            setError("Merci de rentrer un code postal au bon format")
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:3001/works-list')
                setItems(response.data);
                setError("");
            } catch(error) {
                console.log(error);
                setError("Une erreur est intervenue pour récupèrer la liste des travaux possibles");
            }
        };
        fetchData()
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit} className="Works-form">
                {itemsSelected === "off" ? (
                    <>
                        <label>
                            <p>* Sélectionnez les travaux à réaliser</p>
                            <Line className={"Works-line"} />
                            <div className="Works-form-select">
                               <select value={selectedItem} onChange={handleSelectChange}>
                                    {items.map((item, index) => (
                                        <option key={index} value={item.intitule}>
                                            {item}
                                        </option>
                                    ))}
                                </select> 
                            </div>
                            
                        </label>
                        { (error && !selectedItem) ? (<p className="Works-form-error">{error}</p>) : null }
                        <button type="button" onClick={() => handleClickWorks()}>Etape suivante</button>
                    </>
                ) : null}
                { (itemsSelected === "on" && typeHouseSelected === "off") ? (
                    <>
                    <label>
                            <p>* Sélectionnez le type de logement</p>
                            <Line className={"Works-line"} />
                            <select value={typeHouse} onChange={handleSelectChangeTypeHouse}>
                            {kindHouse.map((kind, index) => (
                                    <option key={index} value={kind}>
                                        {kind}
                                    </option>
                                ))}
                            </select>
                        </label>
                        { (error && !typeHouse) ? (<p className="Works-form-error">{error}</p>) : null }
                        <button type="button" onClick={() => setItemsSelected("off")}>Etape précédente</button>
                        <button type="button" onClick={() => handleClickTypeHouse()}>Etape suivante</button>
                    </>
                ) : null}
                { (itemsSelected === "on" && typeHouseSelected === "on" && zipCodeSelected === "off") ? (
                    <>
                        <label>
                            <p>* Code postal du logement concerné</p>
                            <Line className={"Works-line"} />
                            <input type='text' placeholder='Code postal...' value={zipCode} onChange={(e) => setZipCode(e.target.value)}></input>
                        </label>
                        { (error && !isZipCode(zipCode)) ? <p className="Works-form-error">{error}</p> : null }
                        <button type="button" onClick={() => setTypeHouseSelected("off")}>Etape précédente</button>
                        <button type="button" onClick={() => handleClickZipCode()}>Etape suivante</button>                        
                    </>
                        
                ) : null }
                { (itemsSelected === "on" && typeHouseSelected === "on" && zipCodeSelected === "on") ? (
                    <>
                    <p><strong>Récapitulatif de vos données</strong></p>
                    <Line className={"Works-line-recap"} />
                    <p>Travaux souhaités</p>
                    <p className="Works-form-recap-text">{ selectedItem }</p>
                    <Line className={"Works-line-recap"} />
                    <p>Type de logement</p>
                    <p className="Works-form-recap-text">{ typeHouse }</p>
                    <Line className={"Works-line-recap"} />
                    <p>Code postal du logement concerné</p>
                    <p className="Works-form-recap-text">{ nameCollectivity } { zipCode }</p>
                    <button type="button" onClick={() => setZipCodeSelected("off")}>Etape précédente</button>
                    <button type="submit" className="Works-form-buttonSubmit">Trouver les aides possibles</button>
                    </>
                ) : null}
                { (isLoading) ? (
                    <div className="Results-loading">
                        <span className="Results-loading-loader"></span>
                    </div>
                ) : null}
            </form>            
      </div>
    )
}

export default Works;