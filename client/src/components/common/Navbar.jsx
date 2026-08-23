import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function Navbar() {
  const navigate = useNavigate();

const {
  user,
  isAuthenticated,
  logout,
} = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* LOGO */}

          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="text-2xl font-bold text-blue-600"
          >
            SkillSwap
          </Link>

          {/* NAVIGATION */}

          {isAuthenticated  ? (
            <div className="flex items-center gap-6">

              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <Link
                to="/browse"
                className="text-gray-700 hover:text-blue-600"
              >
                Browse
              </Link>

              <Link
                to="/requests"
                className="text-gray-700 hover:text-blue-600"
              >
                Requests
              </Link>

              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600"
              >
                Profile
              </Link>

              <div className="flex items-center gap-3">

                <span className="text-sm text-gray-500">
                  {user?.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>

              </div>

            </div>
          ) : (
            <div className="flex items-center gap-4">

              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;