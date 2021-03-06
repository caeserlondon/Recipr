import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { MyContext } from "../../context";
import axios from "../../Axios";
import "./styles.css";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(MyContext);

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please fill out the fields");
    }
    axios
      .post("/login", { email, password })
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        setUser(data);
        history.replace("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login">
      <Form onSubmit={handleLogin}>
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
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button className="mylogin-button" variant="success" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default Login;
