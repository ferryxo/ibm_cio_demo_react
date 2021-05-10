import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TableRow from '../TableRow';
import Adapter from 'enzyme-adapter-react-17-updated';
import { mount, shallow, configure } from 'enzyme';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() })

const flushPromises = () => new Promise(setImmediate);

const BASE_URL = 'http://localhost:8081/';
const API_URL = BASE_URL + 'api/v1/';

describe('Table row', () => {
    let store;
    
    beforeEach(() => {
        store = mockStore({
            colors: {
                loading: false,
                colors: ['Red', 'Blue'],
                hasError: false
            }
        });

        fetchMock.resetMocks();
    });

    it('should render the row with group, name, color as text', () => {

        const props = {
            groupId: '1', group: 'Group1', memberId: '1', name: 'Peter', color: 'Red', isEdit: false, insertRow: jest.fn()
        };

        const wrapper = mount(
            <Provider store={store}>
                <TableRow { ...props } />
            </Provider>
        );

        expect(wrapper.find('TableRow').length).toBe(1);
        const container = wrapper.find('TableRow');
        
        const tableCells = container.find('td');
        expect(tableCells.length).toBe(4);
        expect(tableCells.get(0).props.children[0]).toEqual(props.group);
        expect(tableCells.get(1).props.children[0]).toEqual(props.name);
        expect(tableCells.get(2).props.children[0]).toEqual(props.color);

        const buttons = container.find('button');
        expect(buttons.length).toBe(3);

        expect(buttons.get(0).props.children).toBe(' Add ');
        expect(buttons.get(1).props.children.includes(' Edit ')).toBeTruthy();
        expect(buttons.get(2).props.children).toBe(' Delete ');

        let editBtn = wrapper.find('button').at(1);
        editBtn.simulate('click');
        editBtn = wrapper.find('button').at(1);
        expect(editBtn.props().children.includes('Save')).toBeTruthy();

        const inputs = wrapper.find('Input');
        expect(inputs.length).toBe(2);
        const dropdown = wrapper.find('Dropdown');
        expect(dropdown.length).toBe(1);

    });
    
    it('should render the row with input fields', () => {

        const props = {
            groupId: '1', group: 'Group1', memberId: '1', name: 'Peter', color: 'Red', isEdit: false, insertRow: jest.fn()
        };

        const wrapper = mount(
            <Provider store={store}>
                <TableRow { ...props } />
            </Provider>
        );

        expect(wrapper.find('TableRow').length).toBe(1);
        
        let editBtn = wrapper.find('button').at(1);
        editBtn.simulate('click');
        editBtn = wrapper.find('button').at(1);
        expect(editBtn.props().children.includes('Save')).toBeTruthy();

        const inputs = wrapper.find('Input');
        expect(inputs.length).toBe(2);
        const dropdown = wrapper.find('Dropdown');
        expect(dropdown.length).toBe(1);

    });
    
    it('should fetch post editMember with the input values then hydrate', (done) => {

        const props = {
            groupId: '1', group: 'Group1', memberId: '1', name: 'Peter', color: 'Red', isEdit: false, insertRow: jest.fn()
        };

        const wrapper = mount(
            <Provider store={store}>
                <TableRow { ...props } />
            </Provider>
        );
        
        fetch.mockResponseOnce(JSON.stringify({ "jwt": "abcd" }));

        expect(wrapper.find('TableRow').length).toBe(1);
        
        let editBtn = wrapper.find('button').at(1);
        editBtn.simulate('click');
        editBtn = wrapper.find('button').at(1);
        editBtn.simulate('click');
        
        setImmediate(() => {
            expect(fetch).toBeCalledTimes(3);

            expect(fetch).toHaveBeenNthCalledWith(1,
                BASE_URL + "login", {"body": "username=user&password=1234", "headers": {"Content-Type": "application/x-www-form-urlencoded"}, "method": "post"}
            );
            expect(fetch).toHaveBeenNthCalledWith(2,
                API_URL + 'members/1', {"body": "{\"id\":\"1\",\"group\":\"Group1\",\"member\":[{\"id\":\"1\",\"color\":\"Red\",\"name\":\"Peter\"}]}", "headers": {"Authorization": "Bearer abcd", "Content-Type": "application/json"}, "method": "post"}
            );
            expect(fetch).toHaveBeenNthCalledWith(3,
                API_URL + "groups", {"headers": {"Authorization": "Bearer abcd", "Content-Type": "application/json"}, "mode": "cors"}
            );
            done();
        });
                
    });

    it('should fetch delete member with the input values then hydrate', (done) => {

        const props = {
            groupId: '1', group: 'Group1', memberId: '1', name: 'Peter', color: 'Red', isEdit: false, insertRow: jest.fn()
        };

        const wrapper = mount(
            <Provider store={store}>
                <TableRow { ...props } />
            </Provider>
        );
        
        fetch.mockResponseOnce(JSON.stringify({ "jwt": "abcd" }));
        window.confirm = jest.fn(() => true)

        expect(wrapper.find('TableRow').length).toBe(1);
        
        let editBtn = wrapper.find('button').at(2);
        editBtn.simulate('click');
        
        setImmediate(() => {
            expect(fetch).toBeCalledTimes(2);
            expect(fetch).toHaveBeenNthCalledWith(1, API_URL + "members/1", {"headers": {"Authorization": "Bearer abcd", "Content-Type": "application/json"}, "method": "delete"});
            expect(fetch).toHaveBeenNthCalledWith(2, API_URL + "groups", {"headers": {"Authorization": "Bearer abcd", "Content-Type": "application/json"}, "mode": "cors"});
            done();
        });
                
    });
    
    
});