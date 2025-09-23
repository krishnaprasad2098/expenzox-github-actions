import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";
import {Navigate, Outlet,useNavigate} from "react-router-dom"

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <SideMenu activeMenu={activeMenu} />
          <Outlet />
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
