import React, { useState, useEffect } from "react";
import SLAComponent from "../../../components/Elements/SLAComponent";
import ModalDialog from "../../../components/Elements/PopupModal";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { URL } from "../../../utils/Url";

const SLA = () => {
  const [SLAs, setSLAs] = useState([]);
  const [slaNameInput, setSlaNameInput] = useState("");
  const [slaDesInput, setSlaDesInput] = useState("");
  const axiosInstance = useAxiosPrivate();

  const result = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Promise.all([ 
          axiosInstance.get(`${URL.SLA_METRIC_URL}/getall`),
          axiosInstance.get(`${URL.SLA_URL}/getall`)
        ]);
        response[1].data.forEach(slaEntity => {
          const { slaid, slaname, description } = slaEntity;
          const matchedSLAMetrics = response[0].data.filter(
            metric => metric.slaid === slaid
          );
        
          const transformedMetrics = matchedSLAMetrics.map(metric => ({
            SLAMetricID: metric.slametricId,
            ResponseTime: metric.responseTime.toString(),
            ResolutionTime: metric.resolutionTime.toString(),
            condition: metric.piority,
          }));
        
          result.push({
            SLAID: slaid,
            SLAName: slaname,
            Description: description,
            SLAMetrics: transformedMetrics,
          });
        });
        console.log(result);
        setSLAs(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [axiosInstance]);

  const handleSave = (newData, slaName, slaDes) => {

    newData.SLAName = slaName;
    newData.Description = slaDes;

    const updatedSLAs = SLAs.map((sla) => {
      if (sla.SLAID === newData.SLAID) {
        return newData;
      }
      return sla;
    });
    setSLAs(updatedSLAs);
    console.log(SLAs);
  };

  const handleCreateSLA = () => {
    if (!slaNameInput || !slaDesInput) {
      alert("SLA Name and SLA Description are required");
      return;
    }

    axiosInstance
      .post(
        `${URL.SLA_URL}/create`,
        {
          Slaname: slaNameInput,
          Description: slaDesInput
        }
      )
      .then((response) => {
        console.log(1);
        console.log(response.data);
        setSLAs(prev =>([
          ...prev,
          {
            SLAID: "slaid",
            SLAName: slaNameInput,
            Description: slaDesInput,
            SLAMetrics: [],
          }
        ]))
        setSlaNameInput('');
        setSlaDesInput('');
        alert(response.data.message);
      })
      .catch((error) => {
        alert("Lỗi khi xóa:", error.message);
      });
  };
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
          actionHandler={handleCreateSLA}
          triggerComponent={
            <div className="bg-[#043ac5] text-[#fff] font-medium rounded-md px-[1rem]">
              <button className="hover:border-[#043ac5]">New SLA</button>
            </div>
          }
        >
          <div className="ml-[3rem]">
            <div className="flex mb-[2rem]">
              <h3 className="text-[#42526E] font-medium mr-[2rem]">SLA Name</h3>
              <input
                value={slaNameInput}
                onChange={(e) => setSlaNameInput(e.target.value)}
                type="text"
                className="border border-[#42526E] px-[0.75rem] rounded-md"
              />
            </div>
            <div>
              <h3 className="text-[#42526E] font-medium mr-[2rem] mb-[1rem]">
                Description
              </h3>
              <textarea
                value={slaDesInput}
                onChange={(e) => setSlaDesInput(e.target.value)}
                name=""
                id=""
                className="border border-[#42526E] rounded-md w-[23rem] h-[5rem] px-[0.75rem] py-[0.25rem]"
              ></textarea>
            </div>
          </div>
        </ModalDialog>
        {SLAs?.map((item) => (
          <SLAComponent key={item.SLAID} slaData={item} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
};

export default SLA;
