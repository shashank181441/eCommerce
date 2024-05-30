import { logoutUser } from "@/api";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eclipse, Sun } from "lucide-react";

function NavBar({ theme, setTheme, toggleTheme }) {
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch user data from Redux store
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);

  const searchItem = () => {
    console.log("hello world");
  };

  const handleLoginOut = () => {
    if (userData) {
      logoutUser();
    } else navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-lg font-bold mx-4" to={`/`}>
          My EComm
        </Link>

        <div className="hidden md:flex items-center w-3/5">
          <input
            type="text"
            placeholder="Search"
            className="p-2 w-full rounded-md bg-gray-800 text-white focus:outline-none focus:bg-gray-700"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ml-2"
            onClick={searchItem}
          >
            Search
          </button>
        </div>

        {userData && <Link to={"/cart"} className="mx-4">Cart</Link>}

        <button
          className="md:hidden bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md"
          onClick={() => setSearchBarVisible(!searchBarVisible)}
        >
          Search
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md mx-4">
              Page Options
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Link to={"/createProduct"}>Create Product</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={handleLoginOut}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mx-4"
        >
          {userData ? "Logout" : "Login/Signup"}
        </button>

        <button
          onClick={toggleTheme}
          className="bg-gray-800 hover:bg-gray-800 text-white dark:bg-gray-900 font-semibold rounded-md"
        >
          {theme === 'light' ? <Eclipse /> : <Sun />}
        </button>
      </div>

      {searchBarVisible && (
        <div className="md:hidden bg-gray-900 text-white p-4 mt-2 flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="p-2 w-full rounded-md bg-gray-800 text-white focus:outline-none focus:bg-gray-700"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md ml-2"
            onClick={searchItem}
          >
            Search
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
