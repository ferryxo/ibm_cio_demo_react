import { useState } from 'react';

export const Dropdown = ({ initVal, options, onChangeFn }) => {
    const [value, setValue] = useState(initVal);

    const onChange = (e) => {
        const val = e.target.value;
        setValue(val);
        onChangeFn(val);
    };

    const optionTags = options && options.map(val => <option key={val} value={val}>{val}</option>);

    return <select className='.pure-input-1-4' value={value} onChange={onChange}>
        {optionTags}
    </select>;

};
