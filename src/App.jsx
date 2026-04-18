import { useEffect, useState } from "react";
import "./App.css";
import PersonList from "./components/PersonList/PersonList";
import PersonForm from "./components/personForm/PersonForm";
import { nanoid } from "nanoid";

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")),
  );
  const [activeContact, setActiveContact] = useState(null);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  function createEmptyContact() {
    return { firstName: "", lastName: "", phone: "", email: "", id: null };
  }

  const addPerson = (person) => {
    setContacts([...contacts, { ...person, id: nanoid() }]);
  };

  const updatePerson = (updatedContact) => {
    setContacts(
      contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c)),
    );
  };

  const onSubmit = (contact) => {
    if (contact.id) {
      updatePerson(contact);
      setActiveContact(contact);
    } else {
      addPerson(contact);
      resetForm();
    }
  };

  const deletePerson = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
    setActiveContact(createEmptyContact());
  };

  const isActive = (contact) => {
    setActiveContact(contact);
  };

  const onNew = () => {
    setActiveContact(createEmptyContact());
  };

  const resetForm = () => {
    if (activeContact && activeContact.id) {
      deletePerson(activeContact.id);
    }
    onNew();
  };

  return (
    <div className="contact-list">
      <h3>Contact list</h3>
      <div className="flex-container">
        <PersonList
          contacts={contacts}
          deletePerson={deletePerson}
          isActive={isActive}
          onNew={onNew}
        />
        <PersonForm
          onSubmit={onSubmit}
          activeContact={activeContact}
          resetForm={resetForm}
        />
      </div>
    </div>
  );
}

export default App;
