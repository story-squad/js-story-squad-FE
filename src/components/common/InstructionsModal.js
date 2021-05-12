import React, { useEffect, useRef } from 'react';

const InstructionsModal = props => {
  const { visible, instructions, header, handleOk } = props;
  const modalButton = useRef();

  // auto-focus close button
  useEffect(() => {
    if (modalButton.current) {
      modalButton.current.focus();
    }
  }, [visible, modalButton]);

  return (
    <>
      {visible ? (
        <div className="modal-container">
          <div className="shaped-shadow-container">
            <section className="instructions-modal content-box shaped bg-aqua">
              <h2>{header}</h2>
              <p>{instructions}</p>
              <button className="h3" onClick={handleOk} ref={modalButton}>
                Continue
              </button>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default InstructionsModal;
