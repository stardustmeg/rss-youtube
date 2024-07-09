export const BorderColorOption = {
  BLUE: '#0096FF',
  GREEN: '#0BDA51',
  RED: '#DC143C',
  YELLOW: '#FFD700',
} as const;

export const BORDER_COLOR = '10px solid {{color}}';

export type BorderColorOptionType = (typeof BorderColorOption)[keyof typeof BorderColorOption];
