import React, { useState } from 'react';

const ProfileCard = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('65-5824-7888');
  const [address, setAddress] = useState('1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
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

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
          <div className="font-bold text-l mb-2">Name</div>
          {isEditing ? (
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={name}
              onChange={handleNameChange}
            />
          ) : (
            <div>{name}</div>
          )}
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
              value={email}
              onChange={handleEmailChange}
            />
          ) : (
            <div>{email}</div>
          )}
        </div>
        <div className="w-1/3 pr-4">
          <div className="font-bold text-l mb-2">Phone Number</div>
          {isEditing ? (
            <input
              type="tel"
              className="border rounded w-full py-2 px-3"
              value={phone}
              onChange={handlePhoneChange}
            />
          ) : (
            <div>{phone}</div>
          )}
        </div>
        <div className="w-1/3">
          <div className="font-bold text-l mb-2">Address</div>
          {isEditing ? (
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={address}
              onChange={handleAddressChange}
            />
          ) : (
            <div>{address}</div>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="font-bold text-l mb-2">Description</div>
        {isEditing ? (
          <textarea
            className="border rounded w-full py-2 px-3"
            value={description}
            onChange={handleDescriptionChange}
          />
        ) : (
          <div>{description}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
