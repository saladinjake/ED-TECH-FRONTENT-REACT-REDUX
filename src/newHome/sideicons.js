import React, { useEffect } from "react";
import "./box-sizer.css"

import $ from "jquery"

const Section = () => {
  useEffect(()=>{
   // $(".selector").on({
   //      mouseenter: function () {
   //          //stuff to do on mouse enter
   //      },
   //      mouseleave: function () {
   //          //stuff to do on mouse leave
   //      }
   //  });



   // $(".card-1box one").on("mouseover", function () {
   //  //stuff to do on mouseover
   //     $(this).find(".icon-boxs").animate({
   //       top:"-20px"
   //     },1000)

   //     // alert(this.target)
   //  });

  })
  return (
<div>
<br/><br/><br/><br/>
<div style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/H4-Parallax-3.jpg)`,
            backgroundSize:"cover",
          }}>



          
     <div className="container main-center"  >


     <div className="child-center">

        <div >
        <br/>
           <h1
          className=""
          style={{ color: "#000"}}
        >
          <b style={{ color: "#000" }}>Categories</b>
        </h1>
        </div>

       


       <div>
        <div className="carded-1box card-1box one " >
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                    <i className="fa fa-institution fa-3x midnight"></i>
                  </div>
                  <div  className="head-title">
                       <h1 style={{lineHight:"-10px"}}>ARTS & HUMANITIES</h1>

                   </div>
                   <div className="detail-sections" style={{marginTop: "40px"}}>
                       <p className="infomation">
                            Education,
                            History,
                            Politics,
                            Sociology,
                            Geography,
                            Law,
                            Psycology,
                            Media,
                            Architecture
                       </p>
                   </div>
              </div>


              <div className="details-window-animated up ">
                  
              </div>

                <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="./courses/category/10" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Category </a>

                <a 
                    href="./courses/category/10" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>
        </div>
        
        <div className="carded-1box card-1box one " >
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                    <i className="fa fa-briefcase fa-3x maroon"></i>
                  </div>
                  <div  className="head-title">
                       <h1 style={{lineHight:"-10px"}}>BUSINESS & OPERATIONS MANAGEMENT</h1>

                   </div>
                   <div className="detail-sections">
                      <p className="infomation" style={{marginTop:"15px"}}>

                       
                            Human Resource Adminstration,
                            Leadership And Management,
                            Finance And Banking,
                            Accounting,
                            Business Process Management,
                            Service Management,
                            Sales And Marketing Management,
                            Supply Chain Management,
                            Risk  Management,
                            Customer Service

                      </p>
                   </div>
              </div>


                <div className="details-window-animated up">
                    
                </div>
                <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="./courses/category/2" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Category </a>

                <a 
                    href="./courses/category/2" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>   
        </div>

        
        <div className="carded-1box card-1box one " >
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                    <i className="fa fa-wrench fa-3x sky"></i>
                  </div>
                  <div  className="head-title">
                       <h1 style={{lineHight:"-10px"}}>ENGINEERING</h1>

                   </div>
                   <div className="detail-sections" style={{marginTop: "40px"}}>
                      <p className="infomation">


                       Computer Engineering,
                            Electrical Engineering,
                            Mechanical Engineering,
                            Chemical Engineering,
                            Civil Engineering
                      
                           
                      </p>
                   </div>
              </div>


              <div className="details-window-animated up">
                  
              </div>
               <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="./courses/category/8" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Category </a>

                <a 
                    href="./courses/category/8" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div> 
        </div>




        <div className="carded-1box card-1box one " >
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                    <i className="fa fa-arrows-alt fa-3x beige"></i>
                  </div>
                  <div  className="head-title">
                       <h1 style={{lineHight:"-10px"}}>PHYSICAL SCIENCES</h1>

                   </div>


                   <div className="detail-sections" style={{marginTop: "40px"}}>
                      <p className="infomation">


                       Biology,
                            Physics,
                            Chemistry,
                            Environmental Studies,
                            Agricultural Science


                      </p>
                   </div>
              </div>


                <div className="details-window-animated up">
                    
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
                     
                        
                    }}>Category </a>

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

      </div>


      <div>

        <div className="carded-1box card-1box one " >
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                       <i className="fa fa-line-chart fa-3x antiquewhite"></i>
                   </div>
                   <div  className="head-title">
                       <h1 style={{lineHight:"-10px"}}>MATHEMATICS</h1>

                    
   

                   </div>
                   <div className="detail-sections" style={{marginTop: "40px"}}>
                      <p className="infomation">
                             Calculus,
                            Probability And Statistics,
                            Algebra
                      </p>
                   </div>
              </div>


                <div className="details-window-animated up">
                    
                </div>
                 <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="./courses/category/39" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Category </a>

                <a 
                    href="./courses/category/39" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>  
        </div>





        <div className="carded-1box card-1box one " >
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                       <i className="fa fa-code fa-3x azure "></i>
                   </div>
                   <div  className="head-title">
                       <h1 style={{lineHight:"-10px"}}>COMPUTER SCIENCE & INFORMATION TECHNOLOGY</h1>

                    
   

                   </div>
                   <div className="detail-sections" style={{marginTop: "40px"}}>
                      <p className="infomation" style={{marginTop:"-15px"}}>
                             Computer Science,
                            Neonerking And Security,
                            Software Development,
                            Digital Marketing,
                            IT Management
                      </p>
                   </div>
              </div>


                <div className="details-window-animated up">
                    
                </div>
                 <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="./courses/category/1" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Category </a>

                <a 
                    href="./courses/category/1" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>
                  
        </div>




        <div className="carded-1box card-1box one " >
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                       <i className="fa fa-balance-scale fa-3x mediumvioletred"></i>
                   </div>
                   <div  className="head-title">
                       <h1 style={{lineHight:"-10px"}}>LAW & SOCIAL SCIENCES</h1>

                    
   

                   </div>
                   <div className="detail-sections" style={{marginTop: "40px"}}>
                      <p className="infomation">
                           
                          Economics,
                            Law,
                            Psycology
                      </p>
                   </div>
              </div>


                <div className="details-window-animated up">
                    
                </div>
                <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%"}}>
                 <a 
                    href="./courses/category/9" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Category </a>

                <a 
                    href="./courses/category/9" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>
                  
        </div>





        <div className="carded-1box card-1box one " >
                <div className="" style={{textAlign:"center", margin:"0px auto"}}>
                   <div className="icon-boxs">
                       <i className="fa fa-medkit fa-3x deeppink"></i>
                   </div>
                   <div  className="head-title">
                       <h1 style={{lineHight:"-10px"}}>HEALTH CARE</h1>

                    
   

                   </div>
                   <div className="detail-sections" style={{marginTop: "40px"}}>
                      <p className="infomation">
                           Nursing,
                            Disease And Disorders,
                            Nutrition,

                            Care Giving,
                            Pharmacology
                      </p>
                   </div>
              </div>


                <div className="details-window-animated up">
                   
                </div>
              <div style={{background:"rgba(8,23,200)", height:"50px", position:"absolute",
                        bottom:"-10px",   borderTop:"1px solid #fafafa",width:"100%", opacity:"0.9"}}>
                 <a 
                    href="./courses/category/5" 
                    className="btn btn-default" 
                    style={{
                       float:"left",
                        color:"#fff",
                        borderRadius:"10px", 
                     
                        
                    }}>Category </a>

                <a 
                    href="./courses/category/5" 
                    className="btn btn-default" 
                    style={{
                        float:"right",
                        borderRadius:"10px", 
                        color:"#fff"
                    }}>Details </a>
               </div>   
        </div>


        
</div>


  </div>


     </div>

     
   <br/> 
   
 <div style={{margin:"35px"}} ></div>
</div>

</div>
  );
};

export default Section;
