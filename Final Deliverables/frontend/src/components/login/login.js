import React, { useRef, useState } from 'react';
import { Form, Card, Alert } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import { Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import NavBar from '../navbar/Navbar'

import { Container } from 'react-bootstrap';

import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(0),
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function Login(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)


    const classes = useStyles();

    //useHistory
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(email);
        console.log(password);
        try {
            setError('');
            setLoading(true);
            let bodyFormData = new FormData();
            bodyFormData.append("email", email);
            bodyFormData.append("password", password);
            await axios({
                method: "post",
                url: "http://127.0.0.1:5000/login",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*' },
            }).then((res) => {
                console.log(res);
                if (res?.data?.message === "success") {
                    localStorage.setItem("email", email);
                    localStorage.setItem("shopname",res?.data?.shopname);
                    alert('logged in successfully');
                    history.push("/home");
                } else {
                    setError("  Failed to Sign in!");
                }
            });
        }
        catch {
            setError("  Failed to Sign in!");
        }
        setEmail('')
        setPassword('');
        setLoading(false);
    }

    return (
        <>
            <NavBar
            />

            <Container className='d-flex align-items-center justify-content-center'
                style={{ minHeight: "100vh", }}
            >
                <div className="w-100" style={{ maxWidth: '500px' }}>
                    <Card style={{ padding: '10px' }}>
                        <Card.Body>
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                            </div>
                            <h2 className="text-center mb-4">Log In</h2>
                            {error && <Alert variant="danger"><InfoOutlinedIcon></InfoOutlinedIcon> {error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label for="email">Email<span className="text-danger"> *</span></Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group id="password" className="mt-2">
                                    <Form.Label for="password">Password<span className="text-danger"> *</span></Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    type="submit"
                                    className="w-100 mt-3"
                                    variant="contained"
                                    disabled={loading}
                                    color="primary"
                                >Log In</Button>
                            </Form>
                            <div className="mt-3 text-center">
                                Need an Account? <Link to='/signup'>Sign Up</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}
