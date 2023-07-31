import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -4,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 3px",
  },
}));
export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.userSlice.loggedIn);

  const name = useSelector((state) => state.userSlice.name);

  console.log(`this is from navbar${isLoggedIn}`);

  return (
    <div className=" fixed top-0 w-full overflow-hidden z-50 bg-gray-900 opacity-90">
      <nav className="  px-8 py-4 flex justify-between items-center border-y border-gray-400">
        <Link
          to="/"
          className="text-3xl font-bold leading-none flex items-center space-x-4"
        >
          <span>
            <i
              className="fa-solid fa-cart-shopping fa "
              style={{ color: "#c5cedd" }}
            >
              {" "}
              Smart_Watch
            </i>
          </span>
        </Link>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-gray-100">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:items-center lg:justify-end grow mr-4">
          <li>
            <Link
              className="text-gray-100 dark:text-gray-100 hover:text-gray-500 px-4 py-2"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-gray-100 dark:text-gray-100 hover:text-gray-500 px-4 py-2"
              to="/useit"
            >
              UseIt
            </Link>
          </li>
          <li>
            <Link
              className="text-gray-100 dark:text-gray-100 hover:text-gray-500 px-4 py-2"
              to="/knowUs"
            >
              KnowUs
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link
                  className="text-gray-100 dark:text-gray-100 hover:text-gray-500 px-4 py-2"
                  to="/statistics"
                >
                  Statistics
                </Link>
              </li>
              <Link to={"/profile"}>
                <div className="ml-4">
                  <Avatar alt={name} />
                </div>
              </Link>
            </>
          ) : (
            <>
              <li className="mr-2">
                <div className="mx-2">
                  <Link
                    to={"/login"}
                    className="py-2 px-2  text-sm text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
                  >
                    login
                  </Link>
                </div>
              </li>
              <li>
                <div className="mx-2">
                  <Link
                    to={"/register"}
                    className="py-2 px-2 text-sm text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
                  >
                    register
                  </Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
