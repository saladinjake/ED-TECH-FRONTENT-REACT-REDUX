import React from 'react';
import ProfessionalExamCard from './ProfessionalExamCard';
import Slider from "react-slick";

import { 

  PROGRAM_LINK 
} from "../../shared/data";

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
              slidesToScroll: 1,
              arrows: false
            }
          }
        ]
      };
    return ( 
        <>
            <div className="container mt-5">
                <div className="row mb-3">
                    <h4 className="subheading-1 col">Professional Exams?</h4>
                    <p className="text-14">The Questencw Digital Learning Centre deploys cutting edge technology to help you ace your next professional examination. Providing unparalled
levels of interactivity and convenience.</p>
                </div>
                <div className="row mx-2">
                    <Slider {...settings} className="row">

                      {  PROGRAM_LINK.length > 0 && PROGRAM_LINK.map(item=>{
                           return (<ProfessionalExamCard id={item.id} name={item.name} imgUrl={item.logo}/>)
                      })
                     }
                        
                        
                    </Slider>
                </div>
            </div>
        </>
     );
}
 
export default ProfessionalBodySection;