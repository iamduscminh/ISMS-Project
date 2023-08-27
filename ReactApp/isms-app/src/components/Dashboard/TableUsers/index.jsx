import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import DropdownRole from "./DropdownRole";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import FormAssignRole from "../FormAssignRole";
import FormAddUserToGroup from "../FormAddUserToGroup";
import Swal from "sweetalert2";

const IconDeactive = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <path
      d="M10.0003 36.667C9.08366 36.667 8.29866 36.3403 7.64533 35.687C6.99199 35.0337 6.66588 34.2492 6.667 33.3337V16.667C6.667 15.7503 6.99366 14.9653 7.64699 14.312C8.30033 13.6587 9.08477 13.3325 10.0003 13.3337H11.667V10.0003C11.667 7.69477 12.4798 5.72922 14.1053 4.10366C15.7309 2.4781 17.6959 1.66588 20.0003 1.66699C22.3059 1.66699 24.2714 2.47977 25.897 4.10533C27.5226 5.73088 28.3348 7.69588 28.3337 10.0003V13.3337H30.0003C30.917 13.3337 31.702 13.6603 32.3553 14.3137C33.0087 14.967 33.3348 15.7514 33.3337 16.667V33.3337C33.3337 34.2503 33.007 35.0353 32.3537 35.6887C31.7003 36.342 30.9159 36.6681 30.0003 36.667H10.0003ZM20.0003 28.3337C20.917 28.3337 21.702 28.007 22.3553 27.3537C23.0087 26.7003 23.3348 25.9159 23.3337 25.0003C23.3337 24.0837 23.007 23.2987 22.3537 22.6453C21.7003 21.992 20.9159 21.6659 20.0003 21.667C19.0837 21.667 18.2987 21.9937 17.6453 22.647C16.992 23.3003 16.6659 24.0848 16.667 25.0003C16.667 25.917 16.9937 26.702 17.647 27.3553C18.3003 28.0087 19.0848 28.3348 20.0003 28.3337ZM15.0003 13.3337H25.0003V10.0003C25.0003 8.61144 24.5142 7.43088 23.542 6.45866C22.5698 5.48644 21.3892 5.00033 20.0003 5.00033C18.6114 5.00033 17.4309 5.48644 16.4587 6.45866C15.4864 7.43088 15.0003 8.61144 15.0003 10.0003V13.3337Z"
      fill="#E90606"
    />
  </svg>
);

