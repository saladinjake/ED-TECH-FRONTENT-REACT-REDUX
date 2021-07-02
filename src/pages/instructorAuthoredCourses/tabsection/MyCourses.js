import React, {Fragment, useState} from "react";
// import Datas from './data/filter.json'
import { Link } from "react-router-dom";

import { Styles } from "./styles/courseFilter";
import "./Tab.css";

// import Loader from "components/Loader/Loader";

function MyCourses(props) {
  const {courses, editable} = props
  const [showEditor, setShowEdit] = useState(false)

  const handleShowEdit =(value) =>{
    setShowEdit(value)
    // props.handleShowEdit(value)
  }

  return (
    <Styles>
      {/* Course Area */}
      <Fragment>
                {courses.map((item, i) => (
                  <Fragment className="container-fluid" key={item.id}>


              <div className="product-view col-merge-12 col-merge-s-4 col-merge-d3" style={{marginRight:"-15px",width:"250px"}}>
                <div class="product product-set left_adjust" style={{ height: "290px" }}>
                  <figure>
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/courses/" +
                        item.id +
                        "/" +
                        item.slug
                      }
                      className="image-popup"
                      title="Screenshot-1"
                    >
                      {item.course_cover_image !== null ? (
                        <img
                          src={item.course_cover_image}
                          className="thumb-img imagemix"
                          alt="work-thumbnail"
                          style={{ width: "100%", height: "auto" }}
                        />
                      ) : (
                        <Fragment />
                      )}{" "}
                      <div className="middle-overlay"></div>
                    </Link>
                  </figure>

                  <div class="">
                    <div  style={{padding:"10px", marginLeft:"10px"}}>
                      <p style={{  color: "blue" ,width:"100%",fontWeight:"bold"}}>
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item.slug
                          }
                          style={{ fontSize: "13px",width:"100%",color: "blue" }}
                          className="text-dark"
                        >
                          {item.course_name}
                        </Link>
                      </p>
                      <p style={{ width:"100%"}}>
                        A course by{" "}
                        {item?.instructor?.first_name !== null &&
                          item?.instructor?.first_name +
                            " " +
                            item?.instructor?.last_name}
                      </p>
                    </div>
                    
                 


                    <a href="#" onClick={(e)=>{
                      window.location.href=process.env.PUBLIC_URL+ "/course-preview/"+ item.id
                    }

                    }
                    style={{color:"#000", 
                               position:"absolute",
                               padding:"5px",width:"60px",
                               right:"10px",
                               borderRadius:"20px",
                               
                               color:"#000",
                               

                             }}>Preview

                             </a>


                  </div>
                  
                    <p style={{borderTop:"1px solid #000",color:"#000", 
                               display:"table",position:"absolute",
                               bottom:"0px",width:"100%",padding:"10px",
                               float:"left"

                             }}>Course</p>

                    
                </div>

                
              </div>
            </Fragment>
                ))}
              
      </Fragment>
    </Styles>
  );
}

export default MyCourses;
