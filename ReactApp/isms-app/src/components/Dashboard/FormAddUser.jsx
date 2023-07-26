import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import DropdownRole from "./TableUsers/DropdownRole";
import { roles } from "./TableRoles";

const FormAddUser = ({ open, setOpen }) => {
  const [role, setRole] = useState(roles[0]);

  const handleAdd = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#D9D9D950]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[601px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-none flex flex-col border-2 border-[#BFBFBF]">
          <div className="py-6 px-10">
            <h6 className="text-xl xl:text-3xl font-semibold">Add new user</h6>

            <div className="space-x-5 xl:space-x-8 mt-3">
              <div>
                <label className="text-[#647186] text-base font-semibold xl:text-lg">
                  Work Email
                </label>
                <input className="mt-3 w-full rounded-lg py-1.5 px-5 bg-[#F1F1F1] focus:outline-none text-black" />
              </div>
            </div>
            <div className="space-x-5 xl:space-x-8 mt-3">
              <div>
                <label className="text-[#647186] text-base font-semibold xl:text-lg">
                  Role
                </label>
                <DropdownRole
                  selected={role}
                  setSelected={setRole}
                  className="border-0 rounded-lg bg-[#F1F1F1] text-sm xl:text-lg py-0.5"
                />
              </div>
            </div>
            <div className="flex space-x-5 justify-end w-full mt-6 xl:mt-10">
              <button
                className="text-sm xl:text-lg w-[115px] py-1.5 bg-[#043AC5] text-white focus:outline-none border-0 font-semibold"
                onClick={handleAdd}
              >
                Add
              </button>
              <button
                className="text-sm xl:text-lg w-[115px] py-1.5 text-black bg-[#D9D9D9] focus:outline-none border-0 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FormAddUser;
