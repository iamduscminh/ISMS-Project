import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import SLAComponent from "../../../components/Elements/SLAComponent";
import { Link, useNavigate } from "react-router-dom";
import IconTag from "../../../components/Elements/IconTag";
import ModalDialog from "../../../components/Elements/PopupModal";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { URL } from "../../../utils/Url";
import { da } from "date-fns/locale";

const SLA = () => {
  const [SLAs, setSLAs] = useState([]);
  const [slaNameInput, setSlaNameInput] = useState("");
  const [slaDesInput, setSlaDesInput] = useState("");
  const axiosInstance = useAxiosPrivate();
  const { auth } = useAuth();
  const result = [];
  const headers = {
    Authorization: `Bearer ${auth?.accessToken}`,
    "Content-Type": "application/json",
    withCredentials: true,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        //--------------Get all SLAs
        axiosInstance
          .get(`${URL.SLA_URL}/getall`)
          .then((response) => {
            const data = response.data.map((item, i) => ({
              SLAID: item.slaid,
              SLAName: item.slaname,
              Description: item.description,
              isActive: item.isActive,
              isDefault: item.isDefault,
              SLAMetrics: item.slametrics.map((metric) => ({
                SLAMetricID: metric.slametricId,
                ResponseTime: metric.responseTime.toString(),
                ResolutionTime: metric.resolutionTime.toString(),
                condition: metric.priority,
              })),
            }));
            setSLAs(data);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
              showCancelButton: true,
              cancelButtonText: "Cancel",
            });
          });
        Swal.close();
      } catch (error) {
        // Handle errors if needed
        console.log(error);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
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
    //console.log(updatedSLAs);
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const apiUpdateSlaUrl = `${URL.SLA_URL}/update`;

      const slaDto = {
        SlaId: newData.SLAID,
        Slaname: newData.SLAName,
        Description: newData.Description,
        Slametrics: newData.SLAMetrics.map((metric) => ({
          SLAMetricID: metric.SLAMetricID,
          ResponseTime: metric.ResponseTime,
          ResolutionTime: metric.ResolutionTime,
          Priority: metric.condition,
          SlaId: newData.SLAID,
        })),
      };
      //console.log(slaDto);
      axiosInstance
        .put(apiUpdateSlaUrl, JSON.stringify(slaDto), { headers })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          const result = Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
          });
        });

      Swal.close();
    } catch (error) {
      // Handle errors if needed
      console.log(error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };
  const handleDelete = (slaId) => {
    const result = Swal.fire({
      title: "Are you sure to delete this SLA?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`${URL.SLA_URL}/delete/${slaId}`, { headers })
          .then((response) => {
            const dataRp = response.data;
            console.log(dataRp);
            //Delete SLA in UI
            const updatedSlas = SLAs.filter((item) => item.SLAID != slaId);
            setSLAs(updatedSlas);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Error...",
              text: `${error}`,
            });
          });
      }
    });
  };
  const handleCreateSLA = () => {
    if (!slaNameInput || !slaDesInput) {
      alert("SLA Name and SLA Description are required");
      return;
    }

    axiosInstance
      .post(`${URL.SLA_URL}/create`, {
        Slaname: slaNameInput,
        Description: slaDesInput,
      })
      .then((response) => {
        console.log(response.data);
        const transformedMetrics = response.data.slametrics.map((metric) => ({
          SLAMetricID: metric.slametricId,
          ResponseTime: metric.responseTime.toString(),
          ResolutionTime: metric.resolutionTime.toString(),
          condition: metric.priority,
        }));
        setSLAs((prev) => [
          ...prev,
          {
            SLAID: "slaid",
            SLAName: slaNameInput,
            Description: slaDesInput,
            SLAMetrics: transformedMetrics,
          },
        ]);
        setSlaNameInput("");
        setSlaDesInput("");
        //alert(response.data.message);
      })
      .catch((error) => {
        alert("Lỗi khi xóa:", error.message);
      });
  };
  return (
    <div className="request-types-container pb-4 w-full h-full bg-[#fff] bg-blend-lighten overflow-y-scroll">
      <div className="request-types-section">
        {/* HEADER SECTION*/}
        <div className="request-types-header w-full text-white bg-[#294a8d] ">
          <nav className="request-types-header-nav pt-3 pb-1 ">
            <ul className="header-nav-content flex items-center text-[0.75rem] pl-[1.25rem]">
              <li className="header-nav-item ml-1">
                <Link
                  className="header-nav-url hover:underline hover:text-white"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                Service Level Agreements Metric
              </li>
            </ul>
          </nav>
          <div className="detail-request-header-content px-6 pb-3 flex items-center justify-between">
            <div className="detail-request-header-left  flex items-center">
              <div className="detail-request-header-icon">
                <IconTag name={"BsSlack"} className="h-[50px] w-[50px]" />
              </div>
              <div className="detail-request-header-description ml-5">
                <h4 className="text-2xl font-bold">Service Level Agreements</h4>
                <span className="">
                  The measurable parameters that define the quality and
                  performance of the service.
                </span>
              </div>
            </div>
            <div className="detail-request-header-right">
              <ModalDialog
                title={"Create New SLA"}
                actionText={"Create"}
                actionHandler={handleCreateSLA}
                triggerComponent={
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Create SLA
                  </button>
                }
              >
                <div className="ml-[3rem]">
                  <div className="flex mb-[2rem]">
                    <h3 className="text-[#42526E] font-medium mr-[2rem]">
                      SLA Name
                    </h3>
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
            </div>
          </div>
        </div>
        <div className=" w-full min-h-screen p-6 bg-white rounded shadow ">
          <div className="request-tickets-ctn ">
            <div className="flex flex-col w-full h-[90vh] overflow-y-scroll">
              <div className="w-full flex flex-col justify-center mt-[1rem] items-center">
                {SLAs?.map((item) => (
                  <SLAComponent
                    key={item.SLAID}
                    slaData={item}
                    onSave={handleSave}
                    onDeleteSla={handleDelete}
                    isDefault={item.isDefault}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLA;
