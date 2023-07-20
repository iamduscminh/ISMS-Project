import React, {useState} from 'react';
import { IconContext } from "react-icons/lib";
import styled from "styled-components";
import { SidebarData } from "../SideBarData";
import SubMenu from "../SubMenu";
import ServiceFeature from '../ServiceFeature';

const SidebarNav = styled.nav`
  background: #f4f7ff;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  transition: 350ms;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const QueryCategory = ({changeSidebar}) => {
    const handleClick = () => {
        changeSidebar(1);
    }
  return (
    <div className="grow shrink w-[full] relative">
        <IconContext.Provider value={{ color: "#686868" }}>
          <SidebarNav>
            <SidebarWrap>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
      </div>
  )
}

export default QueryCategory
