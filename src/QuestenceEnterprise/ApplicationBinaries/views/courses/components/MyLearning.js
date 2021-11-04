import React from "react";
import Navbar from "components/Navbar";

import MyLearningContainer from "./tabsection/Tab";
import Footer from "components/Footer";

import PropTypes from "prop-types";
import { connect } from "react-redux";
// import toast from "react-hot-toast";

const NewDashBoard = ({ auth: { user }, match }) => {
  return (
    <div className="main-wrapper course-page">
      {/* the transformer for different ui design*  col-md-10*/}
      <Navbar />
      <div className="col-md-12 " style={{ height: "2500px" }}>
        {/*   <NewHeader /> */}

        <MyLearningContainer match={match} />
      </div>

      <Footer />
    </div>
  );
};

NewDashBoard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(NewDashBoard);
// export default DashBoard;
