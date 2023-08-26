import React, { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useLocation,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ROUTES_PATHS } from "../../../constants";
import MessageError from "../../components/Dashboard/MessageError";
import TogglePermission from "../../components/Dashboard/TogglePermission";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminRoleEdit = ({ setCurrentRoles }) => {
  const [roleName, setRoleName] = useState(" ");
  const [desc, setDesc] = useState(" ");
  const [permissions, setPermissions] = useState([]);
  const [roleType, setRoleType] = useState([]);
  const [getRole, setRole] = useState([]);
  const { id } = useParams();
  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const getRoleById = async () => {
      try {
        const response = await axiosInstance.get(`api/Roles/get/${id}`);
        setRoleName(response.data.roleName);
        setDesc(response.data.description);
        setRoleType(response.data.roleType);
      } catch (error) {
        console.error("Error getRoleById [AdminRoleEdit]:", error);
      }
    };
    const getPermissionByRoleId = async () => {
      try {
        const response = await axiosInstance.get(`api/Permissions/get/${id}`);
        setPermissions(response.data.permissions);
      } catch (error) {
        console.error("Error getPermissionByRoleId [AdminRoleEdit]:", error);
      }
    };
    const getAllRoles = async () => {
      try {
        const response = await axiosInstance.get("api/Roles/getall");
        setRole(response.data);
      } catch (error) {
        console.error("Error fetching service categories:", error);
      }
    };

    getAllRoles();
    getPermissionByRoleId();
    getRoleById();
  }, [axiosInstance]);

  const handleEditRole = () => {
    const updatedRole = {
      roleId: id,
      roleName: roleName,
      description: desc,
      roleType: roleType,
    };

    return axiosInstance
      .put(`/api/Roles/update`, updatedRole, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log("Có lỗi khi cập nhật1: ", error);
        return false;
      });
  };

  const handleEditPermission = () => {
    const updatedPermission = {
      roleId: id,
      permissions: permissions,
    };

    return axiosInstance
      .put(`/api/Permissions/update`, updatedPermission, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log("Có lỗi khi cập nhật2: ", error);
        return false;
      });
  };

  const handleSave = () => {
    Promise.all([handleEditPermission(), handleEditRole()])
      .then((res) => {
        if (res?.findIndex((item) => item === false) >= 0) {
          alert("Có lỗi khi cập nhật");
          return;
        }

        navigate(ROUTES_PATHS.ADMIN_ROLE);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
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
        <h5 className="text-xl xl:text-3xl font-semibold uppercase text-center">
          Edit role
        </h5>

        <div className="mt-10 space-y-8">
          <div className="flex items-start">
            <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
              Role Name
            </label>
            <div className="flex-1">
              {/* <input
                className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black max-w-[275px]"
                style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
              /> */}
              <td>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => {
                    setRoleName(e.target.value);
                  }}
                  className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black max-w-[275px]"
                />
              </td>
              {!roleName && <MessageError error={"Role name is required"} />}
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
              Permissions
            </label>

            <div className="flex-1 border border-black rounded-lg bg-[#E5F3F3] px-10 py-8">
              <table className="w-full">
                <tr>
                  <th className="pb-4 text-lg text-center xl:text-2xl font-semibold">
                    Permission Name
                  </th>
                  <th className="pb-4 text-lg text-center xl:text-2xl font-semibold">
                    Permission Set
                  </th>
                </tr>
                {permissions?.map((permission, curIndex) => (
                  <tr key={curIndex}>
                    <td className="py-4 text-lg text-center xl:text-2xl">
                      {permission.permissionName}
                    </td>
                    <td>
                      <TogglePermission
                        value={permission.isGranted}
                        togglePermission={() =>
                          setPermissions((prev) =>
                            prev?.map((item, index) =>
                              index === curIndex
                                ? { ...item, isGranted: !item.isGranted }
                                : item
                            )
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 xl:mt-[54px] flex space-x-3 justify-end">
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="text-white gap-4 px-4 py-2 bg-[#4AA976] rounded-lg font-semibold w-[150px] text-center"
            >
              Save
            </button>
          </div>
          <Link to={ROUTES_PATHS.ADMIN_ROLE} className="flex justify-end">
            <button className="text-black gap-4 px-4 py-2 border border-black rounded-lg w-[150px] text-center font-bold">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminRoleEdit;
