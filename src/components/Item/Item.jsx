import PropTypes from 'prop-types';
import Line from "../Line/Line";

const Item = ({lineClassName, selectClassName, errorClassName, errorMessage, selectedItemName, handleSelectChangeFunction, listItems, handleClickWorksFunction}) => {
    return(
        <>
                        <label>
                            <p>* Sélectionnez les travaux à réaliser</p>
                            <Line className={lineClassName} />
                            <div className={selectClassName}>
                               <select value={selectedItemName} onChange={handleSelectChangeFunction}>
                               {listItems.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                                </select> 
                            </div>
                            
                        </label>
                        { (errorMessage && !selectedItemName) ? (<p className={errorClassName}>{errorMessage}</p>) : null }
                        <button type="button" onClick={() => handleClickWorksFunction()}>Etape suivante</button>
                    </>
    )
}

Item.propTypes = {
    lineClassName: PropTypes.string,
    selectClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    errorMessage: PropTypes.string,
    selectedItemName: PropTypes.string,
    handleSelectChangeFunction: PropTypes.func.isRequired,
    listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleClickWorksFunction: PropTypes.func.isRequired,
};

export default Item;