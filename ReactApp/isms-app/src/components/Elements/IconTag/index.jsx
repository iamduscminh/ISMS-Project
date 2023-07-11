import React from "react";
import * as Icon from "../Icon";
function IconTag({ name, className, onClickHandle }) {
  const IconComponent = Icon[name];
  return <IconComponent className={className} onClick={onClickHandle} />;
}

export default IconTag;
