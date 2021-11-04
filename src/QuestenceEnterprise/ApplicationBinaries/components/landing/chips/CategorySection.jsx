import React, { useState, useEffect }  from 'react';
import CategoryCard from './CategoryCard';
import Slider from "react-slick";

import { 
  getCategories
} from "../../../api/enrollment_services/category.services";

import toast from "react-hot-toast";
const CategorySection = () => {


  const [categories, setInfo] = useState([]);
 
  
  

   useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getCategories();

        setInfo([...res.data.data]);
       
      } catch (err) {
        toast.error("Error occured fetching notifications");
      }
      // setLoading(false);
    })();

 // eslint-disable-next-line
  }, []);
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
            <div className="container my-5">
                <div className="row mb-3">
                    <h4 className="subheading-1 col">Categories</h4>
                    <div className="col">
                        <a href="" className="btn btn-solid-teal text-14 border-radius-50 float-end px-3">All categories <i className="bi bi-chevron-right"></i></a>
                    </div>
                </div>
                <div className="row">
                    <Slider {...settings} className="row">
                    {categories.length > 0 && categories.map(category => {
                        
                        let subcategories =[];
                        if(category?.subcategories && category?.subcategories.length> 0){
                           subcategories = category?.subcategories
                        }
                        return (
                          <CategoryCard 
                          name={category.name}
                          subcategories={subcategories}
                          />
                        )
                    })
                        
                    }
                       
                    </Slider>
                </div>
            </div>
        </>
     );
}
 
export default CategorySection;