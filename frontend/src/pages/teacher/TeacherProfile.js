import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <Container className="my-4 d-flex justify-content-center">
      <ProfileCard>
        <ProfileCardContent>
          <ProfileText>Name: {currentUser.name}</ProfileText>
          <ProfileText>Email: {currentUser.email}</ProfileText>
          <ProfileText>Class: {teachSclass.sclassName}</ProfileText>
          <ProfileText>Subject: {teachSubject.subName}</ProfileText>
          <ProfileText>School: {teachSchool.schoolName}</ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </Container>
  );
};

export default TeacherProfile;

const ProfileCard = styled(Card)`
  width: 400px;
  border-radius: 10px;
  margin: 20px;
`;

const ProfileCardContent = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled.p`
  margin: 10px;
  font-size: 1rem;
`;