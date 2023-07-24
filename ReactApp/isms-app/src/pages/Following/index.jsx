import React from "react";
import Swal from "sweetalert2";
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
      <button onClick={handleShowError}>Show Error</button>
      <button onClick={handleClick}>Start Asynchronous Task</button>
    </div>
  );
};

export default MyComponent;
