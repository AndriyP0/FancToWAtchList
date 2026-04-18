import "./PersonItem.css";

function PersonItem({ contact, deletePerson, isActive }) {
  const { firstName, lastName, id } = contact;

  const onPersonDelete = (e) => {
    e.stopPropagation();
    deletePerson(id);
  };

  return (
    <div className="person-item" onDoubleClick={() => isActive(contact)}>
      <p className="content">{firstName + " " + lastName}</p>
      <span className="delete-btn" onClick={onPersonDelete}>
        X
      </span>
    </div>
  );
}

export default PersonItem;
