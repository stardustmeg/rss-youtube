export const styleChangeOption = {
  background: 'background',
  borderBottom: 'borderBottom',
} as const;

export type StyleChangeOptionType = (typeof styleChangeOption)[keyof typeof styleChangeOption];

export const styleOption: Record<StyleChangeOptionType, string> = {
  background: `style.${styleChangeOption.background}`,
  borderBottom: `style.${styleChangeOption.borderBottom}`,
} as const;
