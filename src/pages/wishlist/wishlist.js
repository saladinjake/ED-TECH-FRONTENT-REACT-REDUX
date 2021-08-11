import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import { Styles } from "./learners/styles/product.js";
import Active from "./partials/active";

const Wishlists = () => {
  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper product-page">
        {/* Header 2 */}
        <NavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Wishlist" />

        {/* New Poducts Area */}
        <Container>
          <Row>
            <Col lg="12">
              <div className="course-tab-list">
                <Active />
              </div>
            </Col>
          </Row>
        </Container>

        {/* <Footer /> */}
        <Footer />
      </div>
    </Styles>
  );
};

export default Wishlists;
