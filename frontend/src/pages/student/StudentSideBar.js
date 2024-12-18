import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListGroup, ListGroupItem, Nav } from 'react-bootstrap';
import { House, BoxArrowRight, PersonCircle, Megaphone, Clipboard, Book } from 'react-bootstrap-icons';

const StudentSideBar = () => {
    const location = useLocation();
    return (
        <>
            <Nav defaultActiveKey="/" className="flex-column">
                <ListGroup>
                    <ListGroupItem as={Link} to="/" active={location.pathname === ("/" || "/Student/dashboard")}>
                        <House color={location.pathname === ("/" || "/Student/dashboard") ? 'blue' : 'black'} /> Home
                    </ListGroupItem>
                    <ListGroupItem as={Link} to="/Student/subjects" active={location.pathname.startsWith("/Student/subjects")}>
                        <Clipboard color={location.pathname.startsWith("/Student/subjects") ? 'blue' : 'black'} /> Subjects
                    </ListGroupItem>
                    <ListGroupItem as={Link} to="/Student/attendance" active={location.pathname.startsWith("/Student/attendance")}>
                        <Book color={location.pathname.startsWith("/Student/attendance") ? 'blue' : 'black'} /> Attendance
                    </ListGroupItem>
                    <ListGroupItem as={Link} to="/Student/complain" active={location.pathname.startsWith("/Student/complain")}>
                        <Megaphone color={location.pathname.startsWith("/Student/complain") ? 'blue' : 'black'} /> Complain
                    </ListGroupItem>
                </ListGroup>
                <hr />
                <Nav.Item>
                    <Nav.Link as={Link} to="/Student/profile" active={location.pathname.startsWith("/Student/profile")}>
                        <PersonCircle color={location.pathname.startsWith("/Student/profile") ? 'blue' : 'black'} /> Profile
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/logout" active={location.pathname.startsWith("/logout")}>
                        <BoxArrowRight color={location.pathname.startsWith("/logout") ? 'blue' : 'black'} /> Logout
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default StudentSideBar;