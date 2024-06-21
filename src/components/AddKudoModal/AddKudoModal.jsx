import { useState } from "react";
import "./AddKudoModal.css";
import GifSearch from "../GifSearch/GifSearch";

const AddKudoModal = ({ closeModal, refreshKudosList, boardId }) => {
  const [claimPost, setClaimPost] = useState(false);
  const [selectedGifUrl, setSelectedGifUrl] = useState("");
  // TODO: Replace with correct board number when you add routing

  const handleRadioChange = () => {
    setClaimPost((prev) => !prev);
  };

  const createKudoCard = (formData) => {
    const cardTitle = formData.get("title");

    const newCard = {
      title: cardTitle,
      claimPost,
      boardId: boardId,
      image: selectedGifUrl,
      description: "",
    };

    fetch("http://localhost:3000/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
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
            createKudoCard(formData);
          }}
          className="create-kudo-form"
        >
          <div className="form-section">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Give Your Kudo A Name"
              required
            />
          </div>

          <div className="form-section">
            <label htmlFor="category">Kudo GIF:</label>
            <GifSearch
              selectedGifUrl={selectedGifUrl}
              setSelectedGifUrl={setSelectedGifUrl}
            />
          </div>

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
