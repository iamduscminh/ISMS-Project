import React, { useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import MessageError from "../MessageError";
import * as Dialog from "@radix-ui/react-dialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import DropdownRoleType from "../../../components/Dashboard/TableRoles/DropDownRoleType";
import { roleTypes } from "../../../pages/AdminRole";
import { ROUTES_PATHS } from "../../../../constants";
import { Link, useParams, Routes, Route } from "react-router-dom";
import AdminRoleEdit from "../../../pages/AdminRoleEdit";
const IconEdit = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <path
      d="M8.33366 26.6668L6.66699 33.3335L13.3337 31.6668L32.6437 12.3568C33.2686 11.7317 33.6196 10.884 33.6196 10.0001C33.6196 9.11627 33.2686 8.26857 32.6437 7.64348L32.357 7.35681C31.7319 6.73191 30.8842 6.38086 30.0003 6.38086C29.1164 6.38086 28.2688 6.73191 27.6437 7.35681L8.33366 26.6668Z"
      stroke="#568CF4"
      strokeWidth="0.833333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.33366 26.6667L6.66699 33.3333L13.3337 31.6667L30.0003 15L25.0003 10L8.33366 26.6667Z"
      fill="#568CF4"
    />
    <path
      d="M25.0003 10L30.0003 15M21.667 33.3333H35.0003"
      stroke="#568CF4"
      strokeWidth="0.833333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconDelete = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <path
      d="M11.667 35C10.7503 35 9.96533 34.6733 9.31199 34.02C8.65866 33.3667 8.33255 32.5822 8.33366 31.6667V10H6.66699V6.66667H15.0003V5H25.0003V6.66667H33.3337V10H31.667V31.6667C31.667 32.5833 31.3403 33.3683 30.687 34.0217C30.0337 34.675 29.2492 35.0011 28.3337 35H11.667ZM15.0003 28.3333H18.3337V13.3333H15.0003V28.3333ZM21.667 28.3333H25.0003V13.3333H21.667V28.3333Z"
      fill="#FB4242"
    />
  </svg>
);

const IconPassword = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <path
      d="M40 30.7227V40H30V35H25V30H20V25.957C19.0365 26.4648 18.0273 26.849 16.9727 27.1094C15.918 27.3698 14.8438 27.5 13.75 27.5C12.487 27.5 11.2695 27.3372 10.0977 27.0117C8.92578 26.6862 7.83203 26.224 6.81641 25.625C5.80078 25.026 4.8763 24.3099 4.04297 23.4766C3.20964 22.6432 2.48698 21.7122 1.875 20.6836C1.26302 19.6549 0.800781 18.5612 0.488281 17.4023C0.175781 16.2435 0.0130208 15.026 0 13.75C0 12.487 0.16276 11.2695 0.488281 10.0977C0.813802 8.92578 1.27604 7.83203 1.875 6.81641C2.47396 5.80078 3.1901 4.8763 4.02344 4.04297C4.85677 3.20964 5.78776 2.48698 6.81641 1.875C7.84505 1.26302 8.9388 0.800781 10.0977 0.488281C11.2565 0.175781 12.474 0.0130208 13.75 0C15.013 0 16.2305 0.16276 17.4023 0.488281C18.5742 0.813802 19.668 1.27604 20.6836 1.875C21.6992 2.47396 22.6237 3.1901 23.457 4.02344C24.2904 4.85677 25.013 5.78776 25.625 6.81641C26.237 7.84505 26.6992 8.9388 27.0117 10.0977C27.3242 11.2565 27.487 12.474 27.5 13.75C27.5 14.4141 27.4479 15.0716 27.3438 15.7227C27.2396 16.3737 27.0898 17.0117 26.8945 17.6367L40 30.7227ZM10 13.75C10.5208 13.75 11.0091 13.6523 11.4648 13.457C11.9206 13.2617 12.3177 12.9948 12.6562 12.6562C12.9948 12.3177 13.2617 11.9206 13.457 11.4648C13.6523 11.0091 13.75 10.5208 13.75 10C13.75 9.47917 13.6523 8.99089 13.457 8.53516C13.2617 8.07943 12.9948 7.68229 12.6562 7.34375C12.3177 7.00521 11.9206 6.73828 11.4648 6.54297C11.0091 6.34766 10.5208 6.25 10 6.25C9.47917 6.25 8.99089 6.34766 8.53516 6.54297C8.07943 6.73828 7.68229 7.00521 7.34375 7.34375C7.00521 7.68229 6.73828 8.07943 6.54297 8.53516C6.34766 8.99089 6.25 9.47917 6.25 10C6.25 10.5208 6.34766 11.0091 6.54297 11.4648C6.73828 11.9206 7.00521 12.3177 7.34375 12.6562C7.68229 12.9948 8.07943 13.2617 8.53516 13.457C8.99089 13.6523 9.47917 13.75 10 13.75Z"
      fill="#117014"
    />
  </svg>
);

