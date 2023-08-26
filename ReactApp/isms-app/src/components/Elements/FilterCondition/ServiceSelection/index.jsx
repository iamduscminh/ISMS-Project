import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { URL } from "../../../../utils/Url";

const ServiceSelection = ({ data, onSelect }) => {
  const axiosInstance = useAxiosPrivate();
  const [serviceItemData, setServiceItemData] = useState();
  const [openCombobox, setOpenCombobox] = useState(false);
  const [serviceRequestValue, setServiceRequestValue] = useState(data.service);

  useEffect(() => {
    const fetchServiceItem = async () => {
      try {
        const response = await axiosInstance.get(
          `${URL.SERVICE_CATEGORY_URL}/getall`
        );
        //console.log(response.data);
        setServiceItemData(response.data);
      } catch (error) {
        console.error("Error Get Data", error);
      }
    };
    fetchServiceItem();
  }, [axiosInstance]);

  const handleUpdate = (checkItem, e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const newValue = [...serviceRequestValue, checkItem];
      setServiceRequestValue(newValue);
      onSelect(newValue);
    } else {
      const newValue = serviceRequestValue.filter(
        (i) => i.serviceCategoryId !== checkItem.serviceCategoryId
      );
      setServiceRequestValue(newValue);
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
        {": " +
          shortenText(
            serviceRequestValue
              .map((obj) => obj["serviceCategoryName"])
              .join(", "),
            40
          )}
      </div>
      {openCombobox && (
        <div className="w-full absolute top-[120%] border z-[10] bg-[#fff] left-[0] rounded-sm px-[1rem] py-[0.5rem]">
          <div className="h-[25vh] overflow-y-scroll">
            {serviceItemData.map((item) => (
              <div key={item.serviceCategoryId} className="flex mt-[0.75rem]">
                {serviceRequestValue
                  .map((obj) => obj["serviceCategoryId"])
                  .includes(item.serviceCategoryId) ? (
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
                {item.icon}
                <h4 className="ml-[0.75rem]">{item.serviceCategoryName}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSelection;
