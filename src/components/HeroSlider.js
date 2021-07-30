import React, { Component } from "react";
import Datas from "../data/hero/hero-slider.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import 'swiper/css/swiper.css';
import { Styles } from "./styles/heroSlider.js";

class HeroSlider extends Component {
  render() {
    const settings = {
      slidesPerView: 1,
      loop: true,
      speed: 5000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      watchSlidesVisibility: true,
      effect: "fade",
      navigation: {
        nextEl: ".slider-button-next",
        prevEl: ".slider-button-prev",
      },
      renderPrevButton: () => (
        <div className="swiper-btn slider-button-prev">
          <i className="flaticon-arrow-left-th"></i>
        </div>
      ),
      renderNextButton: () => (
        <div className="swiper-btn slider-button-next">
          <i className="flaticon-arrow-right-th"></i>
        </div>
      ),
    };

    return (
      <Styles>
        {/* Hero Slider  style={{ marginBottom: "-70px" }} */}
        <div className="container-fluid">
        <section className="hero-slider-area " style={{background:"#eee"}}>
          <Swiper {...settings}>
            {Datas.map((data, i) => (
              <div className="slider-item" key={i}>
                <div className="image-container">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/${data.backgroundImage}`
                    }
                    className="slider-image"
                    alt={data.backgroundImage}
                  />
                </div>
                <div className="slider-table">
                  <div className="slider-tablecell">
                    <Container>


                      <Row>
                        <Col md="6" style={{marginTop:"-30px"}}>
                          <div className={data.uniqClass+ "  card-box"}>
                            <div className="slider-title shown"  >
                              <p className="style-set-2" style={{color: "#000", fontSize: "25px",letterSpacing:"-1",fontWeight:"normal", fontFamily: "Open Sans"}}>{data.title}</p>
                            </div>
                            <div className="slider-desc shown" >
                              <h1 className="style-set-4" style={{color: "#000", fontSize: "14px", fontFamily: "Open Sans"}}>{data.desc}</h1>
                            </div>


                            <div className="slider-title hide"  >
                              <p className="style-set-2" style={{color: "#000", fontSize: "25px",letterSpacing:"-1",fontWeight:"normal", fontFamily: "Open Sans"}}></p>
                            </div>
                            <div className="slider-desc hide" >
                              <h1 className="style-set-4" style={{color: "#000", fontSize: "14px", fontFamily: "Open Sans"}}>{data.desc}</h1>
                            </div>
                           
                            <div className="slider-title "  >
                              <p className="style-set-2" style={{color: "#000", fontSize: "14px",letterSpacing:"-1",fontWeight:"normal", fontFamily: "Open Sans"}}>{data.role1}</p>
                            </div>
                            
                            <div className="slider-title "  >
                              <p className="style-set-2" style={{color: "#000", fontSize: "14px",letterSpacing:"-1",fontWeight:"normal", fontFamily: "Open Sans"}}>{data.role2}</p>
                            </div>
                            
                            
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </div>
            ))}
          </Swiper>
        </section>
        </div>
      </Styles>
    );
  }
}

export default HeroSlider;
