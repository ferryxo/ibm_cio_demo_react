import reducer, { initialState, getColors, getColorsSuccess, getColorsFailure, colorSelector } from '../colorSlice';

describe('color slice', () => {
    describe('reducer, actions and selectors', () => {
        it('should return the initial state on first run', () => {
            const nextState = initialState;
            const result = reducer(undefined, {});            
            expect(result).toEqual(nextState);
        });

        it('should set colors, loading and error properly', () => {            
            const payload = ['test'];
            
            let nextState = reducer(initialState, getColors());            
            expect(nextState.loading).toBeTruthy();

            nextState = reducer(initialState, getColorsSuccess(payload));            
            expect(nextState.loading).toBeFalsy();
            expect(nextState.hasErrors).toBeFalsy();
            expect(nextState.colors).toBe(payload);

            nextState = reducer(initialState, getColorsFailure());            
            expect(nextState.loading).toBeFalsy();
            expect(nextState.hasErrors).toBeTruthy();
        });
        it('selector should return the correct state', () => {
            const payload = ['test'];
            const nextState = reducer(initialState, getColorsSuccess(payload));
            const rootState = { colors: nextState };
            expect(colorSelector(rootState)).toEqual(nextState);
        });
    });
});
