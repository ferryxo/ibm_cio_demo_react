import { useState } from 'react';

export const Input = ({ initVal, onChangeFn }) => {

    const [value, setValue] = useState(initVal);

    const onChange = (e) => {
        const val = e.target.value;
        setValue(val);
        onChangeFn(val);
    };

    return <input className='.pure-input-1-4' value={value} onChange={onChange}></input>;
};
