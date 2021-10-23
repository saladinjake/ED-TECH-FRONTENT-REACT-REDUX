import React from 'react';
import ProfessionalExamCard from './ProfessionalExamCard';
import Slider from "react-slick";

const ProfessionalBodySection = () => {
    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return ( 
        <>
            <div className="container mt-5">
                <div className="row mb-3">
                    <h4 className="subheading-1 col">Professional Exams?</h4>
                    <p class="text-14">The Questencw Digital Learning Centre deploys cutting edge technology to help you ace your next professional examination. Providing unparalled
levels of interactivity and convenience.</p>
                </div>
                <div className="row">
                    <Slider {...settings} className="row">
                        <ProfessionalExamCard imgUrl="/nim 1.png"/>
                        <ProfessionalExamCard imgUrl="/cipm.png"/>
                        <ProfessionalExamCard imgUrl="/citn.png"/>
                        <ProfessionalExamCard imgUrl="/ican.png"/>
                    </Slider>
                </div>
            </div>
        </>
     );
}
 
export default ProfessionalBodySection;