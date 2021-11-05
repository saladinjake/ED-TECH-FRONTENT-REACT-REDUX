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
import "./empty.css";

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
    document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";
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
        {/* <BreadcrumbBox title="wishlist" />*/}

        <section className="wishList-area">
          <br />
          <br />
          <br />
          <br />
          <Container>
            <div className="col-sm-12">
              <h4
                className="page-title"
                style={{
                  fontWeight: "300px",
                  color: "#333",
                  fontSize: "25px",
                  fontFamily: "Open Sans",
                  lineHight: "34px",
                  letterSpacing: "-1px",
                  fontWeight: "normal",
                }}
              >
                Wishlist
              </h4>
            </div>

            <Row>
              <Col lg="8" md="12">
                <div className="product-list table-responsive">
                  <Table className="table-bordered">
                    <thead>
                      <tr>
                        <th
                          className="product-remove"
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Action
                        </th>
                        <th
                          className="product-thumbnail"
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Course
                        </th>
                        <th
                          className="product-name"
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Course Title
                        </th>
                        <th
                          className="product-price"
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishBag.length > 0 ? (
                        <Fragment>
                          {wishBag.map((data, i) => {
                            return (
                              <tr key={i}>
                                <td
                                  className="product-remove"
                                  style={{
                                    border: "none",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  <button
                                    className=""
                                    onClick={removeItemFromWish.bind(
                                      this,
                                      data.id
                                    )}
                                    style={{
                                      background: "rgba(8,23,200)",
                                      fontSize: "12px",
                                      marginLeft: "10px",
                                      fontWeight: "bold",
                                      fontFamily: "Open Sans",
                                      color: "#fff",
                                    }}
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
                                <td
                                  className="product-thumbnail"
                                  style={{
                                    border: "none",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  <img src={data.course_cover_image} alt="" />
                                </td>
                                <td
                                  className="product-title"
                                  style={{
                                    border: "none",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {data.course_name}
                                </td>
                                <td
                                  className="product-price"
                                  style={{
                                    border: "none",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  <span className="amount">#{data.price}</span>
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <Fragment>
                          <div class="empty-cart">
                            <br />
                            <br />
                            <br />
                            <h3
                              style={{
                                fontWeight: "300px",
                                color: "#333",
                                fontSize: "25px",
                                fontFamily: "Open Sans",
                                lineHight: "34px",
                                letterSpacing: "-1px",
                                fontWeight: "normal",
                              }}
                            >
                              Your Wish list is empty
                            </h3>
                            <br />
                            <br />
                            <p
                              style={{
                                width: "100%",
                                fontWeight: "300px",
                                color: "#333",
                                fontSize: "14px",
                                fontFamily: "Open Sans",
                                lineHight: "34px",
                                letterSpacing: "-1px",
                                fontWeight: "normal",
                              }}
                            >
                              Click on browse a course and add to your wishlist.
                            </p>

                            <button
                              type="button"
                              onClick={() => history.push("/courses")}
                              style={{
                                width: "50%",
                                background: "rgba(8,23,200)",
                                fontSize: "12px",
                                marginLeft: "10px",
                                fontWeight: "bold",
                                fontFamily: "Open Sans",
                                color: "#fff",
                              }}
                            >
                              Browse a course
                            </button>
                          </div>
                        </Fragment>
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
                        style={{
                          background: "rgba(8,23,200)",
                          fontSize: "12px",
                          marginLeft: "10px",
                          fontWeight: "bold",
                          fontFamily: "Open Sans",
                          color: "#fff",
                        }}
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
