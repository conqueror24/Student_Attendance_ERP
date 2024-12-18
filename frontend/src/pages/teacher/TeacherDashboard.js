import { useState } from 'react';
import { Container, Navbar, Nav, Button, Offcanvas, Row, Col } from 'react-bootstrap';
import { FaBars, FaChevronLeft } from 'react-icons/fa';
import { Navigate, Route, Routes } from 'react-router-dom';
import TeacherSideBar from './TeacherSideBar';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

const TeacherDashboard = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Button variant="outline-light" onClick={handleShow}>
                    <FaBars />
                </Button>
                <Navbar.Brand href="#" className="mx-3">Teacher Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <AccountMenu />
                </Navbar.Collapse>
            </Navbar>
            
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Teacher Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <TeacherSideBar />
                </Offcanvas.Body>
            </Offcanvas>

            <Container fluid className="mt-5 pt-3">
                <Routes>
                    <Route path="/" element={<TeacherHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                    <Route path="/Teacher/profile" element={<TeacherProfile />} />
                    <Route path="/Teacher/complain" element={<TeacherComplain />} />
                    <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                    <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />
                    <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                    <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Container>
        </Container>
    );
}

export default TeacherDashboard;