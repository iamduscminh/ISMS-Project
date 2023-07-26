import React, { useState } from "react";
import TableRoles, { roles } from "../../components/Dashboard/TableRoles";
import MessageError from "../../components/Dashboard/MessageError";

const AdminRole = () => {
  const [newRole, setNewRole] = useState(" ");
  const [desc, setDesc] = useState(" ");
  const [currentRoles, setCurrentRoles] = useState(roles);

  return (
    <div className="bg-[#F7F7F7] text-[#727272]">
      <div className="mx-auto max-w-7xl px-5 py-[60px]">
        <h6 className="font-semibold text-2xl xl:text-4xl">
          System Role Management
        </h6>
        <p className="mt-4 text-lg xl:text-2xl">
          The system allows you to manage the roles available in your
          organization, you can also view the permissions of those roles
        </p>
        <TableRoles data={currentRoles} setCurrentRoles={setCurrentRoles} />

        <h6 className="text-xl xl:text-3xl font-semibold mt-8 xl:mt-14">
          New system role
        </h6>
        <div className="mt-5 xl:mt-10 xl:w-1/2">
          <div className="flex items-start">
            <label className="w-[180px] font-semibold text-lg xl:text-2xl">
              Role Name
            </label>
            <div className="flex-1">
              <input
                type="text"
                value={newRole}
                onChange={(e) => {
                  setNewRole(e.target.value);
                }}
                className="w-full px-3 py-1.5 rounded-lg border-[#CCC9C9] border-2"
                style={{ boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
              />
              {!newRole && <MessageError error={"Role name is required"} />}
            </div>
          </div>
          <div className="flex items-start mt-5 xl:mt-10">
            <label className="w-[180px] font-semibold text-lg xl:text-2xl">
              Description
            </label>
            <div className="flex-1">
              <textarea
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                className="w-full min-h-[110px] px-3 py-1.5 flex-1 rounded-lg border-[#CCC9C9] border-2"
                style={{ boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
              />
              {!desc && <MessageError error={"Description is required"} />}
            </div>
          </div>
          <div className="flex justify-center mt-8 xl:mt-16">
            <button className="text-white bg-[#043AC5] py-2 font-semibold w-[200px] text-center text-xl xl:text-3xl">
              Add role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRole;
