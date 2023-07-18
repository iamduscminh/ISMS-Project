import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import CardItem from "../../components/Elements/CardItem";
import IconTag from "../../components/Elements/IconTag";

function Catalog() {
  const [requestTypes, setRequestTypes] = useState([]);
  const requestTypeTemp = [
    { id: "1", requestTypeName: "Get a guest wifi account" },
    { id: "2", requestTypeName: "Request a new account" },
    { id: "3", requestTypeName: "Request admin access" },
    { id: "4", requestTypeName: "Request new hardware" },
    { id: "5", requestTypeName: "Set up VPN to the office" },
  ];
  useEffect(() => {
    setRequestTypes(requestTypeTemp);
  }, []);

  return (
    <div className="catalog-container w-full h-full py-5 bg-[#294a8d]">
      <div className="catalog-section mt-4 mx-auto max-w-7xl min-h-screen bg-white rounded shadow">
        <div className="catalog-header w-full bg-[#0e3275] text-white">
          <nav className="catalog-header-nav px-6 pt-3 pb-3">
            <ul className="header-nav-content flex items-center text-[18px]">
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url" to="/">
                  <UnderlineAnimation>Home</UnderlineAnimation>
                </Link>
              </li>

              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url">
                  <span>Service Catalog</span>
                </Link>
              </li>
              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url">
                  <span>All</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="catalog-header-content px-6 pb-3 flex items-center">
            <div className="catalog-header-icon">
              <IconTag
                name={"BsFillInfoSquareFill"}
                className={"h-[50px] w-[50px]"}
              />
            </div>
            <div className="catalog-header-description ml-5">
              <h4 className="text-2xl font-bold">Service Catalog</h4>
              <span>
                Browse the list of services offered and raise a request
              </span>
            </div>
          </div>
        </div>
        <div className="catalog-content p-3 flex">
          <div className="catalog-sidebar w-[25%] py-2 px-3 flex flex-col text-[18px] border-r-2 border-slate-400">
            <div className="catalog-service cursor-pointer px-1 py-2 flex items-center justify-between hover:bg-slate-200">
              <span className="font-bold text-blue-700">
                All Services Items
              </span>
              <IconTag name={"AiOutlineRight"} />
            </div>
            <div className="catalog-service cursor-pointer px-1 py-2 flex items-center justify-between hover:bg-slate-200">
              <span>Computers</span>
            </div>
            <div className="catalog-service cursor-pointer px-1 py-2 flex items-center justify-between hover:bg-slate-200">
              <span>Account and Login</span>
            </div>
            <div className="catalog-service cursor-pointer px-1 py-2 flex items-center justify-between hover:bg-slate-200">
              <span>Network</span>
            </div>
          </div>
          <div className="catalog-requestTypes ml-2">
            <div className="requestType-card grid grid-cols-3 gap-4">
              {requestTypes.map((item, i) => {
                return (
                  <CardItem
                    key={i}
                    url={`/createRequest/${item.id}`}
                    title={item.requestTypeName}
                    description="Send your problem to It Service"
                    iconName={"BsFillInfoSquareFill"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
