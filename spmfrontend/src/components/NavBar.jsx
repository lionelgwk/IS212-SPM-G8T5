import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="border-b-[1px] bg-white sticky top-0 z-10 px-5">
      <div className="container-fluid m-auto text-navbar-primary top-0 h-[64px] flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-8 font-bold">
            <img src="/src/assets/logo.png" alt="logo" className="h-[40px]" />
          </Link>
        </div>
        <div className="flex gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1c8042] p-2 rounded-md text-white"
                : "hover:bg-[#4fc97e] hover:text-white p-2 rounded-md"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/search-roles"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1c8042] p-2 rounded-md text-white"
                : "hover:bg-[#4fc97e] hover:text-white p-2 rounded-md"
            }
          >
            Search Roles
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1c8042] p-2 rounded-md text-white"
                : "hover:bg-[#4fc97e] hover:text-white p-2 rounded-md"
            }
          >
            Create Role
          </NavLink>
          <NavLink
            to="/applicants"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1c8042] p-2 rounded-md text-white"
                : "hover:bg-[#4fc97e] hover:text-white p-2 rounded-md"
            }
          >
            Applicants
          </NavLink>
          <NavLink
            to="/applied"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1c8042] p-2 rounded-md text-white"
                : "hover:bg-[#4fc97e] hover:text-white p-2 rounded-md"
            }
          >
            Applied
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1c8042] p-2 rounded-md text-white"
                : "hover:bg-[#4fc97e] hover:text-white p-2 rounded-md"
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </header>
  );
};

export default NavBar;
