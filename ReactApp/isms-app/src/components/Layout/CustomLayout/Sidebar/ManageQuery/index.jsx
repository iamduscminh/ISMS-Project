import { React, useState, useEffect } from "react";
import IconTag from "../../../../Elements/IconTag";
import { MdManageSearch } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../../hooks/useAuth";
import { URL } from "../../../../../utils/Url";
const ManageQuery = ({ changeSidebar, type, queries, queryFnc }) => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const { auth } = useAuth();

  const [queriesData, setQueriesData] = useState([]);
  const handleClick = () => {
    changeSidebar(0);
  };

  const handleQueryData = (e) => {
    const idQuery = e.target.getAttribute("id");
    queryFnc(type, idQuery);
  };
  const handleCreateQuery = () => {
    navigate(`/admin/query/${type}/create`);
  };
  useEffect(() => {
    const fetchData = () => {
      const dataQueries = queries.filter((q) => q.queryType == type);
      setQueriesData(dataQueries);
      //console.log(queriesData);
    };
    fetchData();
  }, []);

  return (
    <div className="grow shrink w-[full] relative px-[0.5rem] py-[1rem]">
      <div
        onClick={handleClick}
        className="w-[full] flex justify-start items-center cursor-pointer hover:bg-[#ebecf0] px-[0.75rem] py-[0.5rem] rounded-sm"
      >
        <IconTag
          name="BsFillArrowLeftCircleFill"
          className="text-[1.25rem] text-[#42526E] mr-[1rem]"
        />
        <span className="text-[#42526E] text-[0.75rem]">Back to project</span>
      </div>
      <div className="w-full h-[2px] bg-[#ebecf0] mt-[0.5rem]"></div>
      <div className="px-[0.75rem] py-[0.5rem] ">
        <h1 className="font-medium text-[#42526E] ">{type}</h1>
        <div
          onClick={handleQueryData}
          className="w-[full] flex justify-start items-center cursor-pointer hover:bg-[#ebecf0] px-[0.75rem] py-[0.5rem] rounded-sm"
        >
          <span className="text-[#42526E] text-[0.8rem]">Query All</span>
        </div>

        <h1 className="font-medium text-[#42526E] mt-[1rem]">Your Query</h1>
        <div>
          {queriesData &&
            queriesData.map((item) => {
              return (
                <div
                  key={item.queryId}
                  onClick={handleQueryData}
                  id={item.queryId}
                  className="w-[full] flex justify-start items-center cursor-pointer hover:bg-[#ebecf0] px-[0.75rem] py-[0.5rem] rounded-sm"
                >
                  <span className="text-[#42526E] text-[0.8rem]">
                    {item.queryName}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      <div className="w-full h-[2px] bg-[#ebecf0] mt-[0.5rem]"></div>

      <div>
        <div
          onClick={handleCreateQuery}
          className="w-[full] flex justify-start items-center cursor-pointer hover:bg-[#ebecf0] px-[0.75rem] py-[0.5rem] rounded-sm"
        >
          <MdManageSearch className="text-[1.25rem] text-[#42526E] mr-[1rem]" />
          <span className="text-[#42526E] text-[0.75rem]">Create Query</span>
        </div>
      </div>
    </div>
  );
};

export default ManageQuery;