const IconView = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="41"
    viewBox="0 0 40 41"
    fill="none"
  >
    <path
      d="M38.6754 19.5848C37.2052 15.7818 34.6529 12.493 31.3339 10.1249C28.015 7.75671 24.0748 6.41298 20.0004 6.25977C15.9261 6.41298 11.9859 7.75671 8.66695 10.1249C5.34796 12.493 2.79565 15.7818 1.32544 19.5848C1.22615 19.8594 1.22615 20.1601 1.32544 20.4348C2.79565 24.2377 5.34796 27.5265 8.66695 29.8947C11.9859 32.2628 15.9261 33.6066 20.0004 33.7598C24.0748 33.6066 28.015 32.2628 31.3339 29.8947C34.6529 27.5265 37.2052 24.2377 38.6754 20.4348C38.7747 20.1601 38.7747 19.8594 38.6754 19.5848ZM20.0004 31.2598C13.3754 31.2598 6.37544 26.3473 3.83794 20.0098C6.37544 13.6723 13.3754 8.75977 20.0004 8.75977C26.6254 8.75977 33.6254 13.6723 36.1629 20.0098C33.6254 26.3473 26.6254 31.2598 20.0004 31.2598Z"
      fill="#186540"
    />
    <path
      d="M20 12.5098C18.5166 12.5098 17.0666 12.9496 15.8332 13.7737C14.5999 14.5979 13.6386 15.7692 13.0709 17.1396C12.5032 18.5101 12.3547 20.0181 12.6441 21.4729C12.9335 22.9278 13.6478 24.2642 14.6967 25.3131C15.7456 26.362 17.082 27.0763 18.5368 27.3657C19.9917 27.655 21.4997 27.5065 22.8701 26.9389C24.2406 26.3712 25.4119 25.4099 26.236 24.1765C27.0601 22.9432 27.5 21.4931 27.5 20.0098C27.5 18.0206 26.7098 16.113 25.3033 14.7065C23.8968 13.2999 21.9891 12.5098 20 12.5098ZM20 25.0098C19.0111 25.0098 18.0444 24.7165 17.2222 24.1671C16.3999 23.6177 15.759 22.8368 15.3806 21.9232C15.0022 21.0096 14.9032 20.0042 15.0961 19.0343C15.289 18.0644 15.7652 17.1735 16.4645 16.4742C17.1637 15.775 18.0546 15.2988 19.0246 15.1058C19.9945 14.9129 20.9998 15.0119 21.9134 15.3904C22.8271 15.7688 23.6079 16.4097 24.1574 17.2319C24.7068 18.0542 25 19.0209 25 20.0098C25 21.3358 24.4732 22.6076 23.5355 23.5453C22.5979 24.483 21.3261 25.0098 20 25.0098Z"
      fill="#186540"
    />
  </svg>
);
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
      {isEdit ? (
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
            style={{
              boxShadow: isEdit && "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          />
          {!roleName && <MessageError error={"Role name is required"} />}
        </td>
      ) : (
        <td>
          <p className={clsx("px-3 py-1.5 rounded-lg bg-transparent")}>
            {roleName}
          </p>
          {!roleName && <MessageError error={"Role name is required"} />}
        </td>
      )}
      {isEdit ? (
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
            style={{
              boxShadow: isEdit && "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          />
          {!desc && <MessageError error={"Description is required"} />}
        </td>
      ) : (
        <td>
          <p className={clsx("px-3 py-1.5 rounded-lg bg-transparent")}>
            {desc}
          </p>
          {!desc && <MessageError error={"Description is required"} />}
        </td>
      )}

      <td className="space-x-10 flex items-center">
        <IconPassword />
        <div className="space-x-5 py-2">
          {/* <Link to={ROUTES_PATHS.ADMIN_ROLE_EDIT + `${item.roleId}`}>
            <button
              className="text-[#3A7DFF] w-14 focus:outline-none border-0"
              onClick={() => {
                setIsEdit((prev) => !prev);
              }}
            >
              {!isEdit ? <IconEdit /> : "Save"}
            </button>
          </Link> */}
          <Link to={`/admin/manage/role/edit/${item.roleId}`}>
            <button
              className="text-[#3A7DFF] w-14 focus:outline-none border-0"
              onClick={() => {
                setIsEdit((prev) => !prev);
              }}
            >
              {!isEdit ? <IconEdit /> : "Save"}
            </button>
          </Link>
          <Routes>
            <Route>
              <Route
                path="/admin/manage/role/edit/:id"
                element={<AdminRoleEdit />}
              />
            </Route>
          </Routes>
          <button
            className="text-[#3A7DFF] focus:outline-none border-0"
            onClick={() => {
              setOpen(true);
            }}
          >
            <IconDelete />
          </button>
        </div>
        {/* <button className="text-[#3A7DFF] focus:outline-none border-0">
          <IconView />
        </button> */}
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
    <div className="mt-10 overflow-auto bg-[#E5F3F3] border border-black px-8 xl:px-[54px]">
      <table className={clsx(styles.table, "w-full text-left mt-8 xl:mt-16")}>
        <tr>
          <th>Role Name</th>
          <th>Description</th>
          <th>Action</th>
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
