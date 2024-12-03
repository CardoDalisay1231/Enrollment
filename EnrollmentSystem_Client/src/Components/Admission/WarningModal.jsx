import React, { useState, useEffect } from "react";

function WarningModal() {
  const [showModal, setShowModal] = useState(true); // Initially show the modal

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-contents">
            <div className="modal-headers">
              <h5>CvSU Online Student Admission System</h5>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-bodys">
              <ul>
                <li>
                  THIS ADMISSION PROCESS IS FOR THE <b>2nd SEMESTER OF 2023-2024.</b>
                </li>
                <li>
                  THE SYSTEM IS EXCLUSIVE FOR <b>NEW INCOMING FIRST YEAR STUDENTS,
                  TRANSFEREES, SECOND COURSERS, AND TCP APPLICANTS.</b>
                </li>
                <li>
                  If you are a <b>shiftee or an old student</b> that is enrolled or was
                  enrolled in CvSU, <b>DO NOT USE THIS SYSTEM</b>.
                </li>
                <li>
                  Use only one email address in the application and remember
                  your password. Multiple email addresses for creating accounts
                  with the same name are prohibited. We will acknowledge only
                  the first entry and disregard the rest.
                </li>
                <li>
                  Applicants are prohibited from sharing the same email address
                  with other applicants. Use your own email address in applying.
                </li>
                <li>
                  Input all your information with honesty and integrity. Data
                  submitted will be validated and verified by your school.
                </li>
                <li>
                  Applicants who violate the aforementioned guidelines will be
                  disqualified from the list of applications.
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={closeModal}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WarningModal;
