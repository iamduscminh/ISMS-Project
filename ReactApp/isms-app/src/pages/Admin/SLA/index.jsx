import React, { useState } from "react";
import SLAComponent from "../../../components/Elements/SLAComponent";

const slaData = [
  {
    id:1,
    data: [
      {
        id: "1",
        time: "2h",
        condition: 'Ticket Category = "Incidents"',
      },
      {
        id: "2",
        time: "4h",
        condition: 'Ticket Category = "Problems"',
      },
    ],
    startTrigger: [
      {
        id: 1,
        trigger: "Ticket Created",
      },
    ],
    finishTrigger: [
      {
        id: 3,
        trigger: "Resolution: Set",
      },
    ],
    metricName: "Time to resolution",
    description:
      "Time to Resolution SLA helps to ensure that service providers will respond and resolve customer requests within a certain time. This helps to respond to customer needs and wants quickly and create satisfaction.",
  },
  {
    id:2,
    data: [
      {
        id: "1",
        time: "2h",
        condition: 'Ticket Category = "Incidents"',
      },
      {
        id: "2",
        time: "4h",
        condition: 'Ticket Category = "Problems"',
      },
    ],
    startTrigger: [
      {
        id: 1,
        trigger: "Ticket Created",
      },
    ],
    finishTrigger: [
      {
        id: 3,
        trigger: "Resolution: Set",
      },
    ],
    metricName: "Time to resolution",
    description:
      "Time to Resolution SLA helps to ensure that service providers will respond and resolve customer requests within a certain time. This helps to respond to customer needs and wants quickly and create satisfaction.",
  },
];
const SLA = () => {
  const [SLAs, setSLAs] = useState(slaData);
  const handleSave = (newData) => {
    const updatedSLAs = SLAs.map((sla) => {
      if (sla.id === newData.id) {
        return newData;
      }
      return sla;
    });
    setSLAs(updatedSLAs);
    console.log(SLAs);
  }
  return (
    <div className="flex flex-col w-full h-[90vh] overflow-y-scroll">
      <div className="h-[5%] bg-[#42526E] flex text-[#ffF] font-medium text-[1rem] justify-start items-center pl-[3rem]">
        <div>
          <span className="mr-[3rem]">Service Level Agreements Metric</span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center mt-[1rem] items-center">
        {slaData?.map((item)=>(
          <SLAComponent key={item.id} slaData={item} onSave={handleSave}/>
        ))}
      </div>
    </div>
  );
};

export default SLA;
