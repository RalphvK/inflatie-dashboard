import { describe, assert, it, expect } from "vitest";

import { SentientNumber, SentientPercentage, SentientPercentagePoint } from '@/helpers/SentientNumber.js';

describe('SentientNumber', () => {
  
  it('parse', () => {
    // test with period
    let numObj = new SentientNumber('34,000,000.62', '.');
    assert.equal(numObj.intValue, 3400000062);
    assert.equal(numObj.precision, 2);
    // test with comma
    let numObj2 = new SentientNumber('34.000.000,62', ',');
    assert.equal(numObj.intValue, 3400000062);
    assert.equal(numObj.precision, 2);
  });
  
  it('parse-negative', () => {
    // test with period
    let value = '-34,000,000.62';
    let dcml = '.';
    let numObj = new SentientNumber(value, '.');
    value = value.replace(new RegExp("[^0-9"+ dcml +'-]', 'g'), '');
    console.log(value);
    value = value.replace(new RegExp('['+ dcml +'](?='+ dcml +'*['+ dcml +'])', 'g'), '');
    console.log(value);
    let parts = value.split(dcml);
    let intvalue = parseInt(parts.join(''));
    console.log(intvalue);
    assert.equal(numObj.intValue, -3400000062);
    assert.equal(numObj.precision, 2);
  });
  
  it('getDecimalParts', () => {
    // test with period
    let numObj = new SentientNumber('34,000,000.62', '.');
    const decimalParts = numObj.getDecimalParts();
    assert.equal(decimalParts.integral, '34000000');
    assert.equal(decimalParts.fractional, '62');
  });
  
  it('getFormattingChunks', () => {
    // test with period
    let numObj = new SentientNumber('34,000,000.62', '.');
    const formattingChunks = numObj.getFormattingChunks();
    expect(formattingChunks.integral).toEqual(['34', '000', '000']);
    expect(formattingChunks.fractional).toEqual('62');
  });
  
  it('toParts', () => {
    // test with period
    let numObj = new SentientNumber('-34,000,000.62', '.');
    const parts = numObj.toParts();
    console.log(parts);
    expect(parts).toEqual([
      { type: 'minus-symbol', value: '-' },
      { type: 'integral', value: '34' },
      { type: 'thousands-separator', value: '.' },
      { type: 'integral', value: '000' },
      { type: 'thousands-separator', value: '.' },
      { type: 'integral', value: '000' },
      { type: 'decimal-separator', value: ',' },
      { type: 'fractional', value: '62' },
    ]);
  });
  
  it('toPartsWith0', () => {
    // test with period
    let numObj = new SentientNumber('0.62', '.');
    console.log('intValue: ',numObj.intValue);
    console.log('decimalParts: ',numObj.getDecimalParts());
    const parts = numObj.toParts();
    console.log(parts);
    expect(parts).toEqual([
      { type: 'integral', value: '0' },
      { type: 'decimal-separator', value: ',' },
      { type: 'fractional', value: '62' },
    ]);
  });

  it('toString', () => {
    let numObj = new SentientNumber('34,000,000.62', '.');
    expect(numObj.toString()).toEqual('34.000.000,62');
  });
  
});

describe('SentientPercentage', () => {
  it('toString', () => {
    let numObj = new SentientPercentage('102.5', '.');
    expect(numObj.toString()).toEqual('102,5' + numObj.percentageSymbol);
  })
});

describe('SentientPercentagePoint', () => {
  it('toString', () => {
    let numObj = new SentientPercentagePoint('102.5', '.');
    expect(numObj.toString()).toEqual('102,5' + numObj.percentagePointSymbol);
  })
});