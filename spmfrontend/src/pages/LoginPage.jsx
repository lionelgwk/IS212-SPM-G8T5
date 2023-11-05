import React, { useState } from "react";
import loginBackgroundImage from "../assets/loginbackground.jpg";
import axios from "axios";
const LoginPage = () => {
  const [id, setId] = useState("");

  const handleLoginStaff = async (id) => {
    if (id == "") {
      alert("Please enter your Staff ID!");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5050/staff/${id}`);
      const data = response.data.data;
      console.log(data);
      localStorage.setItem("userToken", true);
      localStorage.setItem("position", data.sys_role); // for staff
      localStorage.setItem("staffId", id); // from sample data
      window.location.href = `/${data.sys_role}`;
    } catch (error) {
      alert("Invalid Staff ID, try again!");
      console.log(error);
    }
  };

  // const handleLoginManager = () => {
  //   localStorage.setItem("userToken", true);
  //   localStorage.setItem("position", "manager"); // for manager
  //   localStorage.setItem("staffId", 123456787); // from sample data

  //   window.location.href = "/manager";
  // };

  // const handleLoginHr = () => {
  //   localStorage.setItem("userToken", true);
  //   localStorage.setItem("position", "hr"); // for manager
  //   localStorage.setItem("staffId", 123456788); // from sample data

  //   window.location.href = "/hr";
  // };

  return (
    <div
      className="flex justify-center items-center bg-white h-screen"
      style={{
        backgroundImage: `url(${loginBackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="text-center">
        <img
          src="/src/assets/logo.png"
          alt="logo"
          className="h-[100px] mb-10"
        />
        <h1 className="text-4xl font-bold mb-10 text-[#1b4965]">
          Skill Based Role Portal Login
        </h1>

        <button
          onClick={() => document.getElementById(`my_modal_login`).showModal()}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Login
        </button>
        <dialog id={`my_modal_login`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mb-5">Login as Staff</h3>
            <div className="flex flex-row justify-center items-center">
              <form
                method="dialog"
                className="flex flex-col justify-center items-center"
              >
                <div>
                  Staff ID:{" "}
                  <input
                    type="text"
                    class="border-2 border-gray-300 focus:border-blue-500 rounded-md p-2"
                    placeholder="Enter ID"
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                </div><br/>
                <button
                  onClick={(e) => handleLoginStaff(id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </dialog>

        {/* <button
          onClick={handleLoginManager}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Login As Manager
        </button> */}

        {/* <button
          onClick={handleLoginHr}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Login As HR
        </button> */}
      </div>
    </div>
  );
};

export default LoginPage;
