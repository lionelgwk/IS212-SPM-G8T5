import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AppliedCard = (props) => {
  const [position, setPosition] = useState(localStorage.getItem("position"));

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md p-6 mb-6">
      <div className="flex justify-between mb-4">
        <div className="w-9/12 pr-4 border-r">
          <div className="font-bold text-xl mb-2">{props.role_name}</div>
          <div className="mb-2">ID: {props.role_id}</div>
          <div className="mb-2">Description:</div>
          <div className="text-gray-700 text-base mb-4">
            {props.role_listing_desc}
          </div>

          <div>
            {props.role_skills?.length > 0 ? (
              <p>Skills needed:</p>
            ) : (
              <p className="font-bold">No prior skills needed!</p>
            )}
          </div>
          <span className="flex flex-row flex-wrap gap-2">
            {props.role_skills?.length > 0 &&
              props.role_skills.map((skill, index) => (
                <div className="bg-gray-200 px-2 py-1 rounded-full" key={index}>
                  {skill.skill_name}
                </div>
              ))}
          </span>
        </div>
        <div className="w-3/12 pl-4 text-center">
          <div className="mt-3 mb-3 font-semibold">
            Date of Listing: {props.role_listing_open}
          </div>

          {props?.role_app_status == "applied" ? (
            <div className="text-green-600 font-bold">Applied</div>
          ) : (
            <div className="text-red-600 font-bold">Withdrawn</div>
          )}
          <div>
            <NavLink to={`/${position}/details/${props.role_listing_id}`}>
              <button className="mx-2 mt-4 px-4 py-2 bg-[#62b6cb] text-white hover:bg-[#1b4965] rounded-full shadow-sm">
                View Details
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedCard;
