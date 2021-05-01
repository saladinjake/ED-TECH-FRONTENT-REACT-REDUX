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
  });

  const filterCourses = (e) => {
   
  };








  return (
    <Styles>
      <section className="course-filter" >
        <Container>
          <Row>
            <Col md="12">
              <div className="sec-title text-center">
              <br/>
                <h4>Our Featured Courses</h4>
              </div>
            </Col>
            <Col md="12">

            
           <BrowseByCategory />
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
                    <Loader width="70" />



                       
            </Fragment>


                  )
                : (
                      <Fragment>
                          <div className="row">

                      

                       <CourseFilteredCarousel title="Business"  show={4} children={data}  />
                          

                            <div className="col-lg-2 pull-left">
                            <Link to="../courses" style={{background: "#0253c8", color:"#fff"}} className="btn  waves-effect waves-light pull-left m-b-10">
                            <i className="md  md-chevron-left"></i> See All courses</Link> </div>
                            
                           <div className="col-md-12" style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
                       


                           {/*<div id="slide">
                                 <div id="toggle">&#9776;</div>
                                 <div class="box">Content</div>
                            </div>
          
                          

                            <CourseFilteredCarousel title="Business"  show={4} children={groupedData['Business']}  />
                           <CourseFilteredCarousel title="Technology"  show={4} children={groupedData['Technology']}  />
                           <CourseFilteredCarousel title="Maths And Sciences"  show={4} children={groupedData['Mathematics and Sciences']} />
                           <CourseFilteredCarousel title="Languages"  show={4} children={groupedData['Languages']} />
                           <CourseFilteredCarousel title="Engineering" show={4} children={groupedData['Engineering']} />
                           <CourseFilteredCarousel title="Law" show={4} children={groupedData['Law']} />
                           <CourseFilteredCarousel title="Health And Nutrition" show={4} children={groupedData['Health and Nutrition']} />
                           <CourseFilteredCarousel title="Social Sciences"  show={4} children={groupedData['Social Sciences']} />
                                  
                        */}
                                     
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
