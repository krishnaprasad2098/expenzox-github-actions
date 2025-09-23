import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700">
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full shadow-lg`}>
        {icon}
      </div>
      <div>
        <h6 className="text-gray-700 dark:text-gray-400 text-sm mb-1">{label}</h6>
        <span className="text-[22px] text-gray-900 dark:text-white font-medium">₹{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;