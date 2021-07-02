import React, { useEffect, useState } from 'react';
import Datas from '../../../../data/course/filter.json'
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from '../../../../components/styles/courseFilter';
import './Tab.css'





function MyCourses() {
  

    return (
        <Styles>
            {/* Course Area */}
            <section className="course-filter">
                <div className="container-fluid">
                    <div className="row">
                       
                        <div className="col-md-12">
                            
                            <div  className=" row filter-items">
                                {
                                   
                                    Datas.dataList.map((data, i) => (
                                        <div className="col-md-3" key={i}>
                                            <div className="course-item">
                                                <Link to={process.env.PUBLIC_URL + data.courseLink}>
                                                    <div className="course-image" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${data.imgUrl})`}}>
                                                       
                                                    </div>
                                                </Link>
                                                <div className="course-content">
                                                    <h6 className=""><Link to={process.env.PUBLIC_URL + data.courseLink}>{data.courseTitle}</Link></h6>
                                                    <p className="desc">Instructor: Wale</p>
                                                    <div className="course-face d-flex justify-content-between">
                                                        <div className="rating">
                                                            <ul className="list-unstyled list-inline">
                                                                <li className="list-inline-item">(4.5)</li>
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star"></i></li>
                                                                <li className="list-inline-item"><i className="las la-star-half-alt"></i>
                                                                </li>
                                                                
                                                            </ul>
                                                        </div>
                                                        <div className="student">
                                                            <a className="btn course-btn">Go to course</a>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                         
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                       
                    </div>
                </div>
            </section>
        </Styles>
    )
}

export default MyCourses
