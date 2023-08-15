import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTES_PATHS } from "../../../constants";
import MessageError from "../../components/Dashboard/MessageError";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DropDownGroupLeader from "../../components/Dashboard/TableGroups/DropDownGroupLeader";

const AdminGroupEdit = () => {
  const [groupSelected, setGroupSelected] = useState([]);
  const [groupLeaderId, setGroupLeaderId] = useState([]);
  const [listGroupLeader, setlistGroupLeader] = useState([]);
  const [groupLeaderSelected, setGroupLeaderSelected] = useState([]);
  const [groupLeaderName, setGroupLeaderName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [currentGroups, setCurrentGroups] = useState([]);
  const [desc, setDesc] = useState("");
  const { id } = useParams();
  const axiosInstance = useAxiosPrivate();

  useEffect(() => {
    const getGroupById = async () => {
      try {
        const response = await axiosInstance.get(`api/Groups/${id}`);
        setGroupSelected(response.data);
        setGroupName(response.data.groupName);
        setDesc(response?.data.description);
        setGroupLeaderId(response?.data.groupLeader);
      } catch (error) {
        console.error("Error getGroupById [AdminGroupEdit]:", error);
      }
    };
    const getLeaderSelectedById = async () => {
      try {
        const response = await axiosInstance.post(
          `api/Users/get/${groupLeaderId}`
        );
        setGroupLeaderSelected(response.data);
        setGroupLeaderName(response.data.fullName);
      } catch (error) {
        console.error("Error getLeaderSelectedById [AdminGroupEdit]:", error);
      }
    };
    const getListGroupLeaderName = async () => {
      try {
        const response = await axiosInstance.get(`/api/Users/getall`);
        setlistGroupLeader(response.data);
      } catch (error) {
        console.error("Error getListGroupLeaderName [AdminGroupEdit]:", error);
      }
    };
    const getListGroups = async () => {
      try {
        const response = await axiosInstance.get(`api/Groups/getall`);
        setCurrentGroups(response.data);
      } catch (error) {
        console.error("Error getListGroups [AdminGroupEdit]:", error);
      }
    };
    getListGroups();
    getListGroupLeaderName();
    getLeaderSelectedById();
    getGroupById();
  }, [axiosInstance]);

  const handleEditGroup = (e) => {
    const updatedGroup = {
      groupName: groupName,
      description: desc,
      groupLeader: groupLeaderSelected.userId,
    };
    axiosInstance
      .put(`/api/Groups/update?groupId=${id}`, updatedGroup, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const newData = response.data;
        const updatedData = currentGroups.map((item) =>
          item.groupId === newData.groupId ? newData : item
        );

        setCurrentGroups(updatedData);
      })
      .catch((error) => {
        alert("Có lỗi khi cập nhật: ", error);
      });
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
        <h5 className="text-xl xl:text-3xl font-semibold uppercase text-center">
          Edit Group
        </h5>

        <div className="mt-10 space-y-8">
          <div className="flex items-start">
            <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
              Group Name
            </label>
            <div className="flex-1">
              <td>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                  className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black max-w-[275px]"
                />
              </td>
              {!groupName && <MessageError error={"Group name is required"} />}
            </div>
          </div>
          <div className="flex items-start">
            <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
              Description
            </label>
            <div className="flex-1">
              <textarea
                className="min-h-[105px] max-w-[512px] w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black"
                style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
              {!desc && <MessageError error={"Description is required"} />}
            </div>
          </div>
          <div className="flex items-start">
            <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
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
                groupLeaderName={groupLeaderName}
                className="w-full px-3 py-1.5 rounded-lg border-[#CCC9C9] border-2"
                style={{ boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 xl:mt-[54px] flex space-x-3 justify-end">
          <Link to={ROUTES_PATHS.ADMIN_GROUPS} className="flex justify-end">
            <button
              onClick={handleEditGroup}
              className="text-white gap-4 px-4 py-2 bg-[#4AA976] rounded-lg font-semibold w-[150px] text-center"
            >
              Save
            </button>
          </Link>
          <Link to={ROUTES_PATHS.ADMIN_GROUPS} className="flex justify-end">
            <button className="text-black gap-4 px-4 py-2 border border-black rounded-lg w-[150px] text-center font-bold">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminGroupEdit;
