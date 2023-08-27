import React, { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { roleTypes } from "../../pages/AdminRole";
import DropdownRoleType from "./TableRoles/DropDownRoleType";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MessageError from "../../components/Dashboard/MessageError";
import TableRoles from "../../components/Dashboard/TableRoles";
import Swal from "sweetalert2";

const FormAddRole = ({ open, setOpen, data, setCurrentRoles, getAllRoles }) => {
  const [role, setRole] = useState(roleTypes[0]);
  const axiosInstance = useAxiosPrivate();
  const [newRole, setNewRole] = useState(" ");
  const [desc, setDesc] = useState(" ");

  const roleNameRef = useRef(null);
  const roleDesRef = useRef(null);

  const handleInsertRole = (e) => {
    const newRoleGroup = {
      roleName: newRole,
      description: desc,
      roleType: role.id,
    };
    const controller = new AbortController();

    const createRole = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        const response = await axiosInstance.post(
          "api/Roles/create",
          JSON.stringify(newRoleGroup),
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const createdRoleGroup = newRoleGroup;
          // setCurrentRoles((prev) => [...prev, createdRoleGroup]);
          getAllRoles();
          // Clear Input
          setDesc(" ");
          setNewRole(" ");
          setOpen(false);
          Swal.fire({
            icon: "success",
            text: `Create successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          throw response;
        }
        Swal.close();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err}`,
          showCancelButton: true,
          cancelButtonText: "Cancel",
        });
      }
    };
    createRole();
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#D9D9D950]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[601px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-none flex flex-col border-2 border-[#BFBFBF]">
          <div className="py-6 px-10">
            <h6 className="text-xl xl:text-3xl font-semibold uppercase text-center">
              New system role
            </h6>

            <div className="mt-10 space-y-8">
              <div className="flex items-center">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
                  Role Name
                </label>
                <input
                  className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black flex-1"
                  style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                  onChange={(e) => {
                    setNewRole(e.target.value);
                  }}
                  ref={roleNameRef}
                />
                {!newRole && (
                  <MessageError type="small" error={"Role name is required"} />
                )}
              </div>
              <div className="flex items-center">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
                  Description
                </label>
                <textarea
                  className="min-h-[105px] w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black flex-1"
                  style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                  ref={roleDesRef}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
                {!desc && (
                  <MessageError type="small" error={"Decription is required"} />
                )}
              </div>
              <div className="flex items-center">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
                  Role Type
                </label>
                <DropdownRoleType
                  selected={role}
                  setSelected={setRole}
                  className="border-[#CCC9C9] border-2 rounded-lg text-sm xl:text-lg py-0.5 flex-1"
                  style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                />
              </div>
              <div className="flex space-x-5 justify-center w-full mt-6 xl:mt-10">
                <button
                  className="text-sm xl:text-lg w-[150px] py-2 bg-[#4AA976] text-white focus:outline-none border-0 font-semibold"
                  onClick={handleInsertRole}
                >
                  Add role
                </button>
                {/* <button
                  className="text-sm xl:text-lg w-[115px] py-1.5 text-black bg-[#D9D9D9] focus:outline-none border-0 font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                  }}
                >
                  Cancel
                </button> */}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FormAddRole;
