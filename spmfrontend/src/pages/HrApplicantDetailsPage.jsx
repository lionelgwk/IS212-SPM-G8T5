import React from "react";
import { useParams } from "react-router-dom";
import ViewApplicantDetails from "../components/viewApplicantDetails";
import ViewApplicantSkills from "../components/viewApplicantSkills";

const HrApplicantDetailsPage = () => {
  const { staffid } = useParams();
  return (
    <div className="bg-[#bee9e8] min-h-screen flex justify-center items-center">
      <div className="container mx-auto p-2 bg-[#bee9e8] h-full">
        <div className="font-bold text-xl pt-10 mb-1 text-center">
          Applicant Information
        </div>
        <ViewApplicantDetails />
        <ViewApplicantSkills />
        <div className="flex justify-center items-center mt-5">
          <button className="px-2 py-1 bg-[green] text-white hover:bg-[#1b4965] rounded-full shadow-sm mr-5">
            Accept
          </button>
          <button className="px-2 py-1 bg-[red] text-white hover:bg-[#1b4965] rounded-full shadow-sm ml-5">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default HrApplicantDetailsPage;