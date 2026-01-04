import { useContext } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import DropDown from "../DropDown/DropDown";
import Theme from "../Theme/Theme";
import { GiBookmarklet } from "react-icons/gi";
import useRole from "../../hooks/useRole";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();

  const handleSignout = () => {
    signOutUser()
      .then(() => {
        toast.success("Sign-out successful.");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const links = (
    <>
      <li className="font-bold text-[#31694E]">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-orange-600 font-bold" : ""
          }
          to="/"
        >
          Home
        </NavLink>
      </li>

      <li className="font-bold text-[#31694E]">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-orange-600 font-bold" : ""
          }
          to="/allbooks"
        >
          All Books
        </NavLink>
      </li>

      {role === "admin" && (
        <li className="font-bold text-[#31694E]">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : ""
            }
            to="/addbook"
          >
            Add Book
          </NavLink>
        </li>
      )}

      {user && (
        <li className="font-bold text-[#31694E]">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : ""
            }
            to="/dashboard"
          >
            DashBoard
          </NavLink>
        </li>
      )}
    </>
  );

  if (isRoleLoading) return <Loader />;

  return (
    <div className="navbar md:px-8 bg-[#F0E491] shadow-sm fixed top-0 z-50 w-full mb-15">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn bg-[#658C58]">
          <div className="flex items-center justify-center gap-1 max-w-sm w-full">
            <span className="text-4xl font-bold text-[#95D5B2]">
              <GiBookmarklet />
            </span>
            <h1 className="text-2xl font-bold text-[#F7F5F2]">Haven</h1>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-4 flex-col md:flex-row">
        <Theme />
        <div className="pr">
          <DropDown></DropDown>
        </div>

        <div>
          {user ? (
            <Link
              onClick={handleSignout}
              to="/login"
              className="btn bg-[#658C58] text-[#F7F5F2]"
            >
              SignOut
            </Link>
          ) : (
            <Link to="/login" className="btn bg-[#658C58] text-[#F7F5F2]">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
