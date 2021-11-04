import React, { useEffect, useState, Fragment } from "react";
// import Datas from "../../data/instructor/instructor.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/shared/NavBar";
import Pagination from "./Pagination";
import FooterTwo from "../../components/shared/Footer";
import { Styles } from "./styles/instructor.js";

import { getInstructors } from "../../api/enrollment_services/instructor.services";
import Loader from "../../components/Loader/Loader";

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [instructorPerPage] = useState(3);
  const [currentInstructors, setCurrInstructors] = useState([]);

  // Get current instructor
  var indexOfLastInstructor = currentPage * instructorPerPage;
  var indexOfFirstInstructor = indexOfLastInstructor - instructorPerPage;

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    indexOfLastInstructor = pageNumber * instructorPerPage;
    indexOfFirstInstructor = indexOfLastInstructor - instructorPerPage;
    setCurrInstructors(
      instructors.slice(indexOfFirstInstructor, indexOfLastInstructor)
    );
  };

  useEffect(() => {
    (async function loadContent() {
      try {
        let response = await getInstructors();
        setInstructors([...response.data.data.data]);
      } catch (err) {
        //   Error
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    instructors.length > 0 &&
      setCurrInstructors(
        instructors.slice(indexOfFirstInstructor, indexOfLastInstructor)
      );
    // eslint-disable-next-line
  }, [instructors]);

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper instructor-page">
        {/* Header 2 */}
        <HeaderTwo />

       
        {/* Instructor Area */}
        <section className="instructor-area">
          <Container>
            <Row>
              {loading ? (
                <Loader width="70" />
              ) : currentInstructors.length > 0 ? (
                <Fragment>
                  {currentInstructors.map((data, index) => {
                    return (
                      <Col lg="3" md="4" sm="6" key={index}>
                        <div className="instructor-item">
                          <Link
                            to={`${process.env.PUBLIC_URL}/instructors/${data.id}`}
                          >
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                `/assets/images/${data.image}`
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </Link>
                          <div className="img-content text-center">
                            <h5>
                              <Link
                                to={`${process.env.PUBLIC_URL}/instructors/${data.id}`}
                              >
                                {`${data.first_name} ${data.last_name}`}
                              </Link>
                            </h5>
                            <p>{data.personTitle}</p>
                            {/* <ul className="list-unstyled list-inline">
                              <li className="list-inline-item">
                                <a
                                  href={
                                    process.env.PUBLIC_URL +
                                    data.socialLinks.facebook
                                  }
                                >
                                  <i className="fab fa-facebook-f"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href={
                                    process.env.PUBLIC_URL +
                                    data.socialLinks.twitter
                                  }
                                >
                                  <i className="fab fa-twitter"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href={
                                    process.env.PUBLIC_URL +
                                    data.socialLinks.youtube
                                  }
                                >
                                  <i className="fab fa-youtube"></i>
                                </a>
                              </li>
                            </ul> */}
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Fragment>
              ) : (
                <Row>
                  <h1>No instructors yet</h1>
                </Row>
              )}

              <Col md="12" className="text-center">
                <Pagination
                  instructorPerPage={instructorPerPage}
                  totalInstructors={instructors}
                  paginate={paginate}
                />
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </Styles>
  );
};

export default Instructor;
