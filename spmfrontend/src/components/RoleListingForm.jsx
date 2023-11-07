import React, { useState, useEffect } from "react";
import FetchUser from "../hook/FetchUser";
import "react-datepicker/dist/react-datepicker.css";

const RoleListingForm = () => {
  const { user } = FetchUser();
  const [skills, setSkills] = useState("");
  const [skillList, setSkillList] = useState([]);
  const [roleId, setRoleId] = useState("");
  // const [roleListingOpen, setRoleListingOpen] = useState("")
  // const [roleName, setRoleName] = useState("");
  const [sourceManager, setSourceManager] = useState("");
  // const [roleListingClose, setRoleListingClose] = useState("");
  const [roleListingOpen, setRoleListingOpen] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [roleListingClose, setRoleListingClose] = useState(
    new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );
  const [roleDescription, setRoleDescription] = useState("");
  const [roleDetails, setRoleDetails] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [managerSearchTerm, setManagerSearchTerm] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);
  const [staffDetails, setStaffDetails] = useState([]);

  const handleRoleChange = (event) => {
    console.log(roleId);
    const selectedRoleName = event.target.value;
    const selectedRole = roleDetails.find(
      (role) => role.role_name === selectedRoleName
    );
    setSelectedRole(selectedRole);
    setRoleId(selectedRole.role_id);
    console.log(selectedRole.role_id); // Log the latest role_id
  };

  const handleManagerChange = (event) => {
    console.log(sourceManager);
    const selectedManagerId = event.target.value;
    const selectedManager = staffDetails.find(
      (staff) => staff.staff_id.toString() === selectedManagerId
    );
    setSelectedManager(selectedManager);
    setSourceManager(selectedManager.staff_id);
  };

  const filteredRoles = roleDetails.filter((role) =>
    role.role_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredManagers = staffDetails.filter((manager) =>
    `${manager.fname} ${manager.lname}`
      .toLowerCase()
      .includes(managerSearchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const roleResponse = await fetch("http://127.0.0.1:5050/role");
        const roleData = await roleResponse.json();
        setRoleDetails(roleData.data);

        const staffResponse = await fetch("http://127.0.0.1:5050/staff");
        const staffData = await staffResponse.json();
        const managers = staffData.data.staffs.filter(
          (staff) => staff.sys_role === "manager"
        );
        setStaffDetails(managers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setRoleListingOpen(today);
  }, []);

  // Whenever roleListingOpen changes, update roleListingClose if it is before roleListingOpen
  useEffect(() => {
    if (roleListingClose && roleListingOpen > roleListingClose) {
      setRoleListingClose(roleListingOpen);
    }
  }, [roleListingOpen]);

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

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
    if (roleId == null || roleId == "") {
      alert("Please select a role");
      return;
    }
    if (sourceManager == null || sourceManager == "") {
      alert("Please select a manager");
      return;
    }
    if (roleDescription.length < 10) {
      alert("Role description must be at least 10 characters long");
      return;
    }
    const date = new Date(Date.parse(roleListingOpen));
    const formattedDate = date.toISOString().slice(0, 10);
    const data = {
      role_id: roleId,
      role_listing_source: sourceManager,
      role_listing_open: formattedDate,
      // skills: skillList
      role_listing_creator: user.staff_id,
      role_listing_close: roleListingClose,
      role_listing_desc: roleDescription,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5050/listing/add_role_listing",
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle successful response
      window.location.href = "/hr";
      alert("Listing Creation Successful");
      console.log("Role listing created successfully");
    } catch (error) {
      // Handle error
      console.error("Error creating role listing:", error);
    }
  };

  return (
    <form className="mt-4 px-7 py-10 border rounded-lg bg-white">
      <div className="mb-4">
        <label htmlFor="roleId" className="block mb-2 font-medium">
          Role:
        </label>
        <input
          type="text"
          id="roleId"
          placeholder="Search roles..."
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <select className="border border-gray-400" onChange={handleRoleChange}>
          <option value="">Select a role</option> {/* Initial empty option */}
          {filteredRoles.map((role, index) => (
            <option key={index} value={role.role_name}>
              {role.role_name}
            </option>
          ))}
        </select>
        {selectedRole && (
          <div>
            <h2 className="block mb-2 font-medium">
              Role ID: {selectedRole.role_id}
            </h2>
            <p>Description: {selectedRole.role_description}</p>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="sourceManager" className="block mb-2 font-medium">
          Source Manager:
        </label>
        <input
          type="text"
          id="sourceManager"
          placeholder="Search managers..."
          onChange={(event) => setManagerSearchTerm(event.target.value)}
        />
        <select className="border border-gray-400" onChange={handleManagerChange}>
          <option value="">Select a manager</option>
          {filteredManagers.map((manager, index) => (
            <option key={index} value={manager.staff_id}>
              {manager.fname} {manager.lname}
            </option>
          ))}
        </select>
        {selectedManager && (
          <div>
            <h2>Manager ID: {selectedManager.staff_id}</h2>
            <p>
              Name: {selectedManager.fname} {selectedManager.lname}
            </p>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="roleDescription" className="block mb-2 font-medium">
          Role Listing Description:
        </label>
        <textarea
          id="roleDescription"
          value={roleDescription}
          onChange={(e) => setRoleDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex">
        <label htmlFor="roleListingOpen" className="block mb-2 font-medium me-4">
          Start Date:{" "}
        </label>
        <input
          type="date"
          id="roleListingOpen"
          value={roleListingOpen}
          onChange={(e) => setRoleListingOpen(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mr-2 me-7"
          min={getTodayDate()}
          max={roleListingClose}
        />

        <label htmlFor="roleListingClose" className="block mb-2 me-4 ms-4 font-medium">
          End Date:{" "}
        </label>
        <input
          type="date"
          id="roleListingClose"
          value={roleListingClose}
          onChange={(e) => setRoleListingClose(e.target.value)}
          min={roleListingOpen}
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
          Create Role Listing
        </button>
      </div>
    </form>
  );
};

export default RoleListingForm;
