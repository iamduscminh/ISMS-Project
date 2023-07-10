import React, {useState} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  list-style: none;
  height: 45px;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    background: #F2F2F2;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;
const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #F4F7FF;
  height:45px;
  padding-left: 3rem;
  display:flex;
  align-items:center;
  text-decoration:none;
  color: #686868;
  font-size: 0.85rem;

  &:hover{
    background: #F2F2F2;
    cursor:pointer;
    color: #686868;
  }

  > div {
    margin-left: auto;
    margin-right:0.25rem;
  }
`

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div className="flex items-center text-[#686868] text-[0.85rem]">
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.openedIcon
            : item.subNav
            ? item.closedIcon
            : <div className="rounded-full bg-[#42526E] w-[1.25rem] aspect-square] text-[#fff] text-center text-[0.75rem]">1</div>}
        </div>
      </SidebarLink>
      {subnav && (
        <div className="overflow-y-auto max-h-52">
          {item.subNav.map((item, index) => {
            return (
              <DropdownLink to={item.path} key={index}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
                <div className="rounded-full bg-[#42526E] w-[1.25rem] aspect-square] text-[#fff] text-center text-[0.75rem]">1</div>
              </DropdownLink>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SubMenu;
