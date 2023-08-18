import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { URL } from "../../../../utils/Url";

const UserSelection = ({ data, onSelect }) => {
  const axiosInstance = useAxiosPrivate();
  const [userData, setUserData] = useState();
  const [openCombobox, setOpenCombobox] = useState(false);
  const [userValue, setUserValue] = useState(data);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await axiosInstance.get(`${URL.USER_URL}/getall`);
        //console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error Get Data", error);
      }
    };
    fetchAllUser();
  }, [axiosInstance]);

  const handleUpdate = (checkItem, e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const newValue = [...userValue, checkItem.fullName];
      setUserValue(newValue);
      onSelect(newValue);
    } else {
      const newValue = userValue.filter((i) => i !== checkItem.fullName);
      setUserValue(newValue);
      onSelect(newValue);
    }
  };

  function shortenText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength - 3) + "...";
  }

  return (
    <div className="bg-[#fff] rounded-tr-md rounded-br-md border relative px-[1rem]">
      <div
        className="w-full text-[#42526E] overflow-hidden"
        onClick={() => setOpenCombobox((prev) => !prev)}
      >
        {": " + shortenText(userValue.join(", "), 40)}
      </div>
      {openCombobox && (
        <div className="w-full absolute top-[120%] border z-[10] bg-[#fff] left-[0] rounded-sm px-[1rem] py-[0.5rem]">
          <div className="h-[25vh] overflow-y-scroll">
            {userData.map((item) => (
              <div key={item.email} className="flex mt-[0.75rem]">
                {userValue.includes(item.fullName) ? (
                  <input
                    checked
                    onChange={(e) => handleUpdate(item, e)}
                    type="checkbox"
                    className="mr-[1rem]"
                  />
                ) : (
                  <input
                    onChange={(e) => handleUpdate(item, e)}
                    type="checkbox"
                    className="mr-[1rem]"
                  />
                )}
                <div className="w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden mr-[0.5rem]">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={item.avatar}
                    alt=""
                  />
                </div>
                <h4 className="ml-[0.75rem]">{item.fullName}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSelection;
