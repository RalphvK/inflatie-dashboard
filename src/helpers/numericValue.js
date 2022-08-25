import { isInteger, parseInt } from "lodash";

export class numericValue {
  intValue = 0;
  precision = 0; // number of digits after decimal sep

  parse(value, dcml = '.') {
    // if it is an integer, set intValue directly
    if (isInteger(value)) {
      this.intValue = value;
      this.precision = 0;
      return this;
    }

    // else convert to string
    value = String(value);
    // remove any chars that are not numeric or the decimal
    value = value.replace(new RegExp('[^0-9'+ dcml +']', 'g'), '');
    // remove all demicals except last
    value = value.replace(new RegExp('['+ dcml +'](?='+ dcml +'*['+ dcml +'])', 'g'), '');
    // split on decimal
    let parts = value.split(dcml);
    
    // store results
    // if more than 1 part (will be two parts), count number of digits
    if (parts.length > 1) {
      this.precision = parts[1].length;
      this.intValue = parseInt(parts.join(''));
    // else store as-is
    } else {
      this.intValue = parseInt(value);
      this.precision = 0;
      return this;
    }
  }

}