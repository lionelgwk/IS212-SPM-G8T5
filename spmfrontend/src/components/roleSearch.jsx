import React, { useState, useEffect } from "react";
import FetchAllSkills from "../hook/FetchAllSkills";

const RoleSearch = ({
  filterRolesByName,
  filterRolesBySkills,
  handleSearching,
  handleSkillSearching,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const { data: skills } = FetchAllSkills();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    filterRolesByName(e.target.value);
    if (e.target.value === "") {
      handleSearching(false);
    } else {
      handleSearching(true);
    }
  };

  const handleSkillSelection = (e) => {
    const selectedSkill = e.target.value;

    if (!selectedSkills.includes(selectedSkill)) {
      setSelectedSkills([...selectedSkills, selectedSkill]);

      filterRolesBySkills([...selectedSkills, selectedSkill]);

      if (selectedSkills.length > 0) {
        handleSkillSearching(true);
      } else {
        handleSkillSearching(false);
      }
    }
  };
  const removeSelectedSkill = (skillToRemove) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );

    filterRolesBySkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  useEffect(() => {
    if (selectedSkills.length > 0) {
      handleSkillSearching(true);
    } else {
      handleSkillSearching(false);
    }
  }, [selectedSkills]);

  return (
    <div className="bg-[#bee9e8] p-4">
      <div className="mb-4 w-full card bg-base-100 shadow-xl z-0">
        <div className="flex card-body">
          <div className="flex flex-row w-full justify-around items-center">
            <div className="w-9/12 mr-4">
              <h2 className="card-title mb-2">Find your next role</h2>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Search for a role"
                onChange={handleSearchInputChange}
              />
            </div>
            <div className="form-control w-3/12">
              <label className="label">
                <span className="label-text font-bold">Relevant Skills</span>
              </label>
              <select
                className="select select-bordered"
                onChange={handleSkillSelection}
                defaultValue="placeholder"
              >
                <option disabled value="placeholder">
                  Pick one
                </option>
                {skills?.map((skill, index) => (
                  <option key={index} value={skill.skill_name}>
                    {skill.skill_name}
                  </option>
                ))}
                {/* <option value="React">React</option>
                <option value="Communication">Communication</option>
                <option value="MacOS">MacOS</option>
                <option value="Teamwork">Teamwork</option>
                <option value="Node">Node</option> */}
              </select>
            </div>
          </div>
        </div>
        {selectedSkills.length > 0 && (
          <>
            <div className="selected-skills px-5 pb-3">
              <h2 className="font-bold">Selected Skills:</h2>
              <div className="flex flex-row flex-wrap">
                {selectedSkills.map((skill, index) => (
                  <div
                    className="card bg-[#75e693] w-auto input input-rounded flex flex-row items-center justify-center mr-3 mb-3"
                    key={index}
                  >
                    <span className="selected-skill">{skill}</span>
                    <button
                      className="ml-2"
                      onClick={() => removeSelectedSkill(skill)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoleSearch;
