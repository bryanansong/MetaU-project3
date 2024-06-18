import "./KudoCard.css";

const KudoCard = () => {
  return (
    <div
      className="card"
      // TODO: add onClick to open card creation mdal
      // onClick={() => openModal(movie)}
    >
      <img
        src={
          movie?.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "https://placehold.co/260x390?text=No+Cover+Art&font=montserrat"
        }
        className="movieCover"
        alt="Movie Cover Art"
      />
      <div className="movieText">
        <h2 className="movieTitle">Card Name</h2>
      </div>
    </div>
  );
};

export default KudoCard;
