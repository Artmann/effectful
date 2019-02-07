import ensureArray from './ensure-array';

export default function applyEffects(effectMapping) {
  const middleware = store => next => (action) => {
    const result = next(action);

    if (!Object.prototype.hasOwnProperty.call(effectMapping, action.type)) {
      return result;
    }

    const { dispatch, getState } = store;
    const effects = ensureArray(effectMapping[action.type]);

    effects.forEach(effect => effect(getState(), dispatch));

    return result;
  };

  return middleware;
}
