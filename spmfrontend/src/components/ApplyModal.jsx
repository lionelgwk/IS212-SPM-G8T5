import React, { useState } from "react";

const ApplyModal = (props) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const handleApply = () => {
    console.log("submitted");
    setToastVisible(true);
    setAnimateOut(false); // Make sure it's set to false when showing the toast

    setTimeout(() => {
      setAnimateOut(true); // Start the animation to slide out after 3 seconds

      setTimeout(() => {
        setToastVisible(false); // Hide the toast after the animation completes
      }, 300); // The duration of the animation
    }, 3000);
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="mx-2 px-4 py-2 bg-[#62b6cb] text-white hover:bg-[#1b4965] rounded-full shadow-sm disabled:opacity-75 disabled:bg-[#62b6cb] disabled:cursor-not-allowed"
        onClick={() =>
          document.getElementById(`my_modal_${props.id}`).showModal()
        }
        // disabled
      >
        Apply
      </button>
      <dialog id={`my_modal_${props.id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-5">Application Confirmation</h3>
          <p className="mb-5">
            You are applying for: <b>{props.title}</b>
          </p>
          <p className="mb-5">Are you sure you want to apply for this role?</p>
          <div className="flex flex-row justify-center items-center">
            <form
              method="dialog"
              className="flex flex-row justify-center items-center"
            >
              <button
                onClick={handleApply}
                className="mx-4 px-4 py-2 bg-success rounded-xl shadow-sm flex items-center w-24 justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <p className="ps-2">Yes</p>
              </button>
              <button className="mx-4 px-4 py-2 bg-error rounded-xl shadow-sm flex items-center w-24 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <p className="ps-2">No</p>
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {toastVisible && (
        <div className="toast toast-end">
          <div
            className={`alert alert-success transition-all duration-300 ${
              animateOut ? "transform translate-x-full" : ""
            }`}
          >
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyModal;
