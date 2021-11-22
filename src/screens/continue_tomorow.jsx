import React, { useEffect, useState, Fragment } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SubscribeBox from "../components/SubscribeBox";
import "../assets/css/main.css";
import PageHeader from "../components/PageHeader";
import FilterWidget from "../components/FilterWidget";
import SortWidget from "../components/SortWidget";
import HorizontalCourseCard from "../components/HorizontalCourseCard";
import CourseCards from "../components/CourseCards";
import SearchWidget from "../components/SearchWidget";


import PropTypes from "prop-types";
import { connect } from "react-redux";
import {  logOut, setPrevPath } from "../redux/actions/auth.action";
import { fetchCourses } from "../redux/actions/courses.action";
import Loader from "../components/Loader";
import { useQuery } from "../helpers/hooks/useQuery.js";

import { useHistory } from "react-router-dom";
import { getCourses } from "../api/courses.services";



// const CoursesScreen = ({
//   course: { courses, courseLoading },
//   fetchCourses,
//   match,
// }) => {
  
//   //search activity

//   //search btn trigger




  
// };









class CoursesScreen extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      sortType:"grid",
      cleanSlate : [],
      courses: this.props.course,
      loading:true
    }
  }




  //search form and reset and logout
   handleKeyPress = (e) => {
    if (e.key == "Enter") {
      this.handleSearch(e);
      e.target.style.display = "none";
      document.getElementById("reset-btn").style.display = "block";
    }
  };



  handleLogout = async () => {
    await logOut();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  handleReset = (e) => {
    e.target.style.display = "none";
    // document.getElementById("search-btn").style.display="block"

    if (document.getElementById("search-result")) {
      let element = document.getElementById("search-result");
      element.style.display = "none";
    }

    window.location.href = process.env.PUBLIC_URL + "/courses";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  handleSearch = (e) => {
    e.preventDefault();
    const searchVal = document.getElementById("search")?.value;
    if (searchVal.length > 0) {
      window.location.href=`/courses?method=name&search=${searchVal}&filter=course`;
      window.location.reload();
    }

    // if (document.getElementById("search-result")) {
    //   let element = document.getElementById("search-result");
    //   element.style.display = "block";
    // }

    // if (document.getElementById("search-btn")) {
    //   document.getElementById("search-btn").style.display = "none";
    //   document.getElementById("reset-btn").style.display = "block";
    // }
  };

  async componentDidMount(){
    try{
      await this.props.fetchCourses()
      console.log(this.props)
      // let allcourse  = await getCourses()
      // console.log([...allcourse.data.data])
      this.setState({
        ...this.state,
        cleanSlate: [this.props.course.courses],
        loading:false
      })
    }catch(e){
       console.log(e)
    }
  }

  
  handleSort = (sortType) => {
    this.setState({sortType});
  };


  render(){
    const { sortType, loading ,cleanSlate} = this.state;
    const {courses } = this.props.course
    return (
    <>
      <NavBar />
      <PageHeader pageTitle="Our Courses" bgClass="courses-banner-bg" />
      <SearchWidget actionTrigger={this.handleSearch} />
      <SortWidget onHandleSort={this.handleSort} />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <FilterWidget />
          </div>
          <div className="col-md-9">
            <div className="mb-5">
              {sortType === "fullWidth" && (
                <>
                  <HorizontalCourseCard
                    courseHeading="Becoming a Successful Leader (Inclusive Leadership Training)"
                    courseAuthor="Deepali Bagati"
                    courseDesc="Become a successful leader by learning 21st-century leadership skills and applying concepts to th"
                    learningStyle="Self Paced"
                    learningLang="English"
                    learningLevel="Level"
                    coursePrice="N20, 000"
                  />
                  <HorizontalCourseCard
                    courseHeading="Becoming a Successful Leader (Inclusive Leadership Training)"
                    courseAuthor="Deepali Bagati"
                    courseDesc="Become a successful leader by learning 21st-century leadership skills and applying concepts to th"
                    learningStyle="Self Paced"
                    learningLang="English"
                    learningLevel="Level"
                    coursePrice="N20, 000"
                  />
                  <HorizontalCourseCard
                    courseTitle="IBM-PV0101EN"
                    courseAuthor="Joseph Santarcangelo"
                    courseDesc="Python Basics For Data"
                    learningStyle="Self Paced"
                    learningLang="English"
                    learningLevel="Level"
                    coursePrice="N12, 000"
                  />
                </>
              )}
              {sortType === "grid" && (
                <>
                  <div className="row">
                    {loading ? (
              <Loader width={"100"} />
            ): (

                    <>

                      {cleanSlate.length &&  cleanSlate.map( (course,index)=>{
                      console.log(courses)
                      return(
                         <div className="col-md-4">
                      <CourseCards
                          key={index+ "_" + Math.random()*90}
                courseTitle={course.course_code}
                courseDesc={course?.course_description}
                courseAuthorCompany={course?.instructor?.instructor_profile?.current_employer_designation}
                courseAuthor={course?.instructor?.first_name+ " " + course?.instructor?.last_name}
                coursePrice={course?.price}
                courseId={course?.id}
                courseImage={course?.course_cover_image}
                      />
                    </div>
                      )
                    })}

                   </>


                    )}
                    
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <SubscribeBox />
      <div className="my-auto border-top bg-green">
        <div className="container">
          <Footer />
        </div>
      </div>
    </>
  );
  }
}




// export default CourseGrid;
CoursesScreen.propTypes = {
  course: PropTypes.object.isRequired,
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, {
  fetchCourses,
})(CoursesScreen);