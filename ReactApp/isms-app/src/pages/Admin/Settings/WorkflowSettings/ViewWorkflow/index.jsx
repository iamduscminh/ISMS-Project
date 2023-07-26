import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GeneralInfor from "./GeneralInfor";

const ViewWorkflow = () => {
  const { mode, flowId } = useParams();
  return (
    <div>
      <GeneralInfor />
    </div>
  );
};

export default ViewWorkflow;
