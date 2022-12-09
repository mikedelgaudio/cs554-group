import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFirebaseAuth } from "../../firebase/firebase.context";
import { useCurrentUser } from "../../hooks/useCurrentUser.hook";
import "./navbar.component.css";

const Navbar = () => {
  const [toggled, setToggle] = useState(false);
  const { currentUser } = useFirebaseAuth();

  const navigated = () => {
    if (toggled) setToggle(toggled => (toggled = !toggled));
  };

  const links = () => {
    return (
      <>
        <li>
          <NavLink
            className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800	 focus:ring-offset-2"
            to="/discover"
            onClick={navigated}
          >
            Discover
          </NavLink>
        </li>
        <li>
          <NavLink
            className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800	 focus:ring-offset-2"
            to="/favorited"
            onClick={navigated}
          >
            Favorited
          </NavLink>
        </li>
        <li>
          <NavLink
            className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
            to={"/profile/" + useCurrentUser().id}
            onClick={navigated}
          >
            Profile
          </NavLink>
        </li>
        {currentUser ? (
          <li>
            <NavLink
              className="flex items-center justify-center rounded-xl border border-slate-900 bg-transparent px-5 py-2 text-base font-semibold leading-7 text-slate-900 transition-all duration-200 hover:bg-slate-900 hover:text-white focus:bg-slate-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 w-full sm:w-auto"
              to="/logout"
              onClick={navigated}
            >
              Logout
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink
              className="flex items-center justify-center rounded-xl border border-slate-900 bg-transparent px-5 py-2 text-base font-semibold leading-7 text-slate-900 transition-all duration-200 hover:bg-slate-900 hover:text-white focus:bg-slate-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 w-full sm:w-auto"
              to="/login"
              onClick={navigated}
            >
              Login
            </NavLink>
          </li>
        )}
      </>
    );
  };

  // TODO
  // ! Add aria-label support for accessibility

  const hamburgerMenu = () => {
    return (
      <>
        <div
          className={`hamburger-menu-button ${toggled ? "open" : ""} `}
          onClick={() => setToggle(toggled => (toggled = !toggled))}
        >
          <div className="hamburger-menu" />
        </div>
      </>
    );
  };

  return (
    <div className="relative py-4 md:py-6 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap items-center justify-between gap-4 w-auto">
          <NavLink
            className="flex items-center gap-3 text-xl md:text-2xl font-semibold rounded focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
            to="/"
          >
            <div className="flex flex-col leading-4 md:leading-5">
              <span className="font-extrabold text-[#4d82c3] uppercase ">
                DuckedIn
              </span>
            </div>
          </NavLink>
          <nav className="sm:block hidden">
            <ul className="flex list-none items-center gap-9">{links()}</ul>
          </nav>
          <span className="sm:hidden block">{hamburgerMenu()}</span>
        </div>
        {toggled ? (
          <nav className="sm:hidden block">
            <ul className="grid list-none flex-col items-start px-1 py-5 gap-4">
              {links()}
            </ul>
          </nav>
        ) : null}
      </div>
    </div>
  );
};

export { Navbar };
