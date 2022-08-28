import { isInteger, parseInt, toNumber, round } from "lodash";
import { splitThousands } from "@/helpers/splitThousands";

export class SentientNumber {
  intValue = 0;
  precision = 0; // number of digits after decimal sep
  separator_decimal = ',';
  separator_thousands = '.';
  currencySymbol = '€';
  percentageSymbol = '%';
  percentagePointSymbol = 'ppt'

  constructor(...args) {
    return this.parse(...args);
  }

  getFloat() {
    if (!this.intValue) { return 0.00; }
    let parts = this.getDecimalParts();
    return toNumber(parts.integral + '.' + parts.fractional);
  }

  getRoundedInt() {
    return parseInt(round(this.getFloat()));
  }

  /**
   * 
   * @param {String|Int|Decimal} value value to parse into the object
   * @param {String} dcml decimal separator used in the first parameter, default '.'
   * @returns {this}
   */
  parse(value, dcml = '.') {
    // if it is an integer, set intValue directly
    if (isInteger(value)) {
      this.intValue = value;
      this.precision = 0;
      return this;
    }

    // else convert to string
    value = String(value);
    // remove any chars that are not numeric, minus or the decimal
    value = value.replace(new RegExp("[^0-9"+ dcml +'-]', 'g'), '');
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

  /**
   * converts stored integer value into integral and fractional using precision
   * @returns {Object} object with two props: integral (String), fractional (String)
   */
  getDecimalParts() {
    // split value into integral and fractional part
    let integral = String(this.intValue);
    let fractional = null;
    if (this.precision) {
      integral = integral.slice(0, integral.length - this.precision);
      fractional = String(this.intValue).slice(integral.length);
    }
    return {
      integral: integral,
      fractional: fractional
    }
  }

  /**
   * Similar to getDecimalParts, except integral part is split by thousands separators
   * @returns {Object<Array|String>} returns object with two props:
   *   integral (Array<String>) Array of thousands chunks, eg: ['34','000'] for 34000.45
   *   fractional (String) String of the fractional numbers, eg: '45' for 34000.45
   */
  getFormattingChunks() {
    let decimalParts = this.getDecimalParts();
    return {
      integral: splitThousands(decimalParts.integral), // Array<String>
      fractional: decimalParts.fractional // String
    }
  }

  toParts() {
    let formattingChunks = this.getFormattingChunks();
    let parts = [];

    // add integral chunks with thousands separator
    for (let i = 0; i < formattingChunks.integral.length; i++) {
      // if minus, add part type minus-symbol
      if (formattingChunks.integral[i] == '-') {
        parts.push({ type: 'minus-symbol', value: formattingChunks.integral[i]});
      } else {
        parts.push({ type: 'integral', value: formattingChunks.integral[i]});
        // if not last, add thousands separator
        if (i + 1 < formattingChunks.integral.length) {
          parts.push({ type: 'thousands-separator', value: this.separator_thousands});
        }
      }
    }

    // add decimal and fraction if required
    if (formattingChunks.fractional !== null) {
      parts.push({
        type: 'decimal-separator',
        value: this.separator_decimal
      });
      parts.push({
        type: 'fractional',
        value: formattingChunks.fractional
      })
    }

    return parts;
  }

  toString() {
    let str = '';
    this.toParts().forEach(element => {
      str += element.value;
    });
    return str;
  }

}

export class SentientPercentage extends SentientNumber {
  toParts() {
    let parts = super.toParts();
    parts.push({
      type: 'percentage-symbol',
      value: this.percentageSymbol
    });
    return parts;
  }
}

export class SentientPercentagePoint extends SentientNumber {
  toParts() {
    let parts = super.toParts();
    parts.push({
      type: 'percentage-point-symbol',
      value: this.percentagePointSymbol
    });
    return parts;
  }
}