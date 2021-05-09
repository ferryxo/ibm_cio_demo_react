import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export const Input = ({ initVal, onChangeFn }) => {

    const [value, setValue] = useState(initVal);

    useEffect(() => {
        setValue(initVal);
    }, [initVal]);

    const onChange = (e) => {
        const val = e.target.value;
        setValue(val);
        onChangeFn(val);
    };

    return <input className='.pure-input-1-4' value={value} onChange={onChange} ></input>;
};

Input.propTypes = {
    initVal: PropTypes.string,
    onChangeFn: PropTypes.func
};