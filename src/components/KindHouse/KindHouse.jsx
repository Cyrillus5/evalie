import PropTypes from 'prop-types';
import Line from "../Line/Line";

const KindHouse = ({ lineClassName, typeHouseSelected, handleSelectChangeTypeHouseFunction, kindHouseList, errorMessage, errorClassName, handleClickTypeHouseFunction, setItemsSelected }) => {
    return (
        <>
            <label>
                <p>* Sélectionnez le type de logement</p>
                <Line className={lineClassName} />
                <select value={typeHouseSelected} onChange={handleSelectChangeTypeHouseFunction}>
                    {kindHouseList.map((kind, index) => (
                        <option key={index} value={kind}>
                            {kind}
                        </option>
                    ))}
                </select>
            </label>
            {(errorMessage && !typeHouseSelected) ? (<p className={errorClassName}>{errorMessage}</p>) : null}
            <button type="button" onClick={() => setItemsSelected("off")}>Etape précédente</button>
            <button type="button" onClick={handleClickTypeHouseFunction}>Etape suivante</button>
        </>
    );
};

KindHouse.propTypes = {
    lineClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    errorMessage: PropTypes.string,
    typeHouseSelected: PropTypes.string,
    handleClickTypeHouseFunction: PropTypes.func.isRequired,
    handleSelectChangeTypeHouseFunction: PropTypes.func.isRequired,
    kindHouseList: PropTypes.arrayOf(PropTypes.string).isRequired,
    setItemsSelected : PropTypes.func.isRequired,    
};

export default KindHouse;
