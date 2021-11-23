import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
// import {Container, Row, Col } from "react-bootstrap"
import toast from "react-hot-toast";
import Loader from "../components/Loader";

// import "./css/topitem.css";

// import "./css/tabnotifications.css";

import { getLearnerProfile,getInstructorProfile } from "../api/profile.services";

const  LongTimeAgo = (date) => {
  let seconds = Math.floor((Date.now() - date) / 1000);
  let unit = "second";
  let direction = "ago";
  if (seconds < 0) {
    seconds = -seconds;
    direction = "from now";
  }
  let value = seconds;
  if (seconds >= 31536000) {
    value = Math.floor(seconds / 31536000);
    unit = "year";
  } else if (seconds >= 86400) {
    value = Math.floor(seconds / 86400);
    unit = "day";
  } else if (seconds >= 3600) {
    value = Math.floor(seconds / 3600);
    unit = "hour";
  } else if (seconds >= 60) {
    value = Math.floor(seconds / 60);
    unit = "minute";
  }
  if (parseInt(value) !== 1) unit = unit + "s";
  return value + " " + unit + " " + direction;
}

const initialState = {
  count1: 5,
};

const QuickMenus = ({profileUrl}) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      setLoading(true);
      try {
        
          
        if(profileUrl=="/learner/profile"){
          
          let userProfile = await getLearnerProfile();
          setProfile(userProfile.data.data);
        }else{
           
          let userProfile = await getInstructorProfile();
          setProfile(userProfile.data.data);
           console.log(userProfile.data.data);
        }
       
      } catch (err) {
        //console.log(err, "this is the notification error");
        toast.error(`No notifications available`);
      }
      setLoading(false);
    })();
  }, []);
  console.log(profile);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-9 p-3">
            <div className="row text-white">
              <div className="col-md-4 mb-2">
                <div className="card bg-green-gradient px-5 pt-5 pb-3 border-radius-15">
                  <h6 className="card-title">My Learning</h6>
                  <Link to={process.env.PUBLIC_URL+"/mylearning"} className="btn btn-light border-radius-20 btn-sm">
                    View More
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <div className="card bg-green-gradient px-5 pt-5 pb-3 border-radius-15">
                  <h6 className="card-title">Wishlist </h6>
                  <Link to={process.env.PUBLIC_URL+"/wishlist"} className="btn btn-light border-radius-20 btn-sm">
                    View More
                  </Link>
                </div>
              </div>
              <div className="col-md-4 mb-2">
                <div className="card bg-green-gradient px-5 pt-5 pb-3 border-radius-15">
                  <h6 className="card-title">Cart</h6>
                  <Link to={process.env.PUBLIC_URL+"/cart"} className="btn btn-light border-radius-20 btn-sm">
                    View More
                  </Link>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <div className="card bg-dark-gradient text-white px-5 py-4 border-radius-15">
                  <div className="row">
                    <div className="col-md-4">
                      <h5 className="card-title fw-bold">User profile</h5>
                      <Link to={profileUrl} className="text-decoration-none text-white">
                        Complete your profile{" "}
                        <i class="bi bi-chevron-right"></i>
                      </Link>
                    </div>
                    <div className="col-md-4 ms-auto">
                      <div className="outer float-end ">
                        <div className="inner position-relative">
                          <span className="position-absolute top-40 start-40">
                            {Number(profile.completeness)+ "%"}
                          </span>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  );
};

export default QuickMenus;
