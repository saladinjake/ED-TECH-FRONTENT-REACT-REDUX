import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/institutions.js";

import Loader from "components/Loader/Loader";
import { getInstitution } from "services/business";

const InstitutionDetails = ({ match }) => {
  const [details, setDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);

  const init = async () => {
    let institutionId = parseInt(match.params.id);
    try {
      let response = await getInstitution(institutionId);
      setDetails({ ...response.data.data });
      if (response.status === 200) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper instructor-details-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Instructor Details" />

        {/* Instructor Details Area */}
        <section className="instructor-details-area">
          <Container>
            {loading ? (
              <Loader width="70" />
            ) : Object.entries(details).length !== 0 ? (
              <Fragment>
                <Row>
                  <Col md="4">
                    <div className="instructor-img">
                      <ul className="list-unstyled getintouch">
                        <li>
                          <i className="las la-phone"></i>
                          {`${details?.user?.first_name} ${details?.user?.last_name}`}
                        </li>
                        <li>
                          <i className="lar la-envelope"></i>
                          {details?.user.email}{" "}
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Fragment>
            ) : (
              <Row>
                <h1>No details for this instructor yet</h1>
              </Row>
            )}
          </Container>
        </section>

        {/* Footer 2 */}
        <FooterTwo />
      </div>
    </Styles>
  );
};

export default InstitutionDetails;
