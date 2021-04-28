 
import React, { Fragment } from "react";
// import {Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./css/topitem.css";
import toast from "react-hot-toast";
import { getCourses } from "services/course";

import Carousel from "./helpers/Carousel"

class TopCourses extends React.Component{
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
                            
                           <div className="col-md-12">
                           <br/><br/>
                                            <Carousel
                                                show={2}
                                                children={data}
                                             />
                                  
                                        </div>

                          </div>

                    </Fragment>
                       


                      

                 )
            )
          
    }
}







TopCourses.propTypes = {

  
};

const mapStateToProps = (state) => ({
 
});

export default connect(mapStateToProps, {  })(TopCourses);