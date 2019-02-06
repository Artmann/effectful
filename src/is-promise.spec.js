import '@babel/polyfill';
import isPromise from './is-promise';

describe('isPromise', () => {
  it('returns true for promises', () => {
    const promise = { then: () => {} };

    expect(isPromise(promise)).toBeTruthy();
  });

  it('returns true for async functions', () => {
    const fn = async () => {};

    expect(fn()).toBeTruthy();
  });

  it('returns false for null', () => {
    expect(isPromise(null)).toBeFalsy();
  });

  it('returns false for undefined', () => {
    expect(isPromise(undefined)).toBeFalsy();
  });

  it('returns false for object', () => {
    expect(isPromise({})).toBeFalsy();
  });

  it('returns false for function', () => {
    expect(isPromise(() => {})).toBeFalsy();
  });

  it('returns false for array', () => {
    expect(isPromise([])).toBeFalsy();
    expect(isPromise([1, 2, 3])).toBeFalsy();
  });

  it('returns false for number', () => {
    expect(isPromise(0)).toBeFalsy();
    expect(isPromise(42)).toBeFalsy();
    expect(isPromise(-42)).toBeFalsy();
  });

  it('returns false for string', () => {
    expect(isPromise('')).toBeFalsy();
  });
});
