import React, { useState } from "react";
import TableUsers from "../../components/Dashboard/TableUsers";
import { roles } from "../../components/Dashboard/TableRoles";
import FormAddUser from "../../components/Dashboard/FormAddUser";

const AdminUserManage = () => {
  const [currentRoles, setCurrentRoles] = useState(
    Array(3).fill({
      name: "Tu Doan",
      email: "tuda@company.com.vn",
      role: roles[0],
    })
  );

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#F7F7F7] text-[#727272]">
      <div className="mx-auto max-w-7xl px-5 py-[60px]">
        <h6 className="font-semibold text-2xl xl:text-4xl">
          System User Management
        </h6>

        <div className="mt-8 xl:mt-16 flex space-x-6 xl:space-x-10">
          <div className="relative">
            <input
              type="text"
              className="border-[#CECDCD] py-2 xl:py-3 pr-2 focus:outline-none pl-10 border-2"
            />
            <div className="absolute flex h-full top-0 left-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
              >
                <path
                  d="M29.0208 30.5889L19.4323 21.0003C18.7031 21.6323 17.8529 22.1245 16.8817 22.4769C15.9105 22.8293 14.877 23.0055 13.7812 23.0055C11.1523 23.0055 8.92737 22.0941 7.10642 20.2712C5.28547 18.4482 4.375 16.2486 4.375 13.6722C4.375 11.0958 5.28646 8.89616 7.10938 7.07324C8.93229 5.25033 11.138 4.33887 13.7266 4.33887C16.3151 4.33887 18.5148 5.25033 20.3255 7.07324C22.1363 8.89616 23.0417 11.0976 23.0417 13.6777C23.0417 14.7192 22.8715 15.726 22.5312 16.6982C22.191 17.6705 21.6806 18.5819 21 19.4326L30.625 28.9847L29.0208 30.5889ZM13.7448 20.818C15.7196 20.818 17.3982 20.1192 18.7806 18.7217C20.163 17.3241 20.8542 15.641 20.8542 13.6722C20.8542 11.7035 20.163 10.0203 18.7806 8.62272C17.3982 7.22515 15.7196 6.52637 13.7448 6.52637C11.7497 6.52637 10.0539 7.22515 8.65732 8.62272C7.26077 10.0203 6.5625 11.7035 6.5625 13.6722C6.5625 15.641 7.26077 17.3241 8.65732 18.7217C10.0539 20.1192 11.7497 20.818 13.7448 20.818Z"
                  fill="#727272"
                />
              </svg>
            </div>
          </div>
          <button
            className="text-white bg-[#043AC5] py-2 font-semibold w-[200px] text-center text-xl xl:text-3xl"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add User
          </button>
        </div>
        <TableUsers data={currentRoles} setCurrentRoles={setCurrentRoles} />
        <FormAddUser open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default AdminUserManage;
