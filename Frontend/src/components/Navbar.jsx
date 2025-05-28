import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(logout());
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Login page only shows logo
  if (location.pathname === "/login") {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
        <nav className="max-w-7xl mx-auto bg-black/80 text-white rounded-xl shadow-lg">
          <div className="px-4 md:px-6">
            <div className="flex justify-between h-14">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-[#27c6d9]">
                  QuickTick
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <nav className="max-w-7xl mx-auto bg-black/80 text-white rounded-xl shadow-lg">
        <div className="px-4 md:px-6">
          <div className="flex justify-between h-14">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-[#27c6d9]">
                QuickTick
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium ${
                  location.pathname === "/" ? "text-[#27c6d9]" : "text-gray-200 hover:text-white"
                } transition-colors`}
              >
                Dashboard
              </Link>

              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center text-sm rounded-full focus:outline-none"
                  >
                    {user?.provider ? (
                      <>
                        {user?.image && (
                          <img
                            src={user.image}
                            alt={user.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <span className="ml-2 text-white hidden md:inline-block">
                          {user.username}
                        </span>
                      </>
                    ) : (
                      <div className="flex items-center">
                        <FaUserCircle className="w-6 h-6 text-[#27c6d9]" />
                        <span className="ml-2 text-white hidden md:inline-block">
                          {user?.username}
                        </span>
                      </div>
                    )}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-white border-b border-gray-700">
                        {user?.email || user?.username}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 rounded-md"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-black bg-[#27c6d9] hover:bg-[#1fb8cc] rounded-lg transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-200 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          ref={mobileMenuRef}
          className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1 border-t mt-1 border-gray-700">
            <Link
              to="/"
              className={`block px-3 py-2 text-base font-medium ${
                location.pathname === "/" ? "text-[#27c6d9]" : "text-gray-200 hover:text-white"
              } rounded-md transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>

            {isAuthenticated ? (
              <>
                <div className="block px-3 py-2 text-base font-medium text-gray-200">
                  {user?.email || user?.username}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-200 hover:text-white rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium bg-[#27c6d9] text-black hover:bg-[#1fb8cc] rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;