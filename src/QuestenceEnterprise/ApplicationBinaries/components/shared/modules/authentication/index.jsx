import React, { Component, Fragment } from "react";
import "./accounts/assets/css/auth_modal_module.css";

import LoginBox from "./accounts/LoginBox";
import RegisterBox from "./accounts/RegisterBox";
import PasswordForgotBox from "./accounts/PasswordForgotBox";

export default class QuestenceAuthenticationPopups extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { showLogin, showSignup } = this.props;

    return (
      <div
        className="container"
        style={{
          position: "absolute",
          top: "5%",
          right: "0",

          zIndex: "9999999999",
        }}
      >
        {showLogin == true ? <LoginBox /> : <LoginBox />}
        {showSignup == true ? <RegisterBox /> : <RegisterBox />}
        {showSignup == true ? <PasswordForgotBox /> : <PasswordForgotBox />}
      </div>
    );
  }
}

