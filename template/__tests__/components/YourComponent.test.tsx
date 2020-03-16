import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import <%= componentName %> from "<%= name %>";
import { CLASS_NAME_PREFIX } from "@/constants";

describe("<%= componentName %> Render", () => {
  test("has correct className", () => {
    const { container } = render(<<%= componentName %> className="custom-class" />);

    expect(container.firstChild).toHaveClass(`${CLASS_NAME_PREFIX}<%= name %>`);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
