import React, { useState, useEffect } from "react";
import FetchUser from "../hook/FetchUser";
import 'react-datepicker/dist/react-datepicker.css';




const HrEditListingForm = ({id}) => {
  const { user } = FetchUser();
  const [roleId, setRoleId] = useState("");
  const [sourceManager, setSourceManager] = useState("");
  const [roleListingOpen, setRoleListingOpen] = useState(new Date().toISOString().slice(0, 10));
  const [roleListingClose, setRoleListingClose] = useState(new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const [roleListingDesc, setRoleListingDescription] = useState("");
  const [roleDetails, setRoleDetails] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [managerSearchTerm, setManagerSearchTerm] = useState('');
  const [selectedManager, setSelectedManager] = useState(null);
  const [staffDetails, setStaffDetails] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [isLoading, setIsLoading] = useState(true); 

  const handleRoleChange = (event) => {
  
    const selectedRoleName = event.target.value;
    const selectedRole = roleDetails.find(role => role.role_name === selectedRoleName);
    setSelectedRole(selectedRole);
    setRoleId(selectedRole.role_id);

  };

  const handleManagerChange = (event) => {
    console.log(sourceManager);
    const selectedManagerId = event.target.value;
    const selectedManager = staffDetails.find(staff => staff.staff_id.toString() === selectedManagerId);
    setSelectedManager(selectedManager);
    setSourceManager(selectedManager.staff_id);
  };

  const filteredRoles = roleDetails.filter(role => role.role_name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredManagers = staffDetails.filter(manager => `${manager.fname} ${manager.lname}`.toLowerCase().includes(managerSearchTerm.toLowerCase()));


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5050/listing/listed_roles/${id}`, {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        const open_date = result.data.role_listing_open
        const date_open = new Date(open_date);
        const formattedDate_open = date_open.toISOString().slice(0, 10);
        const close_date = result.data.role_listing_close
        const date_close = new Date(close_date);
        const formattedDate_close = date_close.toISOString().slice(0, 10);
        setRoleId(result.data.role_id);
        setRoleListingDescription(result.data.role_listing_desc);
        setSourceManager(result.data.role_listing_source);
        setRoleListingOpen(formattedDate_open);
        setRoleListingClose(formattedDate_close);
        const roleResponse = await fetch('http://127.0.0.1:5050/role');
        const roleData = await roleResponse.json();
        setRoleDetails(roleData.data);
        
        const staffResponse = await fetch('http://127.0.0.1:5050/staff');
        const staffData = await staffResponse.json();
        const managers = staffData.data.staffs.filter(staff => staff.sys_role == "manager");
        setStaffDetails(managers);
        const role = roleData.data.find(role => role.role_id === result.data.role_id);
        const manager = managers.find(manager => manager.staff_id === result.data.role_listing_source);
        setRoleName(role.role_name);
        setSelectedManager(manager);
        setIsLoading(false);
        
       } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [id]);


  const handleSubmit = async (e) => { 
    e.preventDefault();
    const date = new Date(Date.parse(roleListingOpen));
    const formattedDate = date.toISOString().slice(0, 10);
    const data = {
      role_id: roleId,
      role_listing_source: sourceManager,
      role_listing_open: formattedDate,
      // skills: skillList
      role_listing_desc: roleListingDesc,
      role_listing_creator: user.staff_id,
      role_listing_close: roleListingClose
    };
    //NEED TO CHANGE THIS PART, waiting for julian to change the part where we can edit the role listing, and the input parameters for the api
    try {
      const response = await fetch(`http://127.0.0.1:5050/listing/listed_roles/${id}`, {
        method: 'PUT',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
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
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <form className="mt-4 px-4 py-8 border bg-white">
      {/* <div className="mb-4">
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
      </div> */}
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
       <label htmlFor="roleId" className="block mb-2 font-medium">
          Role:
        </label>
       <input 
        type="text" 
        id="roleId"
        placeholder="Search roles..." 
        onChange={event => setSearchTerm(event.target.value)} 
      />
      <select value={roleName} onChange={handleRoleChange}>
        <option value="">Select a role</option> {/* Initial empty option */}
        {filteredRoles.map((role, index) => (
          <option key={index} value={role.role_name}>
            {role.role_name}
          </option>
        ))}
      </select>
      {selectedRole && (
        <div>
          <h2 className="block mb-2 font-medium">Role ID: {selectedRole.role_id}</h2>
          <p>Description: {selectedRole.role_description}</p>
        </div>
      )}
    </div>
      {/* <div className="mb-4">
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
      </div> */}
      <div className="mb-4">
      <label htmlFor="sourceManager" className="block mb-2 font-medium">
          Source Manager:
        </label>
      <input 
        type="text" 
        id="sourceManager"
        placeholder="Search managers..." 
        onChange={event => setManagerSearchTerm(event.target.value)} 
      />
      <select value={selectedManager ? selectedManager.staff_id: ""} onChange={handleManagerChange}>
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
          <p>Name: {selectedManager.fname} {selectedManager.lname}</p>
        </div>
      )}
      </div>
      {/* <label htmlFor="roleListingOpen">Role Listing Open:</label>
      <DatePicker
        id="roleListingOpen"
        selected={roleListingOpen}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
      /> */}
      <div className="mb-4">
        <label htmlFor="roleListingDescription" className="block mb-2 font-medium">
          Role Listing Description:
        </label>
        <textarea
          id="roleListingDescription"
          value={roleListingDesc}
          onChange={(e) => setRoleListingDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
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
              <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2">
                <button
                type="button"
                className="inline-block px-6 py-3 bg-[#62b6cb] text-white hover:bg-[#1b4965] rounded-full shadow-lg"
                onClick={handleSubmit}
                >
                Edit Listing
                </button>
              </div>
            </form>
          );
        };
        
        export default HrEditListingForm;