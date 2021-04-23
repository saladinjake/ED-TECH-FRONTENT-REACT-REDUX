import React, { useEffect, useState, Fragment } from "react";
// import Datas from "../../data/institutions/institutions.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Pagination from "../../components/Pagination";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/institutions.js";

import { getInstitutions } from "services/business";
import Loader from "components/Loader/Loader";

const Institution = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function loadContent() {
      try {
        let response = await getInstitutions();
        setInstitutions([...response.data.data.profiles.data]);
      } catch (err) {
        //   Error
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper institutions-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="institutions" />

        {/* institutions Area */}
        <section className="institutions-area">
          <Container>
            <Row>
              {loading ? (
                <Loader width="70" />
              ) : institutions.length > 0 ? (
                <Fragment>
                  {institutions.map((data, index) => {
                    return (
                      <Col lg="3" md="4" sm="6" key={index}>
                        <div className="institutions-item">
                          <Link
                            to={`${process.env.PUBLIC_URL}/institution/${data.id}`}
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
                                to={`${process.env.PUBLIC_URL}/institution/${data.id}`}
                              >
                                {`${data.company_name}`}
                              </Link>
                            </h5>
                            <p>{data.comapany_description}</p>
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
                  <h1>No institutionss yet</h1>
                </Row>
              )}

              <Col md="12" className="text-center">
                <Pagination />
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

export default Institution;
