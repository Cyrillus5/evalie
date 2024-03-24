import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWork } from '../../store/slices/selectedWorkSlice';

import PropTypes from 'prop-types';
import axios from 'axios';
import Line from "../Line/Line";

const Item = ({lineClassName, selectClassName, errorClassName, errorMessage, setError, setStep, endPointUrl}) => {
    const dispatch = useDispatch();
    const selectedItem = useSelector((state) => state.workSelected);

    const [items, setItems] = useState([]);

    const handleClickWorks = () => {
        if (selectedItem){
            setStep("second");
            setError("");
        } else {
            setError("Merci de selectionner des travaux à réaliser");
        }
    };

    const handleSelectChange = (event) => {
        dispatch(setSelectedWork(event.target.value));
    };

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`https://${endPointUrl}/works-list`);
                setItems(response.data);
                setError("");
            } catch(error) {
                console.log(error);
                setError("Une erreur est intervenue pour récupèrer la liste des travaux possibles");
            }
        };
        fetchData()
    }, [setError, endPointUrl]);

    return(
        <>
            <label>
                <p>* Sélectionnez les travaux à réaliser</p>
                <Line className={lineClassName} />
                <div className={selectClassName}>
                    <select value={selectedItem} onChange={handleSelectChange}>
                    {items.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                    </select> 
                </div>                
            </label>
            { (errorMessage && !selectedItem) ?
                (<p className={errorClassName}>{errorMessage}</p>)
                : null 
            }
            <button type="button" onClick={() => handleClickWorks()}>Etape suivante</button>
        </>
    )
};

Item.propTypes = {
    lineClassName: PropTypes.string,
    selectClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    errorMessage: PropTypes.string,
    endPointUrl: PropTypes.string,
    setStep: PropTypes.func.isRequired, 
    setError: PropTypes.func.isRequired,
};

export default Item;