import React , { useEffect } from 'react';
import "./styles/hero.scss";
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


import "./hero.css";
const Hero = () => {
  let history = useHistory();
useEffect(() => {


})
  
  return (


    <section className="hero-area" style={{background: `linear-gradient(200deg, #fff 30%, #2a0845 60%)` }}>
      <Container>
      <Row>
        <Col lg="7">

          <div className="hero-area__left">
            <h2>
              Accelerate your quest,<br></br>
              <span>learn</span> anywhere, anytime.
            </h2>
            <p style={{color:"#fff"}}>
            Acquire new knowledge and skills, train for certifications, diplomas and degrees from world-class institutions at your 
            own pace and space.
            </p>

             <ul class="contact">
      <li><a href="mailto:jonas@badalic.com">Login</a></li>
          <li>
          <a target="_top"href="https://codepen.io/JonasB/">Signup</a>
        </li>
        <li>
          <a target="_top" href="https://twitter.com/JonasBadalic">Find courses</a></li>
        <li><a target="_top" href="https://si.linkedin.com/in/jonasbadalic">About</a></li>
      </ul>



            <div className="cta">
              <button onClick={() => history.push('/courses')}>Find Courses</button>
              <button className="outline" onClick={() => history.push('/register')}>Sign Up</button>
            </div>
          </div>
      </Col>
     
      <Col lg="5">
      <figure>
        <img
          src={process.env.PUBLIC_URL + `/assets/images/questone.png`}
          className="main-img1"
          alt=""
        />
      </figure>
      </Col>

     

      </Row>

      </Container>
  
  

  
    

    
  
     </section>




   
  );
};

export default Hero;
