test("esm + bable-jest works", () => {
  const add = (a, b) => a + b;
  expect(add(2, 3)).toBe(5);
});
