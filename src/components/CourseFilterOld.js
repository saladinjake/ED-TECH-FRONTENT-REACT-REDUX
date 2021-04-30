import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/courseFilter.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses } from "actions/coursesActions";

import { getCourses } from "services/course";
import toast from "react-hot-toast";


import CourseFilteredCarousel from "./CourseFilteredCarousel"

import "./filter.css"
import "./carousel.css"
import Loader from "components/Loader/Loader";

const CourseFilter = ({ course: { courses, courseLoading }, fetchCourses }) => {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function loadCourses() {
      courses.length > 0 && setAllCourses([...courses]);
    })();
    // eslint-disable-next-line
  }, [courses]);

  useEffect(() => {
    const buttons = document.querySelector(".filter-btn-list").children;
    const items = document.querySelector(".filter-items").children;

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (e) {
        for (let j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove("active");
        }

        this.classList.add("active");
        const target = this.getAttribute("data-target");

        for (let k = 0; k < items.length; k++) {
          items[k].style.display = "none";

          if (items[k].getAttribute("data-id") === target) {
            items[k].style.display = "block";
          }

          if (target === "*") {
            items[k].style.display = "block";
          }
        }
      });
    }
  });

  const filterCourses = (e) => {
    console.log(parseInt(e.target.getAttribute("data-cat")));
    // // Filter Courses
    let catId = parseInt(e.target.getAttribute('data-cat'));
    if (catId > 0) {
      courses.length > 0 &&
        setAllCourses(
          courses.filter((course) => {
            return parseInt(course.category_id) === catId;
          })
        );
    } else {
      setAllCourses([...courses]);
    }
    // Filter Courses
  };








  return (
    <Styles>
      <section className="course-filter">
        <Container>
          <Row>
            <Col md="12">
              <div className="sec-title text-center">
                <h4>Our top courses by category</h4>
              </div>
            </Col>
            <Col md="12">

            
           <BrowseByCategory />
           
              <div className="filter-btns text-center">
                <ul className="filter-btn-list list-unstyled list inline">
                  <li
                    data-target="*"
                    data-cat="0"
                    className="active list-inline-item"
                    onClick={filterCourses}
                  >
                    All Top Courses
                  </li>
                  <li
                    data-target="business"
                    data-cat="2"
                    onClick={filterCourses}
                    className="list-inline-item"
                  >
                    Business
                  </li>
                  <li
                    data-target="technology"
                    data-cat="1"
                    onClick={filterCourses}
                    className="list-inline-item"
                  >
                    Technology
                  </li>
                  <li
                    data-target="engineering"
                    data-cat="8"
                    onClick={filterCourses}
                    className="list-inline-item"
                  >
                    Engineering
                  </li>
                </ul>
              </div>
              <Row className="filter-items">
                {courseLoading ? (
                  <Loader width="70" />
                ) : allCourses.length > 0 ? (
                  <Fragment>
                    {allCourses.map((data, i) => (



                       
  
  

                       <Col lg="3" md="9" key={i}>

                       <div className="widget">
                        <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                        <div className="widgetImage animation">
                          <img src={`${data.course_cover_image}`} alt="Product 1" />
                        </div>
                        <div className="widgetContent animation" style={{background: `linear-gradient(200deg, #fff 30%, #2a0845 60%)` }}>
                          <h6 className="widgetTitle">
                        {data.course_name}
                         </h6>
                          <h2 className="widgetSubTitle">Course</h2>
                         
                           <p className="convey_desc" style={{color:"#fff", wordWrap: "break-word",  wordBreak: "break-all"}}>{data.course_description.substring(0,40)}</p>
                        </div>
                        </Link>
                      </div>


                {/*<div className="course-item " style={{width:"200px",height:"300px", background:"#fff"}}>
                  <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                    <div
                      
                      style={{
                        height:"150px",
                        backgroundImage: data

                          ? `url(${data.course_cover_image})`
                          : "",
                             backgroundRepeat:"no-repeat",
    backgroundPosition: "center center",
    
    minHeight:"20%"
                      }}
                    >
                      
                      
                    </div>
                  </Link>

                   <div
                      className="card-box"
                      style={{
                        height:"30px",
                        width:"50px",
                        position:"absolute",
                        top:"120px",
                        right:"90px",
                        padding:"5px",
                        backgroundImage: data

                          ? `url(${data.course_cover_image})`
                          : "",
                             backgroundRepeat:"no-repeat",
    backgroundPosition: "center center",
    
    minHeight:"20%"
                      }}
                    >
                      
                      
                    </div>
                  <div className="course-content" >
                    <h6 className="" style={{fontSize:"10px", color:"#fff"}}><br/>
                      <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`} >
                        {data.course_name}
                      </Link>
                    </h6>
                  
                    <div className="course-face " style={{position:"absolute",bottom: "40px"}}>
                      <div className="duration pull-left" style={{marginLeft:"40px",float:"left"}}>
                        <p style={{fontSize:"10px"}}>
                         Course
                        </p>
                      </div>
                     
                      <div className="student pull-right">
                        <p style={{fontSize:"10px", float:"right"}}>
                          
                        </p>
                      </div>
                    </div>
                  </div>
                </div>*/}
              </Col>
                    ))}
                  </Fragment>
                ) : (
                  <Row>
                    <h1>No courses yet</h1>
                  </Row>
                )}
              </Row>
            </Col>
            <Col md="12" className="text-center">
              <div className="viewall-btn">
                <Link to={"/courses"}>View All Courses</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Styles>
  );
};




