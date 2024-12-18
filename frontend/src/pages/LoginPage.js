import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import styled from 'styled-components';
import classNames from 'classnames';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            } else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            } else if (currentRole === 'Parent') {
                navigate('/Parent/dashboard');
            }
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <Modal
            open={true}
            onClose={() => navigate('/')}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box sx={{ 
                bgcolor: 'background.paper', 
                border: '2px solid #000', 
                boxShadow: 24, 
                p: 4, 
                borderRadius: '15px',
                maxWidth: '400px',
                width: '90%',
                textAlign: 'center',
                transition: 'transform 0.3s ease-in-out',
                transform: 'scale(1.05)',
                '&:hover': {
                    transform: 'scale(1.1)'
                }
            }}>
                <h4 id="login-modal-title" className="mb-3" style={{ color: "#2c2143", fontWeight: 'bold', fontSize: '24px' }}>{role} Login</h4>
                <p id="login-modal-description" style={{ color: '#6c757d' }}>Welcome back! Please enter your details</p>
                <form noValidate onSubmit={handleSubmit}>
                    {role === "Student" ? (
                        <>
                            <div className="form-group mb-3">
                                <label htmlFor="rollNumber">Enter student Roll Number</label>
                                <input
                                    type="number"
                                    id="rollNumber"
                                    name="rollNumber"
                                    className={classNames('form-control', { 'is-invalid': rollNumberError })}
                                    placeholder="Roll Number"
                                    onChange={handleInputChange}
                                />
                                {rollNumberError && <div className="invalid-feedback">Roll Number is required</div>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="studentName">Enter student name</label>
                                <input
                                    type="text"
                                    id="studentName"
                                    name="studentName"
                                    className={classNames('form-control', { 'is-invalid': studentNameError })}
                                    placeholder="Student Name"
                                    onChange={handleInputChange}
                                />
                                {studentNameError && <div className="invalid-feedback">Name is required</div>}
                            </div>
                        </>
                    ) : (
                        <div className="form-group mb-3">
                            <label htmlFor="email">Enter your email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={classNames('form-control', { 'is-invalid': emailError })}
                                placeholder="Email"
                                onChange={handleInputChange}
                            />
                            {emailError && <div className="invalid-feedback">Email is required</div>}
                        </div>
                    )}
                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <div className="position-relative">
                            <input
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                name="password"
                                className={classNames('form-control', { 'is-invalid': passwordError })}
                                placeholder="Password"
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="btn btn-link position-absolute"
                                style={{ right: '10px', top: '10px' }}
                                onClick={() => setToggle(!toggle)}
                            >
                                {toggle ? <Visibility /> : <VisibilityOff />}
                            </button>
                        </div>
                        {passwordError && <div className="invalid-feedback">Password is required</div>}
                    </div>
                    <div className="form-group d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                            />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <StyledLink to="#">Forgot password?</StyledLink>
                    </div>
                    <button
                        type="submit"
                        className="btn w-100"
                        style={{ backgroundColor: 'rgb(128,0,0)', borderColor: 'rgb(128,0,0)' }}
                    >
                        {loader ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Login"}
                    </button>
                    {role === "Admin" && (
                        <div className="d-flex align-items-center mt-3">
                            <span>Don't have an account?</span>
                            <StyledLink to="/Adminregister" className="ml-2">Sign up</StyledLink>
                        </div>
                    )}
                </form>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Box>
        </Modal>
    );
};

export default LoginPage;

const StyledLink = styled(Link)`
  color: rgb(127, 86, 218);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;