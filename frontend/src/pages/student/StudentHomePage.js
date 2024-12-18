import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';


const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <>
            <Container fluid style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <Row className="g-3">
                    <Col xs={12} md={2} lg={2}>
                        <StyledCard>
                            <Card.Img variant="top" src={Subject} alt="Subjects" />
                            <Card.Body>
                                <Card.Title>Total Subjects</Card.Title>
                                <Card.Text>
                                    <Data start={0} end={numberOfSubjects} duration={2.5} />
                                </Card.Text>
                            </Card.Body>
                        </StyledCard>
                    </Col>
                    <Col xs={12} md={2} lg={2}>
                        <StyledCard>
                            <Card.Img variant="top" src={Assignment} alt="Assignments" />
                            <Card.Body>
                                <Card.Title>Total Assignments</Card.Title>
                                <Card.Text>
                                    <Data start={0} end={15} duration={4} />
                                </Card.Text>
                            </Card.Body>
                        </StyledCard>
                    </Col>
                    <Col xs={12} md={4} lg={3}>
                        <ChartContainer>
                            {
                                response ?
                                    <Card.Text>No Attendance Found</Card.Text>
                                    :
                                    <>
                                        {loading
                                            ? (
                                                <Card.Text>Loading...</Card.Text>
                                            )
                                            :
                                            <>
                                                {
                                                    subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                        <>
                                                            <CustomPieChart data={chartData} />
                                                        </>
                                                    )
                                                        :
                                                        <Card.Text>No Attendance Found</Card.Text>
                                                }
                                            </>
                                        }
                                    </>
                            }
                        </ChartContainer>
                    </Col>
                    {/* <Col xs={12}>
                        <Card style={{ padding: '1rem' }}>
                            <SeeNotice />
                        </Card>
                    </Col> */}
                </Row>
            </Container>
        </>
    );
};

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledCard = styled(Card)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

export default StudentHomePage;