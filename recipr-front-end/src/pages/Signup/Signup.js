import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./styles.css";
import axios from "../../Axios";
import { MyContext } from "../../context";
import { useHistory } from "react-router-dom";

function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(MyContext);
  function handleSignup(e) {
    e.preventDefault();
    if (!email || !password || !name) {
      return alert("Please fill out the fields");
    }
    axios
      .post("/users", { name, email, password })
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("token", data.token);
        history.replace("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="signup">
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="label">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <Form.Text className="text-muted">Your name.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="label">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button className="mysignup-button" variant="success" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
