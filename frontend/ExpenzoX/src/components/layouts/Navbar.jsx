import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(true);

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <div className="flex items-center gap-5">
        <button 
          className="block lg:hidden text-gray-800 dark:text-white"
          onClick={() => {
            setOpenSideMenu((prev)=>!prev);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-lg font-medium text-gray-800 dark:text-white">ExpenzoX</h2>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white dark:bg-gray-800">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
