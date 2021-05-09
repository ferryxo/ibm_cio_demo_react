import reducer, { initialState, setFilter, filterSelector } from '../filterSlice';

describe('filter slice', () => {
    describe('reducer, actions and selectors', () => {
        it('should return the initial state on first run', () => {
            const nextState = initialState;
            const result = reducer(undefined, {});            
            expect(result).toEqual(nextState);
        });

        it('should properly set the state when filter is typed in', () => {
            const payload = 'test';
            const nextState = reducer(initialState, setFilter(payload));
            const rootState = { filter: nextState };           
            expect(nextState).toEqual(filterSelector(rootState));
        });
    });
});

