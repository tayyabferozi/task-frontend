import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Listing",
    to: "/listing",
  },
];

const MainLayout = () => {
  return (
    <>
      <div className="flex justify-center items-center h-16 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          {navItems.map((el, idx) => {
            return (
              <li key={el.label}>
                <NavLink
                  to={el.to}
                  className={({ isActive }) =>
                    `hover:text-gray-300 ${isActive ? "text-green-100" : ""}`
                  }
                >
                  {el.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default MainLayout;