const IconActive = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.555 6.35205C16.8588 6.45327 16.1895 6.69122 15.5857 7.05219C14.9819 7.41316 14.4555 7.89002 14.0368 8.45531C13.618 9.0206 13.3152 9.66314 13.1459 10.3459C12.9765 11.0287 12.9439 11.7383 13.05 12.4337L13.1 12.7721C13.1666 13.1937 13.2766 13.6054 13.4316 14.0021L14.9566 17.9054C18.6055 17.6576 22.2676 17.6793 25.9133 17.9704L28.4066 18.1704C29.1905 18.2331 29.9307 18.5565 30.5092 19.0891C31.0877 19.6217 31.4712 20.3327 31.5983 21.1087C32.201 24.7898 32.201 28.5443 31.5983 32.2254C31.4715 33.0017 31.0882 33.7131 30.5097 34.246C29.9311 34.779 29.1907 35.1026 28.4066 35.1654L25.9133 35.3654C21.9762 35.6796 18.0204 35.6796 14.0833 35.3654L11.59 35.1654C10.8059 35.1026 10.0654 34.779 9.4869 34.246C8.90836 33.7131 8.52508 33.0017 8.39829 32.2254C7.79562 28.5443 7.79562 24.7898 8.39829 21.1087C8.52482 20.3319 8.90819 19.6199 9.48709 19.0866C10.066 18.5533 10.807 18.2295 11.5916 18.1671L12.3533 18.1071L11.1033 14.9104C10.8823 14.3428 10.7246 13.7526 10.6333 13.1504L10.5816 12.8104C10.2917 10.9048 10.7146 8.95919 11.7693 7.34584C12.824 5.73248 14.4366 4.56464 16.2984 4.06576C18.1603 3.56687 20.1407 3.77196 21.8608 4.6418C23.5809 5.51163 24.9199 6.98513 25.6216 8.78038L25.7466 9.10205C25.9683 9.66872 26.1266 10.2604 26.2183 10.8637L26.4533 12.4104C26.4699 12.5186 26.465 12.6291 26.4388 12.7354C26.4127 12.8417 26.3659 12.9419 26.301 13.0301C26.2362 13.1183 26.1545 13.1929 26.0609 13.2496C25.9672 13.3063 25.8632 13.3439 25.755 13.3604L24.9316 13.4854C24.8234 13.502 24.7129 13.497 24.6066 13.4709C24.5003 13.4448 24.4001 13.398 24.3119 13.3331C24.2237 13.2682 24.1491 13.1866 24.0924 13.0929C24.0358 12.9992 23.9981 12.8953 23.9816 12.7871L23.7483 11.2404C23.6841 10.8195 23.5734 10.4069 23.4183 10.0104L23.2933 9.69038C22.8547 8.56788 22.0489 7.62701 21.0072 7.0211C19.9654 6.41518 18.7492 6.17994 17.5566 6.35372L17.555 6.35205ZM20 24.1671C19.3369 24.1671 18.701 24.4304 18.2322 24.8993C17.7634 25.3681 17.5 26.004 17.5 26.6671C17.5 27.3301 17.7634 27.966 18.2322 28.4348C18.701 28.9037 19.3369 29.1671 20 29.1671C20.663 29.1671 21.2989 28.9037 21.7677 28.4348C22.2366 27.966 22.5 27.3301 22.5 26.6671C22.5 26.004 22.2366 25.3681 21.7677 24.8993C21.2989 24.4304 20.663 24.1671 20 24.1671Z"
      fill="#2C834E"
    />
  </svg>
);
const IconGroupAdd = () => (
  <svg
    width="40"
    height="28"
    viewBox="0 0 40 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.8333 13.9165C21.6389 13.0276 22.2572 12.0137 22.6883 10.8748C23.1194 9.73595 23.3344 8.55539 23.3333 7.33317C23.3333 6.11095 23.1178 4.93039 22.6867 3.7915C22.2556 2.65261 21.6378 1.63873 20.8333 0.749838C22.5 0.97206 23.8889 1.70817 25 2.95817C26.1111 4.20817 26.6667 5.6665 26.6667 7.33317C26.6667 8.99984 26.1111 10.4582 25 11.7082C23.8889 12.9582 22.5 13.6943 20.8333 13.9165ZM30 27.3332V22.3332C30 21.3332 29.7778 20.3815 29.3333 19.4782C28.8889 18.5748 28.3056 17.7765 27.5833 17.0832C29 17.5832 30.3128 18.2293 31.5217 19.0215C32.7306 19.8137 33.3344 20.9176 33.3333 22.3332V27.3332H30ZM33.3333 15.6665V12.3332H30V8.99984H33.3333V5.6665H36.6667V8.99984H40V12.3332H36.6667V15.6665H33.3333ZM13.3333 13.9998C11.5 13.9998 9.93056 13.3471 8.625 12.0415C7.31944 10.7359 6.66667 9.1665 6.66667 7.33317C6.66667 5.49984 7.31944 3.93039 8.625 2.62484C9.93056 1.31928 11.5 0.666504 13.3333 0.666504C15.1667 0.666504 16.7361 1.31928 18.0417 2.62484C19.3472 3.93039 20 5.49984 20 7.33317C20 9.1665 19.3472 10.7359 18.0417 12.0415C16.7361 13.3471 15.1667 13.9998 13.3333 13.9998ZM0 27.3332V22.6665C0 21.7221 0.243333 20.8537 0.73 20.0615C1.21667 19.2693 1.86222 18.6654 2.66667 18.2498C4.38889 17.3887 6.13889 16.7426 7.91667 16.3115C9.69444 15.8804 11.5 15.6654 13.3333 15.6665C15.1667 15.6665 16.9722 15.8821 18.75 16.3132C20.5278 16.7443 22.2778 17.3898 24 18.2498C24.8056 18.6665 25.4517 19.2709 25.9383 20.0632C26.425 20.8554 26.6678 21.7232 26.6667 22.6665V27.3332H0Z"
      fill="#44497D"
    />
  </svg>
);

