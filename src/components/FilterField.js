import { setFilter, filterSelector } from '../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from './Input';

const FilterField = (props) => {
    const { label } = props;
    const dispatch = useDispatch();
    const { pattern } = useSelector(filterSelector);
    
    const handleFilterChange = (val) => {        
        dispatch(setFilter(val));
    };
    
    return (
        <div>
            <label>{label}</label>
            <Input initVal={pattern} onChangeFn={handleFilterChange}></Input>
        </div>
    );
};

export default FilterField;