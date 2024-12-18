import React from 'react';
import styled from 'styled-components';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response); }
  else if (error) { console.log(error); }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <>
      <Container fluid="md">
        <StyledPaper>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center">
              <Image
                roundedCircle
                alt="Student Avatar"
                src="https://img.freepik.com/premium-vector/student-avatar-illustration-user-profile-icon-youth-avatar_118339-4401.jpg" // Replace with the actual path to the avatar image
                style={{ width: 150, height: 150 }}
              />
            </Col>
            <Col xs={12} className="text-center">
              <h2>{currentUser.name}</h2>
            </Col>
            <Col xs={12} className="text-center">
              <p>Student Roll No: {currentUser.rollNum}</p>
            </Col>
            <Col xs={12} className="text-center">
              <p>Class: {sclassName.sclassName}</p>
            </Col>
            <Col xs={12} className="text-center">
              <p>School: {studentSchool.schoolName}</p>
            </Col>
          </Row>
        </StyledPaper>
        <Card>
          <Card.Body>
            <Card.Title>Personal Information</Card.Title>
            <Row>
              <Col xs={12} sm={6}>
                <p><strong>Date of Birth:</strong> January 1, 2000</p>
              </Col>
              <Col xs={12} sm={6}>
                <p><strong>Gender:</strong> Male</p>
              </Col>
              <Col xs={12} sm={6}>
                <p><strong>Email:</strong> john.doe@example.com</p>
              </Col>
              <Col xs={12} sm={6}>
                <p><strong>Phone:</strong> (123) 456-7890</p>
              </Col>
              <Col xs={12} sm={6}>
                <p><strong>Address:</strong> 123 Main Street, City, Country</p>
              </Col>
              <Col xs={12} sm={6}>
                <p><strong>Emergency Contact:</strong> (987) 654-3210</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default StudentProfile;

const StyledPaper = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 5px;
`;