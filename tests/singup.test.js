const { register } = require("../models/users");

describe("test register", () => {
  const body = {
    email: "111@MediaList.com",
    password: 12345678,
    subscription: "business",
  };
  register(body);
  //   beforeAll(() => {
  //     console.log("Выполнить в начале тестов");
  //   });
  //   test("1 to power 2 to equal 1", () => {
  //     console.log("1 to power 2 to equal 1");
  //     expect(pow(1, 2)).toBe(1);
  //   });
});
