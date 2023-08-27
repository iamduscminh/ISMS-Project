import React, { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import MessageError from "./MessageError";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const FormAddUser = ({ open, setOpen, data, setCurrentUsers, getAllUsers }) => {
  const axiosInstance = useAxiosPrivate();
  const [role, setRole] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userPassWord, setUserPassWord] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userMidName, setUserMidName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [errors, setErrors] = useState();

  const middleNameRef = useRef(null);

  const handleInsertUser = () => {
    if (!userEmail?.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }
    if (userPassWord?.trim()?.length <= 8) {
      setErrors({ password: "Password must be at least 8 characters" });
      return;
    }

    if (!userFirstName?.trim()) {
      setErrors({ firstName: "First Name is required" });
      return;
    }

    if (!userLastName?.trim()) {
      setErrors({ lastName: "Last Name is required" });
      return;
    }

    const newUser = {
      email: userEmail.trim(),
      password: userPassWord.trim(),
      firstName: userFirstName.trim(),
      middleName: userMidName.trim(),
      lastName: userLastName.trim(),
      fullName: userFirstName.trim() + " " + userLastName.trim(),
      isActive: true,
    };
    const controller = new AbortController();

    const createUser = async () => {
      try {
        const response = await axiosInstance.post(
          "api/Users/create",
          JSON.stringify(newUser),
          {
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const createdUser = newUser;
          // setCurrentUsers((prev) => [...prev, createdUser]);
          // Clear Input
          getAllUsers();
          setUserEmail(" ");
          setUserPassWord(" ");
          setUserFirstName(" ");
          setUserMidName(" ");
          setUserLastName(" ");
          setOpen(false);
          Swal.fire({
            icon: "success",
            text: `Create successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
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
    createUser();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#D9D9D950]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[664px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-none flex flex-col border-2 border-[#BFBFBF]">
          <div className="py-6 px-10">
            <h6 className="text-xl xl:text-3xl font-bold text-center">
              NEW USER
            </h6>

            <div className="mt-10 space-y-8">
              <div className="flex items-start">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[150px]">
                  Email
                </label>
                <div className="flex-1">
                  {/* <input
                    className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black"
                    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                    ref={emailRef}
                  /> */}
                  {/* {!userEmail && (
                    <MessageError type="small" error={"Wrong email format"} />
                  )} */}
                  <input
                    className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black flex-1"
                    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                    value={userEmail}
                    required
                  />
                  {errors?.email && (
                    <MessageError type="small" error={errors?.email} />
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[150px]">
                  Password
                </label>
                <div className="flex-1">
                  <input
                    type="password"
                    className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black"
                    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                    onChange={(e) => {
                      setUserPassWord(e.target.value);
                    }}
                    required
                    value={userPassWord}
                  />
                  {errors?.password && (
                    <MessageError type="small" error={errors?.password} />
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[150px]">
                  First Name
                </label>
                <div className="flex-1">
                  <input
                    className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black"
                    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                    onChange={(e) => {
                      setUserFirstName(e.target.value);
                    }}
                    value={userFirstName}
                    required
                  />
                  {errors?.firstName && (
                    <MessageError type="small" error={errors?.firstName} />
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[150px]">
                  Middle Name
                </label>
                <div className="flex-1">
                  <input
                    className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black"
                    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                    onChange={(e) => {
                      setUserMidName(e.target.value);
                    }}
                    ref={middleNameRef}
                  />
                  {/* <MessageError type="small" error={"Middle Name is required"} /> */}
                </div>
              </div>
              <div className="flex items-start">
                <label className="text-[#647186] text-base font-semibold xl:text-lg w-[150px]">
                  Last Name
                </label>
                <div className="flex-1">
                  <input
                    className="w-full rounded-lg py-1.5 px-5 border-2 border-[#CCC9C9] focus:outline-none text-black"
                    style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
                    onChange={(e) => {
                      setUserLastName(e.target.value);
                    }}
                    value={userLastName}
                    required
                  />
                  {errors?.lastName && (
                    <MessageError type="small" error={errors?.lastName} />
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-5 justify-center w-full mt-6 xl:mt-10">
              <button
                className="text-sm xl:text-lg w-[150px] py-2 bg-[#4AA976] text-white focus:outline-none border-0 font-semibold"
                onClick={handleInsertUser}
              >
                Add user
              </button>
              {/* <div className="space-x-5 xl:space-x-8 mt-3">
              <div>
                <label className="text-[#647186] text-base font-semibold xl:text-lg">
                  Role
                </label>
                <DropdownRole
                  selected={role}
                  setSelected={setRole}
                  className="border-0 rounded-lg bg-[#F1F1F1] text-sm xl:text-lg py-0.5"
                />
              </div>
            </div>
            <div className="flex space-x-5 justify-end w-full mt-6 xl:mt-10">
              <button
                className="text-sm xl:text-lg w-[115px] py-1.5 bg-[#043AC5] text-white focus:outline-none border-0 font-semibold"
                onClick={handleAdd}
              >
                Add
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
            </div> */}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FormAddUser;
