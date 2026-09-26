import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* TOP NAVBAR */}
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            onClick={closeMenu}
            className="text-2xl font-bold text-blue-600"
          >
            SkillSwap
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center md:flex">

            {isAuthenticated ? (
              <div className="flex items-center gap-6">

                <Link
                  to="/dashboard"
                  className="text-gray-700 transition hover:text-blue-600"
                >
                  Dashboard
                </Link>

                <Link
                  to="/browse"
                  className="text-gray-700 transition hover:text-blue-600"
                >
                  Browse
                </Link>

                <Link
                  to="/requests"
                  className="text-gray-700 transition hover:text-blue-600"
                >
                  Requests
                </Link>

                <Link
                  to="/profile"
                  className="text-gray-700 transition hover:text-blue-600"
                >
                  Profile
                </Link>

                <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
                  <span className="text-sm text-gray-500">
                    {user?.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="font-medium text-red-600 transition hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>

              </div>
            ) : (
              <div className="flex items-center gap-4">

                <Link
                  to="/login"
                  className="text-gray-700 transition hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              /* X ICON */
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* HAMBURGER ICON */
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

        </div>

        {/* MOBILE NAVIGATION */}
        {isMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">

            {isAuthenticated ? (
              <div className="flex flex-col">

                {/* USER */}
                <div className="mb-3 border-b border-gray-100 pb-3">
                  <p className="text-sm text-gray-500">
                    Signed in as
                  </p>

                  <p className="font-medium text-gray-800">
                    {user?.name}
                  </p>
                </div>

                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  Dashboard
                </Link>

                <Link
                  to="/browse"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  Browse
                </Link>

                <Link
                  to="/requests"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  Requests
                </Link>

                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-2 rounded-lg px-3 py-3 text-left font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex flex-col gap-2">

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700"
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;