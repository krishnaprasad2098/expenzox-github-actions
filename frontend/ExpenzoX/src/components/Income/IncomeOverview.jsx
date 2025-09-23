import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({transactions, onAddIncome}) => {
    const [chartData, setChartData] = useState([])
  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result)
     return () => {};
    }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg font-medium text-gray-800 dark:text-white">Income Overview</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income
          </p>
        </div>

        <button className="text-white add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg text-white" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;