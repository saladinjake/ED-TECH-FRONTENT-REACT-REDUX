import React from "react";
import InstructorNavBar from "../../components/shared/NavBar";

import MyLearningContainer from "./tabsection/Tab";
import Footer from "../../components/shared/Footer";

import PropTypes from "prop-types";
import { connect } from "react-redux";
// import toast from "react-hot-toast";

const NewDashBoard = ({ auth: { user }, match }) => {
  return (
    <div className="main-wrapper course-page">
      {/* the transformer for different ui design*  col-md-10*/}
      <InstructorNavBar />
      <div className="col-md-12 ">
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
