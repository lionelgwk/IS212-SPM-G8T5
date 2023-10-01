import React, { useState } from "react";

const RoleListingForm = () => {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [wage, setWage] = useState("");
  const [skills, setSkills] = useState("");
  const [skillList, setSkillList] = useState([]);

  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (skills.trim() !== "") {
        setSkillList(prevList => [...prevList, skills]);
        setSkills("");
        console.log("hi");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

  }

  return (
    <form className="px-4 py-6">
      <div className="mb-4">
        <label htmlFor="roleName" className="block mb-2 font-medium">
          Role Name:
        </label>
        <input
          type="text"
          id="roleName"
        //   value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="roleDescription" className="block mb-2 font-medium">
          Role Description:
        </label>
        <textarea
          id="roleDescription"
        //   value={roleDescription}
          onChange={(e) => setRoleDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="department" className="block mb-2 font-medium">
          Department:
        </label>
        <select
          id="department"
        //   value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Department</option>
          {/* Add department options here */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Job Level:</label>
        <div className="grid grid-cols-4 gap-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="jobLevel"
              value="Entry"
            //   checked={jobLevel === "Entry"}
              onChange={(e) => setJobLevel(e.target.value)}
              className="mr-2"
            />
            Entry
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="jobLevel"
              value="Junior Executive"
            //   checked={jobLevel === "Junior Executive"}
              onChange={(e) => setJobLevel(e.target.value)}
              className="mr-2"
            />
            Junior Executive
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="jobLevel"
              value="Senior"
            //   checked={jobLevel === "Senior"}
              onChange={(e) => setJobLevel(e.target.value)}
              className="mr-2"
            />
            Senior
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="jobLevel"
              value="Manager"
            //   checked={jobLevel === "Manager"}
              onChange={(e) => setJobLevel(e.target.value)}
              className="mr-2"
            />
            Manager
          </label>
        </div>
        </div>
              <div className="mb-4">
                <label htmlFor="wage" className="block mb-2 font-medium">
                  Wage:
                </label>
                <select
                  id="wage"
                //   value={wage}
                  onChange={(e) => setWage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Wage</option>
                  {/* Add wage options here */}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="skills" className="block mb-2 font-medium">
                  Skills:
                </label>
                <input
                  type="text"
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  onKeyUp={handleSkillKeyPress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Added Skills:</label>
                <ul className="pl-4 flex flex-wrap">
                  {skillList.map((skill, index) => (
                    <li key={index} className="mb-2 mr-2">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2">
                <button
                type="submit"
                className="inline-block px-6 py-3 text-white bg-blue-500 rounded-full shadow-lg"
                onClick={e=>{
                  e.preventDefault();
                }}
                >
                Create Role
                </button>
              </div>
            </form>
          );
        };
        
        export default RoleListingForm;