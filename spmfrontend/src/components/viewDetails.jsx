import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchListingDetails from "../hook/FetchListingDetails";
import FetchUser from "../hook/FetchUser";
import Countdown from "../components/Countdown";
import ApplyModal from "./ApplyModal";
import { NavLink } from "react-router-dom";
import ApplicantTable from "./ApplicantTable";

const Viewdetails = () => {
  const { id } = useParams();
  const { data: listing, isPending: isPending } = FetchListingDetails(id);
  const { user } = FetchUser();
  const [overdue, setOverdue] = useState("");
  const [missingSkills, setMissingSkills] = useState([]);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [percent, setPercent] = useState(0);

  const handleSubmit = () => {};

  useEffect(() => {
    if (!isPending) {
      const date = new Date(listing?.role_listing_close).getTime();
      const now = Date.now();
      const over = date < now;
      setOverdue(over);
    }

    let missingSkillsTemp = [];
    let matchedSkillsTemp = [];
    listing?.role_skills?.forEach((skill) => {
      user?.active_skills?.forEach((mySkill) => {
        if (skill.skill_id === mySkill.skill_id) {
          matchedSkillsTemp.push(skill);
        }
      });
    });
    listing?.role_skills?.forEach((skill) => {
      let found = false;
      matchedSkillsTemp.forEach((matchedSkill) => {
        if (skill.skill_id === matchedSkill.skill_id) {
          found = true;
        }
      });
      if (!found) {
        missingSkillsTemp.push(skill);
      }
    });
    setMissingSkills(missingSkillsTemp);
    setMatchedSkills(matchedSkillsTemp);
    setPercent(
      ((matchedSkillsTemp.length / listing?.role_skills?.length) * 100).toFixed(
        0
      )
    );
  }, [isPending, listing, user]);

  // Get the role_status from database
  // const role_status = listing?.role_listing_close < currentDate;
  // const statusClass =
  //   overdue
  //     ? "text-green-600 font-bold"
  //     : "text-red-600 font-bold";

  return (
    <div className="bg-[#bee9e8] p-4 min-h-screen">
      <div className="bg-white rounded p-4 mb-4 shadow-md">
        <div className="text-center font-bold text-xl pb-2 mb-3 border-b">
          {listing?.role_name}
        </div>
        <div className="grid grid-cols-2 text-black font-medium">
          <div>
            <p className="text-black font-medium mb-1">Role Listing ID: {id}</p>
            <p className="text-[#1b4965] font-medium">
              Roles & Responsibilities
            </p>
            <div>{listing?.role_listing_desc}</div>
            <div className="text-[#1b4965] font-medium mt-2">Status</div>
            <div
              className={`font-bold ${
                overdue ? "text-red-600" : "text-green-600"
              } mb-1`}
            >
              {overdue ? "Closed" : "Active"}
            </div>
            {localStorage.getItem("position") == "hr" && (
              <div>
                <NavLink
                  to={`/${localStorage.getItem("position")}/details/${id}/edit`}
                >
                  <button className="btn btn-info">Edit</button>
                </NavLink>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center items-center">
            {overdue ? (
              <h1 className="mb-4">Deadline is over!</h1>
            ) : (
              <h1 className="mb-4">Countdown</h1>
            )}
            {overdue ? (
              <h1>You can't apply for this role anymore.</h1>
            ) : (
              <Countdown targetDate={listing?.role_listing_close} />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded p-4 mb-4 mt-10 shadow-xl">
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
                <div className="h-20 card bg-info text-white rounded-box place-items-center flex justify-center p-4">
                  None
                </div>
              ) : (
                matchedSkills.map((skill) => (
                  <div
                    className="h-20 card bg-info text-white rounded-box place-items-center flex justify-center p-4"
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
                <div className="h-20 card bg-error text-white rounded-box place-items-center flex justify-center p-4">
                  None
                </div>
              ) : (
                missingSkills.map((skill) => (
                  <div
                    className="h-20 card bg-error text-white rounded-box place-items-center flex justify-center p-4"
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
          <div className="w-6/12 p-10">
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
          <div className="flex text-center justify-end items-center w-6/12 mt-4">
            {/* <button
              type="submit"
              className="inline-block px-6 py-3 bg-success text-white hover:bg-base-300 hover:text-success rounded-xl shadow-sm h-full w-full text-3xl"
              onClick={(e) => {
                e.preventDefault();
              }}
              disabled={overdue}
            >
              Apply
            </button> */}
            <ApplyModal
              className="inline-block px-6 py-3 bg-success text-white hover:bg-base-300 hover:text-success rounded-xl shadow-sm h-full w-full text-3xl"
              id={id}
              title={listing?.role_name}
              disabled={overdue}
            />
          </div>
        </div>
        {localStorage.getItem("position") == "hr" && <div className="mt-5 border-t py-4">
          <div className="col-span-1 text-center font-bold text-xl mb-5 pb-2 border-b">
            Applicants
          </div>
          {localStorage.getItem("position") == "hr" && <ApplicantTable />}
        </div>}
      </div>
    </div>
  );
};

export default Viewdetails;