const IconAssign = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <g clipPath="url(#clip0_491_2825)">
      <path
        d="M19.9885 19.0777C24.1675 19.0777 27.5552 15.69 27.5552 11.511C27.5552 7.33205 24.1675 3.94434 19.9885 3.94434C15.8096 3.94434 12.4219 7.33205 12.4219 11.511C12.4219 15.69 15.8096 19.0777 19.9885 19.0777Z"
        fill="#3A7DFF"
      />
      <path
        d="M13.3332 29.6112C13.3563 28.9964 13.5611 28.4023 13.9218 27.9039C14.2825 27.4056 14.7828 27.0253 15.3596 26.8113C15.9364 26.5972 16.5636 26.5589 17.1621 26.7013C17.7606 26.8437 18.3035 27.1603 18.7221 27.6112L23.0109 32.2223L30.6109 23.7445C27.4715 21.6524 23.7722 20.56 19.9998 20.6112C17.383 20.545 14.7835 21.0529 12.384 22.0991C9.98451 23.1453 7.84331 24.7044 6.11095 26.6668C5.9644 26.8621 5.8863 27.1003 5.88873 27.3445V33.3334C5.88847 33.9114 6.11342 34.4668 6.51586 34.8817C6.91829 35.2965 7.46654 35.5383 8.04428 35.5556H17.5665L14.1554 31.889C13.8736 31.5832 13.6557 31.2242 13.5145 30.833C13.3733 30.4419 13.3116 30.0265 13.3332 29.6112Z"
        fill="#3A7DFF"
      />
      <path
        d="M31.9556 35.5553C32.5333 35.5379 33.0816 35.2962 33.484 34.8813C33.8864 34.4664 34.1114 33.9111 34.1111 33.3331V29.1553L28.4111 35.5553H31.9556Z"
        fill="#3A7DFF"
      />
      <path
        d="M37.5224 20.6891C37.4133 20.5905 37.2858 20.5146 37.1472 20.4657C37.0086 20.4168 36.8616 20.3958 36.7149 20.4041C36.5682 20.4124 36.4245 20.4497 36.2923 20.5138C36.1601 20.578 36.0419 20.6678 35.9446 20.778L23.0335 35.2224L17.2557 29.0113C17.1608 28.9004 17.0451 28.8093 16.915 28.7431C16.785 28.6769 16.6431 28.637 16.4977 28.6257C16.3522 28.6143 16.2059 28.6318 16.0671 28.6769C15.9284 28.7221 15.7999 28.7942 15.689 28.8891C15.5849 28.9924 15.5022 29.1152 15.4458 29.2506C15.3894 29.386 15.3604 29.5313 15.3604 29.678C15.3604 29.8246 15.3894 29.9699 15.4458 30.1053C15.5022 30.2407 15.5849 30.3636 15.689 30.4668L23.1112 38.4668L37.6001 22.2224C37.787 22.0059 37.8831 21.7257 37.8687 21.4401C37.8542 21.1545 37.7301 20.8855 37.5224 20.6891Z"
        fill="#3A7DFF"
      />
    </g>
    <defs>
      <clipPath id="clip0_491_2825">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
