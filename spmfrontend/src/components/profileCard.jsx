import React, { useEffect, useState } from "react";
import FetchUser from "../hook/FetchUser";
import axios from "axios";

const ProfileCard = () => {
  const { user } = FetchUser();

  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [biz_address, setAddress] = useState("");
  const [staff_id, setStaff_id] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setfName(user.fname);
    setlName(user.lname);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.biz_address);
    setStaff_id(user.staff_id);
  }, [user]);

  const validateName = (name) => name.length >= 3;
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhoneNumber = (phone) => /^[89]\d{7}$/.test(phone);

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

  const handleSaveClick = async () => {
    // Validation
    const newErrors = {};

    if (!validateName(fname)) {
      newErrors.fname = "First name must be at least 3 characters long.";
    }
    if (!validateName(lname)) {
      newErrors.lname = "Last name must be at least 3 characters long.";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!validatePhoneNumber(phone)) {
      newErrors.phone =
        "Please enter a valid phone number. It should have 8 numbers, that start with either 8 or 9.";
    }

    if (Object.keys(newErrors).length === 0) {
      setIsEditing(false);

      const response = await axios.put(
        `http://localhost:5050/staff/update_staff/${user.staff_id}`,
        {
          fname: fname,
          lname: lname,
          email: email,
          phone: phone,
          biz_address: biz_address,
        }
      );
      console.log(response);

      alert("Profile updated successfully!");
      location.reload();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden p-6 mb-6">
      <div className="flex justify-between mb-4">
        <div>
          <div className="font-bold text-l mb-2">First Name</div>
          {isEditing ? (
            <>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={fname}
                onChange={handlefNameChange}
                required
              />
              {errors.fname && <p className="text-red-500">{errors.fname}</p>}
            </>
          ) : (
            <>
              <div>{fname}</div>
            </>
          )}
        </div>
        <div>
          <div className="font-bold text-l mb-2">Last Name</div>
          {isEditing ? (
            <>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={lname}
                onChange={handlelNameChange}
                required
              />
              {errors.lname && <p className="text-red-500">{errors.lname}</p>}
            </>
          ) : (
            <>
              <div>{lname}</div>
            </>
          )}
        </div>
        <div>
          <div className="font-bold text-l mb-2">Staff ID</div>
          <div>{staff_id}</div>
        </div>
        <div>
          {isEditing ? (
            <button
              type="button"
              onClick={handleSaveClick}
              className="text-[#1b4965]"
            >
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
            <>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </>
          ) : (
            <>
              <div>{email}</div>
            </>
          )}
        </div>
        <div className="w-1/3 pr-4">
          <div className="font-bold text-l mb-2">Phone Number</div>
          {isEditing ? (
            <>
              <input
                type="tel"
                className="border rounded w-full py-2 px-3"
                value={phone}
                onChange={handlePhoneChange}
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </>
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
              value={biz_address}
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
