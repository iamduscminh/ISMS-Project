import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { URL } from "../../../../utils/Url";

const RequestTypeSelection = ({ data, onSelect }) => {
  const axiosInstance = useAxiosPrivate();
  const [serviceItemData, setServiceItemData] = useState();
  const [openCombobox, setOpenCombobox] = useState(false);
  const [serviceRequestValue, setServiceRequestValue] = useState(
    data.requestType
  );

  useEffect(() => {
    console.log(`checkkkk ${serviceRequestValue}`);
    const fetchServiceItem = async () => {
      try {
        const response = await axiosInstance.get(
          `${URL.SERVICE_ITEM_URL}/getall`
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
      const newValue = [...serviceRequestValue, checkItem.serviceItemName];
      setServiceRequestValue(newValue);
      onSelect(newValue);
    } else {
      const newValue = serviceRequestValue.filter(
        (i) => i !== checkItem.serviceItemName
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
        {": " + shortenText(serviceRequestValue.join(", "), 40)}
      </div>
      {openCombobox && (
        <div className="w-full absolute top-[120%] border z-[10] bg-[#fff] left-[0] rounded-sm px-[1rem] py-[0.5rem]">
          <div className="h-[25vh] overflow-y-scroll">
            {serviceItemData.map((item) => (
              <div key={item.serviceItemId} className="flex mt-[0.75rem]">
                {serviceRequestValue.includes(item.serviceItemId) ? (
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
                <h4 className="ml-[0.75rem]">{item.serviceItemName}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestTypeSelection;
