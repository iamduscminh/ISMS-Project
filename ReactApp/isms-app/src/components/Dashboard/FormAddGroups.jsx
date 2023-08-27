import React, { useState, useRef, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { roleTypes } from "../../pages/AdminRole";
import DropdownRoleType from "./TableRoles/DropDownRoleType";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import MessageError from "../../components/Dashboard/MessageError";
import TableRoles from "../../components/Dashboard/TableRoles";
import DropDownGroupLeader from "../../components/Dashboard/TableGroup/DropDownGroupLeader";
import Swal from "sweetalert2";

const FormAddGroups = ({
  open,
  setOpen,
  data,
  setCurrentGroups,
  getAllGroups,
}) => {
  const axiosInstance = useAxiosPrivate();
  const [groupName, setNewGroup] = useState("");
  const [desc, setDesc] = useState("");
  const [listGroupLeader, setlistGroupLeader] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    const getListGroupLeaderName = async () => {
      try {
        const response = await axiosInstance.get(`/api/Users/getall`);
        setlistGroupLeader(response.data);
      } catch (error) {
        console.error("Error getListGroupLeaderName [FormAddGroup]:", error);
      }
    };
    getListGroupLeaderName();
  }, [axiosInstance]);

  const [groupLeaderSelected, setGroupLeaderSelected] =
    useState(listGroupLeader);

  const handleInsertGroup = (e) => {
    if (!groupName?.trim()) {
      setErrors({ name: "Group name is required" });
      return;
    }
    if (!desc?.trim()) {
      setErrors({ desc: "Description is required" });
      return;
    }

    const newGroup = {
      groupName: groupName.trim(),
      description: desc.trim(),
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
          Swal.fire({
            icon: "success",
            text: `Create groups successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
          setDesc(" ");
          setNewGroup(" ");
          setOpen(false);
          getAllGroups();
        } else {
          throw response;
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err}`,
          showCancelButton: true,
          cancelButtonText: "Cancel",
        });
      }
    };
    createGroup();
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#D9D9D950]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[601px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-none flex flex-col border-2 border-[#BFBFBF]">
          <div className="py-6 px-10">
            <h6 className="text-xl xl:text-3xl font-bold uppercase text-center">
              New system Group
            </h6>

            <div className="mt-10 space-y-8">
              <div className="flex-1 items-center">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
                  Group Name
                </label>
                <input
                  className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black flex-1"
                  style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                  onChange={(e) => {
                    setNewGroup(e.target.value);
                  }}
                  value={groupName}
                />
                <td>
                  {errors?.name && (
                    <MessageError type="small" error={errors?.name} />
                  )}
                </td>
              </div>
              <div className="flex-1 items-center">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
                  Description
                </label>
                <textarea
                  className="min-h-[105px] w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black flex-1"
                  style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
                {errors?.desc && (
                  <MessageError type="small" error={errors?.desc} />
                )}
              </div>
              <div className="flex-1 items-center">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[160px]">
                  Group Leader
                </label>
                <DropDownGroupLeader
                  selected={groupLeaderSelected}
                  setSelected={setGroupLeaderSelected}
                  onChange={(e) => {
                    setGroupLeaderSelected(e.target.value);
                  }}
                  listGroupLeader={listGroupLeader}
                  className="border-[#CCC9C9] border-2 rounded-lg text-sm xl:text-lg py-0.5 flex-1"
                  style={{ boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                />
              </div>
              <div className="flex space-x-5 justify-center w-full mt-6 xl:mt-10">
                <button
                  className="text-sm xl:text-lg w-[150px] py-2 bg-[#4AA976] text-white focus:outline-none border-0 font-semibold"
                  onClick={handleInsertGroup}
                >
                  Add Group
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FormAddGroups;
