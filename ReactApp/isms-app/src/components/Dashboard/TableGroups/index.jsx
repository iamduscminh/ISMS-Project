import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import MessageError from "../MessageError";
import * as Dialog from "@radix-ui/react-dialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import DropdownBusinessHour from "../../../components/Dashboard/TableGroups/DropDownBusinessHour";
import DropdownGroupLeader from "../../../components/Dashboard/TableGroups/DropDownGroupLeader";

const TableItem = ({
  item,
  setCurrentRoles,
  currentIndex,
  setOpen,
  onUpdateGroup,
  listLeader,
  listBusiness,
  data,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const axiosInstance = useAxiosPrivate();
  const [groupName, setGroupName] = useState(item?.groupName);
  const [desc, setDesc] = useState(item?.description);
  // const [businessHourName, setBusinessHourName] = useState(
  //   item?.businessHourEntity.businessHourName
  // );
  const [listBusinessHour, setListBusinessHour] = useState(listBusiness);
  const [groupLeader, setGroupLeader] = useState(item?.userEntity.fullName);
  //const [groupLeader, setGroupLeader] = useState("");
  const [listGroupLeader, setlistGroupLeader] = useState(listLeader);

  // useEffect(() => {
  //   const getListBusinessHour = async () => {
  //     try {
  //       const response = await axiosInstance.get(`api/BusinessHours/getall`);
  //       setListBusinessHour(response.data);
  //     } catch (error) {
  //       console.error("Error getListBusinessHour [TableGroups]:", error);
  //     }
  //   };
  //   const getListGroupLeaderName = async () => {
  //     try {
  //       const response = await axiosInstance.get(`/api/Users/getall`);
  //       setlistGroupLeader(response.data);
  //     } catch (error) {
  //       console.error("Error getListGroupLeaderName [TableGroups]:", error);
  //     }
  //   };
  //   getListGroupLeaderName();
  //   getListBusinessHour();
  // }, [axiosInstance]);
  const [businessHourSelected, setBusinessHourSelected] =
    useState(listBusiness);
  const [groupLeaderSelected, setGroupLeaderSelected] = useState(listLeader);
  // const deleteGroup = () => {
  //   // Gọi API để xóa dữ liệu dưới cơ sở dữ liệu
  //   axiosInstance
  //     .delete(`api/Roles/delete/${item.roleId}`)
  //     .then((response) => {
  //       // Nếu xóa thành công, cập nhật lại state bằng cách loại bỏ phần tử đã xóa
  //       setCurrentRoles((prevListService) => {
  //         return prevListService.filter((e) => e.roleId !== item.roleId);
  //       });
  //       alert(response.data.message);
  //     })
  //     .catch((error) => {
  //       alert("Lỗi khi xóa:", error);
  //     });
  // };
  return (
    <tr>
      <td>
        <input
          type="text"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          className={clsx(
            "px-3 py-1.5 rounded-lg bg-transparent border-2",
            isEdit ? "border-[#CCC9C9]" : "border-transparent"
          )}
          disabled={!isEdit}
          style={{ boxShadow: isEdit && "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        />
        {!groupName && <MessageError error={"Group name is required"} />}
      </td>
      <td>
        <input
          type="text"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          disabled={!isEdit}
          className={clsx(
            "px-3 py-1.5 rounded-lg bg-transparent border-2",
            isEdit ? "border-[#CCC9C9]" : "border-transparent"
          )}
          style={{ boxShadow: isEdit && "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        />
        {!desc && <MessageError error={"Description is required"} />}
      </td>
      {/* {isEdit ? (
        <td>
          <DropdownBusinessHour
            selected={businessHourSelected}
            setSelected={setBusinessHourSelected}
            onChange={(e) => {
              setBusinessHourSelected(e.target.value);
            }}
            listBusinessHour={listBusiness}
            className={clsx(
              "px-3 py-1.5 rounded-lg bg-transparent border-2",
              isEdit ? "border-[#CCC9C9]" : "border-transparent"
            )}
            style={{
              boxShadow: isEdit && "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          />
        </td>
      ) : (
        <td>
          <input
            type="text"
            value={businessHourName}
            onChange={(e) => {
              setBusinessHourName(e.target.value);
            }}
          />
        </td>
      )} */}
      {isEdit ? (
        <td>
          <DropdownGroupLeader
            selected={groupLeaderSelected}
            setSelected={setGroupLeaderSelected}
            onChange={(e) => {
              setBusinessHourSelected(e.target.value);
            }}
            listGroupLeader={listLeader}
            className={clsx(
              "px-3 py-1.5 rounded-lg bg-transparent border-2",
              isEdit ? "border-[#CCC9C9]" : "border-transparent"
            )}
            style={{
              boxShadow: isEdit && "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
            data={data}
            index={currentIndex}
          />
        </td>
      ) : (
        <td>
          <input
            type="text"
            value={groupLeader}
            onChange={(e) => {
              setGroupLeader(e.target.value);
            }}
            disabled={!isEdit}
          />
        </td>
      )}

      <td className="space-x-10 flex">
        <div className="space-x-5 py-2">
          <button
            className="text-[#3A7DFF] w-14 focus:outline-none border-0"
            onClick={() => {
              setIsEdit((prev) => !prev);
              if (isEdit) {
                onUpdateGroup(
                  item.groupId,
                  groupName,
                  desc,
                  groupLeaderSelected.userId
                );
                setGroupLeader(groupLeaderSelected.fullName);
                // setGroupLeaderSelected(data[currentIndex].userEntity);
                // item.userEntity.forEach()
              }
            }}
          >
            {!isEdit ? "Edit" : "Save"}
          </button>
          {/* <button
            className="text-[#3A7DFF] focus:outline-none border-0"
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete
          </button> */}
        </div>
        <button className="text-[#3A7DFF] focus:outline-none border-0">
          Add group
        </button>
      </td>
      {/* <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[#D9D9D950]" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[638px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-none flex flex-col border-2 border-[#BFBFBF]">
            <div className="pt-10 px-10 pb-4">
              <h6 className="text-xl xl:text-3xl font-semibold">
                Delete Group
              </h6>

              <div className="flex flex-col items-center mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <path
                    d="M3.33301 69.9998L39.9997 6.6665L76.6663 69.9998H3.33301ZM11.9997 64.9998H67.9997L39.9997 16.6665L11.9997 64.9998ZM40.3476 60.2498C41.0601 60.2498 41.6525 60.0089 42.1247 59.5269C42.5969 59.0449 42.833 58.4477 42.833 57.7353C42.833 57.0228 42.592 56.4304 42.1101 55.9582C41.6281 55.486 41.0309 55.2498 40.3184 55.2498C39.6059 55.2498 39.0136 55.4908 38.5413 55.9728C38.0691 56.4548 37.833 57.052 37.833 57.7644C37.833 58.4769 38.074 59.0693 38.5559 59.5415C39.0379 60.0137 39.6351 60.2498 40.3476 60.2498ZM37.833 50.9998H42.833V32.3332H37.833V50.9998Z"
                    fill="#DE350B"
                  />
                </svg>
                <p className="mt-2 text-lg xl:text-2xl">
                  Are you sure to delete this Group?
                </p>
                <div className="flex space-x-5 justify-end w-full mt-3">
                  <button
                    className="text-lg xl:text-2xl w-[100px] py-1.5 bg-[#DE350B] text-white font-normal focus:outline-none border-0"
                    onClick={(e) => {
                      deleteGroup();
                      e.preventDefault();
                      setOpen(false);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="text-lg xl:text-2xl w-[100px] py-1.5 text-black font-normal focus:outline-none border-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root> */}
    </tr>
  );
};

const TableGroups = ({ data, setCurrentRoles, listLeader, listBusiness }) => {
  const [open, setOpen] = useState(false);
  // const [selectedRole, setSelectedRole] = useState();
  const axiosInstance = useAxiosPrivate();

  const handleDelete = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const updateGroup = (groupId, groupName, groupDescription, groupLeader) => {
    const updatedGroup = {
      groupName: groupName,
      description: groupDescription,
      groupLeader: groupLeader,
    };

    axiosInstance
      .put(`/api/Groups/update?groupId=${groupId}`, updatedGroup, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const newData = response.data;
        const updatedData = data.map((item) =>
          item.groupId === newData.groupId ? newData : item
        );

        setCurrentRoles(updatedData);
      })
      .catch((error) => {
        alert("Có lỗi khi cập nhật: ", error);
      });
  };

  return (
    <div className="overflow-auto">
      <table className={clsx(styles.table, "w-full text-left mt-8 xl:mt-16")}>
        <tr>
          <th>Group Name</th>
          <th>Description</th>
          <th>Group Leader</th>
          <th>&nbsp;</th>
        </tr>
        {data.map((item, index) => (
          <TableItem
            key={index}
            item={item}
            setCurrentRoles={setCurrentRoles}
            currentIndex={index}
            setOpen={setOpen}
            onUpdateGroup={updateGroup}
            listLeader={listLeader}
            listBusiness={listBusiness}
            data={data}
          />
        ))}
      </table>
    </div>
  );
};

export default TableGroups;
