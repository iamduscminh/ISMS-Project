import React from "react";
import * as Icon from "../Icon";
function IconTag({ name }) {
  const IconComponent = Icon[name];
  return <IconComponent />;
}

export default IconTag;
