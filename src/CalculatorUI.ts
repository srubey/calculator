import { Calculator, Op } from "./Calculator"

/**
 * The UI logic for the calculator interface, which just updates the HTML
 * element representing the display every time the calculator's state changes.
 * Button actions are bound in {@link Main}.
 */
export class CalculatorUI extends Calculator {
  /**
   * The HTML element that shows the contents of the calculator's display.
   */
  lcdDisplay: HTMLElement;

  constructor(id: string) {
    super();
    this.lcdDisplay = document.getElementById(id);
    this.updateDisplay();
  }

  digit(x: number) {
    super.digit(x);
    this.updateDisplay();
  }

  decimal() {
    super.decimal();
    this.updateDisplay();
  }

  negate() {
    super.negate();
    this.updateDisplay();
  }

  square(){
    super.square();
    this.updateDisplay();
  }
  percent(){
    super.percent();
    this.updateDisplay();
  }

  op(o: Op) {
    super.op(o);
    this.updateDisplay();
  }

  equals() {
    super.equals();
    this.updateDisplay();
  }

  clear() {
    super.clear();
    this.updateDisplay();
  }

  updateDisplay() {
    this.lcdDisplay.innerHTML = this.display;
  }
}