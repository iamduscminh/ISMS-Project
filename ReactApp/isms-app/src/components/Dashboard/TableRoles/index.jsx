import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import MessageError from "../MessageError";
import * as Dialog from "@radix-ui/react-dialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, Routes, Route } from "react-router-dom";
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

const TableItem = ({
  item,
  setCurrentRoles,
  currentIndex,
  onDeleteRole,
  onUpdateRole,
  data,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [roleName, setRoleName] = useState(item?.roleName);
  const [desc, setDesc] = useState(item?.description);
  const [open, setOpen] = useState(false);
  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    // setCurrentRoles();
  }, [axiosInstance]);
  const deleteRole = () => {
    axiosInstance
      .delete(`api/Roles/delete/${item.roleId}`)
      .then((response) => {
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
      <td className="px-3 py-1.5 rounded-lg bg-transparent font-poppins">
        {roleName}
      </td>
      <td className="px-3 py-1.5 rounded-lg bg-transparent font-poppins">
        {desc}
      </td>

      <td className="space-x-10 flex items-center">
        <div className="space-x-5 py-2">
          <Link to={`/admin/manage/role/edit/${item.roleId}`}>
            <button
              className="text-[#3A7DFF] w-14 focus:outline-none border-0"
              onClick={() => {
                setIsEdit((prev) => !prev);
                console.log(
                  "==========>setCurrentRoles onclick",
                  setCurrentRoles
                );
                <AdminRoleEdit setCurrentRoles={setCurrentRoles} />;
              }}
            >
              {!isEdit ? <IconEdit /> : "Save"}
            </button>
          </Link>
          {/* <Routes>
            <Route>
              <Route
                path="/admin/manage/role/edit/:id"
                element={<AdminRoleEdit setCurrentRoles={setCurrentRoles} />}
              />
            </Route>
          </Routes> */}

          <button
            className="text-[#3A7DFF] focus:outline-none border-0"
            onClick={() => {
              setOpen(true);
            }}
          >
            <IconDelete />
          </button>
        </div>
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
const TableRoles = ({ data, setCurrentRoles }) => {
  // const [open, setOpen] = useState(false);
  // const [selectedRole, setSelectedRole] = useState();
  const [dataTable, setDataTable] = useState([]);
  const handleSetData = () => {
    setDataTable(data);
  };

  return (
    <div className="mt-10 max-h-[70vh] overflow-y-scroll bg-[#E5F3F3] border border-black px-8 xl:px-[54px]">
      <table className={clsx(styles.table, "w-full mt-8 xl:mt-16")}>
        <tr>
          <th>Role Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        {data.map((item, index) => (
          <TableItem
            key={item.roleId}
            item={item}
            setDataTable={handleSetData}
            setCurrentRoles={setCurrentRoles}
            currentIndex={index}
          />
        ))}
      </table>
      {/*  */}
    </div>
  );
};

export default TableRoles;
