import React from "react";
import Swal from "sweetalert2";
import IconTag from "../../components/Elements/IconTag";
import {
  handleShowError,
  handleAsyncTask,
} from "../../components/Elements/SwalCustom";
const MyComponent = () => {
  const handleClick = () => {
    handleAsyncTask();
  };
  const taskFunc = () => {
    setTimeout(4000);
    console.log("Minh oi");
  };
  return (
    <div>
      <IconTag name={"MdPassword"} className={"h-[50px] w-[50px]"} />
    </div>
  );
};

export default MyComponent;
