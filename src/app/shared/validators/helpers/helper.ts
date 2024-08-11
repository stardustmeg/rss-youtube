import { ValidationErrors } from '@angular/forms';

export const isPasswordStrengthErrors = (
  errors: ValidationErrors | null,
): errors is { passwordStrength: Record<string, string> } =>
  errors !== null && typeof errors['passwordStrength'] === 'object';
