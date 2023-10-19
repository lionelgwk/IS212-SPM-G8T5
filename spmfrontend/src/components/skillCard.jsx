import React from 'react';
import FetchUser from '../hook/FetchUser';

const SkillCard = () => {
  const { user } = FetchUser();
  const skills = user.active_skills;

  return (
    <div className="bg-white border rounded-lg overflow-hidden p-6 mb-6">
      <div className="mb-4">
        <div className="font-bold text-xl mb-2">My Skills</div>
        <div>
          {skills?.map(skill => (
            <div
              key={skill.skill_id}
            >
              <span className="font-bold">{skill.skill_name}: </span>
              {skill.skill_status === 'active' 
                ? 'Active' 
                : skill.skill_status === 'inactive' 
                  ? 'Unverified' 
                  : skill.skill_status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
