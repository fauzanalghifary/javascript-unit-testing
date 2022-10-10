import { it, expect } from "vitest";
import { add } from "./math";

it("should summarize all number values in an array", () => {
  //   Arrange
  const numbers = [1, 2, 3];
  //   const expectedResult = numbers.reduce((prev, cur) => prev + cur, 0);
  const expectedResult = 6;

  // Act
  const result = add(numbers);

  //   Assert
  expect(result).toBe(expectedResult);
});

it("should yield NaN if at least one invalid number is provided", () => {
  const inputs = ["invalid", 1];

  const result = add(inputs);
  expect(result).toBe(NaN);
});

it("should yield a correct sum if an array of numeric string values is provided", () => {
  const numbers = ["1", "2"];
  const result = add(numbers);
  expect(result).toBe(3);
});

it("should yield 0 if an empty array is provided", () => {
  const numbers = [];
  const result = add(numbers);
  expect(result).toBe(0);
});

it("should throw an error if no value is passed into the function", () => {
  const resultFn = () => {
    add();
  };
  expect(resultFn).toThrow(/is not iterable/);
});

it("should throw an error if provied with multipe arguments instead of an error", () => {
  const num1 = 1;
  const num2 = 2;
  const resultFn = () => {
    add(num1, num2);
  };
  expect(resultFn).toThrow(/is not iterable/);
});
