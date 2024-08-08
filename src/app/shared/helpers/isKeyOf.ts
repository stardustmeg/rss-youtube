export const isKeyOf = <T extends object>(obj: T, key: number | string | symbol): key is keyof T => key in obj;
