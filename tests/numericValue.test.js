import { describe, assert, it } from "vitest";

import { numericValue, NUM_NUMBER } from '@/helpers/numericValue.js';

describe('numericValue', () => {
  
  it('parse', () => {
    // test with period
    let numObj = new numericValue('34,000,000.62', NUM_NUMBER, '.');
    assert(numObj.intValue == 3400000062);
    assert(numObj.precision == 2);
    // test with comma
    let numObj2 = new numericValue('34.000.000,62', NUM_NUMBER, ',');
    assert(numObj.intValue == 3400000062);
    assert(numObj.precision == 2);
  });
  
});