import { describe, assert, it, expect } from "vitest";

import { sentientNumber } from '@/helpers/sentientNumbers.js';

describe('sentientNumber', () => {
  
  it('parse', () => {
    // test with period
    let numObj = new sentientNumber('34,000,000.62', '.');
    assert.equal(numObj.intValue, 3400000062);
    assert.equal(numObj.precision, 2);
    // test with comma
    let numObj2 = new sentientNumber('34.000.000,62', ',');
    assert.equal(numObj.intValue, 3400000062);
    assert.equal(numObj.precision, 2);
  });
  
  it('getDecimalParts', () => {
    // test with period
    let numObj = new sentientNumber('34,000,000.62', '.');
    const decimalParts = numObj.getDecimalParts();
    assert.equal(decimalParts.integral, '34000000');
    assert.equal(decimalParts.fractional, '62');
  });
  
  it('getFormattingChunks', () => {
    // test with period
    let numObj = new sentientNumber('34,000,000.62', '.');
    const formattingChunks = numObj.getFormattingChunks();
    expect(formattingChunks.integral).toEqual(['34', '000', '000']);
    expect(formattingChunks.fractional).toEqual('62');
  });
  
  it('toParts', () => {
    // test with period
    let numObj = new sentientNumber('34,000,000.62', '.');
    const parts = numObj.toParts();
    expect(parts).toEqual([
      { type: 'integral', value: '34' },
      { type: 'thousands-separator', value: '.' },
      { type: 'integral', value: '000' },
      { type: 'thousands-separator', value: '.' },
      { type: 'integral', value: '000' },
      { type: 'decimal-separator', value: ',' },
      { type: 'fractional', value: '62' },
    ]);
    console.log(parts)
  });

  it('toString', () => {
    let numObj = new sentientNumber('34,000,000.62', '.');
    expect(numObj.toString()).toEqual('34.000.000,62');
  });
  
});