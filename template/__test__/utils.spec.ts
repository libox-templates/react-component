import { classnames } from "../src/utils";

describe("utils", () => {
  it("classnames function return corrent value perfectly", () => {
    const data = [
      {
        input: "a",
        output: "a",
      },
      {
        input: ["a"],
        output: "a",
      },
      {
        input: ["a", "b"],
        output: "a b",
      },
      {
        input: ["a", undefined, "b", "", null, "c"],
        output: "a b c",
      },
      {
        input: {
          a: true,
          b: false,
          c: true,
        },
        output: "a c",
      },
    ];

    data.forEach((item) => {
      expect(classnames(item.input)).toBe(item.output);
    });
  });
});
