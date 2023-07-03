import React from "react";
import RequestComment from "../../components/Elements/RequestComment";
import CustomField from "../../components/Elements/CustomField";
import ModalDialog from "../../components/Elements/PopupModal";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
function Following() {
  return (
    <div className="w-[50%] m-6">
      <ModalDialog />
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
        mandatory={1}
        minlength={3}
        maxlength={6}
        minVal={1000}
        maxVal={9999}
      />
      {/* <CustomField
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
        mandatory={1}
        minlength={3}
        maxlength={6}
        minVal={1000}
        maxVal={9999}
      />
      <CustomField
        fieldId={"#2"}
        fieldCode={"REQ02"}
        fieldType={"LOV"}
        fieldName={"Checklist"}
        listOfValue={"1;2;3;4"}
        listOfValueDisplay={"VN;CN;TG;BN"}
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
        fieldName={"Country"}
        listOfValueDisplay={"VN;CN;TG;BN"}
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
        fieldName={"Country"}
        listOfValue={"1;2;3;4"}
        listOfValueDisplay={"VN;CN;TG;BN"}
        fieldValue={"1"}
      /> */}
    </div>
  );
}

export default Following;
