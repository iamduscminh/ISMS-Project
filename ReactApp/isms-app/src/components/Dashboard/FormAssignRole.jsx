import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DropdownRole from "./TableUsers/DropdownRole";
import { roles } from "./TableRoles";
import { data } from "autoprefixer";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const FormAssignRole = ({ open, setOpen, roleData, selectedUser }) => {
  const [role, setRole] = useState(roleData);
  const axiosInstance = useAxiosPrivate();

  console.log("==============>selectedUser", selectedUser);
  const handleAssign = (e) => {
    const dataAssign = {
      userId: selectedUser.userId,
      roleId: role.roleId,
    };
    const controller = new AbortController();

    const assignRole = async () => {
      try {
        const response = await axiosInstance.post(
          "api/Users/assignrole",
          JSON.stringify(dataAssign),
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const createdUser = response.data;
          //setCurrentUsers((prev) => [...prev, createdUser]);
          // Clear Input
          setOpen(false);
        } else {
          throw response;
        }
      } catch (err) {
        if (err.status === 403) {
          alert("You are not allowed to add User");
        } else {
          alert(err.message);
        }
      }
    };
    assignRole();
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#D9D9D950]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[601px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-none flex flex-col border-2 border-[#BFBFBF]">
          <div className="py-6 px-10">
            <h6 className="text-xl xl:text-3xl font-semibold uppercase text-center">
              Assign role
            </h6>

            <div className="mt-10 space-y-8">
              <div className="flex flex-col space-y-2">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
                  Work Email
                </label>
                <input
                  type="text"
                  value={selectedUser.email}
                  className="w-full rounded-lg py-2.5 px-5 bg-[#F1F1F1] focus:outline-none text-black flex-1"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
                  Role
                </label>
                <DropdownRole
                  selected={role}
                  setSelected={setRole}
                  setCurrentRoles={roleData}
                  className="border-0 rounded-lg text-sm xl:text-lg py-0.5 flex-1"
                  style={{ backgroundColor: "#F1F1F1" }}
                />
              </div>
              <div className="flex space-x-5 justify-end w-full mt-6 xl:mt-10">
                <button
                  className="text-sm xl:text-lg w-[150px] py-2 bg-[#4AA976] text-white focus:outline-none border-0 font-semibold"
                  onClick={handleAssign}
                >
                  Assign
                </button>
                <button
                  className="text-sm xl:text-lg w-[115px] py-1.5 text-black border border-black focus:outline-none font-semibold"
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
  );
};

export default FormAssignRole;