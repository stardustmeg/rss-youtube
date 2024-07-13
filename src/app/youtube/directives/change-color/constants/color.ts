import { StyleChangeOptionType } from './style';

export const colorOption = {
  BLUE: '#0096FF',
  GREEN: '#0BDA51',
  RED: '#DC143C',
  YELLOW: '#FFD700',
} as const;

export type ColorOptionType = (typeof colorOption)[keyof typeof colorOption];

export const styleColorOption: Record<StyleChangeOptionType, string> = {
  background: '{{color}}',
  borderBottom: '10px solid {{color}}',
} as const;

export type StyleColorOptionType = (typeof styleColorOption)[keyof typeof styleColorOption];
