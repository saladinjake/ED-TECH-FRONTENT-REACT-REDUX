import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import AuthSidebarMenus from "../components/AuthSidebarMenus";
import CoursesWithSortWidget from "../components/CoursesWithSortWidget";
import { getAuthProfile } from "../api/learner.services";
const querySearch = () => {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  return parameters;
};



  const isDistantFuture = (date, seconds = 0) => {
    // number of milliseconds tolerance (i.e. 60000 == one minute)
    return date.getTime() > Date.now() + seconds;
  };

class MyLearning extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      sortType:"grid",
      cleanSlate : [],
      loading:true,
      updateDomTrigger: Math.random()*40,
      
    }
  }






  refreshCoursesState = (courses_data) => {
   this.setState({
      ...this.state,
      cleanSlate: [...courses_data],
      loading:false
    })
  }

  handleActiveCoursesFilter = async () => {

    let courseRes = await getAuthProfile();
    let enrolledCourses = courseRes.data.data;
    let allcoursesFetched = enrolledCourses;
        /*Active courses*/
    let activecoursesFetched = allcoursesFetched.filter((course) => {
      var requestedDateToStart = new Date(course.course.start_date);
      course["set_status"] = "Active";
      return !isDistantFuture(requestedDateToStart); // &&  (today.getMonth() == requestedDateToStart.getMonth() && today.getFullYear()+1 >= requestedDateToStart.getFullYear()+1)
    });
    this.refreshCoursesState(activecoursesFetched)
  }


  handleCompletedCoursesFilter = async () => {

    let courseRes = await getAuthProfile();
    let enrolledCourses = courseRes.data.data;
    let allcoursesFetched = enrolledCourses;
  

    const allcourses =allcoursesFetched.filter((course) => {
        course["set_status"] = "Completed";
      return parseInt(course.status) === "Completed"      
    })
    this.refreshCoursesState(allcourses)
  }

  handleUpcomingCoursesFilter = async () => {
    
    let courseRes = await getAuthProfile();
    let enrolledCourses = courseRes.data.data;
    let allcoursesFetched = enrolledCourses;

    /*upcoming courses*/
    const upcomingcoursesBatch = allcoursesFetched.filter((course) => {
        console.log(course.course.start_date);
        var requestedDateToStart = new Date(course.course.start_date);

        course["set_status"] = "Upcoming";

        return isDistantFuture(requestedDateToStart);
      });
    this.refreshCoursesState(upcomingcoursesBatch)
  }

  handleExpiredCoursesFilter = async () => {
    const allcourses =allcourses.filter((course) => {
      course["set_status"] = "Exipred";
      return parseInt(course.status) === "Expired"     
    })
     this.refreshCoursesState(allcourses)
  }

  handleAllCoursesFilter = async () => {
   
    let courseRes = await getAuthProfile();
    let enrolledCourses = courseRes.data.data;
    let allcoursesFetched = enrolledCourses;

    this.refreshCoursesState(allcoursesFetched)
  }

  handleAccomplishedCoursesFilter = async  () => {
    const allcourses =allcourses.filter((course) => {
      course["set_status"] = "Accomplished";
      return parseInt(course.status) === 1      
    })
     this.refreshCoursesState(allcourses)
  }

  runSearchEngineQuery = () =>{
     
    //if a search is made in the url
    const query = querySearch()
     
    if(query.get("search_menu")!==null ){
      
       //swictch from the search type
       switch(query.get("search_menu")){ //applied search key

         case "active": //menu clicked category search
         this.handleCategoryFilter()
           break;
         case "upcoming": // search button box input entered
       
       
           this.handleUpcomingCoursesFilter() //update state change based on search
           break;
         case "completed": //filter buton checklists of categories and sub categories
           
         alert("called specific")
           this.handleCompletedCoursesFilter()
           break;
         case "expired": //course pacing filter search
           this.handleExpiredCoursesFilter()
           break;
         case "all":
           this.handleAllCoursesFilter() //if user enters a course name and tries to check if course entered is free
           break;  //paid courses
       
         default:
            alert("called")
            this.handleAllCoursesFilter()       
            break
           
       }
    }

  }

  getUrlVars() {
    var url = window.location.href,
        vars = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
         key = decodeURIComponent(key);
         value = decodeURIComponent(value);
         vars[key] = value;
    });
    return vars;
}

  componentDidMount = async() =>{   
      //return clean state of the course list
    try{
        //await this.props.fetchCourses() // causes memory leak and slows loading dont use this
        //console.log(this.props)
         const query = querySearch()
          const searchField = document.getElementById("search")
        let allcourses  = await getAuthProfile() // thus fixes the slow fetch . imagine if user had to wait so long
        this.refreshCoursesState([...allcourses.data.data])
         
        /*search hooker*/
        this.runSearchEngineQuery() 
    }catch(e){
         console.log(e)
   }
  }



 
  render = () => {
    const { cleanSlate,updateDomTrigger } = this.state;
  return (
    <>
      <NavBar auth={false} />
      <PageHeader
        pageTitle="My Learning"
        textPosition="text-start"
        bgClass="courses-banner-bg"
      />
      <div className="container" key={updateDomTrigger}>
        <div className="row">
          <div className="col-md-3">
            <AuthSidebarMenus />
          </div>
          <div className="col-md-9 pt-5">
            <CoursesWithSortWidget 
              filteredCourses={cleanSlate}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

}

export default MyLearning ;
