import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled.div`
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
    background: #f2f2f2;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;
const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #f4f7ff;
  height: 45px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #686868;
  font-size: 0.85rem;

  &:hover {
    background: #f2f2f2;
    cursor: pointer;
    color: #686868;
  }

  > div {
    margin-left: auto;
    margin-right: 0.25rem;
  }
`;

const SubMenu = ({ item, listNumberTicket, changeSidebar, setQueryType }) => {
  let numberTicket;
  if (item.title === "All Tickets") {
    numberTicket =
      listNumberTicket.requestTicket +
      listNumberTicket.change +
      listNumberTicket.problem;
  } else if (item.title === "Changes") {
    numberTicket = listNumberTicket.change;
  } else if (item.title === "Incidents") {
    numberTicket = listNumberTicket.incident;
  } else if (item.title === "Problems") {
    numberTicket = listNumberTicket.problem;
  }

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const handleChangeTab = () => {
    if (item.subNav) {
      showSubnav();
    } else {
      setQueryType(item.type);
      changeSidebar(2);
    }
  };

  const handleChangeTabSubMenu = (data) => {
    setQueryType(data);
    changeSidebar(2);
  };
  return (
    <>
      <SidebarLink onClick={handleChangeTab}>
        <div className="flex items-center text-[#686868] text-[0.85rem]">
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav ? (
            item.openedIcon
          ) : item.subNav ? (
            item.closedIcon
          ) : (
            <div className="rounded-full bg-[#42526E] w-[1.25rem] aspect-square] text-[#fff] text-center text-[0.75rem]">
              {"" + numberTicket}
            </div>
          )}
        </div>
      </SidebarLink>
      {subnav && (
        <div className="overflow-y-auto max-h-52">
          {item.subNav.map((item, index) => {
            return (
              <DropdownLink
                to={item.path}
                key={index}
                onClick={() => handleChangeTabSubMenu(item.type)}
              >
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
                <div className="rounded-full bg-[#42526E] w-[1.25rem] aspect-square] text-[#fff] text-center text-[0.75rem]">
                  {listNumberTicket.serviceRequests[item.cateId]}
                </div>
              </DropdownLink>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SubMenu;
