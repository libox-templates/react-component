module.exports = {
  preset: "ts-jest",
  roots: ["__tests__"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
