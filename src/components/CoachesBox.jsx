import React from 'react';
import ImageCard from './ImageCard';
import CoachCard from  "./CoachCard";
import Slider from 'react-slick';

const CoachesBox = () => {
    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
              
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              
            }
          }
        ]
      };
    return ( 
    <>
        <div className="container d-none d-md-flex">
            <div className="row py-5">
                <div className="col-md-4 col-sm-12 position-relative overflow-hidden">
                    <img src="/Main.png" className="w-100"/>
                    {/* <div className=""> */}
                        <a href="" className="d-block d-block w-100 position-absolute bottom-0 start-0 text-center border-radius-50 bg-dark fs-3 opacity-50 text-white py-3 text-decoration-none fw-bold">Meet your Teachers</a>
                    {/* </div> */}
                </div>
                <div className="col-md-8 col-sm-12">
                    <div className="row">
                        <div className="col bg-dark-gradient text-white border-radius-15 p-4 mt-2">
                            <p className="text-uppercase fs-4 fw-bold">OLUYEMI ADEOSUN</p>
                            <p>Join me on Questence for exciting adventure as we muster the basics of playing the guitar.</p>
                            <p>ELECTED MEMBER  |  GOVERNING COUNCIL  |  CHARTERED INSTITUTE OF PERSONAL MANAGEMENT (CIPM)  |  SPHRI GPHR MCIPM MBA MSC</p>
                            <p className="float-end"><a href="" className="btn btn-light border-radius-50 btn-lg">Start Learning</a></p>
                        </div>
                    </div> 
                    <div className="row mt-4 gx-4">
                        <div className="col-md-4 col-sm-12 my-2">
                            <ImageCard ImgUrl="/main 1.png" />
                        </div>
                        <div className="col-md-4 col-sm-12 my-2">
                            <ImageCard ImgUrl="/main 2.png" />
                        </div>
                        <div className="col-md-4 col-sm-12 my-2">
                            <ImageCard ImgUrl="/main 3.png" />
                        </div>
                    </div> 
                </div>
            </div> 
        </div>
        <div className="container d-md-none mb-5">
            
            <Slider {...settings} className="row">
                <CoachCard cardTitle="OLUYEMI ADEOSUN" cardBtnText="Start Learning" cardImage="/Main.png" cardText2="ELECTED MEMBER  |  GOVERNING COUNCIL  |  CHARTERED INSTITUTE OF PERSONAL MANAGEMENT (CIPM)  |  SPHRI GPHR MCIPM MBA MSC" cardText="Join me on Questence for exciting adventure as we muster the basics of playing the guitar."/>
                <CoachCard cardTitle="OLUYEMI ADEOSUN" cardBtnText="Start Learning" cardImage="/Main.png" cardText2="ELECTED MEMBER  |  GOVERNING COUNCIL  |  CHARTERED INSTITUTE OF PERSONAL MANAGEMENT (CIPM)  |  SPHRI GPHR MCIPM MBA MSC" cardText="Join me on Questence for exciting adventure as we muster the basics of playing the guitar."/>
                <CoachCard cardTitle="OLUYEMI ADEOSUN" cardBtnText="Start Learning" cardImage="/Main.png" cardText2="ELECTED MEMBER  |  GOVERNING COUNCIL  |  CHARTERED INSTITUTE OF PERSONAL MANAGEMENT (CIPM)  |  SPHRI GPHR MCIPM MBA MSC" cardText="Join me on Questence for exciting adventure as we muster the basics of playing the guitar."/>
            </Slider>
        </div>
    </>
    );
}
 
export default CoachesBox;