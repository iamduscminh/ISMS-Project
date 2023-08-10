import React, { useState } from "react";
import SLAComponent from "../../../components/Elements/SLAComponent";
import ModalDialog from "../../../components/Elements/PopupModal";

const slaData = [
  {
    SLAID: "SELA000001",
    SLAName: "Default SLA policy",
    Description:
      "Time to Resolution SLA helps to ensure that service providers will respond and resolve customer requests within a certain time. This helps to respond to customer needs and wants quickly and create satisfaction.",
    SLAMetrics: [
      {
        SLAMetricID: "SLAM000001",
        ResponseTime: "360",
        ResolutionTime: "180",
        condition: "High",
      },
      // {
      //   SLAMetricID: "SLAM000002",
      //   ResponseTime: "2h",
      //   ResolutionTime: "2h",
      //   condition: 'Low',
      // },
    ],
  },
];
const SLA = () => {
  const [SLAs, setSLAs] = useState(slaData);
  const [slaNameInput, setSlaNameInput] = useState('');
  const [slaDesInput, setSlaDesInput] = useState('');
  
  const handleSave = (newData) => {
    const updatedSLAs = SLAs.map((sla) => {
      if (sla.id === newData.id) {
        return newData;
      }
      return sla;
    });
    setSLAs(updatedSLAs);
    console.log(SLAs);
  };

  const handleCreateSLA = () =>{
    
  }
  return (
    <div className="flex flex-col w-full h-[90vh] overflow-y-scroll">
      <div className="h-[5%] bg-[#42526E] flex text-[#ffF] font-medium text-[1rem] justify-start items-center pl-[3rem]">
        <div>
          <span className="mr-[3rem]">Service Level Agreements Metric</span>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center mt-[1rem] items-center">
        <ModalDialog
          title={"Create New SLA"}
          actionText={"Create"}
          triggerComponent={
            <div className="bg-[#043ac5] text-[#fff] font-medium rounded-md px-[1rem]">
            <button className="hover:border-[#043ac5]">New SLA</button>
          </div>
          }
        >
          <div className="ml-[3rem]">
            <div className="flex mb-[2rem]">
              <h3 className="text-[#42526E] font-medium mr-[2rem]">SLA Name</h3>
              <input value={slaNameInput} onChange={(e)=>setSlaNameInput(e.target.value)} type="text" className="border border-[#42526E] px-[0.75rem] rounded-md"/>  
            </div>
            <div>
              <h3 className="text-[#42526E] font-medium mr-[2rem] mb-[1rem]">Description</h3>
              <textarea value={slaDesInput} onChange={(e)=>setSlaDesInput(e.target.value)} name="" id="" className="border border-[#42526E] rounded-md w-[23rem] h-[5rem] px-[0.75rem] py-[0.25rem]"></textarea>
            </div>  
          </div>         
        </ModalDialog>
        {slaData?.map((item) => (
          <SLAComponent key={item.SLAID} slaData={item} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
};

export default SLA;
