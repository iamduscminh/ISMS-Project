import React from "react";
import RequestComment from "../../components/Elements/RequestComment";
import CustomField from "../../components/Elements/CustomField";
function Following() {
  return (
    <div className="w-[50%] m-6">
      <CustomField
        fieldId={"#1"}
        fieldCode={"REQ01"}
        fieldType={"T"}
        fieldName={"Email"}
        mandatory={1}
        minlength={3}
        maxlength={6}
        minVal={1000}
        maxVal={9999}
        valType={"N"}
      />
      <CustomField
        fieldId={"#9"}
        fieldCode={"REQ099"}
        fieldType={"TA"}
        fieldName={"Description"}
      />
      <CustomField
        fieldId={"#2"}
        fieldCode={"REQ02"}
        fieldType={"LOV"}
        fieldName={"Country"}
        listOfValue={"1;2;3;4"}
        fieldValue={"1"}
      />
      <CustomField
        fieldId={"#3"}
        fieldCode={"REQ03"}
        fieldType={"C"}
        fieldName={"Remember me"}
      />
      <CustomField
        fieldId={"#4"}
        fieldCode={"REQ04"}
        fieldType={"F"}
        fieldName={"Tài liệu đính kèm"}
      />
      <CustomField
        fieldId={"#2"}
        fieldCode={"REQ02"}
        fieldType={"RD"}
        fieldName={"VN;CN;TG;BN"}
        listOfValue={"1;2;3;4"}
        fieldValue={"1"}
      />
      <CustomField
        fieldId={"#5"}
        fieldCode={"REQ005"}
        fieldType={"D"}
        fieldName={"DueDate"}
      />
      <CustomField
        fieldId={"#2"}
        fieldCode={"REQ02"}
        fieldType={"CL"}
        fieldName={"VN;CN;TG;BN"}
        listOfValue={"1;2;3;4"}
        fieldValue={"1"}
      />
    </div>
  );
}

export default Following;
