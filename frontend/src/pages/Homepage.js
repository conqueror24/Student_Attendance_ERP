import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/school.jpg';
import { PurpleButton } from '../components/buttonStyles';
import { Carousel, Navbar, Nav } from 'react-bootstrap';

const themeColor = 'rgb(128,0,0)'; // Define your theme color here

const Homepage = () => {
    const aboutRef = useRef(null);
    const academicsRef = useRef(null); // Reference for the Academics section

    const scrollToAbout = () => {
        if (aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToAcademics = () => {
        if (academicsRef.current) {
            academicsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const imageStyle = {
        width: '100%',
        height: '600px', // Adjusted height
        objectFit: 'cover', // Ensures the image covers the container without distortion
    };

    const containerFluidStyle = {
        backgroundColor: '#f8f9fa',
    };

    const cardStyle = {
        borderRadius: '10px',
        borderColor: themeColor,
    };

    const cardBodyStyle = {
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const featureBoxStyle = {
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        marginBottom: '20px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transform: 'translateY(-10px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    };

    // const featureBoxHoverStyle = {
    //     transform: 'translateY(-10px)',
    //     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    // };

    const btnLightStyle = {
        borderRadius: '20px',
        padding: '10px 20px',
        fontWeight: 'bold',
        color: themeColor,
        border: `2px solid ${themeColor}`,
    };

    const carouselCaptionStyle = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        color: themeColor,
    };

    const programBoxStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        margin: '10px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    };

    const programImageStyle = {
        width: '100%',
        height: 'auto',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
    };

    // const programBoxHoverStyle = {
    //     transform: 'translateY(-10px)',
    //     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    // };

    // const programImageStyle = {
    //     width: '100%',
    //     height: 'auto',
    //     borderRadius: '10px',
    //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    // };

    return (
        <div className="container-fluid p-0" style={containerFluidStyle}>
            {/* Navbar with links to different pages */}
            <Navbar bg="blue" variant="dark" expand="lg" className="mb-4">
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} alt="school logo" style={{ width: '60px', borderRadius: '50%' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link onClick={scrollToAbout} style={{ color: themeColor }}>About</Nav.Link>
                        <Nav.Link onClick={scrollToAcademics} style={{ color: themeColor }}>Academics</Nav.Link>
                        <Nav.Link as={Link} to="/login" style={{ color: themeColor }}>Login</Nav.Link>
                        <Nav.Link as={Link} to="/settings" style={{ color: themeColor }}>Settings</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Carousel section */}
            <div className="row mb-4">
                <div className="col-12">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={"https://erocon.in/wp-content/uploads/2018/02/C2-1-1024x527.jpg"}
                                alt="Academics"
                                style={imageStyle}
                            />
                            <Carousel.Caption>
                                <h3 style={carouselCaptionStyle}>Our School</h3>
                                <p>Providing a holistic learning environment.</p>
                                <Link to="/about" className="btn btn-light" style={btnLightStyle}>Learn More</Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={"https://img.freepik.com/premium-photo/highquality-3d-render-classroom-photo-full-vie_315725-57.jpg"}
                                alt="Academics"
                                style={imageStyle}
                            />
                            <Carousel.Caption>
                                <h3 style={carouselCaptionStyle}>Academics</h3>
                                <p>Excellence in education and learning.</p>
                                <Link to="/academics" className="btn btn-light" style={btnLightStyle}>Learn More</Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={"https://thumbs.dreamstime.com/b/running-track-sports-ground-complex-36160290.jpg"}
                                alt="Sports"
                                style={imageStyle}
                            />
                            <Carousel.Caption>
                                <h3 style={carouselCaptionStyle}>Sports</h3>
                                <p>Encouraging physical activity and teamwork.</p>
                                <Link to="/sports" className="btn btn-light" style={btnLightStyle}>Learn More</Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={"https://images.squarespace-cdn.com/content/v1/53497a03e4b0bccee307edee/1397483198648-65ASEWMZ5A5ENWM2EIGD/ke17ZwdGBToddI8pDm48kKG6OoQUcDwE6Xrn0CktdYIUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKc7wdBxA2FfWIL_oInLxCuGYBExGLaY8v4Pn7yFeMELUKe4DQXRx1Bu1AnCO9mIfj2/Pre-K+409.jpg"}
                                alt="Play School"
                                style={imageStyle}
                            />
                            <Carousel.Caption>
                                <h3 style={carouselCaptionStyle}>Play School</h3>
                                <p>Providing a holistic learning environment.</p>
                                <Link to="/play-school" className="btn btn-light" style={btnLightStyle}>Learn More</Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={"https://i.pinimg.com/originals/7a/b6/5b/7ab65b6cfd63fff5933fd94be9f34960.jpg"}
                                alt="Library"
                                style={imageStyle}
                            />
                            <Carousel.Caption>
                                <h3 style={carouselCaptionStyle}>Library</h3>
                                <p>Our library offers a wide range of books and resources to support your educational journey.</p>
                                <Link to="/library" className="btn btn-light" style={btnLightStyle}>Learn More</Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>

            {/* Login Card */}
            <div className="row mb-4">
                <div className="col-md-6 offset-md-3">
                    <div className="card border-primary shadow-lg p-4" style={cardStyle}>
                        <div className="card-body d-flex flex-column align-items-center" style={cardBodyStyle}>
                            <p className="card-text mb-4 text-center">
                                Welcome to MySchool! Our mission is to provide a supportive and innovative learning environment that nurtures students' intellectual and personal growth. Explore our programs and join our vibrant community.
                            </p>
                            <Link to="/choose" className="w-100 mb-3">
                                <PurpleButton variant="contained" className="w-100" style={{ backgroundColor: themeColor, color: '#fff' }}>Explore Programs</PurpleButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={academicsRef} className="row mb-4">
                <div className="col-12 text-center bg-light p-5 rounded shadow-sm">
                    <h2 className="display-4" style={{ color: themeColor }}>Academics</h2>
                    <img
                        src={"https://www.cornwallcollege.edu.jm/images/studentlife/Academics-image.jpg"}
                        alt="Academics"
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                    />
                    <p className="lead mt-4">
                        Our academic programs are designed to foster a love for learning and encourage intellectual curiosity. We offer a range of subjects and extracurricular activities to ensure that every student finds their passion and excels.
                    </p>
                    <p>
                        Our curriculum is tailored to meet the needs of each student, providing opportunities for hands-on learning and real-world applications. Our dedicated faculty members are committed to guiding students through their educational journey and preparing them for future success.
                    </p>
                </div>
            </div>
            {/* Features Section */}
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h2 className="display-4 font-weight-bold" style={{ color: themeColor }}>Why Choose Us?</h2>
                </div>
                <div className="col-md-4">
                    <div className="feature-box p-4 bg-light rounded shadow-sm" style={featureBoxStyle}>
                        <h3 style={{ color: themeColor }}>Experienced Faculty</h3>
                        <p>Our experienced teachers are dedicated to providing the best education.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="feature-box p-4 bg-light rounded shadow-sm" style={featureBoxStyle}>
                        <h3 style={{ color: themeColor }}>State-of-the-Art Facilities</h3>
                        <p>Modern classrooms and facilities to enhance the learning experience.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="feature-box p-4 bg-light rounded shadow-sm" style={featureBoxStyle}>
                        <h3 style={{ color: themeColor }}>Diverse Extracurriculars</h3>
                        <p>From sports to arts, we offer a range of activities for all interests.</p>
                    </div>
                </div>
            </div>
            {/* Testimonials Section */}
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h2 className="display-4 font-weight-bold" style={{ color: themeColor }}>What Our Community Says</h2>
                </div>
                <div className="col-md-4">
                    <div className="testimonial-box p-4 bg-light rounded shadow-sm" style={featureBoxStyle}>
                        <p>"MySchool has been a transformative experience for my child. The supportive environment and excellent teaching staff have helped them thrive both academically and personally."</p>
                        <p>- Parent</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="testimonial-box p-4 bg-light rounded shadow-sm" style={featureBoxStyle}>
                        <p>"The extracurricular activities at MySchool are second to none. My child has developed a love for sports and the arts thanks to the diverse opportunities available."</p>
                        <p>- Student</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="testimonial-box p-4 bg-light rounded shadow-sm" style={featureBoxStyle}>
                        <p>"My experience as a teacher at MySchool has been incredibly rewarding. The supportive community and collaborative atmosphere make it a fantastic place to work."</p>
                        <p>- Teacher</p>
                    </div>
                </div>
            </div>




            {/* <div className="col-md-4">
                <div className="feature-box p-4 bg-light rounded shadow-sm" style={featureBoxStyle}>
                    <h3 style={{ color: themeColor }}>Experienced Faculty</h3>
                    <p>Our experienced teachers are dedicated to providing the best education.</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="feature-box p-4 bg-light rounded shadow-sm" style={featureBoxStyle}>
                    <h3 style={{ color: themeColor }}>State-of-the-Art Facilities</h3>
                    <p>Modern classrooms and facilities to enhance the learning experience.</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="feature-box p-4 bg-light rounded shadow-sm" style={featureBoxStyle}>
                    <h3 style={{ color: themeColor }}>Diverse Extracurriculars</h3>
                    <p>From sports to arts, we offer a range of activities for all interests.</p>
                </div>
            </div> */}

            {/* Our Programs Section */}
            <div className="row">
                <div className="col-md-3" style={programBoxStyle}>
                    <img
                        src="https://th.bing.com/th/id/R.fc371822fa0f26e4067193709e735e46?rik=JlWDMeK%2f%2btmV9w&riu=http%3a%2f%2fwww.ecaformacion.com%2fwp-content%2fuploads%2f2018%2f09%2f1_w6cB9tYRUfp60x12mwIoCQ.jpeg&ehk=NIWL9RwUGqpXRE6PVtqLUxYShgXgBLZ99pLYYOzOz%2b4%3d&risl=&pid=ImgRaw&r=0"
                        alt="Early Childhood"
                        className="img-fluid"
                        style={programImageStyle}
                    />
                    <div className="p-4">
                        <h3 style={{ color: themeColor }}>Early Childhood Education</h3>
                        <p>Our early childhood education program focuses on nurturing the young minds with a blend of play and structured learning, laying a strong foundation for future academic success.</p>
                    </div>
                </div>

                <div className="col-md-3" style={programBoxStyle}>
                    <img
                        src="https://t3.ftcdn.net/jpg/06/31/52/60/360_F_631526070_ZJO4cifHgnACIxYNmdlcrs9o44WvNtDk.jpg"
                        alt="Primary Education"
                        className="img-fluid"
                        style={programImageStyle}
                    />
                    <div className="p-4">
                        <h3 style={{ color: themeColor }}>Primary Education</h3>
                        <p>Our primary education program offers a comprehensive curriculum that encourages critical thinking, creativity, and a love for learning.</p>
                    </div>
                </div>

                <div className="col-md-3" style={programBoxStyle}>
                    <img
                        src="https://www.edustoke.com/assets/uploads-new/st-angeland39s-school-1495799066-4.jpg"
                        alt="Secondary Education"
                        className="img-fluid"
                        style={programImageStyle}
                    />
                    <div className="p-4">
                        <h3 style={{ color: themeColor }}>Secondary Education</h3>
                        <p>Our secondary education program prepares students for higher education and their future careers with a robust academic and extracurricular framework.</p>
                    </div>
                </div>
            </div>
            </div>
            );
};

export default Homepage;
