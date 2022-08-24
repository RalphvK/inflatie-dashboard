import {isDigitChar} from '@/helpers/isDigitChar.js';

/**
 * Function to split a monetary or percentage string into part.
 * The string will be split into 'number' parts and 'other' parts.
 * Eg: '20%' will be split into '20' (number) and '%' (other).
 * 
 * The function returns an array of objects.
 * Each object in the array has two params: 'type' and 'content'.
 * 'Type' is either 'number' or 'other'.
 * 
 * @param {String} value value to be split into parts
 * @returns {Array<Object>}
 */
export function splitValueParts(value = '') {
  // if value length is less than 1, return empty array
  value = String(value);
  if (!value.length) { return []; }
  let parts = [];
  let currentPart = '';
  let currentPartType = null;
  // iterate through string
  for (let i = 0; i < value.length; i++) {
    // check if current character is a number
    let type = getCharType(value[i]);
    // if this character is of the same type as the current part, append
    if (type == currentPartType || i == 0) {
      currentPart += value[i];
    // if this char is not of the same type, push the part to the list
    } else {
      parts.push({
        type: currentPartType,
        content: currentPart
      });
      // then start over and set the currentPart to this character
      currentPart = value[i];
    }
    // then set currentPartType to the new type
    currentPartType = type;
  }
  // add final part to list if not yet added
  if (currentPart !== '') {
    parts.push({
      type: currentPartType,
      content: currentPart
    });
  }
  return parts;
}

export function getCharType(char) {
  // check if number
  if (isDigitChar(char)) {
    return 'number';
  } else if (char == '%') {
    return 'percentage';
  } else if (char == ',') {
    return 'comma';
  } else if (char == '.') {
    return 'period';
  } else if (char == '+') {
    return 'plus';
  } else if (char == '-') {
    return 'minus';
  } else if (char == '€' || char == '$') {
    return 'currency';
  } else {
    return 'other';
  }
}