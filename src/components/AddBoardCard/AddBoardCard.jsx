import "./AddBoardCard.css";

const AddBoardCard = ({ toggleModal }) => {
  // TODO:  Should open a modal to add a new board to the list

  return (
    <div className="add-board" onClick={toggleModal}>
      <h3>Create New Board</h3>
    </div>
  );
};

export default AddBoardCard;
