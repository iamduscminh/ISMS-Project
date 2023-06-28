import React from "react";
import { useState } from "react";
function CustomField({
  fieldId,
  fieldCode,
  fieldName,
  fieldValue,
  fieldType,
  valType,
  mandatory,
  listOfValue,
}) {
  //Checklist
  const [checked, setChecked] = useState([]);

  // Add/Remove checked item from list
  const handleCheckList = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ";" + item;
      })
    : "";
  return (
    <div className="custom-field mb-6">
      {/* ----Text---- */}
      {fieldType === "T" && (
        <>
          <label
            htmlFor={`${fieldId}_${fieldCode}`}
            className="block mb-2 text-sm font-medium text-gray-500 "
          >
            {fieldName}
          </label>
          <input
            type="text"
            name={fieldCode}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            id={`${fieldId}_${fieldCode}`}
            value={fieldValue}
            placeholder=""
            required
          />
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
          </label>
          <textarea
            id={`${fieldId}_${fieldCode}`}
            rows="4"
            name={fieldCode}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            value={fieldValue}
          ></textarea>
        </>
      )}
      {/* ----Combobox---- */}
      {fieldType === "LOV" && (
        <>
          <label
            htmlFor={`${fieldId}_${fieldCode}`}
            className="block mb-2 text-sm font-medium text-gray-500 "
          >
            {fieldName}
          </label>
          <select
            id={`${fieldId}_${fieldCode}`}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option></option>
            {listOfValue.split(";").map((item, i) => {
              return (
                <option key={i} value={item} selected={item == fieldValue}>
                  {item}
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
                value={fieldValue}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label
              htmlFor={`${fieldId}_${fieldCode}`}
              className="ml-2 text-sm font-medium text-gray-500"
            >
              {fieldName}
            </label>
          </div>
        </>
      )}
      {/* ----Checklist---- */}
      {fieldType === "CL" && (
        <>
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
                  />
                </div>
                <label
                  htmlFor={`${fieldId}_${fieldCode}`}
                  className="ml-2 text-sm font-medium text-gray-500"
                >
                  {fieldName.split(";")[i]}
                </label>
              </div>
            );
          })}
          <div>{`Items checked are: ${checkedItems}`}</div>
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
          {listOfValue.split(";").map((item, i) => {
            return (
              <div key={i} className="flex items-center mb-4">
                <input
                  id={`${fieldId}_${fieldCode}_${i}`}
                  type="radio"
                  // checked={item == fieldValue}
                  value={item}
                  name={`${fieldCode}`}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
                />
                <label
                  htmlFor={`${fieldId}_${fieldCode}_${i}`}
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  {fieldName.split(";")[i]}
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
            </label>
            <input
              type="date"
              id={`${fieldId}_${fieldCode}`}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder=""
              required
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CustomField;
