import React, { Fragment,useEffect, useState } from 'react'
import './carousel.css';
import {Link } from "react-router-dom"


const Carousel = (props) => {
    const {children, show} = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    const [touchPosition, setTouchPosition] = useState(null)

    // Set the length to match current children from props
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
                {
                    currentIndex > 0 &&
                    <button onClick={prev} className="left-arrow" style={{background: "#0253c8", color:"#fff"}}>
                        &lt;
                    </button>
                }
                <div
                    className="carousel-content-wrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${show}`}
                        style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                    >
                        {children.length > 0 &&
                                children.map((item, i) => {
                                           return (<div style={{width:"100%",marginLeft:"15px"}} className=" col-sm-6 col-lg-3 col-md-4 mobiles card-box">
                                           <Link to={ '../courses/'+ item.id +'/'+ item.slug}><h4 className="m-t-0"><Link to={ '../courses/'+ item.id +'/'+ item.slug} style={{fontSize:"14px"}}  className="text-dark">{item.course_name}</Link></h4></Link>
                              
              <div className="product-list-box thumb">
                    <Link to={ '../courses/'+ item.id +'/'+ item.slug} className="image-popup" title="Screenshot-1">
                       {item.course_cover_image !=null ? (<img src={item.course_cover_image} className="thumb-img card-box" alt="work-thumbnail" />
                    ) : ( <Fragment />)}   </Link>

                    <div className="product-action">
                          <Link to={ '../courses/'+ item.id +'/'+ item.slug} className="btn btn-success btn-sm"><i className="md md-book"></i></Link>
                                            
                    </div>

                    <div className="price-tag " style={{fontSize:"10px"}}>
                           N {item.price}
                    </div>
                    <div className="detail">
                                 <div className="rating" style={{width:"100px"}}>
                                                <ul className="list-inline">
                                                    <li><a alt="hello-1" className="fa fa-star" href="#"></a></li>
                                                    <li><a alt="hello-2" className="fa fa-star" href="#"></a></li>
                                                    <li><a alt="hello3" className="fa fa-star" href="#"></a></li>
                                                    <li><a alt="hello33" className="fa fa-star" href="#"></a></li>
                                                    <li><a alt="hello332" className="fa fa-star-o" href="#"></a></li>
                                                </ul>
                                  </div>
                                            <h5 className="m-0"> <span className="text-muted"> instructor : {item.instructor.user.username}</span></h5>
                        </div>
              </div>
      </div>)     
                                   })}
                    </div>
                </div>
                {/* You can alwas change the content of the button to other things */}
                {
                    currentIndex < (length - show) &&
                    <button onClick={next} className="right-arrow" style={{background: "#0253c8", color:"#fff"}}>
                        &gt;
                    </button>
                }
            </div>
        </div>
    )
}

export default Carousel