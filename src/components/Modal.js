import React, { useEffect } from "react";

const Modal = ({ children, active, confirmAction }) => {
  const toggleModal = active
    ? "modal modal__display--flex"
    : "modal modal__display--none";

  const modalPosition = {
    top: window.scrollY,
    left: 0
  };

  useEffect(() => {
    document.body.classList.toggle("noscroll", active);
  }, [active]);

  const handleSelection = selection => {
    document.body.classList.toggle("noscroll", !active);
    confirmAction(selection);
  };

  return (
    <div className={toggleModal} style={modalPosition}>
      <div className="modal__content">
        {children}
        <button
          className="button button--delete"
          onClick={() => handleSelection(true)}
        >
          <i className="fas fa-check"></i> Yes
        </button>
        <button className="button" onClick={() => handleSelection(false)}>
          <i className="fas fa-times"></i> No
        </button>
      </div>
    </div>
  );
};

export default Modal;
