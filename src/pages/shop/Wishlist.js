import React, { useEffect, Fragment } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavBar from "components/Navbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import { Styles } from "./styles/cart.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFromWishList } from "actions/wishListActions";

import { getWishlist } from "services/wishlist";

const WishList = (props) => {
  console.log(props);
  const {
    auth: { isAuthenticated },
    wishBag: { wishBag, totalWishes },
    removeFromWishList,
  } = props;

  let history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login", { from: history.location.pathname });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // try{
    //   const dbWishList = await getWishlist();
    // let wishes =dbWishList.data.data.course
    // }catch(e){
    // }
  });

  const removeItemFromWish = async (id) => {
    console.log("func recived", id);
    await removeFromWishList(id);

    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  // console.log(wishList)
  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper wishList-page">
        {/* Header 2 */}
        <NavBar />
        <BreadcrumbBox title="wishlist" />

        <section className="wishList-area">
          <br />
          <br />
          <br />
          <br />
          <Container>
            <Row>
              <Col lg="8" md="12">
                <div className="product-list table-responsive">
                  <Table className="table-bordered">
                    <thead>
                      <tr>
                        <th className="product-remove">Action</th>
                        <th className="product-thumbnail">Course</th>
                        <th className="product-name">Course Title</th>
                        <th className="product-price">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishBag.length > 0 ? (
                        <Fragment>
                          {wishBag.map((data, i) => {
                            return (
                              <tr key={i}>
                                <td className="product-remove">
                                  <button
                                    className="btn btn-danger"
                                    onClick={removeItemFromWish.bind(
                                      this,
                                      data.id
                                    )}
                                  >
                                    remove
                                    <i className="las la-trash"></i>
                                  </button>
                                  {/* <button
                                    onClick={removeFromCart.bind(this, data.id)}
                                  >
                                    <i className="las la-trash"></i>
                                  </button> */}
                                </td>
                                <td className="product-thumbnail">
                                  <img src={data.course_cover_image} alt="" />
                                </td>
                                <td className="product-title">
                                  {data.course_name}
                                </td>
                                <td className="product-price">
                                  <span className="amount">#{data.price}</span>
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td className="product-subtotal">
                            <span className="subtotal">
                              No items in wishList
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>

              <Col lg="4" md="6">
                <div className="wishList-summary">
                  <div className="cs-title text-center">
                    <h5>Browse Courses</h5>
                  </div>
                  <br />
                  <div className="cs-content">
                    <p className="cart-total" style={{ marginLeft: "100px" }}>
                      <button
                        type="button"
                        onClick={() => history.push("/courses")}
                        className="btn btn-primary"
                      >
                        Browse a course
                      </button>
                    </p>
                  </div>
                </div>
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

const cachedWishlist =
  localStorage && JSON?.parse(localStorage.getItem("wishes"));
const cachedTotal = localStorage && localStorage.getItem("total");

let wishListedItems = cachedWishlist ? cachedWishlist : [];
let total = cachedTotal ? cachedTotal : 0;
if (localStorage.getItem("wishes")) {
  wishListedItems = { wishBag: wishListedItems };
} else {
  wishListedItems = { wishBag: [] };
}
WishList.propTypes = {
  auth: PropTypes.object.isRequired,
  wishBag: PropTypes.object.isRequired,
  removeFromWishList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wishBag: state.wishBag || wishListedItems,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  removeFromWishList,
})(WishList);
// export default WishList
