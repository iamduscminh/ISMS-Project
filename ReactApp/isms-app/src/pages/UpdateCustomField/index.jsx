import { React, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import IconTag from "../../components/Elements/IconTag";
import UnderlineAnimation from "../../components/Animation/UnderlineText";

function UpdateCustomField() {
  const [containListValue, setContainListValue] = useState(false);
  const [isUpdateView, setIsUpdateView] = useState(false);

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
    console.log(data);
    console.log(getValues("ctValType"));
  };
  //hiện input list value khi chọn field type cần thiết
  const onChangeFieldType = (e) => {
    let fieldType = e.target.value;
    let fieldTypeHasListValue = ["LOV", "CL", "RD"];
    if (fieldTypeHasListValue.some((item) => item == fieldType)) {
      setContainListValue(true);
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
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url ">
                  <UnderlineAnimation>CustomFields</UnderlineAnimation>
                </Link>
              </li>
              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url ">
                  <UnderlineAnimation>
                    {isUpdateView ? "Update" : "Create New"}
                  </UnderlineAnimation>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="request-types-header-content pb-2 flex items-center">
            <div className="request-types-header-icon">
              <IconTag
                name={"BsFillInfoSquareFill"}
                className="h-[50px] w-[50px]"
              />
            </div>
            <div className="request-types-header-description ml-5 w-1/2">
              <h4 className="text-2xl font-bold">Custom Field</h4>
              <span className="">
                Customize the form of each Request Ticket in the system, Custom
                Field with any type depend on purpose of each Request Type.
              </span>
            </div>
          </div>
        </div>
        {/*CREATE CUSTOM FIELD SECTION*/}
        <div className=" w-full min-h-screen p-6 bg-white rounded shadow ">
          <div className="request-tickets-ctn ">
            <div className="p-5 w-full h-full">
              <div className="request-ticket-form-ctn w-[60%] m-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <label
                      htmlFor="ctFieldCode"
                      className="block mb-2 text-sm font-medium text-gray-500 "
                    >
                      Field Code <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="ctFieldCode"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder=""
                      {...register("ctFieldCode", {
                        required: "This field is required.",
                        maxLength: {
                          value: 10,
                          message: "This field must less than 100 characters",
                        },
                      })}
                    />
                    <p className="mt-2 text-sm text-red-600 ">
                      {errors.ctFieldCode && errors.ctFieldCode.message}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="ctFieldName"
                      className="block mb-2 text-sm font-medium text-gray-500 "
                    >
                      Field Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="ctFieldName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder=""
                      {...register("ctFieldName", {
                        required: "This field is required.",
                        maxLength: {
                          value: 200,
                          message: "This field must less than 200 characters",
                        },
                      })}
                    />
                    <p className="mt-2 text-sm text-red-600 ">
                      {errors.ctFieldName && errors.ctFieldName.message}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="ctDesc"
                      className="block mb-2 text-sm font-medium text-gray-500 "
                    >
                      Description
                    </label>
                    <textarea
                      id="ctDesc"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="Write description content of custom field"
                      {...register("ctDesc", {
                        maxLength: {
                          value: 2000,
                          message: "This field must less than 2000 characters",
                        },
                      })}
                    ></textarea>
                    <p className="mt-2 text-sm text-red-600 ">
                      {errors.ctDesc && errors.ctDesc.message}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="ctFieldType"
                      className="block mb-2 text-sm font-medium text-gray-500"
                    >
                      Field Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="ctFieldType"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      defaultValue={"T"}
                      onChange={onChangeFieldType}
                      {...register("ctFieldType")}
                    >
                      <option value="T">Text</option>
                      <option value="TA">TextArea</option>
                      <option value="LOV">Combobox</option>
                      <option value="C">Checkbox</option>
                      <option value="CL">Checklist</option>
                      <option value="F">File</option>
                      <option value="RD">Radio</option>
                      <option value="D">Date</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="ctValType"
                      className="block mb-2 text-sm font-medium text-gray-500"
                    >
                      Value Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="ctValType"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      defaultValue={"T"}
                      {...register("ctValType")}
                    >
                      <option value="T">Text</option>
                      <option value="N">Number</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="ctMinValue"
                      className="block mb-2 text-sm font-medium text-gray-500 "
                    >
                      Min Value
                    </label>
                    <input
                      type="text"
                      id="ctMinValue"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder=""
                      {...register("ctMinValue", {
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "This field is number only.",
                        },
                      })}
                    />{" "}
                    <p className="mt-2 text-sm text-red-600 ">
                      {errors.ctMinValue && errors.ctMinValue.message}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="ctMaxValue"
                      className="block mb-2 text-sm font-medium text-gray-500 "
                    >
                      Max Value
                    </label>
                    <input
                      type="text"
                      id="ctMaxValue"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder=""
                      {...register("ctMaxValue", {
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "This field is number only.",
                        },
                      })}
                    />
                    <p className="mt-2 text-sm text-red-600 ">
                      {errors.ctMaxValue && errors.ctMaxValue.message}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="ctMinLength"
                      className="block mb-2 text-sm font-medium text-gray-500 "
                    >
                      Min Length
                    </label>
                    <input
                      type="text"
                      id="ctMinLength"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder=""
                      {...register("ctMinLength", {
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "This field is number only.",
                        },
                        min: {
                          value: 1,
                          message: "This field value must exceed 0",
                        },
                      })}
                    />
                    <p className="mt-2 text-sm text-red-600 ">
                      {errors.ctMinLength && errors.ctMinLength.message}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="ctMaxLength"
                      className="block mb-2 text-sm font-medium text-gray-500 "
                    >
                      Max Length
                    </label>
                    <input
                      type="text"
                      id="ctMaxLength"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder=""
                      {...register("ctMinLength", {
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "This field is number only.",
                        },
                      })}
                    />
                    <p className="mt-2 text-sm text-red-600 ">
                      {errors.ctMaxLength && errors.ctMaxLength.message}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="ctDefaultValue"
                      className="block mb-2 text-sm font-medium text-gray-500 "
                    >
                      Default Value
                    </label>
                    <input
                      type="text"
                      id="ctDefaultValue"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder=""
                    />
                  </div>
                  {containListValue && (
                    <>
                      <div className="mb-6">
                        <label
                          htmlFor="ctListOfValue"
                          className="block mb-2 text-sm font-medium text-gray-500 "
                        >
                          List of Value{" "}
                          <span className="text-red-500">
                            {'(split value by ";")'}
                          </span>
                        </label>
                        <input
                          type="text"
                          id="ctListOfValue"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder=""
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="ctListOfValueDisplay"
                          className="block mb-2 text-sm font-medium text-gray-500 "
                        >
                          List of Value Display{" "}
                          <span className="text-red-500">
                            {'(split value by ";")'}
                          </span>
                        </label>
                        <input
                          type="text"
                          id="ctListOfValueDisplay"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder=""
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {isUpdateView ? "Update" : "Create"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCustomField;
