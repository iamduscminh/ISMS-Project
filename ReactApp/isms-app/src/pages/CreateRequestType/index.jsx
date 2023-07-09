import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as Icon from "../../components/Elements/Icon";
import IconTag from "../../components/Elements/IconTag";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import CustomFieldTag from "../../components/Elements/CustomFieldTag";

function CreateRequestType() {
  const IconTest = { name: "User", tagName: "BsThreeDotsVertical" };
  const IconComponent = Icon[IconTest.tagName]; // Dynamically select the icon component

  const tabsData = [
    {
      label: "Information",
      tabIndex: 0,
    },
    {
      label: "Request Form",
      tabIndex: 1,
      content:
        "Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.",
    },
    {
      label: "SLAs",
      tabIndex: 2,
      content:
        "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
    },
    {
      label: "Workflow",
      tabIndex: 3,
      content:
        "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
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
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [listFieldConfig, setListFieldConfig] = useState(listFieldConfigInit);
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
  return (
    <div className="request-types-container pb-4 w-full h-full bg-[#3E5481] bg-blend-lighten">
      <div className="request-types-section mx-auto max-w-7xl ">
        {/* HEADER SECTION*/}
        <div className="request-types-header w-full text-white ">
          <nav className="request-types-header-nav pt-3 pb-1 ">
            <ul className="header-nav-content flex items-center text-[18px]">
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url" to="/">
                  <UnderlineAnimation className="">Home</UnderlineAnimation>
                </Link>
              </li>
              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url ">
                  <UnderlineAnimation>Service Requests</UnderlineAnimation>
                </Link>
              </li>
              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url ">
                  <UnderlineAnimation>Create Request Type</UnderlineAnimation>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="request-types-header-content pb-2 flex items-center">
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
            {/* All tab content. */}
            <div className="tab-content tab-space">
              {/*Information Tab*/}
              <div
                className={activeTabIndex === 0 ? "block" : "hidden"}
                id="tab0"
              >
                <div className="request-ticket-form-ctn w-[40%] m-3">
                  <form>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-500"
                      >
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder=""
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-500 "
                      >
                        Description <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Write description content of request type"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={onNextTab}
                    >
                      Next
                    </button>
                  </form>
                </div>
              </div>
              {/* Request Form Tab */}
              <div
                className={activeTabIndex === 1 ? "block" : "hidden"}
                id="tab0"
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
                  type="submit"
                  className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={onNextTab}
                >
                  Next
                </button>
              </div>

              {/* SLas */}
              <div
                className={activeTabIndex === 2 ? "block" : "hidden"}
                id="link2"
              ></div>
              {/* Workflow */}
              <div
                className={activeTabIndex === 3 ? "block" : "hidden"}
                id="link3"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRequestType;
