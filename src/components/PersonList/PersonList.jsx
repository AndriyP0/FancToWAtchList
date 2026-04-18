import PersonItem from "../PersonItem/PersonItem";
import "./PersonList.css";

function PersonList({contacts, isActive,deletePerson,onNew}) {
  {
    return (
      <div className="person-section">
        <div className="person-list">
          {contacts.map((contact) => (
            <PersonItem
              key={contact.id}
              contact={contact}
              deletePerson={deletePerson}
              isActive={isActive}
            />
          ))}
        </div>
        <button className="list-btn" onClick={onNew}>
          New
        </button>
      </div>
    );
  }
}

export default PersonList;
