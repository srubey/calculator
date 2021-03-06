import "jest-extended";
import { Calculator, Op } from "./Calculator";

const negativeInts = [-50, -3, -2, -1];
const positiveInts = [50, 3, 2, 1];
const nonzeroInts = negativeInts.concat(positiveInts);
const ints = nonzeroInts.concat(0);
const positiveFloats = [50.0, 50., 49.9, 3.10, 2.09, 1.];
const negativeFloats = [-50.0, -50., -49.9, -3.10, -2.09, -1.];
const nonzeroFloats = positiveFloats.concat(negativeFloats);
const numbers = ints.concat(nonzeroFloats);

test('input a single non-zero digit in overwrite mode', () => {
  for (let i = 1; i <= 9; i++) {
    let calc = new Calculator();
    calc.display = '0';
    calc.overwrite = true;
    calc.digit(i);
    expect(calc.display).toBe(i.toString());
  }
});

test('input a single zero in overwrite mode', () => {
  let calc = new Calculator();
  calc.display = '0';
  calc.overwrite = true;
  calc.digit(0);
  expect(calc.display).toBe('0');
});

test('input a single non-zero digit in append mode with integer on screen', () => {
  for (let x of ['-50', '-3', '-2', '-1', '50', '3', '2', '1'])
    for (let i = 1; i <= 9; i++) {
      let calc = new Calculator();
      calc.display = x;
      calc.overwrite = false;
      calc.digit(i);
      expect(calc.display).toBe(x + i);
    }
});

test('input a single non-zero digit in append mode with float on screen', () => {
  for (let x of ['-50.0', '-50.', '-49.9', '-3.10', '-2.09', '-1.', '50.0', '50.', '49.9', '3.10', '2.09', '1.'])
    for (let i = 1; i <= 9; i++) {
      let calc = new Calculator();
      calc.display = x;
      calc.overwrite = false;
      calc.digit(i);
      expect(calc.display).toBe(x + i);
    }
});

test('input three digits (starting with a non-zero digit) in overwrite mode', () => {
  for (let i = 1; i <= 9; i++)
    for (let j = 1; j <= 9; j++)
      for (let k = 1; k <= 9; k++) {
        let calc = new Calculator();
        calc.display = '0';
        calc.overwrite = true;
        calc.digit(i);
        calc.digit(j);
        calc.digit(k);
        expect(calc.display).toBe(i.toString() + j + k);
      }
});

test('input three digits (starting with a non-zero digit) in append mode with integer on screen', () => {
  for (let x of ['-50', '-3', '-2', '-1', '50', '3', '2', '1'])
    for (let i = 1; i <= 9; i++)
      for (let j = 0; j <= 9; j++)
        for (let k = 0; k <= 9; k++) {
          let calc = new Calculator();
          calc.display = x;
          calc.overwrite = false;
          calc.digit(i);
          calc.digit(j);
          calc.digit(k);
          expect(calc.display).toBe(x + i + j + k);
        }
});

test('input three non-zero digits (starting with a non-zero digit) in append mode with float on screen', () => {
  for (let x of ['-50.0', '-50.', '-49.9', '-3.10', '-2.09', '-1.', '50.0', '50.', '49.9', '3.10', '2.09', '1.'])
    for (let i = 1; i <= 9; i++)
      for (let j = 0; j <= 9; j++)
        for (let k = 0; k <= 9; k++) {
          let calc = new Calculator();
          calc.display = x;
          calc.overwrite = false;
          calc.digit(i);
          calc.digit(j);
          calc.digit(k);
          expect(calc.display).toBe(x + i + j + k);
        }
});

test('input decimal point in overwrite mode', () => {
  let calc = new Calculator();
  calc.display = '0';
  calc.decimal();
  expect(calc.display).toBe('0.');
});

test('input decimal point in append mode with integer on screen', () => {
  for (let x of ['-50', '-3', '-2', '-1', '50', '3', '2', '1']) {
    let calc = new Calculator();
    calc.display = x;
    calc.overwrite = false;
    calc.decimal();
    expect(calc.display).toBe(x + '.');
  }
});

