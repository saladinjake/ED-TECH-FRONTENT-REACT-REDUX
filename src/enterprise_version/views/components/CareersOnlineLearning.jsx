import React from "react";
//import { Splide, SplideSlide } from "@splidejs/react-splide";
// 
//import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
const DigitalOnlineLearning = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {/* <Splide
            options={{
              // rewind: true,
              // gap   : '1rem',
              direction: "ttb",
              height: "27.6rem",
              arrows: false,
              pagination: false,
            }}
          >
            <SplideSlide className="bg-teal">
              <img
                src="coach-2.png"
                alt="Image 1"
                className="mx-auto d-block"
              />
            </SplideSlide>
            <SplideSlide className="bg-orange">
              <img
                src="coach-3.png"
                alt="Image 2"
                className="mx-auto d-block"
              />
            </SplideSlide>
          </Splide> */}
          <div className="row-flexes" style={{
            background:`url(${process.env.PUBLIC_URL+ "/banner.png" })`,
            height:"400px"
          }}>
          <div class="column-flexes">
        
          </div>

          <div class="column-flexes">

            <div class="bordered-box-about">
            <h2>Working with Questence</h2>

<p>Enjoy a great flexible working experience with us. </p>
            </div>
                  </div>

          </div>
         
        </div>
      </div>




  



      <div class="cpbody">

      <section >
        <div class="careercontent">
        <h2 class="sh">Dedication</h2>  
        <p> We are dedicated to empowering you with education and skills training from the best tutors, thereby being a positive force social change, while creating opportunities, prosperity, and equality for all. For institutions, we are a platform through which you can educate the world. For companies, we provide secure white-label platforms where employees can be trained and upskilled.
        </p>
        </div>

        <div class="careercontent">
        <h2 class="sh">E-learning</h2>  
        <p>At Questence, the whole world is your classroom. We are your partner-of-choice for online learning.
        </p>
        <p>
        In order to provide our clients with innovative solutions, we embrace new developments in e-learning, manufacturing technology and marketing trends. And everyday, our talented team keeps SinaLite moving towards our company mission.</p>
        </div>



        </section>


        <div class="beliefcon" style={{marginTop:"-90px"}}>
        <div class="bdiv">
            <div class="bcards">
             
             <h3 class="hcard">Focus on Customers</h3> 
              <p>  
              We care about our customers. Helping small businesses grow is top of mind when we provide innovative, swift solutions for our customers. 
              </p>
            </div>
            <div class="bcards">
              
              <h3 class="hcard">Improve the Process</h3> 
              <p>  
              We look for the best ways to solve a problem. By focusing on how we can do something better, we can complete projects more easily and efficiently.
              </p> 
            </div>
            <div class="bcards"> 
              
              <h3 class="hcard">Take the Risk</h3> 
              <p>
              Being bold and taking risks by pursuing new ideas
              </p>
            </div>
            <div class="bcards">
              
              <h3 class="hcard">Enjoy the Work</h3>
              <p>
              We love what we do. 
              being professionals at what we do, and having fun doing it.
              </p>
            </div>
            </div>
        </div>
        <div class="careercontent">
        <h2 class="sh">Our Culture</h2>
        <p>It is our team who makes Questence. We come from diverse backgrounds, but we share the same common goal.
        </p>
        <p>  
        Questence encourages an open culture, where every team member is a hands-on contributor. We are proud to maintain an environment in which employees feel comfortable sharing ideas and suggestions.
        </p>
        <p>
        Our team is made up of ambitious and talented individuals who are crucial to our continued success. While experience is an advantage for our candidates, we favour individuals who are capable and driven.
        </p>


        <div><h1>JOBS</h1></div>
               <p>No job posting</p>
        </div>

      
           

  </div>
  
 
    </>
  );
};

export default DigitalOnlineLearning;
