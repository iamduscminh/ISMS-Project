import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

function RequestComment({ isAutoCmt, name, comment, time }) {
  return (
    <div className="flex p-2 w-[100%]">
      <div className="text-3xl">
        {isAutoCmt ? <RiCustomerService2Fill /> : <FaUserCircle />}
      </div>
      <div className="w-full mx-2 p-2 flex justify-between rounded-sm border">
        <div className="">
          <h5 className="text-lg font-bold">
            {isAutoCmt ? "Automatic response" : name}
          </h5>
          <p>{comment}</p>
        </div>
        <span className="text-sm text-gray-600">{time}</span>
      </div>
    </div>
  );
}

export default RequestComment;
