import './Filter.scss';
import PropTypes from 'prop-types';

const Filter = ({value, onChangeFilter}) => (
    <div className="FindForm">
        <label htmlFor="find"
            className="FindLabel">
            Find contact by name
            </label>
        <input
            type="text"
            value={value}
            id="find"
            className="FindInput"
            onChange={e => onChangeFilter(e.target.value)}
             />
</div>
)

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func
};

export default Filter;