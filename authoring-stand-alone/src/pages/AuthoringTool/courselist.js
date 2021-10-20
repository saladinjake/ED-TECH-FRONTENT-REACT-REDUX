import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { SideBar, TopNav, AddHead, AddBoxes, AddFormBox } from "./sidebar";
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
          <div class="content-page-x col-md-12">
            <div class="content-x">
              <AddHead />

              <AddBoxes />

              <AddFormBox />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
