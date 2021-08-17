import React, { Fragment } from "react";
import { SideBar } from "./sidebar";
import NavBar from "components/Navbar/AuthoringNav";

const PayOuts = () => {
  return (
    <Fragment>
      <div className="row ">
        <div className="col-md-12">
          <div className="card" style={{ height: "140px" }}>
            <div className="card-body">
              <h4 className="page-title">
                <i className="fa fa-home title_icon"></i> Payout report
                <a
                  href="#"
                  className="btn btn-outline-primary btn-rounded alignToTitle"
                >
                  <i className="mdi mdi-plus"></i>Request a new withdrawal
                </a>
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <div className="float-right bg-white">
                <i className="fa fa-currency-usd widget-icon text-danger"></i>
              </div>
              <p
                className="text-white font-weight-normal mt-0"
                title="Pending amount"
              >
                Pending amount
              </p>
              <h3 className="mt-3 mb-3">
                <span className="text-white" style={{ color: "#fff" }}>
                  <i className="fa fa-arrow-down"></i>
                </span>
                ₦0{" "}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-4 pull-right">
          <div className="card text-white bg-success">
            <div className="card-body">
              <div className="float-right bg-white">
                <i className="fa fa-currency-usd widget-icon text-success"></i>
              </div>
              <p
                className="text-white font-weight-normal mt-0"
                title="Total payout amount"
              >
                Total payout amount
              </p>
              <h3 className="mt-3 mb-3">
                <span className="text-white" style={{ color: "#fff" }}>
                  <i className="fa fa-arrow-down"></i>
                </span>
                ₦0{" "}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-4 pull-right">
          <div className="card text-white bg-info">
            <div className="card-body">
              <div className="float-right bg-white">
                <i className="fa fa-currency-usd widget-icon text-primary"></i>
              </div>
              <p
                className="text-white font-weight-normal mt-0"
                title="Requested withdrawal amount"
              >
                Requested withdrawal{" "}
              </p>
              <h3 className="mt-3 mb-3">
                <span className="text-white" style={{ color: "#fff" }}>
                  <i className="fa fa-arrow-down"></i>
                </span>{" "}
                ₦0
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="mb-3 header-title">Payout report</h4>
              <div className="table-responsive-sm mt-4">
                <div
                  id="basic-datatable_wrapper"
                  className="dataTables_wrapper dt-bootstrap4 no-footer"
                >
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div
                        className="dataTables_length"
                        id="basic-datatable_length"
                      >
                        <label>
                          Show
                          <select
                            name="basic-datatable_length"
                            aria-controls="basic-datatable"
                            className="custom-select custom-select-sm form-control form-control-sm"
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>{" "}
                          entries
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div
                        id="basic-datatable_filter"
                        className="dataTables_filter"
                      >
                        <label>
                          Search:
                          <input
                            type="search"
                            className="form-control form-control-sm"
                            placeholder=""
                            aria-controls="basic-datatable"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div
                        style={{
                          position: "absolute",
                          height: "1px",
                          width: "0px",
                          overflow: "hidden",
                        }}
                      >
                        <input type="text" tabindex="0" />
                      </div>
                      <table
                        id="basic-datatable"
                        className="table table-striped table-centered mb-0 dataTable no-footer"
                        role="grid"
                        aria-describedby="basic-datatable_info"
                        style={{ position: "relative" }}
                      >
                        <thead>
                          <tr role="row">
                            <th
                              className="sorting_asc"
                              tabindex="0"
                              aria-controls="basic-datatable"
                              rowspan="1"
                              colspan="1"
                              aria-sort="ascending"
                              aria-label="#: activate to sort column descending"
                              style={{ width: "58.6562px" }}
                            >
                              #
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="basic-datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Payout amount: activate to sort column ascending"
                              style={{ width: "232.812px" }}
                            >
                              Payout amount
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="basic-datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Payment type: activate to sort column ascending"
                              style={{ width: "215.375px" }}
                            >
                              Payment type
                            </th>
                            <th
                              className="sorting"
                              tabindex="0"
                              aria-controls="basic-datatable"
                              rowspan="1"
                              colspan="1"
                              aria-label="Date processed: activate to sort column ascending"
                              style={{ width: "235.953px" }}
                            >
                              Date processed
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="odd">
                            <td
                              valign="top"
                              colspan="4"
                              className="dataTables_empty"
                            >
                              No data available in table
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <div
                        className="dataTables_info"
                        id="basic-datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing 0 to 0 of 0 entries
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="basic-datatable_paginate"
                      >
                        <ul className="pagination pagination-rounded">
                          <li
                            className="paginate_button page-item previous disabled"
                            id="basic-datatable_previous"
                          >
                            <a
                              href="#"
                              aria-controls="basic-datatable"
                              data-dt-idx="0"
                              tabindex="0"
                              className="page-link"
                            >
                              <i className="fa fa-chevron-left"></i>
                            </a>
                          </li>
                          <li
                            className="paginate_button page-item next disabled"
                            id="basic-datatable_next"
                          >
                            <a
                              href="#"
                              aria-controls="basic-datatable"
                              data-dt-idx="1"
                              tabindex="0"
                              className="page-link"
                            >
                              <i className="fa fa-chevron-right"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const PayBench = () => {
  return (
    <Fragment>
      <NavBar />
      <br />
      <br />
      <br />
      <br />

      <div className="container-fluid">
        <div className="wrapper">
   

          <div className="content-page-x col-md-12" >
            <div className="content-x">
              <PayOuts />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PayBench;
