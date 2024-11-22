import React, { useState, useEffect } from "react";
import "../index.css"; // Import your CSS for styling

function WarningModal() {
  const [showModal, setShowModal] = useState(true); // Initially show the modal

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // You can add logic here to control how the modal appears, e.g.,
    // based on user preferences, cookies, etc.
  }, []);

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-contents">
            <div className="modal-headers">
              <h5>Warning!!!!</h5> {/* Your warning header */}
              <button className="close-button" onClick={closeModal}>
                X
              </button>
            </div>
            <div className="modal-bodys">
              {/* Add your warning message here */}
              <p>This Website is in Development phase, this is only a demo there is no database connected to this website.</p>


            </div>
          </div>
        </div>
      )}
      {/* Rest of your website content */}
    </>
  );
}

export default WarningModal;