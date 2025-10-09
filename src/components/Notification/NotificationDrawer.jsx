import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa6";

export default function NotificationDrawer({
  notifOpen,
  setNotifOpen,
  user,
  setShowModal,
}) {
  const [notifications, setNotifications] = useState([]);
  const isLoggedIn = !!user;

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!isLoggedIn) return;

      try {
        const response = await fetch(
          "https://tashya-mendez.onrender.com/api/notifications/",
          {
            headers: {
              Authorization: `Bearer ${user.access}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (notifOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [notifOpen]);

  return (
    <>
      {notifOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={() => setNotifOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300
          ${notifOpen ? "translate-x-0" : "translate-x-full"}
          rounded-tl-2xl rounded-bl-2xl`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white rounded-tl-2xl">
          <div className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <FaRegBell className="text-lg" />
            Your Notifications
          </div>
          <button
            onClick={() => setNotifOpen(false)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="bg-gray-200/50 h-[calc(100%-120px)] overflow-y-auto p-6 space-y-6">
          {isLoggedIn ? (
            <>
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FaRegClock className="text-gray-500" />
                        {notif.title || "Notification"}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(notif.created_at).toLocaleDateString() || ""}
                      </span>
                    </div>
                    <div className="flex gap-4 p-4">
                      {notif.image && (
                        <img
                          src={notif.image}
                          alt="Notification"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex flex-col">
                        <p className="font-semibold text-gray-800 text-sm">
                          {notif.subtitle || ""}
                        </p>
                        <p className="text-sm text-gray-600">{notif.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 mt-10">
                  You have no notifications yet.
                </p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FaRegBell className="text-4xl text-gray-400 mb-4" />
              <p className="text-gray-700 font-medium mb-3">
                Your notifications are empty.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Please log in to see your notifications.
              </p>
              <button
                onClick={() => {
                  setNotifOpen(false);
                  setShowModal(true);
                }}
                className="bg-black text-white font-semibold px-6 py-2 rounded-lg shadow-md 
                hover:-translate-y-1 hover:shadow-[-4px_4px_10px_rgba(0,0,0,0.25)] 
                transition-all duration-200 ease-out"
              >
                Log In
              </button>
            </div>
          )}
        </div>
        {isLoggedIn && notifications.length > 0 && (
          <div className="p-4 text-center text-gray-500 text-xs border-t border-gray-200 bg-white rounded-bl-2xl">
            You&apos;ve reached the end! <br />
            After a few days your notifications will be deleted automatically.
          </div>
        )}
      </div>
    </>
  );
}
