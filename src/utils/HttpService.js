import { fetchGroups } from '../redux/slices/groupSlice';
import { setWithExpiry, getWithExpiry, BEARER_STORAGE_KEY } from './LocalStorageUtil';
import store from '../redux/store';
import qs from 'querystring';

//TODO: build a login page
export const username = 'user';
export const password = '1234';

export const fetchBearerToken = async () => {
    try { 
        const response = await fetch(`http://localhost:8081/login`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            method: 'post',
            body: qs.stringify({
                username,
                password,
            })
        });
        const token = await response.json();;
        return token;
    } catch (e) {
        console.log(e);
    }
};

export const getBearerToken = async () =>  {
    let token = getWithExpiry(BEARER_STORAGE_KEY);
    if (!token) {        
        token = await fetchBearerToken();
        setWithExpiry(BEARER_STORAGE_KEY, token, 3600000);
    }
    return token;
}

export const postEditMember = ({ groupId, group, memberId, name, color }) => {
    const objGroup = {
        'id': groupId,
        group,
        'member': [
           { 'id': memberId, color, name }
        ]
    };
    getBearerToken().then(token => {
        fetch(`http://localhost:8081/api/v1/members/${memberId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.jwt
                },
                method: 'post',
                body: JSON.stringify(objGroup)
            }).then(function (response) {
                if (response.ok) {                    
                    store.dispatch(fetchGroups(token));                    
                }
            }).catch((e) => console.log(e));
    });    
};

export const deleteMemberById = (id) => {
    getBearerToken().then(token => {
        fetch(`http://localhost:8081/api/v1/members/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.jwt
            },
            method: 'delete'        
        }).then(function (response) {
            if (response.ok) {
                store.dispatch(fetchGroups(token));
            }
        }).catch((e) => console.log(e));
    }); 
};
