import { describe, assert, it } from "vitest";

import { numericValue } from '@/helpers/numericValue.js';

describe('numericValue', () => {
  
  it('parse', () => {
    let numObj = new numericValue();
    numObj.parse('34,000,000.62');
    assert(numObj.intValue == 3400000062);
    assert(numObj.precision == 2);
  })
  
});