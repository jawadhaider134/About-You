import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import UserDropdown from "./UserDropdown";

export default function UserMenu({ isLoggedIn, user, setUser, setShowModal }) {
  const [userOpen, setUserOpen] = useState(false);

  const toggleDropdown = () => {
    if (isLoggedIn) setUserOpen(!userOpen);
    else setShowModal(true);
  };

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setUserOpen(true)}
      onMouseLeave={() => setUserOpen(false)}
    >
      <button
        aria-label="User account"
        className="hover:text-black"
        onClick={toggleDropdown}
      >
        {isLoggedIn ? (
          <span className="w-8 h-8 bg-orange-500 flex items-center justify-center rounded-full font-semibold text-sm text-white shadow-xl">
            {user.first_name?.[0]?.toUpperCase()}
            {user.last_name?.[0]?.toUpperCase()}
          </span>
        ) : (
          <FaRegUser />
        )}
      </button>

      {userOpen && (
        <UserDropdown
          isLoggedIn={isLoggedIn}
          user={user}
          setUser={setUser}
          closeMenu={() => setUserOpen(false)}
          openModal={() => setShowModal(true)}
        />
      )}
    </div>
  );
}
