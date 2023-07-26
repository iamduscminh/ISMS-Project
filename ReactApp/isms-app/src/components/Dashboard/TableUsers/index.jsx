import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import DropdownRole from "./DropdownRole";

const TableItem = ({ item, setCurrentRoles, currentIndex, setOpen }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState(item?.name);
  const [email, setEmail] = useState(item?.email);
  const [role, setRole] = useState(item?.role);

  return (
    <tr>
      <td>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M24 23.9502C21.8 23.9502 20 23.2502 18.6 21.8502C17.2 20.4502 16.5 18.6502 16.5 16.4502C16.5 14.2502 17.2 12.4502 18.6 11.0502C20 9.6502 21.8 8.9502 24 8.9502C26.2 8.9502 28 9.6502 29.4 11.0502C30.8 12.4502 31.5 14.2502 31.5 16.4502C31.5 18.6502 30.8 20.4502 29.4 21.8502C28 23.2502 26.2 23.9502 24 23.9502ZM8 40.0002V35.3002C8 34.0335 8.31667 32.9502 8.95 32.0502C9.58333 31.1502 10.4 30.4669 11.4 30.0002C13.6333 29.0002 15.775 28.2502 17.825 27.7502C19.875 27.2502 21.9333 27.0002 24 27.0002C26.0667 27.0002 28.1167 27.2585 30.15 27.7752C32.1833 28.2919 34.3154 29.0368 36.5461 30.0099C37.5894 30.4808 38.4259 31.1635 39.0556 32.0582C39.6852 32.9529 40 34.0335 40 35.3002V40.0002H8ZM11 37.0002H37V35.3002C37 34.7669 36.8417 34.2585 36.525 33.7752C36.2083 33.2919 35.8167 32.9335 35.35 32.7002C33.2167 31.6669 31.2667 30.9585 29.5 30.5752C27.7333 30.1919 25.9 30.0002 24 30.0002C22.1 30.0002 20.25 30.1919 18.45 30.5752C16.65 30.9585 14.7 31.6669 12.6 32.7002C12.1333 32.9335 11.75 33.2919 11.45 33.7752C11.15 34.2585 11 34.7669 11 35.3002V37.0002ZM24 20.9502C25.3 20.9502 26.375 20.5252 27.225 19.6752C28.075 18.8252 28.5 17.7502 28.5 16.4502C28.5 15.1502 28.075 14.0752 27.225 13.2252C26.375 12.3752 25.3 11.9502 24 11.9502C22.7 11.9502 21.625 12.3752 20.775 13.2252C19.925 14.0752 19.5 15.1502 19.5 16.4502C19.5 17.7502 19.925 18.8252 20.775 19.6752C21.625 20.5252 22.7 20.9502 24 20.9502Z"
              fill="#727272"
            />
          </svg>
          <input
            type="text"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
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
        </div>
      </td>
      <td>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          disabled={!isEdit}
          className={clsx(
            "px-3 py-1.5 rounded-lg bg-transparent border-2",
            isEdit ? "border-[#CCC9C9]" : "border-transparent"
          )}
          style={{ boxShadow: isEdit && "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
        />
      </td>
      <td>
        <DropdownRole selected={role} setSelected={setRole} />
      </td>
      <td className="space-x-10 flex">
        <div className="space-x-5 py-2">
          <button
            className="text-[#3A7DFF] focus:outline-none border-0"
            onClick={() => {
              setOpen(true);
            }}
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
};

const TableUsers = ({ data, setCurrentRoles }) => {
  const [open, setOpen] = useState(false);
  // const [selectedRole, setSelectedRole] = useState();

  const handleDelete = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div className="overflow-auto">
      <table
        className={clsx(styles.table, " max-w-full text-left mt-8 xl:mt-16")}
      >
        <tr>
          <th>User</th>
          <th>Work Email</th>
          <th>Role</th>
          <th>&nbsp;</th>
        </tr>
        {data.map((item, index) => (
          <TableItem
            key={index}
            item={item}
            setCurrentRoles={setCurrentRoles}
            currentIndex={index}
            setOpen={setOpen}
          />
        ))}
      </table>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[#D9D9D950]" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[638px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-none flex flex-col border-2 border-[#BFBFBF]">
            <div className="p-10">
              <h6 className="text-xl xl:text-3xl font-semibold">Remove User</h6>

              <div className="flex space-x-5 xl:space-x-8 items-center mt-3">
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
                  This user will no longer be associated with any part of the
                  system
                </p>
              </div>
              <div className="flex space-x-5 justify-end w-full mt-6 xl:mt-10">
                <button
                  className="text-sm xl:text-lg w-[115px] py-1.5 bg-[#DE350B] text-white focus:outline-none border-0 font-semibold"
                  onClick={handleDelete}
                >
                  Delete
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
    </div>
  );
};

export default TableUsers;
