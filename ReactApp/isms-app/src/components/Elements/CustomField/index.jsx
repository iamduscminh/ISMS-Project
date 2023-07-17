import React, { useRef, useEffect, useState } from "react";

function CustomField({
  fieldId,
  fieldCode,
  fieldName,
  fieldValue,
  fieldType,
  valType,
  mandatory,
  minVal,
  maxVal,
  minlength,
  maxlength,
  listOfValue,
  listOfValueDisplay,
  placeholder,
  register,
  setValueFnc,
  errors,
}) {
  const [error, setError] = useState("");
  mandatory = mandatory === 1;

  /*------Checklist------*/
  const [checkedCL, setCheckedCL] = useState([]);
  // Add/Remove checked item from list
  const handleCheckList = (event) => {
    var updatedList = [...checkedCL];
    if (event.target.checked) {
      updatedList = [...checkedCL, event.target.value];
    } else {
      updatedList.splice(checkedCL.indexOf(event.target.value), 1);
    }
    setCheckedCL(updatedList);
    console.log(checkedCLItems);
  };

  // Generate string of checked items
  const checkedCLItems = checkedCL.length
    ? checkedCL.reduce((total, item) => {
        return total + ";" + item;
      })
    : "";

  return (
    <div className="custom-field mb-6">
      {/* ----Text---- */}
      {fieldType === "T" && (
        <>
          {!!fieldName && (
            <label
              htmlFor={`${fieldId}_${fieldCode}`}
              className="block mb-2 text-sm font-medium text-gray-500 "
            >
              {fieldName}
              {mandatory && <span className="text-red-600">*</span>}
            </label>
          )}

          <input
            type="text"
            name={fieldCode}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            id={`${fieldId}_${fieldCode}`}
            value={fieldValue}
            placeholder={placeholder}
            {...register(`${fieldCode}`, {
              required: mandatory && "This field is required.",
              min: minVal && {
                value: minVal,
                message: `The value of ${fieldName} must be more than ${minVal}!`,
              },
              max: maxVal && {
                value: maxVal,
                message: `The value of ${fieldName} must be less than ${maxVal}!`,
              },
              minLength: minlength && {
                value: minlength,
                message: `${fieldName} must be more than ${minlength} characters!`,
              },
              maxLength: {
                value: maxlength,
                message: `${fieldName} must be less than ${maxlength} characters!`,
              },
              pattern: valType == "N" && {
                value: /^[0-9]*$/,
                message: `${fieldName} must be only number!`,
              },
            })}
          />
          {errors && errors[fieldCode] && errors[fieldCode].message && (
            <p className="mt-2 text-sm text-red-600 ">
              {errors[fieldCode].message}
            </p>
          )}
        </>
      )}
      {/* ----TextArea---- */}
      {fieldType === "TA" && (
        <>
          <label
            htmlFor={`${fieldId}_${fieldCode}`}
            className="block mb-2 text-sm font-medium text-gray-500 "
          >
            {fieldName}
            {mandatory && <span className="text-red-600">*</span>}
          </label>
          <textarea
            id={`${fieldId}_${fieldCode}`}
            rows="4"
            name={fieldCode}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            value={fieldValue}
            {...register(`${fieldCode}`, {
              required: mandatory && "This field is required.",
              min: minVal && {
                value: minVal,
                message: `The value of ${fieldName} must be more than ${minVal}!`,
              },
              max: maxVal && {
                value: maxVal,
                message: `The value of ${fieldName} must be less than ${maxVal}!`,
              },
              minLength: minlength && {
                value: minlength,
                message: `${fieldName} must be more than ${minlength} characters!`,
              },
              maxLength: {
                value: maxlength,
                message: `${fieldName} must be less than ${maxlength} characters!`,
              },
              pattern: valType == "N" && {
                value: /^[0-9]*$/,
                message: `${fieldName} must be only number!`,
              },
            })}
          ></textarea>
          {errors && errors[fieldCode] && errors[fieldCode].message && (
            <p className="mt-2 text-sm text-red-600 ">
              {errors[fieldCode].message}
            </p>
          )}
        </>
      )}
      {/* ----Combobox---- */}
      {fieldType === "LOV" && (
        <>
          <label
            htmlFor={`${fieldId}_${fieldCode}`}
            className="block mb-2 text-sm font-medium text-gray-500"
            defaultValue=""
          >
            {fieldName}
            {mandatory && <span className="text-red-600">*</span>}
          </label>
          <select
            id={`${fieldId}_${fieldCode}`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={fieldValue != null ? fieldValue : null}
            {...register(`${fieldCode}`)}
          >
            <option></option>
            {listOfValue.split(";").map((item, i) => {
              return (
                <option key={i} value={item}>
                  {listOfValueDisplay.split(";")[i]}
                </option>
              );
            })}
          </select>
        </>
      )}
      {/* ----Checkbox---- */}
      {fieldType === "C" && (
        <>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id={`${fieldId}_${fieldCode}`}
                type="checkbox"
                name={fieldCode}
                defaultChecked={fieldValue == "true"}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                {...register(`${fieldCode}`, { valueAsNumber: true })}
              />
            </div>
            <label
              htmlFor={`${fieldId}_${fieldCode}`}
              className="ml-2 text-sm font-medium text-gray-500"
            >
              {fieldName}
              {mandatory && <span className="text-red-600">*</span>}
            </label>
          </div>
        </>
      )}
      {/* ----Checklist---- */}
      {fieldType === "CL" && (
        <>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            {fieldName}
            {mandatory && <span className="text-red-600">*</span>}
          </label>
          {listOfValue.split(";").map((item, i) => {
            return (
              <div key={i} className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id={`${fieldId}_${fieldCode}`}
                    type="checkbox"
                    name={fieldCode}
                    value={item}
                    onChange={handleCheckList}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    {...register(`${fieldCode}`)}
                  />
                </div>
                <label
                  htmlFor={`${fieldId}_${fieldCode}`}
                  className="ml-2 text-sm font-medium text-gray-500"
                >
                  {listOfValueDisplay.split(";")[i]}
                </label>
              </div>
            );
          })}
          <div>{`Items checked are: ${checkedCLItems}`}</div>
        </>
      )}
      {/* ----File---- */}
      {fieldType === "F" && (
        <>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor={`${fieldId}_${fieldCode}`}
            >
              {fieldName}
              {mandatory && <span className="text-red-600">*</span>}
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
              aria-describedby="file_input_help"
              id={`${fieldId}_${fieldCode}`}
              type="file"
            />
            <p className="mt-1 text-sm text-gray-500" id="file_input_help">
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>
          </div>
        </>
      )}
      {/* ----Radio---- */}
      {fieldType === "RD" && (
        <>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            {fieldName}
            {mandatory === 1 && <span className="text-red-600">*</span>}
          </label>
          {listOfValue.split(";").map((item, i) => {
            return (
              <div key={i} className="flex items-center mb-4">
                <input
                  id={`${fieldId}_${fieldCode}_${i}`}
                  type="radio"
                  defaultChecked={item == fieldValue}
                  value={item}
                  name={`${fieldCode}`}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
                  {...register(`${fieldCode}`)}
                />
                <label
                  htmlFor={`${fieldId}_${fieldCode}_${i}`}
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  {listOfValueDisplay.split(";")[i]}
                </label>
              </div>
            );
          })}
        </>
      )}
      {/* ----Date---- */}
      {fieldType === "D" && (
        <>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor={`${fieldId}_${fieldCode}`}
            >
              {fieldName}
              {mandatory && <span className="text-red-600">*</span>}
            </label>
            <input
              type="date"
              id={`${fieldId}_${fieldCode}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder=""
              value={fieldValue}
              {...register(`${fieldCode}`)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CustomField;
