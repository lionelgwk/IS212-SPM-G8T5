import React from "react";
import { useParams } from "react-router-dom";

const Viewdetails = () => {
  const { id } = useParams();

  // Get the role_status from database
  const role_status = "Active";
  const statusClass =
    role_status === "Active"
      ? "text-green-600 font-bold"
      : "text-red-600 font-bold";

  return (
    <div className="bg-[#bee9e8] p-4">
      <div className="bg-white rounded p-4 mb-4 shadow-md">
        <div className="col-span-1 text-center font-bold text-xl mb-5 pb-2 border-b">
          %Role Name%
        </div>
        <div className="col-span-1 text-black font-medium mb-5">
          Role Listing ID: {id}
        </div>
        <div className="col-span-1 text-[#1b4965] font-medium">
          Roles & Responsibilities
        </div>
        <div className="col-span-1 mb-5">%Role Description%</div>
        <div className="col-span-1 text-[#1b4965] font-medium">Status</div>
        <div className={`col-span-1 ${statusClass} mb-1`}>{role_status}</div>
      </div>

      <div className="bg-white rounded p-4 mb-4 mt-10 shadow-md">
        <div className="col-span-1 text-center font-bold text-xl mb-5 pb-2 border-b">
          Skills
        </div>
        <div className="col-span-1 text-[#1b4965] font-medium">
          Matched skills
        </div>
        DB to retrieve matched skills
        <div className="col-span-1 text-[#1b4965] font-medium">
          Missing skills
        </div>
        DB to generate missing skills
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="inline-block px-6 py-3 bg-[#62b6cb] text-white hover:bg-[#1b4965] rounded-full shadow-sm"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Apply
        </button>
      </div>

    </div>
  );
};

export default Viewdetails;
