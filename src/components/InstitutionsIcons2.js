import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/aboutUs.js";
import "./partner.css";

class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <Styles>
        {/* About Us */}
        <section className="about-us" style={{background:"#fff"}}>
          <Container>
            <Row>
              <Col md="12">

              <div className="about-content" style={{marginTop:"-60px"}}>
                  <h2 className="about-title" style={{fontFamily:"Open Sans", color:"#000"}}>Professional Exams?</h2>
                  <p className="about-para" style={{fontFamily:"Open Sans", color:"#000"}}>
                    The Questence Digital Learning Centre deploys cutting edge
                    technology to help you ace your next  professional examination.
                    Providing unparalled levels of interactivity and
                    convenience.</p>
                    <br />
                </div>

              </Col>
              <Col md="12">


                   <div className="carded-1box card-1box two two-third" style={{height:"360px",
                   

                 }}>
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                <div className="icon-boxs">
                      <img  style={{width:"200px",height:"200px"}} src={process.env.PUBLIC_URL+`/assets/images/institutions/nim.png`}/>
                  </div>
                   
                  <div  className="head-title">
                      

                   </div>
                   
              </div>


             <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Program</a>

                <a 
                     href={process.env.PUBLIC_URL+"/institute/3"}
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>   
        </div>
        


        <div className="carded-1box card-1box two two-third " style={{height:"360px",
    


      }}>
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                <div className="icon-boxs">
                      <img  style={{width:"200px",height:"200px"}} src={process.env.PUBLIC_URL+`/assets/images/institutions/ipan.png`}/>
                  </div>
                   
                  <div  className="head-title">
                       

                   </div>
                   
              </div>


              <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Program</a>

                <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>   
        </div>
        


        <div className="carded-1box card-1box two two-third " style={{height:"360px"

      }}>
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                      <img  style={{width:"200px",height:"200px"}} src={process.env.PUBLIC_URL+`/assets/images/institutions/ican.jpg`}/>
                  </div>
                  <div  className="head-title">
                       

                   </div>
                   
              </div>


              <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Program</a>

                <a 
                    href={process.env.PUBLIC_URL+"/institute/2"}
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>   
        </div>
        

        <div className="carded-1box card-1box two two-third " style={{height:"360px"
        


      }}>
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                    <img  style={{width:"200px",height:"200px"}} src={process.env.PUBLIC_URL+`/assets/images/institutions/anan.jpg`}/>
        
                  </div>
                  <div  className="head-title">
                       

                   </div>
                   
              </div>


              <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Program</a>

                <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>   
        </div>
        
        <div className="carded-1box card-1box two two-third " style={{height:"360px",
    


      }}>
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                <div className="icon-boxs">
                      <img  style={{width:"200px",height:"200px"}} src={process.env.PUBLIC_URL+`/assets/images/institutions/citn.png`}/>
                  </div>
                   
                  <div  className="head-title">
                      
                   </div>
                   
              </div>


              <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Program</a>

                <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>   
        </div>

        


           <div className="carded-1box card-1box two two-third " style={{height:"360px",
    


      }}>
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                <div className="icon-boxs">
                      <img  style={{width:"200px",height:"200px"}} src={process.env.PUBLIC_URL+`/assets/images/institutions/cipm.jpg`}/>
                  </div>
                   
                  <div  className="head-title">
                      
                   </div>
                   
              </div>


              <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href={process.env.PUBLIC_URL+ "/institute/1"} 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Program</a>

                <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>   
        </div>


        

        <div className="carded-1box card-1box two two-third " style={{height:"360px"
      


      }}>
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                     <img  style={{width:"200px",height:"200px"}} src={process.env.PUBLIC_URL+`/assets/images/institutions/cibn.jpg`}/>
        
                  </div>
                  <div  className="head-title">
                       
                   </div>
                   
              </div>


              <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Program</a>

                <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>   
        </div>
        

        <div className="carded-1box card-1box two two-third " style={{height:"360px"
       

      }}>
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                     <img  style={{width:"200px",height:"200px"}} src={process.env.PUBLIC_URL+`/assets/images/institutions/cia.png`}/>
        
                  </div>
                  <div  className="head-title">
                      
                   </div>
                   
              </div>


              <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Program</a>

                <a 
                    href="#" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>   
        </div>
        


              </Col>
            </Row>
          </Container>
        </section>
      </Styles>
    );
  }
}

export default AboutUs;
