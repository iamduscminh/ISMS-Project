import React, { useState, useEffect, useRef } from "react";
import TableGroups from "../../components/Dashboard/TableGroup";
import MessageError from "../../components/Dashboard/MessageError";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import FormAddRole from "../../components/Dashboard/FormAddRole";
import { ROUTES_PATHS } from "../../../constants";
import { Link, useParams, Routes, Route } from "react-router-dom";
import FormAddGroups from "../../components/Dashboard/FormAddGroups";

const AdminGroups = () => {
  const axiosInstance = useAxiosPrivate();
  const [currentGroups, setCurrentGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listBusinessHour, setListBusinessHour] = useState([]);
  const [listGroupLeader, setlistGroupLeader] = useState([]);
  const [open, setOpen] = useState(false);
  const handleInsertGroup = (item) => setCurrentGroups(item);

  const getAllGroups = async () => {
    try {
      const response = await axiosInstance.get("api/Groups/getall");
      handleInsertGroup(response.data);
      console.log("response.data", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error get all Groups [AdminGroups]:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getListGroupLeaderName = async () => {
      try {
        const response = await axiosInstance.get(`/api/Users/getall`);
        setlistGroupLeader(response.data);
      } catch (error) {
        console.error("Error getListGroupLeaderName [AdminGroups]:", error);
      }
    };
    getListGroupLeaderName();
    getAllGroups();
  }, [axiosInstance]);

  return (
    <div className="bg-[#F7F7F7] text-[#102c57] overflow-y-scroll">
      <div className="mx-auto max-w-7xl px-5 py-[70px]">
        <h6 className="font-bold text-2xl xl:text-3xl font-poppins">
          System Group Management
        </h6>
        <p className="font-light mt-4 text-lg xl:text-xl font-poppins fl">
          The system allows you to manage the groups available in your
          organization.
        </p>
        <div className="flex justify-end space-x-4 mt-8 xl:mt-[54px]">
          <button
            className="flex items-center text-white gap-4 px-4 py-2 bg-[#4AA976] rounded-lg"
            onClick={() => {
              setOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
            >
              <path
                d="M16.042 18.9587H7.29199V16.042H16.042V7.29199H18.9587V16.042H27.7087V18.9587H18.9587V27.7087H16.042V18.9587Z"
                fill="white"
              />
            </svg>
            <span>Create new group</span>
          </button>
        </div>
        <TableGroups
          data={currentGroups}
          setCurrentRoles={setCurrentGroups}
          listLeader={listGroupLeader}
        />
        <FormAddGroups
          open={open}
          setOpen={setOpen}
          data={currentGroups}
          getAllGroups={getAllGroups}
          setCurrentGroups={handleInsertGroup}
        />
      </div>
    </div>
  );
};
export const roleTypes = [
  { id: 0, name: "Admin" },
  { id: 1, name: "Agent" },
];
export default AdminGroups;
