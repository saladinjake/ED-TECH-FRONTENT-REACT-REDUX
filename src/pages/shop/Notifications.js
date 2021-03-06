import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
// import Pagination from "./../../components/Pagination";
import Footer from "../../components/Footer";
import { Styles } from "./styles/product.js";
import { getNotifications } from "services/notification";
import toast from "react-hot-toast";
import Loader from "components/Loader/Loader";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function loadContent() {
      setLoading(true);
      try {
        let res = await getNotifications();
        setNotifications([...res.data.data]);
      } catch (err) {
        toast.error(`Error occured fetching notifications`);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper product-page">
        {/* Header 2 */}
        <NavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Notifications" />

        {/* Products */}
        <section className="product-area">
          <Container>
            <Row>
              <Col lg="12">
                <Row>
                  <Col md="12" className="text-center">
                    {loading ? (
                      <Loader width="70" />
                    ) : notifications.length > 0 ? (
                      <Fragment>
                        <ul className="list-group check-list">
                          {notifications.map((item, i) => {
                            return (
                              <li className="list-group-item" key={i}>
                                {item.message}
                              </li>
                            );
                          })}
                        </ul>
                      </Fragment>
                    ) : (
                      <h4>No new notifications yet</h4>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer 2 */}
        <Footer />
      </div>
    </Styles>
  );
};

export default Notifications;
