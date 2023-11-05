import React from "react";
import loginBackgroundImage from "../assets/loginbackground.jpg";
const LoginPage = () => {
  const handleLoginStaff = () => {
    localStorage.setItem("userToken", true);
    localStorage.setItem("position", "staff"); // for staff
    localStorage.setItem("staffId", 123456789 ) // from sample data
    window.location.href = "/staff";
  };

  const handleLoginManager = () => {
    localStorage.setItem("userToken", true);
    localStorage.setItem("position", "manager"); // for manager
    localStorage.setItem("staffId", 123456787 ) // from sample data

    window.location.href = "/manager";
  };

  const handleLoginHr = () => {
    localStorage.setItem("userToken", true);
    localStorage.setItem("position", "hr"); // for manager
    localStorage.setItem("staffId", 123456788 ) // from sample data

    window.location.href = "/hr";
  };

  return (
    <div
      className="flex justify-center items-center bg-white h-screen"
      style={{
        backgroundImage: `url(${loginBackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="text-center">
        <img src="/src/assets/logo.png" alt="logo" className="h-[100px] mb-10" />
        <h1 className="text-4xl font-bold mb-10 text-[#1b4965]">
          Skill Based Role Portal Login
        </h1>
        <button
          onClick={handleLoginStaff}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Login As Staff
        </button>

        {/* <button
          onClick={handleLoginManager}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Login As Manager
        </button> */}

        <button
          onClick={handleLoginHr}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Login As HR
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
