import { useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa6";
import clothe from "../assets/clothe.avif";

export default function NotificationDrawer({ notifOpen, setNotifOpen }) {
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
          <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaRegClock className="text-gray-500" />
                Your shopping inspiration
              </div>
              <span className="text-xs text-gray-500">Yesterday</span>
            </div>
            <div className="flex gap-4 p-4">
              <img
                src={clothe}
                alt="Notification"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800 text-sm">
                  Your weekend, your rules:
                </p>
                <p className="text-sm text-gray-600">
                  Discover unique styles that suit you. Click here & shop!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 text-center text-gray-500 text-xs border-t border-gray-200 bg-white rounded-bl-2xl">
          You&apos;ve reached the end! <br />
          After a few days your notifications will be deleted automatically.
        </div>
      </div>
    </>
  );
}
