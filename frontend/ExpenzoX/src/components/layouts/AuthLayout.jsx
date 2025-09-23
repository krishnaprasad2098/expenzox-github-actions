import React from 'react'
import CARD_2 from"../../assets/images/card2.png";
import {LuTrendingUpDown} from "react-icons/lu";

const AuthLayout = ({children}) => {  
  return <div className="flex"> 
    <div className="w-screen h-screen md:w-[60vw] bg-white dark:bg-gray-900 px-12 pt-8 pb-12">
      <h3 className="text-3xl font-bold text-purple-800 dark:text-purple-500">ExpenzoX</h3>
      <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">Track Smart. Spend Smarter.</p>
      {children}
    </div>

    <div className="hidden md:block w-[40vw] h-screen bg-white overflow-hidden p-8 relative">
      <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 opacity-20"/>
      <div className="w-48 h-48 rounded-[40px] border-[20px] border-purple-600 absolute top-[30%] -right-10 opacity-20"/>
      <div className="w-48 h-48 rounded-[40px] bg-purple-400 absolute -bottom-7 -left-5 opacity-20"/>

      <div className='grid grid-cols-1 z-20'>
        <StatsInfoCard
          icon={<LuTrendingUpDown />}
          label="Track Your Income & Expenses"
          value="4,30,000"
          color="bg-purple-600"
        />
      </div>
      
      <img 
        src={CARD_2}
        className="w-64 lg:w-[90%] absolute bottom-10 shadow-xl"
      />
    </div>
  </div>
};

export default AuthLayout;

const StatsInfoCard = ({icon, label, value, color}) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-lg border border-purple-200 z-10">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full shadow-lg`}>
        {icon}
      </div>
      <div>
        <h6 className='text-sm text-gray-600 mb-1'>{label}</h6>
        <span className='text-[20px] font-medium text-gray-800'>₹{value}</span>
      </div>
    </div>
  );
}