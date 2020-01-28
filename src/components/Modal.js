import React from "react";

const Modal = ({ title, active, confirmAction }) => {
  const toggleModal = active
    ? "modal modal__display--flex"
    : "modal modal__display--none";

  const modalPosition = {
    top: window.scrollY,
    left: 0
  };

  return (
    <div className={toggleModal} style={modalPosition}>
      <div className="modal__content">
        <h2>{title || "Are you sure?"}</h2>
        <button
          className="button button--delete"
          onClick={() => confirmAction(true)}
        >
          <i className="fas fa-check"></i> Yes
        </button>
        <button className="button" onClick={() => confirmAction(false)}>
          <i className="fas fa-times"></i> No
        </button>
      </div>
    </div>
  );
};

export default Modal;
