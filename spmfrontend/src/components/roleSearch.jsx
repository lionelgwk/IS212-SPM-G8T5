import React, { useState, useEffect } from "react";

const RoleSearch = ({
  filterRolesByName,
  filterRolesBySkills,
  handleSearching,
  handleSkillSearching,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

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
      <div className="mb-4 w-full card bg-base-100 shadow-xl">
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
              >
                <option disabled selected>
                  Pick one
                </option>
                <option value="React">React</option>
                <option value="Communication">Communication</option>
                <option value="MacOS">MacOS</option>
                <option value="Teamwork">Teamwork</option>
                <option value="Node">Node</option>
              </select>
            </div>
          </div>
        </div>
        {selectedSkills.length > 0 && (
          <>
            <div className="selected-skills px-5 pb-3">
              <h2 className="font-bold">Selected Skills:</h2>
              {selectedSkills.map((skill) => (
                <div className="badge badge-secondary badge-outline h-30">
                  <span key={skill} className="selected-skill">
                    {skill}
                    <button onClick={() => removeSelectedSkill(skill)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-4 h-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoleSearch;
