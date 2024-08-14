import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { isValidLocalStorageData } from './helpers/helper';

jest.mock('./helpers/helper', () => ({
  isValidLocalStorageData: jest.fn(),
}));

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    service = TestBed.inject(LocalStorageService);

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get item from localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';
    (localStorage.getItem as jest.Mock).mockReturnValue(value);

    const result = service.getItem(key);
    expect(result).toBe(value);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should set item in localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';
    service.setItem(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });

  it('should remove item from localStorage', () => {
    const key = 'testKey';
    service.removeItem(key);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it('should return null if user data is invalid', () => {
    const key = 'testKey';
    const invalidData = JSON.stringify({ invalid: true });
    (localStorage.getItem as jest.Mock).mockReturnValue(invalidData);
    (isValidLocalStorageData as jest.MockedFunction<typeof isValidLocalStorageData>).mockReturnValue(false);

    const result = service.getUserName(key);
    expect(result).toBeNull();
    expect(isValidLocalStorageData).toHaveBeenCalledWith(JSON.parse(invalidData));
  });

  it('should return user name if data is valid', () => {
    const key = 'testKey';
    const validData = { name: 'John Doe', token: 'abcd1234' };
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(validData));
    (isValidLocalStorageData as jest.MockedFunction<typeof isValidLocalStorageData>).mockReturnValue(true);

    const result = service.getUserName(key);
    expect(result).toBe('John Doe');
    expect(isValidLocalStorageData).toHaveBeenCalledWith(validData);
  });

  it('should return null if localStorage item is null', () => {
    const key = 'testKey';
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    const result = service.getUserName(key);
    expect(result).toBeNull();
  });
});
