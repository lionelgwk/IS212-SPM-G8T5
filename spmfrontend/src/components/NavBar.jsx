import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const NavBar = () => {
  // Sign out function
  const handleSignOut = () => {
    localStorage.removeItem('userToken');
    window.location.href = '/login'; // Redirect to homepage
  }

  return (
    <header className="border-b-[1px] bg-[#e7f2f8] sticky top-0 z-10 shadow-md flex">
      <div className="container ml-4 text-navbar-primary top-0 h-[64px] items-center flex justify-between">
        <div className="flex gap-5 items-center justify-center">
          <Link to="/" className="mr-2">
            <img src="/src/assets/logo.png" alt="logo" className="h-[30px]" />
          </Link>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1b4965] p-2 rounded-md text-white"
                : "hover:bg-[#4dc494] hover:text-white p-2 rounded-md"
            }
          >
            Home
          </NavLink>
          
          <NavLink
            to="/applied"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1b4965] p-2 rounded-md text-white"
                : "hover:bg-[#4dc494] hover:text-white p-2 rounded-md"
            }
          >
            Applied
          </NavLink>

          <NavLink
            to="/applicants"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1b4965] p-2 rounded-md text-white"
                : "hover:bg-[#4dc494] hover:text-white p-2 rounded-md"
            }
          >
            Applicants
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1b4965] p-2 rounded-md text-white"
                : "hover:bg-[#4dc494] hover:text-white p-2 rounded-md"
            }
          >
            Create
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1b4965] p-2 rounded-md text-white"
                : "hover:bg-[#4dc494] hover:text-white p-2 rounded-md"
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
      <div className="flex justify-end items-center ml-auto px-8">
          <button className="hover:text-[#f5655b] p-1 gap-5" onClick={handleSignOut}>Sign Out</button>
      </div>

      <main>
        <Outlet />
      </main>
    </header>
  );
};

export default NavBar;