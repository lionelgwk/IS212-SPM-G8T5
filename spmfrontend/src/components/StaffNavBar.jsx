import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const StaffNavBar = () => {
  // Sign out function
  const handleSignOut = () => {
    localStorage.removeItem('position');
    window.location.href = '/login'; // Redirect to homepage
  }

  return (
    <>
      <header className="border-b-[1px] bg-[#e7f2f8] sticky top-0 z-50 shadow-md">
        <div className="container ml-4 text-navbar-primary top-0 h-[64px] items-center flex justify-between">
          <div className="flex gap-5 items-center justify-center">
            <Link to="/staff" className="mr-2">
              <img src="/src/assets/logo.png" alt="logo" className="h-[30px]" />
            </Link>
            <NavLink
              to="/staff" end
              className={({ isActive }) =>
                isActive
                  ? "bg-[#1b4965] p-2 rounded-md text-white"
                  : "hover:bg-[#4dc494] hover:text-white p-2 rounded-md"
              }
            >
              Home
            </NavLink>
            
            <NavLink
              to="/staff/applied"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#1b4965] p-2 rounded-md text-white"
                  : "hover:bg-[#4dc494] hover:text-white p-2 rounded-md"
              }
            >
              Applied
            </NavLink>

            <NavLink
              to="/staff/profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#1b4965] p-2 rounded-md text-white"
                  : "hover:bg-[#4dc494] hover:text-white p-2 rounded-md"
              }
            >
              Profile
            </NavLink>

          </div>
          <div className="flex justify-end ml-auto">
            <button className="hover:bg-[#f5655b] hover:text-white p-2 rounded-md gap-5" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default StaffNavBar;