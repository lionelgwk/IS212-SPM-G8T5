import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchListingDetails from "../hook/FetchListingDetails";
import FetchUser from "../hook/FetchUser";

const ViewApplicantSkills = () => {
  const { id } = useParams();
  const { data: listing, isPending: isPending } = FetchListingDetails(id);
  const { user } = FetchUser();
  const [overdue, setOverdue] = useState("");
  const [missingSkills, setMissingSkills] = useState([]);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [percent, setPercent] = useState(0);

  return (
    <div className="flex justify-center items-center mt-5">
      <div className="bg-white rounded p-4 mb-4 w-7/12 ">
        <div className="col-span-1 text-center font-bold text-xl mb-5 pb-2 border-b">
          Skills
        </div>
        <div className="grid grid-cols-2 border-b pb-5">
          <div className="border-r pe-4">
            {listing?.role_skills?.length === 0 ? null : (
              <h1 className="text-[#1b4965] font-medium text-center mb-2">
                Matched skills
              </h1>
            )}
            <div
              className={`grid ${
                matchedSkills.length > 1 ? "grid-cols-2" : "grid-cols-1"
              } gap-4`}
            >
              {matchedSkills.length == 0 && missingSkills.length > 0 ? (
                <div className="h-20 card bg-info text-white rounded-box place-items-center flex justify-center">
                  None
                </div>
              ) : (
                matchedSkills.map((skill) => (
                  <div
                    className="h-20 card bg-info text-white rounded-box place-items-center flex justify-center"
                    key={skill.skill_id}
                  >
                    {skill.skill_name}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="ps-4">
            {listing?.role_skills?.length === 0 ? null : (
              <h1 className="text-[#1b4965] font-medium text-center mb-2">
                Missing skills
              </h1>
            )}
            <div
              className={`grid ${
                missingSkills.length > 1 ? "grid-cols-2" : "grid-cols-1"
              } gap-4`}
            >
              {missingSkills.length == 0 && matchedSkills.length > 0 ? (
                <div className="h-20 card bg-error text-white rounded-box place-items-center flex justify-center">
                  None
                </div>
              ) : (
                missingSkills.map((skill) => (
                  <div
                    className="h-20 card bg-error text-white rounded-box place-items-center flex justify-center"
                    key={skill.skill_id}
                  >
                    {skill.skill_name}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-screen p-10">
            {listing?.role_skills?.length === 0 ? (
              <h1 className="flex justify-center items-center">
                No prior experience required!
              </h1>
            ) : (
              <>
                <label className="text-gray-500">
                  <span
                    className={
                      percent > 70
                        ? "text-[#37d39a]"
                        : percent > 40
                        ? "text-[#fabe23]"
                        : "text-[#f97272]"
                    }
                  >
                    {percent}%
                  </span>{" "}
                  Skills Matched
                </label>
                <progress
                  className={`progress w-full h-4 ${
                    percent > 70
                      ? "progress-success"
                      : percent > 40
                      ? "progress-warning"
                      : "progress-error"
                  }`}
                  value={percent}
                  max="100"
                ></progress>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicantSkills;
