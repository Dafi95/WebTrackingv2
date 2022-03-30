import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
  status: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, contact, status } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !status) {
      toast.error("Wpisz prawidlowe WWW");
    } else {
      if (!id) {
        fireDb.child("contacts").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("WWW Dodane pomyślnie");
          }
        });
      } else {
        fireDb.child(`contacts/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("WWW Zaktualizowane pomyślnie");
          }
        });
      }

      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
      <div style={{ marginTop: "100px" }}>
        <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center",
            }}
            onSubmit={handleSubmit}
        >
          <label htmlFor="name">IP Address</label>
          <input
              type="text"
              id="name"
              name="name"
              placeHolder="Twój Adres IP"
              value={name || ""}
              onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
              type="email"
              id="email"
              name="email"
              placeHolder="Your Email..."
              value={email || ""}
              onChange={handleInputChange}
          />
          <label htmlFor="Port">Port</label>
          <input
              type="number"
              id="contact"
              name="contact"
              placeHolder="Your Port... eg:443"
              value={contact || ""}
              onChange={handleInputChange}
          />
          <label htmlFor="name">Free Text</label>
          <input
              type="text"
              id="status"
              name="status"
              placeHolder="Your Message..."
              value={status || ""}
              onChange={handleInputChange}
          />
          <input type="submit" value={id ? "Update" : "Save"} />
        </form>
      </div>
  );
};

export default AddEdit;
