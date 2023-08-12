import React, { useState, useEffect, useRef } from "react";
import TableGroups from "../../components/Dashboard/TableGroups";
import MessageError from "../../components/Dashboard/MessageError";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DropDownBusinessHour from "../../components/Dashboard/TableGroups/DropDownBusinessHour";
import DropDownGroupLeader from "../../components/Dashboard/TableGroups/DropDownGroupLeader";

const AdminGroup = () => {
  const axiosInstance = useAxiosPrivate();
  const [newRole, setNewRole] = useState(" ");
  const [desc, setDesc] = useState(" ");
  const [currentGroups, setCurrentGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listBusinessHour, setListBusinessHour] = useState([]);
  const [listGroupLeader, setlistGroupLeader] = useState([]);

  useEffect(() => {
    const getAllGroups = async () => {
      try {
        const response = await axiosInstance.get("api/Groups/getall");
        setCurrentGroups(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error get all Groups [AdminGroup]:", error);
        setIsLoading(false);
      }
    };
    const getListBusinessHour = async () => {
      try {
        const response = await axiosInstance.get(`api/BusinessHours/getall`);
        setListBusinessHour(response.data);
      } catch (error) {
        console.error("Error getListBusinessHour [AdminGroup]:", error);
      }
    };
    const getListGroupLeaderName = async () => {
      try {
        const response = await axiosInstance.get(`/api/Users/getall`);
        setlistGroupLeader(response.data);
      } catch (error) {
        console.error("Error getListGroupLeaderName [AdminGroup]:", error);
      }
    };
    getListGroupLeaderName();
    getListBusinessHour();
    getAllGroups();
  }, [axiosInstance]);

  const [businessHourSelected, setBusinessHourSelected] =
    useState(listBusinessHour);
  const [groupLeaderSelected, setGroupLeaderSelected] =
    useState(listGroupLeader);

  const groupNameDef = useRef(null);
  const groupDesRef = useRef(null);

  const handleInsertGroup = (e) => {
    const groupName = groupNameDef.current.value;
    const groupDes = groupDesRef.current.value;

    const newGroup = {
      groupName: groupName,
      description: groupDes,
      groupLeader: groupLeaderSelected.userId,
    };

    const controller = new AbortController();

    const createGroup = async () => {
      try {
        const response = await axiosInstance.post(
          `api/Groups/create`,
          JSON.stringify(newGroup),
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const createdGroup = response.data;
          console.log("createGroup data:  " + response.data);
          setCurrentGroups((prev) => [...prev, createdGroup]);
          // Clear Input
          console.log(currentGroups);
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
    createGroup();
  };

  return (
    <div className="bg-[#F7F7F7] text-[#727272]">
      <div className="mx-auto max-w-7xl px-5 py-[60px]">
        <h6 className="font-semibold text-2xl xl:text-4xl">
          System Group Management
        </h6>
        <p className="mt-4 text-lg xl:text-2xl">
          The system allows you to manage the roles available in your
          organization, you can also view the permissions of those roles
        </p>
        <TableGroups
          data={currentGroups}
          setCurrentRoles={setCurrentGroups}
          listLeader={listGroupLeader}
          listBusiness={listBusinessHour}
        />

        <h6 className="text-xl xl:text-3xl font-semibold mt-8 xl:mt-14">
          New System Group
        </h6>
        <div className="mt-5 xl:mt-10 xl:w-1/2">
          <div className="flex items-start">
            <label className="w-[180px] font-semibold text-lg xl:text-2xl">
              Group Name
            </label>
            <div className="flex-1">
              <input
                ref={groupNameDef}
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
                ref={groupDesRef}
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
          <div className="flex items-start mt-5 xl:mt-10">
            <label className="w-[180px] font-semibold text-lg xl:text-2xl">
              Group Leader
            </label>
            <div className="flex-1">
              <DropDownGroupLeader
                selected={groupLeaderSelected}
                setSelected={setGroupLeaderSelected}
                onChange={(e) => {
                  setGroupLeaderSelected(e.target.value);
                }}
                listGroupLeader={listGroupLeader}
                className="w-full px-3 py-1.5 rounded-lg border-[#CCC9C9] border-2"
                style={{ boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
              />
            </div>
          </div>
          <div className="flex justify-center mt-8 xl:mt-16">
            <button
              onClick={handleInsertGroup}
              className="text-white bg-[#043AC5] py-2 font-semibold w-[200px] text-center text-xl xl:text-3xl"
            >
              Add group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminGroup;
