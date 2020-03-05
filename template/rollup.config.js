// TODO: migrate to @rollup/plugin-typescript once https://github.com/rollup/plugins/issues/61 resolved
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const config = {
  input: "./src/main.ts",
  external: ["react", "react-dom"],
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
  ],
};

export default [
  // ESModule
  Object.assign({}, config, {
    output: {
      file: "dist/index.esm.js",
      format: "es",
    },
  }),

  // CommonJS
  Object.assign({}, config, {
    output: {
      file: "dist/index.common.js",
      format: "cjs",
      strict: false,
      exports: "named",
    },
  }),

  // UMD
  Object.assign({}, config, {
    output: {
      file: "dist/index.js",
      format: "umd",
      strict: false,
      exports: "named",
      name: "<%= componentName %>",
      globals: {
        react: "React",
      },
    },
  }),
];
