import React from "react";
import * as Icon from "../../components/Elements/Icon";
/* Your icon name from database data can now be passed as prop */
const DynamicFaIcon = ({ name }) => {
  const IconCustom = Icon[name];

  // if (!IconCustom) {
  //   // Return a default one
  //   return <Icons.FaBeer />;
  // }

  return <IconCustom />;
};

export default function IconCustom() {
  const iconObj = { nametag: "BsThreeDotsVertical" };
  return (
    <div className="App">
      <DynamicFaIcon name={iconObj.nametag} />
    </div>
  );
}
