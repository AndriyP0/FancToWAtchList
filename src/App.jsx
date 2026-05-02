import { useEffect, useState } from "react";
import "./App.css";
import PersonList from "./components/PersonList/PersonList";
import PersonForm from "./components/personForm/PersonForm";
import { nanoid } from "nanoid";
import api from "./api/movie-service";
function App() {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);

  useEffect(() => {
    api.get("/contacts").then(({ data }) => {
      setContacts(data);
    });
  }, []);

  function createEmptyContact() {
    return { firstName: "", lastName: "", phone: "", email: "", id: null };
  }

  const addPerson = (person) => {
    const newPerson = { ...person, id: nanoid() };

    api.post("/contacts", newPerson).then(({ data }) => {
      setContacts((prev) => [...prev, data]);
    });
  };
  
  const updatePerson = (updatedContact) => {
    api
      .put(`/contacts/${updatedContact.id}`, updatedContact)
      .then(({ data }) => {
        setContacts((prev) =>
          prev.map((contact) => (contact.id === data.id ? data : contact)),
        );
      });
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
    api.delete(`/contacts/${id}`).then(() => {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setActiveContact(createEmptyContact());
    });
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