function formatDate(date) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  const [month, day, year] = formattedDate.split(" ");

  const capitalizedMonth = month.toUpperCase();

  return `${day} ${capitalizedMonth} ${year}`;
}
const TableItem = ({
  item,
  setCurrentRoles,
  setCurrentUsers,
  currentIndex,
  setOpen,
  setOpenAssign,
  setUserSelected,
  setOpenAddGroup,
}) => {
  const [user, setUser] = useState(item?.fullName);
  const [email, setEmail] = useState(item?.email);
  const [phoneNumber, setPhoneNumber] = useState(item?.phoneNumber);
  const [role, setRole] = useState(item?.role?.roleName);
  const [groups, setGroups] = useState(item?.groupDTOs);
  const axiosInstance = useAxiosPrivate();
  const [isActive, setIsActive] = useState(item?.isActive);
  const [openDeactive, setOpenDeactive] = useState(false);
  console.log("===========>role", role);
  const handleDeActive = (e) => {
    try {
      axiosInstance
        .post(`api/Users/deactive?userId=${item.userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          setIsActive(!isActive);
          setOpenDeactive(false);
          Swal.fire({
            icon: "success",
            text: isActive ? "Deactive successfully!" : "Active successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDeActive();
  };

  return (
    <tr>
      <td className="px-3 py-1.5 rounded-lg bg-transparent font-poppins items-center">
        {user}
      </td>
      <td
        className={clsx("px-3 py-1.5 rounded-lg bg-transparent font-poppins")}
      >
        {email}
      </td>
      <td
        className={clsx("px-3 py-1.5 rounded-lg bg-transparent font-poppins")}
      >
        {role}
      </td>
      <td className=" text-left px-3 py-1.5 rounded-lg bg-transparent font-poppins">
        {groups.map((item, index) => (
          <div key={index}>+ {item.groupName}</div>
        ))}
      </td>
      {/* <td className={clsx("px-3 py-1.5 rounded-lg bg-transparent")}>
        {phoneNumber}
      </td>
      <td className={clsx("px-3 py-1.5 rounded-lg bg-transparent")}>
        {formatDate(birthDate)}
      </td> */}
      <td className={clsx("px-3 py-1.5 rounded-lg bg-transparent")}>
        <div
          onClick={setOpenDeactive}
          className="cursor-pointer flex items-center justify-center"
        >
          {isActive ? <IconActive /> : <IconDeactive />}
        </div>
      </td>
      <td className="px-3 py-1.5 rounded-lg bg-transparent">
        <div
          onClick={() => {
            setOpenAssign(true);
            setUserSelected(item);
          }}
          className="cursor-pointer flex items-center justify-center"
        >
          <IconAssign />
        </div>
        <Dialog.Root open={openDeactive} onOpenChange={setOpenDeactive}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-[#D9D9D950]" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[638px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white focus:outline-none flex flex-col border-2 border-[#BFBFBF]">
              <div className="p-10">
                <h6 className="text-xl xl:text-3xl font-semibold">
                  {isActive ? "Deactive User" : "Active User"}
                </h6>

                <div className="flex space-x-5 xl:space-x-8 items-center mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                  >
                    <path
                      d="M3.33301 69.9998L39.9997 6.6665L76.6663 69.9998H3.33301ZM11.9997 64.9998H67.9997L39.9997 16.6665L11.9997 64.9998ZM40.3476 60.2498C41.0601 60.2498 41.6525 60.0089 42.1247 59.5269C42.5969 59.0449 42.833 58.4477 42.833 57.7353C42.833 57.0228 42.592 56.4304 42.1101 55.9582C41.6281 55.486 41.0309 55.2498 40.3184 55.2498C39.6059 55.2498 39.0136 55.4908 38.5413 55.9728C38.0691 56.4548 37.833 57.052 37.833 57.7644C37.833 58.4769 38.074 59.0693 38.5559 59.5415C39.0379 60.0137 39.6351 60.2498 40.3476 60.2498ZM37.833 50.9998H42.833V32.3332H37.833V50.9998Z"
                      fill="#DE350B"
                    />
                  </svg>
                  <p className="mt-2 text-lg xl:text-2xl">
                    Are you sure to {isActive ? "deactive" : "active"} account
                    with email {email}?
                  </p>
                </div>
                <div className="flex space-x-5 justify-end w-full mt-6 xl:mt-10">
                  <button
                    className={clsx(
                      "text-sm xl:text-lg w-[115px] py-1.5 text-white focus:outline-none border-0 font-semibold",
                      isActive ? "bg-[#DE350B]" : "bg-green-500"
                    )}
                    onClick={handleSubmit}
                  >
                    {isActive ? "Deactive" : "Active"}
                  </button>
                  <button
                    className="text-sm xl:text-lg w-[115px] py-1.5 text-black bg-[#D9D9D9] focus:outline-none border-0 font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDeactive(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </td>
      <td className={clsx("px-3 py-1.5 rounded-lg bg-transparent")}>
        <div
          onClick={() => {
            setOpenAddGroup(true);
            setUserSelected(item);
          }}
          className="cursor-pointer flex items-center justify-center"
        >
          <IconGroupAdd />
        </div>
      </td>
    </tr>
  );
};

const TableUsers = ({
  data,
  setCurrentUsers,
  setCurrentRoles,
  setCurrentGroups,
  getAllUsers,
}) => {
  const [open, setOpen] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [userSelected, setUserSelected] = useState([]);
  console.log("===>data in Table User", data);
  return (
    <div className="mt-8 xl:mt-16 flex-1 border border-black rounded-lg bg-[#E5F3F3] px-10 py-8 max-h-[70vh] overflow-y-scroll">
      <table className={clsx(styles.table, "w-full text-left")}>
        <tr>
          <th>User</th>
          <th>Work Email</th>
          <th>Role</th>
          <th>Group</th>
          <th>Active</th>
          <th>Assign</th>
          <th>Action</th>
        </tr>
        {data.map((item, index) => (
          <TableItem
            key={index}
            item={item}
            setCurrentUsers={setCurrentUsers}
            setCurrentRoles={setCurrentRoles}
            currentIndex={index}
            setOpenAssign={setOpenAssign}
            setUserSelected={setUserSelected}
            setOpenAddGroup={setOpenAddGroup}
          />
        ))}
      </table>

      <FormAssignRole
        open={openAssign}
        setOpen={setOpenAssign}
        roleData={setCurrentRoles}
        selectedUser={userSelected}
        getAllUsers={getAllUsers}
      />

      <FormAddUserToGroup
        open={openAddGroup}
        setOpen={setOpenAddGroup}
        groupData={setCurrentGroups}
        selectedUser={userSelected}
        getAllUsers={getAllUsers}
      />
    </div>
  );
};

export default TableUsers;
