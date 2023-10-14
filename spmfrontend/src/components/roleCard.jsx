import React from 'react';
import { NavLink } from 'react-router-dom';

const RoleCard = () => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md p-6 mb-6">
      <div className="flex justify-between mb-4">
        <div className="w-9/12 pr-4 border-r">
        <div className="font-bold text-xl mb-2">%Role Name%</div>
          <div className="mb-2">ID: %Role listing id%</div>
          <div className="mb-2">Department: %Department Name%</div>
          <div className="text-gray-700 text-base mb-4">
            %Description of the role goes here.%
          </div>
          <label className="text-gray-500">% Skills Matched</label>
          <div className="bg-gray-200 h-4 w-full rounded-full"> 
            <div className="bg-blue-500 h-full w-3/4 rounded-full"></div>
          </div>
        </div>
        <div className="w-3/12 pl-4 text-center">
          <div className="mt-6 mb-4 font-semibold">Date of Listing: 2023-09-15</div>
          <div className="mb-6 font-semibold">Deadline: 2023-09-29</div>
          <button className="mx-2 px-4 py-2 bg-[#62b6cb] text-white hover:bg-[#1b4965] rounded-full shadow-sm">Apply</button>
          <NavLink to="/viewdetails" ><button className="mx-2 px-4 py-2 bg-[#62b6cb] text-white hover:bg-[#1b4965] rounded-full shadow-sm">View Details</button></NavLink>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
