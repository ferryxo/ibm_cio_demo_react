import { fetchGroups } from '../redux/slices/groupSlice';
import store from '../redux/store';

export const postEditMember = ({ groupId, group, memberId, name, color }) => {
    const objGroup = {
        'id': groupId,
        group,
        'member': [
           { 'id': memberId, color, name }
        ]
    };
    
    fetch(`http://localhost:8081/api/v1/members/${memberId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify(objGroup)
    }).then(function (response) {
        if (response.ok) {
            store.dispatch(fetchGroups());
        }
    }).catch((e) => console.log(e));
};

export const deleteMemberById = (id) => {            
    fetch(`http://localhost:8081/api/v1/members/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'delete'        
    }).then(function (response) {
        if (response.ok) {
            store.dispatch(fetchGroups());
        }
    }).catch((e) => console.log(e));
};