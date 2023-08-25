import image from "../../../../assets/images";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { GrServices } from "react-icons/gr";
import classNames from "classnames/bind";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdQueryStats, MdOutlineLabelImportant } from "react-icons/md";
import {RxDashboard} from 'react-icons/rx';
import {HiOutlineDocumentReport} from 'react-icons/hi';
import QueryCategory from "./QueryCategory";
import ServiceFeature from "./ServiceFeature";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { URL } from "../../../../utils/Url";
import useAuth from "../../../../hooks/useAuth";
import ManageQuery from "./ManageQuery";
import TeamQuery from "./TeamQuery";
import Swal from "sweetalert2";
import Reports from "./Reports";
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

const SidebarOver = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 14%;
  background: #f4f7ff;
  display: flex;
  flex-direction: column;
`;

const TabSelect = styled.div`
  position: absolute;
  width: 50%;
  height: 2.5px;
  background: #42526e;
  left: ${({ queryTab }) => (queryTab ? "0" : "50%")};
  bottom: 0;
  transition: 350ms;
`;
function Sidebar() {
  const [profile, setProfile] = useState(false);
  const [queryTab, setQueryTab] = useState(true);
  const [currentSidebar, setCurrentSidebar] = useState(0);
  const [queriesData, setQueriesData] = useState([]);
  const axiosInstance = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [userInformation, setUserInformation] = useState({});

  const [queryType, setQueryType] = useState("");
  const showQueryTab = (queryCondition) => {
    setQueryTab(queryCondition);
    if (queryCondition) changeSidebar(0);
    else changeSidebar(3);
  };

  const changeSidebar = (changeIndex) => {
    setCurrentSidebar(changeIndex);
  };
  useEffect(() => {
    // Gọi API để lấy Thông tin Users từ DB
    const fetchUserById = async () => {
      try {
        const response = await axiosInstance.post(
          `${URL.USER_URL}/get/${auth.userId}`
        );
        setUserInformation({
          avatar: response.data.avatar,
          userName: response.data.fullName,
          roleName: auth.roleName,
        });
      } catch (error) {
        console.error("Error get user information:", error);
      }
    };
    const requester = { requester: auth?.email, requestTicketId: "" };
    const apiGetRequestTicketsUrl = `${URL.QUERY_URL}/getforuser/${auth?.userId}`;
    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        //--------------Get query for user
        axiosInstance
          .get(apiGetRequestTicketsUrl)
          .then((response) => {
            //console.log(response.data);
            const dataQueries = response.data.map((item) => ({
              queryId: item.queryId,
              queryName: item.queryName,
              isTeamQuery: item.isTeamQuery,
              queryStatement: item.queryStatement,
              queryType: item.queryType,
            }));
            setQueriesData(dataQueries);
            //console.log(queriesData);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
              showCancelButton: true,
              cancelButtonText: "Cancel",
            });
          });
        Swal.close();
      } catch (error) {
        // Handle errors if needed
        console.log(error);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    };
    fetchData();
    fetchUserById();
  }, [axiosInstance]);
  const queryData = (type, id) => {
    console.log(`query${type} - ${id}`);
    navigate(`/admin/${type}/${id}`);
  };
  const sideBar = [
    <QueryCategory changeSidebar={changeSidebar} setQueryType={setQueryType} />,
    <ServiceFeature changeSidebar={changeSidebar} />,
    <ManageQuery
      changeSidebar={changeSidebar}
      type={queryType}
      queries={queriesData}
      queryFnc={queryData}
    />,
    <TeamQuery />,
    <Reports changeSidebar={changeSidebar}/>
  ];

  const handleLogout = () => {
    // Thực hiện xóa giá trị trong auth
    setAuth(null); // Hoặc bạn có thể đặt lại thành giá trị mặc định cho auth, ví dụ: setAuth({userId: null, roleName: null, token: null})

    // Điều hướng về trang login
    navigate("/login");
  };

  const handleGoToProfile = () => {
    navigate("/profile");
  };
  return (
    <SidebarOver>
      <div className="w-full h-[5%] flex relative bg-[#DCE4FF]">
        <div
          className="h-[full] w-[50%] flex justify-center items-center text-[#42526E] text-[1.4rem] cursor-pointer"
          onClick={() => showQueryTab(true)}
        >
          <MdQueryStats />
        </div>
        <div
          className="h-[full] w-[50%] flex justify-center items-center text-[#42526E] text-[1.4rem] cursor-pointer"
          onClick={() => showQueryTab(false)}
        >
          <MdOutlineLabelImportant />
        </div>
        <TabSelect queryTab={queryTab} />
      </div>
      {sideBar[currentSidebar]}
      <div className="grow-0 shrink-0 h-[30%] border-t-2 border-[#C5C0C0] bg-[#fff] pt-[0.5rem] pl-[1.25rem] flex flex-col justify-end">
        
        <div
          className="flex mb-[1rem] cursor-pointer"
        >
          <RxDashboard className="text-[1.5rem] text-[#000]" />
          <h3 className="ml-[1rem] text-[#8D8888]">Dashboard</h3>
        </div>

        <div
          onClick={() => changeSidebar(4)}
          className="flex mb-[1rem] cursor-pointer"
        >
          <HiOutlineDocumentReport className="text-[1.5rem] text-[#000]" />
          <h3 className="ml-[1rem] text-[#8D8888]">Report</h3>
        </div>

        <div
          onClick={() => changeSidebar(1)}
          className="flex mb-[1rem] cursor-pointer"
        >
          <GrServices className="text-[1.5rem] text-[#42526E]" />
          <h3 className="ml-[1rem] text-[#8D8888]">Service Setting</h3>
        </div>

        <span className={cx("switch")}>
          <input type="checkbox" id="switcher" />
          <label htmlFor="switcher"></label>
        </span>

        

        <div
          onClick={(e) => setProfile(!profile)}
          className="w-full h-[35%] flex justify-start items-center mt-[0.5rem] cursor-pointer relative"
        >
          {/* {console.log(userInformation)} */}
          <div className="w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src={userInformation.avatar || image.avatar2}
              alt=""
            />
          </div>

          <div className="ml-[0.7rem] flex justify-center items-start flex-col leading-none">
            <div>
              <span className="text-[0.9rem] font-medium">
                {userInformation.userName || "Tu Doan"}
              </span>
            </div>
            <div>
              <span className="text-[0.7rem] text-[#686868]">
                {userInformation.roleName || "Administrator"}
              </span>
            </div>
          </div>

          {profile && (
            <div className="border-2 text-[#42526E] font-medium text-[1rem]  shadow-md flex flex-col absolute bottom-0 right-0 w-[8rem] translate-x-[100%] bg-[#ffffff] z-[9999] rounded-[5px]">
              <div
                onClick={handleGoToProfile}
                className="border-b-2 mt-[0.5rem]"
              >
                <span className="ml-[1.25rem]">Profile</span>
              </div>
              <div onClick={handleLogout} className="mb-[0.5rem]">
                <span className="ml-[1.25rem]">Log out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarOver>
  );
}

export default Sidebar;
