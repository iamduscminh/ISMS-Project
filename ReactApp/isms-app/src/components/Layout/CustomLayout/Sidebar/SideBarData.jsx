import React from "react";
import { BiErrorAlt } from "react-icons/bi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import {
  MdPublishedWithChanges,
  MdOutlineDangerous,
  MdOutlineDifference,
  MdOutlineDesignServices,
  MdElectricalServices,
  MdFilterListAlt,
} from "react-icons/md";

export const SidebarData = [
  {
    title: "All Tickets",
    type: "all",
    path: "",
    icon: <MdFilterListAlt />,
    closedIcon: <IoMdArrowDropdown />,
    openedIcon: <IoMdArrowDropup />,
  },
  {
    title: "Incidents",
    type: "incident",
    path: "",
    icon: <BiErrorAlt />,
    closedIcon: <IoMdArrowDropdown />,
    openedIcon: <IoMdArrowDropup />,
  },
  {
    title: "Changes",
    type: "change",
    path: "",
    icon: <MdPublishedWithChanges />,
    closedIcon: <IoMdArrowDropdown />,
    openedIcon: <IoMdArrowDropup />,
  },
  {
    title: "Problems",
    type: "problem",
    path: "",
    icon: <MdOutlineDangerous />,
    closedIcon: <IoMdArrowDropdown />,
    openedIcon: <IoMdArrowDropup />,
  },
  // {
  //   title: "Service Ticket",
  //   path: "",
  //   icon: <MdOutlineDesignServices />,
  //   closedIcon: <IoMdArrowDropdown />,
  //   openedIcon: <IoMdArrowDropup />,
  //   subNav: [
  //       {
  //           title: 'Service 1',
  //           path:'',
  //           icon: <MdElectricalServices/>
  //       },
  //       {
  //           title: 'Service 2',
  //           path:'',
  //           icon: <MdElectricalServices/>
  //       },
  //       {
  //           title: 'Service 3',
  //           path:'',
  //           icon: <MdElectricalServices/>
  //       },
  //       {
  //           title: 'Service 4',
  //           path:'',
  //           icon: <MdElectricalServices/>
  //       },
  //       {
  //           title: 'Service 5',
  //           path:'',
  //           icon: <MdElectricalServices/>
  //       },
  //   ]
  // },
];
