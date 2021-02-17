/**
 * The binary operations supported by the calculator.
 */
export enum Op {
  /**
   * Addition.
   */
  Add,

  /**
   * Subtraction.
   */
  Subtract,

  /**
   * Multiplication.
   */
  Multiply,

  /**
   * Division.
   */
  Divide
}

/**
 * A basic four-function calculator. UI logic is handled separately in
 * {@link CalculatorUI}.
 */
export class Calculator {
  /**
   * The contents of the calculator's LCD display.
   */
  display: string;

  /**
   * The result of the last operation if `repeat` is `false`, or the second
   * argument of the last operation if `repeat` is `true`.
   */
  arg: number;

  /**
   * The last operation that the user entered.
   */
  prevOperation: Op;

  /**
   * If `true`, the calculator is in "overwrite mode"; if `false`, the
   * calculator is in "append mode". In overwrite mode, the next input replaces
   * the current screen contents; in append mode, the next input appends to the
   * current screen contents.
   */
  overwrite: boolean;

  /**
   * If `true`, the calculator is in "repeat mode". In repeat mode, when the =
   * button is pressed, the screen is updated by re-executing the previous
   * operation with the same right-hand argument as last time. For example, if
   * the previous operation was 3 + 5 and the calculator is in repeat mode,
   * pressing = will update the screen with the number 13.
   */
  repeatOperation: boolean;

  /**
   * In its initial state, the calculator's screen shows `0`, there is no
   * previous result or operation, and overwrite mode is enabled.
   */
  constructor() {
    this.display = '0';
    this.arg = null;
    this.prevOperation = null;
    this.overwrite = true;
    this.repeatOperation = false;
  }

  /**
   * Input a single digit.
   * @param x a single digit, 0-9
   */
  digit(x: number) {
    if (this.overwrite) {
      this.display = x.toString();
      this.overwrite = false;
    } else
      this.display += x;
  }

  /**
   * Input a decimal point.
   */
  decimal() {
    if (this.overwrite) {
      this.display = '0.';
      this.overwrite = false;
    } else if (this.display.indexOf('.') === -1) // don't allow more than one '.'
      this.display += '.';
  }

  /**
   * Negate the current value on the screen.
   */
  negate() {
    if (this.overwrite) {
      this.display = '0';
      this.overwrite = false;
    } else if (this.display !== '0') // don't negate '0'
      if (this.display.charAt(0) === '-')
        this.display = this.display.substring(1)
      else
        this.display = '-' + this.display
  }

  /**
   * Square the current value on the screen.
   */
  square() {
      if (this.display !== 'Infinity' && this.display !== '-Infinity' && this.display !== 'NaN')  //error messages should persist
        this.display = (parseFloat(this.display) * parseFloat(this.display)).toString();
  }

  /**
   * Yield the percentage-value of the value on the screen
   * An lcd value of 1 should yield .01
   */
  percent() {
    if (this.display !== 'Infinity' && this.display !== '-Infinity' && this.display !== 'NaN')
      this.display = (parseFloat(this.display) / 100).toString();
  }

  /**
   * Input a binary operator. If there is a pending operation whose result has
   * not yet been displayed, update the screen to display that result. For
   * example, when a user inputs 2 + 4 + 8, the screen is updated to display 6
   * on the second + input.
   */
  op(o: Op) {
    this.overwrite = true;
    if (this.arg === null || this.repeatOperation) { // if this is the first argument
      this.prevOperation = o;
      this.arg = parseFloat(this.display);
    } else { // if this is the second argument
      switch (this.prevOperation) {
        case Op.Add: this.display = (this.arg + parseFloat(this.display)).toString(); break;
        case Op.Subtract: this.display = (this.arg - parseFloat(this.display)).toString(); break;
        case Op.Multiply: this.display = (this.arg * parseFloat(this.display)).toString(); break;
        case Op.Divide: this.display = (this.arg / parseFloat(this.display)).toString(); break;
      }
      this.prevOperation = o;
      this.arg = parseFloat(this.display);
    }
    this.repeatOperation = false;
  }

  /**
   * If the calculator is not in repeat mode, compute the result of the pending
   * expression if there is one. If the calculator is in repeat mode,
   * re-execute the previous operation.
   *
   * @see {@link repeat}
   */
  equals() {
    // If `repeat` is disabled, this press of = will enable it. In that case,
    // the value currently on screen is the second argument, the one that's used
    // when repeating the operation.
    let oldLcd = parseFloat(this.display);

    // If `repeat` is disabled, then `this.arg` is the first argument to the
    // operation; if `repeat` is enabled, then it's the second argument.
    // This doesn't matter in the + and * cases because the result is the same
    // either way.
    switch (this.prevOperation) {
      case Op.Add: this.display = (this.arg + parseFloat(this.display)).toString(); break;
      case Op.Subtract:
        if (this.repeatOperation)
          this.display = (parseFloat(this.display) - this.arg).toString();
        else
          this.display = (this.arg - parseFloat(this.display)).toString();
          break;
      case Op.Multiply: this.display = (this.arg * parseFloat(this.display)).toString(); break;
      case Op.Divide: 
        if (this.repeatOperation)
          this.display = (parseFloat(this.display) / this.arg).toString();
        else
          this.display = (this.arg / parseFloat(this.display)).toString();
        break;
    }

    // If `repeat` is disabled, we need to save the previous value of the screen
    // to use it as the second argument when repeating the operation.
    if (!this.repeatOperation)
      this.arg = oldLcd;

    this.repeatOperation = true;
    this.overwrite = true;
  }

  /**
   * Clear the screen, resetting it to 0. If in overwrite mode, reset the
   * entire calculator to its initial state.
   */
  clear() {
    if (this.overwrite) {
      this.arg = null;
      this.prevOperation = null;
      this.repeatOperation = false;
    }
    this.display = '0';
    this.overwrite = true;
  }
}
