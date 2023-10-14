import React from "react";

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
    <div className="bg-white">
      <h2>Login Page</h2>
      <button
        onClick={handleLoginStaff}
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Login As Staff
      </button>

      <button
        onClick={handleLoginManager}
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Login As Manager
      </button>

      <button
        onClick={handleLoginHr}
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Login As HR
      </button>
    </div>
  );
};

export default LoginPage;
