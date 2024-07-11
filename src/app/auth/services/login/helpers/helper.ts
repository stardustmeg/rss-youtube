interface LocalStorageData {
  name: string;
  token: string;
}

export const isValidLocalStorageData = (data: unknown): data is LocalStorageData => {
  if (!data) {
    return false;
  }
  if (typeof data !== 'object') {
    return false;
  }
  return 'name' in data && 'token' in data;
};
