import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GeneralInfo from "./GeneralInfo";
import TextInfo from './TextInfo';
import DiagramInfo from './DiagramInfo';

const ViewWorkflow = () => {
  const { mode, flowId } = useParams();
  const [activeTextDiagram, setActiveTextDiagram] = useState(true);

  const handleClickText = () => {
    if(activeTextDiagram) return;
    setActiveTextDiagram(true)
  }

  const handleClickDiagram = () => {
    if(!activeTextDiagram) return;
    setActiveTextDiagram(false)
  }

  return (
    <div>
      <GeneralInfo />
      <div className="ml-[3rem] mt-[2rem]">
        <div>
          {activeTextDiagram ? <button onClick={handleClickText} className="px-[1rem] bg-[#42526E] text-[#fff] font-medium hover:border-[#fff] mr-[0.1rem]">Text</button> : <button onClick={handleClickText} className="px-[1rem] bg-[#fff] text-[#42526E] font-medium hover:border-[#fff] mr-[0.1rem]">Text</button>}
          {!activeTextDiagram ? <button onClick={handleClickDiagram} className="px-[1rem] bg-[#42526E] text-[#fff] font-medium hover:border-[#fff]">Diagram</button> : <button onClick={handleClickDiagram} className="px-[1rem] bg-[#fff] text-[#42526E] font-medium hover:border-[#fff]">Diagram</button>}
        </div>
        {
          activeTextDiagram ? <TextInfo/> : <DiagramInfo/>
        }
      </div>
    </div>
  );
};

export default ViewWorkflow;
