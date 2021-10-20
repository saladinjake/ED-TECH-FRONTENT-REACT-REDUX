import React, { Fragment, useEffect, useState } from "react";

import $ from "jquery";

import NavBar from "components/Navbar";
import Footer from "../../components/Footer";


import { useQuery } from "hooks/useQuery.js";


// Todo : 1) Component edit for html text, iframe and video (youtube, vimeo, mp3)
// only for project contract phase 1
//2) test and fix bugs.
//3) done with this phase no addition of more complexity just mvp



import {
  getCourse,
  getSectionsOfCourseId,
  getSubSectionsOfSectionId,
  getLessonsOfSubsection,
  getComponentsOfLessons,
  getVideoComponentsOfLessons,

  //edit

  // delete

  getCourseData

  //reorder position

} from "services/authoring"


function removeLoader(){
  $( "#loadingDiv" ).fadeOut(500, function() {
          // fadeOut complete. Remove the loading div
      $( "#loadingDiv" ).remove(); //makes page more lightweight 
      $(".edged p").css({color:"#000"});
    $(".edged span").css({color:"#000"})
  }); 



  //preview small screen scroller

  RightSideMenuPreview();


}


function RightSideMenuPreview(){
 
    var body = $('body'),
        mask = $('<div class="mask"></div>'),
        toggleSlideRight = document.querySelector( ".toggle-slide-right" ),
        slideMenuRight = document.querySelector( ".slide-menu-right" ),
        activeNav = '';
    ;
    $('body').append(mask);

    //open by default the side preview
    $('body').addClass("smr-open");
        $('.mask').fadeIn();
        activeNav = "smr-open";
 
    /* slide menu right */
  toggleSlideRight.addEventListener( "click", function(){
        $('body').addClass("smr-open");
        $('.mask').fadeIn();
        activeNav = "smr-open";
    } );
 
    /* hide active menu if close menu button is clicked */
    $(document).on('click', ".close-menu", function(el,i){
        $('body').removeClass(activeNav);
        activeNav = "";
        $('.mask').fadeOut();
    });
 
}




function fit() {
    var iframes = document.querySelectorAll("iframe.gh-fit")

    for(var id = 0; id < iframes.length; id++) {
        var win = iframes[id].contentWindow
        var doc = win.document
        var html = doc.documentElement
        var body = doc.body
        var ifrm = iframes[id] // or win.frameElement

        if(body) {
            body.style.overflowX = "scroll" // scrollbar-jitter fix
            body.style.overflowY = "hidden"
        }
        if(html) {
            html.style.overflowX = "scroll" // scrollbar-jitter fix
            html.style.overflowY = "hidden"
            var style = win.getComputedStyle(html)
            ifrm.width = parseInt(style.getPropertyValue("width")) // round value
            ifrm.height = parseInt(style.getPropertyValue("height"))
        }
    }

    window.requestAnimationFrame(fit)
}


window.hoverIntoNav = (el) => {
  $(el).css({cursor:"pointer", background:"rgba(8,23,200)", color:"#fff"})
}

window.loadIntoView = (el) => {

 $("#workbench").find("div.module-in-view-port").css({display:"none"})
  
  $("#workbench").append(`<div style="margin-left:90px" id="loadingDiv" ><div class="LockOn" >Loading...</div></div>`);
      // $( "#loadingDiv" ).css({position:"absolute",top:"200px",left:"100px"})
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.
   $("#load-module-slide-"+ el.getAttribute("id")).css({display:"block"}).fadeIn()
   $("#lesson-name").html(el.getAttribute("data-name"))
   
   //change the track set to the current video for both next and previous
   $(".next-slide").attr("data-current-id",el.getAttribute("id"))
   $(".prev-slide").attr("data-current-id",el.getAttribute("id"))
   window.addEventListener("click", window.requestAnimationFrame.bind(this, fit))
  
}

const nextSlide = (e) => {
   $("#"+e.target.getAttribute("data-current-id")).next().click()
}

const prevSlide = (e) => {
  $("#"+e.target.getAttribute("data-current-id")).prev().click()
}


window.handleToggleAccordion = (el) => {
   $("#content-" +$(el).attr("id")).toggle()
    
  }



