import { useState } from "react";
import "./AddKudoModal.css";

const AddKudoModal = ({ closeModal, refreshKudosList }) => {
  const [category, setCatergory] = useState("");
  const [claimPost, setClaimPost] = useState(false);

  const handleRadioChange = () => {
    setClaimPost((prev) => !prev);
  };

  const createBoard = (formData) => {
    const boardTitle = formData.get("title");

    const newBoard = {
      title: boardTitle,
      category,
      claimPost,
      image: "",
      description: "",
    };

    fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoard),
    })
      .then((response) => refreshKudosList())
      .catch((err) => console.error(err));

    closeModal();
  };

  return (
    <div className="add-kudo-modal-container" onClick={closeModal}>
      <div
        className="add-kudo-modal-content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="close-modal-button" onClick={() => closeModal()}>
          &times;
        </div>
        <h1 className="create-kudo-title">Create a Kudo!</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            createBoard(formData);
          }}
          className="create-kudo-form"
        >
          <div className="form-section">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />
          </div>

          <div className="form-section">
            <label htmlFor="category">Category:</label>
            <input type="text" id="gif" name="gif" required />
          </div>
          {/* TODO: Add GIF options to choose from here */}

          <div className="form-section">
            <label htmlFor="claimBoard">Claim Board?</label>
            <div className="radio-group">
              <div className="radio-button">
                <input
                  type="radio"
                  id="claim"
                  name="claimBoard"
                  value={true}
                  checked={claimPost === true}
                  onChange={() => handleRadioChange()}
                />
                <label htmlFor="claim" className="radio-label">
                  Yes
                </label>
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  id="dont-claim"
                  name="claimBoard"
                  value={false}
                  checked={claimPost === false}
                  onChange={() => handleRadioChange()}
                />
                <label htmlFor="dont-claim" className="radio-label">
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="form-submit">
            <button type="submit">Create Board</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKudoModal;
