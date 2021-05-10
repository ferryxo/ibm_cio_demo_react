import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TableRow from '../TableRow';
import Adapter from 'enzyme-adapter-react-17-updated';
import { mount, shallow, configure } from 'enzyme';


const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() })

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
        const container = wrapper.find('TableRow');
        
        let editBtn = wrapper.find('button').at(1);
        editBtn.simulate('click');
        editBtn = wrapper.find('button').at(1);
        expect(editBtn.props().children.includes('Save')).toBeTruthy();

        const inputs = wrapper.find('Input');
        expect(inputs.length).toBe(2);
        const dropdown = wrapper.find('Dropdown');
        expect(dropdown.length).toBe(1);

    });
});