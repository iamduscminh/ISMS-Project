import React, { useState, useEffect } from "react";
import { IconContext } from "react-icons/lib";
import styled from "styled-components";
import { SidebarData } from "../SideBarData";
import SubMenu from "../SubMenu";
import ServiceFeature from "../ServiceFeature";
import useAuth from "../../../../../hooks/useAuth";
import { URL } from "../../../../../utils/Url";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { set } from "date-fns";
import { MdElectricalServices, MdOutlineDesignServices } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

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

const QueryCategory = ({ changeSidebar, setQueryType }) => {
  const axiosInstance = useAxiosPrivate();
  const { auth } = useAuth();

  const [serviceCategories, setServiceCategories] = useState({});

  //Lấy dữ liệu của các Service Categories
  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        const response = await axiosInstance.get(
          `${URL.SERVICE_CATEGORY_URL}/getall`
        );
        console.log(1);
        console.log(response.data);
        setServiceCategories({
          title: "Service Ticket",
          path: "",
          icon: <MdOutlineDesignServices />,
          closedIcon: <IoMdArrowDropdown />,
          openedIcon: <IoMdArrowDropup />,
          subNav: response.data.map((category, index) => ({
            title: category.serviceCategoryName,
            path: ``,
            icon: <MdElectricalServices />,
            cateId: category.serviceCategoryId,
          })),
        });
      } catch (error) {
        console.error("Error Get Service Categories", error);
      }
    };
    fetchServiceCategories();
  }, [axiosInstance]);

  const sideBar = [...SidebarData, serviceCategories];

  const [listNumberOfTicket, setListNumberOfTicket] = useState({});
  useEffect(() => {
    // Gọi API để lấy Thông tin Users từ DB
    const fetchUserById = async () => {
        try {
          const response = await axiosInstance.get(
            `${URL.DASHBOARD_URL}/countRequestTicket`
          );
          console.log(2);
          console.log(response.data);
          setListNumberOfTicket(response.data);
        } catch (error) {
          console.error("Error Get Data", error);
        }
    };

    fetchUserById();
  }, [axiosInstance]);

  return (
    <div className="grow shrink w-[full] relative">
      <IconContext.Provider value={{ color: "#686868" }}>
        <SidebarNav>
          <SidebarWrap>
            {sideBar.map((item, index) => {
              return (
                <SubMenu
                  item={item}
                  key={index}
                  listNumberTicket={listNumberOfTicket}
                  changeSidebar={changeSidebar}
                  setQueryType={setQueryType}
                />
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  );
};

export default QueryCategory;
