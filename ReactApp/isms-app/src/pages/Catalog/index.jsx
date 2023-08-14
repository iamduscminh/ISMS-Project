import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardItem from "../../components/Elements/CardItem";
import IconTag from "../../components/Elements/IconTag";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { axiosPrivate } from "../../utils/axiosConfig";
function Catalog() {
  const { auth } = useAuth();
  const [services, setServices] = useState([]);
  const [requestTypes, setRequestTypes] = useState([]);
  const [requestTypesBySvc, setRequestTypesBySvc] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  //API CONFIG
  const token = auth?.accessToken;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    withCredentials: true,
  };
  console.log(token);
  //CALL API GET ALL SERVICE
  useEffect(() => {
    const apiGetSvcCategoryUrl = "api/ServiceCategories/getall";
    const apiGetRequestTypesUrl = "api/ServiceItems/getall";
    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        //--------------Get serrvices
        axiosPrivate
          .get(apiGetSvcCategoryUrl, { headers })
          .then((response) => {
            const data = response.data.map((item, i) => ({
              id: item.serviceCategoryId,
              serviceName: item.serviceCategoryName,
              description: item.description,
            }));
            setServices([
              { id: 0, serviceName: "All Services Items" },
              ...data,
            ]);
            setSelectedService({ id: 0, serviceName: "All Services Items" });
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
          });
        Swal.close();

        //-------------Get request type
        axiosPrivate
          .get(apiGetRequestTypesUrl, { headers })
          .then((response) => {
            const data = response.data.map((item, i) => ({
              id: item.serviceItemId,
              requestTypeName: item.serviceItemName,
              description: item.description,
              serviceId: item?.serviceCategoryEntity?.serviceCategoryId,
              iconDisplay: item?.iconDisplay,
            }));

            setRequestTypes(data);
            setRequestTypesBySvc(data);
            //console.log(requestTypesBySvc);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
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
  }, []);

  const serviceSelectedClick = (id) => {
    let selectedService = services.find((item) => item.id == id);
    setSelectedService(selectedService);
    const filterRequestTypes = requestTypes.filter(
      (x) => id == 0 || x.serviceId == id
    );
    setRequestTypesBySvc(filterRequestTypes);
  };
  return (
    <div className="catalog-container w-full h-full py-5 bg-[#294a8d]">
      <div className="catalog-section mt-4 mx-auto max-w-7xl min-h-screen bg-white rounded shadow">
        <div className="catalog-header w-full bg-[#0e3275] text-white">
          <nav className="catalog-header-nav px-6 pt-3 pb-3">
            <ul className="header-nav-content flex items-center text-[18px]">
              <li className="header-nav-item ml-1">
                <Link
                  className="header-nav-url hover:underline hover:text-white"
                  to="/"
                >
                  Home
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
                  <span>{selectedService?.serviceName}</span>
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
            {services.map((item, i) => (
              <div
                key={i}
                className="catalog-service cursor-pointer px-1 py-2 flex items-center justify-between border-b-2 hover:bg-slate-200"
                onClick={serviceSelectedClick.bind(null, item.id)}
              >
                <span
                  className={` ${
                    item.id == selectedService.id
                      ? "font-bold text-blue-700"
                      : ""
                  }`}
                >
                  {item.serviceName}
                </span>
                {item.id == selectedService.id && (
                  <IconTag name={"AiOutlineRight"} />
                )}
              </div>
            ))}
          </div>
          <div className="catalog-requestTypes ml-2">
            <div className="requestType-card grid grid-cols-3 gap-4">
              {requestTypesBySvc.map((item, i) => {
                return (
                  <CardItem
                    key={i}
                    url={`/createRequest/${item.id}`}
                    title={item.requestTypeName}
                    description={item.description}
                    iconName={`${item.iconDisplay}`}
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
