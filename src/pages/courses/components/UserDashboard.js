import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import CourseTab from './Tabs/CourseTab'
import TabContainer from './Tabs/Tab'
import './UserDashboard.css'

const UserDashboard = (props) => {
	const {match} = props
    return (
        <div className="main-wrapper">
           <div className="dashboard-wrapper">
             <TabContainer match={match} />
            {/* <Footer /> */}
           
           </div>
           
        </div>
    )
}



UserDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {  })(UserDashboard);

// export default UserDashboard
