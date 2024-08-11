const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateRandomVideoId = (length = 12): string =>
  Array.from({ length }, () => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]).join('');
