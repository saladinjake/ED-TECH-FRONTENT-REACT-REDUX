import React, { Component, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/pagetitle.js";
import { useQuery } from "hooks/useQuery.js";

const PageTitle2 = ({}) => {
  const [queryVal, setQueryVal] = useState("");
  const query = useQuery();
  let routeQuery = query.get("filter");

  const [querySearchVal, setVal] = useState(query.get("search"));
  const [querySearchMethod, setMethod] = useState(query.get("method"));

  useEffect(() => {
    if (routeQuery !== null && routeQuery.length > 0) {
      setVal(query.get("search"));
      setMethod(query.get("method"));
      setQueryVal(routeQuery);
    }
    // eslint-disable-next-line
  }, [routeQuery]);

  return (
    <Styles>
      <div
        className="container-fluid"
        style={{
          height: "130px",
          width: "110%",
          backgroundColor: "#0253c8",
          color: "#fff",
        }}
      >
        <Row>
          <Col lg="12" md="12" className="text-left">
            <div className="breadcrumb-box">
              <h2
                className="breadcrumb-title"
                style={{
                  fontWeight: "300px",
                  color: "#fff",
                  margin: "20px",
                  fontSize: "45px",
                  fontFamily: "Open Sans",
                  lineHight: "34px",
                  letterSpacing: "-1px",
                  fontWeight: "normal",
                }}
              >
                Search our courses
              </h2>
            </div>
          </Col>
        </Row>

        <div className="col-md-12" id="search-result">
          <h3 style={{ color: "#fff" }}>
            {query?.get("search")?.toLowerCase()?.length > 0 &&
              "Search results for " +
                "`" +
                query.get("search").toLowerCase() +
                "`"}
          </h3>
        </div>
      </div>
    </Styles>
  );
};

export default PageTitle2;
