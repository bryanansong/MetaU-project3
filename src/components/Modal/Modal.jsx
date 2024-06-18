import "./Modal.css";

const Modal = () => {
  return (
    <div className="modal-container" onClick={() => closeModal()}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <></>
      </div>
    </div>
  );
};

export default Modal;
