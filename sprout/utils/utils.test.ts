/** @format */

const { findAverage } = require('./utils');

describe('findAverage', () => {
  it('returns a number', () => {
    expect(typeof findAverage(3, 1)).toBe(Number);
  });
  it('returns the average of two numbers', () => {
    expect(findAverage(3, 1)).toBe(4);
  });
  it('works with decimals numbers', () => {
    expect(findAverage(7.8, 5.5)).toBe(6.6);
  });
  it('rounds decimals to one place when decimals exist', () => {
    expect(findAverage(152.40030480060963, 30.480060960121925)).toBe(91.4);
  });
  it('rounds to whole numbers when no decimals exist', () => {
    expect(findAverage(152, 30)).toBe(91);
  });
});
