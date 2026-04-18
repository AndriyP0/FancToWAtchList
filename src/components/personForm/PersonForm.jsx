import { useState, useEffect } from "react";
import "./PersonForm.css";

function PersonForm({ onSubmit, resetForm, activeContact }) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    id: null,
  });

  useEffect(() => {
    setState(()=>activeContact?activeContact:{
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        id: null,})
  }, [activeContact]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="person-form" onSubmit={onFormSubmit}>
      <div className="form-input">
        <div className="inp">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={state.firstName}
            onChange={onInputChange}
          />
          <span
            className="delete-btn"
            onClick={() => setState((prev) => ({ ...prev, firstName: "" }))}
          >
            X
          </span>
        </div>

        <div className="inp">
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={state.lastName}
            onChange={onInputChange}
          />
          <span
            className="delete-btn"
            onClick={() => setState((prev) => ({ ...prev, lastName: "" }))}
          >
            X
          </span>
        </div>

        <div className="inp">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={onInputChange}
          />
          <span
            className="delete-btn"
            onClick={() => setState((prev) => ({ ...prev, email: "" }))}
          >
            X
          </span>
        </div>

        <div className="inp">
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={state.phone}
            onChange={onInputChange}
          />
          <span
            className="delete-btn"
            onClick={() => setState((prev) => ({ ...prev, phone: "" }))}
          >
            X
          </span>
        </div>
      </div>

      <div className="form-btn">
        <button type="submit">Save</button>
        {activeContact && activeContact.id ? (
          <button type="button" onClick={resetForm}>
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default PersonForm;
