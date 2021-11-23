import React from "react";
import { Link } from "react-router-dom";

const QuickMenus = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-9 p-3">
            <div className="row text-white">
              <div className="col-md-4 mb-2">
                <div className="card bg-green-gradient px-5 pt-5 pb-3 border-radius-15">
                  <h6 className="card-title">My Learning</h6>
                  <Link to="" className="btn btn-light border-radius-20 btn-sm">
                    View More
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <div className="card bg-green-gradient px-5 pt-5 pb-3 border-radius-15">
                  <h6 className="card-title">Wishlist</h6>
                  <Link to="" className="btn btn-light border-radius-20 btn-sm">
                    View More
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <div className="card bg-green-gradient px-5 pt-5 pb-3 border-radius-15">
                  <h6 className="card-title">Cart</h6>
                  <Link to="" className="btn btn-light border-radius-20 btn-sm">
                    View More
                  </Link>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <div className="card bg-dark-gradient text-white px-5 py-4 border-radius-15">
                  <div className="row">
                    <div className="col-md-4">
                      <h5 className="card-title fw-bold">User profile</h5>
                      <Link to="" className="text-decoration-none text-white">
                        Complete your profile{" "}
                        <i class="bi bi-chevron-right"></i>
                      </Link>
                    </div>
                    <div className="col-md-4 ms-auto">
                      <div className="outer float-end ">
                        <div className="inner position-relative">
                          <span className="position-absolute top-40 start-40">
                            3%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickMenus;
