import React from "react";

const ApplicantCard = ({ applicant }) => {

  return (
    <div className="bg-white rounded p-4 mb-4 shadow-md">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1 text-center">{applicant.id}</div>
        <div className="col-span-1 text-center">
          <div>{applicant.name}</div>
          <div className="text-gray-500">{applicant.designation}</div>
        </div>
        <div className="col-span-1 text-center">{applicant.appliedDate}</div>
        <div className="col-span-1 text-center">{applicant.roleApplied}</div>
        <div className="col-span-1 text-center">{applicant.skillsMatch}%</div>
        <div className="col-span-1 text-center">
          <button className="px-2 py-1 rounded bg-[#62b6cb] text-white hover:bg-[#1b4965]">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;
