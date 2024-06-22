import { useEffect, useState } from "react";
import "./KudoPage.css";
import { useParams } from "react-router-dom";

const KudoPage = () => {
  const kudo = { id: useParams().kudoId };

  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [cardInfo, setCardInfo] = useState({});
  const [cardCreator, setCardCreator] = useState({});

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleDiscard = (e) => {
    setComment("");
  };

  const handleCommentSubmit = (e) => {
    addComment();
  };

  const getCardInfo = () => {
    fetch(`http://localhost:3000/cards/${kudo.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setCardInfo(response))
      .catch((err) => console.error(err));
  };

  const getCardComments = () => {
    fetch(`http://localhost:3000/cards/${kudo.id}/comments`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setCommentsList(response))
      .catch((err) => console.error(err));
  };

  const addComment = () => {
    fetch(`http://localhost:3000/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cardId: parseInt(kudo.id), description: comment }),
    })
      .then((response) => response.json())
      .then((response) => setComment(""))
      .then((response) => getCardComments())
      .catch((err) => console.error(err));
  };

  const fetchCardCreatorData = () => {
    fetch(`http://localhost:3000/users/${1}`)
      .then((response) => response.json())
      .then((response) => setCardCreator(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCardInfo();
    getCardComments();
    fetchCardCreatorData();
  }, []);

  return (
    <div className="kudo-page-container">
      <div className="card-info">
        <img src={cardInfo.image} alt="Kudo Card GIF/Image" />
        <h1>{cardInfo.title}</h1>
        <p>Created By: {cardCreator.username}</p>
        <p>{}</p>
      </div>
      <div className="card-comments">
        <div className="comments-list">
          {commentsList.map((comment, id) => (
            <p key={id} className="comment-item">
              {comment.description}
            </p>
          ))}
        </div>
        <div className="comment-box">
          <form className="comment-modal">
            <textarea
              className="comment-textarea"
              placeholder="Add a comment..."
              value={comment}
              type="text"
              onChange={handleCommentChange}
              maxLength={350}
            />
            <div className="textarea-functionalities">
              <div className="empty-space" />
              <p className="comment-length">{comment.length}/350</p>
              <div className="discard-button" onClick={handleDiscard}>
                <p className="submit-button-text">Discard</p>
              </div>
              <div className="submit-button" onClick={handleCommentSubmit}>
                <p className="submit-button-text">Submit Comment</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KudoPage;
