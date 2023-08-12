import React, { useState } from "react";
import { BiTime } from "react-icons/bi";
import { MdOutlineEditNote, MdAutoDelete } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import SLATrigger from "../../../components/Elements/SLATrigger";

const priorityData = [
  {
    id: 1,
    priority: "High",
  },
  {
    id: 2,
    priority: "Medium",
  },
  {
    id: 3,
    priority: "Low",
  },
  {
    id: 4,
    priority: "Urgency",
  },
];

const SLAComponent = ({ slaData, onSave, onDeleteSla, isDefault }) => {
  const [slas, setSlas] = useState(slaData);
  const [slaMetrics, setSlaMetrics] = useState(slaData.SLAMetrics);
  const [checkEditSla, setCheckEditSla] = useState(false);
  const [checkShowDetail, setCheckShowDetail] = useState(false);
  const [slaNameInput, setSlaNameInput] = useState(slas.SLAName);
  const [slaDesInput, setSlaDesInput] = useState(slas.Description);
  const [listNewMetric, setListNewMetric] = useState([]);

  const handleSave = () => {
    const slaUpdate = slas;
    slaUpdate.SLAMetrics = slaMetrics;
    setSlas(slaUpdate);
    onSave(slaUpdate, slaNameInput, slaDesInput);
    setCheckEditSla(false);
    setSlaNameInput(slaNameInput);
    setSlaDesInput(slaDesInput);
  };

  const handleCancel = () => {
    setSlas((prev) => ({
      ...prev,
      SLAMetrics: prev.SLAMetrics.filter(
        (item) => !listNewMetric.includes(item.SLAMetricID)
      ),
    }));
    setCheckEditSla(false);
    setSlaNameInput(slaData.SLAName);
    setSlaDesInput(slaData.Description);
  };

  const handleToggleDetail = () => {
    setCheckShowDetail((prev) => !prev);
  };

  const handleEditSLA = (e) => {
    setCheckEditSla(true);
    setCheckShowDetail(true);
  };
  const handleDeleteSLA = () => {
    onDeleteSla(slas.SLAID);
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(slas.data);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setSlas(tempData);
  };

  const handleChange = (e) => {
    const metricId = e.target.getAttribute("itemID");
    const metricType = e.target.getAttribute("itemType");
    const metricValue = e.target.value;
    const metricsUpdate = slaMetrics.map((item) => {
      if (item.SLAMetricID == metricId && metricType == "RPT") {
        return { ...item, ResponseTime: metricValue };
      } else if (item.SLAMetricID == metricId && metricType == "RST") {
        return { ...item, ResolutionTime: metricValue };
      } else return { ...item };
    });
    setSlaMetrics(metricsUpdate);
  };
  return (
    <div className="w-[70%] mt-[1rem]">
      <div className="w-full border border-[#42526E] rounded-md shadow-sm px-[1rem] py-[0.75rem]">
        <div className="flex text-[1.25rem] text-[#42526E] items-center">
          <BiTime className="mr-[1.5rem]" />
          {!checkEditSla ? (
            <h1 className="font-medium">{slas.SLAName}</h1>
          ) : (
            <input
              value={slaNameInput}
              onChange={(e) => setSlaNameInput(e.target.value)}
              className="font-medium"
            />
          )}
          <div className="flex ml-auto">
            {isDefault && (
              <span className="inline-block bg-gray-500 text-white px-2 py-1 rounded-sm text-xs font-bold">
                Default
              </span>
            )}
            {!checkEditSla && (
              <div className="flex">
                {!isDefault && (
                  <MdOutlineEditNote
                    title="Edit SLA"
                    onClick={handleEditSLA}
                    className="cursor-pointer"
                  />
                )}
                {!isDefault && (
                  <MdAutoDelete
                    className="ml-[0.75rem] cursor-pointer"
                    title="Delete SLA"
                    onClick={handleDeleteSLA}
                  />
                )}
              </div>
            )}
            {checkShowDetail ? (
              !checkEditSla && (
                <IoIosArrowUp
                  onClick={handleToggleDetail}
                  className="ml-[1.5rem] cursor-pointer "
                />
              )
            ) : (
              <IoIosArrowDown
                onClick={handleToggleDetail}
                className="ml-[1.5rem] cursor-pointer "
              />
            )}
          </div>
        </div>
        {checkShowDetail && (
          <div className="w-full mt-[1rem]">
            <div className="flex flex-col">
              <h1 className="text-[1rem] font-medium text-[#42526E]">
                Description:
              </h1>
              {!checkEditSla ? (
                <p className="mt-[0.75rem] text-[#42526E] italic">
                  {slas.Description}
                </p>
              ) : (
                <textarea
                  className=" mt-[0.75rem] text-[#42526E] px-[0.75rem] py-[0.25rem] w-[80%] h-[5rem]"
                  value={slaDesInput}
                  onChange={(e) => setSlaDesInput(e.target.value)}
                ></textarea>
              )}
            </div>
            <div>
              <DragDropContext onDragEnd={handleDragEnd}>
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th />
                      <th>Response Time</th>
                      <th>Resolution Time</th>
                      <th>Condition</th>
                      <th></th>
                    </tr>
                  </thead>
                  <Droppable droppableId="droppable-1">
                    {(provider) => (
                      <tbody
                        className="text-capitalize"
                        ref={provider.innerRef}
                        {...provider.draggableProps}
                      >
                        {slas.SLAMetrics?.map((sla, index) => (
                          <Draggable
                            key={sla.SLAMetricID}
                            draggableId={sla.SLAMetricID}
                            index={index}
                          >
                            {(provider) => (
                              <tr
                                {...provider.draggableProps}
                                ref={provider.innerRef}
                              >
                                <td {...provider.dragHandleProps}> = </td>
                                {checkEditSla ? (
                                  <td>
                                    <input
                                      type="number"
                                      min="1"
                                      name="ResponseTime"
                                      itemID={sla.SLAMetricID}
                                      itemType="RPT"
                                      defaultValue={sla.ResponseTime}
                                      onChange={handleChange}
                                      className="border border-[#42526E] w-[5rem] rounded-md px-[0.5rem]"
                                    />
                                  </td>
                                ) : (
                                  <td>{sla.ResponseTime}</td>
                                )}
                                {checkEditSla ? (
                                  <td>
                                    <input
                                      type="number"
                                      min="1"
                                      name="ResolutionTime"
                                      itemID={sla.SLAMetricID}
                                      itemType="RST"
                                      defaultValue={sla.ResolutionTime}
                                      onChange={handleChange}
                                      className="border border-[#42526E] w-[13rem] rounded-md px-[0.5rem]"
                                    />
                                  </td>
                                ) : (
                                  <td>{sla.ResolutionTime}</td>
                                )}
                                <td>Priority = {sla.condition}</td>
                                <td></td>
                              </tr>
                            )}
                          </Draggable>
                        ))}
                        {provider.placeholder}
                      </tbody>
                    )}
                  </Droppable>
                </table>
              </DragDropContext>
            </div>

            {checkEditSla && (
              <div className="flex justify-end mt-[1rem]">
                <button
                  type="button"
                  onClick={handleSave}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 "
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-1 mb-2 "
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SLAComponent;