class BrowseByCategory extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data:[],
            length: 0,
            index: 0
        }
    }
    async componentDidMount(){
          try{
        const response = await  getCourses();
        this.setState({
            data: response.data.data.courses,
            length: response.data.data.courses.length
        })
          
       } catch (err) {
         toast.error("Error occured fetching notifications");
       }
    }    
    render(){
      const { data } = this.state;
      let CourseCategoryWrangler = data.reduce(function (groupedByCategory, course) {
     // console.log(groupedByCategory,course)
         if (!groupedByCategory[course.category.name]) {
           groupedByCategory[course.category.name] = [] //cartSet;
         }
         groupedByCategory[course.category.name].push(course)
         return  groupedByCategory;
      }, []);
      let children = []
      var merged =[]

      for(let item in CourseCategoryWrangler){
        let children = [...Array.from(Object.entries(CourseCategoryWrangler[item]))]
        // var merged = []  // [].concat.apply([], children);
        var merged = [].concat.apply(merged, children);
      }



        function removeDuplicates(arr) {
          let uniq = {};
          return arr.filter(obj => !uniq[obj.course_code] && (uniq[obj.course_code] = true))
        }



        function groupByKey(array) {
           return array
             .reduce((hash, obj) => {
               if(obj.category.name === undefined) return hash; 
               return Object.assign(hash, { [obj.category.name] :( hash[obj.category.name] || [] ).concat(obj)})
             }, {})
        }


        var uniqueArray = removeDuplicates(merged);
        console.log(uniqueArray)

        console.log(groupByKey(uniqueArray.slice(1)))

        let groupedData = groupByKey(uniqueArray.slice(1));



          

         
            return (
              data.length === 0 
                ?( 
<Fragment><br/>
                   <p>Loading..</p>



                       
            </Fragment>


                  )
                : (
                      <Fragment>
                      <br/>

                      <h4 className="text-header text-dark "> My Courses</h4><br/>
                        <div className="row">

                        <div className="col-lg-2 pull-left"><Link to="../courses" style={{background: "#0253c8", color:"#fff"}} className="btn  waves-effect waves-light pull-left m-b-10"><i className="md  md-chevron-left"></i> See All courses</Link> </div>
                            
                           <div className="col-md-12" style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
                       
                           {/*<div id="slide">
                                 <div id="toggle">&#9776;</div>
                                 <div class="box">Content</div>
                            </div>*/}
          
                          

                            <CourseFilteredCarousel title="Business"  show={4} children={groupedData['Business']}  />
                           <CourseFilteredCarousel title="Technology"  show={4} children={groupedData['Technology']}  />
                           <CourseFilteredCarousel title="Maths And Sciences"  show={4} children={groupedData['Mathematics and Sciences']} />
                           <CourseFilteredCarousel title="Languages"  show={4} children={groupedData['Languages']} />
                           <CourseFilteredCarousel title="Engineering" show={4} children={groupedData['Engineering']} />
                           <CourseFilteredCarousel title="Law" show={4} children={groupedData['Law']} />
                           <CourseFilteredCarousel title="Health And Nutrition" show={4} children={groupedData['Health and Nutrition']} />
                           <CourseFilteredCarousel title="Social Sciences"  show={4} children={groupedData['Social Sciences']} />
                                  

                                     
        {/* Object.entries(groupedData).map( (item,value) =>{
              return(<div> <CourseFilteredCarousel  show={4} children={item}  /></div>)

          
        })*/}
                                  
                                        </div>

                          </div>




                          

                    </Fragment>
                       


                      

                 )
            )
          
    }
}



// export default CourseFilter;
CourseFilter.propTypes = {
  course: PropTypes.object.isRequired,
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, {
  fetchCourses,
})(CourseFilter);
