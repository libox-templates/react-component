module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["__test__"],
  setupFilesAfterEnv: ["<rootDir>__test__/setup.ts"],
};
