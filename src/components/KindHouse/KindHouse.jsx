import PropTypes from 'prop-types';
import Line from "../Line/Line";
import { useDispatch, useSelector } from 'react-redux';
import { setHouseTypeSelected } from '../../store/slices/selectedHouseTypeSlice';

const KindHouse = ({ lineClassName, errorMessage, errorClassName, setError, setStep }) => {
    const kindHouseList = ["Maison", "Appartement"];
    const dispatch = useDispatch();
    const typeHouse = useSelector((state) => state.houseTypeSelected);

    const handleSelectChangeTypeHouse = (event) => {
        dispatch(setHouseTypeSelected(event.target.value));
    };

    const handleClickTypeHouse = () => {
        if(typeHouse){
            setStep("third");
            setError("");
        } else {
            setError("Merci de sélectionner le type de logement");
        }
    };

    return (
        <>
            <label>
                <p>* Sélectionnez le type de logement</p>
                <Line className={lineClassName} />
                <select value={typeHouse} onChange={handleSelectChangeTypeHouse}>
                    {kindHouseList.map((kind, index) => (
                        <option key={index} value={kind}>
                            {kind}
                        </option>
                    ))}
                </select>
            </label>
            {(errorMessage && !typeHouse) ? (<p className={errorClassName}>{errorMessage}</p>) : null}
            <button type="button" onClick={() => setStep('first')}>Etape précédente</button>
            <button type="button" onClick={handleClickTypeHouse}>Etape suivante</button>
        </>
    );
};

KindHouse.propTypes = {
    lineClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    errorMessage: PropTypes.string,
    setStep: PropTypes.func.isRequired, 
    setError: PropTypes.func.isRequired,  
};

export default KindHouse;
