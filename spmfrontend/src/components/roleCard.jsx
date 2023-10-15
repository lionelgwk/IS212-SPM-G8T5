import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const RoleCard = (props) => {
  const [skillsMatched, setSkillsMatched] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let count = 0;
    props.skills?.forEach((skill) => {
      props.mySkills?.forEach((mySkill) => {
        if (skill.skill_id === mySkill.skill_id) {
          count++;
        }
      });
    });
    setSkillsMatched(count);
    setPercent(((count / props.skills?.length) * 100).toFixed(0));
  });

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md px-6 pt-4 mb-6">
      <div className="flex justify-between mb-4">
        <div className="w-9/12 pr-4 border-r">
          <div className="font-bold text-xl mb-2">{props.title}</div>
          <div className="mb-2">
            <h2 className="font-bold">Description</h2>
            <p>{props.description}</p>
            </div>

          {props.skills?.length > 0 ? (
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
              <div>
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
              </div>
              <p>Skills needed:</p>
            </>
          ) : (
            <h1>No prior skills are needed!</h1>
          )}
          <span className="flex flex-row flex-wrap gap-2">
            {props.skills?.length > 0 &&
              props.skills.map((skill) => (
                <div
                  className="bg-gray-200 px-2 py-1 rounded-full"
                  key={skill.skill_id}
                >
                  {skill.skill_name}
                </div>
              ))}
          </span>
        </div>
        <div className="flex flex-col w-3/12 pl-4 justify-center">
          {/* <div className="mt-6 mb-3 font-semibold">
            Date of Listing: {props.date}
          </div> */}
          <div className="mb-6 font-semibold text-center">Deadline: {props.deadline}</div>
          <div className="flex flex-row justify-center items-center">
            <button className="mx-2 px-4 py-2 bg-[#62b6cb] text-white hover:bg-[#1b4965] rounded-full shadow-sm">
              Apply
            </button>
            <NavLink to={`/staff/details/${props.id}`}>
              <button className="mx-2 px-4 py-2 bg-[#62b6cb] text-white hover:bg-[#1b4965] rounded-full shadow-sm">
                View Details
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
