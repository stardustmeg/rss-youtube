import { AbstractControl, ValidationErrors } from '@angular/forms';

const hasMinimumLength = (control: AbstractControl): ValidationErrors | null => {
  if (typeof control.value !== 'string') {
    return null;
  }
  const minLength = control.value.length >= 8;
  return minLength ? null : { minLength: true };
};

const hasUpperCase = (control: AbstractControl): ValidationErrors | null => {
  if (typeof control.value !== 'string') {
    return null;
  }
  const hasUpperCase = /[A-Z]/.test(control.value);
  return hasUpperCase ? null : { upperCase: true };
};

const hasLowerCase = (control: AbstractControl): ValidationErrors | null => {
  if (typeof control.value !== 'string') {
    return null;
  }
  const hasLowerCase = /[a-z]/.test(control.value);
  return hasLowerCase ? null : { lowerCase: true };
};

const hasNumber = (control: AbstractControl): ValidationErrors | null => {
  if (typeof control.value !== 'string') {
    return null;
  }
  const hasNumber = /[0-9]/.test(control.value);
  return hasNumber ? null : { number: true };
};

const hasSpecialCharacter = (control: AbstractControl): ValidationErrors | null => {
  if (typeof control.value !== 'string') {
    return null;
  }
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
  return hasSpecialCharacter ? null : { specialCharacter: true };
};

export const passwordStrengthValidator = (control: AbstractControl): ValidationErrors | null => {
  if (typeof control.value !== 'string') {
    return null;
  }

  const validators = [
    hasMinimumLength(control),
    hasUpperCase(control),
    hasLowerCase(control),
    hasNumber(control),
    hasSpecialCharacter(control),
  ];

  const errors = validators.reduce((acc, error) => (error ? { ...acc, ...error } : acc), {});

  if (!errors) {
    return null;
  }

  return Object.keys(errors).length ? { passwordStrength: errors } : null;
};
