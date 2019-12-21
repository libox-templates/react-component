// jest 文档 https://jestjs.io/docs/zh-Hans/getting-started
// Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html

import React from "react";
import { shallow } from "enzyme";

import <%= componentName %> from "../../src/main";

describe("<%= componentName %> Render", () => {
  const wrapper = shallow(<<%= componentName %> />);

  it("<%= componentName %> has correct displayName", () => {
    expect(wrapper.find("<%= componentName %>")).toBeTruthy();
  });

  it("<%= componentName %> has correct className", () => {
    expect(wrapper.find("div.<%= name %>")).toBeTruthy();

    const wrapperWithClassName = shallow(
      <<%= componentName %> className="custom-class" />
    );

    expect(wrapper.find("div.<%= name %>.custom-class")).toBeTruthy();
  });
});
