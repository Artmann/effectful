import ensureArray from './ensure-array';

describe('ensureArray', () => {
  it('does nothing with arrays', () => {
    expect(ensureArray([1, 2, 3])).toEqual([1, 2, 3]);
    expect(ensureArray([])).toEqual([]);
  });

  it('wraps a function in an array', () => {
    const fn = () => {};

    expect(ensureArray(fn)).toEqual([fn]);
  });

  it('wraps an object in an array', () => {
    const obj = {};

    expect(ensureArray(obj)).toEqual([obj]);
  });
});
