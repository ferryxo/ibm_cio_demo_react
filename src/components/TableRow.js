import PropTypes from 'prop-types';
import 'purecss/build/forms.css';
import './styles/Table.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { colorSelector } from '../redux/slices/colorSlice';
import { deleteMemberById, postEditMember } from '../utils/HttpService';
import { Input } from './Input';
import { Dropdown } from './Dropdown';

const TableRow = ({ index, isEdit, groupId, group, memberId, name, color, insertRow }) => {    
    const { colors } = useSelector(colorSelector);
    const [edit, setEdit] = useState(isEdit);
    const [groupEdit, setGroupEdit] = useState(group);
    const [nameEdit, setNameEdit] = useState(name);
    const [colorEdit, setColorEdit] = useState(color);

    useEffect(() => { setGroupEdit(group) }, [group])
    useEffect(() => { setNameEdit(name) }, [name])
    useEffect(() => { setColorEdit(color) }, [color])
    useEffect(() => { setEdit(isEdit) }, [isEdit])
    
    //should be i8n 
    const editButtonLabel = edit ? 'Save' : 'Edit';

    const handleGroupChange = (val) => setGroupEdit(val);
    const handleNameChange = (val) => setNameEdit(val);
    const handleColorChange = (val) => setColorEdit(val);    

    const onEditClick = () => {
        setEdit(!edit);
        //save was clicked
        if (editButtonLabel === 'Save') {
            postEditMember({ groupId, group: groupEdit, memberId, name: nameEdit, color: colorEdit });
        }
    };

    const onDeleteClick = () => {
        if (window.confirm(`Delete ${nameEdit}?`)) {
            deleteMemberById(memberId)
        }
    };

    const onAddClick = () => {        
        insertRow(index);
    };


    const row = <tr>
        <td>
            {!edit && group}
            {edit && <Input initVal={group} onChangeFn={handleGroupChange} />}
        </td>
        <td>
            {!edit && name}
            {edit && <Input initVal={name} onChangeFn={handleNameChange} />}
        </td>
        <td>
            {!edit && color}
            {edit && <Dropdown initVal={color} options={ colors } onChangeFn={handleColorChange} />}
        </td>
        <td>
            <button className='pure-button pure-button-active' onClick={onAddClick}> Add </button>
            <button className='pure-button pure-button-active' onClick={onEditClick}> {editButtonLabel} </button>
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