import React from "react";
import CategoryCard from "./CategoryCard";
import Slider from "react-slick";

const CategorySection = () => {
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
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
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="container my-5">
        <div className="row mb-3">
          <h4 className="subheading-1 col">Categories</h4>
          <div className="col">
            <a
              href=""
              className="btn btn-solid-teal text-14 border-radius-50 float-end px-3"
            >
              All categories <i className="bi bi-chevron-right"></i>
            </a>
          </div>
        </div>
        <div className="row">
          <Slider {...settings} className="row">
            <CategoryCard
              categoryTitle="Arts & Humanities"
              categoryLists="Education	History,	Politics,	Sociology,	Geography,	Law,	Psychology,	Media And Journalism,	Architecture	"
            />
            <CategoryCard
              categoryTitle="Business And Operations Management"
              categoryLists="Human Resources Administration,	Leadership And Management,	Finance And Banking,	Accounting,	Business Process Management,	Service Management,	Supply Chain Management, Sales And Marketing Management,	Risk Management,	Customer Service	"
            />
            <CategoryCard
              categoryTitle="Engineering"
              categoryLists="Computer Engineering, Electrical Engineering, Mechanical Engineering, Chemical Engineering, Civil Engineering"
            />
            <CategoryCard
              categoryTitle="Physical Sciences "
              categoryLists="Biology,	Physics,	Chemistry, Environmental Studies, Agricultural Science"
            />
            <CategoryCard
              categoryTitle="Mathematics "
              categoryLists="Biology,	Physics,	Chemistry, Environmental Studies, Agricultural Science"
            />
            <CategoryCard
              categoryTitle="Computer Science & Information Technology "
              categoryLists="Computer Science, Network And Security,	Software Development,	Digital Marketing, It Management"
            />
            <CategoryCard
              categoryTitle="Law & Social Sciences "
              categoryLists="Economics, Law, Psychology"
            />
            <CategoryCard
              categoryTitle="Health Care "
              categoryLists="Nursing, Disease And Disorders,	Nutrition,	Caregiving,	Pharmacology"
            />
          </Slider>
        </div>
      </div>
    </>
  );
};

export default CategorySection;
