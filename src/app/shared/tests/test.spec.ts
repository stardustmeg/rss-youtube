import { isKeyOf } from '../helpers/isKeyOf';
import { stringTemplate } from '../utils/string-template';

describe('stringTemplate', () => {
  it('should replace placeholders with corresponding values', () => {
    const template = 'Hello, {{name}}! You have {{count}} new messages.';
    const values = {
      name: 'Alice',
      count: 5,
    };
    const result = stringTemplate(template, values);
    expect(result).toBe('Hello, Alice! You have 5 new messages.');
  });

  it('should leave placeholders unchanged if no corresponding value is provided', () => {
    const template = 'Hello, {{name}}! You have {{count}} new messages.';
    const values = {
      name: 'Alice',
    };
    const result = stringTemplate(template, values);
    expect(result).toBe('Hello, Alice! You have {{count}} new messages.');
  });

  it('should work with different types of values', () => {
    const template = 'Pi is approximately {{pi}} and today is {{day}}.';
    const values = {
      pi: 3.14,
      day: 'Tuesday',
    };
    const result = stringTemplate(template, values);
    expect(result).toBe('Pi is approximately 3.14 and today is Tuesday.');
  });

  it('should handle multiple occurrences of the same placeholder', () => {
    const template = '{{greet}}, {{greet}}!';
    const values = {
      greet: 'Hi',
    };
    const result = stringTemplate(template, values);
    expect(result).toBe('Hi, Hi!');
  });

  it('should return the original template if there are no placeholders', () => {
    const template = 'No placeholders here!';
    const values = {};
    const result = stringTemplate(template, values);
    expect(result).toBe('No placeholders here!');
  });

  it('should handle empty template and values', () => {
    const template = '';
    const values = {};
    const result = stringTemplate(template, values);
    expect(result).toBe('');
  });
});

describe('isKeyOf', () => {
  it('should return true if key exists in the object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(isKeyOf(obj, 'a')).toBe(true);
    expect(isKeyOf(obj, 'b')).toBe(true);
    expect(isKeyOf(obj, 'c')).toBe(true);
  });

  it('should return false if key does not exist in the object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(isKeyOf(obj, 'd')).toBe(false);
    expect(isKeyOf(obj, 'e')).toBe(false);
    expect(isKeyOf(obj, 'f')).toBe(false);
  });

  it('should return true if symbol key exists in the object', () => {
    const sym = Symbol('sym');
    const obj = { [sym]: 'value' };
    expect(isKeyOf(obj, sym)).toBe(true);
  });

  it('should return false if symbol key does not exist in the object', () => {
    const sym = Symbol('sym');
    const obj = { [sym]: 'value' };
    const anotherSym = Symbol('anotherSym');
    expect(isKeyOf(obj, anotherSym)).toBe(false);
  });

  it('should return false if number key does not exist in the object', () => {
    const obj = { 1: 'one', 2: 'two', 3: 'three' };
    expect(isKeyOf(obj, 4)).toBe(false);
  });

  it('should return true if number key exists in the object', () => {
    const obj = { 1: 'one', 2: 'two', 3: 'three' };
    expect(isKeyOf(obj, 1)).toBe(true);
    expect(isKeyOf(obj, 2)).toBe(true);
    expect(isKeyOf(obj, 3)).toBe(true);
  });
});
