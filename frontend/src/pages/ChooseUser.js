import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import styled from 'styled-components';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    } else if (user === "Parent") {
      if (visitor === "guest") {
        const email = "mom@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Parentlogin');
      }
    }
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
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <Container>
      <Grid>
        <Card onClick={() => navigateHandler("Admin")}>
          <Image src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="Admin Avatar" />
          <Title>Admin</Title>
          <Text>Login as an administrator to access the dashboard to manage app data.</Text>
        </Card>
        <Card onClick={() => navigateHandler("Student")}>
          <Image src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="Student Avatar" />
          <Title>Student</Title>
          <Text>Login as a student to explore course materials and assignments.</Text>
        </Card>
        <Card onClick={() => navigateHandler("Teacher")}>
          <Image src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="Teacher Avatar" />
          <Title>Teacher</Title>
          <Text>Login as a teacher to create courses, assignments, and track student progress.</Text>
        </Card>
        {/* Uncomment and add similar card for Parent if needed */}
        {/* <Card onClick={() => navigateHandler("Parent")}>
          <Image src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg" alt="Parent Avatar" />
          <Title>Parent</Title>
          <Text>Login as a parent to check attendance status and marks.</Text>
        </Card> */}
      </Grid>

      {loader && (
        <LoaderContainer>
          <Loader>Loading...</Loader>
        </LoaderContainer>
      )}

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default ChooseUser;

// Styled Components
const Container = styled.div`
  background: linear-gradient(to bottom, #FFFFFF, #F0F0F0);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
`;

const Card = styled.div`
  background-color: rgb(128, 0, 0);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-align: center;
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgb(128, 0, 0);
  margin-bottom: 1rem;
`;

const Title = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.4;
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Loader = styled.div`
  color: #fff;
  font-size: 1.5rem;
`;
