---
title: 起步
order: 1
---

# <%= componentName %>

> <%= description %>

[![NPM](https://nodei.co/npm/<%= name %>.png)](https://npmjs.org/package/<%= name %>)

## 功能

## 安装

### CDN 引入

可通过 [`unpkg`](https://unpkg.com/<%= name %>) 获取最新版本的资源，在页面中引入相应 `js` 和 `css` 文件即可。

``` html
<!-- 引入 <%= componentName %> 组件 -->
<script src="https://unpkg.com/<%= name %>/dist/index.js"></script>

<!-- 引入 <%= componentName %> 组件样式 -->
<link rel="stylesheet" href="https://unpkg.com/<%= name %>/dist/index.css">
```

### NPM 安装

``` bash
$ npm i -S <%= name %> # yarn add <%= name %>
```

## 使用

一个简单的例子

<code src="../examples/Basis.tsx" />

## 发布日志

详见 [Releases][url-releases]

[url-releases]: https://github.com/<%= author.name %>/<%= name %>/releases
