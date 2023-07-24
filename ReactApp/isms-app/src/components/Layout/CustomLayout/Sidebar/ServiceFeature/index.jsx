import React,{useState} from "react";
import IconTag from "../../../../Elements/IconTag";
import { useNavigate, useLocation } from "react-router-dom";

const ServiceFeature = ({ changeSidebar }) => {
  const [activeService, setActiveService] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  //Hàm này dùng khi chuyển giữa các setting
  const handleActive = (index) => {
    setActiveService(index);
    navigate('/admin/setting/services', {state: {from: location}})
  }
  
  //Hàm này để chuyển về side bar trước đó
  const handleClick = () => {
    changeSidebar(0);
  };

  return (
  <div className="grow shrink w-[full] relative px-[0.5rem] py-[1rem]">
    <div onClick={handleClick} className="w-[full] flex justify-start items-center cursor-pointer hover:bg-[#ebecf0] px-[0.75rem] py-[0.5rem] rounded-sm">
      <IconTag name="BsFillArrowLeftCircleFill" className="text-[1.25rem] text-[#42526E] mr-[1rem]"/>
      <span className="text-[#42526E] text-[0.75rem]">Back to project</span>
    </div>
    <div className="w-full h-[2px] bg-[#ebecf0] mt-[0.5rem]"></div>
    <div className="mt-[1rem] text-[#42526E]">
      <div onClick={()=>handleActive(0)} className={`py-[0.5rem] px-[1rem] hover:bg-[#ebecf0] cursor-pointer ${activeService === 0 ? 'bg-[#ebecf0]' : ''}`}><span>Service Settings</span></div>
      <div onClick={()=>handleActive(1)} className={`py-[0.5rem] px-[1rem] hover:bg-[#ebecf0] cursor-pointer ${activeService === 1 ? 'bg-[#ebecf0]' : ''}`}><span>Request Types</span></div>
    </div>
  </div>
  )
};

export default ServiceFeature;
