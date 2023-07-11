import image from "../../../../assets/images";
import React, { useState, useRef, useEffect } from "react";
import Switch from "react-switch";
import styles from "./Sidebar.module.scss";
import { GrServices } from "react-icons/gr";
import classNames from "classnames/bind";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarData } from "./SideBarData";
import { IconContext } from "react-icons/lib";
import { FiArrowRightCircle } from "react-icons/fi";
import { BsArrowRightCircle } from "react-icons/bs";
import { MdQueryStats, MdOutlineLabelImportant } from 'react-icons/md';
import SubMenu from "./SubMenu";
import Tippy from "@tippyjs/react";


const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const cx = classNames.bind(styles);
const NavIcon = styled(Link)`
  margin-left: 2rem;
  color: #fff;
  font-size: 1rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #F4F7FF;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  transition: 350ms;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SidebarOver = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 14%;
  background: #F4F7FF;
  display:flex;
  flex-direction: column;
`

const TabSelect = styled.div`
  position: absolute;
  width: 50%;
  height: 2.5px;
  background: #42526E;
  left: ${({ queryTab }) => (queryTab ? '0' : '50%')};
  bottom: 0;
  transition: 350ms;
`
function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [queryTab, setQueryTab] = useState(true);
  const showQueryTab = (queryCondition) => {
    setQueryTab(queryCondition);
  }

  return (
    <SidebarOver>
      <div className="w-full h-[5%] flex relative bg-[#DCE4FF]">
        <div className="h-[full] w-[50%] flex justify-center items-center text-[#42526E] text-[1.4rem] cursor-pointer" onClick={() => showQueryTab(true)}>
          <MdQueryStats />
        </div>
        <div className="h-[full] w-[50%] flex justify-center items-center text-[#42526E] text-[1.4rem] cursor-pointer" onClick={() => showQueryTab(false)}>
          <MdOutlineLabelImportant />
        </div>
        <TabSelect queryTab={queryTab} />
      </div>
      <div className="grow shrink w-[full] relative">
        <IconContext.Provider value={{ color: "#686868" }}>
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
      </div>
      <div className="grow-0 shrink-0 h-[21%] border-t-2 border-[#C5C0C0] bg-[#fff] pt-[0.5rem] pl-[1.25rem] flex flex-col justify-end">
        <div className="flex mb-[1rem] cursor-pointer">
          <GrServices className="text-[1.5rem] text-[#42526E]" />
          <h3 className="ml-[1rem] text-[#8D8888]">Service Setting</h3>
        </div>
        <span className={cx("switch")}>
          <input type="checkbox" id="switcher" />
          <label htmlFor="switcher"></label>
        </span>

        <div className="w-full h-[35%] flex justify-start items-center mt-[0.5rem] cursor-pointer">
          <div className="w-[1.75rem] h-[1.75rem rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src={image.avatar2}
              alt=""
            />
          </div>

          <div className="ml-[0.7rem] flex justify-center items-start flex-col leading-none">
            <div>
              <span className="text-[0.9rem] font-medium">Tu Doan</span>
            </div>
            <div>
              <span className="text-[0.7rem] text-[#686868]">
                Administrator
              </span>
            </div>
          </div>
        </div>

      </div>
    </SidebarOver>
  );
}

export default Sidebar;
