// more config: https://d.umijs.org/config
import { defineConfig } from "dumi";
import LOGO from "./logo";

export default defineConfig({
  title: "<%= name %>",
  description: "<%= description %>",
  logo: LOGO,
  base: "/<%= name %>",
  publicPath: "/<%= name %>/",
  outputPath: "site",
  exportStatic: {},
});