test('input decimal point in append mode with float on screen', () => {
  for (let x of ['-50.0', '-50.', '-49.9', '-3.10', '-2.09', '-1.', '50.0', '50.', '49.9', '3.10', '2.09', '1.']) {
    let calc = new Calculator();
    calc.display = x;
    calc.overwrite = false;
    calc.decimal();
    expect(calc.display).toBe(x);
  }
});

test('negate in overwrite mode', () => {
  let calc = new Calculator();
  calc.display = '0';
  calc.overwrite = true;
  calc.negate();
  expect(calc.display).toBe('0');
});

test('negate in append mode with positive integer on screen', () => {
  for (let x of ['50', '3', '2', '1']) {
    let calc = new Calculator();
    calc.display = x;
    calc.overwrite = false;
    calc.negate();
    expect(calc.display).toBe('-' + x);
  }
});

test('negate whin append mode with negative integer on screen', () => {
  for (let x of ['-50', '-3', '-2', '-1']) {
    let calc = new Calculator();
    calc.display = x;
    calc.overwrite = false;
    calc.negate();
    expect(calc.display).toBe(x.substring(1));
  }
});

test('negate in append mode with positive float on screen', () => {
  for (let x of ['50.0', '50.', '49.9', '3.10', '2.09', '1.']) {
    let calc = new Calculator();
    calc.display = x;
    calc.overwrite = false;
    calc.negate();
    expect(calc.display).toBe('-' + x);
  }
});

test('negate in append mode with negative float on screen', () => {
  for (let x of ['-50.0', '-50.', '-49.9', '-3.10', '-2.09', '-1.']) {
    let calc = new Calculator();
    calc.display = x;
    calc.overwrite = false;
    calc.negate();
    expect(calc.display).toBe(x.substring(1));
  }
});

test('add two numbers', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.display = i.toString();
      calc.op(Op.Add);
      calc.display = j.toString();
      calc.equals();
      expect(calc.display).toBe((i + j).toString());
    }
});

test('multiply two numbers', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.display = i.toString();
      calc.op(Op.Multiply);
      calc.display = j.toString();
      calc.equals();
      expect(calc.display).toBe((i * j).toString());
    }
});

test('subtract two numbers', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.display = i.toString();
      calc.op(Op.Subtract);
      calc.display = j.toString();
      calc.equals();
      expect(calc.display).toBe((i - j).toString());
    }
});

test('divide two numbers', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.display = i.toString();
      calc.op(Op.Divide);
      calc.display = j.toString();
      calc.equals();
      if (j === 0)
        expect(parseFloat(calc.display)).not.toBeFinite();
      else
        expect(calc.display).toBe((i / j).toString());
    }
});

test('square a number', () => {
  for (let i of numbers){
    let calc = new Calculator();
    calc.display = i.toString();
    calc.square();
    expect(calc.display).toBe((i * i).toString());
  }
});

test('get percent value of a number', () => {
  for (let i of numbers){
    let calc = new Calculator();
    calc.display = i.toString();
    calc.percent();
    expect(calc.display).toBe((i / 100).toString());
  }
}); 

test('repeated addition three times', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.display = i.toString();
      calc.op(Op.Add);
      calc.display = j.toString();
      calc.equals();
      calc.equals();
      calc.equals();
      expect(calc.display).toBe((((i + j) + j) + j).toString());
    }
});

test('repeated multiplication three times', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.display = i.toString();
      calc.op(Op.Multiply);
      calc.display = j.toString();
      calc.equals();
      calc.equals();
      calc.equals();
      expect(calc.display).toBe((((i * j) * j) * j).toString());
    }
});

test('repeated subtraction three times', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.display = i.toString();
      calc.op(Op.Subtract);
      calc.display = j.toString();
      calc.equals();
      calc.equals();
      calc.equals();
      expect(calc.display).toBe((((i - j) - j) - j).toString());
    }
});

