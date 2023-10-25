import React from 'react';

const ViewApplicantDetails = () => {
  const user = {
    roleAppID: "12345",
    roleListingID: "67890",
    roleName: "Software Engineer",
    staffID: "1234",
    fname: "John",
    lname: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street",
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="bg-white border rounded-lg overflow-hidden p-6 w-7/12">
        <div className="flex mb-4 border-b pb-2">
          <div className="w-1/3 pr-4">
            <div className="font-bold">Role Application ID:</div>
            <div>{user.roleAppID}</div>
          </div>
          <div className="w-1/3 pr-4">
            <div className="font-bold">Role Listing ID:</div>
            <div>{user.roleListingID}</div>
          </div>
          <div className="w-1/3">
            <div className="font-bold">Applied Role Name:</div>
            <div>{user.roleName}</div>
          </div>
        </div>

        <div className="flex mb-4 border-b pb-2">
          <div className="w-1/3 pr-4">
            <div className="font-bold">Staff ID:</div>
            <div>{user.staffID}</div>
          </div>
          <div className="w-1/3 pr-4">
            <div className="font-bold">First Name:</div>
            <div>{user.fname}</div>
          </div>
          <div className="w-1/3">
            <div className="font-bold">Last Name:</div>
            <div>{user.lname}</div>
          </div>
        </div>

        <div className="flex mb-4 border-b pb-2">
          <div className="w-1/3 pr-4">
            <div className="font-bold">Email:</div>
            <div>{user.email}</div>
          </div>
          <div className="w-1/3 pr-4">
            <div className="font-bold">Phone:</div>
            <div>{user.phone}</div>
          </div>
          <div className="w-1/3">
            <div className="font-bold">Address:</div>
            <div>{user.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicantDetails;
