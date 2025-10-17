// Tests for initializeTimes() and updateTimes() in Booking.jsx

import { initializeTimes, updateTimes } from './Booking';

const REAL_fetchAPI = global.fetchAPI;

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date('2025-10-17T12:00:00Z')); // deterministic "today"
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
  global.fetchAPI = REAL_fetchAPI; // restore original if existed
});

describe('initializeTimes', () => {
  test('uses global fetchAPI when available and passes today as a Date', () => {
    const mockTimes = ['17:00', '18:00', '19:00'];
    global.fetchAPI = jest.fn().mockReturnValue(mockTimes);

    const result = initializeTimes();

    expect(global.fetchAPI).toHaveBeenCalledTimes(1);
    const arg = global.fetchAPI.mock.calls[0][0];
    expect(arg instanceof Date).toBe(true);

    // Assert it's "today" per our fixed clock
    expect(arg.getFullYear()).toBe(2025);
    expect(arg.getMonth()).toBe(9); // October = 9
    expect(arg.getDate()).toBe(17);

    expect(result).toEqual(mockTimes);
  });

  test('falls back to static slots when fetchAPI is not defined', () => {
    delete global.fetchAPI;

    const result = initializeTimes();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    // The fallback list defined in fetchData:
    expect(result).toEqual([
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30'
    ]);
  });
});

describe('updateTimes', () => {
  test('returns previous state for unknown action types (no-op)', () => {
    const prev = ['17:00'];
    // Unknown action
    const next = updateTimes(prev, { type: 'something_else' });
    expect(next).toBe(prev); // same reference => no change
  });

  test('on date_changed with Date payload: calls fetchAPI and returns its result', () => {
    const date = new Date('2025-10-21');
    const mockTimes = ['18:00', '20:00'];
    global.fetchAPI = jest.fn().mockReturnValue(mockTimes);

    const prev = ['17:00'];
    const next = updateTimes(prev, { type: 'date_changed', payload: date });

    expect(global.fetchAPI).toHaveBeenCalledTimes(1);
    expect(global.fetchAPI).toHaveBeenCalledWith(date);
    expect(next).toEqual(mockTimes);
  });

  test('on date_changed with YYYY-MM-DD string payload: converts to Date and calls fetchAPI', () => {
    const iso = '2025-10-22';
    const expectedDate = new Date(iso);
    const mockTimes = ['19:00', '21:00'];
    global.fetchAPI = jest.fn().mockReturnValue(mockTimes);

    const next = updateTimes([], { type: 'date_changed', payload: iso });

    expect(global.fetchAPI).toHaveBeenCalledTimes(1);
    const calledArg = global.fetchAPI.mock.calls[0][0];
    expect(calledArg instanceof Date).toBe(true);
    expect(calledArg.getTime()).toBe(expectedDate.getTime()); // same instant
    expect(next).toEqual(mockTimes);
  });

  test('on date_changed uses fallback slots if fetchAPI is not defined', () => {
    delete global.fetchAPI;

    const next = updateTimes([], {
      type: 'date_changed',
      payload: '2025-10-23'
    });

    expect(next).toEqual([
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30'
    ]);
  });
});
