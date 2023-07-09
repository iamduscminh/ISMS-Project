import React from "react";
import * as Icon from "../Icon";
function IconTag({ name, className }) {
  const IconComponent = Icon[name];
  return <IconComponent className={className} />;
}

export default IconTag;
