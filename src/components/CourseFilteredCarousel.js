import React, { useEffect, useState, Fragment } from 'react'
import './carousel.css';
import "./wishlist.css"
import {Link } from "react-router-dom"; 
import { addToWishlist } from "services/wishlist"


const Carousel = (props) => {
    const {children, show} = props

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
            <div className="carousel-wrapper">
                {/* You can alwas change the content of the button to other things */}
                <button onClick={prev}   className="left-arrow" style={{background: "#0253c8", color:"#fff"}}>
                        &lt;
                    </button>
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${8}`}
                        style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
                    >

                    {children.map(item=> {
                      
                      return (
                            <div style={{width:"300px"}}>
                              <div style={{padding: 8}}>
                                  <img src="https://via.placeholder.com/300x300" alt="placeholder" style={{width: '100%'}} />
                              </div>
                            </div>
                      )
                    })}
                        
                  
                   

                   

              




                    </div>
                </div>
                {/* You can alwas change the content of the button to other things */}
                <button onClick={next}   className="right-arrow" style={{background: "#0253c8", color:"#fff"}}>
                        &gt;
                    </button>)
                    
                
            </div>
        </div>
    )
}

export default Carousel