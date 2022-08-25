import { describe, assert, it } from "vitest";

import { splitThousands } from '@/helpers/splitThousands.js';

describe('splitThousands', () => {
  
  it('splitThousands', () => {
    let testStrings = {
      '99000000': ['99','000','000'],
      '999': ['999'],
      '3': ['3'],
      '2000': ['2','000']
    }
    for (const testString in testStrings) {
      assert(splitThousands(testString), testStrings[testString]);
    }
  });
  
});