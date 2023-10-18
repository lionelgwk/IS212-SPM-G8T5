import React, { useState } from 'react';

const ProfileCard = ({user}) => {
  const [fname, setfName] = useState(user?.fname || '');
  const [lname, setlName] = useState(user?.lname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [biz_address, setAddress] = useState(user?.biz_address || '');
  const [staff_id, setStaff_id] = useState(user?.staff_id || '');
  const [isEditing, setIsEditing] = useState(false);

  const handlefNameChange = (e) => {
    setfName(e.target.value);
  };

  const handlelNameChange = (e) => {
    setlName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Add code to update the user's profile information (e.g., make an API call)
    alert('Profile updated successfully!');
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden p-6 mb-6">
      <div className="flex justify-between mb-4">
        <div>
          <div className="font-bold text-l mb-2">First Name</div>
          {isEditing ? (
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={user.fname}
              onChange={handlefNameChange}
            />
          ) : (
            <div>{user.fname}</div>
          )}
        </div>
        <div>
          <div className="font-bold text-l mb-2">Last Name</div>
          {isEditing ? (
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={user.lname}
              onChange={handlelNameChange}
            />
          ) : (
            <div>{user.lname}</div>
          )}
        </div>
        <div>
        <div className="font-bold text-l mb-2">Staff ID</div>
          <div>{user.staff_id}</div>    
        </div>
        <div>
          {isEditing ? (
            <button type="button" onClick={handleSaveClick} className="text-[#1b4965]">
              Save
            </button>
          ) : (
            <button onClick={handleEditClick} className="text-[#1b4965]">
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/3 pr-4">
          <div className="font-bold text-l mb-2">Email</div>
          {isEditing ? (
            <input
              type="email"
              className="border rounded w-full py-2 px-3"
              value={user.email}
              onChange={handleEmailChange}
            />
          ) : (
            <div>{user.email}</div>
          )}
        </div>
        <div className="w-1/3 pr-4">
          <div className="font-bold text-l mb-2">Phone Number</div>
          {isEditing ? (
            <input
              type="tel"
              className="border rounded w-full py-2 px-3"
              value={user.phone}
              onChange={handlePhoneChange}
            />
          ) : (
            <div>{user.phone}</div>
          )}
        </div>
        <div className="w-1/3">
          <div className="font-bold text-l mb-2">Address</div>
          {isEditing ? (
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={user.biz_address}
              onChange={handleAddressChange}
            />
          ) : (
            <div>{user.biz_address}</div>
          )}
        </div>
      </div>
 
    </div>
  );
};

export default ProfileCard;
