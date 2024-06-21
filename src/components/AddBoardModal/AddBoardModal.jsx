import { useState } from "react";
import "./AddBoardModal.css";
import GifSearch from '../GifSearch/GifSearch';

const AddBoardModal = ({ closeModal, refreshBoardsList }) => {
  const [category, setCatergory] = useState("");
  const [claimPost, setClaimPost] = useState(false);
  const [selectedGifUrl, setSelectedGifUrl] = useState("");

  const handleRadioChange = () => {
    setClaimPost((prev) => !prev);
  };

  const createBoard = (formData) => {
    const boardTitle = formData.get("title");

    const newBoard = {
      title: boardTitle,
      category,
      claimPost,
      image: selectedGifUrl,
      description: "",
    };

    fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoard),
    })
      .then((response) => refreshBoardsList())
      .catch((err) => console.error(err));

    closeModal();
  };

  return (
    <div className="add-board-modal-container" onClick={closeModal}>
      <div
        className="add-board-modal-content"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="close-modal-button" onClick={() => closeModal()}>
          &times;
        </div>
        <h1 className="create-board-title">Create a Board</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            createBoard(formData);
          }}
          className="create-board-form"
        >
          <div className="form-section">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />
          </div>

          <div className="form-section">
            <label htmlFor="category">Category:</label>
            <select
              onChange={(e) => setCatergory(e.target.value)}
              id="category"
              name="category"
              required
            >
              <option value="">Select a category</option>
              <option value="celebration">Celebration</option>
              <option value="thank-you">Thank You</option>
              <option value="inspiration">Inspiration</option>
            </select>
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

export default AddBoardModal;
