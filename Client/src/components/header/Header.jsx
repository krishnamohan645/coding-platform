import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails, logOutUser } from "./header.slice";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(dispatch, "dispatch in header");
  const user = useSelector((state) => state?.Users?.user);
  console.log(user, "user in header");

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logOutUser());
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 h-[60px] border-b border-gray-700">
      <div className="flex items-center justify-between h-full px-6">
        <div
          className="flex items-center space-x-8"
          onClick={() => setIsProfileOpen(false)}
        >
          <Link
            to="/dashboard"
            className="text-white font-bold text-xl font-pacifico"
          >
            CodeMaster
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium whitespace-nowrap"
            >
              Dashboard
            </Link>
            <Link
              to="/languages"
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium whitespace-nowrap"
            >
              Languages
            </Link>
            <Link
              to="/problems"
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium whitespace-nowrap"
            >
              Problems
            </Link>
            <Link
              to="/roadmap"
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium whitespace-nowrap"
            >
              Roadmap
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* <div className="hidden md:flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-fire-line text-orange-400 text-lg"></i>
            </div>
            <span className="text-orange-400 font-semibold">125</span>
          </div> */}

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              aria-label="User menu"
            >
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "Us"}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    View Profile
                  </Link>
                  {/* <Link
                    to="/achievements"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Achievements
                  </Link> */}
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
