import { AbstractControl, ValidationErrors } from '@angular/forms';

import { validNumber } from './constants/limits';

const isValueString = (value: unknown): value is string => typeof value === 'string';

const createValidator =
  (predicate: (value: string) => boolean, errorKey: string, errorMessage: string) =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!isValueString(control.value)) {
      return null;
    }
    return predicate(control.value) ? null : { [errorKey]: errorMessage };
  };

const hasMinimumLength = createValidator(
  (value) => value.length >= validNumber.MIN_PASSWORD,
  'minLength',
  `Password must be at least ${validNumber.MIN_PASSWORD} characters long`,
);

const hasUpperCase = createValidator(
  (value) => /[A-Z]/.test(value),
  'upperCase',
  'Password must contain at least one uppercase letter',
);

const hasLowerCase = createValidator(
  (value) => /[a-z]/.test(value),
  'lowerCase',
  'Password must contain at least one lowercase letter',
);

const hasNumber = createValidator((value) => /\d/.test(value), 'number', 'Password must contain at least one number');

const hasSpecialCharacter = createValidator(
  (value) => /[^A-Za-z0-9]/.test(value),
  'specialCharacter',
  'Password must contain at least one special character i.e. !@#$%^&*()',
);

export const isFutureDate = (control: AbstractControl): ValidationErrors | null => {
  if (!(control.value instanceof Date)) {
    return null;
  }
  const date = new Date(control.value);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return date <= now ? null : { futureDate: 'Date must not be in the future' };
};

export const passwordStrengthValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!isValueString(control.value)) {
    return null;
  }

  const validators = [hasMinimumLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialCharacter];

  const errors: Record<string, string> = validators.reduce((acc, validator) => {
    const error = validator(control);
    return error ? { ...acc, ...error } : acc;
  }, {});

  return Object.keys(errors).length ? { passwordStrength: errors } : null;
};
