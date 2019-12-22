import React, { FC, useState } from "react";

import { classnames } from "../utils";

export interface <%= componentName %>Props {
  visible?: boolean;
  className?: string;
  children?: React.ReactNode;

  onClick?: (evt: React.MouseEvent) => void;
}

const <%= componentName %>: FC<<%= componentName %>Props> = ({
  children,
  visible,
  className,
  onClick,
}) => {
  const [innerVisible, setInnerVisible] = useState(visible);

  return (
    <div onClick={onClick} className={classnames(["<%= name %>", className])}>
      {innerVisible}
      {children}
    </div>
  );
};

<%= componentName %>.displayName = "<%= componentName %>";

export default <%= componentName %>;
