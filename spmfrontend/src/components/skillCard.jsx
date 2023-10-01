import React, { useState } from 'react';

const SkillCard = () => {
  const [inputSkill, setInputSkill] = useState('');
  const [skills, setSkills] = useState([]);

  const handleInputChange = (e) => {
    setInputSkill(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputSkill.trim() !== '') {
      setSkills([...skills, inputSkill.trim()]);
      setInputSkill('');
    }
  };

  const handleSkillDelete = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden p-6 mb-6">
      <div className="mb-4">
        <div className="font-bold text-xl mb-2">My Skills</div>
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <div key={index} className="mr-2 mb-2 bg-[#1b4965] text-white rounded-full px-3 py-1 flex items-center">
              <div>{skill}</div>
              <button onClick={() => handleSkillDelete(index)} className="ml-2 font-bold">×</button>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="border rounded w-full py-2 px-3"
          value={inputSkill}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type a skill and press Enter"
        />
      </div>
    </div>
  );
};

export default SkillCard;
