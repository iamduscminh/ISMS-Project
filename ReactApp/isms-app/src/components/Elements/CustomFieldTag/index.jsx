import { React, useState } from "react";
import * as Icon from "../Icon";
import Dropdown from "../Dropdown";
function CustomFieldTag({
  field,
  fieldName,
  required,
  requiredClickHandle,
  removeClickHandle,
}) {
  const [openDrTag, setOpenDrTag] = useState(false);
  return (
    <>
      <div className="field-item px-2 py-1 mb-2 w-full border flex justify-between items-center">
        <p>{fieldName}</p>
        <div className=" w-[23%] flex justify-end items-center">
          {required && (
            <span className="p-0.5 text-white bg-gray-500">Require</span>
          )}
          <Icon.BsThreeDotsVertical
            className="cursor-pointer ml-3"
            onClick={() => {
              setOpenDrTag(!openDrTag);
            }}
          />
        </div>
      </div>
      <div className="header-noti-dropdown">
        <Dropdown
          open={openDrTag}
          menu={[
            <button key="req" value={field} onClick={requiredClickHandle}>
              Required
            </button>,
            <button key="del" value={field} onClick={removeClickHandle}>
              Remove
            </button>,
          ]}
        />
      </div>
    </>
  );
}

export default CustomFieldTag;
