import axios from "axios";
import React, { useState } from "react";

const AcceptModal = (props) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastVisibleNo, setToastVisibleNo] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [errorName, setErrorName] = useState("");

  const handleAccept = async () => {
    console.log("submitted");
    try {
      // TODO: Add updated API call to accept applicant
      const response = await axios.post("http://localhost:5050/listing/apply", {
        role_listing_id: props.role_listing_id,
        staff_id: localStorage.getItem("staffId"),
      });

      const code = response.data.code;

      if (code == 200) {
        setToastVisible(true);
        setAnimateOut(false);

        setTimeout(() => {
          setAnimateOut(true);

          setTimeout(() => {
            setToastVisible(false);
          }, 300);
        }, 3000);
      } else {
        setErrorName("Unexpected error occurred.");
        setToastVisibleNo(true);
        setAnimateOut(false);

        setTimeout(() => {
          setAnimateOut(true);

          setTimeout(() => {
            setToastVisibleNo(false);
          }, 300);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (!error.response) {
        setErrorName("Unexpected error occurred.");
      } else {
        setErrorName("You have already applied for this role!");
      }
      setToastVisibleNo(true);
      setAnimateOut(false);

      setTimeout(() => {
        setAnimateOut(true);

        setTimeout(() => {
          setToastVisibleNo(false);
        }, 300);
      }, 3000);
    }
  };

  const handleReject = () => {
    // console.log("rejected");
    setErrorName("Applicant was not accepted.");
    setToastVisibleNo(true);
    setAnimateOut(false); // Make sure it's set to false when showing the toast

    setTimeout(() => {
      setAnimateOut(true); // Start the animation to slide out after 3 seconds

      setTimeout(() => {
        setToastVisibleNo(false); // Hide the toast after the animation completes
      }, 300); // The duration of the animation
    }, 3000);
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className={props.className}
        onClick={() =>
          document
            .getElementById(`accept_modal_${props.role_listing_id}`)
            .showModal()
        }
        // disabled
      >
        Accept {props.fname} {props.lname}
      </button>
      <dialog id={`accept_modal_${props.role_listing_id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-5">Application Confirmation</h3>
          <p className="mb-5">
            You are accepting:{" "}
            <b>
              {props.fname} {props.lname}
            </b>
          </p>
          <p className="mb-5">
            Are you sure you want to accept this applicant?
          </p>
          <div className="flex flex-row justify-center items-center">
            <form
              method="dialog"
              className="flex flex-row justify-center items-center"
            >
              <button
                onClick={handleAccept}
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
              <button
                onClick={handleReject}
                className="mx-4 px-4 py-2 bg-error rounded-xl shadow-sm flex items-center w-24 justify-center"
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
            <span>Applicant accepted successfully!</span>
          </div>
        </div>
      )}
      {toastVisibleNo && (
        <div className="toast toast-end">
          <div
            className={`alert alert-error transition-all duration-300 ${
              animateOut ? "transform translate-x-full" : ""
            }`}
          >
            <span>{errorName}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AcceptModal;
