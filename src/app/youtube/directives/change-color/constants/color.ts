export const colorOption = {
  BLUE: '#0096FF',
  GREEN: '#0BDA51',
  RED: '#DC143C',
  YELLOW: '#FFD700',
} as const;

export type ColorOptionType = (typeof colorOption)[keyof typeof colorOption];

export const styleChangeOption = {
  BACKGROUND: 'background',
  BORDER: 'borderBottom',
} as const;

export type StyleChangeOptionType = (typeof styleChangeOption)[keyof typeof styleChangeOption];

export const BORDER_COLOR = '10px solid {{color}}';
export const COLOR = '{{color}}';