const togglerFullscreen = (e) => {
    e.preventDefault();
    // $('#toggle_fullscreen').on('click', function(){
    // if already full screen; exit
    // else go fullscreen
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        $("#container-fullscreen").css({
          height: "100vh",
          "overflow-y": "none",
        });

        $(".container-fullscreen").css({
          height: "auto",
          "overflow-y": "none",
        });
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      

         let element = $(".container-fullscreen").get(0);
      if (element.requestFullscreen) {
        element.requestFullscreen();
        $(".container-fullscreen").css({
          height: "100vh",
          "overflow-y": "scroll",
        });
      }
      // element = $("#container-fullscreen").get(0);
      // if (element.requestFullscreen) {
      //   element.requestFullscreen();
      //   $("#container-fullscreen").css({
      //     height: "600px",
      //     "overflow-y": "scroll",
      //   });


        // $(".tab-content").css({height:"400px","overflow-y":"none"})
      //}

       else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
    // });
  }



const AuthoringPreview = (props) => {
  let pageLeftContent = [];

  const [queryVal, setQueryVal] = useState("");
  const query = useQuery();
  let routeQuery = query.get("filter");

  const [querySearchVal, setVal] = useState(query.get("q"));
  const [querySearchMethod, setMethod] = useState(query.get("method"));
  const [courseData,setCourseData] = useState()

  useEffect(() => {
    
    $("body").css({background:"#fff"})

    //show loading until all videos are ready
   $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,20000); //wait for page load PLUS two seconds.
     

     //change vimeo video width settings
    $(".player").css({width:"100% !important", "min-width":"100% !important","max-width":"100% !important"})
    .addClass("col-md-12")
    

   

    
    $(".edged h1,.edged h2,.edged h3, .edged h4, .edged h5").css({color:"#000"})

    
  }, [routeQuery]);



  function videoId(url) {
    var $videoUrl = url;
    if ($videoUrl !== undefined) {
      var $videoUrl = $videoUrl.toString();
      var srcVideo;

      if ($videoUrl.indexOf("youtube") !== -1) {
        var et = $videoUrl.lastIndexOf("&");
        if (et !== -1) {
          $videoUrl = $videoUrl.substring(0, et);
        }
        var embed = $videoUrl.indexOf("embed");
        if (embed !== -1) {
          $videoUrl =
            "https://www.youtube.com/watch?v=" +
            $videoUrl.substring(embed + 6, embed + 17);
        }

        srcVideo =
          "https://www.youtube.com/embed/" +
          $videoUrl.substring($videoUrl.length - 11, $videoUrl.length) +
          "?autoplay=1&mute=1&loop=1&playlist=" +
          $videoUrl.substring($videoUrl.length - 11, $videoUrl.length) +
          "";
      } else if ($videoUrl.indexOf("youtu") !== -1) {
        var et = $videoUrl.lastIndexOf("&");
        if (et !== -1) {
          $videoUrl = $videoUrl.substring(0, et);
        }
        var embed = $videoUrl.indexOf("embed");
        if (embed !== -1) {
          $videoUrl =
            "https://youtu.be/" + $videoUrl.substring(embed + 6, embed + 17);
        }

        srcVideo =
          "https://www.youtube.com/embed/" +
          $videoUrl.substring($videoUrl.length - 11, $videoUrl.length) +
          "?autoplay=0&mute=0&enablejsapi=1&amp;?rel=0&amp;controls=0&amp;showinfo=0&loop=1&playlist=" +
          $videoUrl.substring($videoUrl.length - 11, $videoUrl.length) +
          "";
      } else if ($videoUrl.indexOf("vimeo") !== -1) {
        srcVideo =
          "https://player.vimeo.com/video/" +
          $videoUrl
            .substring($videoUrl.indexOf(".com") + 5, $videoUrl.length)
            .replace("/", "") +
          "?autoplay=1";
      } else if ($videoUrl.indexOf("mp4") !== -1) {
        console.log("its here but not showing")
        return (
          '<div class="container-fluid "><video  class="gh-fit col-md-12 " style="display:block;" loop playsinline controls><source src="' +
          $videoUrl +
          '" type="video/mp4"></video></div><hr/>'
        );

      }else  if ($videoUrl.indexOf(".com") !== -1 || $videoUrl.indexOf(".ng") !== -1 ||$videoUrl.indexOf(".org") !== -1 || $videoUrl.indexOf("http://") !== -1 || $videoUrl.indexOf("https") !== -1){
       srcVideo = $videoUrl;
        
      } else {
        console.log(srcVideo+ "  is in error")
        // alert(
        //   "The video assigned is not from Youtube, Vimeo or MP4, neither is it an iframe link to a website.  Remember to enter the correct complete video link .\n - Youtube: https://www.youtube.com/watch?v=43ngkc2Ejgw\n - Vimeo: https://vimeo.com/111939668\n - MP4 https://server.com/file.mp4"
        // );
        return false;
      }
      return (

        '<div class="videoWrapperx"><iframe src="' +
        srcVideo +
        '" frameborder="0" class="gh-fit"  style="width:100%;height:400px; border:none;" autoplay=0; allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><hr/>'
      );
    } else {
      alert("No video assigned.");
      return false;
    }
  }

  const sorted_by_position_id = (arr) =>{
     return arr.sort((a, b) => {
       return a.position_id - b.position_id;
     });
  } 


  

  const fetchCourseContent = async () => {
    let BIG_JSON  = await getCourseData(props.match.params.id);
   console.log(BIG_JSON)
   let courseData = BIG_JSON.course_sections;
   let temp =``;
   let tempArr =[];
   let tempArrLessons = []


   if(courseData){

     courseData.forEach( async (section) =>   {
      if(section.section_sub_sections){
         tempArr = section.section_sub_sections;
            // still our parent remain the same to transverse up the object while checkmates changes
            tempArr.forEach(async (subsec,indexer)=> {
              if(!document.getElementById(subsec.id)){
                let muu_counter =subsec.id
              }
              let respLessons = subsec.sub_section_lessons
              respLessons = sorted_by_position_id(respLessons)
              let counter =1;
               respLessons.forEach( (lessons) =>{
                   if(!document.getElementById(lessons.id)){
                      let muu_counter = lessons.id;
 
// onDragStart="dragStart(event)" onDragEnd="dragEnd( event )"
            let rndId =  muu_counter 
            let templateLesson = ` 
                <div id="${rndId}" class="col-md-12"  
                  data-id="${"muu_" + muu_counter}" 
                  data-url="content-${muu_counter}">
                   <h3 style="font-size:13px;background:#eaeaea;
                   color:#000; font-weight: bold;margin-left:10px;
                   border-bottom:2px solid #eaeaea;padding:20px
                   "> ${"Lesson: "+ counter++ + "" + " "+  lessons.name}</h3>
                </div><hr/>`;
                $("#benchwork").append(templateLesson);
            }

            let courseComponents = lessons.lesson_components
            console.log(courseComponents)
            courseComponents = sorted_by_position_id(courseComponents)

                          

  courseComponents.forEach( (component, index) => {
      if(!document.getElementById(component.id)){
        let componentTypeTemplate = ''
        if(component.component_type==1){
          //
          componentTypeTemplate = `<div><h4>${component.name}</h4>
          <hr/>
          <div >
          <p>${component.description || ""}</p>
          ${videoId(component.embedded_url)}

           <p class="">${component.html_text}</p>
          </div></div>`;

        }else {


           componentTypeTemplate = `<div>
           <h4> ${component.name}</h4>

          <hr/>
          <div class="">
          <p>${component.description || ""}</p>
          
           <p >${component.html_text}</p>
          </div>`



          if(component.embedded_url){
            componentTypeTemplate+=`${videoId(component.embedded_url)}`;
          }

          componentTypeTemplate+="</div>"


        }

      let display = index ==0 ? "block" : "block"
      

      let templateLessonSlide = `<div class="module-in-view-port " id="load-module-slide-${component.id}" style="display:${display}" class="col-md-12 card-box" id="slide-content-${component.id}">
            
        <div class="col-md-12 edged">
          ${componentTypeTemplate}
        </div>
          <hr/>
        </div>`
                
          $("#"+ "benchwork" )
          .append( $(templateLessonSlide));

          $("#"+ "sidelayout" )
          .append( $(templateLessonSlide));
         
                     

           }
                           // tempComponent +="</div>"
                         
                           
              })  
           })
        })

              
         }     
      })
   }


   //perform scroll event popup on video currently playing 

   //this is for youtube or mp4 only
     
  }

  useEffect( async () =>{
    await  fetchCourseContent()
  })


  return (
    <Fragment>
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <div class="container-fluid">
<div class="col-md-2 pull-right">
      <button class="toggle-slide-right  btn btn-default">Small Screen Preview</button>
  </div>
      </div>
      <br/><br/><br/><br/>
      
      <div className="container-fluid container-fullscreen">
            <div class="col-md-12" id="benchwork"></div>

            <div class="menu slide-menu-right pull-right">
            <br/><br/><br/>
            <button class="close-menu">Close &rarr;</button>
          
             <div >

            <div id="sidelayout"></div>
            </div>
           </div>

      </div>

        
      <Footer />
    </Fragment>
  );
};

export default AuthoringPreview;
