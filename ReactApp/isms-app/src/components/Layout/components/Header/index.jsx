import { React, useState, useEffect } from "react";
import image from "../../../../assets/images";
import Dropdown from "../../../Elements/Dropdown";
import { Link } from "react-router-dom";
import IconTag from "../../../Elements/IconTag";

function Header() {
  const [isHeaderScroll, setHeaderScroll] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 0) {
        setHeaderScroll(false);
      } else {
        setHeaderScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //Dropdown variable
  const [openDrNoti, setOpenDrNoti] = useState(false);
  const [openDrProf, setOpenDrProf] = useState(false);
  const handleOpenNoti = () => {
    setOpenDrNoti(!openDrNoti);
  };
  const handleOpenProf = () => {
    setOpenDrProf(!openDrProf);
  };
  const handleDrNotiItem1 = () => {
    // do something
    setOpenDrNoti(false);
    console.log("clicked one");
  };

  const handleDrNotiItem2 = () => {
    // do something
    setOpenDrNoti(false);
    console.log("clicked two");
  };
  return (
    <div
      className={`header-container flex fixed top-0 left-0 ${
        isHeaderScroll ? "bg-[#3E5481]" : "bg-[#294a8d]"
      } w-[100%] h-[56px] justify-between items-center`}
    >
      <div className="header-left-side">
        <Link to={"/"}>
          <div className="header-logo ml-4 w-[100%] flex items-center">
            <img src={image.shortLogo} alt="" className="w-[15%] pr" />
            <div className="text-white text-2xl font-bold">
              <span>QUICK SERVICE</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="header-right-side flex mr-8 ">
        <div className="header-noti mr-2">
          <button className="header-noti-button" onClick={handleOpenNoti}>
            <IconTag
              name={"IoMdNotifications"}
              className={"text-white text-2xl"}
            />
          </button>
          <div className="header-noti-dropdown">
            <Dropdown
              open={openDrNoti}
              menu={[
                <button key="drNoti1" onClick={handleDrNotiItem1}>
                  Option 1
                </button>,
                <button key="drNoti2" onClick={handleDrNotiItem2}>
                  Option 2
                </button>,
              ]}
            />
          </div>
        </div>
        <div className="header-profile">
          <button className="header-profile-button" onClick={handleOpenProf}>
            <IconTag name={"BiUserCircle"} className={"text-white text-2xl"} />
          </button>
          <div className="header-prof-dropdown">
            <Dropdown
              open={openDrProf}
              menu={[
                <button key="drPrf1">Option pr 1</button>,
                <button key="drPrf2">Option pr 2</button>,
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
