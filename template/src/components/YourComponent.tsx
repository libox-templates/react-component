import React, { FC } from "react";

import { prefix, classnames } from "../utils";
import { CLASS_NAME_PREFIX } from "../constants";

interface <%= componentName %>Props {
  classNamePrefix?: string;
  className?: string;
  style?: React.CSSProperties;

  onClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const <%= componentName %>: FC<<%= componentName %>Props> = ({
  classNamePrefix = CLASS_NAME_PREFIX,
  className,
  style,
  onClick,
  children,
}) => {
  return (
    <div
      style={style}
      className={classnames({
        [prefix("", classNamePrefix)]: true,
        [className]: Boolean(className),
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default <%= componentName %>;
