import React, { useEffect, useState, Fragment } from 'react'
import './carousel.css';
import "./wishlist.css"
import {Link } from "react-router-dom"; 
import { addToWishlist } from "services/wishlist"
import { Container, Row, Col } from "react-bootstrap";


const Carousel = (props) => {
    const {children, show, title} = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    const [touchPosition, setTouchPosition] = useState(null)

    // Set the length to match current children from props

//     const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  // const [acloading, setAcLoading] = useState(false);
  // const [enrolledCourses, setEnrolledCourses] = useState([]);

  const addToMyWishList = async (id) => {
    setStatus("loading");
    console.log(id)
    try {
       await addToWishlist(id)
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async function loadContent() {
      
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function CheckStatus() {
      // if (isAuthenticated === true) {
        try {
          
        } catch (err) {
          // toast.error(
          //   err?.response?.data?.message ||
          //     `Error occured fetching active courses`
          // );
        }
        setLoading(false);
      // }
    })();
    // eslint-disable-next-line
  }, []);


    useEffect(() => {
        setLength(children.length)

        

  
       
    }, [children])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }

    return (
        <div className="carousel-container">
        <h3> { /*title */}</h3>
            <div className="carousel-wrapper">
                {/* You can alwas change the content of the button to other things */}
                <button onClick={prev}   className="left-arrow" style={{background: "#212529", color:"#fff"}}>
                        &lt;
                    </button>
                <div
                    className="carousel-content-wrapper gridDisplay"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${8}`}
                        style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
                    >

                    {children.map( (data,i)=> {
                      

                      return (
                            <Col lg="3" md="9" key={i}>

                       <div className="widget">
                        <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                        <div className="widgetImage animation">
                          <img src={`${data.course_cover_image}`} alt="Product 1" />
                        </div>
                        <div className="widgetContent animation" >
                          <h6 className="widgetTitle">
                        {data.course_name}
                         </h6>
                         <p style={{padding: "10px"}}>
                        A course by {data.instructor.user.first_name}  {data.instructor.user.last_name}  
                         </p>
                         <div className="widgetSubTitle">
                         <hr style={{width:"240px"}}/>
                          <h2 >Course</h2>
                         </div>
                          
                        </div>
                        </Link>
                      </div>

                      </Col>
                      )
                    })}
                        
                  
                   

                   

              




                    </div>
                </div>
                {/* You can alwas change the content of the button to other things */}
                <button onClick={next}   className="right-arrow" style={{background: "#212529", color:"#fff"}}>
                        &gt;
                    </button>)
                    
                
            </div>
        </div>
    )
}

export default Carousel