test('repeated division three times', () => {
  for (let i of numbers)
    for (let j of numbers) {
      let calc = new Calculator();
      calc.display = i.toString();
      calc.op(Op.Divide);
      calc.display = j.toString();
      calc.equals();
      calc.equals();
      calc.equals();
      if (j === 0)
        expect(parseFloat(calc.display)).not.toBeFinite();
      else
        expect(calc.display).toBe((((i / j) / j) / j).toString());
    }
});

test('repeated squaring three times', () => {
  for (let i of numbers){
    let calc = new Calculator();
    calc.display = i.toString();
    calc.square();
    calc.square();
    calc.square();
    expect(calc.display).toBe(Math.pow(Math.pow(Math.pow(i, 2), 2), 2).toString());
  }
});

test('repeated percentage three times', () => {
  for (let i of numbers){
    let calc = new Calculator();
    calc.display = i.toString();
    calc.percent();
    calc.percent();
    calc.percent();
    expect(calc.display).toBe((i / 100 / 100 / 100).toString());
  }
});

test('add three different numbers', () => {
  for (let i of numbers)
    for (let j of numbers)
      for (let k of numbers) {
        let calc = new Calculator();
        calc.display = i.toString();
        calc.op(Op.Add)
        calc.display = j.toString();
        calc.op(Op.Add)
        calc.display = k.toString();
        calc.equals();
        expect(calc.display).toBe(((i + j) + k).toString());
      }
});

test('multiply three different numbers', () => {
  for (let i of numbers)
    for (let j of numbers)
      for (let k of numbers) {
        let calc = new Calculator();
        calc.display = i.toString();
        calc.op(Op.Multiply)
        calc.display = j.toString();
        calc.op(Op.Multiply)
        calc.display = k.toString();
        calc.equals();
        expect(calc.display).toBe(((i * j) * k).toString());
      }
});

test('subtract three different numbers', () => {
  for (let i of numbers)
    for (let j of numbers)
      for (let k of numbers) {
        let calc = new Calculator();
        calc.display = i.toString();
        calc.op(Op.Subtract)
        calc.display = j.toString();
        calc.op(Op.Subtract)
        calc.display = k.toString();
        calc.equals();
        expect(calc.display).toBe(((i - j) - k).toString());
      }
});

test('divide three different numbers', () => {
  for (let i of numbers)
    for (let j of numbers)
      for (let k of numbers) {
        let calc = new Calculator();
        calc.display = i.toString();
        calc.op(Op.Divide)
        calc.display = j.toString();
        calc.op(Op.Divide)
        calc.display = k.toString();
        calc.equals();
        if (j === 0 || k === 0)
          expect(parseFloat(calc.display)).not.toBeFinite();
        else
          expect(calc.display).toBe(((i / j) / k).toString());
      }
});

test('Infinity message persists in square function', () => {
  let calc = new Calculator();
  calc.display = 'Infinity';
  calc.square();
  expect(calc.display).toBe('Infinity');
});

test('-Infinity message switches to positive Infinity in square function', () => {
  let calc = new Calculator();
  calc.display = '-Infinity';
  calc.square();
  expect(calc.display).toBe('Infinity');
});

test('NaN message persists in square function', () => {
  let calc = new Calculator();
  calc.display = 'NaN';
  calc.square();
  expect(calc.display).toBe('NaN');
});

test('Infinity message persists in percent function', () => {
  let calc = new Calculator();
  calc.display = 'Infinity';
  calc.percent();
  expect(calc.display).toBe('Infinity');
});

test('-Infinity message persists in percent function', () => {
  let calc = new Calculator();
  calc.display = '-Infinity';
  calc.percent();
  expect(calc.display).toBe('-Infinity');
});

test('NaN message persists in percent function', () => {
  let calc = new Calculator();
  calc.display = 'NaN';
  calc.percent();
  expect(calc.display).toBe('NaN');
});