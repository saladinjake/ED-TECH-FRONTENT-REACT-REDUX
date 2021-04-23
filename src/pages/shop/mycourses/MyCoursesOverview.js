import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

// import Pagination from "./../../components/Pagination";
import { Styles } from "./styles/product.js";
import { getAuthProfile } from "services/learner.js";
import Loader from "components/Loader/Loader";
import toast from "react-hot-toast";


import "../newdashboard/assets/css/bootstrap.min.css";
import "../newdashboard/assets/css/core.css";
import "../newdashboard/assets/css/components.css";
import "../newdashboard/assets/css/icons.css";
import "../newdashboard/assets/css/pages.css";
import "../newdashboard/assets/css/responsive.css";
import "./magnify.css"

import Sidebar from "../newdashboard/Sidebar";
import NewHeader from "../newdashboard/NewHeader";

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import jQueryBridget from "jquery-bridget"
import Isotope from "isotope-layout";
import magnificPopup from "magnific-popup"
// make Isotope a jQuery plugin
jQueryBridget( 'isotope', Isotope, $ );




class Products extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            loading: true,
            activeCourses:[]
        }
    }
  async componentDidMount(){
      //run your api request
      await this.fetchAuthProfile();
      //run your jquery activity
      this.attachEvents()

  }

 fetchAuthProfile = async () => {
    try {
      let res = await getAuthProfile();
      this.setState({ activeCourses: [...res.data.data] });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );
    }
    this.setState({ setLoading: false });
  };

  attachEvents(){
    // var $container = $('.portfolioContainer');
    // $container.isotope({
    //     filter: '*',
    //     animationOptions: {
    //         duration: 750,
    //         easing: 'linear',
    //         queue: false
    //     }
    // });

    // $('.portfolioFilter a').click(function(){
    //     $('.portfolioFilter .current').removeClass('current');
    //     $(this).addClass('current');

    //     var selector = $(this).attr('data-filter');
    //     $container.isotope({
    //         filter: selector,
    //         animationOptions: {
    //           duration: 750,
    //           easing: 'linear',
    //           queue: false
    //         }
    //     });
    //  return false;
    // });



    if (document.querySelectorAll('.portfolioFilter a').length) {
     import(/* webpackChunkName: "magnific-popup" */ 'magnific-popup').then(module => {
      console.log("clicked")
        $('.image-popup').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            }
          });
      });
   }


     
  }

  render(){
    return (
    <Fragment>
    <NewHeader />
    <link rel="stylesheet" href="https://unpkg.com/isotope/dist/isotope.min.css" />
     <div className="content-page">
                
                <div className="content">
                    <div className="container">
                         <br />
                        <div className="row">
                            <div className="col-sm-12">
                                

                                <h4 className="page-title">My Course Gallery</h4>
                                 <div className="btn-group pull-right m-t-15 open">
                                <button type="button" className="btn  dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="true" style={{background: "rgb(2, 83, 200)", color: "rgb(255, 255, 255)"}}>
                                Settings <span className="m-l-5"><i className="fa fa-cog"></i></span></button>
                                <ul className="dropdown-menu drop-menu-right" role="menu"><li>
                                <a href="#">Upcoming courses</a></li><li><a href="/profile">Profile</a></li>
                                <li><a href="/notifications">Account Settings</a></li><li><a href="/cart">Cart</a></li>
                                <li className="divider"></li><li><a href="#">Reload</a></li></ul>
                                </div>


                <h4 className="page-title">Course  Detail</h4>
                <ol className="breadcrumb" style={{display:"block"}}>
                  <li>
                    <a href="#">Courses</a>
                  </li>
                  <li>
                    <a href="#">My Learning Courses</a>
                  </li>
                  <li className="active">
                    Dashboard
                  </li>
                </ol>
                            </div>
                        </div>
                        <br />

                        

                        


                        <div className="row">
                          <br/>
                            <div className="col-lg-12 col-md-12 col-sm-12 ">
                                <div className="portfolioFilter">
                                    <a href="#" data-filter="*" className="current">All</a>
                                    <a href="#" data-filter=".Active">Active Courses</a>
                                    <a href="#" data-filter=".Upcoming">Upcoming Courses</a>
                                    <a href="#" data-filter=".Completed">Completed Courses</a>
                                    

                                     <a onClick={()=>window.history.back()} className="pull-right" href="#" data-filteree="listview">Go back</a>
                                </div>
                            </div>
                        </div>

                        <div className="" >
                            <div className="portfolioContainer" >
                                <div className="col-sm-6 col-lg-3 col-md-4 Active illustrator photography">
                                    <div className="gal-detail thumb">
                                        <a href="assets/images/gallery/2.jpg" className="image-popup" title="Screenshot-2">
                                            <img src="assets/images/gallery/2.jpg" className="thumb-img" alt="work-thumbnail" />
                                        </a>
                                        <h4>instructor : saladin jake</h4>
                                         <div className="detail">
                                            <h4 className="m-t-0"><a href="" className="text-dark">Financial Modelling</a> </h4>
                                            <div className="rating">
                                                <ul className="list-inline">
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star-o" href=""></a></li>
                                                </ul>
                                            </div>
                                        <button type="button" className="btn   waves-effect"  style={{background:"blue",color:"#fff"}}>View Course Detail</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-3 col-md-4 Upcoming illustrator photography">
                                    <div className="gal-detail thumb">
                                        <a href="assets/images/gallery/2.jpg" className="image-popup" title="Screenshot-2">
                                            <img src="assets/images/gallery/2.jpg" className="thumb-img" alt="work-thumbnail" />
                                        </a>
                                        <h4>instructor : saladin jake</h4>
                                         <div className="detail">
                                            <h4 className="m-t-0"><a href="" className="text-dark">Financial Modelling</a> </h4>
                                            <div className="rating">
                                                <ul className="list-inline">
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star-o" href=""></a></li>
                                                </ul>
                                            </div>
                                        <button type="button" className="btn   waves-effect"  style={{background:"blue",color:"#fff"}}>View Course Detail</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-3 col-md-4 Completed graphicdesign">
                                    <div className="gal-detail thumb">
                                        <a href="assets/images/gallery/3.jpg" className="image-popup" title="Screenshot-3">
                                            <img src="assets/images/gallery/3.jpg" className="thumb-img" alt="work-thumbnail" />
                                        </a>
                                        <h4>instructor : saladin jake</h4>
                                         <div className="detail">
                                            <h4 className="m-t-0"><a href="" className="text-dark">Financial Modelling</a> </h4>
                                            <div className="rating">
                                                <ul className="list-inline">
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star-o" href=""></a></li>
                                                </ul>
                                            </div>
                                        <button type="button" className="btn   waves-effect"  style={{background:"blue",color:"#fff"}}>View Course Detail</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-lg-3 col-md-4 illustrator photography">
                                    <div className="gal-detail thumb">
                                        <a href="assets/images/gallery/4.jpg" className="image-popup" title="Screenshot-4">
                                            <img src="assets/images/gallery/4.jpg" className="thumb-img" alt="work-thumbnail" />
                                        </a>
                                        <h4>instructor : saladin jake</h4>
                                         <div className="detail">
                                            <h4 className="m-t-0"><a href="" className="text-dark">Financial Modelling</a> </h4>
                                            <div className="rating">
                                                <ul className="list-inline">
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star" href=""></a></li>
                                                    <li><a className="fa fa-star-o" href=""></a></li>
                                                </ul>
                                            </div>
                                        <button type="button" className="btn   waves-effect"  style={{background:"blue",color:"#fff"}}>View Course Detail</button>
                                        </div>
                                    </div>
                                </div>

                             
                              



                                
                                

                            </div>
                        </div> 

                    </div> 
                               
                </div> 

                <footer className="footer">
                    © 2016. All rights reserved.
                </footer>

            </div>
       <Sidebar />
      </Fragment>
  );
  }
}


// const Product = () => {
//   const [activeCourses, setActiveCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAuthProfile();
//   }, []);

//   const fetchAuthProfile = async () => {
//     try {
//       let res = await getAuthProfile();
//       setActiveCourses([...res.data.data]);
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || `Error occured fetching active courses`
//       );
//     }
//     setLoading(false);
//   };

  
// };

export default Products;
