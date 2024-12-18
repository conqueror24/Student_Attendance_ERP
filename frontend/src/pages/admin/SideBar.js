import * as React from 'react';
import { Nav, NavItem, NavLink, Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const iconStyle = { marginRight: '8px' };

const SideBar = () => {
    const location = useLocation();
    const activePath = location.pathname;

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="bg-light p-3">
                    <Nav className="flex-column">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" active={activePath === "/" || activePath.startsWith("/Admin/dashboard")}>
                                <HomeIcon style={iconStyle} />
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Admin/classes" active={activePath.startsWith('/Admin/classes')}>
                                <ClassOutlinedIcon style={iconStyle} />
                                Classes
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Admin/subjects" active={activePath.startsWith("/Admin/subjects")}>
                                <AssignmentIcon style={iconStyle} />
                                Subjects
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Admin/teachers" active={activePath.startsWith("/Admin/teachers")}>
                                <SupervisorAccountOutlinedIcon style={iconStyle} />
                                Teachers
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Admin/students" active={activePath.startsWith("/Admin/students")}>
                                <PersonOutlineIcon style={iconStyle} />
                                Students
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Admin/notices" active={activePath.startsWith("/Admin/notices")}>
                                <AnnouncementOutlinedIcon style={iconStyle} />
                                Notices
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Admin/complains" active={activePath.startsWith("/Admin/complains")}>
                                <ReportIcon style={iconStyle} />
                                Complains
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr />
                    <Nav className="flex-column">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Admin/profile" active={activePath.startsWith("/Admin/profile")}>
                                <AccountCircleOutlinedIcon style={iconStyle} />
                                Profile
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/logout" active={activePath === "/logout"}>
                                <ExitToAppIcon style={iconStyle} />
                                Logout
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        </Container>
    );
};

export default SideBar;