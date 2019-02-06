import isPromise from './is-promise';

export default function applyEffects(effects) {
  const middleware = store => next => (action) => {
    const result = next(action);

    if (!Object.prototype.hasOwnProperty.call(effects, action.type)) {
      return result;
    }

    const effect = effects[action.type](store.getState(), store.dispatch);

    if (isPromise(effect)) {
      return effect.then(() => result);
    }

    return result;
  };

  return middleware;
}
