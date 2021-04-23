import React, { useEffect,useState} from "react";
import NavBar from "components/Navbar";
import { BreadcrumbBox } from "components/common/Breadcrumb";
import LearnerBox from "components/LearnerBox";
import Footer from "components/Footer";
import { getLearnerInfo } from "services/dashboard";

import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Loader from "components/Loader/Loader";
import toast from "react-hot-toast";


const DashBoard = ({ auth: { user } }) => {

  // const [loading,setLoading] = useState(true);
  // const [info,setInfo] = useState();
  const [info,setInfo] = useState({})

   useEffect(() => {
     (async function loadContent() {
       try {
         let res = await getLearnerInfo(user.id);
         console.log("res", res);
         setInfo({...res.data.data})
       } catch (err) {
         toast.error("Error occured fetching notifications");
       }
      //  setLoading();
     })();
     // eslint-disable-next-line
   }, []);

    return (
      <div className="main-wrapper">
        <NavBar />
        <BreadcrumbBox title="My dashboard" />
        <LearnerBox info={info}/>
        <Footer />
      </div>
    );
}


DashBoard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {  })(DashBoard);
// export default DashBoard;
