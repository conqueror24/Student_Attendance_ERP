import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Spinner, Modal, InputGroup } from 'react-bootstrap';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';

const themeColor = 'rgb(128,0,0)'; // Theme color

const AdminRegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName };
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            console.log(error);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <Container fluid className="vh-100" style={{ backgroundColor: '#f5f5f5' }}>
            <Row className="h-100 d-flex justify-content-center align-items-center">
                <Col md={6} className="d-flex justify-content-center">
                    <Form onSubmit={handleSubmit} className="w-100 p-4" style={formCardStyle}>
                        <h4 className="mb-3 text-center" style={{ color: themeColor }}>Admin Register</h4>
                        <p className="text-center">Create your own school by registering as an admin. You will be able to add students and faculty and manage the system.</p>
                        <Form.Group controlId="adminName" className="mb-3">
                            <Form.Label>Enter your name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="adminName"
                                isInvalid={adminNameError}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="schoolName" className="mb-3">
                            <Form.Label>Create your school name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="School Name"
                                name="schoolName"
                                isInvalid={schoolNameError}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">School name is required</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Enter your email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                isInvalid={emailError}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={toggle ? 'text' : 'password'}
                                    placeholder="Password"
                                    name="password"
                                    isInvalid={passwordError}
                                    onChange={handleInputChange}
                                    autoComplete="current-password"
                                />
                                <InputGroup.Text onClick={() => setToggle(!toggle)} style={{ cursor: 'pointer' }}>
                                    {toggle ? <Visibility /> : <VisibilityOff />}
                                </InputGroup.Text>
                                <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="remember" className="mb-3">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100" disabled={loader} style={{ backgroundColor: themeColor, border: 'none' }}>
                            {loader ? <Spinner as="span" animation="border" size="sm" /> : "Register"}
                        </Button>
                        <div className="mt-3 text-center">
                            Already have an account? <StyledLink to="/Adminlogin">Log in</StyledLink>
                        </div>
                    </Form>
                </Col>
            </Row>
            <Modal show={showPopup} onHide={() => setShowPopup(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPopup(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminRegisterPage;

const formCardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    border: `1px solid ${themeColor}`,
    transition: 'all 0.3s ease',
    ':hover': {
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
        transform: 'scale(1.02)',
    },
};

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: ${themeColor};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
