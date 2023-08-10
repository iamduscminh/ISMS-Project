import React, {useState} from 'react'

const StatusSelection = ({statusData, data, onSelect}) => {
    const [openCombobox, setOpenCombobox] = useState(false);
    const [statusValue, setStatusValue] = useState(data.status);
  
    const handleUpdate = (checkItem, e) => {
      const isChecked = e.target.checked;
  
      if (isChecked) {
        const newValue = [...statusValue, checkItem.status]
        setStatusValue(newValue);
        onSelect(newValue);
      } else {
        const newValue = statusValue.filter((i) => i !== checkItem.status)
        setStatusValue(newValue);
        onSelect(newValue);
      }
    };
  
    return (
      <div className="bg-[#fff] rounded-tr-md rounded-br-md border relative px-[1rem]">
        <div
          className="w-full text-[#42526E]"
          onClick={() => setOpenCombobox((prev) => !prev)}
        >
          {": " + statusValue.join(", ")}
        </div>
        {openCombobox && (
          <div className="w-full absolute top-[120%] border z-[10] bg-[#fff] left-[0] rounded-sm px-[1rem] py-[0.5rem]">
            {statusData.map((item) => (
              <div key={item.id} className="flex mt-[0.75rem]">
                {statusValue.includes(item.status) ? (
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
                <h4 className="ml-[0.75rem]">{item.status}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default StatusSelection