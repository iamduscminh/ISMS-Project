import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GeneralInfo from "./GeneralInfo";
import TextInfo from "./TextInfo";
import DiagramInfo from "./DiagramInfo";

const ViewWorkflow = () => {
  const { mode, flowId } = useParams();
  const [activeTextDiagram, setActiveTextDiagram] = useState(true);

  const handleClickText = () => {
    if (activeTextDiagram) return;
    setActiveTextDiagram(true);
  };

  const handleClickDiagram = () => {
    if (!activeTextDiagram) return;
    setActiveTextDiagram(false);
  };
  let listInitialActivity=[];
  if(mode==="edit"){
      listInitialActivity =[
      {
        id: 1,
        activityName: "Requirement accepted and evaluated",
        linkStatus: 1,
        role: 1,
        description:
          "Define the scope of the request and request detailed information from the customer",
        listStatusTrans: [
          {
            id: 1,
            statusTran: "Done",
            checkCondition: true,
            destination: 2,
          },
        ],
      },
      {
        id: 2,
        activityName: "Planning and implementing:",
        linkStatus: 3,
        role: 3,
        description:
          "Based on the requirements and information collected, plan the deployment for the server infrastructure management service.",
        listStatusTrans: [],
      },
    ];
  }else{
    listInitialActivity = [
      {
        id: 1,
        activityName: "Default activity",
        linkStatus: 1,
        role: 1,
        description:
          "",
        listStatusTrans: [],
      }
    ]
  }

  const [listActivity, setListActivity] = useState(listInitialActivity);
  
  const addNewActivity = (name, status, role) => {
    setListActivity([
      ...listActivity,
      {
        id: listActivity.length + 1,
        activityName: name,
        linkStatus: parseInt(status),
        role: parseInt(role),
        listStatusTrans: [],
      },
    ]);
  };

  const deleteActivity = (id) => {
    setListActivity(listActivity.filter((item) => item.id !== id));
  };

  const EditActivity = (
    id,
    activityNameInput,
    statusInput,
    roleInput,
    activityDes
  ) => {
    const statusValue = parseInt(statusInput);
    const roleValue = parseInt(roleInput);
    // Tạo một bản sao của mảng activities để không thay đổi trực tiếp state
    const updatedActivities = [...listActivity];

    // Tìm index của activity có id tương ứng trong mảng activities
    const index = updatedActivities.findIndex((activity) => activity.id === id);

    // Kiểm tra nếu không tìm thấy activity với id tương ứng, thì kết thúc hàm
    if (index === -1) {
      alert("Không tìm thấy activity với id tương ứng.");
      return;
    }

    // Cập nhật thông tin của activity trong mảng updatedActivities
    updatedActivities[index] = {
      ...updatedActivities[index],
      activityName: activityNameInput,
      linkStatus: statusValue,
      role: roleValue,
      description: activityDes,
    };
    // Cập nhật lại state activities bằng hàm setActivities
    setListActivity(updatedActivities);
  };

  const addStatusTransition = (
    id,
    statusTranInput,
    destinationInput,
    checkCondition
  ) => {
    // Tạo một bản sao của mảng listActivity để không thay đổi trực tiếp state
    const updatedListActivity = [...listActivity];

    // Tìm index của activity có id tương ứng trong mảng listActivity
    const index = updatedListActivity.findIndex(
      (activity) => activity.id === id
    );

    // Kiểm tra nếu không tìm thấy activity với id tương ứng, thì kết thúc hàm
    if (index === -1) {
      alert("Không tìm thấy activity với id tương ứng.");
      return;
    }

    // Tạo một đối tượng mới để thêm vào listStatusTrans của activity tìm thấy
    const newStatusTrans = {
      id: updatedListActivity[index].listStatusTrans.length + 1,
      statusTran: statusTranInput,
      checkCondition: checkCondition,
      destination: parseInt(destinationInput),
    };
    console.log(newStatusTrans);
    // Thêm đối tượng mới vào listStatusTrans của activity tìm thấy
    updatedListActivity[index].listStatusTrans.push(newStatusTrans);

    // Cập nhật lại state listActivity bằng hàm setListActivity
    setListActivity(updatedListActivity);
  };

  const deleteStatusTrans = (activityID, statusTranID, array) => {
    // Tạo một bản sao của mảng hoạt động ban đầu
    const newArray = [...listActivity];

    // Tìm hoạt động có activityID cụ thể trong mảng
    const activity = newArray.find(item => item.id === activityID);

    if (activity) {
      // Tìm chỉ mục của statusTran có statusTranID cụ thể trong listStatusTrans của hoạt động
      const statusTransIndex = activity.listStatusTrans.findIndex(item => item.id === statusTranID);

      if (statusTransIndex !== -1) {
        // Xóa statusTran khỏi listStatusTrans nếu tìm thấy
        activity.listStatusTrans.splice(statusTransIndex, 1);
      }
    }
    // Cập nhật trạng thái mới với mảng đã được chỉnh sửa
    setListActivity(newArray);
  }
  return (
    <div className="h-full overflow-y-scroll">
      <GeneralInfo />
      <div className="ml-[3rem] mt-[2rem]">
        <div>
          {activeTextDiagram ? (
            <button
              onClick={handleClickText}
              className="px-[1rem] bg-[#42526E] text-[#fff] font-medium hover:border-[#fff] mr-[0.1rem]"
            >
              Text
            </button>
          ) : (
            <button
              onClick={handleClickText}
              className="px-[1rem] bg-[#fff] text-[#42526E] font-medium hover:border-[#fff] mr-[0.1rem]"
            >
              Text
            </button>
          )}
          {!activeTextDiagram ? (
            <button
              onClick={handleClickDiagram}
              className="px-[1rem] bg-[#42526E] text-[#fff] font-medium hover:border-[#fff]"
            >
              Diagram
            </button>
          ) : (
            <button
              onClick={handleClickDiagram}
              className="px-[1rem] bg-[#fff] text-[#42526E] font-medium hover:border-[#fff]"
            >
              Diagram
            </button>
          )}
        </div>
        {activeTextDiagram ? (
          <TextInfo
            listActivity={listActivity}
            handleAddNewActivity={addNewActivity}
            handleDeleteActivity={deleteActivity}
            handleEditActivity={EditActivity}
            handleAddStatusTransition={addStatusTransition}
            handleDeleteStatusTransition={deleteStatusTrans}
          />
        ) : (
          <DiagramInfo data={listActivity} />
        )}
      </div>
    </div>
  );
};

export default ViewWorkflow;

