// src/pages/Booking.test.js
import { initializeTimes, updateTimes } from './Booking';

describe('initializeTimes and updateTimes', () => {
  let fetchAPIMock;

  beforeEach(() => {
    fetchAPIMock = jest
      .fn()
      .mockReturnValue([
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
    global.fetchAPI = fetchAPIMock;
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete global.fetchAPI;
  });

  test('initializeTimes calls fetchAPI and returns its result', () => {
    const result = initializeTimes();
    expect(fetchAPIMock).toHaveBeenCalledTimes(1);
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

  test('updateTimes uses a pre-selected date and returns new times', () => {
    const state = ['17:00', '18:00', '19:00'];

    // Include pre-selected date in the action (as the assignment requires)
    const action = { type: 'date_changed', date: '2025-10-16' };

    // Make the mock return a different list so we can verify it was used
    fetchAPIMock.mockReturnValueOnce(['18:00', '19:00', '20:00']);

    const result = updateTimes(state, action);

    // It should call fetchAPI and return whatever it returns
    expect(fetchAPIMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(['18:00', '19:00', '20:00']);
  });
});
