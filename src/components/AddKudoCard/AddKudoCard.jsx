import "./AddKudoCard.css";

const AddKudoCard = ({ toggleModal }) => {
  return (
    <div className="add-card" onClick={() => toggleModal()}>
      <h3>Create New Kudo</h3>
    </div>
  );
};

export default AddKudoCard;
