import React, { useState } from "react";
import { BiTime } from "react-icons/bi";
import { MdOutlineEditNote, MdAutoDelete } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import SLATrigger from "../../../components/Elements/SLATrigger";
const slaData = {
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
};
const SLA = () => {
  const [slas, setSlas] = useState(slaData.data);
  const [newData, setNewData] = useState({ time: "", condition: "" });
  const [checkNewMetric, setCheckNewMetric] = useState(false);

  const handleNewMetric = () => {
    if (checkNewMetric) return;
    setCheckNewMetric(true);
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(slas);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setSlas(tempData);
  };

  const handleDeleteSlas = (id) => {
    const filter = slas.filter((e) => e.id !== id);
    setSlas(filter);
  };

  const handleAddRow = () => {
    // Thực hiện thêm hàng dữ liệu mới vào mảng slas
    setSlas((prev) => [...prev, newData]);

    // Đặt lại trạng thái của newData về trống
    setNewData({ time: "", condition: "" });
    setCheckNewMetric(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseInputSLA = () => {
    setNewData({ time: "", condition: "" });
    setCheckNewMetric(false);
  };
  return (
    <div className="flex flex-col w-full h-[90vh]">
      <div className="h-[5%] bg-[#42526E] flex text-[#ffF] font-medium text-[1rem] justify-start items-center pl-[3rem]">
        <div>
          <span className="mr-[3rem]">Service Level Agreements Metric</span>
        </div>
      </div>
      <div className="w-full flex justify-center mt-[1rem]">
        <div className="w-[70%] ">
          <div className="w-full border border-[#42526E] rounded-md shadow-sm px-[1rem] py-[0.75rem]">
            <div className="flex text-[1.25rem] text-[#42526E] items-center">
              <BiTime className="mr-[1.5rem]" />
              <h1 className="font-medium">Time to Resolve Issue</h1>
              <div className="flex ml-auto">
                <MdOutlineEditNote className="cursor-pointer" />
                <MdAutoDelete className="ml-[0.75rem] cursor-pointer" />
                <IoIosArrowDown className="ml-[1.5rem] cursor-pointer " />
              </div>
            </div>
            <div className="w-full mt-[1rem]">
              <div className="flex flex-col">
                <h1 className="text-[1rem] font-medium text-[#42526E]">
                  SLA Description
                </h1>
                <p className="mt-[0.75rem] text-[#42526E]">
                  Time to Resolution SLA helps to ensure that service providers
                  will respond and resolve customer requests within a certain
                  time. This helps to respond to customer needs and wants
                  quickly and create satisfaction.
                </p>
              </div>
              <div>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th />
                        <th>Time Goal</th>
                        <th>Condition</th>
                        <th>
                          <div className="flex justify-end">
                            <AiOutlinePlus
                              onClick={handleNewMetric}
                              className="cursor-pointer text-[1.2rem] text-[#42526E]"
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <Droppable droppableId="droppable-1">
                      {(provider) => (
                        <tbody
                          className="text-capitalize"
                          ref={provider.innerRef}
                          {...provider.draggableProps}
                        >
                          {slas?.map((sla, index) => (
                            <Draggable
                              key={sla.id}
                              draggableId={sla.id}
                              index={index}
                            >
                              {(provider) => (
                                <tr
                                  {...provider.draggableProps}
                                  ref={provider.innerRef}
                                >
                                  <td {...provider.dragHandleProps}> = </td>
                                  <td>{sla.time}</td>
                                  <td>{sla.condition}</td>
                                  <td>
                                    <div className="flex justify-end text-[1.2rem] text-[#42526E]">
                                      <AiOutlineClose
                                        onClick={() => handleDeleteSlas(sla.id)}
                                        className="cursor-pointer"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </Draggable>
                          ))}
                          {provider.placeholder}
                          {checkNewMetric && (
                            <tr>
                              <td></td>

                              <td>
                                <input
                                  type="text"
                                  name="time"
                                  value={newData.time}
                                  onChange={handleChange}
                                  className="border border-[#42526E] w-[5rem] rounded-md px-[0.5rem]"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="condition"
                                  value={newData.condition}
                                  onChange={handleChange}
                                  className="border border-[#42526E] w-[13rem] rounded-md px-[0.5rem]"
                                />
                              </td>
                              <td>
                                <div className="flex justify-end text-[1.2rem] text-[#42526E]">
                                  <TiTick
                                    onClick={handleAddRow}
                                    className="cursor-pointer mr-[0.5rem]"
                                  />
                                  <AiOutlineClose
                                    onClick={handleCloseInputSLA}
                                    className="cursor-pointer"
                                  />
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      )}
                    </Droppable>
                  </table>
                </DragDropContext>
              </div>
              <div className="mt-[0.5rem]">
                <h1 className="font-medium text-[#42526E]">SLA Triggers</h1>
                <p className="mt-[0.75rem] text-[#42526E]">
                  Time will be measured between the start and stop conditions
                  below.
                </p>
                <div className="w-full mt-[0.75rem]">
                  <div>
                    <h2 className="text-[#42526E]">Start Trigger</h2>
                    <div className="w-full h-[1px] bg-[#bdbbbb] mt-[0.4rem]"></div>
                  </div>
                  <div className="mt-[1rem]">
                    <SLATrigger/>
                  </div>
                </div>
                <div className="w-full mt-[0.75rem]">
                  <div>
                    <h2 className="text-[#42526E]">Finish Trigger</h2>
                    <div className="w-full h-[1px] bg-[#bdbbbb] mt-[0.4rem]"></div>
                  </div>
                  <div className="mt-[1rem]">
                    <SLATrigger/>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-[1rem]">
                <button className="mr-[0.75rem] px-[1rem] py-[0.25rem] text-[#fff] bg-[#043AC5]">Save</button>
                <button className="mr-[1rem] px-[1rem] py-[0.25rem] bg-[#FFF]">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLA;
