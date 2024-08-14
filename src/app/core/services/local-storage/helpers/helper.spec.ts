import { isValidLocalStorageData } from './helper';

describe('isValidLocalStorageData', () => {
  it('should return false if data is null or undefined', () => {
    expect(isValidLocalStorageData(null)).toBe(false);
    expect(isValidLocalStorageData(undefined)).toBe(false);
  });

  it('should return false if data is not an object', () => {
    expect(isValidLocalStorageData('string')).toBe(false);
    expect(isValidLocalStorageData(123)).toBe(false);
    expect(isValidLocalStorageData(true)).toBe(false);
  });

  it('should return false if data object does not contain name or token', () => {
    expect(isValidLocalStorageData({})).toBe(false);
    expect(isValidLocalStorageData({ name: 'Alice' })).toBe(false);
    expect(isValidLocalStorageData({ token: 'abc123' })).toBe(false);
  });

  it('should return true if data object contains both name and token', () => {
    expect(isValidLocalStorageData({ name: 'Alice', token: 'abc123' })).toBe(true);
  });

  it('should return false if data object has additional properties but is missing name or token', () => {
    expect(isValidLocalStorageData({ name: 'Alice', extra: 'extra' })).toBe(false);
    expect(isValidLocalStorageData({ token: 'abc123', extra: 'extra' })).toBe(false);
  });

  it('should return true if data object contains both name and token along with additional properties', () => {
    expect(isValidLocalStorageData({ name: 'Alice', token: 'abc123', extra: 'extra' })).toBe(true);
  });
});
