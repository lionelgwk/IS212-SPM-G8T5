import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="border-b-[1px] bg-white sticky top-0 z-10">
      <div className="container m-auto text-navbar-primary top-0 h-[64px] items-center flex justify-between">
        <div className="flex gap-5 items-center justify-center">
          <Link to="/" className="mr-8 font-bold">
            <img src="/src/assets/logo.png" alt="logo" className="h-[40px]" />
          </Link>
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
            to="/skills"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1c8042] p-2 rounded-md text-white"
                : "hover:bg-[#4fc97e] hover:text-white p-2 rounded-md"
            }
          >
            Skills
          </NavLink>
        </div>
        <div className="flex gap-5 items-center">
          {/* <UserAddressIcon /> */}
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </header>
  );
};

export default NavBar;
