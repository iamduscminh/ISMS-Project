import React from "react";
import { useForm } from "react-hook-form";
import CustomField from "../../components/Elements/CustomField";
export default function App() {
  return (
    <>
      <div className="mt-8 mx-auto w-[50%]">
        <CustomField
          fieldName={"User Name"}
          fieldType="T"
          valType="T"
          mandatory={1}
          minVal={0}
          maxVal={9}
          minlength={5}
          maxlength={10}
        />
        <CustomField
          fieldName={"Country"}
          fieldType="LOV"
          valType="T"
          mandatory={0}
          listOfValue={"VN;QR;HT"}
          listOfValueDisplay={"VietNam;ThaiLand;Indo"}
        />
        <CustomField
          fieldName={"Country"}
          fieldType="CB"
          valType="T"
          mandatory={0}
          listOfValue={"VN;QR;HT"}
          listOfValueDisplay={"VietNam;ThaiLand;Indo"}
        />
      </div>
    </>
  );
}
