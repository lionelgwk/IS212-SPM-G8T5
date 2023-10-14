import React, { useState } from "react";

const RoleSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Add code for search functionality here
  };

  const handleSkillClick = (skill) => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(skill)) {
        return prevSkills.filter((s) => s !== skill);
      } else {
        return [...prevSkills, skill];
      }
    });
    // Add code for skill input functionality here
  };

  return (
    <div className="bg-[#bee9e8] p-4">
      <div className="flex justify-between">
        <div className="w-9/12 mr-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Search Role
          </label>
          <input
            type="text"
            placeholder="Search Role by title or keyword"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="w-4/12 ml-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sort by Relevance
          </label>
          <select className="border rounded w-full py-2 px-3">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            {/* Add more sorting options if needed */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RoleSearch;
