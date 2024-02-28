import PropTypes from 'prop-types';

function Line({ className }) {
    return (
        <div className={ className }></div>
    )
}

Line.propTypes = {
    className: PropTypes.string.isRequired,
};

export default Line;