import React, { useState, useEffect } from "react";
import TableUsers from "../../components/Dashboard/TableUsers";
import FormAddUser from "../../components/Dashboard/FormAddUser";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { ROUTES_PATHS } from "../../../constants";

const AdminUserManage = () => {
  const axiosInstance = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentRoles, setCurrentRoles] = useState([]);
  const [currentGroups, setCurrentGroups] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/Users/getall");
        setCurrentUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("getAllUsers [AdminUserManage]:", error);
        setIsLoading(false);
      }
    };

    const getAllRoles = async () => {
      try {
        const response = await axiosInstance.get("api/Roles/getall");
        setCurrentRoles(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("getAllRoles [AdminUserManage]:", error);
        setIsLoading(false);
      }
    };
    const getAllGroups = async () => {
      try {
        const response = await axiosInstance.get("api/Groups/getall");
        setCurrentGroups(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("getAllGroups [AdminUserManage]:", error);
        setIsLoading(false);
      }
    };
    getAllRoles();
    getAllGroups();
    getAllUsers();
  }, [axiosInstance]);

  return (
    <div className="bg-[#F7F7F7] text-[#102c57] overflow-y-scroll">
      <div className="mx-auto max-w-7xl px-5 py-[70px]">
        <div>
          <h6 className="font-bold text-2xl xl:text-3xl font-poppins">
            System User Management
          </h6>
          <p className="font-light mt-4 text-lg xl:text-xl font-poppins fl">
            The system allows you to manage the users available in your
            organization
          </p>
        </div>
        <div className="flex justify-end space-x-4 mt-8 xl:mt-[54px] font-poppins">
          <button
            className="flex items-center text-white gap-4 px-4 py-2 bg-[#4AA976] rounded-lg font-poppins font-bold"
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
            <span>Create new user</span>
          </button>

          <FormAddUser
            open={open}
            setOpen={setOpen}
            data={currentUsers}
            setCurrentUsers={setCurrentUsers}
          />
        </div>
        <TableUsers
          data={currentUsers}
          setCurrentUsers={setCurrentUsers}
          setCurrentRoles={currentRoles}
          setCurrentGroups={currentGroups}
        />
      </div>
    </div>
  );
};

export default AdminUserManage;
