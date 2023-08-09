import React, { useState, useEffect, useRef } from "react";
import TableRoles from "../../components/Dashboard/TableRoles";
import MessageError from "../../components/Dashboard/MessageError";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminRole = () => {
  const axiosInstance = useAxiosPrivate();
  const [newRole, setNewRole] = useState(" ");
  const [desc, setDesc] = useState(" ");
  const [currentRoles, setCurrentRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllRoles = async () => {
      try {
        const response = await axiosInstance.get("api/Roles/getall");
        setCurrentRoles(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching service categories:", error);
        setIsLoading(false);
      }
    };

    getAllRoles();
  }, [axiosInstance]);

  const [isInsert, setIsInsert] = useState(false);

  const roleNameRef = useRef(null);
  const roleDesRef = useRef(null);

  const handleInsertRole = (e) => {
    const roleName = roleNameRef.current.value;
    const roleDes = roleDesRef.current.value;

    const newRoleGroup = {
      RoleName: roleName,
      Description: roleDes,
    };

    const controller = new AbortController();

    const createRoleGroup = async () => {
      try {
        const response = await axiosInstance.post(
          "api/Roles/create",
          JSON.stringify(newRoleGroup),
          {
            signal: controller.signal,
          }
        );
        if (response.status === 200) {
          const createdRoleGroup = response.data;
          console.log(response.data);
          setCurrentRoles((prev) => [...prev, createdRoleGroup]);
          console.log(currentRoles);
          // Clear Input
          setDesc(" ");
          setNewRole(" ");
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
    createRoleGroup();
  };

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
                ref={roleNameRef}
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
                ref={roleDesRef}
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
            <button
              onClick={handleInsertRole}
              className="text-white bg-[#043AC5] py-2 font-semibold w-[200px] text-center text-xl xl:text-3xl"
            >
              Add role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRole;
