import '@babel/polyfill';
import applyEffects from '.';


describe('applyEffects', () => {
  const dispatch = () => {};

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

  it('handles an array of effects', () => {
    const getState = () => ({ foo: 'bar' });
    const next = () => {};
    const d = jest.fn();
    const effect1 = jest.fn(async () => d({ type: 'ANOTHER_ACTION' }));
    const effect2 = jest.fn(() => d({ type: 'A_THIRD_ACTION' }));

    const effects = {
      ACTION: [effect1, effect2],
    };
    const middleware = applyEffects(effects);

    middleware({ dispatch, getState })(next)({ type: 'ACTION' });

    expect(effect1).toHaveBeenCalledWith({ foo: 'bar' }, dispatch);
    expect(effect2).toHaveBeenCalledWith({ foo: 'bar' }, dispatch);
    expect(d).toHaveBeenCalledWith({ type: 'ANOTHER_ACTION' });
    expect(d).toHaveBeenCalledWith({ type: 'A_THIRD_ACTION' });
  });
});
