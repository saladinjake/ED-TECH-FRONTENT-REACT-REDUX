import React, { Fragment, useEffect, useState } from "react";

import $ from "jquery";

import NavBar from "components/Navbar";
import Footer from "../../components/Footer";

import "./new-worksheet.css";
import "./lms-course.css";
import "./modalvideo.css";
import Data from "./data-fake";
import { useQuery } from "hooks/useQuery.js";

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



const WorkBench = (props) => {
  let pageLeftContent = [];

  const [queryVal, setQueryVal] = useState("");
  const query = useQuery();
  let routeQuery = query.get("filter");

  const [querySearchVal, setVal] = useState(query.get("q"));
  const [querySearchMethod, setMethod] = useState(query.get("method"));
  const [courseData,setCourseData] = useState()

  useEffect(() => {
    // if (routeQuery !== null && routeQuery.length > 0) {
    //   setVal(query.get("q"));
    //   setMethod(query.get("inview"));
    //   setQueryVal(routeQuery);
    // }

    // eslint-disable-next-line
  }, [routeQuery]);

  let isLeftDragging = false;
  let isRightDragging = false;

  function ResetColumnSizes() {
    // when page resizes return to default col sizes
    // let page = document.getElementById("pageFrame");
    // page.style.gridTemplateColumns = "2fr 6px 6fr";
  }

  function SetCursor(cursor) {
    let page = document.getElementById("page");
    page.style.cursor = cursor;
  }

  function StartLeftDrag() {
    console.log("mouse down");
    isLeftDragging = true;

    SetCursor("ew-resize");
  }

  function StartRightDrag() {
    console.log("mouse down");
    isRightDragging = true;

    SetCursor("ew-resize");
  }

  function EndDrag() {
    console.log("mouse up");
    isLeftDragging = false;
    isRightDragging = false;

    SetCursor("auto");
  }

  function OnDrag(event) {
    if (isLeftDragging || isRightDragging) {
      console.log("Dragging");
      //console.log(event);

      let page = document.getElementById("page");
      let leftcol = document.getElementById("leftcol");
      // let rightcol = document.getElementById("rightcol");

      let leftColWidth = isLeftDragging ? event.clientX : leftcol.clientWidth;
      // let rightColWidth = isRightDragging ? page.clientWidth - event.clientX : rightcol.clientWidth;

      let dragbarWidth = 6;

      let cols = [
        leftColWidth,
        dragbarWidth,
        page.clientWidth - 2 * dragbarWidth - leftColWidth, //- rightColWidth,
        dragbarWidth,
        // rightColWidth
      ];

      let newColDefn = cols.map((c) => c.toString() + "px").join(" ");

      console.log(newColDefn);
      page.style.gridTemplateColumns = newColDefn;

      event.preventDefault();
    }
  }

  
  useEffect(() => {
    window.addEventListener("resize", ResetColumnSizes);

    $("#user-nav-tabs li").on("click", function (e) {
      var targetLink = $(e.currentTarget.children[0]).attr("href").slice(1);

      var content_map = {
        c1: "#content1",
        c2: "#content2-for-lms",
        c3: "#content3-for-lms",
        c4: "#content4-for-lms",
        c5: "#content5-for-lms",
        c6: "#content6-for-lms",
      };

      $(e.currentTarget).siblings().removeClass("active");

      $.each(content_map, function (hash, elid) {
        if (hash == targetLink) {
          $(elid).show();
          $(e.currentTarget).addClass("active");
        } else {
          $(elid).hide();
        }
      });
    });
  });


  

  const fetchCourseContent = async () => {
    let BIG_JSON  = await getCourseData(props.match.params.id);
   console.log(BIG_JSON)
   let courseData = BIG_JSON.course_sections;
   let temp =``;
   let tempArr =[];
   let tempArrLessons = []

   console.log(courseData)

   // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
   //    setTimeout(removeLoader,10000); //wait for page load PLUS two seconds.

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
              let counter =1;
               respLessons.forEach( (lessons) =>{
                   if(!document.getElementById(lessons.id)){
                      let muu_counter = lessons.id;
 
// onDragStart="dragStart(event)" onDragEnd="dragEnd( event )"
        let rndId =  muu_counter 
        let templateLesson = ` 
            <div id="${rndId}" class="card"  data-id="${
          "muu_" + muu_counter
        }" 
        
                              onclick="handleToggleAccordion(this)"
                              data-url="content-${muu_counter}"
                              
         >
         <h3 style="font-size:13px;background:rgba(8,23,200);
         color:#fff; font-weight: bold;margin-left:10px;
         border-bottom:2px solid #eaeaea;padding:20px
         "> ${"Lesson: "+ counter++ + "" + " "+  lessons.name}</h3>

      </div><hr/>`;

     

                          $("#js-parental").append(templateLesson);
                        }

                         let courseComponents = lessons.lesson_components
                         console.log(courseComponents)

                          

                        courseComponents.forEach( (component, index) => {
                            

                            if(!document.getElementById(component.id)){
                              let componentTypeTemplate = ''
                              if(component.component_type==1){
                                //
                                componentTypeTemplate = `<div><h4>${component.name}</h4>
                                <hr/>
                                <div >
                                <p>${component.description || ""}</p>
                                <iframe class="gh-fit" style="width:100%; border:none;" class="card-box" src="${component.embedded_url}"></iframe>

                                 <p class="card-box">${component.html_text}</p>
                                </div></div>

                                `

                              }else {


                                 componentTypeTemplate = `<div><h4> ${component.name}</h4>

                                <hr/>
                                <div class="card">
                                <p>${component.description || ""}</p>
                                
                                 <p >${component.html_text}</p>
                                </div>`



                                if(component.embedded_url){
                                  componentTypeTemplate+=`<iframe 
                                  class="card-box gh-fit" 
                                  style="width:100%; border:none;"
                                  src="${component.embedded_url}"></iframe>
`
                                }

                                componentTypeTemplate+="</div>"


                              }
                             let tempNavComponent =`<div onhover="hoverIntoNav(this)" 
                             data-name="${component.name}" id="${component.id}" style="
                            
                             font-size:12px;color:#000;height:28px;width:100%"
                              class="content-${component.lesson_id}" onclick="loadIntoView(this)">
                                 <p onhover="" style="color:rgba(8,20,200);">

                        

                                  ${component.name} </p>
                              </div><hr/>`;

      let display = index ==0 ? "block" : "none"
      if(index == 0){

      //initialize tracker counter for next and prev
   $(".next-slide").attr("data-current-id",component.id)
   $(".prev-slide").attr("data-current-id",component.id)

      }

      let templateLessonSlide = `<div class="module-in-view-port" id="load-module-slide-${component.id}" style="display:${display}" class="col-md-12 card-box" id="slide-content-${component.id}">
            
              <div style="min-height:400px;overflow-y:scroll;margin:20px">
                ${componentTypeTemplate}
              </div>
              <hr/>
      </div>`
                             
             $("#"+ component.lesson_id )
              .append( $(tempNavComponent));


               $("#"+ "workbench" )
              .append( $(templateLessonSlide));
               
                           

                            }
                             // tempComponent +="</div>"
                           
                             
                        })  
                     })
                  })

                  
             }     
          })
   }
     

  }

  useEffect( async () =>{
    await  fetchCourseContent()
  })

  function videoId(button) {
    var $videoUrl = button.attr("data-video");
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
          "?autoplay=1&mute=1&loop=1&playlist=" +
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
        return (
          '<video loop playsinline autoplay><source src="' +
          $videoUrl +
          '" type="video/mp4"></video>'
        );
      } else {
        alert(
          "The video assigned is not from Youtube, Vimeo or MP4, remember to enter the correct complete video link .\n - Youtube: https://www.youtube.com/watch?v=43ngkc2Ejgw\n - Vimeo: https://vimeo.com/111939668\n - MP4 https://server.com/file.mp4"
        );
        return false;
      }
      return (
        '<iframe src="' +
        srcVideo +
        '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      );
    } else {
      alert("No video assigned.");
      return false;
    }
  }

  //video actions and other event
  useEffect(() => {
    // $(".lets-play").attr("data-video","")

    $(".lets-play").click(function (e) {
      e.preventDefault();
      var $theVideo = videoId($(this));
      if ($theVideo) {
        $("#video-wrap-preview")
          .html(
            '<span className="video-overlay"></span><div className="video-container">' +
              $theVideo +
              '</div><button className="close-video">x</button>'
          )
          .addClass("active");
      }
    });

    $(document).on("click", ".close-video, .video-overlay", function () {
      $("#video-wrap-preview").empty().removeClass("active");
    });
  });

  function formaturl(youtube) {
    var url = youtube;
    var idVideo = "";
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      var id = match[2];
      idVideo = id;
      console.log(id);
      var path = "https://img.youtube.com/vi/" + id + "/0.jpg";
      console.log(
        path,
        "https://img.youtube.com/vi/" + id + "/1.jpg",
        "http://img.youtube.com/vi/" + id + "/2.jpg"
      );
    }

    return { idVideo, path };
  }

  //retime view play

  useEffect(() => {
    $(document).ready(function () {
      var vid = $("#myvid");

      //default video source
      $(vid).attr("src", $("a.link:first").attr("href"));

      // addClass playing to first video link
      $("a.link:first").addClass("playing");

      $("a.link").on("click", function (event) {
        // prevent link default
        event.preventDefault();

        // change video source
        $(vid).attr("src", $(this).attr("href"));

        // remouve class playing from unplayed video href
        $(".vids a").removeClass("playing");

        // add class playing to video href
        $(this).addClass("playing");

        // add class paused to give the play/pause button the right look
        $(".btnPlay").addClass("paused");

        // play the video
        vid[0].play();

        // adjust prev button state
        if ($("a.link:first").hasClass("playing")) {
          $(".prevvid").addClass("disabled");
        } else {
          $(".prevvid").removeClass("disabled");
        }

        // adjust next button state
        if ($("a.link:last").hasClass("playing")) {
          $(".nextvid").addClass("disabled");
        } else {
          $(".nextvid").removeClass("disabled");
        }
      });

      //VIDEO EVENTS
      //video canplay event
      vid.on("canplay", function () {
        $(".loading").fadeOut(100);
      });

      //video canplaythrough event
      //solve Chrome cache issue
      var completeloaded = false;
      vid.on("canplaythrough", function () {
        completeloaded = true;
      });

      //video ended event
      vid.on("ended", function () {
        $(".btnPlay").removeClass("paused");
        vid[0].pause();
      });

      //video seeking event
      vid.on("seeking", function () {
        //if video fully loaded, ignore loading screen
        if (!completeloaded) {
          $(".loading").fadeIn(200);
        }
      });

      //video seeked event
      vid.on("seeked", function () {});

      //video waiting for more data event
      vid.on("waiting", function () {
        $(".loading").fadeIn(200);
      });

      /*controllers*/
      //before everything get started
      vid.on("loadedmetadata", function () {
        //set video properties
        $(".current").text(timeFormat(0));
        $(".duration").text(timeFormat(vid[0].duration));
        if (vid[0].muted) {
          updateVolume(0, 0);
        } else {
          updateVolume(0, 0.7);
        }
      });

      //display video buffering bar
      var startBuffer = function () {
        var currentBuffer = vid[0].buffered.end(0);
        var maxduration = vid[0].duration;
        var perc = (100 * currentBuffer) / maxduration;
        $(".bufferBar").css("width", perc + "%");

        if (currentBuffer < maxduration) {
          setTimeout(startBuffer, 500);
        }
      };

      //display current video play time
      vid.on("timeupdate", function () {
        var currentPos = vid[0].currentTime;
        var maxduration = vid[0].duration;
        var perc = (100 * currentPos) / maxduration;
        $(".timeBar").css("width", perc + "%");
        $(".current").text(timeFormat(currentPos));
      });

      //CONTROLS EVENTS
      //video screen and play button clicked
      vid.on("click", function () {
        playpause();
      });
      $(".btnPlay").on("click", function () {
        playpause();
      });
      var playpause = function () {
        if (vid[0].paused || vid[0].ended) {
          $(".btnPlay").addClass("paused");
          vid[0].play();
        } else {
          $(".btnPlay").removeClass("paused");
          vid[0].pause();
        }
      };

      //VIDEO PROGRESS BAR
      //when video timebar clicked
      var timeDrag = false; /* check for drag event */
      $(".progress").on("mousedown", function (e) {
        timeDrag = true;
        updatebar(e.pageX);
      });
      $(document).on("mouseup", function (e) {
        if (timeDrag) {
          timeDrag = false;
          updatebar(e.pageX);
        }
      });
      $(document).on("mousemove", function (e) {
        if (timeDrag) {
          updatebar(e.pageX);
        }
      });
      var updatebar = function (x) {
        var progress = $(".progress");

        //calculate drag position
        //and update video currenttime
        //as well as progress bar
        var maxduration = vid[0].duration;
        var position = x - progress.offset().left;
        var percentage = (100 * position) / progress.width();
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }
        $(".timeBar").css("width", percentage + "%");
        vid[0].currentTime = (maxduration * percentage) / 100;
      };
      //sound button clicked
      $(".sound").click(function () {
        vid[0].muted = !vid[0].muted;
        $(this).toggleClass("muted");
        if (vid[0].muted) {
          $(".volumeBar").css("width", 0);
        } else {
          $(".volumeBar").css("width", vid[0].volume * 100 + "%");
        }
      });

      //VOLUME BAR
      //volume bar event
      var volumeDrag = false;
      $(".volume").on("mousedown", function (e) {
        volumeDrag = true;
        vid[0].muted = false;
        $(".sound").removeClass("muted");
        updateVolume(e.pageX);
      });
      $(document).on("mouseup", function (e) {
        if (volumeDrag) {
          volumeDrag = false;
          updateVolume(e.pageX);
        }
      });
      $(document).on("mousemove", function (e) {
        if (volumeDrag) {
          updateVolume(e.pageX);
        }
      });
      var updateVolume = function (x, vol) {
        var volume = $(".volume");
        var percentage;
        //if only volume have specificed
        //then direct update volume
        if (vol) {
          percentage = vol * 100;
        } else {
          var position = x - volume.offset().left;
          percentage = (100 * position) / volume.width();
        }

        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }

        //update volume bar and video volume
        $(".volumeBar").css("width", percentage + "%");
        vid[0].volume = percentage / 100;

        //change sound icon based on volume
        if (vid[0].volume == 0) {
          $(".sound").removeClass("sound2").addClass("muted");
        } else if (vid[0].volume > 0.5) {
          $(".sound").removeClass("muted").addClass("sound2");
        } else {
          $(".sound").removeClass("muted").removeClass("sound2");
        }
      };

      //speed text clicked
      $(".spdx50").on("click", function () {
        fastfowrd(this, 1.5);
      });
      $(".spdx25").on("click", function () {
        fastfowrd(this, 1.25);
      });
      $(".spdx1").on("click", function () {
        fastfowrd(this, 1);
      });
      $(".spdx050").on("click", function () {
        fastfowrd(this, 0.5);
      });
      var fastfowrd = function (obj, spd) {
        $(".speedcnt li").removeClass("selected");
        $(obj).addClass("selected");
        vid[0].playbackRate = spd;
        vid[0].play();
        $("ul.speedcnt").fadeOut("fast");
        $(".btnPlay").addClass("paused");
      };
      $(".btnspeed").click(function () {
        $("ul.speedcnt").slideToggle(100);
      });

      //fullscreen button clicked
      $(".btnFS").on("click", function () {
        if ($.isFunction(vid[0].webkitEnterFullscreen)) {
          vid[0].webkitEnterFullscreen();
        } else if ($.isFunction(vid[0].mozRequestFullScreen)) {
          vid[0].mozRequestFullScreen();
        } else {
          alert("Your browsers doesn't support fullscreen");
        }
      });

      //light bulb button clicked
      $(".btnLight").click(function () {
        $(this).toggleClass("lighton");

        //if lightoff, create an overlay
        if (!$(this).hasClass("lighton")) {
          $("body").append('<div class="overlay"></div>');
          $(".overlay").css({
            position: "absolute",
            width: 100 + "%",
            height: $(document).height(),
            background: "#000",
            opacity: 0.9,
            top: 0,
            left: 0,
            "z-index": 999,
          });
          $(".vidcontainer").css({
            "z-index": 1000,
          });
        }
        //if lighton, remove overlay
        else {
          $(".overlay").remove();
        }
      });

      //hide pause button if video onplaying
      //if (vid.onplaying = true) { $('.btnPlay').addClass('paused'); };

      //previous video button
      $(".prevvid").click(function () {
        $(vid).attr("src", $(".playing").prev().attr("href"));
        vid[0].play();
        $(".playing").prev().addClass("playing");
        $(".playing:last").removeClass("playing");
        $(".btnPlay").addClass("paused");
        $(".nextvid").removeClass("disabled");
        if ($("a.link:first").hasClass("playing")) {
          $(this).addClass("disabled");
        } else {
          $(this).removeClass("disabled");
        }
      });

      //previous video button
      $(".nextvid").click(function () {
        $(vid).attr("src", $(".playing").next().attr("href"));
        vid[0].play();
        $(".playing").next().addClass("playing");
        $(".playing:first").removeClass("playing");
        $(".btnPlay").addClass("paused");
        $(".prevvid").removeClass("disabled");
        if ($("a.link:last").hasClass("playing")) {
          $(this).addClass("disabled");
        } else {
          $(this).removeClass("disabled");
        }
      });

      //Time format converter - 00:00
      var timeFormat = function (seconds) {
        var m =
          Math.floor(seconds / 60) < 10
            ? "0" + Math.floor(seconds / 60)
            : Math.floor(seconds / 60);
        var s =
          Math.floor(seconds - m * 60) < 10
            ? "0" + Math.floor(seconds - m * 60)
            : Math.floor(seconds - m * 60);
        return m + ":" + s;
      };
      $(".closeme , .bigplay").click(function () {
        $("this,.ads,.bigplay").fadeOut(200);
        vid[0].play();
        $(".btnPlay").addClass("paused");
      });
      //end
    });
  });


