import React, { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { roleTypes } from "../../pages/AdminRole";
import DropdownRoleType from "./TableRoles/DropDownRoleType";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MessageError from "../../components/Dashboard/MessageError";
import TableRoles from "../../components/Dashboard/TableRoles";

const FormAddRole = ({ open, setOpen, data }) => {
  const [role, setRole] = useState(roleTypes[0]);
  const axiosInstance = useAxiosPrivate();
  const [currentRoles, setCurrentRoles] = useState(data);
  const [newRole, setNewRole] = useState(" ");
  const [desc, setDesc] = useState(" ");

  const handleAdd = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const roleNameRef = useRef(null);
  const roleDesRef = useRef(null);

  const handleInsertRole = (e) => {
    const roleName = roleNameRef.current.value;
    const roleDes = roleDesRef.current.value;

    const newRoleGroup = {
      RoleName: roleName,
      Description: roleDes,
      RoleType: role.id,
    };
    const controller = new AbortController();

    const createRole = async () => {
      try {
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
          const createdRoleGroup = response.data;
          setCurrentRoles((prev) => [...prev, createdRoleGroup]);
          // Clear Input
          setDesc(" ");
          setNewRole(" ");
          setOpen(false);
        } else {
          throw response;
        }
      } catch (err) {
        if (err.status === 403) {
          alert("You are not allowed to add Role");
        } else {
          alert(err.message);
        }
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
                {!newRole && <MessageError error={"Role name is required"} />}
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
                {!desc && <MessageError error={"Decription is required"} />}
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