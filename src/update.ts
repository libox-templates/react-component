import path from "path";
import fs from "fs-extra";
import ejs from "ejs";
import chalk from "chalk";

interface Filters {
  [key: string]: (str: string) => any;
};

const config: {
  projectRoot: string;
  filters: Filters;
  context: { [key: string]: (str: string) => any; };
} = {
  projectRoot: "",
  filters: {},
  context: {},
};

const resolveProject = (...paths: string[]) => path.resolve(config.projectRoot, ...paths);
const resolveTemplate = (...paths: string[]) => path.resolve(__dirname, "../template", ...paths);

const remove = () => {
  const files = [
    ".docz",
    "public",
    "doczrc.js",
    ".eslintrc.js",
    "gatsby-browser.js",
    "gatsby-config.js",
    "gatsby-node.js",
    "rollup.config.js",
  ];

  for (let file of files) {
    fs.removeSync(resolveProject(file));
  }
};

const copy = () => {
  const files = [
    ".editorconfig",
    ".eslintignore",
    ".eslintrc",
    ".fatherrc.ts",
    ".gitignore",
    ".prettierignore",
    ".prettierrc",
    "app.ts",
    "jest.config.js",
    "logo.ts",
    "tsconfig.json",
    "typings.d.ts",
  ];

  for (let file of files) {
    fs.copySync(resolveTemplate(file), resolveProject(file));
  }
};

const move = () => {
  const files = [
    ["src/main.ts", "src/index.ts"],
    ["src/types.ts", "src/types.d.ts"],
  ];

  for (let file of files) {
    const filePath = resolveProject(file[0]);

    if (fs.existsSync(filePath)) {
      fs.moveSync(filePath, resolveProject(file[1]))
    }
  }
}

const writePkg = () => {
  const pkg = fs.readJsonSync(resolveProject("package.json"));
  const pureName = pkg.name.replace(/@\S+\//, "");

  const context = {
    name: pkg.name,
    componentName: config.filters?.pascal(pureName) || pureName,
    description: pkg.description,
    author: config.filters.authorSplit(pkg.author),
  };

  config.context = context;

  const targetPkgJSON = ejs.render(fs.readFileSync(resolveTemplate("package.json"), "utf-8"), context);
  const targetPkg = JSON.parse(targetPkgJSON);
  targetPkg.dependencies = pkg.dependencies || {};
  fs.writeJSONSync(resolveProject("package.json"), targetPkg, { spaces: 2 });
}

const overwrite = () => {
  const files = [
    ".umirc.ts",
    "docs/index.md",
    "docs/develop.md",
    "docs/usage/component.md",
    "examples/Basis.tsx",
    ["__tests__/components/YourComponent.test.tsx", "__tests__/components/<%= componentName %>.test.tsx"],
    "__tests__/utils/index.test.ts",
  ];

  files.forEach((item) => {
    const sourceFile = Array.isArray(item) ? item[0] : item;
    const targetFile = Array.isArray(item) ? ejs.render(item[1], config.context) : item;

    const sourceFilePath = resolveTemplate(sourceFile);
    const targetFilePath = resolveProject(targetFile);

    const sourceFileContent = fs.readFileSync(sourceFilePath, "utf8");

    fs.outputFileSync(targetFilePath, ejs.render(sourceFileContent, config.context));
  });
}

const update = (projectRoot: string, { filters }: { filters: Filters }) => {
  config.projectRoot = projectRoot;
  config.filters = filters;

  remove();
  move();
  copy();
  writePkg();
  overwrite();

  console.log("");
  console.log(chalk.blueBright("✅ 更新完成，但你仍需手动进行一些处理：\n"));
  console.log(chalk.yellow("   1. 将 mdx 文件中的例子改为单独文件，放在 examples 下，可参考 ./examples/Basis.tsx\n"));
  console.log(chalk.yellow("   2. 将 mdx 文件改为 md，详见 https://d.umijs.org/guide/demo-types#%E5%A4%96%E9%83%A8%E5%BC%95%E5%85%A5\n"));
  console.log(chalk.yellow(`   3. 将单测用例使用 react-testing-library 重写，可参考 ./__tests__/components/${config.context.componentName}.test.ts`));
  console.log("");
};

export default update;
