import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import Button from "@material-ui/core/Button";

import { Avatar, CssBaseline } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import NavBar from "../navbar/Navbar";

import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [shopName, setShopName] = useState();
  const [name, setName] = useState();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //useHistory
  const history = useHistory();

  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPass) {
      return setError("Password does not match!");
    }

    try {
      setError("");
      setLoading(true);
      let bodyFormData = new FormData();
      bodyFormData.append("email",email);
      bodyFormData.append("name",name)
      bodyFormData.append("password",password);
      bodyFormData.append("shopname",shopName);
      await axios({
        method: "post",
        url: "http://127.0.0.1:5000/signup",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin':'*' },
      }).then((res)=>{
        console.log(res);
        if(res?.data?.message === "success") {
          localStorage.setItem("email",email);
          history.push("/login");
        } else{
          setError("This username already exists");
        }
      })
    } catch {
      setError("This username already exists");
    }
    setEmail('')
    setPassword('');
    setConfirmPass('')
    setShopName('')
    setName('');
    setLoading(false);
  }

  return (
    <>
      <NavBar
        navbg={"linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))"}
        textColor={'white'}
      />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ marginTop: '100px' }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Card style={{ padding: "10px" }}>
            <Card.Body>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
              </div>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && (
                <Alert variant="danger">
                  <InfoIcon></InfoIcon> {error}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label for="name">
                    User Name<span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    className="pr-4"
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="User name"
                    required
                  />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label for="email">
                    Email<span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    className="pr-4"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </Form.Group>
                <Form.Group id="password" className="mt-2">
                  <Form.Label for="password">
                    Password<span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <Form.Group id="password-confirm" className="mt-2">
                  <Form.Label for="password-confirmation">
                    Password-confirmation<span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPass}
                    onChange={(e)=>setConfirmPass(e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </Form.Group>
                <Form.Group id="shop name" className="mt-2">
                  <Form.Label for="shop name">
                    Shop Name<span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    className="pr-4"
                    type="text"
                    value={shopName}
                    onChange={(e)=>setShopName(e.target.value)}
                    placeholder="Shop name"
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 mt-3"
                  variant="contained"
                  disabled={loading}
                  color="primary"
                >
                  Sign Up
                </Button>
              </Form>
              <div className="mt-2 text-center">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
