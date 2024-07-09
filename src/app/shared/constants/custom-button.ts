export const MaterialButtonType = {
  FAB: 'mat-fab',
  FLAT: 'mat-flat-button',
  ICON: 'mat-icon-button',
  MINI_FAB: 'mat-mini-fab',
  RAISED: 'mat-raised-button',
} as const;

export type MaterialButtonTypeType = (typeof MaterialButtonType)[keyof typeof MaterialButtonType];
