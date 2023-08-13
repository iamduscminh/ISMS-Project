import { React, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as Icon from "../../components/Elements/Icon";
import IconTag from "../../components/Elements/IconTag";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import CustomFieldTag from "../../components/Elements/CustomFieldTag";
import ModalDialog from "../../components/Elements/PopupModal";
import CustomField from "../../components/Elements/CustomField";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../hooks/useAuth";
function CreateRequestType() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  console.log(auth);
  const iconRequestTypes = [
    "BsFillInfoSquareFill",
    "HiOutlineDesktopComputer",
    "AiOutlineLaptop",
    "RiComputerLine",
    "FaMobileAlt",
    "MdPassword",
    "AiOutlineWifi",
    "MdPublishedWithChanges",
    "BsMicrosoft",
    "CgSoftwareDownload",
    "SlEarphonesAlt",
    "AiOutlineCloudDownload",
    "AiFillBug",
    "AiFillFileAdd",
    "AiFillFolderAdd",
    "AiFillIdcard",
    "GiAutoRepair",
    "AiOutlineMail",
    "AiFillDatabase",
    "FaServer",
    "AiFillWarning",
    "AiFillSetting",
  ];
  //tab hiển thị
  const tabsData = [
    {
      label: "Information",
      tabIndex: 0,
    },
    {
      label: "Request Form",
      tabIndex: 1,
    },
    {
      label: "Workflows",
      tabIndex: 2,
    },
  ];
  const listFieldsAll = [
    {
      fieldId: 1,
      fieldName: "Reason Change",
    },
    {
      fieldId: 2,
      fieldName: "Reason Approve",
    },
    {
      fieldId: 3,
      fieldName: "Computer Affected",
    },
    {
      fieldId: 4,
      fieldName: "Computer Broken",
    },
    {
      fieldId: 5,
      fieldName: "Password reset",
    },
    {
      fieldId: 6,
      fieldName: "Wifi reset",
    },
    {
      fieldId: 7,
      fieldName: "Configuration Information",
    },
    {
      fieldId: 8,
      fieldName: "Brand Expect",
    },
  ];
  const listFieldConfigInit = [
    {
      fieldId: "1",
      fieldName: "Reason Change",
      mandatory: true,
    },
    {
      fieldId: "2",
      fieldName: "Reason Approve",
      mandatory: true,
    },
    {
      fieldId: "3",
      fieldName: "Computer Affected",
      mandatory: false,
    },
  ];
  const [listOfService, setListOfService] = useState([
    { id: 1, serviceName: "Computers" },
    { id: 2, serviceName: "Account & Pass" },
    { id: 3, serviceName: "Wiffi" },
  ]);

  //Icon
  const [iconRequestType, setIconRequestType] = useState(
    "BsFillInfoSquareFill"
  );
  const [iconRequestTypeTemp, setIconRequestTypeTemp] =
    useState(iconRequestType);
  const [selectedService, setSelectedService] = useState(listOfService[0]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [listFieldConfig, setListFieldConfig] = useState(listFieldConfigInit);
  const [isCreateNewService, setCreateNewService] = useState(false);
  const [errorService, setErrorService] = useState("");
  //định nghĩa form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => {
    // console.log(data);
    // console.log(iconRequestType);
    // console.log(selectedService);
    // console.log(listFieldConfig);
  };
  const handleCreateRequestType = () => {
    if (Object.keys(errors).length !== 0) setActiveTabIndex(0);
  };
  const onNextTab = () => {
    setActiveTabIndex(activeTabIndex + 1);
  };
  const onBackTab = () => {
    setActiveTabIndex(activeTabIndex > 1 ? activeTabIndex - 1 : 0);
  };
  const onSetRequiredCustomField = (e) => {
    let fieldId = e.target.value;
    setListFieldConfig(
      listFieldConfig.map((item) =>
        item.fieldId == fieldId ? { ...item, mandatory: !item.mandatory } : item
      )
    );
  };
  const onRemoveCustomField = (e) => {
    let fieldId = e.target.value;
    setListFieldConfig(
      listFieldConfig.filter((item) => item.fieldId != fieldId)
    );
  };
  const handleSelectCustomField = (e) => {
    let fieldId = e.target.id;
    let fieldName = e.target.value;

    if (listFieldConfig.some((i) => i.fieldId == fieldId))
      setListFieldConfig(
        listFieldConfig.filter((item) => item.fieldId != fieldId)
      );
    else {
      const fieldConfig = {
        fieldId: fieldId,
        fieldName: fieldName,
        mandatory: false,
      };
      setListFieldConfig((prev) => [...prev, fieldConfig]);
    }
  };
  const handleClickNewService = (e) => {
    if (isCreateNewService) return;
    setCreateNewService(true);
  };
  const handleCreateNewService = (e) => {
    if (!isCreateNewService) return;
    const serviceValue = getValues("svcName");
    if (serviceValue) {
      setListOfService([
        ...listOfService,
        { id: 0, serviceName: serviceValue },
      ]);
      setCreateNewService(false);
      setSelectedService({ id: 0, serviceName: serviceValue });
    } else {
      setErrorService("Service Name is required!");
    }
  };
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const columns = [
    { field: "stt", headerName: "STT", width: 50 },
    { field: "id", headerName: "ID", width: 150 },
    { field: "wflName", headerName: "Workflow Name", width: 300 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "createBy", headerName: "Create By", width: 200 },
    { field: "createAt", headerName: "Create At", width: 200 },
  ];
  const [workflowData, setworkflowData] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const handleFilterChange = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredData = workflowData.filter((row) =>
      Object.values(row).some(
        (value) =>
          (typeof value === "string" &&
            value.toLowerCase().includes(keyword)) ||
          (typeof value === "number" && value.toString().includes(keyword))
      )
    );
    setFilteredRows(filteredData);
  };

  const handleRowClick = (params) => {
    const { id } = params.row;
    navigate("/detailRequest/" + id);
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
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url hover:underline hover:text-white">
                  Service Requests
                </Link>
              </li>
              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url hover:underline hover:text-white">
                  Create Request Type
                </Link>
              </li>
            </ul>
          </nav>
          <div className="request-types-header-content pb-2 flex items-center pl-[1.25rem]">
            <div className="request-types-header-icon">
              <Icon.BsFillInfoSquareFill className="h-[50px] w-[50px]" />
            </div>
            <div className="request-types-header-description ml-5 w-1/2">
              <h4 className="text-2xl font-bold">Service Requests</h4>
              <span className="">
                Customize the types of service requests in the system. Make
                these request types available in your system portal by editing
                your request type group.
              </span>
            </div>
          </div>
        </div>
        {/*CREATE REQUEST TYPE SECTION*/}
        <div className=" w-full min-h-screen p-6 bg-white rounded shadow ">
          <div className="request-tickets-ctn ">
            <div className="flex space-x-3 border-b">
              {/* Loop through tab data and render button for each. */}
              {tabsData.map((tab, idx) => {
                return (
                  <button
                    key={idx}
                    className={`py-2 px-4 border-b-2 transition-colors duration-300 ${
                      tab.tabIndex === activeTabIndex
                        ? "border-gray-600"
                        : "border-transparent hover:border-gray-200"
                    }`}
                    // Change the active tab on click.
                    onClick={() => setActiveTabIndex(tab.tabIndex)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* All tab content. */}
              <div className="tab-content tab-space text-[#42526E]">
                {/*Information Tab*/}
                <div
                  className={activeTabIndex === 0 ? "block" : "hidden"}
                  id="tabInfor"
                >
                  <div className="request-ticket-form-ctn w-[40%] m-3">
                    {/* Type Name */}
                    <div className="mb-6">
                      <label
                        htmlFor="rqtName"
                        className="block mb-2 text-sm font-medium text-gray-500"
                      >
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="rqtName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder=""
                        {...register("rqtName", {
                          required: "This field is required.",
                          maxLength: {
                            value: 100,
                            message: "This field must less than 100 characters",
                          },
                        })}
                      />
                      <p className="mt-2 text-sm text-red-600 ">
                        {errors.rqtName && errors.rqtName.message}
                      </p>
                    </div>
                    {/* Description */}
                    <div className="mb-6">
                      <label
                        htmlFor="rqtDescription"
                        className="block mb-2 text-sm font-medium text-gray-500 "
                      >
                        Description <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="rqtDescription"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Write description content of request type"
                        {...register("rqtDescription", {
                          required: "This field is required.",
                          maxLength: {
                            value: 1000,
                            message:
                              "This field must less than 1000 characters",
                          },
                        })}
                      ></textarea>
                      <p className="mt-2 text-sm text-red-600 ">
                        {errors.rqtDescription && errors.rqtDescription.message}
                      </p>
                    </div>
                    {/* Icon */}
                    <div className="mb-6">
                      <label
                        htmlFor="rqtIcon"
                        className="block mb-2 text-sm font-medium text-gray-500"
                      >
                        Icon
                      </label>
                      <div className="Icon flex items-center">
                        {/* Icon Default */}
                        <IconTag
                          className="h-[30px] w-[30px] mr-7"
                          name={iconRequestType}
                        />

                        <ModalDialog
                          title={"Change Icon Request Type"}
                          actionText={"Save"}
                          actionHandler={() =>
                            setIconRequestType(iconRequestTypeTemp.toString())
                          }
                          triggerComponent={
                            <div className="inline-block cursor-pointer">
                              <button
                                type="button"
                                className="py-2.5 px-4 mr-2 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                              >
                                Change
                              </button>
                            </div>
                          }
                        >
                          {/* Children */}
                          <div className="IconList flex flex-wrap w-[100%] overflow-y-auto h-64">
                            {iconRequestTypes.map((item, i) => (
                              <IconTag
                                className={`w-[30%] h-[30%] p-1 m-1 cursor-pointer hover:bg-slate-300 ${
                                  item == iconRequestTypeTemp
                                    ? "bg-slate-500"
                                    : ""
                                }`}
                                key={i}
                                name={item}
                                onClickHandle={() =>
                                  setIconRequestTypeTemp(item.toString())
                                }
                              />
                            ))}
                          </div>
                        </ModalDialog>
                      </div>
                    </div>
                    {/*Service */}
                    <div className="mb-6">
                      <div className="flex items-center">
                        <label
                          htmlFor="rqtService"
                          className="block text-sm mr-3 font-medium text-gray-500"
                        >
                          Service:
                        </label>
                        <ModalDialog
                          title={"Choose Service of current Request Type"}
                          actionText={"Save"}
                          actionHandler={() =>
                            setIconRequestType(iconRequestTypeTemp.toString())
                          }
                          triggerComponent={
                            <div className="inline-block cursor-pointer">
                              <span className="font-bold text-[#42526E] text-xl hover:underline">
                                {selectedService?.serviceName}
                              </span>
                            </div>
                          }
                        >
                          {/* Children Service Section */}
                          <div className="ServiceList flex flex-col flex-wrap w-[100%] overflow-y-auto h-64">
                            {listOfService.map((item, i) => {
                              return (
                                <div key={i} className="items-center mb-2">
                                  <input
                                    id={`svc${i}`}
                                    type="checkbox"
                                    checked={selectedService?.id === item.id}
                                    onChange={() =>
                                      setSelectedService({
                                        id: item.id,
                                        serviceName: item.serviceName,
                                      })
                                    }
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
                                  />
                                  <label
                                    htmlFor={`svc${i}`}
                                    className="ml-2 text-sm font-medium text-gray-900 "
                                  >
                                    {item.serviceName}
                                  </label>
                                </div>
                              );
                            })}
                            {isCreateNewService && (
                              <div className=" flex items-center mb-4">
                                <input
                                  id={`svc0`}
                                  type="checkbox"
                                  checked={selectedService.id == 0}
                                  onChange={() =>
                                    setSelectedService({
                                      id: 0,
                                      serviceName: selectedService.serviceName,
                                    })
                                  }
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
                                />
                                <div className="w-[60%] ml-2  ">
                                  <CustomField
                                    fieldId={"svcName"}
                                    fieldCode={"svcName"}
                                    fieldType="T"
                                    valType="T"
                                    mandatory={1}
                                    maxlength={200}
                                    placeholder={"Name of Service..."}
                                    register={register}
                                    errors={errors}
                                  />
                                  <p className="mt-2 text-sm text-red-600 ">
                                    {errorService}
                                  </p>
                                </div>
                                <div
                                  className="flex items-center cursor-pointer p-2 ml-2 bg-slate-100 hover:bg-slate-300"
                                  onClick={handleCreateNewService}
                                >
                                  <IconTag name={"AiOutlineCheck"}></IconTag>
                                </div>
                                <div
                                  className="flex items-center cursor-pointer p-2 ml-2 bg-slate-100 hover:bg-slate-300"
                                  onClick={() => {
                                    setCreateNewService(false);
                                  }}
                                >
                                  <IconTag name={"AiOutlineClose"}></IconTag>
                                </div>
                              </div>
                            )}

                            <div
                              className={`${
                                isCreateNewService
                                  ? "text-gray-600"
                                  : "text-blue-600 cursor-pointer"
                              } font-medium flex items-center  hover:underline`}
                              onClick={handleClickNewService}
                            >
                              <IconTag name={"AiOutlinePlus"}></IconTag>
                              <span className="ml-1">Create</span>
                            </div>
                          </div>
                        </ModalDialog>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={onNextTab}
                    >
                      Next
                    </button>
                  </div>
                </div>
                {/* Request Form Tab */}
                <div
                  className={activeTabIndex === 1 ? "block" : "hidden"}
                  id="tabRqForm"
                >
                  <div className="request-form-ctn flex justify-between">
                    <div className="request-form-config w-1/2">
                      <h5 className="text-xl font-bold">Default Fields</h5>
                      <div className="request-form-default w-[80%] m-3 p-3 border-dashed border-2 border-gray-500">
                        <div className="field-item px-2 py-1 mb-2 w-full border">
                          <p>Title</p>
                        </div>
                        <div className="field-item px-2 py-1 mb-2 w-full border">
                          <p>Description</p>
                        </div>
                      </div>
                      <h5 className="text-xl font-bold">Custom Fields</h5>
                      <div className="request-form-custom w-[80%] m-3 p-3 border-dashed border-2 border-gray-500">
                        {listFieldConfig.map((item, i) => (
                          <CustomFieldTag
                            key={item.fieldId}
                            field={item.fieldId}
                            fieldName={item.fieldName}
                            required={item.mandatory}
                            requiredClickHandle={onSetRequiredCustomField}
                            removeClickHandle={onRemoveCustomField}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="request-form-list w-1/2">
                      <div className="request-form-custom w-[90%] m-3 p-3 border-dashed border-2 border-gray-500">
                        <h5 className="text-xl font-bold">
                          Custom Fields Select
                        </h5>
                        <p>Select to add in your request form</p>
                        <hr />
                        <div className="mt-2">
                          {listFieldsAll.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-start mb-1 border p-2"
                            >
                              <div className="flex items-center h-5">
                                <input
                                  id={`${item.fieldId}`}
                                  type="checkbox"
                                  value={item.fieldName}
                                  checked={listFieldConfig.some(
                                    (i) => i.fieldId == item.fieldId
                                  )}
                                  onChange={handleSelectCustomField}
                                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                />
                              </div>
                              <label
                                htmlFor={`${item.fieldId}`}
                                className="ml-2 text-sm font-medium text-gray-500"
                              >
                                {item.fieldName}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={onBackTab}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={onNextTab}
                  >
                    Next
                  </button>
                </div>
                {/* Workflow Tag */}
                <div
                  className={activeTabIndex === 2 ? "block" : "hidden"}
                  id="tabRqForm"
                >
                  <div className="workflow-ctn flex justify-between">
                    {" "}
                    <div className="request-tickets-ctn">
                      <div className="top-menu">
                        <div className="search-section">
                          <form className="mb-3 w-1/3">
                            <label
                              htmlFor="default-search"
                              className="mb-2 text-sm font-medium text-gray-900 sr-only "
                            >
                              Search
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                                <svg
                                  aria-hidden="true"
                                  className="w-5 h-5 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                  ></path>
                                </svg>
                              </div>
                              <input
                                type="search"
                                onChange={handleFilterChange}
                                id="default-search"
                                className="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search..."
                              />
                            </div>
                          </form>
                        </div>
                      </div>

                      <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        pageSize={20}
                        onRowClick={handleRowClick}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={onBackTab}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleCreateRequestType}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRequestType;
