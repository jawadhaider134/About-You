import { FaShoppingBag, FaRegHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import logo from "../../assets/logo.png"
export default function UserDropdown({ isLoggedIn, user, setUser, closeMenu, openModal }) {
  const getInitials = (user) => {
    if (!user) return "";
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
  };
  function capitalizeWords(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

  return (
    <div className="absolute top-full right-[-20px] mt-3 w-96 h-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-300 flex flex-col justify-between">
      <div className={`p-6 text-center ${!isLoggedIn ? 'flex flex-col justify-center items-center h-full' : 'mt-5'}`}>
        {isLoggedIn ? (
          <>
            <h1 className="text-black font-medium mb-5">Welcome Back !</h1>
            <div className="w-16 h-16 mx-auto rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold mb-4 border border-gray-300 shadow-2xl">
              {getInitials(user)}
            </div>

            <p className="font-semibold text-gray-800 mb-4">
              <span className="text-sm">You are logged in as</span> <br /> {capitalizeWords(user.first_name)} <span className="text-orange-500">{capitalizeWords(user.last_name)}</span>
            </p>
            <button
              onClick={() => {
                setUser(null);
                localStorage.removeItem("user");
                closeMenu();
                window.location.href = "http://localhost:3000/women";
              }}
              className="w-80 bg-black text-white py-2 rounded font-semibold hover:-translate-y-1 
              hover:shadow-[-4px_4px_10px_rgba(0,0,0,0.25)] 
              transition-all duration-200 ease-out"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <img
              src={logo} 
              alt="Website Logo"
              className="w-20 h-auto mb-2"
            />

            <div className="w-24 h-24 rounded-full border-4 border-orange-500 flex items-center justify-center mb-5">
              <FaUser className="text-gray-400 text-5xl" />
            </div>
            <p className="font-semibold text-gray-800 mb-4">
              You are not logged in yet
            </p>
            <button
              className="w-80 bg-black text-white py-2 rounded font-semibold hover:-translate-y-1 
              hover:shadow-[-4px_4px_10px_rgba(0,0,0,0.25)] 
              transition-all duration-200 ease-out"
              onClick={openModal}
            >
              Log in
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 bg-orange-500 text-white mt-auto rounded-b-lg">
        <div className="flex items-center justify-center gap-2 py-3 px-2">
          <FaShoppingBag />
          <span className="text-sm">Track your orders</span>
        </div>
        <div className="flex items-center justify-center gap-2 py-3 px-2">
          <FaRegHeart />
          <span className="text-sm">Like your favorites</span>
        </div>
      </div>
    </div>
  );
}
