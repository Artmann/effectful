import '@babel/polyfill';
import applyEffects from '.';


describe('applyEffects', () => {
  it('returns a function to handle next', () => {
    const next = applyEffects({});

    expect(next).toBeInstanceOf(Function);
  });

  it('calls the the next middleware', () => {
    const middleware = applyEffects({});
    const next = jest.fn();
    const action = { type: 'DO_STUFF' };
    const store = {
      getState: () => {},
      dispatch: () => {},
    };

    middleware(store)(next)(action);

    expect(next).toHaveBeenCalledWith(action);
  });

  it('triggers effects', () => {
    const dispatch = () => {};
    const state = { foo: 'bar' };
    const getState = () => state;
    const next = () => {};

    const effects = {
      ACTION_1: jest.fn(),
      ACTION_2: jest.fn(),
    };
    const middleware = applyEffects(effects);

    middleware({ dispatch, getState })(next)({ type: 'ACTION_1' });

    expect(effects.ACTION_1).toHaveBeenCalledWith(state, dispatch);
    expect(effects.ACTION_2).not.toHaveBeenCalled();
  });

  it('works with async effects', () => {
    let hasBeenCalled = false;

    const dispatch = () => {};
    const getState = () => ({});
    const next = () => {};
    const effects = {
      ACTION: async () => {
        hasBeenCalled = true;
      },
    };
    const middleware = applyEffects(effects);

    middleware({ dispatch, getState })(next)({ type: 'ACTION' });

    expect(hasBeenCalled).toBeTruthy();
  });
});
