import React from "react";
import { BiErrorAlt } from "react-icons/bi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import {
  MdPublishedWithChanges,
  MdOutlineDangerous,
  MdOutlineDifference,
  MdOutlineDesignServices,
  MdElectricalServices
} from "react-icons/md";

export const SidebarData = [
  {
    title: "Incidents",
    path: "",
    icon: <BiErrorAlt />,
    closedIcon: <IoMdArrowDropdown />,
    openedIcon: <IoMdArrowDropup />,
  },
  {
    title: "Changes",
    path: "",
    icon: <MdPublishedWithChanges />,
    closedIcon: <IoMdArrowDropdown />,
    openedIcon: <IoMdArrowDropup />,
  },
  {
    title: "Problems",
    path: "",
    icon: <MdOutlineDangerous />,
    closedIcon: <IoMdArrowDropdown />,
    openedIcon: <IoMdArrowDropup />,
  },
  {
    title: "Abnormals",
    path: "",
    icon: <MdOutlineDifference />,
    closedIcon: <IoMdArrowDropdown />,
    openedIcon: <IoMdArrowDropup />,
  },
  {
    title: "Service Ticket",
    path: "",
    icon: <MdOutlineDesignServices />,
    closedIcon: <IoMdArrowDropdown />,
    openedIcon: <IoMdArrowDropup />,
    subNav: [
        {
            title: 'Service 1',
            path:'',
            icon: <MdElectricalServices/>
        },
        {
            title: 'Service 2',
            path:'',
            icon: <MdElectricalServices/>
        },
        {
            title: 'Service 3',
            path:'',
            icon: <MdElectricalServices/>
        },
        {
            title: 'Service 4',
            path:'',
            icon: <MdElectricalServices/>
        },
        {
            title: 'Service 5',
            path:'',
            icon: <MdElectricalServices/>
        },
    ]
  },
];