const handleToggleAccordion = (event) => {
    //Bail if our clicked element doesn't have the class
    if (!event.target.classList.contains("accordion-toggle")) return;

    // Get the target content
    var content = document.querySelector(event.target.hash);
    if (!content) return;

    // Prevent default link behavior
    event.preventDefault();

    // If the content is already expanded, collapse it and quit
    if (content.classList.contains("active")) {
      content.classList.remove("active");
      return;
    }

    // Get all open accordion content, loop through it, and close it
    var accordions = document.querySelectorAll(".accordion-content.active");
    for (var i = 0; i < accordions.length; i++) {
      accordions[i].classList.remove("active");
    }

    // Toggle our content
    content.classList.toggle("active");
  };


  return (
    <Fragment>
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      <div className="container-fluid container-fullscreen">
        <div id="pagehandler">
          <div
            id="page"
            onMouseUp={() => {
              EndDrag();
            }}
            onMouseMove={(event) => {
              OnDrag(event);
            }}
          >
            <div id="header">
              <div className="grid-action-item">
                <div className="grid-action-item-content" id="1">
                  <h6>
                    <span onClick={prevSlide} className="resize prev-slide alignToTitle btn text-dark btn-outline-secondary btn-rounded btn-sm" style={{ marginLeft: "20px" }}>
                      Previous Slide
                    </span>
                    <span 
                     onClick={nextSlide}
                    className="handle next-slide alignToTitle btn text-dark btn-outline-secondary btn-rounded btn-sm" style={{ marginLeft: "20px" }}>
                      Next Slide
                    </span>
                    {/*<span
                      data-video="https://youtu.be/jnLSYfObARA"
                      className="handle lets-play alignToTitle btn text-dark btn-outline-secondary btn-rounded btn-sm"
                      style={{ marginLeft: "20px" }}
                    >
                      Modal View
                    </span>*/}
                    <span onClick={togglerFullscreen}
                      id="toggle_fullscreen"
                       className="handle alignToTitle btn text-dark btn-outline-secondary btn-rounded btn-sm" style={{ marginLeft: "20px" }}>
                      Full Screen View
                    </span>
                    <span className="handle alignToTitle btn text-dark btn-outline-secondary btn-rounded btn-sm" style={{ marginLeft: "20px" }}>
                      Logout
                    </span>
                  </h6>
                </div>
              </div>
            </div>

            <div id="leftcol">
              <div className="card nav-tabs " id="workbench">
                <h6 className="card nav-tabs" id="lesson-name">Lesson Name:</h6>

                {/*

                          <iframe id="myvid"  style={{height:"540px"}} src={ "https://www.youtube.com/embed/" + formaturl(Data[0].module1.course_overview).idVideo}
                             frameborder="0" 
                             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                          </iframe>


                              

                                  


                <div className="container">
                  <div className="vidcontainer">
                    <video id="myvid" style={{ height: "500px" }}>
                      Your browser does not support the video tag.
                    </video>

                    <div className="topControl">
                      <div className="progress">
                        <span className="bufferBar"></span>
                        <span className="timeBar"></span>
                      </div>
                      <div className="time">
                        <span className="current"></span> /
                        <span className="duration"></span>
                      </div>
                    </div>

                    <div className="controllers">
                      <button
                        className="btnPlay"
                        title="Play/Pause video"
                      ></button>
                      <button
                        className="prevvid disabled"
                        title="Previous video"
                      >
                        <i className="fa fa-step-forward fa-rotate-180"></i>
                      </button>
                      <button className="nextvid" title="Next video">
                        <i className="fa fa-step-forward"></i>
                      </button>
                      <button
                        className="sound sound2 btn"
                        title="Mute/Unmute sound"
                      ></button>
                      <div className="volume" title="Set volume">
                        <span className="volumeBar"></span>
                      </div>
                      <button
                        className="btnFS "
                        style={{ float: "right" }}
                        title="full screen"
                      ></button>
                      <button
                        className="btnspeed "
                        style={{ float: "right" }}
                        title="Video speed"
                      >
                        <i className="fa fa-gear"></i>
                      </button>
                      <ul className="speedcnt">
                        <li className="spdx50">1.5</li>
                        <li className="spdx25">1.25</li>
                        <li className="spdx1 selected">Normal</li>
                        <li className="spdx050">0.5</li>
                      </ul>
                      <button
                        className="btnLight lighton "
                        style={{ float: "right" }}
                        title="on/off light"
                      >
                        <i className="fa fa-lightbulb-o"></i>
                      </button>
                    </div>
                    <div className="ads">
                      <span className="closeme fa fa-close"></span>
                      <p>
                        In this course you will learn the bascis of python
                        programming language
                      </p>
                    </div>
                    <div className="bigplay" title="play the video">
                      <i className="fa fa-play-circle-o"></i>
                    </div>
                    <div className="loading">
                      <i className="fa fa-spinner fa-spin"></i>
                    </div>

                  </div>


                        
                </div>

*/}
              </div>
            </div>
            <div
              id="leftdragbar"
              onMouseDown={() => {
                StartLeftDrag();
              }}
            >
              <div id="handle"></div>
            </div>
            <div id="tabs">
              <div className="col-md-12 card">
                <ul className="nav nav-tabs" id="user-nav-tabs">
                  <li role="presentation" className="active col-md-2">
                    <a href="#c1"><i class="fa fa-user"></i></a>
                  </li>
                  <li role="presentation" className="col-md-2">
                    <a href="#c2"><i class="fa fa-edit"></i></a>
                  </li>
                  <li role="presentation" className="col-md-2">
                    <a href="#c3"><i class="fa fa-spinner"></i></a>
                  </li>
                  <li role="presentation" className="col-md-2">
                    <a href="#c4"><i class="fa fa-envelope"></i></a>
                  </li>
                  <li role="presentation" className="col-md-2">
                    <a href="#c5"><i class="fa fa-comment"></i></a>
                  </li>
                  <li role="presentation" className="col-md-2">
                    <a href="#c6"><i class="fa fa-file"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div id="tabpages" className="tab-content">
              <div id="content-for-lms">
                <div id="content1" className="tabpane " style={{minHeight:"300px",overflowY:"scroll"}}>
                  <div>
                    <nav className="vids" id="js-parental" >
                    {/*<a
                        style={{ padding: "20px" }}
                        onClick={handleToggleAccordion}
                        href={"#content-1"}
                        className="accordion-toggle accordion card"
                      >
                        {Data[0].module1.course_name}
                      </a>

                      <div className="accordion-content" id={"content-1"}>
                        {Data[0].module1.sub_module_videos.map((course, i) => {
                          return (
                            <a className="link" href={course.link}>
                              {course.title}
                            </a>
                          );
                        })}
                      </div>*/}


                      
                    </nav>
                  </div>
                </div>
                <div id="content2-for-lms" className="tabpane ">
                  <h3>Content 2</h3>
                </div>
                <div id="content3-for-lms" className="tabpane ">
                  <h3>Content 3</h3>
                </div>

                <div id="content4-for-lms" className="tabpane ">
                  <h3>Content 4</h3>
                </div>

                <div id="content5-for-lms" className="tabpane ">
                  <h3>Content 5</h3>
                </div>
                <div id="content6-for-lms" className="tabpane ">
                  <h3>Content 6</h3>
                </div>
              </div>
            </div>

            <div id="footer">Footer</div>
          </div>
          <br />
        </div>
      </div>

      <div id="video-wrap-preview"></div>
      <Footer />
    </Fragment>
  );
};

export default WorkBench;
