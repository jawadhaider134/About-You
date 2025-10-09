import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import IconButtons from "./IconButtons";
import NotificationDrawer from "../Notification/NotificationDrawer";
import AuthModal from "../AuthModal";

export default function MainHeader() {
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const isLoggedIn = !!user;
  const location = useLocation();

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsFixed(currentScrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

  return (
    <>
      {isFixed && <div style={{ height: headerHeight }} />}
      <header
        ref={headerRef}
        className={`w-full border-b border-gray-300 transition-all duration-300 ${
          isFixed
            ? "fixed top-0 left-0 bg-white/70 backdrop-blur-md shadow-md z-50"
            : "relative bg-white"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-8">
          <Logo />
          <NavLinks location={location} />
          <div className="flex items-center gap-6 text-xl text-gray-700 relative">
            <IconButtons setNotifOpen={setNotifOpen} />
            <UserMenu
              isLoggedIn={isLoggedIn}
              user={user}
              setUser={setUser}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      </header>

      <NotificationDrawer
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        user={user}
        setShowModal={setShowModal}
      />

      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
          onLoginSuccess={(data) => {
  const userData = {
    pk: data.user.pk,
    username: data.user.username,
    email: data.user.email,
    first_name: data.user.first_name,
    last_name: data.user.last_name,
    role: data.role,
    access: data.access,
    refresh: data.refresh
  };

  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  setShowModal(false);
}}

        />
      )}
    </>
  );
}
