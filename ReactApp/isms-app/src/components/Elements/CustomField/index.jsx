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
}) {
  const [error, setError] = useState("");
  const valRef = useRef(null);
  /*------Text------*/
  const [inputVal, setInputVal] = useState("");
  const handleChangeInput = (event) => {
    setInputVal(event.target.value);
  };

  //Validate Input Value
  const validateInputVal = (val) => {
    let listErr = [];
    //Mandatory
    if (!val && mandatory == 1) listErr.push(`${fieldName} is required!`);
    else if (
      (!!valType || !!minVal || !!maxVal || !!minlength || !!maxlength) &&
      !!val
    ) {
      //Valtype
      if (!!valType && valType == "N" && isNaN(val))
        listErr.push(`${fieldName} must be number!`);
      //Min Length
      if (!!minlength && val.length < minlength)
        listErr.push(`${fieldName} must be more than ${minlength} characters!`);
      //Max Length
      if (!!maxlength && val.length > maxlength)
        listErr.push(`${fieldName} must be less than ${maxlength} characters!`);
      //Min Val
      if (
        !!valType &&
        valType == "N" &&
        !isNaN(val) &&
        !!minVal &&
        val < minVal
      )
        listErr.push(`The value of ${fieldName} must be more than ${minVal}!`);
      //Max Val
      if (
        !!valType &&
        valType == "N" &&
        !isNaN(val) &&
        !!maxVal &&
        val > maxVal
      )
        listErr.push(`The value of ${fieldName} must be less than ${maxVal}!`);
    } else listErr = [];
    return listErr.join(", ");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (valRef.current && !valRef.current.contains(event.target)) {
        let errorValidate = validateInputVal(inputVal);
        setError(errorValidate);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputVal]);

  /*------Textarea------*/
  const [inputAreaVal, setInputAreaVal] = useState("");
  const handleChangeInputArea = (event) => {
    setInputAreaVal(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (valRef.current && !valRef.current.contains(event.target)) {
        let errorValidate = validateInputVal(inputAreaVal);
        setError(errorValidate);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputAreaVal]);

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
          <label
            htmlFor={`${fieldId}_${fieldCode}`}
            className="block mb-2 text-sm font-medium text-gray-500 "
          >
            {fieldName}
          </label>
          <input
            type="text"
            ref={valRef}
            onChange={handleChangeInput}
            name={fieldCode}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            id={`${fieldId}_${fieldCode}`}
            value={fieldValue}
            placeholder=""
            required
          />
          <p className="mt-2 text-sm text-red-600 ">{error}</p>
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
            ref={valRef}
            onChange={handleChangeInputArea}
            rows="4"
            name={fieldCode}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            value={fieldValue}
          ></textarea>
          <p className="mt-2 text-sm text-red-600 ">{error}</p>
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
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            {fieldName}
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
          </label>
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
