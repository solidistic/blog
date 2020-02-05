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
    console.log("useEffect");

    document.body.classList.toggle("noscroll", active);
  }, [active]);

  return (
    <div className={toggleModal} style={modalPosition}>
      <div className="modal__content">
        <div className="input-group__name">
          <div>{children}</div>
          <div>
            <i
              className="fas fa-times comment__icon"
              onClick={() => confirmAction(false)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
