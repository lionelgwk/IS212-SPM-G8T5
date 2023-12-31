import React, { useState, useEffect } from "react";
// import HrEditModal from "./HrEditModal
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
    console.log(selectedRoleName);
    const selectedRole = roleDetails.find(role => role.role_name === selectedRoleName);
    console.log(selectedRole)
    setSelectedRole(selectedRole);
    setRoleName(selectedRole.role_name);
    setRoleId(selectedRole.role_id);
    console.log(roleId);
    
  };

  const handleManagerChange = (event) => {
    console.log(sourceManager);
    const selectedManagerId = event.target.value;
    const selectedManager = staffDetails.find(staff => staff.staff_id.toString() === selectedManagerId);
    setSelectedManager(selectedManager);
    setSourceManager(selectedManager.staff_id);
  };

  const filteredRoles = roleDetails.filter(role => role.role_name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredManagers = staffDetails.filter(manager => `${manager?.fname} ${manager?.lname}`.toLowerCase().includes(managerSearchTerm.toLowerCase()));


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
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };


  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log(roleId);
    if (roleListingDesc.length < 10) {
      alert('Role description must be at least 10 characters long');
      return;
    }
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
      window.location.href='/hr';
      alert('Edit Successful');
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
       <h1>{roleName}</h1>
    
    </div>
      <div className="mb-4">
      <label htmlFor="sourceManager" className="block mb-2 font-medium">
          Source Manager:
        </label>
      <h1>{selectedManager?.fname} {selectedManager?.lname}</h1>
      </div>
      {/* <label htmlFor="roleListingOpen">Role Listing Open:</label>
      <DatePicker
        id="roleListingOpen"
        selected={roleListingOpenn}
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
            min={getTodayDate()}
            max={roleListingClose}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mr-2"
          />

          <label htmlFor="roleListingClose" className="block mb-2 font-medium">End Date: </label>
          <input
            type="date"
            id="roleListingClose"
            value={roleListingClose}
            onChange={(e) => setRoleListingClose(e.target.value)}
            min={roleListingOpen}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mr-2"
          />
        </div>
        <div>
        {/* <HrEditModal onButtonClick={handleSubmit/> */}
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