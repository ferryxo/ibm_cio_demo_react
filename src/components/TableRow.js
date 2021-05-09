import PropTypes from 'prop-types';
//import 'purecss/build/forms.css';
import './styles/Table.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { colorSelector } from '../redux/slices/colorSlice';
import { deleteMemberById, postEditMember } from '../utils/HttpService';
import { Input } from './Input';
import { Dropdown } from './Dropdown';

const TableRow = ({ index, isEdit, groupId, group, memberId, name, color, insertRow }) => {    
    const { colors } = useSelector(colorSelector);
    const [rowEdit, setRowEdit] = useState(isEdit);
    const [groupEdited, setGroupEdited] = useState(group);
    const [nameEdited, setNameEdited] = useState(name);
    const [colorEdited, setColorEdited] = useState(color);

    useEffect(() => {
        setGroupEdited(group);
        setNameEdited(name);
        setColorEdited(color);
        setRowEdit(isEdit)
    }, [group, name, color, isEdit])
    
    //should be i8n 
    const editButtonLabel = rowEdit ? 'Save' : ' Edit ';

    const handleGroupChange = (val) => setGroupEdited(val);
    const handleNameChange = (val) => setNameEdited(val);
    const handleColorChange = (val) => setColorEdited(val);    

    const onEditClick = () => {
        setRowEdit(!rowEdit);
        //save was clicked
        if (editButtonLabel === 'Save') {
            postEditMember({ groupId, group: groupEdited, memberId, name: nameEdited, color: colorEdited });
        }
    };

    const onDeleteClick = () => {
        if (window.confirm(`Delete ${nameEdited}?`)) {
            deleteMemberById(memberId)
        }
    };

    const onAddClick = () => {        
        insertRow(index);
    };


    const row = <tr>
        <td>
            {!rowEdit && group}
            {rowEdit && <Input initVal={group} onChangeFn={handleGroupChange} />}
        </td>
        <td>
            {!rowEdit && name}
            {rowEdit && <Input initVal={name} onChangeFn={handleNameChange} />}
        </td>
        <td>
            {!rowEdit && color}
            {rowEdit && <Dropdown initVal={color} options={ colors } onChangeFn={handleColorChange} />}
        </td>
        <td>
            <button className='pure-button pure-button-active' onClick={onAddClick}> Add </button>
            &nbsp;
            <button className='pure-button pure-button-active' onClick={onEditClick}> {editButtonLabel} </button>
            &nbsp;
            <button className='pure-button pure-button-active' onClick={onDeleteClick}> Delete </button>
        </td>
    </tr>;

    return row;
}

TableRow.propTypes = {
    groupId: PropTypes.string,
    group: PropTypes.string,
    memberId: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,        
};


export default TableRow;