import { useState } from 'react';
import {
    Navbar,
    Container,
    Nav,
    Button,
    Offcanvas,
} from 'react-bootstrap';

import { Navigate, Route, Routes } from 'react-router-dom';
import StudentSideBar from './StudentSideBar';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand={false} fixed="top">
                <Container fluid>
                    <Button variant="outline-light" onClick={toggleDrawer}>
                        <span className="navbar-toggler-icon"></span>
                    </Button>
                    <Navbar.Brand href="#">Student Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Collapse className="justify-content-end">
                        <AccountMenu />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Offcanvas show={open} onHide={toggleDrawer} style={styles.offcanvasStyled}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <StudentSideBar />
                </Offcanvas.Body>
            </Offcanvas>
            <Container fluid style={styles.containerStyled}>
                <Routes>
                    <Route path="/" element={<StudentHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Student/dashboard" element={<StudentHomePage />} />
                    <Route path="/Student/profile" element={<StudentProfile />} />

                    <Route path="/Student/subjects" element={<StudentSubjects />} />
                    <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                    <Route path="/Student/complain" element={<StudentComplain />} />

                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Container>
        </>
    );
}

export default StudentDashboard;

const styles = {
    containerStyled: {
        backgroundColor: '#f8f9fa',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        paddingTop: '56px', // Offset for the fixed navbar height
    },
    offcanvasStyled: {
        width: '250px',
    },
};