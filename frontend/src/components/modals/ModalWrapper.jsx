const ModalWrapper = ({ children, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose} // close on outside click
    >
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;