import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./Pagination";

function CourseItemGrid({ allCourses, courses }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerPage] = useState(5);
  const [currentCourses, setCurrCourses] = useState([]);

  // Get current course
  var indexOfLastCourse = currentPage * coursePerPage;
  var indexOfFirstCourse = indexOfLastCourse - coursePerPage;

  useEffect(() => {
    if (allCourses.length > 0) {
      setCurrCourses(allCourses.slice(indexOfFirstCourse, indexOfLastCourse));
    } else {
      setCurrCourses([]);
    }
    // eslint-disable-next-line
  }, [allCourses]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    indexOfLastCourse = pageNumber * coursePerPage;
    indexOfFirstCourse = indexOfLastCourse - coursePerPage;
    setCurrCourses(allCourses.slice(indexOfFirstCourse, indexOfLastCourse));
  };

  return (
    <Fragment>
      {currentCourses.length > 0 ? (
        <Fragment>
           {currentCourses.length > 0 &&
                                currentCourses.map((item, i) => {
                                           return (<div style={{width:"100%",marginLeft:"15px"}} className=" col-sm-6 col-lg-3 col-md-4 mobiles card-box">
                                           <Link to={ '../courses/'+ item.id }><h4 className="m-t-0"><Link to={ '../courses/'+ item.id} style={{fontSize:"14px"}}  className="text-dark">{item.course_name}</Link></h4></Link>
                              
              <div className="product-list-box thumb">
                    <Link to={ '../courses/'+ item.id } className="image-popup" title="Screenshot-1">
                       {item.course_cover_image !=null ? (<img src={item.course_cover_image} className="thumb-img card-box" alt="work-thumbnail" />
                    ) : ( <Fragment />)}   </Link>

                    

                    <div className="price-tag " style={{fontSize:"10px"}}>
                           N {item.price}
                    </div><br/><br/><br/>
                    <div className="detail">
                                 <div className="rating" style={{width:"100px"}}>
                                                <ul className="list-inline">
                                                    <li><a className="fa fa-star" href="#"></a></li>
                                                    <li><a className="fa fa-star" href="#"></a></li>
                                                    <li><a className="fa fa-star" href="#"></a></li>
                                                    <li><a className="fa fa-star" href="#"></a></li>
                                                    <li><a className="fa fa-star-o" href="#"></a></li>
                                                </ul>
                                  </div>
                                            
                        </div>
              </div>
      </div>)     
                                   })}

           <div>{ runEvent()}</div>
        </Fragment>
      ) : (
        <p>No courses yet.</p>
      )}

      <Col md="12" className="text-center">
        <Pagination
          coursePerPage={coursePerPage}
          totalCourses={allCourses}
          // totalCourses={courses}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Col>
    </Fragment>
  );
}



function runEvent(){
  setTimeout(()=>{

    var len = 40;
    if(document.getElementsByClassName('shrinkable')){
        var shrinkables = document.getElementsByClassName('shrinkable');
        if (shrinkables.length > 0) {
            for (var i = 0; i < shrinkables.length; i++){
                var fullText = shrinkables[i].innerHTML;
                if(fullText.length > len){
                    var trunc = fullText.substring(0, len).replace(/\w+$/, '');
                    var remainder = "";
                    var id = shrinkables[i].id;
                    remainder = fullText.substring(len, fullText.length);
                    shrinkables[i].innerHTML = '<span>' + trunc + '<span className="hidden" id="' + id + 'Overflow">'+ remainder +'</span></span>&nbsp;<a id="' + id + 'MoreLink" href="#!" onclick="showMore(\''+ id + '\');">More</a><a className="hidden" href="#!" id="' + id + 'LessLink" onclick="showLess(\''+ id + '\');">Less</a>';
                }
            }
        }

         
   }

    },5000)
}

export default CourseItemGrid;
