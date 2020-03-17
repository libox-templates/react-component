"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var ejs_1 = tslib_1.__importDefault(require("ejs"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
;
var config = {
    projectRoot: "",
    filters: {},
    context: {},
};
var resolveProject = function () {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return path_1.default.resolve.apply(path_1.default, tslib_1.__spreadArrays([config.projectRoot], paths));
};
var resolveTemplate = function () {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return path_1.default.resolve.apply(path_1.default, tslib_1.__spreadArrays([__dirname, "../template"], paths));
};
var remove = function () {
    var files = [
        ".docz",
        "public",
        "doczrc.js",
        ".eslintrc.js",
        "gatsby-browser.js",
        "gatsby-config.js",
        "gatsby-node.js",
        "rollup.config.js",
    ];
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        fs_extra_1.default.removeSync(resolveProject(file));
    }
};
var copy = function () {
    var files = [
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
    for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
        var file = files_2[_i];
        fs_extra_1.default.copySync(resolveTemplate(file), resolveProject(file));
    }
};
var move = function () {
    var files = [
        ["src/main.ts", "src/index.ts"],
    ];
    for (var _i = 0, files_3 = files; _i < files_3.length; _i++) {
        var file = files_3[_i];
        var filePath = resolveProject(file[0]);
        if (fs_extra_1.default.existsSync(filePath)) {
            fs_extra_1.default.moveSync(filePath, resolveProject(file[1]));
        }
    }
};
var writePkg = function () {
    var _a;
    var pkg = fs_extra_1.default.readJsonSync(resolveProject("package.json"));
    var pureName = pkg.name.replace(/@\S+\//, "");
    var context = {
        name: pkg.name,
        componentName: ((_a = config.filters) === null || _a === void 0 ? void 0 : _a.pascal(pureName)) || pureName,
        description: pkg.description,
        author: config.filters.authorSplit(pkg.author),
    };
    config.context = context;
    var targetPkgJSON = ejs_1.default.render(fs_extra_1.default.readFileSync(resolveTemplate("package.json"), "utf-8"), context);
    var targetPkg = JSON.parse(targetPkgJSON);
    targetPkg.dependencies = pkg.dependencies || {};
    fs_extra_1.default.writeJSONSync(resolveProject("package.json"), targetPkg, { spaces: 2 });
};
var overwrite = function () {
    var files = [
        ".umirc.ts",
        "docs/index.md",
        "docs/usage/component.md",
        "examples/Basis.tsx",
        ["__tests__/components/YourComponent.test.tsx", "__tests__/components/<%= componentName %>.test.tsx"],
        "__tests__/utils/index.test.ts",
    ];
    files.forEach(function (item) {
        var sourceFile = Array.isArray(item) ? item[0] : item;
        var targetFile = Array.isArray(item) ? ejs_1.default.render(item[1], config.context) : item;
        var sourceFilePath = resolveTemplate(sourceFile);
        var targetFilePath = resolveProject(targetFile);
        var sourceFileContent = fs_extra_1.default.readFileSync(sourceFilePath, "utf8");
        fs_extra_1.default.outputFileSync(targetFilePath, ejs_1.default.render(sourceFileContent, config.context));
    });
};
var update = function (projectRoot, _a) {
    var filters = _a.filters;
    config.projectRoot = projectRoot;
    config.filters = filters;
    remove();
    move();
    copy();
    writePkg();
    overwrite();
    console.log("");
    console.log(chalk_1.default.blueBright("✅ 更新完成，但你仍需手动进行一些处理：\n"));
    console.log(chalk_1.default.yellow("   1. 将 mdx 文件中的例子改为单独文件，放在 examples 下，可参考 ./examples/Basis.tsx\n"));
    console.log(chalk_1.default.yellow("   2. 将 mdx 文件改为 md，详见 https://d.umijs.org/guide/demo-types#%E5%A4%96%E9%83%A8%E5%BC%95%E5%85%A5\n"));
    console.log(chalk_1.default.yellow("   3. \u5C06\u5355\u6D4B\u7528\u4F8B\u4F7F\u7528 react-testing-library \u91CD\u5199\uFF0C\u53EF\u53C2\u8003 ./__tests__/components/" + config.context.componentName + ".test.ts"));
    console.log("");
};
exports.default = update;
//# sourceMappingURL=update.js.map