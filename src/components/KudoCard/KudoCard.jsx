import "./KudoCard.css";

const KudoCard = ({ kudo }) => {
  return (
    <div
      className="kudo-card"
      // TODO: add onClick event for navigate to Kudo Card Page
      // onClick={() => openModal(movie)}
    >
      <img
        src={"https://placehold.co/260x390?text=No+Image&font=montserrat"}
        className="kudo-img"
        alt="Movie Cover Art"
      />
      <h2 className="kudo-title">Kudo Card Name</h2>
      <div className="kudo-actions">
        <div className="reaction-buttons" onClick={(e) => e.stopPropagation()}>
          <button className="upvote">⬆️</button>
          <button className="downvote">⬇️</button>
        </div>
        <p className="kudo-author">Bryan Ansong</p>
      </div>
    </div>
  );
};

export default KudoCard;
