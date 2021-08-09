import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { SideBar } from "./sidebar";
import FormWizard from "./CourseFormWizard";
import NavBar from "components/Navbar/AuthoringNav";
import { Styles } from "./styles/main.js";

const Dashboard = () => {
  return (
    <Fragment>
      <NavBar />
      <br />
      <br />
      <br />
      <br />

      <div className="container-fluid">
        <div className="wrapper">
          <SideBar />

          <div class="content-page-x col-md-9" style={{ float: "right",height:"4500px" }}>
            <div class="content-x">
              <FormWizard />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
