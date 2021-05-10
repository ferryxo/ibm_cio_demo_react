import PropTypes from 'prop-types';
import 'purecss/build/tables.css';
import './styles/Table.css';
import TableRow from './TableRow';
import FilterField from './FilterField';
import { filterSelector } from '../redux/slices/filterSlice';
import { sortSelector, setSortColumn } from '../redux/slices/sortSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const Table = ({ title, data }) => {
    const { pattern } = useSelector(filterSelector);
    const { sortBy, sortDirection } = useSelector(sortSelector);
    const [forceUpdate, setForceUpdate] = useState(0); // integer state

    const dispatch = useDispatch();
    
    const re = new RegExp(pattern, 'i')
    const filteredData = pattern
        ? data.filter(d => re.test(d.group) || re.test(d.name) || re.test(d.color))            
        : data;
    filteredData.sort((x, y) => x[sortBy] > y[sortBy] ? sortDirection : -sortDirection);
    
    const handleSort = (e) => {
        e.preventDefault();      
        const sortByRequest = e.target.id;        
        const sortDirRequest = sortBy === sortByRequest ? -sortDirection : 1;
        dispatch(setSortColumn({ sortBy: sortByRequest, sortDirection: sortDirRequest }));
    };
    
    const insertRow = (index, group, color) => {
        const emptyData = { groupId: null, group, memberId: null , name: '_EDIT_ME_', color, isEdit: true }
        filteredData.splice(index, 0, emptyData);
        setForceUpdate(forceUpdate+1);
    };

    const rows = createRow(filteredData, insertRow, sortBy);

    const showAddButton = filteredData.length < 1;

    const table = <div>
        <h1 id='title'>{title}</h1>
        <FilterField label='Filter ' />
        <br/>
        <table className='pure-table width-20'>
            <thead>                                
                <tr>
                    <td><a id='group' href='_blank' onClick={handleSort}>Group</a></td>
                    <td><a id='name' href='_blank' onClick={handleSort}>Name</a></td>
                    <td><a id='color' href='_blank' onClick={handleSort}>Color</a></td>
                    <td>
                        {!showAddButton && <div>Edit</div>}
                        {showAddButton && <button className='pure-button pure-button-active' onClick={() => insertRow(1)}> Add </button>}
                    </td>
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    </div>

    return table;
};


const createRow = (filteredData, insertRow, sortBy) => {
    const shouldNotBeGrouped = ['name'];
    let lastGroup = null;
    const rows = filteredData && filteredData.map((data, index) => {
        const props = { ...data, insertRow, index };
        const currentGroup = data[sortBy];
        const seperator = !shouldNotBeGrouped.includes(sortBy) && lastGroup !== currentGroup
            ? <tr key={100 + index} className='pure-table-odd'><td colSpan={4} align={'middle'}>{currentGroup}</td></tr>
            : null;
        lastGroup = currentGroup;
        return <>{seperator} <TableRow key={index} {...props}></TableRow></>;
    });
    return rows;
}

Table.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array.isRequired
};

export default Table;

