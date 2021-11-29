import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import AuthSidebarMenus from "../components/AuthSidebarMenus";
import CoursesWithSortWidget from "../components/CoursesWithSortWidget";
import { getAuthProfile } from "../api/learner.services";

import Loader from "../components/Loader";

const querySearch = () => {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  return parameters;
};

const isDistantFuture = (date, seconds = 0) => {
  // number of milliseconds tolerance (i.e. 60000 == one minute)
  return date.getTime() > Date.now() + seconds;
};

class MyLearning extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortType: "grid",
      cleanSlate: [],
      loading: true,
      updateDomTrigger: Math.random() * 40,
    };
  }

  refreshCoursesState = (courses_data) => {
    this.setState({
      ...this.state,
      cleanSlate: [...courses_data],
      loading: false,
      updateDomTrigger: Math.random() * 10 + Math.random() * 40 * 5,
    });
  };

  handleActiveCoursesFilter = (allcoursesFetched) => {
    /*Active courses*/
    let activecoursesFetched = allcoursesFetched.filter((course) => {
      var requestedDateToStart = new Date(course.course.start_date);
      course["set_status"] = "Active";
      return !isDistantFuture(requestedDateToStart); // &&  (today.getMonth() == requestedDateToStart.getMonth() && today.getFullYear()+1 >= requestedDateToStart.getFullYear()+1)
    });
    this.refreshCoursesState(activecoursesFetched);
  };

  handleCompletedCoursesFilter = (allcoursesFetched) => {
    const allcourses = allcoursesFetched.filter((course) => {
      course["set_status"] = "Completed";
      return parseInt(course.status) === "Completed";
    });
    this.refreshCoursesState(allcourses);
  };

  handleUpcomingCoursesFilter = (allcoursesFetched) => {
    /*upcoming courses*/
    const upcomingcoursesBatch = allcoursesFetched.filter((course) => {
      console.log(course.course.start_date);
      var requestedDateToStart = new Date(course.course.start_date);

      course["set_status"] = "Upcoming";

      return isDistantFuture(requestedDateToStart);
    });
    this.refreshCoursesState(upcomingcoursesBatch);
  };

  handleExpiredCoursesFilter = (allcoursesFetched) => {
    const allcourses = allcoursesFetched.filter((course) => {
      course["set_status"] = "Exipred";
      return parseInt(course.status) === "Expired";
    });
    this.refreshCoursesState(allcourses);
  };

  handleAllCoursesFilter = (allcoursesFetched) => {
    this.refreshCoursesState([...allcoursesFetched]);
  };

  handleAccomplishedCoursesFilter = (allcoursesFetched) => {
    const allcourses = allcoursesFetched.filter((course) => {
      course["set_status"] = "Accomplished";
      return parseInt(course.status) === 1;
    });
    this.refreshCoursesState(allcourses);
  };

  handleCurrentRedrawFilter = (allMycourses, searchId) => {
    let searchdata = allMycourses;
    switch (searchId) {
      case "free_course_offering":
        searchdata = searchdata.filter((course) => course.course.price <= 0);
        break;
      case "naming_convention":
        searchdata = searchdata.sort(
          (a, b) => b.course.course_name - a.course.course_name
        );
        break;
      case "payment_required":
        searchdata = searchdata.filter((course) => course.course.price > 0);
        break;
      case "led_by_instructor":
        searchdata = searchdata.filter(
          (course) => course.course.learning_style == "Instructor Paced"
        );
        break;
      case "self":
        searchdata = searchdata.filter(
          (course) => course.course.learning_style == "Self Paced"
        );
        break;
    }

    this.refreshCoursesState(searchdata);
  };

  runSearchEngineQuery = (allMycourses) => {
    //if a search is made in the url
    const query = querySearch();
    const allowedTags = query.get("search_menu");

    //swictch from the search type
    switch (
      allowedTags //applied search key
    ) {
      case "free_course_offering": //filter buton checklists of categories and sub categories
      case "payment_required": //course pacing filter search
      case "self":
      case "led_by_instructor":
      case "naming_convention":
        this.handleCurrentRedrawFilter(allMycourses, allowedTags); //if user enters a course name and tries to check if course entered is free
        break;
      case "active": //menu clicked category search
        this.handleActiveCoursesFilter(allMycourses);
        break;
      case "upcoming": // search button box input entered
        this.handleUpcomingCoursesFilter(allMycourses); //update state change based on search
        break;
      case "completed": //filter buton checklists of categories and sub categories
        this.handleCompletedCoursesFilter(allMycourses);
        break;
      case "expired": //course pacing filter search
        this.handleExpiredCoursesFilter(allMycourses);
        break;
      case "all":
        this.handleAllCoursesFilter(allMycourses); //if user enters a course name and tries to check if course entered is free
        break; //paid courses

      default:
        this.handleAllCoursesFilter(allMycourses);
        break;
    }

    //switch navlink clicked to active
    let finderLink = `a[data-nameval="${allowedTags}"]`;
    if (document.querySelector(finderLink)) {
      const element = document.querySelector(finderLink);
      this.addActiveClassToSideMenu(element);
    } else {
      //render all search or no search or no courses info
    }
  };

  addActiveClassToSideMenu = (element) => {
    let queriedClass = document.querySelectorAll(".induct");
    queriedClass = Array.from(queriedClass);
    queriedClass.forEach((navLink) => {
      navLink.classList.remove("active");
    });
    //queriedClass.classList.remove("active")//other clicked links needs to be deactivated from active
    element.classList.add("active");
  };

  getUrlVars() {
    var url = window.location.href,
      vars = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      key = decodeURIComponent(key);
      value = decodeURIComponent(value);
      vars[key] = value;
    });
    return vars;
  }

  componentDidMount = async () => {
    //return clean state of the course list
    try {
      //await this.props.fetchCourses() // causes memory leak and slows loading dont use this
      //console.log(this.props)
      const query = querySearch();
      const searchField = document.getElementById("search");
      let allMycourses = await getAuthProfile(); // thus fixes the slow fetch . imagine if user had to wait so long
      allMycourses = [...allMycourses.data.data];
      this.refreshCoursesState(allMycourses);

      /*search hooker*/
      this.runSearchEngineQuery(allMycourses);
    } catch (e) {
      console.log(e);
    }
  };

  searchRerender = () => {
    const { cleanSlate } = this.state;
    /*search hooker*/
    this.runSearchEngineQuery(cleanSlate);
  };

  render = () => {
    const { cleanSlate, updateDomTrigger, loading } = this.state;
    return (
      <>
        <NavBar auth={false} />
        <PageHeader
          pageTitle="My Learning"
          textPosition="text-start"
          bgClass="courses-banner-bg"
        />
        <div className="container mb-5" key={updateDomTrigger}>
          <div className="row">
            <div className="col-md-3">
              <AuthSidebarMenus />
            </div>
            <div className="col-md-9 pt-5">
              <>
                {loading == true ? (
                  <Loader width="100" />
                ) : (
                  <CoursesWithSortWidget filteredCourses={cleanSlate} />
                )}
              </>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  };
}

export default MyLearning;
