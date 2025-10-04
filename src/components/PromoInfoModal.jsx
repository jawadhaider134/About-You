import { AiOutlineClose } from "react-icons/ai";

export default function PromoInfoModal({ open, onClose, endTime ,discountAmount }) {
  if (!open) return null;

  const formatEndTime = (date) => {
    return date.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 md:px-8"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 px-12 border-b border-gray-200">
          <h2 className="text-lg font-bold sm:text-xl">
            ABOUT YOU SHOPPING MANIA: Up to {discountAmount}% EXTRA off
          </h2>
          <button onClick={onClose} className="text-gray-800">
            <AiOutlineClose size={28} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 border-b border-gray-200">
          <p className="text-gray-900 font-medium text-base sm:text-md">
            This sales promotion runs until <b>{formatEndTime(endTime)}</b>.
            During the promotion period we grant up to extra {discountAmount}% discount on
            selected articles. Disbursements, subsequent deductions or
            reimbursements of the discount are not possible. Sale discounts
            cannot be combined with other offers.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-center p-6">
          <button
            onClick={onClose}
            className="w-[630px] px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-100/80 text-base sm:text-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
