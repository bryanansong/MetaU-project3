import "./AddBoardCard.css";

const AddBoardCard = ({ toggleModal }) => {
  return (
    <div className="add-board" onClick={toggleModal}>
      <h3>Create New Board</h3>
    </div>
  );
};

export default AddBoardCard;
