module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  roots: ["__test__"],
  setupFilesAfterEnv: ["<rootDir>__test__/setup.ts"],
};
