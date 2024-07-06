export const CustomButtonType = {
  FAB: 'mat-fab',
  ICON: 'mat-icon-button',
  MINI_FAB: 'mat-mini-fab',
  RAISED: 'mat-raised-button',
} as const;

export type CustomButtonTypeType = (typeof CustomButtonType)[keyof typeof CustomButtonType];
