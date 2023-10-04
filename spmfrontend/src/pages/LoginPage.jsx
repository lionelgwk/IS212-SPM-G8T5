import React from "react";

const LoginPage = () => {
  const handleLoginStaff = () => {
    localStorage.setItem("userToken", true);

    localStorage.setItem("position", "staff"); // for staff

    window.location.href = "/staff";
  };

  const handleLoginManager = () => {
    localStorage.setItem("userToken", true);

    localStorage.setItem("position", "manager"); // for manager
    window.location.href = "/manager";
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
    </div>
  );
};

export default LoginPage;
