import React, { Fragment } from "react";

import { SideBar } from "./sidebar";
import NavBar from "components/Navbar/AuthoringNav";
import { Styles } from "./styles/main.js";

const PaymentSettings = () => {
  return (
    <Fragment>
      <div className="row ">
        <div className="col-md-12">
          <div className="card" style={{ height: "140px" }}>
            <div className="card-body">
              <h4 className="page-title">
                {" "}
                <i className="fa fa-home title_icon"></i> Setup payment
                informations
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-7" style={{ padding: "0" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="header-title">
                  <p>Setup paypal settings</p>
                </h4>
                <form
                  className=""
                  action=""
                  method="post"
                  enctype="multipart/form-data"
                >
                  <div className="form-group">
                    <label>Client id (Production)</label>
                    <input
                      type="text"
                      name="paypal_client_id"
                      className="form-control"
                      value=""
                      required=""
                    />
                  </div>

                  <div className="form-group">
                    <label>Secret key (Production)</label>
                    <input
                      type="text"
                      name="paypal_secret_key"
                      className="form-control"
                      placeholder="No secret key found"
                      required=""
                    />
                  </div>

                  <div className="row justify-content-md-center">
                    <div className="form-group col-md-6">
                      <button
                        className="btn btn-block btn-primary"
                        type="submit"
                      >
                        Update paypal keys
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="header-title">
                  <p>Setup stripe settings</p>
                </h4>
                <form
                  className=""
                  action=""
                  method="post"
                  enctype="multipart/form-data"
                >
                  <div className="form-group">
                    <label>Live secret key</label>
                    <input
                      type="text"
                      name="stripe_secret_key"
                      className="form-control"
                      value=""
                      required=""
                    />
                  </div>

                  <div className="form-group">
                    <label>Live public key</label>
                    <input
                      type="text"
                      name="stripe_public_key"
                      className="form-control"
                      value=""
                      required=""
                    />
                  </div>

                  <div className="row justify-content-md-center">
                    <div className="form-group col-md-6">
                      <button
                        className="btn btn-block btn-primary"
                        type="submit"
                      >
                        Update stripe keys
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const PaySettings = () => {
  return (
    <Fragment>
      <NavBar />
      <br />
      <br />
      <br />
      <br />

      <div className="container-fluid">
        <div className="wrapper">
          <div class="content-page-x col-md-12">
            <div class="content-x">
              <PaymentSettings />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PaySettings;
