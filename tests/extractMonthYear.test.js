import { describe, assert, it, expect } from "vitest";

import { extractLongMonth, extractYear } from '@/helpers/extractMonthYear.js';

describe('extractMonthYear', () => {
  
  it('extractLongMonth', () => {
    expect(extractLongMonth('2022 Augustus')).toEqual('augustus');
  });

  it('extractYear', () => {
    expect(extractYear('2022 Augustus')).toEqual('2022');
  });
  
});