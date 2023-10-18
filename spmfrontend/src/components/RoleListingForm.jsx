import React, { useState } from "react";
import FetchUser from "../hook/FetchUser";
import 'react-datepicker/dist/react-datepicker.css';

const RoleListingForm = () => {
  const { user } = FetchUser();
  const [skills, setSkills] = useState("");
  const [skillList, setSkillList] = useState([]);
  const [roleId, setRoleId] = useState("");
  // const [roleListingOpen, setRoleListingOpen] = useState("")
  // const [roleName, setRoleName] = useState("");
  const [sourceManager, setSourceManager] = useState("");
  // const [roleListingClose, setRoleListingClose] = useState("");
  const [roleListingOpen, setRoleListingOpen] = useState(new Date().toISOString().slice(0, 10));
  const [roleListingClose, setRoleListingClose] = useState(new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));

  // const handleSkillKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     if (skills.trim() !== "") {
  //       setSkillList(prevList => [...prevList, skills]);
  //       setSkills("");
  //       console.log("hi");
  //       console.log(user);  
  //     }
  //   }
  // };

  // 234511581
  // 123456786

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const date = new Date(Date.parse(roleListingOpen));
    const formattedDate = date.toISOString().slice(0, 10);
    const data = {
      role_id: roleId,
      role_listing_source: sourceManager,
      role_listing_open: formattedDate,
      // skills: skillList
      role_listing_creator: user.staff_id,
      role_listing_close: roleListingClose
    };
    
    try {
      const response = await fetch('http://127.0.0.1:5050/listing/add_role_listing', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Handle successful response
      console.log('Role listing created successfully');
    } catch (error) {
      // Handle error
      console.error('Error creating role listing:', error);
    }
  }

  return (
    <form className="mt-4 px-4 py-8 border bg-white">
      <div className="mb-4">
        <label htmlFor="roleId" className="block mb-2 font-medium">
          Role ID:
        </label>
        <input
          type="number"
          id="roleId"
          min="0"
        //   value={roleName}
          onChange={(e) => setRoleId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      {/* <div className="mb-4">
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
      </div> */}
      <div className="mb-4">
        <label htmlFor="sourceManager" className="block mb-2 font-medium">
          Source Manager:
        </label>
        <input
          type="text"
          id="sourceManager"
        //   value={roleName}
          onChange={(e) => setSourceManager(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      {/* <label htmlFor="roleListingOpen">Role Listing Open:</label>
      <DatePicker
        id="roleListingOpen"
        selected={roleListingOpen}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
      /> */}
      <div className="flex">
        <label htmlFor="roleListingOpen" className="block mb-2 font-medium">Start Date: </label>
          <input
            type="date"
            id="roleListingOpen"
            value={roleListingOpen}
            onChange={(e) => setRoleListingOpen(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mr-2"
          />

          <label htmlFor="roleListingClose" className="block mb-2 font-medium">End Date: </label>
          <input
            type="date"
            id="roleListingClose"
            value={roleListingClose}
            onChange={(e) => setRoleListingClose(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mr-2"
          />
        </div>
      {/* <div className="mb-4">
        <label htmlFor="roleDescription" className="block mb-2 font-medium">
          Role Description:
        </label>
        <textarea
          id="roleDescription"
        //   value={roleDescription}
          onChange={(e) => setRoleDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div> */}
              {/* <div className="mb-4">
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
              </div> */}
              <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2">
                <button
                type="button"
                className="inline-block px-6 py-3 bg-[#62b6cb] text-white hover:bg-[#1b4965] rounded-full shadow-lg"
                onClick={handleSubmit}
                >
                Create Role
                </button>
              </div>
            </form>
          );
        };
        
        export default RoleListingForm;