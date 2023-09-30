import React, { useState } from 'react';

const RoleSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Add code for search functionality here
  };

  const handleSkillClick = (skill) => {
    setSelectedSkills(prevSkills => {
      if (prevSkills.includes(skill)) {
        return prevSkills.filter(s => s !== skill);
      } else {
        return [...prevSkills, skill];
      }
    });
    // Add code for skill input functionality here
  };

  return (
    <div className="bg-[#bee9e8] p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search Role
        </label>
        <input
          type="text"
          placeholder='Search Role by title or keyword'
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>

      <div className="flex justify-between mb-4">
        <div className="w-1/2 mr-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sort by Relevance
          </label>
          <select className="border rounded w-full py-2 px-3">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            {/* Add more sorting options if needed */}
          </select>
        </div>

        <div className="w-1/2 ml-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sort by Skills
          </label>
          <div className="border rounded w-full py-2 px-3 bg-white">
            <div className="flex flex-wrap">
              <button
                className={`mr-2 mb-2 px-2 py-1 rounded ${
                  selectedSkills.includes('Skill 1') ? 'bg-[#1b4965] text-white' : 'bg-gray-300'
                }`}
                onClick={() => handleSkillClick('Skill 1')}
              >
                Skill 1
              </button>
              <button
                className={`mr-2 mb-2 px-2 py-1 rounded ${
                  selectedSkills.includes('Skill 2') ? 'bg-[#1b4965] text-white' : 'bg-gray-300'
                }`}
                onClick={() => handleSkillClick('Skill 2')}
              >
                Skill 2
              </button>
              <button
                className={`mr-2 mb-2 px-2 py-1 rounded ${
                  selectedSkills.includes('Skill 3') ? 'bg-[#1b4965] text-white' : 'bg-gray-300'
                }`}
                onClick={() => handleSkillClick('Skill 3')}
              >
                Skill 3
              </button>
              <button
                className={`mr-2 mb-2 px-2 py-1 rounded ${
                  selectedSkills.includes('Skill 4') ? 'bg-[#1b4965] text-white' : 'bg-gray-300'
                }`}
                onClick={() => handleSkillClick('Skill 4')}
              >
                Skill 4
              </button>
              {/* Add more skill buttons if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSearch;
