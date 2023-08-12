import React, { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import MessageError from "../MessageError";
import * as Dialog from "@radix-ui/react-dialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import DropdownRoleType from "../../../components/Dashboard/TableRoles/DropDownRoleType";
import { roleTypes } from "../../../pages/AdminRole";

const TableItem = ({
  item,
  setCurrentRoles,
  currentIndex,
  onDeleteRole,
  onUpdateRole,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [roleName, setRoleName] = useState(item?.roleName);
  const [desc, setDesc] = useState(item?.description);
  const [roleType, setRoleType] = useState(roleTypes);
  const [open, setOpen] = useState(false);
  const axiosInstance = useAxiosPrivate();

  const deleteRole = () => {
    // Gọi API để xóa dữ liệu dưới cơ sở dữ liệu
    axiosInstance
      .delete(`api/Roles/delete/${item.roleId}`)
      .then((response) => {
        // Nếu xóa thành công, cập nhật lại state bằng cách loại bỏ phần tử đã xóa
        setCurrentRoles((prevListService) => {
          return prevListService.filter((e) => e.roleId !== item.roleId);
        });
        alert(response.data.message);
      })
      .catch((error) => {
        alert("Lỗi khi xóa:", error);
      });
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={roleName}
          onChange={(e) => {
            setRoleName(e.target.value);
          }}
          className={clsx(
            "px-3 py-1.5 rounded-lg bg-transparent border-2",
            isEdit ? "border-[#CCC9C9]" : "border-transparent"
          )}
          disabled={!isEdit}
          style={{ boxShadow: isEdit && "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        />
        {!roleName && <MessageError error={"Role name is required"} />}
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
      {isEdit ? (
        <td>
          <DropdownRoleType
            selected={roleType}
            setSelected={setRoleType}
            onChange={(e) => {
              setRoleType(e.target.value);
            }}
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
            value={roleType.id === 0 ? "Admin" : "Agent"}
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
                onUpdateRole(item.roleId, roleName, desc, roleType);
              }
            }}
          >
            {!isEdit ? "Edit" : "Save"}
          </button>
          <button
            className="text-[#3A7DFF] focus:outline-none border-0"
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete
          </button>
        </div>
        <button className="text-[#3A7DFF] focus:outline-none border-0">
          View Permission
        </button>
      </td>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[#D9D9D950]" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[638px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-none flex flex-col border-2 border-[#BFBFBF]">
            <div className="pt-10 px-10 pb-4">
              <h6 className="text-xl xl:text-3xl font-semibold">Delete Role</h6>

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
                  Are you sure to delete this Role?
                </p>
                <div className="flex space-x-5 justify-end w-full mt-3">
                  <button
                    className="text-lg xl:text-2xl w-[100px] py-1.5 bg-[#DE350B] text-white font-normal focus:outline-none border-0"
                    onClick={(e) => {
                      deleteRole();
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
      </Dialog.Root>
    </tr>
  );
};
export const roles = [
  { name: "Administrator", desc: "Description for IT Service Administrator" },
  { name: "Team Member", desc: "Description for IT Service Administrator" },
  { name: "Service Owner", desc: "Description for IT Service Administrator" },
  { name: "Customer", desc: "Description for IT Service Administrator" },
];
const TableRoles = ({ data, setCurrentRoles }) => {
  // const [open, setOpen] = useState(false);
  // const [selectedRole, setSelectedRole] = useState();
  const axiosInstance = useAxiosPrivate();

  const updateRole = (roleId, roleName, roleDescription, roleType) => {
    const updatedRole = {
      roleId: roleId,
      roleName: roleName,
      description: roleDescription,
      roleType: roleType.id,
    };

    axiosInstance
      .put(`/api/Roles/update`, updatedRole, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const newData = response.data;
        const updatedData = data.map((item) =>
          item.roleId === newData.roleId ? newData : item
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
          <th>Role Name</th>
          <th>Description</th>
          <th>Role Type</th>
          <th>&nbsp;</th>
        </tr>
        {data.map((item, index) => (
          <TableItem
            key={item.roleId}
            item={item}
            setCurrentRoles={setCurrentRoles}
            currentIndex={index}
            // setOpen={setOpen}
            onUpdateRole={updateRole}
          />
        ))}
      </table>
      {/*  */}
    </div>
  );
};

export default TableRoles;
