import { colorOption } from '../constants/color';
import { determineColor } from './determine-color';

describe('determineColor', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const setFakeDate = (fakeDate: Date): void => {
    jest.setSystemTime(fakeDate);
  };

  it('should return RED for dates older than half a year', () => {
    setFakeDate(new Date('2023-10-01'));
    const date = '2023-01-01';
    expect(determineColor(date)).toBe(colorOption.RED);
  });

  it('should return YELLOW for dates older than a month but less than half a year', () => {
    setFakeDate(new Date('2023-10-01'));
    const date = '2023-08-01';
    expect(determineColor(date)).toBe(colorOption.YELLOW);
  });

  it('should return GREEN for dates older than a week but less than a month', () => {
    setFakeDate(new Date('2023-10-01'));
    const date = '2023-09-15';
    expect(determineColor(date)).toBe(colorOption.GREEN);
  });

  it('should return BLUE for dates within the last week', () => {
    setFakeDate(new Date('2023-10-01'));
    const date = '2023-09-28';
    expect(determineColor(date)).toBe(colorOption.BLUE);
  });
});
