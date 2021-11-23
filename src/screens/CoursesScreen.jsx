import React, { useEffect, useState, Fragment } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SubscribeBox from "../components/SubscribeBox";
import "../assets/css/main.css";
import PageHeader from "../components/PageHeader";
import FilterWidget from "../components/FilterWidget";
import SortWidget from "../components/SortWidget";
import HorizontalCourseCard from "../components/HorizontalCourseCard";
import CourseCard from "../components/CourseCard";
import SearchWidget from "../components/SearchWidget";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {  logOut, setPrevPath } from "../redux/actions/auth.action";
import { fetchCourses } from "../redux/actions/courses.action";
import Loader from "../components/Loader";
import { useQuery } from "../helpers/hooks/useQuery.js";
import { useHistory } from "react-router-dom";
import { getCourses } from "../api/courses.services";
import { getCategories } from "../api/category.services";

const querySearch = () => {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  return parameters;
};



class CoursesScreen extends React.Component{
  constructor(props){
    super(props)

    this.state ={
      sortType:"grid",
      cleanSlate : [],
      courses: this.props.course,
      loading:true,
      updateDomTrigger: Math.random()*40,
      batchedCategoriesFilter:[],
      wildSearch:[]
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
    /*just a necessary url pusher*/
    e.preventDefault();
    const searchVal = document.getElementById("search")?.value;
    if (searchVal.length > 0) {
      window.location.href=`/courses?search=${searchVal}&applied_search=sb`;
      //window.location.reload();
    }
  };

  refreshCoursesState = (courses_data) => {
   this.setState({
      ...this.state,
      cleanSlate: [...courses_data],
      loading:false
    })
  }

  activeCoursesFilter = (allcourses) => {
   //console.log([...allcourse.data.data.courses])
        //filter only active courses
   // allcourses =[...allcourses.data.data.courses];
    allcourses =allcourses.filter((course) => {
      return parseInt(course.status) === 1      
    })
    return allcourses;
  }

  runSearchEngineQuery = () =>{
     const searchField = document.getElementById("search")

    //if a search is made in the url
    const query = querySearch()
     const searchFrom = query.get("applied_search")
     
    if(query.get("search")!==null  || query.get("search_menu")!==null ){
      //const pathname = location.patname;
       searchField.value=query.get("search");
       if(searchField==""){
          searchField =  query.get("search_menu")
       }
       //swictch from the search type
       switch(searchFrom){ //applied search key

         case "mc": //menu clicked category search
         this.handleCategoryFilter()
           break;
         case "sb": // search button box input entered
       
       
           this.handleFilteredSearchInput(searchField.value) //update state change based on search
           break;
         case "fb": //filter buton checklists of categories and sub categories
           break;
         case "cp": //course pacing filter search
           this.handleStyleFilter()
           break;
         case "fee":
           this.handlePriceFilter(searchField.value) //if user enters a course name and tries to check if course entered is free
           break;  //paid courses
       
         default:
           if(query.get("search_menu")=="menu_mapper" 
              && query.get("nested_filter_id")){
             if(query.get("nested_filter_id") &&                
                 Number.isInteger(query.get("nested_filter_id")) 
                ){
                 this._runMenuSearchCategoryFilter()
                 break
             }else{
               
               this._runMenuSearchCategoryFilter()
                break
             }
           }else{
              //search input btn search
              this.handleFilteredSearchInput(searchField.value) //update state change based on search input
           break;

           }
           
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
        let allcourses  = await getCourses() // thus fixes the slow fetch . imagine if user had to wait so long
        this.refreshCoursesState(this.activeCoursesFilter([...allcourses.data.data.courses]))
         const searchFrom = query.get("applied_search")
     searchField.value=query.get("search");
        /*search hooker*/
        this.runSearchEngineQuery() 
    }catch(e){
         console.log(e)
   }
  }


  handleFilteredSearchInput =(searchKey)=>{
    //...searching for the course 
    const { cleanSlate } = this.state;

    let queriedSearch =  querySearch().get("search")
    console.log(queriedSearch)
    console.log(this.getUrlVars())
    let filter = cleanSlate.filter((course) => {
      //console.log(course.course_name)
      return (course.course_name.toLowerCase().indexOf(queriedSearch.toLowerCase()) !== -1
       &&
      parseInt(course.status) === 1);
    })

    //console.log(filter)
    this.setState({
      ...this.state,
      cleanSlate:filter,
      updateDomTrigger: Math.random()*50 + Math.random()*3*99 //domrerendering...
    })

   // this.handleFilteredSearchInput(searchKey)
  }

  
  handleSort = (sortType) => {
    this.setState({sortType});
  };



  handleCategoryFilter = async () =>{
    alert("called")
    const query = querySearch()
    if (query.get("applied_search") === "mc" ){ //if coming from a top menu header link
      //get all the query parameters and check them to preset a ui exp to the user to know the outcome of the filters selected
    
      this._runUpdateCategoryFilter()
    }else{
      this._runUpdateCategoryFilter() //or if called from a button clicked
    }
    
  };

  _runMenuSearchCategoryFilter(){

    const query = querySearch()
    if (query.get("search_menu") === "menu_mapper" && (query.get("nested_filter_id")!==null || query.get("nested_filter")!=="")){ //if coming from a top menu header link
    
      const { cleanSlate,batchedCategoriesFilter } = this.state;
      const courses = cleanSlate;
      const searchCategory = query.get("nested_filter_id")
      let filter = cleanSlate.filter((course) => {
      return (searchCategory == course.category.id
         )  &&
         parseInt(course.status) === 1;
      })
      this.setState({
        ...this.state,
        cleanSlate:filter,
        updateDomTrigger: Math.random()*50 + Math.random()*3*99 //domrerendering...
      })

   }else{
      this.setState({
        ...this.state,
        
        updateDomTrigger: Math.random()*50 + Math.random()*3*99 //domrerendering...
      })
   }
    
  }


  _runUpdateCategoryFilter = () =>{
    const { cleanSlate,batchedCategoriesFilter } = this.state;
     const courses = cleanSlate;
     console.log(courses)
     let results = [];
     let FinalOutput =[]
      //if a search is made in the url
      batchedCategoriesFilter.forEach(checkList =>{
           //alert(checkList.givenElement.getAttribute("data-parent"))
        results = cleanSlate.filter((course) => {
         let parent_category =checkList.givenElement.getAttribute("data-parent")
         let regexMark = `${parent_category}`
         regexMark = new RegExp(regexMark)
          return (course.category.name.match(regexMark)) &&
             parseInt(course.status) === 1;
        })
        FinalOutput.push(results)

      })
      console.log(FinalOutput)
      
      let allcourses =[].concat(...FinalOutput)
     
     console.log(allcourses);
      this.refreshCoursesState(allcourses)
  }


  handlePriceFilter = (searchKey=null) => {
    const { cleanSlate } = this.state;
     const courses = cleanSlate;
     this.cleanUpInputSearched()
      //if a search is made in the url
        const query = querySearch();
        let filtered = [];


          if (query.get("applied_search") === "fee" && query.get("bonus")=="free_course_offering") {
             filtered = courses.filter((course) => {
                return parseInt(course.price) === parseInt(0) &&
                  parseInt(course.status) === 1
                ;
              });
              //setFilterAllCourses[...filtered];
            } else if(query.get("bonus")=="payment_required") {
             filtered = courses.filter((course) => {
                return parseInt(course.price) > parseInt(0) &&
                  parseInt(course.status) === 1
                ;
              });
             
            }

            if(query.get("chosen")=="All"){
             //check mark it
              let elem = document.getElementById("flexCheckDefaultAll")
              elem.setAttribute("checked",true);
              //reset filter
              filtered = cleanSlate
            }else if(query.get("chosen")=="Free"){
              let elem = document.getElementById("flexCheckDefaultFree")
              elem.setAttribute("checked",true)

            }else if(query.get("chosen")=="Paid"){
               let elem = document.getElementById("flexCheckDefaultPaid")
               elem.setAttribute("checked",true)
            }


        

        //then refresh state of the course and retrigger the dom changes
        this.refreshCoursesState(filtered)    

  };

  handleStyleFilter = () => {
     const { cleanSlate } = this.state;
     const courses = cleanSlate;
     this.cleanUpInputSearched()
      let searchVal;
       //if a search is made in the url
      const query = querySearch()
      searchVal = query.get("search");
      let filtered = [];
      if (searchVal.length > 0) {
       
        if (query.get("applied_search")=="cp" && query.get("search_result") === "self") {
          filtered = courses.filter((course) => {
            return course.learning_style === "Self Paced" &&
              parseInt(course.status) === 1
          ;
          });

          let selfChecked =  document.getElementById("flexCheckDefaultSelf");
          selfChecked.setAttribute("checked",true)
          //setFilterAllCourses[...filtered];
        } else if(query.get("applied_search")=="cp" && query.get("search_result") === "leadership_learner") {
          filtered = courses.filter((course) => {
            return course.learning_style === "Instructor Paced" &&
              parseInt(course.status) === 1
            ;
          });
          let ledChecked =  document.getElementById("flexCheckDefaultLed");
          ledChecked.setAttribute("checked",true)
          //setFilterAllCourses[...filtered];
        }  


    }  

      //then refresh state of the course and retrigger the dom changes
        this.refreshCoursesState(filtered)          
  }

  cleanUpInputSearched = () =>{
     const input  = document.getElementById("search");
     input.value =""
  }


  menuCategorySearch = () =>{
    const { cleanSlate } = this.state;
    this.cleanUpInputSearched()
     const courses = cleanSlate;
    let catId = parseInt(this.props.match.params.id);
   

    if (catId > 0) {
      
       
        let filtered=  courses.filter((course) => {
            return parseInt(course.category_id) === catId &&
                   parseInt(course.status) === 1 ;
          })
        
    } 

  }

  addRemoveCheckedListCategorySelect = (e) =>{
    const elem = e.target;
    

    const { batchedCategoriesFilter } = this.state; // list of the checked values

     if (elem.checked == true){
       this.addToCategoryList(elem)
       elem.setAttribute("data-checked","checked")
     } else {
        this.removeFromList(elem.value)
         elem.setAttribute("data-checked","not-checked")
    }
   
  }

  addToCategoryList =(givenElement) =>{
       const { batchedCategoriesFilter } = this.state; // list of the checked values
       //const filtered = [...batchedCategoriesFilter,given]
       const filtered = [...batchedCategoriesFilter, {value:givenElement.value,givenElement}] //changed to handle object nested arr
         this.setState({
      ...this.state,
      batchedCategoriesFilter:filtered
    })
         console.log(filtered)
  }

  removeFromList =(givenValue) => {
    const { batchedCategoriesFilter } = this.state; // list of the checked values
    const filtered = batchedCategoriesFilter.filter(item=> item.value!=givenValue);
    this.setState({
      ...this.state,
      batchedCategoriesFilter:filtered
    })
     console.log(filtered)

  }

  render(){
    const { sortType, loading ,cleanSlate, updateDomTrigger} = this.state;
    const {courses } = this.props.course
    return (
    <>
      <NavBar />
      <PageHeader pageTitle="Our Courses" bgClass="courses-banner-bg" />
      <SearchWidget actionTrigger={this.handleSearch} />
      <SortWidget 
      onHandleSort={this.handleSort} 
      onFilterCateoriesSearch={this.handleCategoryFilter}

      />
      <div className="container" key={updateDomTrigger}>
        <div className="row">
          <div className="col-md-3">
            <FilterWidget 
            addRemoveCheckedList={this.addRemoveCheckedListCategorySelect}

            />
          </div>
          <div className="col-md-9">
            <div className="mb-5">
              {sortType === "fullWidth" && (
                <>



                {cleanSlate.length &&  cleanSlate.map( (course,index)=>{
                     // console.log(courses)
                      return(
                        
                      <HorizontalCourseCard
                          key={index+ "_" + Math.random()*90}
                courseTitle={course.course_code}
                courseDesc={course?.course_description}
                courseAuthorCompany={course?.instructor?.instructor_profile?.current_employer_designation}
                courseAuthor={course?.instructor?.first_name+ " " + course?.instructor?.last_name}
                coursePrice={course?.price}
                courseId={course?.id}
                courseImage={course?.course_cover_image}
                learningLang={course?.language?.english}
                learningStyle={course?.learning_style}
                learningLevel={course?.level}
                      />
                 
                      )
                    })}


                </>
              )}
              {sortType === "grid" && (
                <>
                  <div className="row">
                    {loading ? (
              <Loader width={"100"} />
            ): (

                    <>

                      <>
                       {(cleanSlate.length==0)? (<div>
                            <h1>No Search Found</h1>
                            <p>Try searching with a single keyword...e.g business</p>
                            </div>): (
<>
{cleanSlate.length>0 &&  cleanSlate.map( (course,index)=>{

                        
                     // console.log(courses)
                      return(
                         <div className="col-md-4">
                      <CourseCard
                          key={index+ "_urieure_juew3" + Math.random()*1*90}
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
                    })}</>



                            )
                          
                        
                      }
                      </>

                      
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