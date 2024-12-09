import { useState, useRef, useEffect } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { redirect, useNavigate } from 'react-router-dom';

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
    const [profile, setProfile] = useState(null);  
    let navigate = useNavigate(); 
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      }    
      
      const account = localStorage.getItem("stackpoint");
      if (account) 
      {
          const { profile_image, display_name } = JSON.parse(account);
          setProfile({ profile_image, display_name });
      }
      
      
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
      
  }, []);

       
  const handleLogout = () => {
      localStorage.removeItem("stackpoint")
      setProfile(null);
      navigate("/login");
  };

  return profile ? (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={profile?.profile_image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              <p className="font-medium">{profile?.display_name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <a
      href='/login'
      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <LogIn className="w-4 h-4 mr-2" />
      Login
    </a>
  );
}