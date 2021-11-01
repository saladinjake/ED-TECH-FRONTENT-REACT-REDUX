import React, { Fragment, useEffect, createRef } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { HeaderBox } from "./activityboxes";
import NavBar from "components/Navbar";
import Footer from "components/Footer";

import { Link } from "react-router-dom";
import { AddHead } from "./sidebar";
import { Styles } from "./styles/main.js";

import ReactQuill, { Mixin, Toolbar, Quill } from "react-quill";
import Dropzone, { ImageFile } from "react-dropzone";
//import PropTypes from "prop-types"
// Complete SortableJS (with all plugins)
import Sortable from "sortablejs/modular/sortable.complete.esm.js"; 
//import Lessons from "./dynamic_content";
/*magicican victor jake dibs*/
import  { getTemplateType } from "./markdown_generator"
import loading_image from "assets/gifs/loading-buffering.gif";
import $ from "jquery";
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';




import { getLanguages } from "services/language";
import axios from "axios"
import swal from "sweetalert"
import TreeBuilder, { findObjectById } from "./TreeBuilder"


import toast from "react-hot-toast";

/*PREVENTION AND FORM SECURITY*/
import { 
  HackerDetected 
} from "./HackerAttemptsOnWeb"

/*Course Arsenals*/
import { 
  createStudentProfile, 
  createAuthorProfile, 
  createGapsGroup,
  createUserProfile,
  createInstitution,
  createLesson,
  createSubsection,
  createSection,
  getInstructorProfile,
  getInstructorProfiles,
  getInstitutions,
  updateCourse,
  createCourse,
  getCourse,
  getInstitutionCourses,
  getCourses,
  createAnyResource,
  getIdFromUrl,
  getSectionsOfCourseId,
  getCourseData,
  //getSectionsOfCourseId,
  getSubSectionsOfSectionId,
  getLessonsOfSubsection,
  getComponentsOfLessons,
  getVideoComponentsOfLessons,
 addSectionData, // dynamic generationwith battries included
 addSubSectionData,
 addLessonData,
 DateFormatter,
 deleteApi, // find delete api
 getComponent,
 getGroups
} from "services/authoring"

import  { enableDragSortPositionUpdater } from "./reorder_positioning" 
import HTMLForm from "./Editor";
let allDefinitiveQuillObj;   


/*the base url link*/
let base_url = "http://gapslmsservices.herokuapp.com"; //process.env.REACT_APP_API_URL2
let html_component_url ="/lms/api/create/html-component/"
let video_component_url = "/lms/api/create/video-component/"
// Change JQueryUI plugin names to fix name collision with Bootstrap.
$.widget.bridge('uitooltip', $.ui.tooltip);
$.widget.bridge('uibutton', $.ui.button);


//import other jquery plugins
//import bridget like this import jqueryBridget from "jquery-bridget"
//hook other plugins to jquery using bridget like this in the future
//jqueryBridget( 'plugin-designated-name', ImportedPlugin, $ );



const collapsibleEffect = () =>{
  
}


const TabbyFy =() => {
  (function() {
      // Super cheap selector engine
      var $ = function(selector, context) {
          return [].slice.call( (context || document).querySelectorAll(selector) )
      }

      $('.responsive-tabs').forEach(function(tabs) {
          // Store active tab
          var active = $('dt', tabs)[0]

          // Click handler
          tabs.addEventListener('click', function(e) {
              if ( e.target.nodeName.toLowerCase() === 'dt' ) {
                  active.classList.remove('active')

                  e.target.classList.add('active')    
                  active = e.target
              }
          })
      })
  }())

}



//Get the button  eg <button  id="myBtn" title="Go to top">Top</button>

function scrollFunction(e) {

  $(document).ready(()=>{

    var mybutton = document.getElementById("myBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }

  })
  
}

// When the user clicks on the button or a submit is made, scroll to the top of the document
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


window.swapProblemDisplayBoard = function(el){
  // ev.preventDefault()
  let parent =  el.getAttribute("data-getitup")
  //alert(parent)
   $('#slideout-questions').toggleClass('on');
   $("#slideout-questions").attr("problem_no_dey_finish", parent)


}




window.switchToEditProblemComponent = function(el){
  $("#problemcomponent_form").css({display:"block"}).fadeOut("slow")
  $(".markdown-editordisplay").css({display:"none"}).fadeIn("slow")
   let form = $("#problemcomponent_form");
   form.attr("method","PATCH")
   
   //SHOW EDIT BUTTON

   //HIDE CREATE BUTTON
   
   //handle save edit
}


window.questionHelperNotification = function(e){
  scrollToTop()
  swal(`Notification`,
     `Click on the Save All Questions to the top right
      to save your question format.
      You can reorder your questions 
      by copying the entire block of tripple quotes
      to the above or below the next 
      line of the previous block of quotes.`);
  $("#saveQuestionActions").css({display:"block"})
   .fadeIn("slow")
}

function addNewQuestenceWahala(e){
  e.preventDefault();
  //get the headers injected to know the target lesson it should be attached
  //the course id also has already been set on page initialization of the edit course triggered
//  alert("save your problems by your self abeg")
    let form = $("#problemcomponent_form");


  let allowedHeaders =  document.getElementById("openModal-about")
  let lessonMount = localStorage.getItem("l_tracker");
  form.find("#problem_lesson").val(lessonMount);
  if(localStorage.getItem("course_edit") && form.find("#problem_course").val()
  !=="" || form.find("#problem_course").val()
  !==null){
    form.find("#problem_course").val(localStorage.getItem("course_edit"))

  
  }
        

  let urlBuild = "/lms/api/create/problem-component/"
  let res = createAnyResource("POST",urlBuild,form) //expertise

  //append it

  //show animated widget added content
   let Target = $(".dynamo_" + lessonMount);
   
   let T = allowedHeaders.getAttribute('data-basestation')
   let markdownTemplate =  allowedHeaders.getAttribute("data-markdown") || "[pb_html]/[pb_discussions]";
   let randId = uuid()
    let Preview = document.querySelector(
                  "#template-container > .pb-widget-preview-panel-generic-form"
    );
    let SClone = Preview.cloneNode(true);
    let wrapWrapper = pbCreateNode("li", [
        { class: "pb-placeholder-main col-md-12" },
                            
    ]);

    wrapWrapper.appendChild(SClone)
    wrapWrapper.setAttribute("id", randId )
                    
    let MainClone = wrapWrapper.cloneNode(true);
    MainClone.id=randId            
    MainClone.querySelector(".fa-edit").setAttribute("data-template", markdownTemplate)
    MainClone.querySelector(".fa-edit").setAttribute("data-id",randId) //=randId //ref the curr main lesson box
            
             //edit view when clicked not saved
    MainClone.querySelector(".fa-edit").addEventListener("click",(evv) =>{
      const title =  $("#"+ MainClone.getAttribute("id")).find(".unit_title_place_holder-generic").html();
      const body = $("#"+ MainClone.getAttribute("id")).find(".unit_content_place_holder-generic").html();
      
      $("#title-unit-b").val(title)
      $("#title-unit2-b").val(body)
      $("#edit-title").html("Editing Html component: "+ title)
      document.getElementById("edit-title").setAttribute("data-parent", MainClone.id)
                      
    }) 


  MainClone.querySelector(".fa-trash").addEventListener("click", (e) => {
       handleWidgetRemove(e.target)
  })

       
  MainClone.querySelector(".unit_title_place_holder-generic").innerHTML =   $("#title-unit").val()  //add validation for unit component
  MainClone.querySelector(".unit_content_place_holder-generic").innerHTML  = $("#title-unit2").val() || "Edit this content"
  Target.append(MainClone);

  if(res){
    console.log(res)
    // if this shows then quily change the random id to the real id of the created response
    swal("Success", "You have added a problem component")
    scrollToTop()

  }
   $("#openModal-about").css({opacity:0}).fadeOut("fast")
  
}



window.videoModalPreview = (el) =>{
   let src = el.dataset.videolink


// Gets the video src from the data-src on each button
let srcVideo =""  
let $videoUrl = src ||  $(el).data("videolink");

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
  }

  
$('#modalFullScreenPreviewIframeAndVideos').css({display:"block"})  
// when the modal is opened autoplay it  
$('#modalFullScreenPreviewIframeAndVideos').on('shown.bs.modal', function (e) {
    
// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
$("#projector-view").attr('src',srcVideo  ); 
})
  


// stop playing the youtube video when I close the modal
$('#modalFullScreenPreviewIframeAndVideos').on('hide.bs.modal', function (e) {
//     // a poor man's stop video
     $("#projector-view").attr('src',srcVideo); 
}) 
    

}

function validYoutubeLink(url) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : url;
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      // var cookie = $.trim(cookies[i]);
      var cookie = cookies[i].toString().replace(/^([\s]*)|([\s]*)$/g, "");
      //var cookie =  cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  if(cookieValue){
   return cookieValue; 
 }else{
   return "csrftoken"
 }
  
}




/**
 *  Read More JS
 *  Truncates text via specfied character length with more/less actions.
 *  Maintains original format of pre truncated text.
 *  usage: ReadMore.init()
 *  @todo   Add destroy method for ajaxed content support.
 *
 */
 const ReadMore = (() => {
   let s;

   return {

     settings() {
       return {
         content: document.querySelectorAll('.js-read-more'),
         originalContentArr: [],
         truncatedContentArr: [],
         moreLink: "Read More",
         lessLink: "Less Link",
       }
     },

     init() {
       s = this.settings();
       this.bindEvents();
     },

     bindEvents() {
       ReadMore.truncateText();
     },

     /**
      * Count Words
      * Helper to handle word count.
      * @param {string} str - Target content string.
      */
     countWords(str) {
       return str.split(/\s+/).length;
     },

     /**
      * Ellpise Content
      * @param {string} str - content string.
      * @param {number} wordsNum - Number of words to show before truncation.
      */
     ellipseContent(str, wordsNum) {
       return str.split(/\s+/).slice(0, wordsNum).join(' ') + '...';
     },

     /**
      * Truncate Text
      * Truncate and ellipses contented content
      * based on specified word count.
      * Calls createLink() and handleClick() methods.
      */
     truncateText() {

       for (let i = 0; i < s.content.length; i++) {
         //console.log(s.content)
         const originalContent = s.content[i].innerHTML;
         const numberOfWords = s.content[i].dataset.rmWords;
         const truncateContent = ReadMore.ellipseContent(originalContent, numberOfWords);
         const originalContentWords = ReadMore.countWords(originalContent);

         s.originalContentArr.push(originalContent);
         s.truncatedContentArr.push(truncateContent);

         if (numberOfWords < originalContentWords) {
           s.content[i].innerHTML = s.truncatedContentArr[i];
           let self = i;
           ReadMore.createLink(self)
         }
       }
       ReadMore.handleClick(s.content);
     },

     /**
      * Create Link
      * Creates and Inserts Read More Link
      * @param {number} index - index reference of looped item
      */
     createLink(index) {
       const linkWrap = document.createElement('span');

       linkWrap.className = 'read-more__link-wrap';

       linkWrap.innerHTML = `<a id="read-more_${index}" class="read-more__link" style="cursor:pointer;">${s.moreLink}</a>`;

       // Inset created link
       s.content[index].parentNode.insertBefore(linkWrap, s.content[index].nextSibling);

     },

     /**
      * Handle Click
      * Toggle Click eve
      */
     handleClick(el) {
       const readMoreLink = document.querySelectorAll('.read-more__link');

       for (let j = 0, l = readMoreLink.length; j < l; j++) {

         readMoreLink[j].addEventListener('click', function() {

           const moreLinkID = this.getAttribute('id');
           let index = moreLinkID.split('_')[1];

           el[index].classList.toggle('is-expanded');

           if (this.dataset.clicked !== 'true') {
              el[index].innerHTML = s.originalContentArr[index];
              this.innerHTML = s.lessLink;
              this.dataset.clicked = true;
           } else {
             el[index].innerHTML = s.truncatedContentArr[index];
             this.innerHTML = s.moreLink;
             this.dataset.clicked = false;
           }
         });
       }
     },

     /**
      * Open All
      * Method to expand all instances on the page.
      */
     openAll() {
       const instances = document.querySelectorAll('.read-more__link');
       const content = document.querySelectorAll('.js-read-more')
         for (let i = 0; i < instances.length; i++) {
           content[i].innerHTML = s.truncatedContentArr[i];
           instances[i].innerHTML = s.moreLink;
         }
       }
     }
 })();



function setCookie(name,val){
  document.cookie[name] = val
}

/*django access will require x-csrf-token to be set on headers*/
const CSRFToken = () => {
    /*get csrf token from the authorization headers which can be found in the cookies section of the browser store*/
    const csrftoken = getCookie("csrftoken")
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};

window.projectorInView = function(){
  //project course data to preview mode
}


const handleWidgetRemove = (widget) => {
    widget.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
};

window.handleWidgetRemove =  (widget) => {
     const type = widget.getAttribute("data-component_type");

     console.log(type)
     const id = widget.getAttribute("data-idx")
     let url = `html-component/${id}`;
     switch(type){
       case "1": //video delete mode
         url = `video-component/${id}`
         break;
       case "2": //html delete mode
       url = `html-component/${id}`
         break;
       case "3": //problem
       url = `problem-component/${id}`
         break;
       case "4": //discussion
       url = `discussion-component/${id}`
         break
     }

  let deletePromises = deleteApi(url);
  deletePromises
    .then(res => res.text())
    .then(data => { 
      console.log(data)
      console.log("success with delete");
      widget.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
  
  })
    .catch(err => {
      console.log(err)
      throw new Error("COULD NOT PERFORM DELETE OPERATION")
    })


  }



window.genericDelete = (e) => {

    // alert(el.dataset.id)
   $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.
  let urlBuild = $(e).attr("data-extint");
  let urlId = $(e).attr("data-idx");
  let urlBuilds = `${urlBuild}/${urlId}`;
  let deletePromises = deleteApi(urlBuilds);
  deletePromises
    .then(res => res.text())
    .then(data => { 
      console.log(data)
      console.log("success with delete");
      $(e).parent().parent().parent().remove();
  })
    .catch(err => {
      console.log(err)
      throw new Error("COULD NOT PERFORM DELETE OPERATION")
    })
}



window.injectToModal =(el) => {
   // alert("working magic"+ $(el).attr("data-idx"))
   if($(el).attr("data-modal") == "myModalEdit"){
      //section and lesson
      $("#title_edit").val($(el).attr("data-name"));
      $("#position_id").val($(el).attr("data-pos"));
    
      $("#title_desc_edit").val($(el).attr("data-description"));

      // inject data id to modal to know which element is in need of saving
      //actually the section id
      $("#myModalEdit").find("button").attr("editing_course_id", $(el).attr("data-idx"));
      $("#myModalEdit").find("button").attr("editing_course_name", $(el).attr("data-name"))
      
      $("#myModalEdit").find("h5").html("Editing "+ $(el).attr("data-name"))
      if(localStorage.getItem("course_edit")){
       $("#myModalEdit").find("#course_val_id").val(localStorage.getItem("course_edit"));
      }
      //alert("made it thru to start edit functionality: "+ $(el).attr("data-idx") )
   }else if($(el).attr("data-modal") == "myModalSubSectionEdit"){
    //subsection

      $("#title_edit_2").val($(el).attr("data-name"));
      $("#position_id2").val($(el).attr("data-pos"));
      
      $("#title_desc_edit2").val($(el).attr("data-description"));

      // inject data id to modal to know which element is in need of saving
      //actually the subsection id
      let btnPayLoad =  $("#myModalSubSectionEdit").find("button");
      btnPayLoad.attr("editing_subsection_id", $(el).attr("data-idx"));
      btnPayLoad.attr("editing_course_name", $(el).attr("data-name"))
      btnPayLoad.attr("editing_parent_id", $(el).attr("data-parent-id"))
      btnPayLoad.attr("root_parent", $(el).attr("data-idx")) // the self triggered parent block

      //observers and recievers technique here:

      localStorage.setItem('given_sid','dynamic_subsection_'+$(el).attr("data-idx"));
      localStorage.setItem('s_tracker',$(el).attr("data-idx")); //purfect!!
      
      $("#myModalSubSectionEdit").find("h5").html("Editing "+ $(el).attr("data-name"))
      if(localStorage.getItem("course_edit")){
        $("#myModalSubSectionEdit").find("#subsection_id").val(localStorage.getItem("course_edit"));
      }

   }else if($(el).attr("data-modal")  =="myModalEditLesson"){
     //the trick: [a] =>passes to [b] => [c] =>gets called => then triggers [d]



      $("#title_edit3").val($(el).attr("data-name"));
      $("#position_id3").val($(el).attr("data-pos"));
      
      $("#title_desc_edit3").val($(el).attr("data-description"));

      // inject data id to modal to know which element is in need of saving
      //actually the subsection id
      let btnPayLoad =  $("#myModalEditLesson").find("button");
      btnPayLoad.attr("editing_lesson_id", $(el).attr("data-idx"));
      btnPayLoad.attr("editing_course_name", $(el).attr("data-name"))
      btnPayLoad.attr("editing_parent_id", $(el).attr("data-parent-id"))
      btnPayLoad.attr("root_parent", $(el).attr("data-idx")) // the self triggered parent block


      //observers and recievers technique here:
      $("#myModalEditLesson").find("h5").html("Editing "+ $(el).attr("data-name"))
     
   }
}


let counter = 1;

const addSectionContent = () => {
  let  form  = $("form#addSectionForm"); //here is the modal form to add section
  let url = "/lms/api/create/section/"
  let sectionRes = createAnyResource('POST',url,form);
  // if resource exists quickly add the new data here
  //console.log(sectionRes)
  // code deception
  try{
     if(sectionRes && sectionRes?.id){

     }else{
       //error
     }
  }catch(e){

  }
};

const addSubSectionContent = (el) => {
  let insertionId =  document.getElementById("section_mount_id");
  insertionId.value =localStorage.getItem('tracker');
  //get the form data
  let  form  = $("form#addSubSectionForm"); //here is the modal form to add section
  let url = "/lms/api/create/subsection/"
  let sectionRes = createAnyResource('POST',url,form)

  // if resource exists quickly add the new data here
  //console.log(sectionRes)
  // code deception

  try{
     if(sectionRes && sectionRes?.id){

     }else{
       //error
     }
  }catch(e){

  }
};

let lesson_counter = 1;

window.addlessonSection = (e) => {
  localStorage.setItem("lesson_component", e.dataset.id);
  // save the component data 
}
const createLessonSection = (el) => {
  // get the subsection id of the creating lesson box
   let insertionId = localStorage.getItem('s_tracker');
   let sub_section_id = document.getElementById("section_id_3")
   sub_section_id.value = insertionId

  // then get the form data
  let  form  = $("form#addLessonSectionForm"); //here is the modal form to add section
  let url = "/lms/api/create/lesson/"
  let lessonRes = createAnyResource('POST',url,form) 
  //save to db
}


const createLessonComponent = async (url, form) => {

  //alert(localStorage.getItem("l_tracker"))
  form.find("#lesson-editor-id").val(localStorage.getItem("l_tracker"))
form.find("#lesson-editor-id2").val(localStorage.getItem("l_tracker"))

  let lessonRes =await  createAnyResource('POST',url,form);
  //save to db
  console.log(lessonRes)

  //if response exists then update lesson components attributes
  return lessonRes;
}





function formatYouTubeUrl(youtube) {
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



const uuid = () => {
  var now = new Date();

  var timestamp = now.getFullYear().toString();
  timestamp += (now.getMonth < 9 ? "0" : "") + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
  timestamp += (now.getDate < 10 ? "0" : "") + now.getDate().toString(); // pad with a 0

  return timestamp;
};



  function formatVimeoUrl(youtube) {
    var url = youtube;
    var idVideo = "";
    var regExp = /^.*(vimeo)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match) {
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

const pbCreateNode = (type, props, html) => {
    let element = document.createElement(type);
    props &&
      props.forEach((prop) => {
        let key = Object.keys(prop)[0];
        let value = prop[key];
        element.setAttribute(key, value);
      });
    html && (element.innerHTML = html);
    return element;
  };

window.showComponentModal = (e) => {
  document.getElementById('myModalLessonGroup').style.display="block";
  //use jitter function to detect which component was chosen then inject into the modal
  //the respective component id or use shortcuts
  $(".pb-widget").each(function(){
     const chosen = $(this);
     chosen.click((e) =>{
       console.log("remember to work on showComponentModal Fuction: i dont even know why i did it")
         ///alert("you selected this:"+ e.target.innerHTML)
     })
  })
}

window.showSetSubsection = function(el) {
  if ($(el).hasClass("opened")) {
    $(el).removeClass("opened")
    $(el).addClass("close-this-guy")
    $("." + el.dataset.id).find("ul.fold").fadeOut("slow")
  } else {
     $(el).removeClass("close-this-guy")
    $(el).addClass("opened")
    $("." + el.dataset.id).find("ul.fold").fadeIn("slow")
  }
};

/*this is required for discussion components to be smart*/
window.setTargetLessonComponent = (id) =>{
  localStorage.setItem("l_tracker",id);
  localStorage.setItem("parental", id)

  //setTimeout(() =>{
      $("#lesson-editor-id").val(localStorage.getItem("l_tracker"))
  //},2000)

}

//todo : go back to problem component and fix the out put save and edit 

/*hide this function somewhere else and
 bleed its higher ordered call
 */
 const bleedOutInjectedData = (bleedingId= "myModalDiscussionForm-CREATESELECT") => {
   let allowedHeaders =  document.getElementById(bleedingId)
   //alert(allowedHeaders.getAttribute('data-basestation'),localStorage.getItem("l_tracker"), allowedHeaders.getAttribute("data-url"))
   return {
    'parent_lesson': localStorage.getItem("l_tracker"),
    "data_basestation": allowedHeaders.getAttribute('data-basestation'),
     "api_endpoints":   allowedHeaders.getAttribute("data-url"),
  
   }
 }
const jitter = (bleedOutFunc) =>{
  return function bleed(...args) {
    if (args.length >= bleedOutFunc.length) {
      return bleedOutFunc.apply(this, args);
    } else {
      return (...args2) => {
        return bleed.apply(this, args.concat(args2));
      }
    }
  };
}
const addDiscussComponent =  () =>{
  // to do on edit call the real id of the component api
  let bleedId = "myModalDiscussionForm-CREATESELECT"
  let form = $("#"+ bleedId);


   /*how did i get hold of the lesson id from an unidentified triggered source*/
   /*Answer: code magic jitter !!*/
   /*Make code logic deciphered to be unnable to get the grapse even when the user is looking at the code*/
   /*haha !!!*/  
  let jitterBleeds = jitter(bleedOutInjectedData)
   console.log(jitterBleeds(bleedId))
   jitterBleeds = jitterBleeds(bleedId)
    let pparent =  jitterBleeds.parent_lesson;
   $("#parent-lessons-name").val(pparent)

   // do the html markup magic thing

    let key ="discuss-note";
       
      var myEditorContent = $('div[data-placeholder="'+key+'"]').html() // the editor itself
   $("#description_discuss").val(myEditorContent) 
  
  console.log("the target lesson id: "+  "put it here that was injected on add triggered")
  if($("input#parent-lessons-name").val()!==""){
    //create the discuss group 
    //form reset with all inputs
    form = $("#"+ bleedId)
    let urlBuild = "/lms/api/create/discussion-component/"
    let res = createAnyResource("POST",urlBuild,form)  
  //show animated widget added content
   let Target = $(".dynamo_" + localStorage.getItem("l_tracker"));
   let allowedHeaders =  document.getElementById(bleedId)
   let T = allowedHeaders.getAttribute('data-basestation')
   let markdownTemplate =  allowedHeaders.getAttribute("data-markdown") || "[pb_html]/[pb_discussions]";
   let url =  allowedHeaders.getAttribute("data-url")
   let randId = uuid()
    let Preview = document.querySelector(
                  "#template-container > .pb-widget-preview-panel-generic-form"
    );
    let SClone = Preview.cloneNode(true);
    let wrapWrapper = pbCreateNode("li", [
        { class: "pb-placeholder-main col-md-12" },
                            
    ]);

    wrapWrapper.appendChild(SClone)
    wrapWrapper.setAttribute("id", randId )
                    
    let MainClone = wrapWrapper.cloneNode(true);
    MainClone.id=randId            
    MainClone.querySelector(".fa-edit").setAttribute("data-template", markdownTemplate)
    MainClone.querySelector(".fa-edit").setAttribute("data-id",randId) //=randId //ref the curr main lesson box
            
             //edit view when clicked not saved
    MainClone.querySelector(".fa-edit").addEventListener("click",(evv) =>{
      const title =  $("#"+ MainClone.getAttribute("id")).find(".unit_title_place_holder-generic").html();
      const body = $("#"+ MainClone.getAttribute("id")).find(".unit_content_place_holder-generic").html();
      
      $("#title-unit-b").val(title)
      $("#title-unit2-b").val(body)
      $("#edit-title").html("Editing Html component: "+ title)
      document.getElementById("edit-title").setAttribute("data-parent", MainClone.id)
                      
    }) 


  MainClone.querySelector(".fa-trash").addEventListener("click", (e) => {
       handleWidgetRemove(e.target)
  })

       
  MainClone.querySelector(".unit_title_place_holder-generic").innerHTML =   $("#title-unit").val()  //add validation for unit component
  MainClone.querySelector(".unit_content_place_holder-generic").innerHTML  = $("#title-unit2").val() || "Edit this content"
  Target.append(MainClone);

  if(res){
    console.log(res)
    // if this shows then quily change the random id to the real id of the created response
  }
  
    
  }else{
    swal("Error", "API ACCESSED WRONGLY!!", "Try another hacking move")
  }
}







const editDiscussComponent = async () =>{


}



window.LaunchEditBoxEvent = async (el) => {
  //SMART TYPE DETECTOR

  

  const type = el.getAttribute("data-component_type");
  let formId = el.getAttribute("data-form") //myModalGenericForm-SELECT
  let form = $("#"+el.getAttribute("data-form")) //will be reset back to post after update
  let urlBuild = "/lms/api/update"+  el.getAttribute("data-action-figure"); 
  form.attr("method","PATCH")
  form  = form;
  let myEditor = null


  let componentDetail = await getComponent(el.getAttribute("data-idx"),type)


  if(form && type=="4"){
      let keys ="discuss-note2"
      myEditor = $('div[data-placeholder="'+keys+'"]')
      alert(componentDetail.lesson)
     // name_discuss
  //                     parent-lessons-name
  //                     editor-html-type
  //                     description_discuss
   $("#editor-html-name").val( componentDetail.name ||el.getAttribute("data-name"))
   $("#editor-html-name2").val( componentDetail.name ||el.getAttribute("data-name"))
   $("#editor-html-name3").val( componentDetail.name ||el.getAttribute("data-name"))
    
    $("#name_discuss2").val( componentDetail.name ||el.getAttribute("data-name"))
     form.find("#component_id").val( componentDetail.id || el.getAttribute("data-idx")) //component id
     $("#parent-lessons-name2").val(componentDetail.lesson || el.getAttribute("data-parent")) //lesson id
    myEditor.html(componentDetail.description || el.getAttribute("data-description")) //lesson id
     form.find("#editor-html-type").val(el.getAttribute("data-component_type"))
     form.find("#editor-html-content-type").val( componentDetail.component_type || el.getAttribute("data-content_type"))
      

    
  }else if(form && type=="3"){

    //transition in the form for problems




    $("#editor-html-name").val( el.getAttribute("data-name"))

     $("#editor-html-name").val( componentDetail.name ||el.getAttribute("data-name"))
   $("#editor-html-name2").val( componentDetail.name ||el.getAttribute("data-name"))
   $("#editor-html-name3").val( componentDetail.name ||el.getAttribute("data-name"))
   
  //   form.find("#editor-html-name").val(el.getAttribute("data-name")||  componentDetail.name )
     form.find("#component_id").val( componentDetail.id || el.getAttribute("data-idx")) //component id
     form.find("#lesson-editor-id").val(componentDetail.lesson || el.getAttribute("data-parent")) //lesson id
   
     form.find("#editor-html-description").val( componentDetail.description  || el.getAttribute("data-description"))
     form.find("#editor-html-type").val(el.getAttribute("data-component_type"))
     form.find("#editor-html-content-type").val( componentDetail.component_type || el.getAttribute("data-content_type"))
     //form.find("div[placeholder='html_text']").html(componentDetail.html_text || el.getAttribute("data-html_text"))
     //document.querySelector("div[placeholder='attributeValue']")
     //form.find("#html_text").html(  componentDetail.html_text || el.getAttribute("data-html_text"))
  
      let key = "html_text"
      let html = "An empty content";
      $("#title-unit-edited").val($("#embedded_url_"+componentDetail.id).html() ) //lesson id
   
   
     
      key = "html_text"
       html = $("#readmore_"+componentDetail.id).html() || "Place your content for editing with rich text editor";
     
     //alert(form.attr("id"))
      $("#title-unit2").val($("#embedded_url_"+componentDetail.id).html() ) //lesson id
   
      myEditor = $('div[data-placeholder="'+key+'"]') // the editor itself
          //myEditor = myEditor.children[0];
      myEditor.html(html);
    //lets get and fill the edit form and change title OF THE FORM TO EDITING LESSON NAME
    $("#myModalMarkdownEditor").find("h5").html("Editing Component: "+ componentDetail.name)
    


     $("#editor-html-name").val( componentDetail.name ||el.getAttribute("data-name"))
     form.find("#editor-html-name").val( componentDetail.name ||el.getAttribute("data-name"))
    


  }else if(form){
    
     $("#editor-html-name").val( el.getAttribute("data-name"))

     $("#editor-html-name").val( componentDetail.name ||el.getAttribute("data-name"))
   $("#editor-html-name2").val( componentDetail.name ||el.getAttribute("data-name"))
   $("#editor-html-name3").val( componentDetail.name ||el.getAttribute("data-name"))
   
  //   form.find("#editor-html-name").val(el.getAttribute("data-name")||  componentDetail.name )
     form.find("#component_id").val( componentDetail.id || el.getAttribute("data-idx")) //component id
     form.find("#lesson-editor-id").val(componentDetail.lesson || el.getAttribute("data-parent")) //lesson id
   
     form.find("#editor-html-description").val( componentDetail.description  || el.getAttribute("data-description"))
     form.find("#editor-html-type").val(el.getAttribute("data-component_type"))
     form.find("#editor-html-content-type").val( componentDetail.component_type || el.getAttribute("data-content_type"))
     //form.find("div[placeholder='html_text']").html(componentDetail.html_text || el.getAttribute("data-html_text"))
     //document.querySelector("div[placeholder='attributeValue']")
     //form.find("#html_text").html(  componentDetail.html_text || el.getAttribute("data-html_text"))
  
      let key = "html_text"
      let html = "An empty content";
      $("#title-unit-edited").val($("#embedded_url_"+componentDetail.id).html() ) //lesson id
   
   
     if(key=="myModalGenericForm-SELECT"){
       key = "description"
       html = componentDetail.description
        
       
     }else{
      key = "html_text"
       html = $("#readmore_"+componentDetail.id).html() || "Place your content for editing with rich text editor";
     
     }
     //alert(form.attr("id"))
      $("#title-unit2").val($("#embedded_url_"+componentDetail.id).html() ) //lesson id
   
      myEditor = $('div[data-placeholder="'+key+'"]') // the editor itself
          //myEditor = myEditor.children[0];
      myEditor.html(html);
    //lets get and fill the edit form and change title OF THE FORM TO EDITING LESSON NAME
    $("#myModalMarkdownEditor").find("h5").html("Editing Component: "+ componentDetail.name)
    


     $("#editor-html-name").val( componentDetail.name ||el.getAttribute("data-name"))
     form.find("#editor-html-name").val( componentDetail.name ||el.getAttribute("data-name"))
    

    
  }else{
    swal("Error", "API ACCESSED WRONGLY!!","ERROR")
  }



  // now handle when the button to save is clicked if its generic
    //generic refers to video or iframe
    $("#save_new_insertion_component_generic-edit").click(async (e)=>{
      e.preventDefault()
      console.log("click event happened on view")
      let new_val = $("#editor-html-name3").val( )
      $("#editor-html-name3").val(new_val )


      //make the patch request to the api to save editing...
      //switch the undisplayed html form text for html_* so data can be saved to it
      form.find("#video-descr").val(myEditor.html())
      //make the patch request to the api to save editing... when all is green
      let res =await  createAnyResource("patch",urlBuild, form)
      console.log(res)


      scrollToTop()
    })

    //handle save editing for just html text editor

    $("#save_new_insertion_component_htmleditor").css({display:"block"}) //show edit button
    $("#save_new_insertion_component").css({display:"none"}) // hide creat button

    $("#save_new_insertion_component_htmleditor").click(async (e)=>{
      e.preventDefault()
      //switch the undisplayed html form text for html_* so data can be saved to it
      form.find("#description").val(myEditor.html())
      //make the patch request to the api to save editing... when all is green
      let res = await createAnyResource("patch",urlBuild, form)
      console.log(res)
      scrollToTop()
    });


       //handle save for discussion component

    $("#discuss-edit").click(async (e) =>{
      e.preventDefault()
       let keys ="discuss-note2"
      let myEditor = $('div[data-placeholder="'+keys+'"]')

      //switch the undisplayed html form text for html_* so data can be saved to it
      form.find("#description_discuss").val(myEditor.html())
      //make the patch request to the api to save editing... when all is green
      let res = await createAnyResource("patch",urlBuild, form)
      console.log(res)
      scrollToTop()
      // let formResetWithProgrammableInputs = $("#myModalDiscussionForm-EDITSELECT");
      // if(form.find("#parent-lessons").val()!==""){
      //   //create the discuss group 
      //   form = formResetWithProgrammableInputs
      //   let res = createAnyResource("PATCH",urlBuild,form)
      // }else{
      //   swal("Error", "API ACCESSED WRONGLY!!", "Try another hacking move")
      // }
    })






    //handle save for problem component: 
    // this is alot of work here : no wonders its called problem component
    

}

const LaunchEditBoxEvent = async (el) =>{
    //SMART TYPE DETECTOR

  //for lesson component of text, video and iframes only
  // $(".close").click((e)=>{
  //   e.preventDefault()
  //   $("#openModal-about").css({opacity:0}).fadeOut("fast")
  // })

  const type = el.getAttribute("data-component_type");
  let form = $("#"+el.getAttribute("data-form")) //will be reset back to post after update
  let urlBuild = "/lms/api"+  el.getAttribute("data-action-figure"); 
  form.attr("method","PUT")
  form  = form;

  
  let componentDetail = await getComponent(el.getAttribute("data-idx"),type)
  
  
  // form.attr("action", el.getAttribute("data-action-figure")) // this is not monolithic app

  //console.log( urlBuild)
  if(form){
    $("#editor-html-name").val(componentDetail.name)
     form.find("#editor-html-name").val( componentDetail.name ||el.getAttribute("data-name"))
     form.find("#component_id").val( componentDetail.id || el.getAttribute("data-idx")) //component id
     form.find("#lesson-editor-id").val(componentDetail.lesson || el.getAttribute("data-parent")) //lesson id
   
     form.find("#editor-html-description").val( componentDetail.description  || el.getAttribute("data-description"))
     form.find("#editor-html-type").val(el.getAttribute("data-component_type"))
     form.find("#editor-html-content-type").val( componentDetail.component_type || el.getAttribute("data-content_type"))
     form.find("div[placeholder=html_text]").html(componentDetail.html_text || el.getAttribute("data-html_text"))
     //document.querySelector("div[placeholder='attributeValue']")
     //form.find("#html_text").html(  componentDetail.html_text || el.getAttribute("data-html_text"))
  
    //lets get and fill the edit form and change title OF THE FORM TO EDITING LESSON NAME
    $("#myModalMarkdownEditor").find("h5").html("Editing Component: "+ componentDetail.name)
    


    // now handle when the button to save is clicked if its generic
    //generic refers to video or iframe
    $("#save_edit_insertion_component_generic").click((e)=>{
      e.preventDefault()
      console.log("click event happened")

      //make the patch request to the api to save editing...
    })

    //handle save editing for just html text editor

    $("#save_new_insertion_component_htmleditor").css({display:"block"}) //show edit button
    $("#save_new_insertion_component").css({display:"none"}) // hide creat button

    $("#save_new_insertion_component_htmleditor").click((e)=>{
      e.preventDefault()
      console.log("click event happened")

      //make the patch request to the api to save editing... when all is green
      let res = createAnyResource("put",urlBuild, form)
      console.log(res)
    })



    
  }else{
    swal("Error", "API ACCESSED WRONGLY!!","ERROR")
  }
  }

window.LaunchPreviewBoxEvent =(Target,MainClone,TemplateType) =>{
    /*just previews the content in the modal section view*/
    
          
}
function removeLoader(){
  $( "#loadingDiv" ).fadeOut(500, function() {
          // fadeOut complete. Remove the loading div
      $( "#loadingDiv" ).remove(); //makes page more lightweight 
  }); 




  //init accordion
  // 
}



function initAccordion(){
  $(function() {
    var Accordion = function(el, multiple)     {
        this.el = el || {};
        this.multiple = multiple || false;

        var links = this.el.find('h4');
        links.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown)
    }

    Accordion.prototype.dropdown =     function(e) {
        var $el = e.data.el,
        $this = $(this), 
        $next = $this.next();

        $next.slideToggle();

        var $parentElement = $this.parent().parent().parent();
       
         // for sections
        if( $parentElement.find("li.sections")){
         
           let rootSection = $parentElement.find("li.sections")
           if(rootSection.hasClass("open") && rootSection.hasClass("sections")){

               //$parentElement.removeClass('open');
               rootSection.removeClass("open")
             //  rootSection.find(".subsections.accordion-content").css({display:"none"}).fadeOut("slow")
              
           }else if(!rootSection.hasClass("open")){
              rootSection.addClass("open")

             
              rootSection.find(".subsections.accordion-content").css({display:"block"}).fadeIn("slow")
              //$parentElement.addClass("open")
           } 

          

     }
                  
          
         if($parentElement.find("ul.subsections")){
            
           let rootSection = $parentElement.find("ul.subsections")
           if(rootSection.hasClass("open") && rootSection.hasClass("subsections")){

               //$parentElement.removeClass('open');
               rootSection.removeClass("open")
           }else if(!rootSection.hasClass("open")){
              rootSection.addClass("open")
              //$parentElement.addClass("open")
           } 

        }




        //lessons

        if($parentElement.find("ul.lessons")){
            
           let rootSection = $parentElement.find("ul.lessons")
           if(rootSection.hasClass("open") && rootSection.hasClass("lessons")){

               //$parentElement.removeClass('open');
               rootSection.removeClass("open")
               //hide all its component
               rootSection.find(".components.accordion-content").css({display:"none"})

           }else if(!rootSection.hasClass("open")){
              rootSection.addClass("open")
              //display all its components
              //$parentElement.addClass("open")
              rootSection.find(".components.accordion-content").css({display:"block"})

           } 

        }

        // if (!e.data.multiple) {
        //     $el.find('ul').not($next).slideDown().parent().addClass('open');
        // };
    }
    var accordion = new Accordion($('#js-parent'), false);
});
}




/*custom drag drop event handling for lessons and components to their respective subsections*/


window.handleLessonDraggingEntered = function(ev, el) {
  // // alert("you are dragging the id: "+ ev.target.getAttribute('id'))
  // ev.dataTransfer.effectAllowed = 'move';
  // ev.dataTransfer.setData( 'text', $(el).attr("data-template") );
  // console.log("dragging id:"+  $(el).attr("data-id") + "  template clone :" + $(el).attr("data-template"))
  // // ev.target.classList.add( "draggable--active" );
  // localStorage.setItem("sendZone",$(el).attr("data-template"))
}

// these functions prevents default behavior of browser
window.dragEnterIntoSection = (ev) => {
  // console.log("entering drop-zone:" + ev.target.id)
  // window.event.preventDefault();
  // return true;
}
window.dragOverSection = (ev) => {
  // window.event.preventDefault();
  // ev.dataTransfer.effectAllowed = 'move';
  // ev.target.closest( ".drop-zone-section" ).classList.add( "drop-zone--active" );
}

window.dragLeaveLessonIntoSubsection = ( event ) => {
  // console.log( "DRAG LEAVE" );
  // event.target.classList.remove( "drop-zone--active" );
}


// function defined for when drop element on target
window.dragDropLessonComponentToSubSection = ( event ) => {
  // // console.log( 'DROP' );
  // console.log(event.dataTransfer.getData( 'text' ), localStorage.getItem("ls_tracker"))
  // console.log(document.getElementById( "dynamic_subsection_" + localStorage.getItem("s_tracker") + "_lesson_component"  ) )

  // $(event.target).closest( ".drop-zone-section" )

  // console.log($( "#" + localStorage.getItem("sendZone") ).html())
  //    .append( $( "#" + localStorage.getItem("sendZone") ).html()  )


  //  if( document.getElementsByClassName( "draggable--active" )){
  //   // document.getElementsByClassName( "draggable--active" )[0].classList.remove( "draggable--active" );
  //  }
  
  // if ( document.getElementsByClassName( "drop-zone--active" )[0] ) {
  //   document.getElementsByClassName( "drop-zone--active" )[0].classList.remove("drop-zone--active" );
  // }

  // event.preventDefault();
  // event.stopPropagation()

}


window.dragEndedSoon = ( event ) => {
  // // event.preventDefault();
  // console.log( 'DRAG END' );
  // document.getElementsByClassName( "console" )[0].innerHTML = "<h4>CONSOLE: DRAG END</h4>";
  // timeDelay();
  // // remove applied active classes, regardless of where released.
  // if ( document.getElementsByClassName( "draggable--active" )[0] ) {
  //   document.getElementsByClassName( "draggable--active" )[0].classList.remove( "draggable--active" );
  // }
  // if ( document.getElementsByClassName( "dropzone--active" )[0] ) {
  //   document.getElementsByClassName( "dropzone--active" )[0].classList.remove( "dropzone--active" );
  // }
}

// UTILITY FUNCTIONS
function timeDelay() {
  let timeoutID = window.setTimeout(clearConsole, 2000);
}

function clearConsole() {
  document.getElementsByClassName( "console" )[0].innerHTML = "<h4>CONSOLE:</h4>";
}



       



const  handleSaveComponentTextEditor = async (e) => {
    let randId = uuid()
     let Target = $(".dynamo_" + localStorage.getItem("l_tracker")); //localStorage.getItem('ls_tracker');
    
    let allowedHeaders =  document.getElementById("myModalMarkdownEditor")
    let T = allowedHeaders.getAttribute('data-basestation')
    let markdownTemplate =  allowedHeaders.getAttribute("data-markdown")
    let _title =  allowedHeaders.getAttribute("data-title")
    let url = allowedHeaders.getAttribute("data-url")
    let Preview = document.querySelector(
      "#template-container > .pb-widget-preview-panel"
    );

    
    let SClone = Preview.cloneNode(true)      
        
    let wrapWrapper = pbCreateNode("li", [
      { class: "pb-placeholder-main col-md-12" },
                     // { onclick:  () => { "openModal(this)" }
    ]);

  // wrapWrapper.appendChild(SClone)
  // wrapWrapper.setAttribute("id", randId )
  // let MainClone = wrapWrapper.cloneNode(true);
  // MainClone.id =randId


  //the form should keep track of the clone id when user dont reload page
  let form = $("#myModalMarkdownEditor-SELECT")
  form.attr("temp_id", randId)
  form.attr("data-id", randId)
  form.attr("data-idx", randId)
  form.attr("data-parent-id", localStorage.getItem("l_tracker"))
  form.attr("data-content_type",form.find("#editor-html-content-type").val())
  form.attr("data-component_type",form.find("#editor-html-type").val())
  form.attr("data-name",form.find("#editor-html-name").val())
  form.attr("data-pos","1.0")
  form.attr("data-description",form.find("#editor-html-description").val())
  $("#lesson-editor-id5").val(localStorage.getItem("l_tracker"))

  //this was good back in the older days but i got bigger and smarter
 //fall back attributes if it fails upon saving new data
//   MainClone.querySelector(".fa-edit").setAttribute("data-id", randId)
//   MainClone.querySelector(".fa-edit").setAttribute("data-parent-id", localStorage.getItem("l_tracker"))
//   MainClone.querySelector(".fa-edit").setAttribute("data-content_type",$("#myModalMarkdownEditor-SELECT").find("#editor-html-content-type").val())
//   MainClone.querySelector(".fa-edit").setAttribute("data-component_type",$("#myModalMarkdownEditor-SELECT").find("#editor-html-type").val())
//   MainClone.querySelector(".fa-edit").setAttribute("data-name",$("#myModalMarkdownEditor-SELECT").find("#editor-html-name").val())
//   MainClone.querySelector(".fa-edit").setAttribute("data-pos","1.0")
//   MainClone.querySelector(".fa-edit").setAttribute("data-description",$("#myModalMarkdownEditor-SELECT").find("#editor-html-description").val())
//   //fall back attributes if it fails upon saving new data
//   MainClone.setAttribute("data-id", randId)
//   MainClone.querySelector(".fa-edit").setAttribute("data-template",markdownTemplate)
//   MainClone.querySelector(".fa-edit").setAttribute("data-id",randId) //ref the curr main lesson box
//   MainClone.querySelector(".fa-edit").addEventListener("click",(es) =>{
    //   document.getElementById(MainClone.id).setAttribute("data-parent",MainClone.id)
    //     localStorage.setItem("edit_component", randId )
    //     form.attr("method","patch")

    // })

//   // document.getElementById("myModalMarkdownEditorEditMode").querySelector(".visuell-view2")
// $("#myModalMarkdownEditor-SELECT").find("#input-area4").val(
//   localStorage.getItem("html_text_content")
// )


//   MainClone.querySelector(".fa-trash").addEventListener("click", (e) => {
//        handleWidgetRemove(e.target)
//   })
//     MainClone.querySelector(".unit_title_place_holder").innerHTML= $("#editor-html-name").val()  /// _title   //no title initially for this comonent
//     MainClone.querySelector(".unit_content_place_holder").innerHTML = localStorage.getItem("html_text_content")  //getTemplateType(markdownTemplate)        //$("#input-area").val()      //getTemplateType(markdownTemplate)           //$(".visuell-view").html() || "Edit this content"
//     const markupBoard = document.getElementById("markup-template-content")

   $("#lesson-editor-id").val(localStorage.getItem("l_tracker"))
   form.find("#lesson-editor-id5").val(localStorage.getItem("l_tracker"))


   let component =await  createLessonComponent(url,form) //save the component with feedback response
   console.log(component)
   //response is just the id
  //  MainClone.querySelector(".fa-edit").setAttribute("data-id", component.id)
  form.attr("temp_id", component.id)
  form.attr("data-id",  component.id)
  form.attr("data-idx",  component.id)



   
   // localStorage.setItem("html_text_content", "")
   //  markupBoard.innerHTML =markdownTemplate
   //  $(".visuell-view").html(getTemplateType(markdownTemplate))
   //  



   let playVideoEnabled = " ";
  let launchPad ="#myModalMarkdownEditor"
  let formType = ""
  let actionBuilder = `/html-component/${component.id}/`
  let Info = "IFRAME/VIDEO EDITABLE COMPONENT"
  let readmoreInitialized = "none";
  let enableLink ="none";
  let textualData = "";
  let questionTeplateButton = false

  if(component.component_type ==1){
    launchPad ="#myModalGenericFormEditorEditMode"
    formType = "myModalGenericForm-SELECT"
    actionBuilder = `/video-component/${component.id}/`
  }else if(component.component_type ==2) {
    launchPad ="#myModalMarkdownEditor"
    Info = "HTML TEXT EDITABLE COMPONENT"
    formType="myModalMarkdownEditor-SELECT"
    actionBuilder = `/html-component/${component.id}/`
  }else if(component.component_type ==3){
    launchPad ="#openModal-about"
    Info = "HTML PROBLEM COMPONENT"
    formType = "myModalProblemForm-SELECT"
    actionBuilder = `/problem-component/${component.id}/`
    
    questionTeplateButton =`<a role="button"
    data-toggle="modal" 
    style="cursor:pointer" data-self="${component.id}" 
    data-append="${component.lesson}" 
    data-getitup="${component.id}" 
  onclick="window.event.preventDefault();swapProblemDisplayBoard(this)"  
     href="" class="pull-right">
       <i style="color:#000" data-self="${component.id}"  
       data-getitup="${component.id}" 
       class="fa fa-plus fa-2x">Add a question </i></a>`
  

  }else if(component.component_type ==4){
    //not implemented the ui for this
    launchPad ="#openModal-about2"
    Info = "HTML DISCUSSION COMPONENT"
    formType = "myModalDiscussionForm-SELECT"
    actionBuilder = `/discussion-component/${component.id}/`
    


  }

  if(component.embedded_url){
    playVideoEnabled = `<a role="button"
data-toggle="modal" href="#modalFullScreenPreviewIframeAndVideos" data-videolink="${component.embedded_url}" onclick="videoModalPreview(this)" style="cursor:pointer;padding:10px;border-radius:50%;color:#000"><i  class="fa fa-video-camera fa-2x"></i></a>`
    enableLink ="block"
  }
 
  if(component?.html_text  || (component.component_type==4 &&  component.description)){
    readmoreInitialized ="block"
     textualData = component?.html_text || component.description
  }


let  tempComponent = `<ul data-id="${component.id}"
  data-name="${component?.name}"
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 
  
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}" 
  class="hello-move-me components accordion-content pb-widget-preview-panel" id="${component.id}">
    
    
      <div class="">
        <div class="row">
          <div class="col-md-12">
            <div class="">
            
      <div class="">
        <div class=" col-md-12">
           


        <div class="actions-set pull-right" >
       

          <span ><a href="${launchPad}"
          data-name="${component?.name}"
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 

      role="button"
      data-toggle="modal">
      <i onclick="LaunchEditBoxEvent(this)"
       class="pb-handle-widget fa fa-edit fa-2x"

        data-name="${component?.name}"
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 


       ></i>
       </a></span>
                       
          <span><i 

          data-name="${component?.name}"
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 


          class="pb-remove fa fa-trash fa-2x" onclick="handleWidgetRemove(this)"></i></span>
        
           <span><a
  data-name="${component?.name}"

  data-description="${component?.description}" 

 class="drag-handle-list-lessons" style="margin-right:10px;"
 
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 
   
 
         
  >

 <i class="fa fa-arrows fa-2x"
    data-name="${component?.name}"
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 

  


 ></i>
</a></span>
        </div>
        </div>
        
      </div>
      <br/> <br/><br/><br/>
    
              <div class="col-md-12">
              <h4
          class="col-md-12"
          
        > <span class="compo-type" style="font-size:25px;color:#000">Component Type: ${Info}</span><br/><span style="font-size:25px;">Title</span><span style="font-size:25px;font-weight:bold;color:#000" class="unit_title_place_holder  title-given "> 
             ${component.name}
          </span>
         </h4><br/>


              <div id="readmore_${component.id}" style="display:${readmoreInitialized}"  class="readmore js-read-more" data-rm-words="70">
                  ${textualData }
              </div>

                                      
                <div data-append="${component.lesson}" 
                data-getitup="${component.id}" class="content-section-from-input unit_content_place_holder">
                   <p style={{display:${enableLink} }} id="embedded_url_${component.id}">${component?.embedded_url}</p>
                   
                  <p>${playVideoEnabled} ${ "Click the edit icon above to edit this unit" } ${ questionTeplateButton }</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
  
  </ul>`
  Target.append(tempComponent);


  //fall back if it fails on saving

    


}





const  handleSaveComponentGenericForm = async () => {
    let Target = $(".dynamo_" + localStorage.getItem("l_tracker"));
    let allowedHeaders =  document.getElementById("myModalGenericForm")
    let T = allowedHeaders.getAttribute('data-basestation')
    let markdownTemplate =  allowedHeaders.getAttribute("data-markdown");
    let url =  allowedHeaders.getAttribute("data-url")


    // let randId = uuid()
    // let Preview = document.querySelector(
    //               "#template-container > .pb-widget-preview-panel-generic-form"
    // );

    // let SClone = Preview.cloneNode(true);
    // let   wrapWrapper = pbCreateNode("li", [
    //                             { class: "pb-placeholder-main col-md-12" },
    //                          // { onclick:  () => { "openModal(this)" }
    // ]);

    // wrapWrapper.appendChild(SClone)
    // wrapWrapper.setAttribute("id", randId )
                    
    // let MainClone = wrapWrapper.cloneNode(true);
    //             // MainClone.setAttribute("id", randId )
    // MainClone.id=randId
                
    // MainClone.querySelector(".fa-edit").setAttribute("data-template", markdownTemplate)
    // MainClone.querySelector(".fa-edit").setAttribute("data-id",randId) //=randId //ref the curr main lesson box
                
    //              //edit view when clicked not saved
    // MainClone.querySelector(".fa-edit").addEventListener("click",(evv) =>{
    //         // if(evv.target.dataset.template && evv.target.dataset.template !=="[pb_html][/pb_text]"){
    //                   // alert(evv.target.parentNode)
    //             const title =  $("#"+ MainClone.getAttribute("id")).find(".unit_title_place_holder-generic").html();
    //             const body = $("#"+ MainClone.getAttribute("id")).find(".unit_content_place_holder-generic").html();
                      
    //                   // alert(title,body)  
    //                   //then place these content in the header and frames
    //                   // eg: EDITING COMPONENT - HTML IFRAME
    //                   // eg src will display the iframe content 
    //                   $(".iframe-boxer2").attr("src",body)
    //                   $(".iframe-box").css("display","block")
    //                   $("main-videosection").css({display:"block"})
    //                   $("#title-unit-b").val(title)
    //                   $("#title-unit2-b").val(body)
    //                   $("#edit-title").html("Editing Html component: "+ title)
    //                   document.getElementById("edit-title").setAttribute("data-parent", MainClone.id)
    //                   // $("#edit-title").attr("data-parent"+ MainClone.getAttribute("id")) //attach this to know where to save
    //                   $("#projector-view").attr("src",body)

                     
    //                 // }
    //             }) 


    // MainClone.querySelector(".fa-trash").addEventListener("click", (e) => {
    //          handleWidgetRemove(e.target)
    //     })

    let component = await createLessonComponent(url,$("#myModalGenericForm-SELECT"))

    //MainClone.querySelector(".unit_title_place_holder-generic").innerHTML =   $("#title-unit").val()  //add validation for unit component
    //MainClone.querySelector(".unit_content_place_holder-generic").innerHTML  = $("#title-unit2").val() || "Edit this content"
    


       let playVideoEnabled = " ";
  let launchPad ="#myModalMarkdownEditor"
  let formType = ""
  let actionBuilder = `/html-component/${component.id}/`
  let Info = "IFRAME/VIDEO EDITABLE COMPONENT"
  let readmoreInitialized = "none";
  let enableLink ="none";
  let textualData = "";
  let questionTeplateButton = false

  if(component.component_type ==1){
    launchPad ="#myModalGenericFormEditorEditMode"
    formType = "myModalGenericForm-SELECT"
    actionBuilder = `/video-component/${component.id}/`
  }else if(component.component_type ==2) {
    launchPad ="#myModalMarkdownEditor"
    Info = "HTML TEXT EDITABLE COMPONENT"
    formType="myModalMarkdownEditor-SELECT"
    actionBuilder = `/html-component/${component.id}/`
  }else if(component.component_type ==3){
    launchPad ="#openModal-about"
    Info = "HTML PROBLEM COMPONENT"
    formType = "myModalProblemForm-SELECT"
    actionBuilder = `/problem-component/${component.id}/`
    
    questionTeplateButton =`<a role="button"
    data-toggle="modal" 
    style="cursor:pointer" data-self="${component.id}" 
    data-append="${component.lesson}" 
    data-getitup="${component.id}" 
  onclick="window.event.preventDefault();swapProblemDisplayBoard(this)"  
     href="" class="pull-right">
       <i style="color:#000" data-self="${component.id}"  
       data-getitup="${component.id}" 
       class="fa fa-plus fa-2x">Add a question </i></a>`
  

  }else if(component.component_type ==4){
    //not implemented the ui for this
    launchPad ="#openModal-about2"
    Info = "HTML DISCUSSION COMPONENT"
    formType = "myModalDiscussionForm-SELECT"
    actionBuilder = `/discussion-component/${component.id}/`
    


  }

  if(component.embedded_url){
    playVideoEnabled = `<a role="button"
data-toggle="modal" href="#modalFullScreenPreviewIframeAndVideos" data-videolink="${component.embedded_url}" onclick="videoModalPreview(this)" style="cursor:pointer;padding:10px;border-radius:50%;color:#000"><i  class="fa fa-video-camera fa-2x"></i></a>`
    enableLink ="block"
  }
 
  if(component?.html_text  || (component.component_type==4 &&  component.description)){
    readmoreInitialized ="block"
     textualData = component?.html_text || component.description
  }


let  tempComponent = `<ul data-id="${component.id}"
  data-name="${component?.name}"
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 
  
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}" 
  class="hello-move-me components accordion-content pb-widget-preview-panel" id="${component.id}">
    
    
      <div class="">
        <div class="row">
          <div class="col-md-12">
            <div class="">
            
      <div class="">
        <div class=" col-md-12">
           


        <div class="actions-set pull-right" >
       

          <span ><a href="${launchPad}"
          data-name="${component?.name}"
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 

      role="button"
      data-toggle="modal">
      <i onclick="LaunchEditBoxEvent(this)"
       class="pb-handle-widget fa fa-edit fa-2x"

        data-name="${component?.name}"
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 


       ></i>
       </a></span>
                       
          <span><i 

          data-name="${component?.name}"
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 


          class="pb-remove fa fa-trash fa-2x" onclick="handleWidgetRemove(this)"></i></span>
        
           <span><a
  data-name="${component?.name}"

  data-description="${component?.description}" 

 class="drag-handle-list-lessons" style="margin-right:10px;"
 
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 
   
 
         
  >

 <i class="fa fa-arrows fa-2x"
    data-name="${component?.name}"
       data-idx="${component.id}"
  data-parent="${component.lesson_id}"
  data-pos="${component.position_id}"
  data-description="${component.description}"
  data-component_type="${component.component_type}"
  data-name="${component.name}"
  data-content_type="${component.content_type}"
  data-embedded_url="${component.embedded_url}"
  data-embedded_url="${component.video_type}"
  data-form="${formType}"
  data-action-figure="${actionBuilder}"
  data-append="${component.lesson}" 
                data-getitup="${component.id}" 

  


 ></i>
</a></span>
        </div>
        </div>
        
      </div>
      <br/> <br/><br/><br/>
    
              <div class="col-md-12">
              <h4
          class="col-md-12"
          
        > <span class="compo-type" style="font-size:25px;color:#000">Component Type: ${Info}</span><br/><span style="font-size:25px;">Title</span><span style="font-size:25px;font-weight:bold;color:#000" class="unit_title_place_holder  title-given "> 
             ${component.name}
          </span>
         </h4><br/>


              <div id="readmore_${component.id}" style="display:${readmoreInitialized}"  class="readmore js-read-more" data-rm-words="70">
                  ${textualData }
              </div>

                                      
                <div data-append="${component.lesson}" 
                data-getitup="${component.id}" class="content-section-from-input unit_content_place_holder">
                   <p style={{display:${enableLink} }} id="embedded_url_${component.id}">${component?.embedded_url}</p>
                   
                  <p>${playVideoEnabled} ${ "Click the edit icon above to edit this unit" } ${ questionTeplateButton }</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
  
  </ul>`
  Target.append(tempComponent);




    //Target.append(MainClone);



  }


  const handleEditSaveGeneric = () =>{
    // $("#save_new_insertion_component_generic-edit").on("click", () =>{
        let targetBase =  document.getElementById("edit-title").getAttribute("data-parent")
        //alert(targetBase)

        //let ui sample

        $("#"+targetBase).find(".unit_title_place_holder-generic").html($("#title-unit-b").val())  //add validation for unit component
        $("#"+targetBase).find(".unit_content_place_holder-generic").html($("#title-unit2-b").val()) 
         $("#projector-view").attr("src",$("#title-unit2-b").val())        
    // })
  }



   const handleEditSaveTextEditor = () =>{
    // $("#save_new_insertion_component_generic-edit").on("click", () =>{
        let targetBase =   document.getElementById("myModalMarkdownEditor").getAttribute("data-parent")


       // alert(targetBase)
        // $("#"+targetBase).find(".unit_title_place_holder-generic").html()  //add validation for unit component
        $("#"+targetBase).find(".unit_content_place_holder").html($("#input-area2").val()) 
              
    // })
  }

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", theme: "snow" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  render() {
    return (
      <div>
        <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          // bounds={'.app'}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

/*
 * PropType validation
 */
//Editor.propTypes = {
//  placeholder: PropTypes.string,
//}

export default class MasterForm extends React.Component {
  constructor(props) {

    super(props);
	let name ="",author ="",institution ="",code =""
	if(localStorage.getItem("code")){
        code = localStorage.getItem("code")
	}
  if(localStorage.getItem("name") ){
		name = localStorage.getItem("name");
	}
   if(localStorage.getItem("institution")){
		 institution = localStorage.getItem("institution");
	}
   if(
	   localStorage.getItem("author")){
		author = localStorage.getItem("author")	
	}
    this.courseData = null;
    this.state = {
      /*multistep logic data*/
      currentStep: 1,
      sectionStep: 1,
      subSectionStep: 1,
      lessonStep: 1,
      finishedClicked: false,


      modes:["CREATE_MODE","EDIT_MODE"],
      editor:null,  //THE LOGGED IN USERS DETAILS [{token,...details}]
      author: author, // THE LOGGED IN USER NAME {...details}.username
      previledges:["CAN_EDIT","CAN_VIEW","CAN_DELETE","CAN_CREATE"], 
	  
	  
      
      //state fields
      /*request form data*/
      courseDetail: {},
      
        name: name,
        code: code,
        run: "",
        card_image: "",
        intro_video: "",
        description: "",
        overview: "",
        learning_expectation: "",
        curriculum: "",
        level: 1,  //int
        enrolment_type: 1,
        entrance_exam_required: true, 
        cost: 100.0,  //float
        auditing: true,
        course_pacing: 1, //int
        course_start_date_time: "",  //2021-08-26T17:13:00+01:00
        course_end_date_time: "",
        enrolment_start_date_time: "",
        enrolment_end_date_time: "",
        course_language: "english",
        requirement_hours_per_week: 1, //int
        requirement_no_of_week: 1,  //int
        grace_period_after_deadline: 1, //int
        publication_status: 2,  //int
        institution: institution,   //keypair preporpulated set of inst id
        author: author,  //keypair preporpulated set of author id
        prerequisite: [
              //key pairs ids of courses
        ],
        authoring_team: [
                              //key pair authors
            
        ],

        /* request resource data*/
        languages:[], //  getdata
        instructors:[], //  getdata
        courses:[], //  getdata
        institutions:[],  //  getdata
        currentCourseId:"", //for tracking saved course currently working on
        groups:[],
      formErrors: {
        /*request form errors data*/

        /*do not change this part: its used in ai logic*/
        name: "",
        code: "",
        run: "",
        card_image: "",
        intro_video: "",
        description: "",
        overview: "",
        learning_expectation: "",
        curriculum: "",
        level: "",  //int
        enrolment_type: "",
        entrance_exam_required: "", 
        cost: "",  //float
        auditing: "",
        course_pacing: "", //int
        course_start_date_time: "",  //2021-08-26T17:13:00+01:00
        course_end_date_time: "",
        enrolment_start_date_time: "",
        enrolment_end_date_time: "",
        course_language: "",
        requirement_hours_per_week: "", 
        requirement_no_of_week: "", 
        grace_period_after_deadline: "", 
        publication_status: "",  
        institution: "",   
        author: "", 
        prerequisite: [],
        authoring_team: [],

        
      },
      formValidity: {
        email: false,
        username: false,
        password: false,
        passwordConfirmation: false,
      },
      canSubmit: false,
      sections:[],
      subsections:[],
      lessons:[]
    };
    /*movement logic data*/
    this.handleChange = this.handleInputChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }


  formatDateToSqlDate = (dateStr) =>{
    var date = new Date(dateStr);
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
  }
  
  autoUpdateFilledData(obj){
	  for(let k in obj){
		this.setState(
          {
            [k]: obj[k],
          }
          
        );  
	  }
  }



  handleInputOverride = (event) =>{


     // if(event.target.name="code"){
        var input = event.target;
        var start = input.selectionStart;
        var end = input.selectionEnd;
        input.value = input.value.toLocaleUpperCase();
        input.setSelectionRange(start, end);

      //}



      let { name, value } = event.target;
      localStorage.setItem(name,value)

      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
      });
  }
  
  
  



   handleInputChange = (event) => {

    //notification set
        // Selecting all required elements
const wrapper = document.querySelector(".notification-notice"),
toast = wrapper.querySelector(".toast-offline2"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon");
   

      let { name, value } = event.target;
      let imageUrl = ""
      //console.log(event.target.value);

       if(name=="course_start_date_time" || 
        name =="course_end_date_time" || 
        name=="enrolment_start_date_time" ||
         name=="enrolment_end_date_time"){
			 //set it back to text
        
		
		     event.target.type="text"

        // value = new Date(value) //DateFormatter.mysqlDate(value);
        // value = value.toISOString()
        localStorage.setItem(name, value);
        // this.formatDateToSqlDate(value);
        this.setState(
          {
            [name]: value,
          },
          function () {
            /*validation hooks*/
            this.validateField(name, value);
          }
        );
      }else if(event.target.name == "entrance_exam_required"){
        //(boolean) is for laravel or php
        if(value=="false"){
          value = false;
        }else{
          value = true
        }
         //logic 1 - automate state processing of form data
        //dynamically hooks state fields to current value
        this.setState(
          {
            [name]: value,
          },
          function () {
            /*validation hooks*/
            this.validateField(name, value);
          }
        );
        localStorage.setItem(name, value);
      
      }else if(event.target.name == "card_image" || event.target.name == "intro_video"){
        //handle image upload here
       // let fileUploader = document.getElementById('file-uploader');
        let feedback = document.getElementById('feedback');
        let progress = document.getElementById('progress');
        let key="card_image"

        if(event.target.name == "intro_video"){
        //  fileUploader = document.getElementById('file-uploader2');
           feedback = document.getElementById('feedback2');
          progress = document.getElementById('progress2');
          key="intro_video"
        }
        const reader = new FileReader();

      //fileUploader.addEventListener('change', (event) => {
        const files = event.target.files;
        const file = files[0];
       
        reader.readAsDataURL(file);
        reader.addEventListener('progress', (ev) => {
          if (ev.loaded && ev.total) {
            const percent = (ev.loaded / ev.total) * 100;
            progress.value = percent;
            document.getElementById('progress-label').innerHTML = Math.round(percent) + '%';
            if (percent === 100) {
              let msg = `<span style="color:green;">File <u><b>${file.name}</b></u> has been uploaded successfully.</span>`;
              feedback.innerHTML = msg;
              // call upload action to cloudinary api
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", "hpvklb3p");
              // eslint-disable-next-line no-undef
              fetch("https://api.cloudinary.com/v1_1/questence/image/upload", {
                method: "POST",
                body: formData,
              })
                .then((response) => response.json())
                .then((data) => {

                  if (typeof data.secure_url !== "undefined") { // ensure the api saving data of uploaded 3rdparty image has a return call to the iamge successfully uploaded
                    imageUrl = data.secure_url; //get the generated image url
                    // toast.success("upload successful");
                     console.log("here made it thru", imageUrl)
                    // var button = document.querySelector('.save-generic');
                   var slideout = document.getElementById('notifier');
                  let successSlide = slideout.querySelector(".success-notification")
                  // let errorSlide = slideout.querySelector(".error-notification")
                  slideout.classList.toggle('visible');

                  localStorage.setItem("card_image", imageUrl);


                    value = imageUrl; 
                    // return imageUrl


                     //logic 1 - automate state processing of form data
                      //dynamically hooks state fields to current value
                    this.setState(
                          {
                            [key]: imageUrl,
                          },
                          function () {
                            /*validation hooks*/
                            this.validateField(name, value);
                          }
                    );


                  } else {
                     //toast.error("could not upload image");
                    return false
                  }
                })
                .catch((error) => {
                  console.log(error)
                  // toast.error("API KEY ***** FOR CLOUDINARY NOT SET. EITHER API KEY HAS EXHAUSTED ITS TRIAL PLAN");
                  throw error;
                  return false;
                });
           
            }
          }
        });
      //});
      }else{


        
        localStorage.setItem(name, value)

       this.setState({
      ...this.state,
      [event.target.name]: value,
    });

      }
       



  };



  // const [htmlDescription, setHtmlDescription] = useState("");
  handleHtmlDescriptionChange = (newValue) => {
     localStorage.setItem("description", newValue);
    this.setState({
      ...this.state,
      description: newValue
    })
  }

  handleHtmlCurriculumChange = (newValue) =>{
       localStorage.setItem("curriculum", newValue);
    this.setState({
      ...this.state,
      curriculum: newValue
    })
  }

  // const [htmlOverView, setHtmlCourseOverView] = useState("");
  handleHtmlCourseOverViewChange = (newValue) => {
       localStorage.setItem("overview", newValue);
    this.setState({
      ...this.state,
      overview: newValue
    })
  }

  // const [htmlOutcome, setHtmlOutCome] = useState("");
  handleHtmlOutComeChange =(newValue) => {
     localStorage.setItem("learning_expectation", newValue);
    this.setState({
      ...this.state,
      learning_expectation: newValue
    })
  }

  // const [htmlTopics, setHtmlTopics] = useState("");
  handleHtmlTopicsChange = (newValue) =>{
       localStorage.setItem("topics", newValue);
    this.setState({
      ...this.state,
      topics: newValue
    })
  }

  // const [htmlPrerequisites, setHtmlPrerequisites] = useState("");
  handleHtmlPrerequisitesChange =(event) => {
   //if(event.target.name =="prerequisite"){
     const {name,value} = event.target
        //pop and push activity
       // alert(name+ " with value pair: "+value)
        //console.log(name+ " with value pair: "+value)
     let tempstore = localStorage.getItem("prerequisite")

     if(tempstore?.match(/[\[\.*\]]/)){
       let temp_prerequisite = JSON.parse(tempstore)
       temp_prerequisite = [...temp_prerequisite, value]
       localStorage.setItem("prerequisite",JSON.stringify(temp_prerequisite))
       //stateData.prerequisite = temp_prerequisite  ;
      }else{
          if(tempstore.length > 0){
          let prerequisite =[localStorage.getItem("prerequisite"), value] //just the lead author
            localStorage.setItem("prerequisite",JSON.stringify(prerequisite))
          }else{
            let prerequisite =[value] //just the lead author
            localStorage.setItem("prerequisite",JSON.stringify(prerequisite))
          }         
      }




      this.setState({
      ...this.state,
      "prerequisite": localStorage.getItem("prerequisite")
    })

        
     // }
  }



  handleChangeTextEditor =(nameKey = "", valueData = "") => {
    if (nameKey.length > 0 && valueData.length > 0) {
      this.setState({
        ...this.state,
        [nameKey]: valueData,
      });
    }

    //console.log(this.state)
  }

   /*navigation skipper*/

  goToStep(e, step) {
    e.preventDefault();
    
    this.setState({
      currentStep: step,
    });


  }

  tabIterate(step){
    //used without click event to navigate programatically 
    //especially when a post is made to retrieve current step of user where
    //he left off
    this.setState({
      currentStep: step,
    });
  }

   /*next step*/
  _next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 7 ? 8 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  }
 
  /*go back one step*/
  _prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  /*one single onchange handler all over the form element*/
  /*with one single validation hook function for all form fields*/
  handleChange =   (event) => {
      let { name, value } = event.target;
       let imageUrl = ""
      console.log(event.target.value)
      if(event.target.name == "entrance_exam_required"){
        //(boolean) is for laravel or php
        if(value=="false"){
          value = false;
        }else{
          value = true
        }


         //logic 1 - automate state processing of form data
        //dynamically hooks state fields to current value
      this.setState(
            {
              [name]: value,
            },
            function () {
              /*validation hooks*/
              this.validateField(name, value);
            }
      );


      }else if(event.target.name == "card_image"){
        //handle image upload here

        const fileUploader = document.getElementById('file-uploader');
        const feedback = document.getElementById('feedback');
        const progress = document.getElementById('progress');
        const reader = new FileReader();

      //fileUploader.addEventListener('change', (event) => {
        const files = event.target.files;
        const file = files[0];
        console.log(file)
        reader.readAsDataURL(file);
        reader.addEventListener('progress', (ev) => {
          if (ev.loaded && ev.total) {
            const percent = (ev.loaded / ev.total) * 100;
            progress.value = percent;
            document.getElementById('progress-label').innerHTML = Math.round(percent) + '%';
            if (percent === 100) {
              let msg = `<span style="color:green;">File <u><b>${file.name}</b></u> has been uploaded successfully.</span>`;
              feedback.innerHTML = msg;
              // call upload action to cloudinary api
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", "hpvklb3p");
              // eslint-disable-next-line no-undef
              fetch("https://api.cloudinary.com/v1_1/questence/image/upload", {
                method: "POST",
                body: formData,
              })
                .then((response) => response.json())
                .then((data) => {

                  if (typeof data.secure_url !== "undefined") { // ensure the api saving data of uploaded 3rdparty image has a return call to the iamge successfully uploaded
                    imageUrl = data.secure_url; //get the generated image url
                    // toast.success("upload successful");
                     console.log("here made it thru", imageUrl)
                    // var button = document.querySelector('.save-generic');
                   var slideout = document.getElementById('notifier');
                  let successSlide = slideout.querySelector(".success-notification")
                  // let errorSlide = slideout.querySelector(".error-notification")
                  slideout.classList.toggle('visible');


                    value = imageUrl; 
                    // return imageUrl


                     //logic 1 - automate state processing of form data
                      //dynamically hooks state fields to current value
                    this.setState(
                          {
                            card_image: imageUrl,
                          },
                          function () {
                            /*validation hooks*/
                            this.validateField(name, value);
                          }
                    );


                  } else {
                     //toast.error("could not upload image");
                    return false
                  }
                })
                .catch((error) => {
                   toast.error("API KEY ***** FOR CLOUDINARY NOT SET. EITHER API KEY HAS EXHAUSTED ITS TRIAL PLAN");
                  throw error;
                  return false;
                });
           
            }
          }
        });
      //});
      }else{

         //logic 1 - automate state processing of form data
        //dynamically hooks state fields to current value
      this.setState(
            {
              [name]: value,
            },
            function () {
              // /*validation hooks*/
              // this.validateField(name, value);
            }
      );

      }
       


      
    }
  


  togglerFullscreen(e) {
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
          height: "auto",
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
          height: "600px",
          "overflow-y": "scroll",
        });
      }
      element = $("#container-fullscreen").get(0);
      if (element.requestFullscreen) {
        element.requestFullscreen();
        $("#container-fullscreen").css({
          height: "600px",
          "overflow-y": "scroll",
        });


        // $(".tab-content").css({height:"400px","overflow-y":"none"})
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
    // });
  }

  //AI: logic 2 - trigger validation inputs
  validateField(field_name, value) {
    
  }

  canSubmit() {
    this.setState({
      canSubmit:
        //RELAX VALIDATION OF INPUT FOR FLEXIBILITY ON THE USER END NOT TO ENTER ALL DATA
        //THIS FEATURE COULD CHANGE IN THE FUTURE

        this.state.formValidity.name &&
        this.state.formValidity.code   
        //&&
        
    });
  }

  errorClass(error) {
    return error?.length === 0 ? "" : "is-invalid";
  }

  handleSubmit = (event) => {
    event.preventDefault();

  };



  get previousButton() {
    let currentStep = this.state.currentStep;
    // if (currentStep !== 1) {
    if (document.getElementById("list-nav-gate" + currentStep)) {
      document.getElementById("list-nav-gate" + currentStep).backgroundColor =
        "rgba(8,23,200)";
    }

    return (
      <li className="previous list-inline-item" onClick={this._prev}>
        <a href="javascript::" className="">
          {" "}
          <i className="fa fa-arrow-left" style={{ color: "#fff" }}></i>{" "}
        </a>
      </li>
    );
    // }
    // return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    if (document.getElementById("list-nav-gate-" + currentStep)) {
      document.getElementById("list-nav-gate-" + currentStep).backgroundColor =
        "rgba(8,23,200)";
    }
    // if (currentStep < 7) {
    return (
      <li className="next list-inline-item" onClick={this._next}>
        <a href="javascript::" className="">
          {" "}
          <i className="fa fa-arrow-right" style={{ color: "#fff" }}></i>{" "}
        </a>
      </li>
    );
    // }
    // return null;
  }

  
  componentDidMount(){

   
    (async (trigger) =>{
       try{
         $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
    
         await this.fetchContent()
       }catch(e){
         console.log("some error occured")
         return false
       }
    })("run-logic-sequence")

    $("label").css({color:"#000"})
     // let T = new  TinyMyceRender();
     // T.render("")
  var formElements = new Array();
    $("input, select, textarea").each(function(){
        formElements.push($(this));
    });


    let thisClass = this; 





    $(document).ready(function(ev){

      //for lesson component of text, video and iframes only
  $(".close").click((e)=>{
    e.preventDefault()
    $("#openModal-about").css({opacity:0}).fadeOut("fast")
    $("body").removeClass("modal-open").css({background:"#fff"});
    $(".modalDialog").css({display:"none", "pointer-events": "auto"})
    $(".modal").removeClass("show")

    localStorage.setItem("back_step",7);
    window.location.reload()

  })




     //call the problem component binder events handlers
     thisClass.handleProblemComponent(ev)


     //handle scroll bar to top event

     var topScroll = document.getElementById("myBtn");
     topScroll.addEventListener("click", (e) => {scrollToTop(e)})
     // When the user scrolls down 20px from the top of the document, show the button
     window.onscroll = function() {scrollFunction()};



    })

    TabbyFy()
    setTimeout(removeLoader,10000); //wait for page load PLUS two seconds.
   

  


  }


  //launch events for problem component
  handleProblemComponent(e){
      // -------------------------------------------
    let thisClass = this;
    // DEFAULT INPUT AND OUTPUT AREA
    let textarea = document.querySelector( '#input-areadisplay' );
    let outputArea = document.querySelector( '#output-areadisplay' );
    let previewMessage = document.querySelector( '.preview-messagedisplay' );

    if(localStorage.getItem("back_step")){
      //this.tabIterate(localStorage.getItem("back_step"))
       localStorage.removeItem("back_step");

       //refetch the data content to reorder dorm positioning
    }
    // var regExp = /\(([^)]+)\)/;
    // var matches = regExp.exec("I expect five hundred dollars ($500).");

    // //matches[1] contains the value between the parentheses
    // console.log(matches[1]);

    // -------------------------------------------
    // TOOLBAR
    // -------------------------------------------
    const preview = document.querySelector( '#previewdisplay' );
    const boldButton = document.querySelector( '#bold' );
    const italicButton = document.querySelector( '#italic' );
    const heading1Button = document.querySelector( '#heading1' );
    const heading2Button = document.querySelector( '#heading2' );
    const heading3Button = document.querySelector( '#heading3' );
    const linkButton = document.querySelector( '#link' );
    // const tokenButton = document.querySelector( '#token' );
    const ulButton = document.querySelector( '#list-ul' );
    const olButton = document.querySelector( '#list-ol' );
    const selectedBox = document.querySelector("#sub-selection")


    //define inner functions

    function setInputArea( inputElement ) {
      textarea = inputElement;
    }

    function setOutputArea( outputElement ) {
      outputArea = outputElement;
    }


    function output( lines ) {
      outputArea.innerHTML = lines;
    }



    //start event listener for button toolbars
    boldButton.addEventListener( 'click', () =>
      thisClass.insertText( textarea, '****', 'demo', 2, 6 )
    );

    italicButton.addEventListener( 'click', () =>
      thisClass.insertText( textarea, '**', 'demo',  1, 5 )
    );

    heading1Button.addEventListener( 'click', () =>
      thisClass.insertText( textarea, '#', 'heading1', 1, 9 )
    );

    heading2Button.addEventListener( 'click', () =>
      thisClass.insertText( textarea, '##', 'heading2', 2, 10 )
    );

    heading3Button.addEventListener( 'click', () =>
      thisClass.insertText( textarea, '###', 'heading3', 3, 11 )
    );

    linkButton.addEventListener( 'click', () =>
      thisClass.insertText( textarea, '[](http://...)', 'url text', 1, 9 )
    );

    // tokenButton.addEventListener( 'click', () =>
    //   insertText( textarea, '{{}}', 'tokenValue', 2, 12 )
    // );

    ulButton.addEventListener( 'click', function() {
      thisClass.insertText( textarea, '* ', 'item', 2, 6 );
    } );

    olButton.addEventListener( 'click', () =>
      thisClass.insertText( textarea, '1. ', 'item', 3, 7 )
    );


   //if a change is made then add the question based on the selected html type
    selectedBox.addEventListener("change", (e)=>{
         let val = selectedBox.options[selectedBox.selectedIndex].getAttribute("data-markdown")
         let syntax =``;
         switch (val){
            case "[pb_html]/[pb_multichoice]":
             syntax = `"""\n
Who is the entrepreneur who created questence?\n
[] Hon Engr. Kakasu\n
[] Bishop Sodimu\n
[x] Chief Engineer Sodimu Kayode\n
[x] Chief Engineer Agamu Shagamu\n"""`
              thisClass.insertText( textarea, syntax, " \n \n", 0, 0 )
              break;
            case "[pb_html]/[pb_checkbox]":
             syntax = `"""\nWho is the owner of icst solution\n
[x] Chief Engineer Sodimu Kayode\n
[] Mr Kayode Adamu\n
[] Mr Engr Samudu KODIMU\n 
[] Hon Kayode Sodimu Engr Chief\n"""`
                thisClass.insertText( textarea, syntax, " \n \n" )
              break;
            case "[pb_html]/[pb_input]":
             syntax = `"""\nExample Question here:  How Many Continents are in the world? \n
      [i] Your Answer\n"""`
                thisClass.insertText( textarea, syntax, "")
              break;
            case "[pb_html]/[pb_numeric]":
             syntax = `"""\nExample Question here : 2+ 2? \n
      [n] Your Answer\n"""`
                thisClass.insertText( textarea, syntax, " \n \n" )
              break;
            case "[pb_html]/[pb_dropdown]":
             syntax = `"""\nExample Question here:  who was made king of your country -sample question? \n
      [d]    Your next generations\n
      [d]     Saladin Jake\n
      [d]     Victor Victor Juwa\n
      [d][x]  The right Answer\n
      [HINT] someone with a mantle of leadership to rule the world\n"""`;
             thisClass.insertText( textarea, syntax, " \n \n")



              break;
            case "[pb_html]/[pb_dropdown_feedback]":
             syntax = `"""\nExample Question here:  who was made king of your country -sample question? \n
      [d] Your next generations\n
      [d]  Saladin Jake\n
      [d][x]  The right answer\n
      []  No one else but me\n
      [HINT] someone with a mantle of leadership to rule the world\n"""`;
             thisClass.insertText( textarea, syntax, " \n \n" )

              break;
            case "[pb_html]/[pb_numeric_feedback]":
               syntax = `"""\nExample Question here : 2+ 2? \n
      [n] Your Answer\n
      [HINT] A number in the range of 1 through 8 or more \n"""`
                thisClass.insertText( textarea, syntax, "" )
              break;
            case "[pb_html]/[pb_input_feedback]":
               syntax = `"""\nHow Many Continents are in the world? \n
      [i] Your Answer\n
      [HINT] A number in the range of 1 -10\n"""`
                thisClass.insertText( textarea, syntax, " \n \n")
              
              break;
            case "[pb_html]/[pb_checkbox_feedback]":
             syntax = `"""\nExample Question here:  who was made king of your country -sample question? \n
      [o] The right answer\n
      []  Saladin Jake\n
      []  Victor Victor Juwa\n
      []  No one else but me\n
      [HINT] someone with a mantle of leadership to rule the world\n"""`;
             thisClass.insertText( textarea, syntax, " \n \n")

              break;
            case "[pb_html]/[pb_multichoice_feedback]":
              syntax = `"""\nExample Question here:  who was made king of your country -sample question? \n
      [x] Your next generations\n
      [x]  Saladin Jake\n
      []  Victor Victor Juwa\n
      []  No one else but me\n
      [HINT] someone with a mantle of leadership to rule the world\n"""`
                  thisClass.insertText( textarea, syntax, " \n \n")
              break;
            default:
              break;

         
         }
      })


     //output display event handler parser that converts the markdown template to html element
      preview.addEventListener( 'click', () => {
           //the inner function called
            output( thisClass.parse( textarea.value ) );

            if(preview.textContent=="Preview"){
             preview.textContent = "Edit Mode"
            }else{
              preview.textContent="Preview"
            }

            outputArea.classList.toggle( 'show' );
            previewMessage.classList.toggle( 'show' );
            preview.classList.toggle( 'active' );
          } );


   }


  insertText( textarea, syntax, placeholder = 'demo', selectionStart = 0, selectionEnd = 0 ) {
      // Current Selection
      const currentSelectionStart = textarea.selectionStart;
      const currentSelectionEnd = textarea.selectionEnd;
      const currentText = textarea.value;

      

      if( currentSelectionStart === currentSelectionEnd ) {
        const textWithSyntax = textarea.value = currentText.substring( 0, currentSelectionStart ) + syntax + currentText.substring( currentSelectionEnd );
        textarea.value = textWithSyntax.substring( 0, currentSelectionStart + selectionStart ) + placeholder + textWithSyntax.substring( currentSelectionStart + selectionStart )

        textarea.focus();
        textarea.selectionStart = currentSelectionStart + selectionStart;
        textarea.selectionEnd = currentSelectionEnd + selectionEnd;
      } else {
        const selectedText = currentText.substring( currentSelectionStart, currentSelectionEnd );
        const withoutSelection = currentText.substring( 0, currentSelectionStart ) + currentText.substring( currentSelectionEnd );
        const textWithSyntax = withoutSelection.substring( 0, currentSelectionStart ) + syntax + withoutSelection.substring( currentSelectionStart );

        // Surround selected text
        textarea.value = textWithSyntax.substring( 0, currentSelectionStart + selectionStart ) + selectedText + textWithSyntax.substring( currentSelectionStart + selectionStart );

        textarea.focus();
        textarea.selectionEnd = currentSelectionEnd + selectionStart + selectedText.length;
      }
  }


   //markdown parser for html elements
// -------------------------------------------
// PARSER
// -------------------------------------------

 parse( content ) {
        // Regular Expressions
        const h1 = /^#{1}[^#].*$/gm;
        const h2 = /^#{2}[^#].*$/gm;
        const h3 = /^#{3}[^#].*$/gm;
        const bold = /\*\*[^\*\n]+\*\*/gm;
        const italics = /[^\*]\*[^\*\n]+\*/gm;
        const link = /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm;
        const lists = /^((\s*((\*|\-)|\d(\.|\))) [^\n]+))+$/gm;
        const unorderedList = /^[\*|\+|\-]\s.*$/;
        const unorderedSubList = /^\s\s\s*[\*|\+|\-]\s.*$/;
        const orderedList = /^\d\.\s.*$/;
        const orderedSubList = /^\s\s+\d\.\s.*$/;
        const myRegexQuestions =/[\.*\w+(\"{3}\[\]|\[x\]|\[o\]|\[n\]|\[o\]|\[HINT\s+\]+)+\s\.*]+/gm;

         //  /^".*"$/
         // /\G[^"]*(?:"[^"\s]*"[^"]*)*("[^"\s]*\s[^"]*")/

         // /[^\s"']+|"([^"]*)"|'([^']*)'/        #for single or double

         // /(?:"[^"\s]*"[^"]*)*("\S*\s[^"]*")/
        const myRegexQuestionsFull =  /((?:'|"){1,3})([^'"]+)\1/g      //  /(?:"[^"\s]*"[^"]*)*("\S*\s[^"]*")+/
         //this is better: /((?:'|"){1,3})([^'"]+)\1/

         //  /^[^"]*(?:"(?:[^"\s]|[^"\s][^"]*[^"\s])?"[^"]*)*$/

         //  /"(.*?)(\w+)\b"/m
        const matchesFull = content.match(myRegexQuestionsFull)
       // console.log(matchesFull)

        //for each questions and options
        //array buff the questions


      //   var texto = 'Multichoice:""" Example Question here: who was made king f your country -sample question? [x] option 1 and 2 are correct [x]  option 1 and 2 are correct []  Victor Victor Juwa []  No one else but me """ ';

      // var textoLimpo = texto.replace(/"([^"]*)"/g, function (a, b, c) {
      //     return  b.replace(/^\s+|\s+$/g, '') ;
      // });
      // alert(textoLimpo); 
        
        //working splits // /[\.*\w+(\[\]|\[x\]|\[o\]|\[n\]|\[o\]|\[HINT\s+\]+)+\s\.*]+/gm;

        const regex3quotes = /[\"{3}.*]+/

        const hintRegex = /[HINT:(\s\.*)]/
        

        // /([\.*\w+(\[\]|\[x\]|\[o\]|\[n\]|\[o\]|\[HINT\s+\]+)+\s\.*]+)(.*\s+)+/gm; 
        const multichoice = "[pb_html]/[pb_multichoice]";
        const checkbox = "[pb_html]/[pb_checkbox]";

        const finalQuestionsArrangements = [];
        let htmlComponent = [];
        let undecidedComponent = []
        let templateStr ="" //form questioniar
        


         //check box and multi choice markdown parser

         //if type contains [x] its checkbox


        let dropdownWrapper = `<div class="field"><select>`
        //if 3 quotes for problem question
         if(myRegexQuestionsFull.test(content)){
            //match = content.match(regex3quotes)
            //console.log(match)


            // let myRegex = /(.*[\"]{3}(.*\s+)+[\"]{3})(.*\s+)+/gm;         +
           const matches = matchesFull;
         //  console.log(matches)
           let question= '';
           let objectives_component =[]
           let hintQuestion = ""
           let  questionAndAnswersBatches =[];

            //A BETTER WAY TO HANDLE THIS
                    //EACH MATCHES CONTAINS [QUESTION STR, ...OPTIONS];
                    //template
        let optionsTemplateBatch = [
         //{
          //   rootQuestion:"",
          //   correctAnswers:[],
          //   htmlFormElements:[],
          //   wrongAnswers:[],
          //   tags:[], // for rendering
          //   parentTag:"",
          //   humanReadableTagName
          // },...
          ];
        let templateRenderer="";


           matches.forEach( element => {
            
             if(element.match(/\"\"\"/)){
              //console.log(element.replace(/\"\"\"/, "")) 
             // remove the tripple quotes above
               element = element.replace(/\"\"\"/, "")
              // join all strings relating to the question text 
             // remove the tripple quotes below
              element = element.replace(/\"\"\"/, "")
              console.log(element)  
             }
              
             // this is the question
             if(!element.match(/.*[\[.*\]]/)){
                 question = question + ""+ element
                 
                  console.log(question)
              }

              //objective question of the component type or just what refers to the componet
              if(element.match(/[\[.*\]]/)){
                  if(element.match(/[\[x{0,1}\]]/)){
                    //this is multiselect -x || [x] with the answer
                    let eachMatches = element.match(/(.*\w[\[x{0}\].*\s\w+])+/gm) ///[\[x{0}\]]/
                    console.log(eachMatches)   

                   
                    //spreaded
                    let rootQuestion ="",
                    correctAnswers = [],
                    wrongAnswers =[],
                    tags =[],
                    parentTag ="",
                    htmlFormElements =[],
                    selectRoot =`<select>`,
                    humanReadableTagName ="multichoice";



                    eachMatches.forEach((entry, index) =>{
                       let questionText = eachMatches[0];
                       rootQuestion =questionText  //occurs only once in each iter
                       if(index!==0){
                        
                       //lets quickly get the right and wrong answers now not later 
                       //this is a faster approach
                       //saladin jake!!! Author
                       if(entry.includes("[x]")){ // multichoice mark up
                        entry = entry.match(/[^\[\]]*$/)[0]
                        entry = entry.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
                        //alert(entry)
                        correctAnswers= [ ...correctAnswers,entry];
                        tags = [...tags,"[x]"]
                        parentTag ="[x]"
                        humanReadableTagName="select-multiple"
                        htmlFormElements = [...htmlFormElements,
                           `   <div class="field">
                            <p for="five">${entry}</p>
                            <input  type="checkbox" checked/></div>`
                        ];

                       }else if(entry.includes("[o]")){ // check box mark up
                        entry = entry.match(/[^\[\]]*$/)[0]
                        entry = entry.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
                        
                         correctAnswers= [...correctAnswers,entry];
                        tags = [...tags,"[o]"]
                        parentTag ="[o]" // occurs only once
                        humanReadableTagName="radio"

                        htmlFormElements = [...htmlFormElements,
                           `   <div class="field">
                            <p for="five">${entry}</p>
                            <input  type="radio" checked/></div>`
                        ];

                       }else if(entry.includes("[d][x]")){ // dropdown checked
                        entry = entry.match(/[^\[\]]*$/)[0] // just the question option without [] or [o]
                        entry = entry.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
                        
                         correctAnswers= [ ...correctAnswers,entry];
                         tags = [...tags,"[d][x]"]
                         parentTag ="[d][x]";
                         selectRoot+=`<option>${entry}</option>`;
                         htmlFormElements = [...htmlFormElements,selectRoot];
                         humanReadableTagName="select"

                       } else if (entry.includes("[d]")){ //dropdown unselected
                        entry = entry.match(/[^\[\]]*$/)[0]
                        entry = entry.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
                        
                         wrongAnswers= [ ...wrongAnswers,entry];
                         tags = [...tags,"[d]"]
                         parentTag ="[d][x]"
                         


                       }else if (entry.includes("[n]")){ //text input numeric
                        entry = entry.match(/[^\[\]]*$/)[0]
                        entry = entry.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
                         

                        correctAnswers= [ ...correctAnswers,entry];
                        tags = [...tags,"[n]"]
                        parentTag ="[n]"
                        htmlFormElements = [...htmlFormElements,
                           `   <div class="field">
                            <input  type="number" value=${entry}/></div>`
                        ];
                        humanReadableTagName="text"
                       }else if(entry.includes("[i]")){ //text input any
                        entry = entry.match(/[^\[\]]*$/)[0]
                        entry = entry.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
                        
                        correctAnswers= [ ...correctAnswers,entry];
                        tags = [...tags,"[i]"]
                        parentTag ="[i]"
                         htmlFormElements = [...htmlFormElements,
                           `   <div class="field">
                            <input  type="text" value=${entry}/></div>`
                        ];
                        humanReadableTagName="integer"
                       }else if(entry.includes("[]")){ // wrong answers
                        
                        entry = entry.match(/[^\[\]]*$/)[0]
                        entry = entry.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
                         wrongAnswers= [ ...wrongAnswers,entry];
                         tags = [...tags,"[]"]
                         //we cant accertain this now until the parent is known after loop
                       }  

                      } 
                      //make the build template after loop
                    


                    })
                    optionsTemplateBatch = [...optionsTemplateBatch,{
                      rootQuestion,
                      correctAnswers,
                      wrongAnswers,
                      tags, // for rendering
                      parentTag,
                      htmlFormElements,
                      humanReadableTagName
                    }];

                    
                    console.log(optionsTemplateBatch)
                     let accertainedGroupsOfWrongAnswers= []
                     let parts = optionsTemplateBatch.htmlFormElements;
                    if(optionsTemplateBatch.parentTag=="[x]" || optionsTemplateBatch.parentTag=="[o]"){
                       //if they are multichoices or checkboxes
                      optionsTemplateBatch.wrongAnswers.forEach(optionText =>{
                         //batch the component up 
                         if(optionsTemplateBatch.parentTag=="[x]"){
                          accertainedGroupsOfWrongAnswers = [...accertainedGroupsOfWrongAnswers,
                           `   <div class="field">
                            <p for="five">${optionText}</p>
                            <input  type="checkbox" checked/></div>`
                        ];


                         }else{
                            accertainedGroupsOfWrongAnswers = [...accertainedGroupsOfWrongAnswers,
                           `   <div class="field">
                            <p for="five">${optionText}</p>
                            <input  type="radio" checked/></div>`
                        ];
                         }
                      })

                      parts = [...parts, ...accertainedGroupsOfWrongAnswers]
                      optionsTemplateBatch.htmlFormElements = parts
                    }else if (optionsTemplateBatch.parentTag=="[d][x]"){  //dealing with select dropdown
                        let parts = optionsTemplateBatch.htmlFormElements;
                        optionsTemplateBatch.wrongAnswers.forEach(optionText =>{
                          
                          parts+=`<option>${optionText}</option>`
                        })
                        parts+=`</select>`
                        optionsTemplateBatch.htmlFormElements = [parts];


                    }


                  }
               }
            }) // out of hell fire loop
            console.log(optionsTemplateBatch) 
            

              // show the preview here na work be this o!!!
              //get all the html components and redraw the question and options
              let jqueryMagicForms = [];
              let defaultScoreSheet = 50 // passmark

              //watch out for my version 2.0 . WHERE QUESTENCE WILL BE A KILLER APP
              
              optionsTemplateBatch.forEach(questenceAuthoringQuestionSeries => {
                  //awesomeness
                  const { 
                    rootQuestion, 
                    htmlFormElements, 
                    correctAnswers, 
                    wrongAnswers,
                    humanReadableTagName
                 } = questenceAuthoringQuestionSeries;
                 templateRenderer+=`<h4>${rootQuestion}</h4>`;
                 let formid =Math.random(9)*2000+ new Date().toString()
                 let formm =`<form method="POST" id="magic-questence-qna-${formid}"></form>"`
                 let magicHiddenForms = $(formm) // the auto processor for each questin to be saved
                  //ABSTRACT THE URL POINT FOR NOW
                  magicHiddenForms.attr("method","POST")
                 //this is already in html so spit it out
                 //generate all the form for each of the components questions regarding the fields below
                  
                  let text = `<input type="text" name="text" value="${rootQuestion}" />`
                  let question_type = `<select name="question_type"><option  value="${humanReadableTagName}" />${humanReadableTagName}<option></select>`
                  let correct_answer = [...correctAnswers]
                  correct_answer =  `<textarea  name="correct_answer" value="" >${correct_answer.join(",")}</textarea>`
                  let mark = `<input type="text" name="mark" value="${defaultScoreSheet}"  />`
                  let allowedHeaders = $("#slideout-questions").attr("problem_no_dey_finish") //lol
                  let choices = [...correctAnswers,...wrongAnswers];
                  choices =  `<textarea name="choices" >${choices.join()}</textarea>` // by default all the questions are required
                  let required=`<input type="text" name="required" checked />`
                  //yes the problem component is just one parent trying to reach out to the children questions
                  let problem = `<input type="text" name="problem" value=${allowedHeaders} />`
                  magicHiddenForms.append(text);
                  magicHiddenForms.append(question_type);
                  magicHiddenForms.append(correct_answer);
                  magicHiddenForms.append(mark);
                  magicHiddenForms.append(choices)
                  magicHiddenForms.append(problem);  //abrakadabra hehehehe!!!
                  jqueryMagicForms = [...jqueryMagicForms,magicHiddenForms]


                  // get the triggered problem component id to which it will be added from the injector instread of storage
                  //this is a run time approach


                 htmlFormElements.forEach(questionAndAnserSeries => {
                    templateRenderer+=questionAndAnserSeries
                    templateRenderer+=`<hr/>` // space for next question
                 });
              })

               let rawTemplate = templateRenderer;
               rawTemplate = rawTemplate.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
               let finalTemplatePreview =""
                //q & a build the ui jacket dynamically for preview
               finalTemplatePreview+=`<form class="problems-questions">
                <br/><h4>${rawTemplate}</h4>
                <div class='field form-actions'>
                  <div style="background:green;cursor:pointer;color:#000" onclick="questionHelperNotification(event)"
                   class="setMove button  btn btn-success pull-left" type='submit'>Done</div>

                  
                </div></form>
                `;

                $("#saveQuestionActions").click(()=>{
                  //process the multiple enrolled question batched up after preview
                  //also we build the hidden saving form so that when user decided to save
                  //the record after preview everything is created at that instance
                  //this is not the traditional way of saving one record at a time
                  //all records are saved on click on the go
                  // yes life is too short 
                  //write better automated codes
                  

                  //for each form send the mail man to post
                   let magicUrl = "/lms/api/create/question/"
                  jqueryMagicForms.forEach((magicEffects) =>{
                    console.log(magicEffects.html())
                     //// make it happen TADA!!!
                     let res = createAnyResource("POST",magicUrl,magicEffects);

                  })
                })

               

                

                
            console.log(finalTemplatePreview)
            const extractedText = finalTemplatePreview
            content = content.replace(matchesFull[0], extractedText  );
            content = content.replace(/^\s+|\s+$|\s+(?=\s)/g, "");


            // yes we are clean to save all the generated html build to db
            //this is another journey to hell
            //na serious work be this one o

            //Logic of the question frontend workflow saving to db
            //say you entered 100 questions and have previewed a button pops up 
            //asking you to click done
            // if you click done then a button shows to save changes
            //only when you click save changes 
            //will for each question and answer 
                    // dynamically create 100 hidden forms on the fly
                     // generate 100*7 input detail fields of the form
                     //then submit the 100 question* 7 field data to database
                     //this is a multiple submission process
                     //END OF THE BIG QUESTION COMPONENT WAHALA CAUSED BY PROBLEM COMPONENT 

            


            // Example: # Heading 1
            if( h1.test( content ) ) {
              const matches = content.match( h1 );
              //console.log(matches)
              matches.forEach( element => {
                const extractedText = element.slice( 1 );
                content = content.replace( element, '<h1>' + extractedText + '</h1>' );
              } );
            }

         }
        

         


        // Example: # Heading 1
        if( h1.test( content ) ) {
          const matches = content.match( h1 );
          console.log(matches)
          matches.forEach( element => {
            const extractedText = element.slice( 1 );
            content = content.replace( element, '<h1>' + extractedText + '</h1>' );
          } );
        }

        // Example: # Heading 2
        if( h2.test( content ) ) {
          const matches = content.match( h2 );

          matches.forEach( element => {
            const extractedText = element.slice( 2 );
            content = content.replace( element, '<h2>' + extractedText + '</h2>' );
          } );
        }

        // Example: # Heading 3
        if( h3.test( content ) ) {
          const matches = content.match( h3 );

          matches.forEach( element => {
            const extractedText = element.slice( 3 );
            content = content.replace( element, '<h3>' + extractedText + '</h3>' );
          } );
        }

        // Example: **Bold**
        if( bold.test( content ) ) {
          const matches = content.match( bold );

          matches.forEach( element => {
            const extractedText = element.slice( 2, -2 );
            content = content.replace( element, '<strong>' + extractedText + '</strong>' );
          } );
        }

        // Example: *Italic*
        if( italics.test( content ) ) {
          const matches = content.match( italics );

          matches.forEach( element => {
            const extractedText = element.slice( 2, -1 );
            content = content.replace( element, ' <em>' + extractedText + '</em>' );
          } );
        }

        // Example: [I'm an inline-style link](https://www.google.com)
        if( link.test( content ) ) {
          const links = content.match( link );

          links.forEach( element => {
            const text = element.match( /^\[.*\]/ )[ 0 ].slice( 1, -1 );
            const url = element.match( /\]\(.*\)/ )[ 0 ].slice( 2, -1 );

            content = content.replace( element, '<a href="' + url + '">' + text + '</a>' );
          } );
        }

        if( lists.test( content ) ) {
          const matches = content.match( lists );

          matches.forEach( list => {
            const listArray = list.split( '\n' );

            const formattedList = listArray.map( ( currentValue, index, array ) => {
              if( unorderedList.test( currentValue ) ) {
                currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

                if( !  unorderedList.test( array[ index - 1 ] ) && ! unorderedSubList.test( array[ index - 1 ] ) ) {
                  currentValue = '<ul>' + currentValue;
                }

                if( !  unorderedList.test( array[ index + 1 ] )  &&  ! unorderedSubList.test( array[ index + 1 ] ) ) {
                  currentValue = currentValue + '</ul>';
                }

                if( unorderedSubList.test( array[ index + 1 ] ) || orderedSubList.test( array[ index + 1 ] ) ) {
                  currentValue = currentValue.replace( '</li>', '' );
                }
              }

              if( unorderedSubList.test( currentValue ) ) {
                currentValue = currentValue.trim();
                currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

                if( ! unorderedSubList.test( array[ index - 1 ] ) ) {
                  currentValue = '<ul>' + currentValue;
                }

                if( ! unorderedSubList.test( array[ index + 1 ] ) && unorderedList.test( array[ index + 1 ] ) ) {
                  currentValue = currentValue + '</ul></li>';
                }

                if( ! unorderedSubList.test( array[ index + 1 ] ) && ! unorderedList.test( array[ index + 1 ] ) ) {
                  currentValue = currentValue + '</ul></li></ul>';
                }
              }

              if( orderedList.test( currentValue ) ) {
                currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

                if( ! orderedList.test( array[ index - 1 ] ) && ! orderedSubList.test( array[ index - 1 ] ) ) {
                  currentValue = '<ol>' + currentValue;
                }

                if( ! orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) && ! orderedList.test( array[ index + 1 ] ) ) {
                  currentValue = currentValue + '</ol>';
                }

                if( unorderedSubList.test( array[ index + 1 ] ) || orderedSubList.test( array[ index + 1 ] ) ) {
                  currentValue = currentValue.replace( '</li>', '' );
                }
              }

              if( orderedSubList.test( currentValue ) ) {
                currentValue = currentValue.trim();
                currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

                if( ! orderedSubList.test( array[ index - 1 ] ) ) {
                  currentValue = '<ol>' + currentValue;
                }

                if( orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) ) {
                  currentValue = currentValue + '</ol>';
                }

                if( ! orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) ) {
                  currentValue = currentValue + '</ol></li></ol>';
                }
              }

              return currentValue;
            } ).join( '' );

            console.log( formattedList );
            content = content.replace( list, formattedList );
          } );
        }

        

        return content.split( '\n' ).map( line => {
          if( ! h1.test( line ) && ! h2.test( line ) && ! h3.test( line ) && ! unorderedList.test( line ) && ! unorderedSubList.test( line ) && ! orderedList.test( line ) && ! orderedSubList.test( line ) ) {
            return line.replace( line, '<p>' + line + '</p>' );
          }
        } ).join( '' );
}



  /*{key:val}, ["id","name", "email"]*/
  /*used only when necessary in search for instructor by either email or name field*/
  aidedSearchForInstructor(givenObj){
     let lists = []
     Object.entries(givenObj).forEach( (arr,index) =>{
        console.log(arr)
       if( arr.includes("id") && arr.includes("name") || arr.includes("email") ){
          var batchHash = {};
          batchHash["id"] = arr[1] // or batchHash[arr[0]] = arr[1]
          lists.push(batchHash)
       }
     })
     return lists;
  }

  transformObject(obj){
    return  Array.from(obj)
  }

  //fill form data automatically if the course exists
  fill(a){

   
  let lead = null;
  let authoring_team = []
  let tmpPre =``
	let textEditors = ["learning_expectation","description",  "overview", "curriculum"]
    for(var k in a){
		console.log(k +" : "+ a[k])
      if(k=="prerequisite"){
         
         localStorage.setItem(k,a[k])
        
          
        

      }
      else if(k=="authoring_team" && a[k].length<=0){

        if(a[k]==null){
            lead = a.author || localStorage.getItem("author")
            authoring_team.push(lead);
          
            localStorage.setItem("authoring_team",[lead].concat([]))
            $('select[name="'+k+'"]').attr('selected', $(this).text() == a[k]);
          
        }else {
         lead = a.author || localStorage.getItem("author")
            authoring_team.push(lead);
          
          localStorage.setItem("authoring_team",[lead,...a[k]].concat([]))
             $('select[name="'+k+'"]').attr('selected', $(this).text() == a[k]);
          
        }

    }else if(k=="authoring_team" && a[k].length > 0){
         $('select[name="'+k+'"]').attr('selected', $(this).text() == a[k]);
          
    
         
   }else {



        if(k=="auditing"){
              if(a[k]==true || a[k]=="true"){
                 // let valueSelector =`select option[value="${a[k]}"]`
                 $('select[name="'+k+'"] option').attr('selected', $(this).text().toLowerCase() == a[k].toString());
                 //document.querySelectorAll('select[name="'+k+'"] option[value=valueB]')[1].text
              }else{
                 // let valueSelector =`select option[value="${a[k]}"]`
                 $('select[name="'+k+'"] option').attr('selected', $(this).text().toLowerCase() == "false");
           
              }
                
                      
        }

  
         
              //check if name is part of a dropdown then select the dropdown or make it checked
          if($('select[name="'+k+'"]') && k!=="authoring_team"){
            if(a[k]==null){
              a[k] =""
              localStorage.setItem(k,a[k])
            
            }else{
              localStorage.setItem(k,a[k])
              
            }


            if(k=="entrance_exam_required"){
              if(a[k]==true || a[k]=="true"){
                 // let valueSelector =`select option[value="${a[k]}"]`
               $('select[name="'+k+'"] option').attr('selected', $(this).text().toLowerCase() == a[k].toString());
             //document.querySelectorAll('select[name="'+k+'"] option[value=valueB]')[1].text
              }else{
                 // let valueSelector =`select option[value="${a[k]}"]`
               $('select[name="'+k+'"] option').attr('selected', $(this).text().toLowerCase() == "false");
           
              }
                
                      
            }else if(k=="auditing"){
              if(a[k]==true || a[k]=="true"){
                 // let valueSelector =`select option[value="${a[k]}"]`
                 $('select[name="'+k+'"] option').attr('selected', $(this).text().toLowerCase() == a[k].toString());
                 //document.querySelectorAll('select[name="'+k+'"] option[value=valueB]')[1].text
              }else{
                 // let valueSelector =`select option[value="${a[k]}"]`
                 $('select[name="'+k+'"] option').attr('selected', $(this).text().toLowerCase() == "false");
           
              }
                
                      
            }else{
              $('select[name="'+k+'"]').attr('selected', $(this).text() == a[k]);
        

            }







         
           
          }

        


        //check if k is a rich text editor content
        if(textEditors.includes(k)){
          //inject to text editor
          localStorage.setItem(k,a[k])
          var myEditor = $('div[data-placeholder="'+k+'"]') // the editor itself
              //myEditor = myEditor.children[0];
          let html = a[k] || "Place your content for editing with rich text editor";
          myEditor.html(html);
        }


          if($('textarea[name="'+k+'"]')){
          localStorage.setItem(k,a[k])
             $('textarea[name="'+k+'"]').val(a[k]);
          }

          //if input type of file for image
          if($('input[type="file"]') && a[k]?.length>0){
            $('input[name="'+k+'"]').val(a[k]);
            localStorage.setItem(k,a[k])
          }else{

          if($('[name="'+k+'"]') && k!=="authoring_team"){
            localStorage.setItem(k,a[k])
            $('[name="'+k+'"]').val(a[k]);


           }

         }


        }




        if(k=="entrance_exam_required"){
              if(a[k]==true){
                 // let valueSelector =`select option[value="${a[k]}"]`
             $('select[name="'+k+'"] option').attr('selected', $(this).text().toLowerCase() == a[k]);
             //document.querySelectorAll('select[name="'+k+'"] option[value=valueB]')[1].text
              //document.querySelector('select[name="'+k+'"]').selectedIndex = "2";
              }else{
                 // let valueSelector =`select option[value="${a[k]}"]`
              $('select[name="'+k+'"] option').attr('selected', $(this).text().toLowerCase() == a[k]);
                //document.querySelector('select[name="'+k+'"]').selectedIndex = "1";
              }
                
                      
        }




        // if(k=="auditing"){
        //       if(a[k]==true || a[k]=="True" || a[k]=="true"){
        //          // let valueSelector =`select option[value="${a[k]}"]`
        //      $('select[name="'+k+'"] option').attr('selected', $(this).text().toLowerCase() == a[k].toString());
        //      //document.querySelectorAll('select[name="'+k+'"] option[value=valueB]')[1].text
        //       //document.querySelector('select[name="'+k+'"]').selectedIndex = "2";
        //       }else{
        //          // let valueSelector =`select option[value="${a[k]}"]`
        //       $('select[name="'+k+'"] option').attr('selected', $(this).text().toLowerCase() == "false");
        //         //document.querySelector('select[name="'+k+'"]').selectedIndex = "1";
        //       }
                
                      
        //}
      
    }

    $(".display-board").css({display:"block"})
 }

 getCourseIdFromUrl(url) {
  const hashIndex = url.indexOf('#')
  url = hashIndex !== -1 ? url.substring(0, hashIndex) : url
  return (url.split('/').pop() || '').replace(/[\?].*$/g, '')
} 

 getAllFormElements = element => Array.from(element.elements).filter(tag =>  ["select", "textarea", "input"].includes(tag.tagName.toLowerCase()));

 fetchContent = async () => {

  $("#none-display").css({"opacity":0}).fadeOut("fast")
   let instId = this.state.institution
   let author =""
   try{
    this.courseData = await this.courseDetailJson();
   

   //ensure to get the course id real even if browser data has change url
   let sanitizedId = this.getCourseIdFromUrl(this.props.match.params.id)
   localStorage.setItem("course_edit",sanitizedId);
   //automated logic
    Promise.all(
      [
        getLanguages(),
        getCourses(),
        getInstitutions(),
        getInstructorProfiles(),
        getCourse(sanitizedId),
        getSectionsOfCourseId(sanitizedId),
        getGroups(),
        // getSubsectionsOfSectionId(secId)
      ].map((err) => err.catch(() => console.log( err)))
    )
      .then((res) => {

        if(res && typeof res[0]!=="undefined" ){


            

            // console.log(typeof res[0])
            // if(typeof ( res[2].results) == "Array") {
            //   // do nothing
            // }else{

              // alert(typeof res[2].results )
              // console.log(Array.from(res[4].results))

              this.setState({
              languages: res[0].data.data, // from enrollments this is already an array
              courses:  this.transformObject(res[1].results), 
              //from lms  this needs to be reformed
              //the backend guy can not easily simplify data sent as response back to json he is sending python data dictionary as json can u imagine?? 
              institutions: this.transformObject(res[2].results), // reformation needed
              instructors: this.transformObject(res[3].results),  // reformation needed
              currentCourseId: res[4]?.id, //just an object
              sections:res[4]?.results,
              groups: this.transformObject(res[5]?.results), //used in problem component
            })
            //now dynamically fill in the form
            this.fill(res[4]) 

            $("#none-display").css({"opacity":1}).fadeIn("slow")    
//          }

      }
        
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        return false
        // toast.error("Error Occured fetching data");
        // setLoading(false);
      });




   }catch(e){
    return false
   }
   


  }

  reorder(response){

    

  }




  htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim(); // Never return a space text node as a result
    temp.innerHTML = html;
    return temp.content.firstChild;
  }


+
  sorted_by_position_id = (arr) =>{
     return arr.sort((a, b) => {
       return a.position_id - b.position_id;
     });
  } 


  /*everything belonging to course*/
  courseDetailJson = async () => {
    let BIG_JSON ={}
    let courseData =null
    try{
       BIG_JSON  = await getCourseData(this.props.match.params.id);
       console.log(BIG_JSON)
          courseData = BIG_JSON.course_sections;
       courseData = this.sorted_by_position_id(courseData) // sorts by position id

   //resort sections by their position id before d*splay*n



  let  author = BIG_JSON?.author
  let institution = BIG_JSON?.institution
  let prerequisite = BIG_JSON?.prerequisite
 
  //fill the author field form once 
  if(author?.length>0){
     try{
      let Instructor = await getInstructorProfile(author)
       console.log(Instructor)
       
       if(Instructor){
         $("#author-name").val(Instructor.profile.first_name+ "  " + Instructor.profile.last_name)
       }

     }catch(e){

     }
       
   }


   //get institution by name tag
   if(institution?.length> 0){
   // alert("here was true")
    let selectTepInst =`option[value=${institution}]`
     $(selectTepInst).prop("selected",true)
  
   }
   
   
   //IF REGEX MATCHES AN ARRAY OF PREREQUISITES THEN LOOP THE SELECTED ONES

     
     if(prerequisite?.length> 0 &&  prerequisite?.match(/[\[\.*\]]/)){
      alert(true)
       let temp_prerequisite = JSON.parse(prerequisite)
       for(var i=0; i< temp_prerequisite.length; i++){
        $('#prerequisite option[value="'+temp_prerequisite[i]+'"]').attr("selected", "selected")
        .css({background:"rgba(8,23,200)", color:"#fff"})
       }
     }
       
    }catch(e){
       console.log(e)
       return false
    }

   
   

   
    
   let temp =``;
   let tempArr =[];
   let tempArrLessons = [];
  


   // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
   //    setTimeout(removeLoader,10000); //wait for page load PLUS two seconds.
     
     courseData.forEach( async (section) =>   {

      if(!document.getElementById(section.id)){

                 let insertionId =section.id
 
     let templateData =`
  <li open id="${insertionId}" 
  data-belongs="${section.course}"
  data-name="${section.name}"
  data-idx="${insertionId}"
  data-root-parent="${insertionId}" 
         
          data-description="${section.description}"

   data-parent="${insertionId}" data-restriction="${
    "miller_" + insertionId
  }"    data-id="${
    "miller_" + insertionId
  }" id="dynamic_section_${insertionId}"  class="hello-move-me sections  root-li view tr-of-root opened col-md-12 ${
    "miller_" + insertionId
  } section-list" >

   <h4 class="card-box" style="background:rgba(8,23,200);margin-bottom:30px; margin-right:10px;padding:10px; ">
   <a style="color:#fff"
         data-belongs="${section.course}"
         data-idx="${insertionId}"
         data-name="${section.name}"
          data-pos="${section.position_id}"
          data-id="${"miller_" + insertionId}"
          data-root-parent="${insertionId}"
          onclick="localStorage.setItem('given_id','dynamic_section_'+'${insertionId}');localStorage.setItem('tracker','${insertionId}');showSetSubsection(this);"           
          >
           <span class="content-entry"><i class="fa fa-chevron-down "></i></span>
    </a>
     <span class="tits section__name title-given first-child-of-td export_title" style="font-size:20px;color:#fff"> ${
       section.name + " " + section.position_id  || "Section " + insertionId
     }</span>
      <span class="per action card-box" style="float:right;background:rgba(8,23,200);padding:10px;margin-top:-50px;border-20px solid #ccc">
      <a style="margin-right:10px;color:#fff"
                  
         data-belongs="${section.course}"
         data-name="${section.name}"
          data-pos="${section.position_id}"
          data-idx="${insertionId}"
          data-root-parent="${insertionId}"
                   href="#myModalSubsection" role="button" data-toggle="modal"
                   onclick='setTargetItem("${insertionId}")'
                  >
                
                    <i class="fa fa-plus "></i>
        </a>

        <a style="margin-right:10px;color:#fff"
            href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${"miller_" + insertionId}"
          data-eid="${insertionId}"
          data-id="${"miller_" + insertionId}"
          data-idx="${insertionId}"
          data-name="${section.name}"
          data-pos="${section.position_id}"
          data-description="${section.description}"
          data-belongs="${section.course}"
          data-root-parent="${insertionId}"
          data-modal="myModalEdit"

            onclick="injectToModal(this);localStorage.setItem('given_id','dynamic_section_'+'${insertionId}');localStorage.setItem('tracker','${insertionId}');"       
          >
                
          <i class="fa fa-edit "></i>
        </a>


        <a style="margin-right:10px;color:#fff"
          data-extint="section"
           data-belongs="${section.course}"
          data-idx="${insertionId}"
          data-name="${section.name}"
          data-pos="${section.position_id}"
          data-description="${section.description}"
          data-id="${"miller_" + insertionId}"
          data-root-parent="${insertionId}"
           onclick="genericDelete(this)"        
          >
                
          <i class="fa fa-trash "></i>
        </a>



         <a class="" style="margin-right:10px;color:#fff"
          data-extint="section"
         data-belongs="${section.course}"
          data-idx="${insertionId}"
          data-name="${section.name}"
          data-pos="${section.position_id}"
          data-description="${section.description}"
          data-id="${"miller_" + insertionId}"
          data-root-parent="${insertionId}"
           onclick="replicateSection(this)"
                        
          >
         <i class="fa fa-copy "></i>
        </a>
         <a class="drag-handle"  
         data-belongs="${section.course}"
         data-belongs="${section.course}"
         data-idx="${insertionId}"

          data-name="${section.name}"
          data-pos="${section.position_id}"
          data-description="${section.description}"
          data-root-parent="${insertionId}"
          


          style="margin-right:10px;color:#fff">
         <i class="fa fa-arrows "  data-belongs="${section.course}"
         data-belongs="${section.course}"

          data-name="${section.name}"
          data-pos="${section.position_id}"
          data-description="${section.description}"></i>
        </a>

        


        
        <a class="dropright dropright "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
                <i class="fa fa-ellipsis-v " style="color:#fff"></i>
             
        <ul class="dropdown-menu" style="margin-left:40px" >
                <li><a class="dropdown-item" href="#myModalSubsection" role="button" 
                data-toggle="modal"
                data-id="${"miller_" + insertionId}"
                   onclick="localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});"
                  >Add</a></li>

                  

                <li><a class="dropdown-item"   href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${"miller_" + insertionId}"
          data-idx="${insertionId}"
          data-name="${section.name}"
          data-pos="${section.position_id}"
          data-description="${section.description}"
          data-modal="myModalEdit"
          data-belongs="${section.course}"
          data-root-parent="${insertionId}"

            onclick="injectToModal(this);localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});"       
          >Edit </a></li>
                
             
           </ul>
         </a>

          <a style="margin-right:10px;color:#fff"
        
          data-id="${"miller_" + insertionId}"
          data-belongs="${section.course}"
          data-root-parent="${insertionId}"
          onclick="showSetSubsection(this);localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});"
                
          >

</a><br/>
          
<span style="font-size:12px;color:#fff">Section ${section.position_id} contains (${section.section_sub_sections.length}) Subsection</span>
         
          
              
        </span>
        </h4>
</li>

    `;

               $("#js-parent").append(templateData);
               enableDragSortPositionUpdater("drag-sort-enable","hello-move-me")
      }

     
     

      if(section.section_sub_sections){
         tempArr = section.section_sub_sections;
         tempArr = this.sorted_by_position_id(tempArr)


            // still our parent remain the same to transverse up the object while checkmates changes
            tempArr.forEach(async (subsec,indexer)=> {

              if(!document.getElementById(subsec.id)){

                let muu_counter =subsec.id
 
      let templateSub = `
         <ul 
          data-name="${subsec?.name}"
          data-belongs="${subsec.section}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"
          data-pos="${subsec.position_id}"
          data-idx="${subsec.id}"
          data-root-parent="${subsec.id}"
          
         
         id="dynamic_subsection_${subsec.id}"  data-id="${
    "muu_" + muu_counter
  }" class="fold subsections accordion-content hello-move-me drop-zone-section root-sub-ul view opened centerSubsection column-list-section-parade ${
    "muu_" + muu_counter
  } col-md-10 section-parent_${localStorage.getItem(
    "tracker"
  )} subsection-child_${localStorage.getItem(
    "s_tracker"
  )} " style="min-width:99%;width:99%;border-bottom:none;border-top:none;margin-left:10px"


  >
     <h4 class="card-box" style="background:#f6f6f6; margin-right:10px;padding:10px">
            
              <span class=""  style="height:60px;margin-top:10px">
			  <span ><i class="fa fa-chevron-down " style="color:#000"></i></span>
               <span id="title_sub_${subsec.id}" class="title_sub title-given export_title" data-th="Company name" style="font-size:20px;color:#000">${
                 subsec?.name + " " + subsec?.position_id  || "Subsection"
               }</span>
                <span class="subsect" data-th="Customer no"></span>
                <span data-th="Customer name"></span>
                <span class="action card-box" style="float:right;background:#eaeaea;padding:4px;margin-top:-30px;border:2px solid #ccc" data-th="Customer nam"  >
       
       <a    href="#myModalLesson" role="button" data-toggle="modal"
       style="margin-right:10px;color:#000"
          data-id="${"muu_" + muu_counter}"
          data-idx="${subsec.id}"
           data-idx="${subsec.id}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"
          data-modal="myModalSubSectionEdit"
           data-belongs="${subsec.section}"

            onclick='addlessonSection(this);setTargetSubsectionItem("${muu_counter}") '      
          ><i class="fa fa-plus"></i></a>


        <a style="margin-right:10px;color:#000"
            href="#myModalSubSectionEdit" role="button" data-toggle="modal"
          data-id="${"muu_" + muu_counter}"

           data-idx="${subsec.id}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"
          data-modal="myModalSubSectionEdit"
           data-belongs="${subsec.section}"


            onclick="injectToModal(this);"       
          >
                
          <i class="fa fa-edit "  data-idx="${subsec.id}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"
          data-modal="myModalSubSectionEdit"
           data-belongs="${subsec.section}"
></i>
        </a>


        <a style="margin-right:10px;color:#000"
          data-extint="subsection"

          data-idx="${subsec.id}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"
           data-belongs="${subsec.section}"

          data-id="${"muu_" + muu_counter}"
           onclick="genericDelete(this)"        
          >
                
          <i class="fa fa-trash "  data-extint="subsection"

          data-idx="${subsec.id}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"
           data-belongs="${subsec.section}"
></i>
        </a>


        <a style="margin-right:10px;color:#000"
          data-extint="subsection"

           data-idx="${subsec.id}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"
           data-belongs="${subsec.section}"

          data-id="${"muu_" + muu_counter}"
           onclick="replicateSubSection(this)"        
          >
                
          <i class="fa fa-copy"></i>
        </a>


        


         <a  class="drag-handle-list" style="margin-right:10px;color:#000"
          
          data-idx="${subsec.id}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"
           data-belongs="${subsec.section}"

          data-id="${"muu_" + muu_counter}"
                 
          >

         <i class="fa fa-arrows " data-idx="${subsec.id}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"
           data-belongs="${subsec.section}"></i>
        </a>





         <a class="dropright dropright "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
                <i class="fa fa-ellipsis-v " style="color:#000"></i>
             
        <ul class="dropdown-menu" style="margin-left:40px" >

  <li><a class="dropdown-item"   href="#myModalLesson" role="button" data-toggle="modal"
          data-id="${"muu_" + muu_counter}"
          data-idx="${subsec.id}"
            onclick='addlessonSection(this);setTargetSubsectionItem("${muu_counter}") '      
          >Add</a></li>

                

                <li><a class="dropdown-item"    href="#myModalSubSectionEdit" role="button" data-toggle="modal"
          data-id="${"muu_" + muu_counter}"
           data-idx="${subsec.id}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec?.section}"
          data-belongs="${subsec?.section}"

          data-modal="myModalSubSectionEdit"
            onclick="injectToModal(this)"       
          >Edit </a></li>



               


                <li><a class="dropdown-item" 
                 data-id="${"muu_" + muu_counter}"
                 data-idx="${subsec.id}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
           data-parent-id="${subsec?.section}"
            data-belongs="${subsec.section}"
          data-modal="myModalSubSectionEdit"
                onclick="replicateSubSection(this);localStorage.setItem('given_sid','dynamic_subsection_'+${muu_counter});localStorage.setItem('s_tracker',${muu_counter});"

                >Copy</a></li>
                
           </ul>
         </a>
         <br/>
     <span style="font-size:12px;color:#000">Subsections (${subsec.position_id}) contains (${subsec.sub_section_lessons.length}) Lessons </span>
         
                </span>
      </li>

      </h4>
    </ul>
`;
                $("#"+ subsec.section).append(templateSub);

                enableDragSortPositionUpdater("sections","hello-move-me")
              }
              let respLessons = subsec.sub_section_lessons
              respLessons = this.sorted_by_position_id(respLessons)
              
               respLessons.forEach( (lessons) =>{
                   if(!document.getElementById(lessons.id)){

                      let muu_counter = lessons.id;

  
  // alert(localStorage.getItem("lesson_component"))
  let panel_class =  $(".muu_" + localStorage.getItem("s_tracker"));  // $("." + localStorage.getItem("lesson_component")) //  $(".muu_" + localStorage.getItem("s_tracker"));
 
// onDragStart="dragStart(event)" onDragEnd="dragEnd( event )"
  let rndId = "dynamic_subsection_" + lessons.id + "_lesson_component"
  let templateLesson = ` 
      <ul id="${rndId}"  data-id="${
    "muu_" + muu_counter}"
    
          data-idx="${muu_counter}"
          data-name="${lessons?.name}"
          data-pos="${lessons?.position_id}"
          data-description="${lessons?.description}"
           data-parent-id="${lessons.subsection}"
        
          data-description="${lessons?.description}"
     class="reaper-${muu_counter} lessons hello-move-me accordion-content fold root-lesson-ul view opened draggable dynamo_${localStorage.getItem("l_tracker")}  ${
    "muu_" + muu_counter
  } col-md-8   section-parent_${localStorage.getItem(
    "tracker"
  )} subsection-child_${localStorage.getItem(
    "s_tracker"
  )} " style="margin-right:20px; background:#fff; min-width:98%;width:98%" 
   dragable="true"  
  
   >

        <li class="fold-content">
  
    <h4 style="background:rgba(8,20,200); margin-right:10px;padding:10px">
	<span class="content-entry"><i class="fa fa-chevron-down " style="color:#fff"></i></span>
               <span id="title_sub_${lessons.id}" class="title_sub title-given export_title" data-th="Company name" style="font-size:20px;color:#fff">${
                 lessons.name || "Lesson" }
               </span>
                <span class="subsect" data-th="Customer no"></span>
                <span class="action card-box" style="float:right;background:rgba(8,23,200);padding:10px;margin-top:-50px;border-20px solid #ccc" data-th="Customer nam"  >



        <a  style="margin-right:10px;color:#fff"  
          data-id="${"lmuu_" + muu_counter}"
          data-idx="${muu_counter}"
          data-name="${lessons?.name}"
          data-pos="${lessons?.position_id}"
          data-description="${lessons?.description}"
           data-parent-id="${lessons.sub_section}"
            onclick='showComponentModal(this);setTargetLessonComponent("${muu_counter}")'      
          ><i class="fa fa-plus "></i></a>



          <a class="text-white"   href="#myModalEditLesson" role="button" data-toggle="modal"
          data-id="${"lmuu_" + muu_counter}"
          data-idx="${muu_counter}"
          data-name="${lessons?.name}"
          data-pos="${lessons?.position_id}"
          data-description="${lessons?.description}"
           data-parent-id="${lessons?.sub_section}"
           data-modal="myModalEditLesson"
           
            onclick='injectToModal(this);setTargetLessonComponent("${muu_counter}")'       
          ><i class="fa fa-edit "></i></a>

       


        <a style="margin-right:10px;color:#fff"
          
          data-id="${"lmuu_" + muu_counter}"
          data-extint="lesson"

          data-idx="${muu_counter}"
          data-name="${lessons?.name}"
          data-pos="${lessons?.position_id}"
          data-description="${lessons?.description}"
           data-parent-id="${lessons?.sub_section}"
           onclick="genericDelete(this)"        
          >
                
          <i class="fa fa-trash "></i>
        </a>


         <a
          data-name="${lessons?.name}"
        
          data-description="${lessons?.description}" 

         class="drag-handle-list-lessons" style="margin-right:10px;color:#fff"
          data-id="${"lmuu_" + muu_counter}"
          data-idx="${muu_counter}"
          data-template="dynamic_subsection_${muu_counter}_lesson_component "
           
           onclick='setTargetLessonItem("${muu_counter}")'
                 
          >

         <i class="fa fa-arrows "
            data-name="${lessons?.name}"
        
          data-description="${lessons?.description}"

         ></i>
        </a>
         <a class="dropright dropright "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-ellipsis-v " style="color:#fff"></i>
        <ul class="dropdown-menu" style="margin-left:40px" >
                <li><a class="dropdown-item"   href="#myModalEditLesson" role="button" data-toggle="modal"
          data-id="${"lmuu_" + muu_counter}"
          data-idx="${muu_counter}"
          data-name="${lessons?.name}"
          data-pos="${lessons?.position_id}"
          data-description="${lessons?.description}"
           data-parent-id="${lessons?.sub_section}"

           data-modal="myModalEditLesson"
           onclick='injectToModal(this);setTargetLessonComponent("${muu_counter}")'       
                
          >Edit </a></li>



                <li><a class="dropdown-item"   
          data-id="${"lmuu_" + muu_counter}"
            onclick='showComponentModal(this);setTargetLessonComponent("${muu_counter}")'      
          >Add Component</a></li>


                <li><a class="dropdown-item" 
                 data-id="${"lmuu_" + muu_counter}"
                onclick='setTargetLessonComponent("${muu_counter}")'

                >Copy</a></li>
                
           </ul>
         </a><br/>
		 <span style="font-size:12px;color:#fff">Lesson ${lessons.position_id} contains (${lessons.lesson_components.length}) modules </span>
         



                </span>

                </h4>
</li></ul>`;

                    $("#dynamic_subsection_"+ lessons.sub_section).append(templateLesson);
                  
                    enableDragSortPositionUpdater("subsections","hello-move-me")          
      
                  }

                   let courseComponents = lessons.lesson_components
                   console.log(courseComponents)


                  courseComponents.forEach(component => {
                    //console.log(component)
                     let playVideoEnabled = " ";
                      let launchPad ="#myModalMarkdownEditor"
                      let form = ""
                      let actionBuilder = `/html-component/${component.id}/`
                      let Info = "IFRAME/VIDEO EDITABLE COMPONENT"
                      let readmoreInitialized = "none";
                      let enableLink ="none";
                      let textualData = "";
                      let questionTeplateButton = false

                      if(component.component_type ==1){
                        launchPad ="#myModalGenericFormEditorEditMode"
                        form = "myModalGenericForm-SELECT"
                        actionBuilder = `/video-component/${component.id}/`
                      }else if(component.component_type ==2) {
                        launchPad ="#myModalMarkdownEditor"
                        Info = "HTML TEXT EDITABLE COMPONENT"
                        form="myModalMarkdownEditor-SELECT"
                        actionBuilder = `/html-component/${component.id}/`
                      }else if(component.component_type ==3){
                        launchPad ="#openModal-about"
                        Info = "HTML PROBLEM COMPONENT"
                        form = "myModalProblemForm-SELECT"
                        actionBuilder = `/problem-component/${component.id}/`
                        
                        questionTeplateButton =`<a role="button"
                        data-toggle="modal" 
                        style="cursor:pointer" data-self="${component.id}" 
                        data-append="${component.lesson}" 
                        data-getitup="${component.id}" 
                      onclick="window.event.preventDefault();swapProblemDisplayBoard(this)"  
                         href="" class="pull-right">
                           <i style="color:#000" data-self="${component.id}"  
                           data-getitup="${component.id}" 
                           class="fa fa-plus fa-2x">Add a question </i></a>`
                      

                      }else if(component.component_type ==4){
                        //not implemented the ui for this
                        launchPad ="#openModal-about2"
                        Info = "HTML DISCUSSION COMPONENT"
                        form = "myModalDiscussionForm-SELECT"
                        actionBuilder = `/discussion-component/${component.id}/`
                        


                      }

                      if(component.embedded_url){
                        playVideoEnabled = `<a role="button"
              data-toggle="modal" href="#modalFullScreenPreviewIframeAndVideos" data-videolink="${component.embedded_url}" onclick="videoModalPreview(this)" style="cursor:pointer;padding:10px;border-radius:50%;color:#000"><i  class="fa fa-video-camera fa-2x"></i></a>`
                        enableLink ="block"
                      }
                     
                      if(component?.html_text  || (component.component_type==4 &&  component.description)){
                        readmoreInitialized ="block"
                         textualData = component?.html_text || component.description
                      }

                      if(component?.component_type){}

                      //if component is  problem or discussion

                      if(!document.getElementById(component.id)){
                        let  tempComponent = `<ul data-id="${component.id}"
          data-name="${component?.name}"
               data-idx="${component.id}"
          data-parent="${component.lesson_id}"
          data-pos="${component.position_id}"
          data-description="${component.description}"
          data-component_type="${component.component_type}"
          data-name="${component.name}"
          data-content_type="${component.content_type}"
          data-form="${form}"
          data-action-figure="${actionBuilder}"
          data-append="${component.lesson}" 
                        data-getitup="${component.id}" 
          
          data-embedded_url="${component.embedded_url}"
          data-embedded_url="${component.video_type}" 
          class="hello-move-me components accordion-content pb-widget-preview-panel" id="${component.id}">
            
            
              <div class="">
                <div class="row">
                  <div class="col-md-12">
                    <div class="">
                    
              <div class="">
                <div class=" col-md-12">
                   


                <div class="actions-set pull-right" >
               

                  <span ><a href="${launchPad}"
                  data-name="${component?.name}"
               data-idx="${component.id}"
          data-parent="${component.lesson_id}"
          data-pos="${component.position_id}"
          data-description="${component.description}"
          data-component_type="${component.component_type}"
          data-name="${component.name}"
          data-content_type="${component.content_type}"
          data-embedded_url="${component.embedded_url}"
          data-embedded_url="${component.video_type}"
          data-form="${form}"
          data-action-figure="${actionBuilder}"
          data-append="${component.lesson}" 
                        data-getitup="${component.id}" 

              role="button"
              data-toggle="modal">
              <i onclick="LaunchEditBoxEvent(this)"
               class="pb-handle-widget fa fa-edit fa-2x"

                data-name="${component?.name}"
               data-idx="${component.id}"
          data-parent="${component.lesson_id}"
          data-pos="${component.position_id}"
          data-description="${component.description}"
          data-component_type="${component.component_type}"
          data-name="${component.name}"
          data-content_type="${component.content_type}"
          data-embedded_url="${component.embedded_url}"
          data-embedded_url="${component.video_type}"
          data-form="${form}"
          data-action-figure="${actionBuilder}"
          data-append="${component.lesson}" 
                        data-getitup="${component.id}" 


               ></i>
               </a></span>
                               
                  <span><i 

                  data-name="${component?.name}"
               data-idx="${component.id}"
          data-parent="${component.lesson_id}"
          data-pos="${component.position_id}"
          data-description="${component.description}"
          data-component_type="${component.component_type}"
          data-name="${component.name}"
          data-content_type="${component.content_type}"
          data-embedded_url="${component.embedded_url}"
          data-embedded_url="${component.video_type}"
          data-form="${form}"
          data-action-figure="${actionBuilder}"
          data-append="${component.lesson}" 
                        data-getitup="${component.id}" 


                  class="pb-remove fa fa-trash fa-2x" onclick="handleWidgetRemove(this)"></i></span>
                
                   <span><a
          data-name="${component?.name}"
        
          data-description="${component?.description}" 

         class="drag-handle-list-lessons" style="margin-right:10px;"
         
               data-idx="${component.id}"
          data-parent="${component.lesson_id}"
          data-pos="${component.position_id}"
          data-description="${component.description}"
          data-component_type="${component.component_type}"
          data-name="${component.name}"
          data-content_type="${component.content_type}"
          data-embedded_url="${component.embedded_url}"
          data-embedded_url="${component.video_type}"
          data-form="${form}"
          data-action-figure="${actionBuilder}"
          data-append="${component.lesson}" 
                        data-getitup="${component.id}" 
           
         
                 
          >

         <i class="fa fa-arrows fa-2x"
            data-name="${component?.name}"
               data-idx="${component.id}"
          data-parent="${component.lesson_id}"
          data-pos="${component.position_id}"
          data-description="${component.description}"
          data-component_type="${component.component_type}"
          data-name="${component.name}"
          data-content_type="${component.content_type}"
          data-embedded_url="${component.embedded_url}"
          data-embedded_url="${component.video_type}"
          data-form="${form}"
          data-action-figure="${actionBuilder}"
          data-append="${component.lesson}" 
                        data-getitup="${component.id}" 

          
        

         ></i>
        </a></span>
                </div>
                </div>
                
              </div>
              <br/> <br/><br/><br/>
            
                      <div class="col-md-12">
                      <h4
                  class="col-md-12"
                  
                > <span class="compo-type" style="font-size:25px">Component Type: ${Info}</span><br/><span style="font-size:25px;">Title</span><span style="font-size:25px;font-weight:bold;color:#000" class=" unit_title_place_holder  title-given "> ${component.name}
                  </span>
                 </h4><br/>


                      <div id="readmore_${component.id}" style="display:${readmoreInitialized}"  class="readmore js-read-more" data-rm-words="70">
                          ${textualData }
                      </div>

                                              
                        <div data-append="${component.lesson}" 
                        data-getitup="${component.id}" class="content-section-from-input unit_content_place_holder">
                           <p style={{display:${enableLink} }} id="embedded_url_${component.id}">${component?.embedded_url}</p>
                           
                          <p>${playVideoEnabled} ${    "Click the edit icon above to edit this unit" } ${ questionTeplateButton }</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
          </ul>
`
                       
       $("#dynamic_subsection_"+ component.lesson_id +"_lesson_component")
        .append( $(tempComponent));
        enableDragSortPositionUpdater("lessons", "hello-move-me")
                     

                      }
                     
                       
                  })  
               })
            })

            //console.log(TreeObj.tree)
            //console.log(TreeObj.tree.root)
       }  



       //allow collapsible effect on each section , subsections , lessons

    })

   initAccordion() 
   ReadMore.init()



   //  var BIG_JSON ={
   //    basic_info: null,
   //    course_detail:[]
   //  }; // one big course jacket
   //  var _BIG_JSON = {}

   //  let course  = await getCourse(this.props.match.params.id);
   //  let sections =  await getSectionsOfCourseId(course?.id);
   //   sections = sections.results;


   //  let subsections =[];
   //  let lessons =[];
   //  let htmls =[];
   //  let videos =[]
   //  let html_results_tags = ""
   //  let keyField = "section" // start transversing from section to find matching subsection
    
   // // sub =>section section =>course
   // // Method 1 still works
  
      
    
 }




  getThisCourseData = (id) => {
    //when data is saved response should return the course id as well in the response
    try{
       (async () =>{
         let course = await getCourse(id)
         console.log(course)
         //check for data saved from previous step and porpulate the fields  :
       })()
    }catch(err){
       console.log(err)
    }
  }


  porpulateAndHideFields = (step) => {
     /*AI AUTOMATION SCRIPTING TRIGGERS ONLY WHEN SET CORRECTLY*/

  }


  saveOrUpdateData =  ( type, mode="EDIT_MODE", url, data, state={}) => {
    //after api call to update or create
    switch(mode){
      
      case "EDIT_MODE": // called subsequently
        //call the update handler to api
        let updateCourseRes = createAnyResource("PATCH",url, data,state)
        break;
      default:
        throw new Error(`Wrongly accessed mode:- ${mode}`)
        return false;
    }
    
    //inform user
      var button = document.querySelector('.save-generic');
      var slideout = document.getElementById('notifier');
      slideout.style.zIndex="9999999999999999";
      let successSlide = slideout.querySelector(".success-notification")
      let errorSlide = slideout.querySelector(".error-notification")
      if(type =="error"){
         return errorSlide.classList.toggle("visible")
      } else{
        return  slideout.classList.toggle('visible');
      }
  }

  persistData(key,value){
    let localStore =  window.localStorage ? 
      window.localStorage.setItem(key,value) : {
      [key]:value
    }
  }


  encodeRFC5987ValueChars (str) {
    return encodeURIComponent(str).
        // Note that although RFC3986 reserves "!", RFC5987 does not,
        // so we do not need to escape it
        replace(/['()]/g, escape). // i.e., %27 %28 %29
        replace(/\*/g, '%2A').
            // The following are not required for percent-encoding per RFC5987, 
            // so we can allow for a little better readability over the wire: |`^
        replace(/%(?:7C|60|5E)/g, unescape);
}

getFilename(url) {
  const filename = decodeURIComponent(new URL(url).pathname.split('/').pop());
  if (!filename) return 'dummy.jpg'; // some default filename
  return filename;
}

filenameWithoutExtension(filename) {
  return filename.replace(/^(.+?)(?:\.[^.]*)?$/, '$1');
}




  
   /*implements save and continue logic*/
  saveAndContinue = (e) =>{
     const {id } =  this.props.match.params;
     let curr = this.state.currentStep;
     /*Our default url  assumes an update method because much work would be left incomplete during course creation*/
     let url=  `/lms/api/update/course/${id}/`  //
     let step = parseInt(curr)
	  let stateData = {...this.state};

    let dummyImg = new Image();
    dummyImg.src ="noimage.jpg" 

    //prevent sql injection here for any input data
    let cover_img = new File([
      this.filenameWithoutExtension(
        this.getFilename("http://tqfe.org/public/assets/images/course-1.jpg")
      )], 
      this.getFilename("http://tqfe.org/public/assets/images/course-1.jpg")
    ); //a dummy image
    let videoFile = new File([
      this.filenameWithoutExtension(
        this.getFilename("http://tqfe.org/public/assets/images/course-1.mp4")
      )], 
      this.getFilename("http://tqfe.org/public/assets/images/course-1.mp4")
   ); // a dummy file
    if(localStorage.getItem("card_image")){
      let domFile = localStorage.getItem("card_image");

      if(domFile.length>0){
         cover_img = new File([
      this.filenameWithoutExtension(
        this.getFilename(domFile)
      )], 
      this.getFilename(domFile)
    )

      }
     
    }else{
      cover_img = cover_img
    }

    
    if(localStorage.getItem("intro_video")){
      let domVideo = localStorage.getItem("intro_video")
      if(domVideo.length>0){
        cover_img = new File([
          this.filenameWithoutExtension(
            this.getFilename(domVideo)
          )], 
          this.getFilename(domVideo)
       )

      }
      
    }else{
      videoFile = videoFile
    }
    //alot of processing is done here

    //before submitting this check if user has tried to hack the db
    //using sql injection detection technique
    //check if xsl attack occurs in all input
    //you just cant trust anu
    [
      "course_start_date_time",
      "course_end_date_time",
      "enrolment_start_date_time",
      "enrolment_end_date_time"
    ].forEach(field =>{
      if(this.state[field].length >0){
        localStorage.setItem(field,this.state[field] )
      }
    })

    let pre =[]
    if(localStorage.getItem("prerequisite").length>0){
      pre = localStorage.getItem("prerequisite")
    }
    let audit = true
    
    if (localStorage.getItem("auditing") == true){
    
    }else{
      audit = false
    }

	  stateData = {
		  
        name: localStorage.getItem("name") || "",
        code: localStorage.getItem("code") || "",
        run: localStorage.getItem("run") || "",
        card_image: cover_img,
        intro_video: videoFile,
        description:localStorage.getItem("description") || "",
        overview:  localStorage.getItem("overview") || "",
        learning_expectation: localStorage.getItem("learning_expectation") || "",
        curriculum: localStorage.getItem("curriculum") || "",
        level: localStorage.getItem("level") || 1,  //int
        enrolment_type: localStorage.getItem("enrolment_type") || 1,
        entrance_exam_required: localStorage.getItem("entrance_exam_required") || false, 
        cost: localStorage.getItem("cost") || 0.00,  //float
        auditing: audit,
        prerequisite:[],
        course_pacing: localStorage.getItem("course_pacing") || 1, //int
        course_start_date_time: this.state.course_start_date_time || localStorage.getItem("course_start_date_time") || "2021-08-26T17:13:00+01:00",  //2021-08-26T17:13:00+01:00
        course_end_date_time: this.state.course_end_date_time || localStorage.getItem("course_end_date_time") || "2021-08-26T17:13:00+01:00",
        enrolment_start_date_time: this.state.enrolment_start_date_time|| localStorage.getItem("enrolment_start_date_time") || "2021-08-26T17:13:00+01:00",
        enrolment_end_date_time: this.state.enrolment_end_date_time|| localStorage.getItem("enrolment_end_date_time") || "2021-08-26T17:13:00+01:00",
        course_language: localStorage.getItem("course_language") || 1,
        requirement_hours_per_week: localStorage.getItem("requirement_hours_per_week") || 1, //int
        requirement_no_of_week: localStorage.getItem("requirement_no_of_week") || 1,  //int
        grace_period_after_deadline: localStorage.getItem("grace_period_after_deadline") || 1, //int
         publication_status: localStorage.getItem("publication_status") || 2,  //int
        institution: localStorage.getItem("institution") || "",    //keypair preporpulated set of inst id
        author:  localStorage.getItem("author") || "" ,  //keypair preporpulated set of author id
		//for the authoring team you can uselocalstorage but i dont want to do that
		//make it more complex to be deciphered
		
		
		//inthe  create course or update on the fly append the jackpacks of all entered or searched authors
	  }



  let tempstore = localStorage.getItem("authoring_team")
  if(tempstore?.match(/[\[\.*\]]/)){
    alert(true)
     let temp_auth = JSON.parse(tempstore)
     temp_auth = [...temp_auth]
     localStorage.setItem("authoring_team",JSON.stringify(temp_auth))
    stateData.authoring_team = temp_auth  ;
  }else{
      if(localStorage.getItem("authoring_team").length > 0){
        stateData.authoring_team =[localStorage.getItem("author")] //just the lead author
        localStorage.setItem("authoring_team",JSON.stringify(stateData.authoring_team))
      }else{
        stateData.authoring_team =[localStorage.getItem("author")] //just the lead author
        localStorage.setItem("authoring_team",JSON.stringify(stateData.authoring_team))
     
      }         
  }
          

  //for pre requisite
  let temppre = localStorage.getItem("prerequisite")
  if(temppre?.match(/[\[\.*\]]/)){
    //alert(true)
     let temp_temppre = JSON.parse(temppre)
     temp_temppre = [...temp_temppre]
     localStorage.setItem("prerequisite",JSON.stringify(temp_temppre))
    stateData.prerequisite = temp_temppre  ;
  }else{
      //alert("dont match any regex")
      stateData.prerequisite = []
      localStorage.setItem("prerequisite",JSON.stringify([]))        
  }
    
    
	  
	  
    // alert(step)
    //switch on the step action
    switch(step){
       case 1:
       case 2:
       case 3:
       case 4:
       case 5:
       case 6:
	   
		//thn post the form for update 
         this.saveOrUpdateData("edit",'EDIT_MODE', url, $("form#stepUpFormWithAI2"),stateData )
       
		 break;
       case 7:
        // URL WILL CHANGE TO SECTIONS/ SUBSECTIONS AND LESSONS based onaddition and positioning
        // update all fields here
         // url ="/lms/api/create/section/"
		
         this.saveOrUpdateData("edit", 'EDIT_MODE',url, $("form#stepUpFormWithAI2"), stateData )
         break;
       default :
          break;
    }
    
  }


  render() {
    const {institutions, languages, instructors, courses,groups, currentCourseId } = this.state;
    
    return (
      <Fragment>
        <NavBar />

        <br/><br/><br/><br/><br/><br/>
		
		
		
		<div class="wrapper-loop display-board" style={{display:"none"}}>

    <input className="menu-xtrigger" type="checkbox" id="navigation" />
                    <label for="navigation">
                      Actions
                     </label>

    <nav className="action-figure">
	  
        <ul>
		<h6  style={{ marginRight: "10px", color:"#fff",background:"rgba(8,23,200)", padding:"20px" }}> Questence</h6><hr/><br/>
		<li>
            <a
                      style={{ marginRight: "3px"}}
                      href={process.env.PUBLIC_URL+ "/authoring/preview/"+ this.props.match.params.id}
                      
                  
                      className=""
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> Preview 
                    </a>
					</li>
					<li>

                    <a
                      style={{ marginRight: "3px"}}
                      href={"#"}
                      onClick={(e) => {
                      e.preventDefault();
                      this.saveAndContinue(e)
                    }}
                      className=""
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> Save 
                    </a>
					</li>
					<li>

                    <a
                      style={{ marginRight: "3px" }}
                      href={process.env.PUBLIC_URL + "/create/create/new/"}
                      className=""
                      onClick={() =>{
                        window.location.reload()
                      }}
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> 
                      Cancel
                    </a>
					</li>

                     <li>
                    <a
                      style={{ marginRight: "10px" }}
                    onClick={() =>{
                        window.location.reload();
                        localStorage.clearItems()

                      }}
                      href={"#"}
                      className=""
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> 
                      Clear All
                    </a>
					</li>
					
					<li>

                      <a
                      style={{}}
                      href={process.env.PUBLIC_URL + "/"}
                      className=""
                    >
                      <i className=" mdi mdi-keyboard-backspace"></i> Courses
                      List
                    </a>
					</li>
					
					
					<li class="questence-slide-show"></li>{/*display any overview video here*/}
        </ul>
		
		
    </nav>

        <section>
            <article>
                
         

        <div id="none-display" style={{opacity:"0"}} className="row" id="container-fullscreen" style={{margin:"10px"}}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body" >
                <div id="make-fixed-on-fullscreen " >
                  <h4 class="hidden-sm hidden-xs">
                    <a
                      style={{ marginRight: "3px", color:"#fff" }}
                      href={"#"}
                      onClick={(e) => {
                      e.preventDefault();
                      this.saveAndContinue(e)
                    }}
                      className="alignToTitle btn btn-success btn-outline-secondary btn-rounded btn-sm"
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> Save
                    </a>

                    <a
                      style={{ marginRight: "3px" ,color:"#fff"}}
                      href={process.env.PUBLIC_URL + "/authoring/create/new/"}
                      className="alignToTitle btn btn-danger btn-outline-secondary btn-rounded btn-sm"
                      onClick={() =>{
                        window.location.reload()
                      }}
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> 
                      Cancel
                    </a>

                    <a
                      style={{ marginRight: "10px" }}
                    onClick={() =>{
                        window.location.reload()
                      }}
                      href={"#"}
                      className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> 
                      Clear
                    </a>

                    
                    <a
                      style={{ marginRight: "3px" }}
                      href="#no-grid"
                      onClick={this.togglerFullscreen}
                      id="toggle_fullscreen"
                      className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"
                    >
                      <i className=" mdi mdi-keyboard-backspace"></i> 
                      Fullscreen
                    </a>
                    
                  </h4>
                  <br /><br />





<h1>Course Edit</h1>

<dl class="responsive-tabs">
  <dt class="active"  onClick={async (e) => {
                            this.goToStep(e, 1);
                            await  this.fetchContent()
                             // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                             //  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                                                   
                        }}>Basic</dt>
  <dd>
      <h2>Course Basics</h2><br/>
      <input type="hidden" name="csrfmiddlewaretoken" value={getCookie("csrfmiddlewaretoken")} />
                      <Step1
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleInputChange}
                        camelCase={this.handleInputOverride}
                        stateInitial={this.state}
            autoUpdateFilledData={this.autoUpdateFilledData}
                        
                        
                        actions={
                          {
                    stateAction:this.handleChangeTextEditor,
                    description:this.handleHtmlDescriptionChange,
                    overview: this.handleHtmlCourseOverViewChange,
                    learning_expectation: this.handleHtmlOutComeChange,
                    handlePrerequisite: this.handleHtmlPrerequisitesChange,
                    curriculum: this.handleHtmlCurriculumChange
                  
                        }}
                        
                        errorEmailClass={this.errorClass(
                          this.state.formErrors.course_language
                        )}
                        email={this.state.email}
                        errorEmail={this.state.formErrors.email}
                        errorUsernameClass={this.errorClass(
                          this.state.formErrors.username
                        )}
                        username={this.state.username}
                        errorUsername={this.state.formErrors.username}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        groups={groups}
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                        currentCourseId={this.state.currentCourseId}
                      />
  </dd>

  <dt onClick={async (e) => {
                            this.goToStep(e, 2);
                            await  this.fetchContent()
                        }}>Schedules</dt>
  <dd       
>
      <h2>Course Scheduling</h2><br/>
     

     <Step3
                      currentCourseId={this.state.currentCourseId}
                      stateInitial={this.state}
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleInputChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                        stateAction={this.handleChangeTextEditor}
                        groups={this.state.groups}
                      />



      </dd>

  <dt  onClick={ async (e) => {
                          await  this.fetchContent()
                          this.goToStep(e, 3);
                          // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                          //     setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                           
                        }}>Grading</dt>
  <dd>
      <h2>Grading</h2><br/>
       <Step5
                        groups={this.state.groups}
                      stateInitial={this.state}
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleInputChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                        stateAction={this.handleChangeTextEditor}
                        currentCourseId={this.state.currentCourseId}
                      />
      
  </dd>

  <dt  onClick={async (e) => {
                            this.goToStep(e, 4);
                            await  this.fetchContent()
                             // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                             //  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                                                   
                        }}>Group Config</dt>
  <dd>
     
      <Step6
                      stateInitial={this.state}
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleInputChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                        stateAction={this.handleChangeTextEditor}
                        currentCourseId={this.state.currentCourseId}
                        groups={this.state.groups}
                      />
  </dd>
    
    
     
     <dt   onClick={async (e) => {
                            this.goToStep(e, 5);
                           
                             // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                             //  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                                                   
      }}>Authoring Team</dt>
     <dd>
 <h2>Authoring Team</h2><br/>
         <Step4
                      stateInitial={this.state}
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleInputChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                        stateAction={this.handleChangeTextEditor}
                        currentCourseId={this.state.currentCourseId}
                       groups={this.state.groups}
                      />

     </dd>
     <dt onClick={async (e) => {
                            this.goToStep(e, 8);
                            await  this.fetchContent()
                             // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                             //  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                                                   
                        }}
                       >Resource</dt>
     <dd>
       <h2>Files and Media Resources</h2><br/>
        <Step8
                        groups={groups}
                      stateInitial={this.state}
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleInputChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                        stateAction={this.handleChangeTextEditor}
                        currentCourseId={this.state.currentCourseId}
                      />

     </dd>
     <dt onClick={ async(e) => {
                          this.goToStep(e, 6);
                          await  this.fetchContent()
                                 
                          // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                          //     setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                          $("#js-parent").html("")
                          await this.courseDetailJson()
                        }}>Content</dt>
     <dd>
<Step2
                      stateInitial={this.state}
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleInputChange}
                          groups={this.state.groups}
                        stateAction={this.handleChangeTextEditor}
                        errorPasswordClass={this.errorClass(
                          this.state.formErrors.password
                        )}
                        password={this.state.password}
                        errorPassword={this.state.formErrors.password}
                        errorPasswordConfirmationClass={this.errorClass(
                          this.state.formErrors.passwordConfirmation
                        )}
                        passwordConfirmation={this.state.passwordConfirmation}
                        errorPasswordConfirmation={
                          this.state.formErrors.passwordConfirmation
                        }
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                        currentCourseId={this.state.currentCourseId}
                      />

     </dd>
</dl>



				  
				  

                                 </div>



                <div className="row">
                  <div className="col-md-12">
                    



                     <div class="notifier" id="notifier" style={{display:"none"}}>
                          <div class="success-notification">
                             {/*success message*/}

                          </div>

                          <div class="error-notification" >
                              {/*error message*/}
                              Could not perform operation
                          </div>
                     </div>


                    <br />
                    <br />
                    <div style={{ position: "absolute", bottom: "0px" }}>
                      {/*<ul className="list-inline mb-0 wizard text-center">
                        {this.previousButton}

                        {this.nextButton}
                      </ul>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
		
		
		
		    <button  id="myBtn" title="Go to top"><i class="fa fa-arrow-up"></i></button>
		   </article>
        </section>
    </div>




{/*Place All required workbench modals here*/}

{/*Always make component for problems avaialable on code run*/}
		
    {/*this is the work bench for problem component question and answer authoring builder*/}

      <div  style={{ marginTop: "60px" }}
          class="modal fade"
          id="openModal-about"
          tabindex="-1"
          role="dialog"
          aria-hidden="true">
      <div>
      <br/>

      <div class="modal-header">
        <h3 style={{color:"#000"}}>Problem Component Section</h3>
      </div>
         <a href="#"  title="Close" class="close" data-dismiss="modal"
                  aria-label="Close">X</a>
         
        <div class="col-md-12">
              

  <div >
    <div >
      <div class="row">
        <div class="col-md-12">


      {/*first display the problem creation form before the question addition form*/}

<br/><br/><br/>
         <form style={{height:"500px",overflowY:"scroll",overflowX:"hidden",margin:"0px",padding:"20px",background:"#fff"}} class="form-horizontal" method="post" enctype="application/x-www-form-urlencoded" id="problemcomponent_form" novalidate="">
  
    <fieldset class="module aligned">
      <div class="form-group col-md-12 fl-left field-lesson" style={{display:"none"}}>
        <div>
          <p class="required" for="id_lesson">Lesson:</p>

          <div class="related-widget-wrapper">
            <input class="form-control" id="lesson" name="lesson" id="problem_lesson"  type="hidden" />
          </div>
        </div>
      </div>

      <div class="form-row field-position_id" style={{display:"none"}}>
        <div class="form-group col-md-12 fl-left">
          <p for="id_position_id">Position id:</p>

          <input
            type="text"
            name="position_id"
            class="vTextField form-control"
            maxlength="150"
            id="problem_position_id"
          />
        </div>
      </div>


      <div class="form-row field-course" style={{display:"none"}}>
        <div class="form-group col-md-12 fl-left">
          <p for="id_course">Course:</p><br/><br/>
          <input 
          class="form-control"
           type="hidden" id="problem_course" 
           name="course"
           

            />

                  </div>
      </div>


      <div class="form-row field-component_type" style={{display:"none"}}>
        <div class="form-group col-md-12 fl-left">
          <p class="required" for="id_component_type"
            >Component type:</p
          ><br/><br/>

          <select class="form-control" name="component_type" id="problem_component_type">
            

            <option value="3" selected>Problem</option>

            
          </select>
        </div>
      </div>

      <div class="form-row field-name">
        <div class="form-group col-md-12 fl-left">
          <p for="id_name">Name:</p><br/><br/>

          <input
            type="text"
            name="name"
            class="vTextField form-control"
            maxlength="150"
            id="problem_name"
          />
        </div>
      </div>



      <div class="form-row field-description">
        <div class="form-group col-md-12 fl-left">
          <p for="id_description">Description:</p><br/><br/>

          <input
            type="text"
            name="description"
            class="vTextField form-control"
            maxlength="150"
            id="problem_description"
          />
        </div>
      </div>



      <div class="form-row field-assessment_type">
        <div class="form-group col-md-12 fl-left">
          <p class="required" for="id_assessment_type"
            >Assessment type:</p
          ><br/><br/>

          <select class="form-control" name="assessment_type" 
          id="problem_assessment_type">
            <option value="1" selected="">Assignment</option>

            <option value="2">Continuous Assessment</option>

            <option value="3">Final Examination.</option>
          </select>
        </div>
      </div>

      <div class="form-row field-assessment_weight">
        <div class="form-group col-md-12 fl-left">
          <p for="id_assessment_weight">Assessment weight:</p>
<br/><br/>
          <input
            type="number"
            name="assessment_weight"
            value="0.0"
            step="any"
            class="form-control"
            id="problem_assessment_weight"
          />
        </div>
      </div>

      <div class="form-row field-assessment_attainable_score">
        <div class="form-group col-md-12 fl-left">
          <p for="id_assessment_attainable_score"
            >Assessment attainable score:</p
          ><br/><br/>

          <input
            type="number"
            name="assessment_attainable_score"
            value="0.0"
            step="any"
            class="form-control"
            id="problem_assessment_attainable_score"
          />
        </div>
      </div>

      <div class="form-row field-show_answers">
        <div class="form-group col-md-12 fl-left">
        <p class="vCheckboxLabel" for="problem_show_answers"
            >Show answers</p
          >
          <input
           class="form-control"
            type="checkbox"
            name="show_answers"
            id="problem_show_answers"
          /><br/><br/>
        </div>
      </div>

      <div class="form-row field-due_date">
        <div class="form-group col-md-12 fl-left">
          <p for="id_due_date_0">Due date:</p>
<br/><br/>
          <p class="form-group col-md-12 fl-left">  
            Date:</p>
            <input
              type="text"
              name="due_date_0"
              class="vDateField"
              size="10"
              id="problem_due_date_0"
            />
          


            <p class="form-group col-md-12 fl-left">
            Time:  </p>
            <input
              type="text"
              name="due_date_1"
              class="vTimeField"
              size="8"
              id="problem_due_date_1"
            />

           
        
        </div>
      </div>

      <div class="form-row field-is_timed">
        <div class="form-group col-md-6 fl-left">
          <input type="checkbox" name="is_timed" id="id_is_timed" />
          <p
            class="vCheckboxLabel"
            for="id_is_timed"
            >Is timed</p
          ><br/><br/>
        </div>
      </div>

      <div class="form-row field-timed_duration">
        <div class="form-group col-md-12 fl-left">
          <p for="id_timed_duration">Timed duration:</p><br/><br/>

          <input
            type="number"
            name="timed_duration"
            value="0.0"
            step="any"
            id="id_timed_duration"
            class="form-control"
          />
        </div>
      </div>

      <div class="form-row field-no_of_possible_attempts">
        <div class="form-group col-md-12 fl-left">
          <p class="required" for="id_no_of_possible_attempts"
            >No of possible attempts:</p
          ><br/><br/>

          <input
            type="number"
            name="no_of_possible_attempts"
            value="1"
            class="vIntegerField form-control"
            required=""
            id="problem_no_of_possible_attempts"
          />
        </div>
      </div>


      <div class="form-row field-group_passed">
        <div class="form-group col-md-12 fl-left">
          <p for="id_group_passed">Group passed:</p><br/><br/>

          <div class="related-widget-wrapper">
            <select class="form-control" name="group_passed" id="id_group_passed">
              <option value="" selected="">---------</option>

              {groups && groups.map(group =>{
                return (
                    <option value={group.id}>{group.name}</option>
                )
              })}
            </select>
            </div>
             <br/><br/>
                <button 
                onClick={(e) => {addNewQuestenceWahala(e)}}
                class="btn btn-primary" style={{width:"100%",textAlign:"center"}}>
                  Create Problem utility component
                </button>
               <br/><br/><br/><br/>
            </div>
            </div>


    </fieldset>
</form>


   



        </div>


    </div>
  </div>
</div>





       </div>
   </div>

   </div>




{/*question creation panel*/}
   <div class="container-questions">
  
  

  <div id="slideout-questions">
  <br/><br/><br/><br/>

  <button type="button" onClick={ () =>{

  $('#slideout-questions').toggleClass('on');

  }}class="btn btn-default">Close</button>
  





    <form style={{display:"none"}}>
  {/*magically updated form from regex entry markdown board*/}
      

      


      <input class="btn btn-primary" type="submit" value="Post feedback"></input>
    </form>




  {/*hint parallax area*/}


  <div class="parallax-view-reset col-md-12">
              

  <div class="content-section-reset col-md-12">
    <div class="container-section-reset">

  <input type="checkbox" id="menu-toggle" class="hidden" />
              <label for="menu-toggle" class="woosh">
              Toggle Hint 
              </label>

    <div id="saveQuestionActions" 
    style={{cursor:"pointer",color:"#fff",display:"none",
    background:"rgba(8,23,200)"}} 
      class="setMove button  btn btn-success pull-right"
      >Save All Questions</div>


            {/*hint area*/}

  <div id="style-5" class="menu-section-reset hintareaview scrollbar col-md-3">
   <div class="divBlockHint">
    <h2 class="hint-region fixed-set">Hints</h2>
    <p class="hint-region white-board">
    <b>To add markdown types of various problem 
    components use the syntax below. </b><br/><br/>
    <b><span>*** """ Ensure to place enclose your 
    markdown code in 
    tripple double quotes """ ***</span></b>

    <br/><br/><b><span>*** """ All new markdown code 
    should preceed with a new line """ ***</span></b>

    <br/><br/><b><span>*** """ You can switch between preview
     and edit mode by clicking the preview or edit button """ ***</span></b>
    </p>
    
      <h4 class="hint-region">Markdown Codes Below</h4>
      <div class="hint-region">
        <h5 class="active">Multiple choices</h5>
        <span>Sample
          <code>
            <br/>
<span>""" Example Question here: who was made king of your country -sample question? </span><br/>
<span>[x] option 1 and 2 are correct</span><br/>
<span>[x]  option 1 and 2 are correct</span><br/>
<span>[]  Victor Victor Juwa</span><br/>
<span>[]  No one else but me """</span><br/>
               </code>
        <br/>
</span>


      </div>


      <div class="hint-region">
        <h5 class="active">Checkboxes choice</h5>
         <span>Sample
          <code>
            <br/>
<span>""" Example Question here: who was made king of your country -sample question? </span><br/>
<span>[o] option 1  correct</span><br/>
<span>[]  A wrong answer</span><br/>
<span>[]  Victor Victor Juwa</span><br/>
<span>[]  No one else but me """</span><br/>
               </code>
        <br/>
</span>



      </div>








      <div class="hint-region">
        <h5 class="active">Text Input Box</h5>
         <span>Sample
          <code>
            <br/>
<span>""" Example Question here : 2+ 2? \n question? </span><br/>
<span>[i] Your Answer\n """</span><br/>

               </code>
        <br/>
</span>



      </div>





      <div class="hint-region">
        <h5 class="active">Numeric Input (Digits Only)</h5>
         <span>Sample
          <code>
            <br/>
            <span>""" Example Question here : 2+ 2? \n question? </span><br/>
<span>[n] Your Answer\n """</span><br/>


               </code>
        <br/>
</span>



      </div>




      <div class="hint-region">
        <h5 class="active">Dropdown Option </h5>
         <span>Sample
          <code>
            <br/>
<span>""" Example Question here: who was made king of your country -sample question? </span><br/>
<span>[d][x] option 1  correct</span><br/>
<span>[d]  A wrong answer</span><br/>
<span>[d]  Victor Victor Juwa</span><br/>
<span>[d]  No one else but me """</span><br/>
               </code>
        <br/>
</span>



      </div>




      <div class="hint-region">
        <h5 class="active">Checkbox choice with hint and feedback</h5>
         <span>Sample
          <code>
            <br/>
<span>""" Example Question here: who was made king of your country -sample question? </span><br/>
<span>[o] option 1  correct</span><br/>
<span>[]  A wrong answer</span><br/>
<span>[]  Victor Victor Juwa</span><br/>
<span>[]  No one else but me """</span><br/>
               </code>
        <br/>
</span>


      </div>



      <div class="hint-region">
        <h5 class="active">Multichoice choice with hint and feedback</h5>
         <span>Sample
          <code>
            <br/>
<span>""" Example Question here: who was made king of your country -sample question? </span><br/>
<span>[x] option 1  correct</span><br/>
<span>[]  A wrong answer</span><br/>
<span>[]  Victor Victor Juwa</span><br/>
<span>[]  No one else but me """</span><br/>
               </code>
        <br/>
</span>



      </div>
      



      <div class="hint-region">
        <h5 class="active">Text Input  with hint and feedback</h5>
         <span>Sample
          <code>
            <br/>
<span>""" Example Question here: who was made king of your country -sample question? </span><br/>
<span>[i] Your Answer</span><br/>

               </code>
        <br/>
</span>



      </div>



            <div class="hint-region">
        <h5 class="active">Numeric Input  with hint and feedback</h5>
         <span>Sample
          <code>
            <br/>
<span>""" Example Question here: who was made king of your country -sample question? </span><br/>
<span>[i] Your Answer</span><br/>

               </code>
        <br/>
</span>



      </div>


            <div class="hint-region">
        <h5 class="active">Dropdown  with hint and feedback</h5>
         <span>Sample
          <code>
            <br/>
<span>""" Example Question here: who was made king of your country -sample question? </span><br/>
<span>[i] Your Answer</span><br/>

               </code>
        <br/>
</span>



      </div>


      </div>
     
  </div>







           {/*only displays when you have created the problem that will embed the questions*/}
        
          <div id="markdown-editordisplay" >


                <div class="toolbardisplay">
                  <div class="group">
                    <button id="heading1"><i class="fa fa-header" aria-hidden="true"></i>1</button>
                    <button id="heading2"><i class="fa fa-header" aria-hidden="true"></i>2</button>
                    <button id="heading3"><i class="fa fa-header" aria-hidden="true"></i>3</button>
                  </div>
                    <div class="group">
                      <button id="bold"><i class="fa fa-bold" aria-hidden="true"></i></button>
                      <button id="italic"><i class="fa fa-italic" aria-hidden="true"></i></button>
                    </div>
                  <div class="group">
                    <button id="link"><i class="fa fa-link" aria-hidden="true"></i></button>
                    <button id="list-ul"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
                    <button id="list-ol"><i class="fa fa-list-ol" aria-hidden="true"></i></button>
                    <button id="token" style={{display:"none"}}></button>
                    
                        <div class="select-dropdown">
                          <select id="sub-selection">
                            <option >--  Click here to select a question type   ---</option>
                            <option data-markdown="[pb_html]/[pb_multichoice]" value="1">Multi Choice</option>
                            <option data-markdown="[pb_html]/[pb_checkbox]" value="2">Checkboxes</option>
                            <option data-markdown="[pb_html]/[pb_numeric]" value="3">Numerical Inputs</option>
                              <option data-markdown="[pb_html]/[pb_input]" value="4">Text Inputs</option>
                              <option data-markdown="[pb_html]/[pb_dropdown]" value="5">Dropdown</option>
                            

                               <option data-markdown="[pb_html]/[pb_multichoice_feedback]" value="7">Multi Choice + Hints And Feedback</option>
                            <option data-markdown="[pb_html]/[pb_checkbox_feedback]" value="8">Checkboxes + Hints And Feedback</option>
                            <option data-markdown="[pb_html]/[pb_numeric_feedback]" value="9">Numerical Inputs + Hints And Feedback</option>
                              <option data-markdown="[pb_html]/[pb_input_feedback]" value="10">Text Inputs + Hints And Feedback</option>
                              <option data-markdown="[pb_html]/[pb_dropdown_feedback]" value="11">Dropdown + Hints And Feedback</option>
                            
                          </select>
                        </div>
                    </div>
                   <button id="previewdisplay">Preview</button>
               </div>
                <div id="input-outputdisplay">
                  <textarea id="input-areadisplay" rows="30" cols="50"></textarea>
                  <div id="output-areadisplay"></div>
                  <p class="preview-messagedisplay">Preview Mode</p>
                </div>


                 
                 
          </div>




          {/*end work area*/}



    </div>  </div>  </div>


  </div>
  {/*end slide out panel form*/}
</div>{/*end slideout container*/}


{/*Always make component for problems and questions avaialable on code run*/}
      </Fragment>
    );
  }
}


class Step1 extends React.Component {
  constructor(props){
    super(props)

    let sname,scode, sauthor,sinstitution;
    if(localStorage.getItem("name")){
      sname= localStorage.getItem("name") ||  this.props.stateInitial.name || "";
      scode = localStorage.getItem("course_code") ||  this.props.stateInitial.course_code || "";
      sauthor = localStorage.getItem("author") || this.props.stateInitial.author || "" ;
      sinstitution = localStorage.getItem("institution") || this.props.stateInitial.institution || ""

    }
    let sdescription, soverview, sprerequisite, slearning_expectation, scurriculum,
    scourse_start_date_time, scourse_end_date_time, senrolment_end_date_time, scourse_pacing, 
    senrolment_start_date_time,srequirement_no_of_week, srequirement_hours_per_week;
    if(localStorage.getItem("overview")){

      soverview = localStorage.getItem("overview") || ""
    }

    if(localStorage.getItem("description")){

      sdescription = localStorage.getItem("description") || this.props.stateInitial.description || ""
    }
    if(localStorage.getItem("prerequisite")){
      sprerequisite = localStorage.getItem("prerequisite") ||  this.props.stateInitial.prerequisite || []
    }
    if(localStorage.getItem("learning_expectation")){
      slearning_expectation = localStorage.getItem("learning_expectation") ||  this.props.stateInitial.learning_expectation || ""
    }
    if(localStorage.getItem("curriculum")){
      scurriculum = localStorage.getItem("curriculum") ||  this.props.stateInitial.curriculum || ""
    }


    if(localStorage.getItem("course_start_date_time")){
      scourse_start_date_time = localStorage.getItem("course_start_date_time") ||   this.props.stateInitial.course_start_date_time || ""
    }

    if(localStorage.getItem("course_end_date_time")){
      scourse_end_date_time = localStorage.getItem("course_end_date_time") || this.props.stateInitial.course_end_date_time || ""
    }
    if(localStorage.getItem("enrolment_start_date_time")){
      senrolment_start_date_time = localStorage.getItem("enrolment_start_date_time") || this.props.stateInitial.enrolment_start_date_time || ""
    }

    if(localStorage.getItem("enrolment_end_date_time")){
      senrolment_end_date_time = localStorage.getItem("enrolment_end_date_time") || this.props.stateInitial.enrolment_end_date_time || ""
      
	}
	//here
	
	if(localStorage.getItem("requirement_hours_per_week")){
      srequirement_hours_per_week = localStorage.getItem("requirement_hours_per_week") || this.props.stateInitial.requirement_hours_per_week || ""
      
	}
	
	if(localStorage.getItem("requirement_no_of_week")){
      srequirement_no_of_week = localStorage.getItem("requirement_no_of_week") || this.props.stateInitial.requirement_no_of_week || ""
      
	}
	
	if(localStorage.getItem("course_pacing")){
      scourse_pacing = localStorage.getItem("course_pacing") || this.props.stateInitial.course_pacing || ""
      
	}
	
	
	
	let prestate = {
	  enrolment_end_date_time:senrolment_end_date_time,
	  enrolment_start_date_time:senrolment_start_date_time,
	  course_end_date_time:scourse_end_date_time,
	  course_end_date_time:scourse_end_date_time,
	  curriculum:scurriculum,
	  learning_expectation:slearning_expectation,
	  prerequisite: sprerequisite,
	  overview:soverview,
	  name:sname,
	  code:scode,
	  institution:sinstitution,
	  author:sauthor,
	  description: sdescription,
	  requirement_hours_per_week: srequirement_hours_per_week,
	  requirement_no_of_week: srequirement_no_of_week,
	  course_pacing: scourse_pacing
	  
	  }
	
	console.log(prestate)
	

    
	
	this.state ={
		...prestate
	}
	
	
	//check if data is fetched from db then make changes to localstorage
	let textEditors = ["learning_expectation","description", "overview", "curriculum"]
    for(var k in prestate){
      
	  //check if k is a rich text editor content
	  if(textEditors.includes(k)){
		  //inject to text editor
		  var myEditor = $('div[data-placeholder="'+k+'"]') // the editor itself
          //myEditor = myEditor.children[0];
		  let html = prestate[k] || "Place content to be edited with the text editor"
		  console.log(html)
		  myEditor.html(html)
		  
	  }
	  
	}


    
  }


  async componentDidMount(){
    let { author } = this.state;
    if(author?.length>0){
       let Instructor = await getInstructorProfile(author)
       console.log(Instructor)
       if(Instructor){
         $("#author-name").val(Instructor.profile.first_name+ "  " + Instructor.profile.last_name)
       }
    }

  }


  





  
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    const {institutions, languages, instructors, courses } = this.props
    const {lead } = this.state

    return (
      <React.Fragment>
        <div className="tab-content b-0 mb-0" >
          <div className="tab-pane active" id="basic">
            <div className="row">
              <div className="col-md-12 card-box">


 <form
                      id="stepUpFormWithAI2"
                      className="required-form"
                      action="#" 
                      method="PATCH" 
                       novalidate
                      // enctype="multipart/form-data"
                      enctype="application/x-www-form-urlencoded"
                    >



            {/*switcher pane for authoring*/}

              <div className="row" style={{display:"none"}} id="hidden-on-reveal">
        <div className="col-md-12">



                      <Col md="12" sm="12" lg="12">
        
                 
                  <br/> <br/> <br/>
                  <div className="container-fluid" id="lead-guy" >  
                        

                         <div className="col-lg-3 col-md-3 col-sm-6" >
          <a href="#">
            <div className="widget-panel widget-style-2 bg-white"
              onClick={() => {

                
                          swal({
                            text: 'Search for an instructor by name/email/ phone number. e.g. "saladin jake ".',
                            content: "input",
                            button: {
                            text: "Search!",
                            closeModal: false,
                            },
                          })
                          .then(name => {
                            if (!name)  return swal("No instructor email/name was entered!");
                              // check if user existed in our initial fetch 
                              // do not make another api request 
                              //this saves pull request
     
                            let targetInstructor = instructors.find(instructor => {
                                console.log(instructor)
                                return (instructor?.profile?.name === name) ||  (instructor?.profile?.email === name) || (instructor?.profile?.phone_number === name)
                            })
                           
                              if(targetInstructor){
                                 let leadGuy =  $("#lead-guy").css({display:"block", color:"#fff"}).html(targetInstructor?.profile?.name)
                                $("#author").val(targetInstructor?.profile?.id)
                                localStorage.setItem("author",targetInstructor?.profile?.id)
                                 return swal("Success!", "The Instructor was found", "Success");
                
                             }else{

                                
                                  swal("WOOPS!", "We could not find instructor", "error");
                        
                                  swal.stopLoading();
                                 return swal.close();
                            

                             }
                          })
                          
                           
                          

                    }}

            >
              <i className="md md-add text-info"></i>
              <h2
                className="m-0 text-dark-x counter font-600-x"
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  fontSize: "14px",
                }}

                
              >
                Add/Change Team Lead
              </h2>
              <div
                className="text-muted-x m-t-5-x"
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Add
              </div>
            </div>
           
             </a>
          </div></div>
                
</Col>

        




                <div id="collabo-guys" className="row">





                    <div class="col-lg-3 col-md-3 col-sm-6">
                      <a href="#">
                        <div className="widget-panel widget-style-2 bg-white">
                          <i className="fa fa-plus fa-2x text-pink"></i>
                          <h2
                            className="m-0 text-dark-x counter font-600-x"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}

                                onClick={ () => {
              let values = this.state.collaborators            

              swal({
                text: 'Search for an instructor by email/ phone number. e.g. "saladinjake@company.com ".',
                content: "input",
                button: {
                text: "Search!",
                closeModal: false,
                },
              })
              .then(name => {
                if (!name)  return swal("No instructor email or phone entered was entered!");
                  // check if user existed in our initial fetch 
                  // do not make another api request 
                  //this saves pull request

                     
                  //TODO: if no collaborators selected 
                  //LET THE LOGGED IN OR LEAD INSTRUCTOR BE APPENDED AS A COLLABORATOR

                let targetInstructor = instructors.find(instructor => {
                    console.log(instructor)
                    return (instructor?.profile?.name === name) ||  (instructor?.profile?.email === name) || (instructor?.profile?.phone_number === name)
                })
               
                  if(targetInstructor){
                     let collaborators =  $("#collabo-guys")
                      
                     let newGuy = $(`
                      <div class="col-lg-3 col-md-3 col-sm-6">
                      <a href="#">
                        <div className="widget-panel widget-style-2 bg-white">
                          <i className="fa fa-trash fa-2x text-pink"></i>
                          <h2
                            className="m-0 text-dark-x counter font-600-x"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}

                          >
                            ${targetInstructor?.profile?.first_name} - ${targetInstructor?.profile?.email}
                          </h2>
                          <div
                            className="text-muted-x m-t-5-x"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                            onclick="alert('test delete operation')"

                            data-id=${targetInstructor?.profile?.id}
                          >
                            Remove
                          </div>
                        </div>
                      </a>
                    </div>
                     `)
                     
                    collaborators.append(newGuy.html())
                  

                     // now let js do the dynamic selection of the hidden authoring_team select form fields
                    const { name, id, email, phone_number} = targetInstructor?.profile
                     values.push({
                      id,name, email, phone_number
                     })

                     this.setState({collaborators: values})

                      $('select[name=authoring_team]').val(this.state.collaborators) // all collaborators as listArray
      
                     return swal("Success!", "The Instructor was found", "Success");

                 }else{

                    
                      swal("Oh noes!", "We could not find instructor", "error");
            
                      swal.stopLoading();
                     return swal.close();
                

                 }
              })
             
                 
                           
                          

      }}
                          >
                            Add collaborator
                          </h2>
                          <div
                            className="text-muted-x m-t-5-x"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >
                            Add
                          </div>
                        </div>
                      </a>
                    </div>





                </div>

               {/* hidden field that updates its array of data*/}
               { /*fields will be selected as user finds the  exact email/ phone or name 
                of the instructors to be added as collaborators*/}
                <select name="authoring_team[]" multiple  style={{display:"none"}}>
                      {instructors.length > 0  && instructors.map(instructor => {
                          return (
                             <option value={instructor.profile.id}>{instructor.profile.name}</option>
                          )
                      })}
                </select>


          
          <br />
          
        </div>

        <br />
        <br />
      </div>

    {/*form*/}
           <form id="create-course" enctype="">

                <div className="form-group col-md-6 fl-left">
                  
                  <div className="code inputWithIcon inputIconBg">
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="text"
                      className="form-control"
                      id="code"
                      name="code"
                      maxlength="10"
                      placeholder="Enter course code"
                      value={this.props.code}
                     onChange={this.props.camelCase}
                    />  <i class="fa fa-edit " aria-hidden="true"></i>
                    <label
                    className="col-md-12 col-form-label"
                    for="course_title"
                  >
                    Course Code <span className="required ">*</span>{" "}
                  </label>
                  </div>
                </div>

               {/*this will be the logged in instructor id hidden */}
                <div className="form-group col-md-6 fl-left" >
                 
                  <div className="author inputWithIcon">
                    <input
                      style={{ position: "relative", zIndex: "1" , display:"none"}}
                      type="text"
                      className="form-control"
                      id="author"
                      name="author"
                      placeholder="Enter course code"
                      value={this.props.author}
                     
                    /> <i class="fa fa-edit " aria-hidden="true"></i>
                  </div>
                   </div>

                <div className="form-group col-md-6 fl-left">
                 
                  <div className="name">
                    <input
                      style={{ position: "relative", zIndex: "1", marginTop:"-10px" }}
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter course title"
                      maxlength="150"
                      value={ this.props.name}
                     onChange={this.props.handleChange}
                    />
                     <label
                    className="col-md-12 col-form-label"
                    for="course_title"
                  >
                    Course Name <span className="required">*</span>{" "}
                  </label>
                  </div>
                </div>





              <div class="form-group  col-md-6 fl-left">
                 
                  <div class="institution" data-select2-id="94">
                    <select
                      style={{ position: "relative", zIndex: "1" }}
                      class="form-control select2 select2-hidden-accessible"
                       data-toggle="select2"
                       id="institution"
                       name="institution"
                       value={this.state.institution }
                       onChange={this.props.handleChange}
                    >


                      

                      <option>-- Institutions --</option>
                        {institutions &&
                          institutions.map((language, i) => {
							  let selected = this.state.institution == language.id ? true : false
                            return (
                              <option key={i} value={language.id} selected={selected}>
                                {language.name}
                              </option>
                            );
                          })}
                        

                    </select>

                     <label class="col-md-12 col-form-label" for="level">
                    Institution <span className="required">*</span>
                  </label>
                  </div>
                </div>




                <div className=" form-group col-md-6 fl-left">
                        <div className="col-md-10  fl-left author">
                        <input
                        
                            type="text"
                            placeholder={"Add Team Lead"}
                              
                            className="form-control fl-left"
                            id="author-name"
                            name="author-name"
                            disabled
                          />

                          <input
                           style={{display:"none"}}
                            type="text"
                            placeholder={"Add Team Lead"}
                              
                            className="form-control fl-left"
                            id="author-inset"
                            name="author"
                            disabled
                          />
                        </div>
                         <div class="col-md-2  fl-left">
                            <button
                              type="button"

                            
                              className="small text-white"


                                onClick={(e) => {
                                  e.preventDefault()
                
                          swal({
                            text: 'Search for an instructor by name/email/ phone number. e.g. "saladin jake ".',
                            content: "input",
                            button: {
                            text: "Search!",
                            closeModal: false,
                            },
                          })
                          .then(name => {
                            if (!name)  return swal("No instructor email/name was entered!");
                              // check if user existed in our initial fetch 
                              // do not make another api request 
                              //this saves pull request
     
                            let targetInstructor = instructors.find(instructor => {
                                console.log(instructor)
                                return (instructor?.profile?.name === name) ||  (instructor?.profile?.email === name) || (instructor?.profile?.phone_number === name)
                            })
                           
                              if(targetInstructor){
                                 let leadGuy =  $("#lead-guy").css({display:"block", color:"#fff"}).html(targetInstructor?.profile?.name)
                                $("#author").val(targetInstructor?.profile?.id)
                                $("#author-inset").val(targetInstructor?.profile?.email)
                                this.setState({author:targetInstructor?.profile?.email})
                                localStorage.setItem("author",targetInstructor?.profile?.id)
                                $("#author-name").val(targetInstructor?.profile?.first_name+ "  "+ targetInstructor?.profile?.last_name )
                                
                                return swal("Success!", "The Instructor was found", "Success");
                                  
                             }else{

                                
                                  swal("Error", "We could not find instructor", "error");
                        
                                  swal.stopLoading();
                                 return swal.close();
                            

                             }
                          })
                          
                           
                          

                    }}

                            >
                              <i style={{marginTop:"-20px"}} class="fa fa-undo fa-2x"></i>
                            </button>
                            </div>

                        <br />
                        <br />
                        <label class="col-md-12 col-form-label" for="level">
                    Author<span className="required">*</span></label>
                </div>




                <div className="form-group col-md-12 fl-left">
                     <label className="col-md-12 col-form-label" for="description">
                    Prerequisites (select one or more prerequisite course)
                  </label>

                <div className="">
                  {/*
                  <input
                    type="text"
                    className="form-control"
                    id="prerequisite"
                    name="prerequisite"
                    placeholder="Enter course title"
                    required=""
                    value={this.props.prerequisite}
                    onChange={this.props.handleChange}

                  />*/}
                  <select id="prerequisite" style={{height:"250px",fontSize:"12px"}} class="form-control" 
                    name="prerequisite" value={this.props.prerequisite}
                    onChange={this.props.actions.handlePrerequisite
                     } multiple={true}>
                       {
                        courses && courses.map(course =>{
                          return (
                             <option style={{fontSize:"12px"}} value={course.id}>{course.name}</option>
                          )
                        })
                       }
                    </select>
                </div>
                <ul id="preliminary_courses"></ul>
              </div>


                              <div class="form-group  mb-3 col-md-6 fl-left" style={{display:"none"}}>
                 
                  <div class="" data-select2-id="94">
                  <label class="col-md-12 col-form-label" >
                     Auditing
                  </label>
                    <select
                      style={{ position: "relative", zIndex: "99999",padding:"10px" }}
                      
                      className="form-control"
                      id="auditing"
                      name="auditing"
                      onChange={this.props.handleChange}
                       value={this.props.auditing}
                      
                    >
                       <option value="true" selected>True</option>
                       <option value="false">False</option>
                    </select>
                  </div>
                </div>





                
                <div className="form-group col-md-12 fl-left">
                 
                  <div className="description">


                  <textarea
                    
                      name="description"
                      id="description"
                      style={{display:"none",opacity:"0"}}
                      className="form-control"
                      placeholder="Short description"
                       value={this.state.description}
                     
                    ></textarea>
                    
                <label
                    className="col-md-12 col-form-label"
                    for="short_description"
                  >
                    Course Short description
                  </label>
                  <span>*Not more than 250 characters</span>

                     <HTMLForm
                      
                        title="description"
                        maxlength="250"

                        placeholder={"description"}
                        value={this.state.description || ""}
                        action={this.props.actions.description}
                        stateAction={this.props.actions.stateAction}
                        name={"description"}
                      />

                    
                  </div>
                </div>



            








                <div className="form-group col-md-12 fl-left">
                 
                  <div className="overview">
                    <textarea
                      name="overview"
                      id="overview"
                    style={{display:"none",opacity:"0"}}
                      
                      className="form-control"
                      placeholder="Short description"
                       value={this.state.overview}
                  
                    ></textarea>

                    <label
                    className="col-md-12 col-form-label"
                    for="short_description"
                  >
                    Course Overview
                  </label><span></span>




                     <HTMLForm
                        title="overview"

                        placeholder={"overview"}
                        value={this.state.overview || ""}
                        action={this.props.actions.overview }
                        stateAction={this.props.actions.stateAction}
                        name={"overview"}
                      />

                     
                  </div>
                </div>



                 <div className="form-group col-md-12 fl-left">
                  
                  <div className="curriculum">
                  <label className="col-md-12 col-form-label" for="description">
                    Curriculum
                  </label><span></span>

                  <textarea
                      name="curriculum"
                      id="curriculum"
                       style={{display:"none"}}
                      className="form-control"
                      placeholder="curriculum"
                       value={this.state.curriculum}
                     
                    ></textarea>

                    <HTMLForm
                        title="curriculum"

                        placeholder={"curriculum"}
                        value={this.state.curriculum || ""}
                        action={this.props.actions.curriculum}
                        stateAction={this.props.actions.stateAction}
                        name={"curriculum"}
                      />
                  </div>
                </div>


                <div className="form-group col-md-12 fl-left">
                  <label className="col-md-12 col-form-label" for="description">
                    What You Will Learn
                  </label>
                  <div className="">

                  <textarea
                      name="learning_expectation"
                      id="learning_expectation"
                      style={{display:"none"}}
                       style={{display:"none"}}
                      className="form-control"
                      placeholder="Short description"
                       value={this.state.learning_expectation || ""}
                     
                    ></textarea>

                    <HTMLForm
                        title="learning_expectation"

                        placeholder={"learning_expectation"}
                        value={this.state.learning_expectation}
                        action={this.props.actions.learning_expectation}
                        stateAction={this.props.actions.stateAction}
                        name={"learning_expectation"}
                      />
                  </div>
                </div>





                <div class="form-group  mb-3 col-md-6 fl-left">
                 
                  <div class="" data-select2-id="94">
                    <select
                      style={{ position: "relative", zIndex: "1" }}
                      class="form-control select2 select2-hidden-accessible"
                      data-toggle="select2"
                      name="level"
                      id="level"
                      data-select2-id="level"
                      tabindex="-1"
                      aria-hidden="true"
                       value={this.props.enrolment_type}
                     onChange={this.props.handleChange}
                    >
                      <option value="1" data-select2-id="4">
                        Introductory
                      </option>
                      <option value="2" data-select2-id="95">
                        Intermediate
                      </option>
                      <option value="3" data-select2-id="96">
                        Advanced
                      </option>
                    </select>


                     <label class="col-md-12 col-form-label" for="level">
                    Level
                  </label>
                  </div>
                </div>




                <div class="form-group  mb-3 col-md-6 fl-left">
                  
                  <div class="" data-select2-id="94">
                    <select
                      style={{ position: "relative", zIndex: "1" }}
                      class="form-control select2 select2-hidden-accessible"
                      data-toggle="select2"
                      name="enrolment_type"
                      id="enrolment_type"
                      data-select2-id="level"
                      tabindex="-1"
                      aria-hidden="true"
                       value={this.props.level}
                     onChange={this.props.handleChange}
                    >
                      <option value="1" data-select2-id="4">
                        Open
                      </option>
                      <option value="2" data-select2-id="95">
                        By Invitation
                      </option>
                    </select>

                    <label class="col-md-12 col-form-label" for="level">
                    Enrollment Type
                  </label>
                  </div>
                </div>


                <div class="form-group  mb-3 col-md-6 fl-left">
                 
                  <div class="" data-select2-id="94">
                    <select
                      style={{ position: "relative", zIndex: "1" }}
                      class="form-control select2 select2-hidden-accessible"
                      data-toggle="select2"
                      name="entrance_exam_required"
                      id="entrance_exam_required"
                      data-select2-id="level"
                      tabindex="-1"
                      aria-hidden="true"
                       value={this.props.entrance_exam_required}
                     onChange={this.props.handleChange}
                    >
                      <option value="false" data-select2-id="0">
                        False
                      </option>
                      <option value="true" data-select2-id="1">
                        True
                      </option>
                    </select>

                     <label class="col-md-12 col-form-label" for="level">
                    Entrance Exam Required
                  </label>
                  </div>
                </div>





                 <div className="form-group col-md-6 fl-left">

                    <div class="file-drop-area col-md-12" style={{background: "#ffff",
  padding: "10px 0 10px 0", margin:"20px"}}>
                      <span class="fake-btn" style={{color:"#000",margin:"10px"}}>Choose Video File (mp4 only)</span>
                      <span class="file-msg"></span>
                      <input id="intro_video" name="intro_video" class="file-input" type="file" multiple   accept="video/mp4"
                               value={this.props.intro_video}
                               onChange={this.props.handleChange} />

                                 <div id="feedback2" style={{display:"none"}}>
    
  </div>
  
  <label  id="progress-label" for="progress" style={{display:"none"}}></label>
  <progress id="progress2" value="0" max="100" style={{display:"none"}}> </progress>
                    </div>

                    

                

</div>







 <div className="form-group col-md-6 fl-left">

                    <div class="file-drop-area col-md-12" style={{background: "#fff",
  padding: "10px 0 10px 0", margin:"20px"}}>
                      <span class="fake-btn" style={{color:"#000",margin:"10px"}}>Choose Image Files (.jpg/.png/.gif)</span>
                      <span class="file-msg"></span>
                      <input id="card_image" name="card_image" class="file-input" type="file" multiple   accept="image/*"
                               value={this.props.card_image}
                               onChange={this.props.handleChange} />

                                 <div id="feedback" style={{display:"none"}}>
    
  </div>
  
  <label  id="progress-label" for="progress" style={{display:"none"}}></label>
  <progress id="progress" value="0" max="100" style={{display:"none"}}> </progress>
                    </div>

                    
</div>


                








        







{/*
                <div className="mb-3 mt-3">
                  <button
                    type="button"
                    className="btn btn-primary text-center save-generic"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.saveAndContinue(e)
                    }}
                  >
                    Save 
                  </button>
                </div>*/}


                </form>

                <br />
                <br />
                <br />
                <br />
                <br />

                 <br />
                <br />
                <br />
                <br />
                <br />
</form>
                
              </div>
			  
            </div>{" "}
          </div>{" "}
        </div>
        <br />
        <br />
        <br />
        <br />
       
      </React.Fragment>
    );
  }

}


class Step5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareholders: [{ name: "" }],
    };
  }

  componentDidMount(){
    $('select').change(function(){
     if($('select option:selected').text() == "Define your score value"){
          $(this).after("<label>Enter your Grade Definition<input></input></label>");
     }
     else{
          $('label').remove();
     }
    });
  }

  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }]),
    });
  };

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx),
    });
  };

  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }
    const {institutions, languages, instructors, courses } = this.props
 
    return (
      <React.Fragment>
       <div className="tab-content b-0 mb-0" >
          <div className="tab-pane active" >
            <div className="row">
              <div className="col-md-12 card-box">

     
     <form id="schedules-formx" className="required-form schedules-form" action="#"  method="PATCH"  enctype="application/x-www-form-urlencoded">
        
        <div className="" id="outcomes">
          <div className="">
            <div className="col-md-12">
              





<div class="form-group  col-md-6 fl-left">
              
                <div class="" data-select2-id="94">

              <p>Select benchmark for an excellent score</p>
<select  class="form-control select2 select2-hidden-accessible"
                    data-toggle="select2">
  <option>- Please select a grade value - </option>
  <option>90-100%</option>
  <option>95-100%</option>
  <option>85%</option>
  <option>A++</option>
  <option>A+</option>
  <option>B+</option>
  <option>B++</option>
  <option>Define your score value</option>
</select>


</div>

</div>





<div class="form-group  col-md-6 fl-left">
              
                <div class="" data-select2-id="94">
<p>Select a bench mark for a very good score</p>
<select  class="form-control select2 select2-hidden-accessible"
                    data-toggle="select2">
  <option>- Please select a grade value - </option>
  <option>84-89%</option>
  <option>79%-83%</option>
  <option>70%-78%</option>
  <option>B-</option>
  <option>C+</option>
   <option>Define your score value</option>

</select>
</div>
</div>


<div class="form-group  col-md-6 fl-left">
              
                <div class="" data-select2-id="94">
<p>Select Bench mark for a fair pass mark</p>
<select  class="form-control select2 select2-hidden-accessible"
                    data-toggle="select2">
  <option>- Please select a grade value - </option>
  <option>60-69%</option>
  <option>60%-65%</option>
  <option>65%-69%</option>
  <option>C</option>
  <option>D</option>
  <option>E</option>
  <option>P</option>
   <option>Define your score value</option>
</select>
</div>
</div>




<div class="form-group  col-md-6 fl-left">
              
                <div class="" data-select2-id="94">

<p>Select Bench mark for a failure</p>
<select  class="form-control select2 select2-hidden-accessible"
                    data-toggle="select2">
  <option>- Please select a grade value - </option>
  <option>0-69%</option>
  <option>0%-50%</option>
  <option>0%-40%</option>
  <option>0-30%</option>
  <option>F</option>
  <option>E</option>
  <option>D</option>
   <option>Define your score value</option>
</select>

</div>
</div>



<div className="form-group col-md-6 fl-left">
               <p className="col-md-12 col-form-label" for="course_title">
                  Grace period after deadline for registration in weeks{" "}
                  <span className="required">*</span>{" "}
                </p>
               
                <div className="">
                  <input
                    style={{padding:"22px"}}
                    type="text"
                    className="form-control"
                    id="course_title2"
                    name="grace_period_after_deadline"
                    placeholder="Enter course title"
                    required=""

                  />
                  
                </div>
              </div>

              

              <div class="form-group  col-md-6 fl-left">
                
                <div class="" data-select2-id="94">
                <p class="col-md-12 col-form-label" for="level">
                  Assignment/Exam Type
                </p>
                  <select
                    class="form-control select2 select2-hidden-accessible"
                    data-toggle="select2"
                    name="assignment"
                    id="assignment"
                    data-select2-id="level"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option value="beginner" data-select2-id="4">
                      Professional
                    </option>
                    <option value="advanced" data-select2-id="95">
                      Certificate issued
                    </option>
                  </select>
                  
                </div>
              </div>

             
            </div>
          </div>
            
        </div>

</form>
        </div></div></div></div>
      </React.Fragment>
    );
  }
}

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareholders: [{ name: "" }],
    };
	this.bindUndo = this.undoDateTime.bind(this)
  }
  
  undoDateTime = (e) => {
	  let name = e.target.getAttribute("data-for");
	  if(name=="course_start_date_time" || 
        name =="course_end_date_time" || 
        name=="enrolment_start_date_time" ||
         name=="enrolment_end_date_time"){
			 
			//set this to date time when undo is clicked
       
		$("input[name='"+ name +"']").attr("type","datetime-local")
    $("input[name='"+ name +"']").focus() // trigger state change to be awear
    $("input[name='"+ name +"']").change() // trigger state change to be awear
     
      }
      
  }

  render() {
    const {institutions, languages, instructors, courses } = this.props
 
    // if (this.props.currentStep !== 2) {
    //   return null;
    // }
    return (
      <React.Fragment>
        <div className="tab-content b-0 mb-0" >
          <div className="tab-pane active" >
            <div className="row">
              <div className="col-md-12 card-box">

      <div >
	   <form id="schedules-form" className="required-form" action="#"  method="PATCH"  enctype="application/x-www-form-urlencoded">
        <div className="tab-pane-x" id="requirements">
          <div className="row card-box">
            <div className="col-md-12">
            
              <div className="form-group col-md-6 fl-left">
                 <label className="col-md-12 col-form-label" for="course_title">
                  Course Start Date <span className="required">*</span>{" "}
                </label>
                <div className="col col-md-12">
                  <input
                    type="text"
                    className="form-control col-md-10 fl-left"
                    id="course_start_date_time"
                    name="course_start_date_time"
                    placeholder="Enter course title"
                    required=""
                     value={this.props.course_start_date_time}
                     onChange={this.props.handleChange}
                  />
				  
				  	<div data-for="course_start_date_time" class="col-md-2 fl-left undo" onClick={(e)=>{ this.bindUndo(e)}}><i class="fa fa-plus"></i>Add</div>
                 
                </div>
              </div>

              <div className="form-group col-md-6 fl-left">
                 <label className="col-md-12 col-form-label" for="course_title">
                  Course End Date <span className="required">*</span>{" "}
                </label>
                <div className="col col-md-12">
                  <input
                    type="text"
                    className="form-control col-md-10 fl-left"
                    id="course_end_date_time"
                    name="course_end_date_time"
                    placeholder="Enter course title"
                    required=""
                     value={this.props.course_end_date_time}
                     onChange={this.props.handleChange}
                  />
				  
				  	<div data-for="course_end_date_time" class="col-md-2 fl-left undo" onClick={(e)=>{ this.bindUndo(e)}}><i class="fa fa-plus"></i>Add</div>
                 
                </div>
              </div>

              
              <div className="form-group col-md-6 fl-left">
                 <label className="col-md-12 col-form-label" for="course_title">
                  Enrollment Start <span className="required">*</span>{" "}
                </label>
                <div className="col col-md-12">
                  <input
                    type="text"
                    className="form-control col-md-10 fl-left"
                    id="enrolment_start_date_time"
                    name="enrolment_start_date_time"
                    placeholder="Enter course title"
                    required=""
                     value={this.props.enrolment_start_date_time}
                     onChange={this.props.handleChange}
                  />
				  
				  	<div data-for="enrolment_start_date_time" class="col-md-2 fl-left undo" onClick={(e)=>{ this.bindUndo(e)}}><i class="fa fa-plus"></i> Add</div>
                 
                </div>
              </div>

               <div className="form-group col-md-6 fl-left">
                 <label className="col-md-12 col-form-label" for="course_title">
                  Enrollment Start <span className="required">*</span>{" "}
                </label>
                <div className="col col-md-12">
                  <input
                    type="text"
                    className="form-control col-md-10 fl-left"
                    id="enrolment_end_date_time"
                    name="enrolment_end_date_time"
                    placeholder="Enter course title"
                    required=""
                     value={this.props.enrolment_end_date_time}
                     onChange={this.props.handleChange}
                  />
				  
				  	<div data-for="enrolment_end_date_time" onClick={(e)=>{ this.bindUndo(e)}} class="col-md-2 fl-left undo"><i class="fa fa-plus"></i> Add</div>
                 
                </div>
              </div>
			  
			  
			  
              <div class="form-group  mb-3 col-md-12 fl-left" style={{margin:"10px"}}>
                
                <div class="">
				 <label class="col-md-12 col-form-label" for="language_made_in">
                  Course Language
                </label>
                  <select
                    class="form-control select2 select2-hidden-accessible"
                    data-toggle="select2"
                    name="course_language"
                    id="language_made_in"
                    data-select2-id="language_made_in"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    
            <option value="1">English</option>
            <option value="2">French</option>
            <option value="3">Igbo</option>
            <option value="4">Hausa</option>
            <option value="5">Yoruba</option>
          
      
                  </select>
                 
                </div>
              </div>

              <div className="form-group col-md-6 fl-left">
                <label className="col-md-12 col-form-label" for="course_title">
                  Requirements/No of Hours of efforts{" "}
                  <span className="required">*</span>{" "}
                </label>
                <div className="">
                  <input
                    type="number"
                    className="form-control"
                    id="course_title"
                    name="requirement_hours_per_week"
                    placeholder="Enter course title"
                    required=""
                    value={this.props.requirement_hours_per_week}
                    onChange={this.props.handleChange}
                  />
                </div>
              </div>

              <div className="form-group col-md-6 fl-left">
                <label className="col-md-12 col-form-label" for="course_title">
                  No of weeks <span className="required">*</span>{" "}
                </label>
                <div className="">
                  <input
                    type="number"
                    className="form-control"
                    id="requirement_no_of_week"
                    name="requirement_no_of_week"
                    placeholder="Enter course title"
                    required=""
                    value={this.props.requirement_no_of_week}
                    onChange={this.props.handleChange}
                  />
                </div>
              </div>

             
             

                
                
              <div class="form-group  mb-3 col-md-6 fl-left">
                <label class="col-md-12 col-form-label" for="level">
                  Course Pacing
                </label>
                <div class="" data-select2-id="94">
                  <select
                    class="form-control select2 select2-hidden-accessible"
                    data-toggle="select2"
                    name="course_pacing"
                    id="course_pacing"
                    data-select2-id="level"
                    tabindex="-1"
                    aria-hidden="true"
                     value={this.props.course_pacing}
                     onChange={this.props.handleChange}
                  >
                    <option value="1" data-select2-id="4">
                      Instructor Paced
                    </option>
                    <option value="2" data-select2-id="95">
                      Self Paced
                    </option>
                  </select>
                </div>

              </div>
            </div>
          </div>
        </div>
		</form>
    </div>

      </div>
        </div>
          </div>
            </div>
      </React.Fragment>
    );
  }
}

class Step4 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collaborators: [],

    };
	

	
  }
  
  componentDidMount(){
	     
	  	//auto preset team lead or throw error if team lead dont exist
    $(document).ready(()=>{
		//show loader to fetch the instructor
		                     
	  setTimeout(()=>{
		  //end loader
		  
		   this.teamLeadDetail()
	  },10000);
	  
	  let leadNext = document.getElementById("nextLead");
	  let collaboNext =  document.getElementById("nextCollaborator")
	  
	  

	})  
  }
  
  nextInstructor(){
	 // alert("called fron template string clicked")
	  //change this logic to be infinitely indepenedent on the id
	  // document.getElementById("card1").className = "card1 animate-slide-out";
    //document.getElementById("card2").className = "card2 animate-slide-in";

  }
  
  nextCollaborator(){
	  // document.getElementById("card2").className = "card2 animate-slide-out";
    //document.getElementById("card1").className = "card1 animate-slide-in";
  }
  
  async teamLeadDetail(){
	 //encapsulate the feature of the leadinstructor search
	  
	  if(localStorage.getItem("author")){
		  const leadId = localStorage.getItem("author")
	  
		  //then a team lead
		  let leadDetail =  await this.getLeadDetail();
		  
		  if(leadDetail){
		  leadDetail = leadDetail.profile
		  let teamleadTemplate =`<div style="background:#rgba(8,23,200);padding:20px;display:block" id="" class="fl-left col-md-6">
                    
                    <div class="">
                      
                        <span class="mdl-chip">
                        <span style={{color:"#000"}}  data-filter=".mdl-card" data-filter-tag="a">Contact Detail</span>
                        </span><br/>
                         <span class="mdl-chip">
                        <span style={{color:"#000"}}  data-filter=".mdl-card" data-filter-tag="e">Full Name: ${leadDetail.first_name} ${leadDetail.last_name}</span>
                        </span><br/>
                        <span class="mdl-chip">
                        <span style={{color:"#000"}}  data-filter=".mdl-card" data-filter-tag="e">Email: ${leadDetail.email}</span>
                        </span><br/>
                        <span class="mdl-chip">
                        <span style={{color:"#000"}}  data-filter=".mdl-card" data-filter-tag="g">Phone ${leadDetail.phone_number}</span>
                        </span><br/>
                    </div>
                    
                    
                </div>
              `
			  
			  
			  
			  let collaborators = $("#collabo-guys")
			  collaborators.append(teamleadTemplate)
	      }else{
			  //some error occured
		  }
	  }else{
		  //swal("Notice","Please Ensure to have a team lead")
		  //let teamLeadInstall = document.querySelector("div#teamleadInstall");
		 // teamLeadInstall.style.opacity="1"
		  return "No Team Lead"
	  }
  }
  
  async getLeadDetail(){
	 //a fresh api search detail of instructor to find all information of the team leader
	 //avoid expensive api calls
	 if(localStorage.getItem("author")){
		 let instructorId = localStorage.getItem("author")
     try{
       let lead_guy = await getInstructorProfile(instructorId)
     console.log(lead_guy)
     return lead_guy

     }catch(e){
      console.log("Could not fetch record due to  error:"+ e)


     }
		
	 }else{
		 //add a team lead error here
		 
		 return false
	 }
	
  }
  
  
  getInstructorsDetail(name){
	  
	 const { instructors } = this.props;
	 console.log(instructors)
     let searchResults = instructors.find(instructor => {
		 let fullname = instructor?.profile?.first_name + ""+ instructor?.profile?.last_name
        if(fullname.toLowerCase() == name.toLowerCase()){
			return instructor
		}else if(instructor?.profile?.email == name){
			return instructor
		}else if(instructor?.profile?.phone_number == name){
			return instructor
		}else{
			
			swal("Instructor was not found with input data: "+ name);
			return false;
		}
        
      }) 
	  return searchResults;
  }
  
  runLoopSlideShow(){
	 if(localStorage.getItem("authoring_team")){
		//foreach json parse of the collaboratores
        //add rev slideshow
		let teamMates = JSON.parse(localStorage.getItem("authoring_team"))
			           						
	  }
				  
  }
  
  redrawFrame(){
	 return this.runLoopSlideShow()
  }





  render() {
    const { instructors } = this.props;
	
    // if (this.props.currentStep !== 5) {
    //   return null;
    // }
    return (
      <React.Fragment>
         <div className="tab-content b-0 mb-0" >
          <div className="tab-pane active" >
            <div className="row">
              <div className="col-md-12 card-box">

        <div className="tab-pane-x schedules-form " id="pricing">
          <div className="">
            <div className="col-md-12">
              

              <div className="row">
        <div className="col-md-12">
		
		
		
		
		<div className="form-group col-md-6 fl-left">
                 <label className="col-md-12 col-form-label" for="course_title">
                  Search or add collaborator by name ,email or phone number<span className="required">*</span>{" "}
                </label>
                <div className="col col-md-12 collaboratorlist-append">
                  <input
                    type="text"
                    style={{padding:"22px"}}
                    className="form-control col-md-10 fl-left"
                    id="collaboratorslist"
                    name="collaboratorslist"
                    placeholder="Search or add collaborator"
                    required=""
                     
                     onChange={this.props.handleChange}
                  />
				  
				  	<div   class="col-md-2 fl-left undo" 
                                onClick={ () => {
			  let temp =JSON.stringify([])
              let values = (this.state.collaborators.length > 0 ) ? this.state.collaborators : [];
			  if(localStorage.getItem("authoring_team") ){
				  temp = localStorage.getItem("authoring_team") || JSON.stringify([])
				  	  
			  }else{
				   localStorage.setItem("authoring_team",JSON.stringify([]))
			  }
          			  
             			  

              swal({
                text: 'Search for an instructor by email/ phone number or fullname e.g. "saladinjake@company.com ".',
                content: "input",
                button: {
                text: "Search!",
                closeModal: false,
                },
              })
              .then(name => {
                if (!name)  return swal("No instructor email or phone entered was entered!");
                  // check if user existed in our initial fetch 
                  // do not make another api request 
                  //this saves pull request

                     
                  //TODO: if no collaborators selected 
                  //LET THE LOGGED IN OR LEAD INSTRUCTOR BE APPENDED AS A COLLABORATOR

                let targetInstructor = this.getInstructorsDetail(name) // if not false continue below
               
                  if(targetInstructor){
                     let collaborators =  $("#collabo-guys")
					 
					 
			
		            let collaboratorsTemplate =`<br/><div style="background:#f6f6f6;padding:20px;width:100%;display:none" id="${targetInstructor.profile?.id}" class="card2 animate-slide-out">
                    <div class="mdl-card__media">
                            <div class="article-image-purple">
                                <div class="mdl-card__title">
                                    <h4 class="mdl-card__title-text title-text--white">Collaborator: ${targetInstructor.profile?.first_name} ${targetInstructor.profile?.last_name}</h4>
                               <hr/>
							   </div>
								
                            </div>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <!-- TAG Chips -->
                        <span class="mdl-chip">
                        <span class="mdl-chip__text"  data-filter=".mdl-card" data-filter-tag="a">Contact Detail</span>
                        </span><br/>
                        <span class="mdl-chip">
                        <span class="mdl-chip__text" data-filter=".mdl-card" data-filter-tag="e">Email: ${targetInstructor.profile?.email}</span>
                        </span><br/>
                        <span class="mdl-chip">
                        <span class="mdl-chip__text" data-filter=".mdl-card" data-filter-tag="g">Phone ${targetInstructor.profile?.phone_number}</span>
                        </span><br/>
                    </div>
                    <div class="mdl-card__supporting-text">
                        Title :
                    </div>
                    <div class="mdl-card__actions mdl-card--border pagination">
                        <a id="brianna" class="next btn-next mdl-button btn-default" style="color:#fff">NEXT</a>
                    </div>
                </div>
              `
			
                      
                   
                     
                    collaborators.append(collaboratorsTemplate)
               
                  //this is the logic behind filling the multiple select hidden field input arrays of authoring_team
				  //DO NOT DELETE THIS LINES
                   // now let js do the dynamic selection of the hidden authoring_team select form fields
                    const { name, id, email, phone_number} = targetInstructor?.profile
                     values.push(
					  id,
					 //{
                      //id ,name, email, phone_number
                     //}
					 )
					 
                   //SAVES THE STATE TO LOCAL STORE AND REACT STATE
                   //this.setState({authoring_team: values})
				   this.setState({collaborators: [...this.state.collaborators, {id,name,email,phone_number}]})
                   //let teamMateBlocs = $('select[name=authoring_team]').val(this.state.collaborators) // all collaborators as listArray
				   //let newMate = (<option)
				   
				   //console.log($('select[name=authoring_team]').val())
                   
					if(temp?.match(/[\[\.*\]]/)){
						 let tempstore = localStorage.getItem("authoring_team")
            
               console.log(tempstore)
               temp = JSON.parse(tempstore)
               temp = [...temp,...values]
               localStorage.setItem("authoring_team",JSON.stringify(temp))

             
						
					}else{
            if(localStorage.getItem("authoring_team").length > 0){
               temp = localStorage.getItem("authoring_team")
             }else{
               temp =localStorage.getItem("author")
             }
           
          }
					console.log(localStorage.getItem("authoring_team"))
                   return swal("Success!", "The Instructor was found", "Success");

                 }else{

                    
                   swal("Error", "We could not find instructor. If you search request is by email, ensure case sensitivity for the exact email request", "error");
            
                   swal.stopLoading();
                   return swal.close();
                

                 }
              })
             
      }}
	  ><i class="fa fa-plus"></i> Add</div>
                 
                </div>
              </div>
		
		
		
		



                      

        




                <div  className="col-md-6 fl-left">
				    <h4 style={{color:"#000"}}>Course Team</h4><hr/>
					
					
					<main class="mdl-layout__content">
            
                   <div id="collabo-guys" class="content-grid mdl-grid portfolio-max-width">
				   {/*this.runLoopSlideShow()*/}

				   
                     </div>
				  
				  </main>
				  
				  <div id="teamleadInstall" style={{opacity:"0"}}>
					    <h5 >Add Team Lead</h5>
						{/*action event to add a team lead if he was not added or removed by mistake*/}
						<hr/>
					</div>
                   
                </div>

               {/* hidden field that updates its array of data*/}
               { /*fields will be selected as user finds the  exact email/ phone or name 
                of the instructors to be added as collaborators*/}
                <select name="authoring_team[]" multiple  style={{display:"none"}}>
                      {this.state.collaborators.length > 0  && this.state.collaborators.map(instructor => {
                          return (
                             <option value={instructor.id}>{instructor.name}</option>
                          )
                      })}
                </select>
				
				<div class="container-fluid">
				   <div class="row">
				   <h4>Collaborators</h4>
				      <div class="col-md-12">
					  {this.state.collaborators.length > 0  && this.state.collaborators.map(instructor => {
                          return (
                            <div class="col-md-3">
							<div id="" class="card2 animate-slide-out">
                    <div class="mdl-card__media">
                            <div class="article-image-purple">
                                <div class="mdl-card__title">
                                    <h4 class="mdl-card__title-text title-text--white">Collaborator: {instructor.first_name} {instructor.last_name}</h4>
                               <hr/>
							   </div>
								
                            </div>
                    </div>
                    <div class="mdl-card__supporting-text">
                      
                        <span class="mdl-chip">
                        <span class="mdl-chip__text"  data-filter=".mdl-card" data-filter-tag="a">Contact Detail</span>
                        </span><br/>
                        <span class="mdl-chip">
                        <span class="mdl-chip__text" data-filter=".mdl-card" data-filter-tag="e">Email: {instructor.email}</span>
                        </span><br/>
                        <span class="mdl-chip">
                        <span class="mdl-chip__text" data-filter=".mdl-card" data-filter-tag="g">Phone {instructor.phone_number}</span>
                        </span><br/>
                    </div>
                    <div class="mdl-card__supporting-text">
                        Title :
                    </div>
                    
                </div>
							</div>
                          )
                      })}
					    
					  </div>
				   </div>
				
				</div>


          
          <br />
          
        </div>

        <br />
        <br />
      </div>




            </div>
          </div>
        </div>


        </div>
        </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
}



const editSaveSection = (e) => {

   $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.
   
  let element =  $(e.target);
  let form = $("#form-edit-section")
 

  if(localStorage.getItem("course_edit")){

      document.getElementById("course_val_id").value =localStorage.getItem("course_edit");
     form = $("#form-edit-section");
     let url = "/lms/api/update/section/"+ element.attr("editing_course_id") + "/";
     let sectionRes = createAnyResource('PATCH',url,form)
     console.log(sectionRes)
  }else{
    //something went wrong here 

    //detect if this was an attacker event trying to gain access
  }
  

 


  $(".miller_" + localStorage.getItem("tracker"))
    .find(".tits")
    .text($("#title_edit").val());
  $(".miller_" + localStorage.getItem("tracker"))
    .find(".pcs")
    .text($("#section_id_edit").val());
};

const editSaveSubSection = (el) => {


    $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.
   
  let element =  $(el.target);
  let form = $("#form-edit-subsection")
 

    //Recieving end here: from button injected payload ::::====

      document.getElementById("subsection_id").value =element.attr("editing_parent_id") ;
     form = $("#form-edit-subsection"); //checked
     let url = "/lms/api/update/subsection/"+ element.attr("editing_subsection_id") + "/";
     let sectionRes = createAnyResource('PATCH',url,form)
     console.log(sectionRes)


     let rootParent = document.getElementById("dynamic_subsection_"+ element.attr("root_parent"))
     rootParent = $(rootParent)
  

  
  // $(".muu_" + localStorage.getItem("s_tracker"))
   rootParent
    .find("#title_sub_"+ element.attr("root_parent"))
    .text($("#title_edit_2").val());
  // $(".muu_" + localStorage.getItem("s_tracker"))
   rootParent
    .find(".subsect")
    .text($("#section_id_edit_2").val());
};




const editSaveLessons = (e) => {

   $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.
   
  let element =  $(e.target);
  let form = $("#form-edit-lesson")



  document.getElementById("subsection_lid").value =$(e).attr("data-parent-id");
  form = $("#form-edit-lesson");
  let url = "/lms/api/update/lesson/"+ element.attr("editing_lesson_id") + "/";
  let sectionRes = createAnyResource('PATCH',url,form)
  console.log(sectionRes)

  //this is bizarre: it exist but dont update the dom

  // $(".fold-content")
  //   .find(".title_sub"+ element.attr("root_parent"))
  //   .text($(e).attr("editing_course_name") );

  let rndId= "dynamic_subsection_" + element.attr("root_parent") + "_lesson_component"

//this should do the trick
  let rootParent = document.getElementById(rndId);
  let headTitle = rootParent.querySelector("#title_sub_"+element.attr("root_parent"))
  headTitle.innerHTML = $("#title_edit3").val() 

  // $(".muu_" + localStorage.getItem("ls_tracker"))
  
 
};


const Step2 = (props) => {
  const handleTabClick = (tab) => {
    const Tab = tab.target;
    const Tabs = document.querySelectorAll(".modal-tab");
    const TabContents = document.querySelectorAll(".modal-build-content");

    Tabs.forEach((elem) => {
      elem.classList.remove("active-tab");
    });
    TabContents.forEach((content) => {
      content.classList.remove("active-content");
      if (content.classList.contains(tab.target.classList[1])) {
        content.classList.add("active-content");
      }
    });
    Tab.classList.add("active-tab");
  };

  const closeModal = () => {
    // let activeBlock;

    const Modal = document.getElementById("myModalLessonGroup");
    // activeBlock = undefined;
    Modal.style.display = "none";
  };

  const handleWindowClick = (e) => {
    const Modal = document.getElementById("myModalLessonGroup");

    if (e.target == Modal) {
      closeModal();
    }
  };





  useEffect(() => {
    const Tabs = document.querySelectorAll(".modal-tab");
    const TabContents = document.querySelectorAll(".modal-build-content");
    const Widgets = document.querySelectorAll(".pb-widget");

    Widgets.forEach((widget) => {
      widget.onclick = handleWidgetClick;

    });
    Tabs.forEach((tab) => {
      tab.onclick = handleTabClick;
    });



    //settimeout
    collapsibleEffect();




    



     //disable enter key in a modal section when creating section/lessons
     $(document).keyup(function(objEvent) {
      if (objEvent.keyCode ==  13) {
          return false
      }
    });







  });

  let call = true;
  const handleClonedEvents = (e) => {
    e.preventDefault();

    //alert("calling component action")
    if (
      call == true &&
      e.target.matches(".pb-widget") &&
      e.target.hasAttribute("data-template") &&
      e.target.hasAttribute("data-type")
    ) {
      call = false;
      handleWidgetClick(e);
    }
  };

  // powerful script handler for both creat and edit unit trigger
  // 3 dead birds with one stone


const saveGenericEditContent = () =>{

}

const addGenericContent = () =>{}

const saveMarkdownEditContent = () => {

  let targetHead = document.getElementById("myModalMarkdownEditorEditMode").getAttribute("data-parent")
  targetHead.querySelector("")

}
                    



  const handleWidgetClick = (e) => {

    // only handles html iframe video and live streams features

    // actions are segregated for complexity and abstraction reasons
    let that = this;
    const Widget = e.target;
    const Type = Widget.getAttribute("data-type");
    const TemplateType = Widget.getAttribute("data-template"); //
    $("#title-unit").val("")
    //$("#title-unit2").val("")
    $(".iframe-boxer").attr("src","")
    $(".main-videosection2").attr("src","")
    $("#projector-view").attr("src","")
      // $(".iframe-boxer").attr("src","")
    $(".visuell-view").html(getTemplateType(TemplateType))


    // $("#input-area").val("")
    // $("#output-area").html("")
    // $("#input-area2").val("")
    // $("#output-area2").html("")
    
    //widget
    let Target = $(".dynamo_" + localStorage.getItem("l_tracker"));
    // let Title = Widget.querySelector("a").innerHTML;
    let MainClone = null

    closeModal(); //close the selected modal fot the lesson component
    //the add action begins
    //now open another modal box that prompts user for the required data input
    //with the required template type form box
    //then append unto the desired location for the requested widget
    let allowedHeaders = null;

    let Clone = null;
    let markdownTemplate = ``
    let htmlEquivalentTemplate =``;
    let _title =``;
    document.querySelector(".main-videosection2").style.display="none" //hide if not video
    // alert(TemplateType)
    switch (TemplateType) {
      case "[pb_html][/pb_text]": 
       _title ="HTML: Text Component"   // all these types are custom markdown that will be set with replacer function
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_text]",
          Target,
          MainClone,

          _title
        );
       
        markdownTemplate = "[pb_html][/pb_text]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_text]")
        break;
      case "[pb_html][/pb_iframe]":
         _title ="HTML: I-frame Component"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_iframe]",
          Target,
          MainClone,
          _title
        );
        markdownTemplate = "[pb_html][/pb_iframe]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_iframe]")

        //change the field of the modal to match the widget module
        // $(".root-block").css({
        //   display:"none"
        // })


        // $(".iframe-box").css({
        //   display:"none"
        // })

        allowedHeaders =  document.querySelector("form#myModalGenericForm-SELECT")
        allowedHeaders.setAttribute('data-basestation', ".dynamo_" + localStorage.getItem("l_tracker"))
        allowedHeaders.setAttribute("data-markdown", TemplateType)
        allowedHeaders.setAttribute("external_source","enabled")
        




         //change the field of the modal to match the widget module
        // $(".change-title").html("I frame Title")
        $(".change-title2").html("Add a link to the resource page ( Website )")
        // $(".change-description").html("Iframe Component")
        
        break;

      case "[pb_html][/pb_common_problems]":
        // i changed the strategy to this
        //just launch an entirely new panel work bench for problems
        // because problem component is a whole new big stuff to handle
        $("#openModal-about").css({opacity:1})

        //problem creation form box

        //actually this is for the reinitialization of creating question
        // after the problem component has been created or existed
        allowedHeaders =  document.getElementById("openModal-about")
        allowedHeaders.setAttribute('data-basestation', ".dynamo_" + localStorage.getItem("l_tracker"))
        allowedHeaders.setAttribute("data-markdown", TemplateType)
        allowedHeaders.setAttribute("data-url","/lms/api/create/question/");
        $("#problemcomponent_form").css({display:"block"}).fadeIn("slow")

        //lauch headers
        break;

      case "[pb_html][/pb_discussions]":
        // i changed the strategy to this
        //wow how did you call the form to display?
        //Answer: Magic!!!
        allowedHeaders =  document.getElementById("myModalDiscussionForm-CREATESELECT")
        allowedHeaders.setAttribute('data-basestation', ".dynamo_" + localStorage.getItem("l_tracker"))
        allowedHeaders.setAttribute("data-url","/lms/api/create/discussion-component/");

        //lauch headers
        break;
      case "[pb_html][/pb_broadcasting]":
        _title ="Html : Video Broadcast"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_broadcasting]",
          Target,
          MainClone,
          _title
        );
          markdownTemplate =  "[pb_html][/pb_broadcasting]"
        htmlEquivalentTemplate =  getTemplateType("[pb_html][/pb_broadcasting]")


        //change the field of the modal to match the widget module
        $(".change-title").html("Meeting Link")
        $(".change-title2").html("Meeting ID")
        $(".change-description").html("Add your meeting details")

         $(".iframe-box").css({
          display:"none"
        })


        break;
      case "[pb_html][/pb_confrencing]":
       _title ="Html : Video Conferencing"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_confrencing]",
          Target,
          MainClone,
          _title
        );
          markdownTemplate = "[pb_html][/pb_confrencing]"
        htmlEquivalentTemplate =  getTemplateType("[pb_html][/pb_confrencing]")

         //change the field of the modal to match the widget module
        $(".change-title").html("Meeting Link")
        $(".change-title2").html("Meeting ID")
        $(".change-description").html("Add your meeting details")

        // $(".iframe-box").css({
        //   display:"none"
        // })

        break;
      case "[pb_html][/pb_you_tube]":
         document.querySelector(".main-videosection2").style.display="block" //hide if not video


         
       _title ="HTML : Video YouTube"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_you_tube]",
          Target,
          MainClone,
          _title
        );
          markdownTemplate = "[pb_html][/pb_you_tube]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_you_tube]")

   
         //change the field of the modal to match the widget module
        $(".change-title").html("Video Title")
        $(".change-title2").html("Video Link")
        $(".change-description").html("Add a You Tube Link")

        break;
       case "[pb_html][/pb_vimeo]":
         document.querySelector(".main-videosection2").style.display="block" //hide if not video

         $(".iframe-box").css({
          display:"none"
        })
   
        _title ="HTML : Vimeo Video  "

        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_vimeo]",
          Target,
          MainClone,
          _title
        );
        markdownTemplate = "[pb_html][/pb_vimeo]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_vimeo]")

         //change the field of the modal to match the widget module
        $(".change-title").html("Video Title")
        $(".change-title2").html("Video Link")
        $(".change-description").html("Add a Vimeo Link")

        break;
      default:
       //Clone = launchFormBoxIntoModal("[pb_html][/pb_text]",Target,MainClone, "HTML: Text Editor")
        return false;
    }

   
     
  };





  const launchFormBoxIntoModal = (TemplateType,Target,cloneElement, componentTitle) =>{
    //add code deception from data-fields

    // avoid reinventing wheel for discussion and problem component quickly add headers if they are of type

    //just get the modal that initiates the creation and add headers to it
   let allowedHeaders = null
    if(TemplateType =="[pb_html][/pb_iframe]" || TemplateType =="[pb_html][/pb_video]"
     || TemplateType =="[pb_html][/pb_broadcasting]" || TemplateType == "[pb_html][/pb_google_meet]"
     || TemplateType == "[pb_html][/pb_confrencing]" ||  TemplateType == "[pb_html][/pb_vimeo]"  ||  TemplateType == "[pb_html][/pb_you_tube]"
     ){
      allowedHeaders =  document.getElementById("myModalGenericForm")
      allowedHeaders.setAttribute('data-basestation', ".dynamo_" + localStorage.getItem("l_tracker"))
      allowedHeaders.setAttribute("data-markdown", TemplateType)
      allowedHeaders.setAttribute("data-url",video_component_url);

    }else{

      //alert(TemplateType)
      allowedHeaders =  document.getElementById("myModalMarkdownEditor")
      allowedHeaders.setAttribute('data-basestation', ".dynamo_" + localStorage.getItem("l_tracker"))
      allowedHeaders.setAttribute("data-markdown", TemplateType)
      allowedHeaders.setAttribute("data-title",componentTitle)
      allowedHeaders.setAttribute("data-url",html_component_url);


    }

     
  }



  function dragstart_handler(ev) {
   // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";

    console.log(ev.target.id);
  }
  function dragover_handler(ev) {
   ev.preventDefault();
   ev.dataTransfer.dropEffect = "move"
  }
  function drop_handler(ev) {
   ev.preventDefault();
   // Get the id of the target and add the moved element to the target's DOM
   const data = ev.dataTransfer.getData("application/my-app");
   ev.target.appendChild(document.getElementById(data));
}

   //smooth draging with restrictions and positioning update tracker
   //sections can only be swiched with section positions
   useEffect(() => {

    $(document).ready(() => {
      let givenSections = $(".section-list");
       if(givenSections.length > 0){
            givenSections = givenSections.get(0); //jq to v-js
            Array.from(givenSections).forEach(section =>{
            
             //enable draggable effect
             section.setAttribute("draggable",true);
             //
             //handle events on drag and add restriction to drag into positions
             section.addEventListener("dragstart",(ev) => {
                dragstart_handler(ev);
             })
             //keep track of positioning
          })
       }
    })
      
   })







  function handleModalInputFromUser(e) {
   //no use
   }


  if (props.currentStep !== 6) {
    return null;
  }
  let groupOwner = props.groups

  return (
    <React.Fragment>

  

      <div className="tab-pane schedules-form" id="media">
        <div className="row">
          <div className="col-md-12">
            {/* <div id="nestable-menu">
    <button type="button" class="btn btn-default btn-responsive" data-action="expand-all"><i class="fa fa-plus"></i> Expand All</button>
    <button type="button" class="btn btn-default btn-responsive" data-action="collapse-all"><i class="fa fa-minus"></i> Collapse All</button>
    <button type="button" class="btn btn-default btn-responsive" id="appendnestable"><i class="fa fa-magic"></i> Add Section</button>
    <button type="button" class="btn btn-default btn-responsive" id="removeall"><i class="fa fa-bomb"></i>Clear</button>
  </div>*/}
  <span class="hint-message" style={{}}> </span>
                  
            <ul class="fold-table course-window table-implement-row">
              
                <li>
                  <span>Section Name</span>
                  <span class="action" style={{ float: "right" }}>
                    <span class="visible-small" title="Strategy C">
                      Action
                    </span>
                    <span class="visible-big">Action </span>
                  </span>
                </li>
              </ul>

              <div id="position-id">positionin test id: <span id="counterpos"></span></div>

              <ul id="js-parent" class="widow-window drag-sort-enable"></ul>
            
            <br />
            <br /> <br />
            <br />
            <br />
            <a
              style={{ marginRight: "10px", background:"rgba(8,23,200)", color:"#fff" }}
              href="#myModal"
              role="button"
              data-toggle="modal"
              className="alignToTitle btn  btn-rounded btn-lg"
            >
              <i className=" mdi mdi-keyboard-backspace"></i>New Section
            </a>
            <br />
            <br />
          </div>
        </div>



        <div
          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Section Detail
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <p>Add a title to the section</p>
                <div class="row">
                  <div class="divided col-md-12">
                  <form id="addSectionForm" enctype="application/x-www-form-urlencoded">
                    <div class="form-group">
                      <label>Title</label>
                      <input name="name" type="text" class="form-control" id="title" />
                    </div>

                    <div class="form-group" >
                      <label>Section ID</label>
                      <input style={{display:"none"}} name="position_id" type="text" class="form-control" id="section_id" />
                    </div>

                    <div class="form-group" style={{display:"none"}} >
                      <label>Section ID</label>
                      <input  name="course" type="text" class="form-control" id="sec_course_id" value={getIdFromUrl()} />
                    </div>


                    <div class="form-group" style={{display:"none"}} >
                      <label>Release Date</label>
                      <input  name="release_date" type="datetime-local" class="form-control" id="release_date" />
                    </div>


                    <select style={{display:"none"}} class="form-control" name="group_passed" id="id_group_passed">
                      <option value="" selected="">-----SELECT A VISIBLE GROUP----</option>

                      {groupOwner && groupOwner.map(group =>{
                        return (
                            <option value={group.id}>{group.name}</option>
                        )
                      })}
                    </select>


                    <div class="form-group" style={{display:"none"}} >
                      <label>Publication Status</label>
                     <select class="form-control" name="publication_status">
                          <option value="1">Draft (Never Published)</option>
                          <option value="2">Published and Live</option>
                          <option value="3">Draft Unpublished Changes</option>
                          <option value="4">Visible to Staff Only</option>
                  </select>
                    </div>




                    <div class="form-group">
                      <label>Overview</label>
                      <textarea name="description" id="description" class="form-control" style={{height:"300px"}}></textarea>
                    </div>
                    </form>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  onClick={addSectionContent}
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModalEdit"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 id="switch_title" class="modal-title pull-left" style={{ color: "#000" }}>
                  Editing Section Detail
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <p>Add a title to the section</p>
                <div class="row">
                  <div class="divided col-md-12">
                  <form id="form-edit-section" enctype="application/x-www-form-urlencoded; charset=UTF-8">
                    

                    <div class="form-group">
                      <label>Title</label>
                      <input type="text" class="form-control" name="name" id="title_edit" />
                    </div>


                    <div class="form-group">
                      <label>Position ID</label>
                      <input
                        type="text"
                        class="form-control"
                        id="position_id"
                        name="position_id"
                      />
                    </div>


                    <div class="form-group" style={{display:"none"}}>
                      <label>Course ID Field</label>
                      <input
                        type="text"
                        class="form-control"
                        id="course_val_id"
                        name="course"
                        value=""
                      />
                    </div>


                    

                    <div class="form-group">
                      <label>Description</label>
                      <textarea name="description" class="form-control" style={{width:"100%"}} placeholder="short description of this section" name="description" id="title_desc_edit" ></textarea>
                    </div>





                    <button
                  onClick={(e)=>{ editSaveSection(e) }}
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Add
                </button>
       </form>

                  </div>
                </div>
              </div>

              <div class="modal-footer">
                
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModalSubSectionEdit"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Editing Section Detail
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
                style={{ height: "400px", overflowY: "scroll" }}
              >

                <p>Add a title to the section</p>
                <div class="row">
                  <div class="divided col-md-12">

                  <form id="form-edit-subsection" method="patch" enctype="application/x-www-form-urlencoded; charset=UTF-8"> 
              
                    <div class="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        class="form-control"
                        id="title_edit_2"
                        name="name"
                      />
                    </div>


                    <div class="form-group">
                      <label>Position Id</label>
                      <input
                        type="text"
                        class="form-control"
                        id="position_id2"
                        name="position"
                      />
                    </div>

                    <div class="form-group" style={{ display: "none" }}>
                      <label>Section ID</label>
                      <input
                        type="text"
                        class="form-control"
                        name="section"
                        id="subsection_id"
                      />
                    </div>

                    <div class="form-group">
                      <label>Description</label>
                      <textarea class="form-control" id="title_desc_edit2" name="description"></textarea>
                    </div>


                    <button
                  onClick={(e) => {editSaveSubSection(e)}}
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Save
                </button>

                </form>


                  </div>
                </div>


                
              </div>


              <div class="modal-footer">
                
              </div>
            </div>
          </div>
        </div>




        <div
          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModalEditLesson"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 id="switch_title" class="modal-title pull-left" style={{ color: "#000" }}>
                  Editing Lesson  Detail
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <p>Add a title to the section</p>
                <div class="row">
                  <div class="divided col-md-12">
                  <form id="form-edit-lesson" enctype="application/x-www-form-urlencoded; charset=UTF-8">
                    

                    <div class="form-group">
                      <label>Title</label>
                      <input type="text" class="form-control" name="name" id="title_edit3" />
                    </div>


                    <div class="form-group">
                      <label>Position ID</label>
                      <input
                        type="text"
                        class="form-control"
                        id="position_id3"
                        name="position_id"
                      />
                    </div>


                    <div class="form-group" style={{display:"none"}}>
                      <label>subsection id Field</label>
                      <input
                        type="text"
                        class="form-control"
                        id="subsection_lid"
                        name="subsection"
                        value=""
                      />
                    </div>





                    

                    <div class="form-group">
                      <label>Description</label>
                      <textarea name="description" class="form-control" style={{width:"100%"}} placeholder="short description of this section" name="description" id="title_desc_edit3" ></textarea>
                    </div>





                    <button
                  onClick={(e)=>{ editSaveLessons(e) }}
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Save
                </button>
       </form>

                  </div>
                </div>
              </div>

              <div class="modal-footer">
                
              </div>
            </div>
          </div>
        </div>






        <div
          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModalSubsection"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Sub Section Detail
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <p>Add a title to the section</p>
                <div class="row">
                  <div class="divided col-md-12">
                  <form id="addSubSectionForm" enctype="application/x-www-form-urlencoded" name="addSubSectionForm" class="addSubSectionForm">
                    <div class="form-group">
                      <label>Title</label>
                      <input name="name" type="text" class="form-control" id="title_2" />
                    </div>

                    <div class="form-group"  style={{display:"none"}}>
                      <label>Sub Section ID</label>
                      <input
                        type="text"
                        class="form-control"
                        id="section_id_2"
                        name="position_subsection"
                      />
                    </div>


                    <div class="form-group"  style={{display:"none"}}>
                      <label>Section Mount ID</label>
                      <input
                        type="text"
                        class="form-control"
                        id="section_mount_id"
                        value=""
                        name="section"
                      />
                    </div>

                    <div class="form-group">
                      <label>Overview</label>
                      <textarea class="form-control" id="overview-set" name="description" style={{height:"200px"}}></textarea>
                    </div>


                    <button
                  onClick={(el) => {addSubSectionContent()}}
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Save
                </button>
                    </form>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                

              </div>
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModalDelete"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Delete this section
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <p>Add a title to the section</p>
                <div class="row">
                  <div class="divided col-md-12">
                    <p>Are you sure about this?</p>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModalExport"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Delete this section
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <p>Add a title to the section</p>
                <div class="row">
                  <div class="divided col-md-12">
                    <p>this is the export format to the database</p>
                    <div id="export"></div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ marginTop: "80px" }}
          class="modal "
          id="myModalLesson"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Add a lesson
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <p>Add a title to the lesson</p>
                <div class="row">
                  <div class="divided col-md-12">
                  <form id="addLessonSectionForm" enctype="application/x-www-form-urlencoded" name="addLessonSectionForm" >
                    <div class="form-group">
                      <label>Title</label>
                      <input type="text" name="name" class="form-control" id="title_3" />
                    </div>

                    <div class="form-group" style={{ display: "none" }}>
                      <label>Sub Section ID</label>
                      <input
                        type="text"
                        class="form-control"
                        id="section_id_3"
                        name="sub_section"
                      />
                    </div>

                    <div class="form-group">
                      <label>Overview</label>
                      <textarea class="form-control" name="description"></textarea>
                    </div>
                  </form>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  onClick={createLessonSection}
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>



      {/*discussion component*/}
      <div
          style={{ marginTop: "80px" }}
          class="modal "
          id="myModalDiscussionForm"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document" style={{width:"600px"}}>
            <div class="modal-content" style={{width:"900px"}}>
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Add a discussion module
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <p>Add a title to the lesson</p>
                <div class="row">
                  <div class="divided col-md-12">
                  <form id="myModalDiscussionForm-CREATESELECT" enctype="application/x-www-form-urlencoded">


          <div class="form-group root-block">
                        <label class="name-discription" >Name</label>
                        <input type="text" class="form-control" id="name_discuss" name="name"/>
                      </div>


                      <div class="form-group root-block" >
                        <input type="hidden" name="lesson" class="form-control" id="parent-lessons-name"  />
                      </div>



                      <div class="form-group" style={{display:"none"}}>
                        <label class="change-title">Component Type </label>
                        <select id="editor-html-type" class="form-control" name="component_type">                      
                              <option value="4" selected>Discussion</option>                      
                              
                      </select>
                      </div>
                      <div class="form-group" style={{display:"none"}}>
                       <select class="form-control" id="editor-html-content-type" name="content_type">
                                <option value="1">I-Frame</option>
                                <option value="2" selected>HTML TEXT</option>
                                <option value="3">HYBRID</option>
                        </select>
                      </div>
                      <input style={{display:"none"}}  
            id="description_discuss" class="visuell-view html_text" 
            name="description"  />

            <HTMLForm
              title="discuss-note"
              placeholder={"discuss-note"}
              value={"this initial state"}
              action={(e)=>{   console.log(e)}}
              stateAction={(e)=>{   console.log(e)}}
              name={"discuss-note"}
            />

            
            


            </form>
          
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                 id="discuss-add"
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={(e) =>{
                    addDiscussComponent(e)
                  }}
                 
                >
                  Add Discussion
                </button>
              </div>
            </div>
          </div>
        </div>

         {/*discuss edit component*/}

         <div
          style={{ marginTop: "80px" }}
          class="modal "
          id="openModal-about2"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Edit Discussion
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <p>Add a title</p>
                <div class="row">
                  <div class="divided col-md-12">
                  <form method="PATCH" id="myModalDiscussionForm-EDITSELECT" enctype="application/x-www-form-urlencoded">


          <div class="form-group root-block" >
                        <label class="name-discription" >Name</label>
                        <input type="text" class="form-control" id="name_discuss2" name="name"/>
                      </div>


                      <div class="form-group root-block" style={{display:"none"}} >
                        <input type="text" name="lesson" class="form-control" id="parent-lessons-name2"  />
                      </div>

                      <div class="form-group root-block" >
                        <input type="text" style={{display:"none"}} name="component_id" class="form-control" id="component_id"  />
                      </div>

                      



                      <div class="form-group" style={{display:"none"}}>
                        <label class="change-title">Component Type </label>
                        <select id="editor-html-type" class="form-control" name="component_type">                      
                              <option value="4" selected>Discussion</option>                      
                              
                      </select>
                      </div>
                      <div class="form-group" style={{display:"none"}}>
                       <select class="form-control" id="editor-html-content-type" name="content_type">
                                <option value="1">I-Frame</option>
                                <option value="2" selected>HTML TEXT</option>
                                <option value="3">HYBRID</option>
                        </select>
                      </div>
                      <input type="hidden" style={{display:"none"}}  
                          id="description_discuss" class="visuell-view html_text" 
                          name="description"  />

            <HTMLForm
              title="discuss-note2"
              placeholder={"discuss-note2"}
              value={"this initial state"}
              action={(e)=>{   console.log(e)}}
              stateAction={(e)=>{   console.log(e)}}
              name={"discuss-note"}
            />

            
            


            </form>
          
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                 
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn btn-primary"
                  data-dismiss="modal"
                  id="discuss-edit"
                >
                  Edit Discussion
                </button>
              </div>
            </div>
          </div>
        </div>


        {/*lesson categories section goes here* myModalLessonGroup*/}
        <div id="myModalLessonGroup" class="modal-build">
          <div class="modal-build-inner" >
            <div class="modal-toolbar" onClick={()=>{closeModal()}}>
              <h2 class="modal-title">Lessons Component</h2>
              <i id="pb-modal-close" class="fa fa-times" ></i>
            </div>
            <div class="modal-tabs">
              <div  class="modal-tab widgets-tab active-tab">
                <i class="tab-icon fa fa-code fa-2x"></i>Html
              </div>
              
              <div class="modal-tab special-video">
                <i class="tab-icon fa fa-video-camera fa-2x"></i> Video
              </div>
              <div class="modal-tab background-tab">
                <i class="tab-icon fa  fa-question-circle-o fa-2x"></i> Problems & Discussions
              </div>
              <div class="modal-tab special-broadcast">
                <i class="tab-icon fa fa-bullhorn fa-2x"></i> Broadcast
              </div>
              {/*<div class="modal-tab special-conference">
                <i class="tab-icon fa fa-video-camera fa-2x"></i> Teleconfrencing
              </div>*/}
            </div>
            <div class="modal-build-content widgets-tab active-content">
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_text]"
                data-type="content-block"
                 href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                 data-fields="['','']"
                 
              >

                <i class="fa fa-text-width fa-2x"></i>
                <span>TEXT</span>
              </div>
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_iframe]"
                data-type="content-block"
                 href="#myModalGenericForm" 
                 role="button" data-toggle="modal"
                  data-fields="['I-frame','Link']"
                 
              >
                <i class="fa fa-link fa-2x"></i>
                <span>Iframe</span>
              </div>
            </div>
            <div class="modal-build-content background-tab">
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_common_problems]"
                data-type="background"
                 href="#openModal-about" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >
                <i class="fa fa-comment fa-2x"></i>
                <span>Add Problem Component</span>
                <span>(Questions creation Component)</span>
              </div>

               <div
                class="pb-widget"
                data-template="[pb_html][/pb_discussions]"
                data-type="background"
                 href="#myModalDiscussionForm" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >
                <i class="fa fa-comment fa-2x"></i>
                <span>Add Discussion Component</span>
                <span>(Discussion creation Component)</span>
              </div>

            </div>


            <div class="modal-build-content background-tab">
              <p>Click on any of the sections above to add either a problem 
              (question and answer option series) or a discussion module block</p>
            </div>
            {/*<div class="modal-build-content special-conference">
              



            </div>*/}


            <div class="modal-build-content special-broadcast">
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_live_stream_lecture]"
                data-type="special"
                 href="#myModalGenericForm" 
                 role="button" data-toggle="modal"
                 data-fields="['Link','Meeting ID']"
                 
              >
                <i class="fa fa-video-camera fa-2x"></i>
                <span>Live Lecture</span>
              </div>
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_live_stream_events]"
                data-type="special"
                 href="#myModalGenericForm" 
                 role="button" data-toggle="modal"
                 data-fields="['Link','Meeting ID']"
                 
              >
                <i class="fa fa-video-camera fa-2x"></i>
                <span>Live Events</span>
              </div>



              <div
                class="pb-widget"
                data-template="[pb_html][/pb_zoom_meeting]"
                data-type="special"
                 href="#myModalGenericForm" 
                 role="button" data-toggle="modal"
                 data-fields="['Link','Meeting ID']"
                 


              >
                <i class="fa fa-video-camera fa-2x"></i>
                <span>Zoom Meeting</span>
              </div>
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_google_meet]"
                data-type="special"
                 href="#myModalGenericForm" 
                 role="button" data-toggle="modal"
                data-fields="['Link','Meeting ID']"
                 
              >
                <i class="fa fa-video-camera fa-2x"></i>
                <span>Google Meet</span>
              </div>



            </div>




            <div class="modal-build-content special-video">
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_vimeo]"
                data-type="special"
                href="#myModalGenericForm" 
                 role="button" data-toggle="modal"
                  data-fields="['Title','Link']"
                 
                 
              >
                <i class="fas fa-video-camera fa-2x"></i>
                <span>Vimeo</span>
              </div>
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_you_tube]"
                data-type="special"
                href="#myModalGenericForm" 
                 role="button" data-toggle="modal"
                 data-fields="['Title','Link']"
                 
              >
                <i class="fas fa-video-camera fa-2x"></i>
                <span>You tube</span>
              </div>


              <div
                class="pb-widget"
                data-template="[pb_html][/pb_you_tube]"
                data-type="special"
                href="#myModalGenericForm" 
                 role="button" data-toggle="modal"
                 data-fields="['Title','Link']"
                 
              >
                <i class="fas fa-video-camera fa-2x"></i>
                <span>MP4 Videos</span>
              </div>



            </div>



          </div>
        </div>






    {/*Generic modal*/}



          {/*Add edit modal for sections/sub sections/ lessons dynamic content */}

          <div
            style={{ marginTop: "80px" }}
            class="modal fade"
            id="myModalGenericForm"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title pull-left put-title" style={{color:"#000"}} >Add Unit Component</h5>
                  <a onClick={()=>{
                    let board = document.querySelector("#projector-view")
                            if(document.querySelector(".iframe-box").style.display=="block"){
                              
                              board.src = document.querySelector(".iframe-boxer").src
                            }else if(document.querySelector(".main-videosection2").style.display=="block"){
                              
                              board.src = document.querySelector(".main-videosection-xx").src
                            }
                  }}
                      style={{ marginRight: "10px" }}
                      href="#modalFullScreenPreviewIframeAndVideos"
                      role="button" data-toggle="modal"
                      id="toggle_fullscreen"
                      className="full-screen-preview alignToTitle btn btn-outline-secondary btn-rounded btn-sm"
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> Toggle
                      Fullscreen to preview
                    </a>
                    
                  <a
                    href="#"
                    class="pull-right"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </a>
                </div>
                <div
                  class="modal-body p-4 col-md-12"
                  id="result"
                  style={{ height: "400px", overflowY: "scroll" }}
                >
                  <p class="change-description">Add a title to the unit</p>
                  <div class="row">
                    <div class="divided col-md-12">

                    <form id="myModalGenericForm-SELECT" enctype="application/x-www-form-urlencoded">
                      <div class="form-group root-block">
                        <label class="change-title" >Name</label>
                        <input type="text" class="form-control nameit" id="editor-html-name" name="name"/>
                      </div>


                      <div class="form-group root-block" >
                        
                        <input type="hidden" name="lesson" class="form-control lessonit" id="lesson-editor-id2"  />
                      </div>


                      <div class="form-group root-block" >
                        <label class="change-title">Description</label>
                        <textarea type="text" name="description" class="form-control" id="editor-html-description" ></textarea>
                      </div>

                      <div class="form-group root-block" style={{display:"none"}}>
                        <label class="change-title">Content Type </label>
                        <select id="editor-html-type" class="form-control component_typeit" name="component_type">
                             <option value="1" selected>Video</option>   
                               <option value="2">HTML</option>
                             
                          
                      </select>
                      </div>

                      <div class="form-group" style={{display:"none"}}>
                       <select class="form-control content_typeit" id="editor-html-content-type" name="content_type">
                          
                                <option value="1" selected>I-Frame</option> 
                                <option value="3">HYBRID</option>
                        </select>
                      </div>


                      <div class="form-group root-block2" >
                        <label class="change-title2 embedded_urlit">Embedded url link</label>
                        <input onInput={(e) =>{
                            //if its iframe component
                            let board = document.querySelector("#projector-view")
                            board.src = e.target.value

                             if(validYoutubeLink(e.target.value)){
                              $(".iframe-box").html('<iframe src="https://www.youtube.com/embed/' + validYoutubeLink(e.target.value) + '" id="videoObject" type="text/html" width="100%" height="265" frameborder="0" allowfullscreen></iframe>');

                            }else{
                              $(".iframe-box").html('<iframe src="' + e.target.value + '" id="videoObject" type="text/html" width="100%" height="265" frameborder="0" allowfullscreen></iframe>');

                            }
                                                        //if its video component
                        }} type="text" name="embedded_url" class="form-control" id="title-unit2" />
                      </div>
                      <br/> <br/>


                      <div class="iframe-box col-md-12"  >
                       
                        <iframe id="" src="" class="col-md-12 iframe-boxer" style={{width:"100%",border:"2px solid #000"}}/>
                      </div>


                      <div
                                        className=" main-videosection2 col-md-12"
                                        
                                      >
                                        <section
                                        >
                                          <div  class="embed-responsive embed-responsive-16by9">
  <iframe  class="embed-responsive-item main-videosection-xx" src="" id="main-videosection-x"  allowscriptaccess="always" allow="autoplay"></iframe>
</div>
                                        </section>
                                      </div>
                         </form>
                      
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button
                    id="save_new_insertion_component_generic"
                    data-notification="be careful not to delete this notification id"
                    type="button"
                    style={{ background: "rgba(8,23,200)" }}
                    class="btn btn-primary unit-appender-for-modalgeneric-form-content"
                    data-dismiss="modal"
                    onClick={handleSaveComponentGenericForm}
                    
                  >
                    Add Component
                  </button>

                  {/*disable the edit action*/}
                  <button
                    style={{display:"none"}}
                    id="save_edit_insertion_component_generic"
                    data-notification="be careful not to delete this notification id"
                    type="button"
                   
                    class="btn btn-success unit-appender-for-modalgeneric-form-content"
                    data-dismiss="modal"
                    onClick={handleEditSaveGeneric}
                    
                  >
                    Save Editing
                  </button>
                </div>
              </div>
            </div>
          </div>






        {/*Preview videos and iframes*/}

        {/*modalFullScreenPreviewIframeAndVideos*/}
      <Fragment>


      <div
          style={{ marginTop: "-80px" }}
          class="modal fade"
          id="modalFullScreenPreviewIframeAndVideos"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-full" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Video Preview
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
              
               
              >
             
                <div class="row">
                  <div class="divided col-md-12">
                   
                          {/*the editor*/}
          
          
          <iframe class="content-area" src="" id="projector-view" />
          
      



                  </div>



              </div>


              </div>
            </div>
          </div>
        </div>





        </Fragment>


      
        {/*this is the edit component modal myModal for any html editing component */}
        <Fragment>
      
      <div
          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModalMarkdownEditorEditMode"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-full" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                 Editing
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
             
              >
             
                <div class="row">
                  <div class="divided col-md-10">
                   
                          {/*the editor*/}
                              <div class="editor-authoring" id="markdown-editor2">
          <div class="authoring-edit-toolbar toolbar" id="">
            <div class="line">
              
              <div class="box-internal">
                <span class="btn-action-editor icon smaller" data-action="bold" data-tag-name="b" title="Bold">
                  <img  src="https://image.flaticon.com/icons/svg/25/25432.svg" />
                </span>
                <span class="btn-action-editor icon smaller" data-action="italic" data-tag-name="i" title="Italic">
                  <img  src="https://image.flaticon.com/icons/svg/25/25392.svg" />
                </span>
                <span class="btn-action-editor icon smaller" data-action="underline" data-tag-name="u" title="Underline">
                  <img  src="https://image.flaticon.com/icons/svg/25/25433.svg" />
                </span>
                <span class="btn-action-editor icon smaller" data-action="strikeThrough" data-tag-name="strike" title="Strike through">
                  <img  src="https://image.flaticon.com/icons/svg/25/25626.svg" />
                </span>
              </div>
              
              <div class="box-internal">
                <span class="btn-action-editor icon has-submenu">
                  <img  src="https://image.flaticon.com/icons/svg/25/25351.svg" />
                  <div class="submenu">
                    <span class="btn-action-editor icon" data-action="justifyLeft" data-style="textAlign:left" title="Justify left">
                      <img  src="https://image.flaticon.com/icons/svg/25/25351.svg" />  
                    </span>
                    <span class="btn-action-editor icon" data-action="justifyCenter" data-style="textAlign:center" title="Justify center">
                      <img  src="https://image.flaticon.com/icons/svg/25/25440.svg" />  
                    </span>
                    <span class="btn-action-editor icon" data-action="justifyRight" data-style="textAlign:right" title="Justify right">
                      <img  src="https://image.flaticon.com/icons/svg/25/25288.svg" />  
                    </span>
                    <span class="btn-action-editor icon" data-action="formatBlock" data-style="textAlign:justify" title="Justify block">
                      <img  src="https://image.flaticon.com/icons/svg/25/25181.svg" />  
                    </span>
                  </div>
                </span>
                <span class="btn-action-editor icon" data-action="insertOrderedList" data-tag-name="ol" title="Insert ordered list">
                  <img  src="https://image.flaticon.com/icons/svg/25/25242.svg" />  
                </span>
                <span class="btn-action-editor icon" data-action="insertUnorderedList" data-tag-name="ul" title="Insert unordered list">
                  <img  src="https://image.flaticon.com/icons/svg/25/25648.svg" />  
                </span>
                <span class="btn-action-editor icon" data-action="outdent" title="Outdent">
                  <img  src="https://image.flaticon.com/icons/svg/25/25410.svg" />  
                </span>
                <span class="btn-action-editor icon" data-action="indent" title="Indent">
                  <img  src="https://image.flaticon.com/icons/svg/25/25233.svg" />  
                </span>

                <span class="btn-action-editor icon smaller" data-action="undo" title="Undo">
                  <img  src="https://image.flaticon.com/icons/svg/25/25249.svg" />
                </span>
                <span class="btn-action-editor icon" data-action="removeFormat" title="Remove format">
                  <img  src="https://image.flaticon.com/icons/svg/25/25454.svg" />  
                </span>

                <span class="btn-action-editor icon smaller" data-action="createLink" title="Insert Link">
                  <img  src="https://image.flaticon.com/icons/svg/25/25385.svg" />
                </span>
                <span class="btn-action-editor icon smaller" data-action="unlink" data-tag-name="a" title="Unlink">
                  <img  src="https://image.flaticon.com/icons/svg/25/25341.svg" />
                </span>

                <span class="btn-action-editor icon" data-action="code" title="Show HTML-Code">
                  <img  src="https://image.flaticon.com/icons/svg/25/25185.svg" />
                </span>
                
              </div>
              <div class="box-internal">
                <span class="btn-action-editor icon" data-action="insertHorizontalRule" title="Insert horizontal rule">
                  <img  src="https://image.flaticon.com/icons/svg/25/25232.svg" />  
                </span>
              </div>


              
            </div>
            <div class="line">
              
              <div class="box-internal">
                
              </div>
              
              <div class="box-internal">
                
              </div>
              
              <div class="box-internal">
                
              </div>
              
            </div>
          </div>
          <div class="content-area" id="input-output2">
            <textarea id="input-area2" class="visuell-view2"  rows="30" cols="50">
                  Edit your content Editor 
                  (What you see is what you get)
      Add text content(plain text), 
          markupsand pure html code
      
  
             
            </textarea>
            <div id="output-area2" class="html-view"></div>
            <p class="preview-message">Preview Mode</p>
          </div>

        </div>

        <div class="modal-authoring">
          <div class="modal-bg"></div>
          <div class="modal-wrapper">
            <div class="close">✖</div>
            <div class="modal-content" id="modalCreateLink">
              <h3>Insert Link</h3>
              <input type="text" id="linkValue" placeholder="Link (example: http://)" />
              <div class="row">
                <input type="checkbox" id="new-tab" />
                <label for="new-tab">Open in new Tab?</label>
              </div>
              <button class="done">Done</button>
            </div>
          </div>
        </div>
                 {/*en editor*/}


                  </div>

                  {/*the mark up hint*/}
                  <div class="col-md-2">
                       <p style={{color:"#000", fontSize:"15px", margin:"10px"}}>Use the Mark up to add this component</p>
                       <pre style={{marginTop:"10px"}}>
                        <code id="markup-template-content"></code>

                        </pre>



              <div class="modal-footer box-internal">
                <button

                  id="save_new_insertion_component2"
                  data-notification="Be careful not to delete these action id"
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn-primary btn  btn-small pull-left"
                  data-dismiss="modal"
                  onClick={()=>{
                      handleEditSaveTextEditor()
                    }}
                >
                  Add Component
                </button>

                 <button
                 
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn-primary btn btn-small pull-right"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                </div>
                  </div>


              </div>


              </div>
            </div>
          </div>
        </div>





        </Fragment>





        <Fragment>

      <div
          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModalMarkdownEditor"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-full" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Add component
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
             
              >
             
                <div class="row">
                  <div class="divided col-md-10">
                   
                          {/*the editor*/}
                              <div  class="editor-authoring" id="markdown-editor">
          <div class="authoring-edit-toolbar" style={{display:"none"}}>
            <div class="line">
              
              <div class="box-internal">
                <span id="bold" class="btn-action-editor icon smaller" data-action="bold" data-tag-name="b" title="Bold">
                  <img  src="https://image.flaticon.com/icons/svg/25/25432.svg" />
                </span>
                <span id="italic" class="btn-action-editor icon smaller" data-action="italic" data-tag-name="i" title="Italic">
                  <img  src="https://image.flaticon.com/icons/svg/25/25392.svg" />
                </span>
                <span id="underline" class="btn-action-editor icon smaller" data-action="underline" data-tag-name="u" title="Underline">
                  <img  src="https://image.flaticon.com/icons/svg/25/25433.svg" />
                </span>
                <span id="strikeThrough" class="btn-action-editor icon smaller" data-action="strikeThrough" data-tag-name="strike" title="Strike through">
                  <img  src="https://image.flaticon.com/icons/svg/25/25626.svg" />
                </span>
              </div>
              
              <div class="box-internal">
                <span class="btn-action-editor icon has-submenu" id="headings">
                  <img  src="https://image.flaticon.com/icons/svg/25/25351.svg" />
                  <div class="submenu">
                    <span id="heading1" class="btn-action-editor icon" data-action="h1" data-style="textAlign:left" title="HEADING 1">
                      <img  src="https://image.flaticon.com/icons/svg/25/25351.svg" />  
                    </span>
                    <span id="heading2" class="btn-action-editor icon" data-action="h2" data-style="textAlign:center" title="HEADING 2">
                      <img  src="https://image.flaticon.com/icons/svg/25/25440.svg" />  
                    </span>
                    <span id="heading3" class="btn-action-editor icon" data-action="h3" data-style="textAlign:right" title="HEADING 3">
                      <img  src="https://image.flaticon.com/icons/svg/25/25288.svg" />  
                    </span>
                    <span id="heading4" class="btn-action-editor icon" data-action="h4" data-style="textAlign:justify" title="HEADING 4">
                      <img  src="https://image.flaticon.com/icons/svg/25/25181.svg" />  
                    </span>
                      <span id="heading5" class="btn-action-editor icon" data-action="h5" data-style="textAlign:justify" title="HEADING 5">
                      <img  src="https://image.flaticon.com/icons/svg/25/25181.svg" />  
                    </span>
                      <span id="heading6" class="btn-action-editor icon" data-action="h6" data-style="textAlign:justify" title="HEADING 6">
                      <img  src="https://image.flaticon.com/icons/svg/25/25181.svg" />  
                    </span>
                  </div>
                </span>
                <span id="list-ol" class="btn-action-editor icon" data-action="insertOrderedList" data-tag-name="ol" title="Insert ordered list">
                  <img  src="https://image.flaticon.com/icons/svg/25/25242.svg" />  
                </span>
                <span id="list-ul" class="btn-action-editor icon" data-action="insertUnorderedList" data-tag-name="ul" title="Insert unordered list">
                  <img  src="https://image.flaticon.com/icons/svg/25/25648.svg" />  
                </span>
                <span class="btn-action-editor icon" data-action="outdent" title="Outdent">
                  <img  src="https://image.flaticon.com/icons/svg/25/25410.svg" />  
                </span>
                <span class="btn-action-editor icon" data-action="indent" title="Indent">
                  <img  src="https://image.flaticon.com/icons/svg/25/25233.svg" />  
                </span>

                <span class="btn-action-editor icon smaller" data-action="undo" title="Undo">
                  <img  src="https://image.flaticon.com/icons/svg/25/25249.svg" />
                </span>
                <span class="btn-action-editor icon" data-action="removeFormat" title="Remove format">
                  <img  src="https://image.flaticon.com/icons/svg/25/25454.svg" />  
                </span>

                <span id="link" class="btn-action-editor icon smaller" data-action="createLink" title="Insert Link">
                  <img  src="https://image.flaticon.com/icons/svg/25/25385.svg" />
                </span>
                <span id="token" class="btn-action-editor icon smaller" data-action="unlink" data-tag-name="a" title="Unlink">
                  <img  src="https://image.flaticon.com/icons/svg/25/25341.svg" />
                </span>

                
                
              </div>
              <div class="box-internal">
                <span id="preview" class="btn-action-editor icon btn btn-outline-secondary btn-rounded btn-sm" data-action="preview" title="preview">
                Preview 
                </span>
              </div>


              
            </div>
          </div>
          <div class="content-area" id="input-output">

          <form id="myModalMarkdownEditor-SELECT" enctype="application/x-www-form-urlencoded">


          <div class="form-group root-block">
                        <label class="change-title" >Name</label>
                        <input type="text" class="form-control" id="editor-html-name2" name="name"/>
                      </div>


                      <div class="form-group root-block"  style={{display:"none"}}>
                      <input type="text" name="component_id" class="form-control" id="component_id"  />
  
                        
                        <input type="text" name="lesson" class="form-control" id="lesson-editor-id5"  />
                      </div>


                      <div class="form-group">
                        <label class="change-title">Description</label>
                        <input type="text" name="description" class="form-control" id="editor-html-description" />
                      </div>

                      <div class="form-group" style={{display:"none"}}>
                        <label class="change-title">Component Type </label>
                        <select id="editor-html-type" class="form-control" name="component_type">                      
                              <option value="2" selected>HTML</option>                      
                              
                      </select>
                      </div>
                      <div class="form-group" style={{display:"none"}}>
                       <select class="form-control" id="editor-html-content-type" name="content_type">
                                <option value="1">I-Frame</option>
                                <option value="2" selected>HTML TEXT</option>
                                <option value="3">HYBRID</option>
                        </select>
                      </div>
                      <input style={{display:"none"}}  
            id="input-area4" class="visuell-view html_text" 
            name="html_text"  />

            <HTMLForm
              title="html_text"
              placeholder={"html_text"}
              value={"this initial state"}
              action={(e)=>{  document.getElementById("input-area4").value=e; localStorage.setItem("html_text_content",e); console.log(e)}}
              stateAction={(e)=>{  document.getElementById("input-area4").value=e; console.log(e)}}
              name={"html_text"}
            />

            
            


            </form>
            <div id="output-area" class="html-view"></div>
            <p class="preview-message">Preview Mode</p>
          </div>
        </div>

        <div class="modal-authoring">
          <div class="modal-bg"></div>
          <div class="modal-wrapper">
            <div class="close">✖</div>
            <div class="modal-content" id="modalCreateLink">
              <h3>Insert Link</h3>
              <input type="text" id="linkValue" placeholder="Link (example: http://)" />
              <div class="row">
                <input type="checkbox" id="new-tab" />
                <label for="new-tab">Open in new Tab?</label>
              </div>
              <button class="done">Done</button>
            </div>
          </div>
        </div>
                 {/*en editor*/}


                  </div>

                  {/*the mark up hint*/}
                  <div class="col-md-2">
                       <p> this is a place hodler to hold the mark up </p>



              <div class="modal-footer box-internal">
                <button
                  id="save_new_insertion_component"
                  data-notification="Be careful not to delete these action id"
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn-primary btn  btn-small pull-left"
                  data-dismiss="modal"
                  onClick={handleSaveComponentTextEditor}
                >
                 Add Component
                </button>


                <button
                  id="save_new_insertion_component_htmleditor"
                  data-notification="Be careful not to delete these action id"
                  type="button"
                  style={{display:"none", color:"#fff"}}
                  class="btn-primary btn success btn  btn-small pull-left"
                  data-dismiss="modal"
                  onClick={handleEditSaveTextEditor}
                >
                 Save Editing
                </button>

                 <button
                 
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn-primary btn btn-small pull-right"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                </div>
                  </div>


              </div>


              </div>
            </div>
          </div>
        </div>





        </Fragment>







        <div
            style={{ marginTop: "80px" }}
            class="modal fade"
            id="myModalGenericFormEditorEditMode"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 style={{color:"#000"}} class="modal-title pull-left edit-title" id="edit-title">Editing</h5>
                  <a onClick={()=>{
                    let board = document.querySelector("#projector-view")
                            if(document.querySelector(".iframe-box").style.display=="block"){
                              
                              board.src = document.querySelector(".iframe-boxer").src
                            }else if(document.querySelector(".main-videosection2").style.display=="block"){
                              
                              board.src = document.querySelector(".main-videosection-xx").src
                            }
                  }}
                      style={{ marginRight: "10px" }}
                      href="#modalFullScreenPreviewIframeAndVideos"
                      role="button" data-toggle="modal"
                      id="toggle_fullscreen"
                      className="full-screen-preview alignToTitle btn btn-outline-secondary btn-rounded btn-sm"
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> Toggle
                      Fullscreen to preview
                    </a>
                    
                  <a
                    href="#"
                    class="pull-right"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </a>
                </div>
                <div
                  class="modal-body p-4 col-md-12"
                  id="result"
                  style={{ height: "400px", overflowY: "scroll" }}
                >
                  <p class="change-description">Add a title to the unit</p>
                  <div class="row">
                    <div class="divided col-md-12">




                    <form id="myModalGenericForm-SELECT" enctype="application/x-www-form-urlencoded">
                      <div class="form-group root-block">
                        <label class="change-title" >Name</label>
                        <input type="text" class="form-control" id="editor-html-name3" name="name"/>
                      </div>


                      <div class="form-group root-block" >
                        
                        <input type="hidden" name="lesson" class="form-control" id="lesson-editor-id2"  />
                      </div>


                      <div class="form-group root-block" style={{display:"none"}}>
                        <label class="change-title">Description</label>
                        <input type="text" id="video-descr" name="description" class="form-control" id="editor-html-description" />
                      </div>



                      


                      <div class="form-group root-block"  style={{display:"none"}}>
                        <label class="change-title">Content Type </label>
                        <select  id="editor-html-type" class="form-control" name="component_type">
                              <option value="1" selected>Video</option>    
                              <option value="2">HTML</option>
                              <option value="3">Problem</option>
                              <option value="4">Discussion</option>
                          
                      </select>
                      </div>

                      <div class="form-group" style={{display:"none"}}>
                       <select class="form-control" id="editor-html-content-type" name="content_type">
                                <option value="1" selected>I-Frame</option>
                                <option value="2">HTML TEXT</option>  
                                <option value="3">HYBRID</option>
                        </select>
                      </div>


                      <div class="form-group root-block2" >
                        <label class="change-title2">Embedded url</label>
                        <input onInput={(e) =>{
                            //if its iframe component
                            let board = document.querySelector("#projector-view")
                            board.src = e.target.value

                             if(validYoutubeLink(e.target.value)){
                              $(".iframe-box").html('<iframe src="https://www.youtube.com/embed/' + validYoutubeLink(e.target.value) + '" id="videoObject" type="text/html" width="100%" height="265" frameborder="0" allowfullscreen></iframe>');

                            }else{
                              $(".iframe-box").html('<iframe src="' + e.target.value + '" id="videoObject" type="text/html" width="100%" height="265" frameborder="0" allowfullscreen></iframe>');

                            }
                                                        //if its video component
                        }} type="text" name="embedded_url" class="form-control" id="title-unit-edited" />
                      </div>


                      <HTMLForm
                        title="description"
                        placeholder={"description"}                   
                        name={"description"}
                        value={"this initial state"}
                        action={(e)=>{   $("#video-descr").val(e); console.log(e)}}
                        stateAction={(e)=>{   $("#video-descr").val(e);}}
             
                      />





                      <div class="iframe-box col-md-12"  >
                       
                        <iframe id="" src="" class="col-md-12 iframe-boxer" style={{width:"100%",border:"2px solid #000"}}/>
                      </div>


                      <div
                                        className=" main-videosection2 col-md-12"
                                        
                                      >
                                        <section
                                        >
                                          <div  class="embed-responsive embed-responsive-16by9">
  <iframe  class="embed-responsive-item main-videosection-xx" src="" id="main-videosection-x"  allowscriptaccess="always" allow="autoplay"></iframe>
</div>
                                        </section>
                                      </div>
                         </form>
                    
                      

                      

                      



                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button
                    id="save_new_insertion_component_generic-edit"
                    data-notification="be careful not to delete this notification id"
                    type="button"
                    style={{ background: "rgba(8,23,200)" }}
                    class="btn btn-primary unit-appender-for-modalgeneric-form-content"
                    data-dismiss="modal"
                    
                   
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>













        {/*this is the edit component modal myModalMarkdownEditorPreviewMode */}
        <Fragment>
      
      <div
          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModalMarkdownEditorPreviewMode"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-full" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                 Preview
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
                id="result"
             
              >
             
                <div class="row">
                  <div class="divided col-md-10">
                   


                  </div>

                  {/*the mark up hint*/}
                  <div class="col-md-2">
                       <p> this is a place hodler to hold the mark up </p>



              <div class="modal-footer box-internal">
                <button
                  id="save_new_insertion_component2"
                  data-notification="Be careful not to delete these action id"
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn-primary btn  btn-small pull-left"
                  data-dismiss="modal"
                >
                  Save
                </button>

                 <button
                 
                  type="button"
                  style={{ background: "rgba(8,23,200)" }}
                  class="btn-primary btn btn-small pull-right"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                </div>
                  </div>


              </div>


              </div>
            </div>
          </div>
        </div>





        </Fragment>











     
     


        {/*Lesson categories section*/}

        <div id="template-container">
          {/* WIDGET SECTIONS */}
          <table class="pb-widget-preview fold">
            <tbody>
              <tr>
                <td class="row-btn btn-widget pb-handle-widget fa fa-sort">
                  handle
                </td>
                <td></td>
                <td></td>
                <td
                  class="row-btn btn-widget pb-remove fa fa-trash"
                  onClick={()=>{handleWidgetRemove(this)}}
                >
                  delete
                </td>
              </tr>
            </tbody>
          </table>







          <div
          

          style={{ marginTop: "80px" }}
          class="modal fade"
          id="myModalPreviewVideo"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class=" modal-full" >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title pull-left" style={{ color: "#000" }}>
                  Add component
                </h5>
                <a
                  href="#"
                  class="pull-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </a>
              </div>
              <div
                class="modal-body p-4 col-md-12"
              
             
              >
             
                <div class="row">
                  <div class="divided col-md-12">
                   
                          {/*the editor*/}
          
          
           <button type="button" class="close-preview" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>        
       
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="" id="videoscreen"  allowscriptaccess="always" allow="autoplay"></iframe>
</div>



                  </div>



              </div>


              </div>
            </div>
          </div>
        </div>







         




<ul id="" data-id=""
          data-name=""
               data-idx=""
          data-parent=""
          data-pos=""
          data-description=""
          data-component_type=""
          data-name=""
          data-content_type=""
          data-form=""
          data-action-figure=""
          data-append="" 
          data-getitup="" 
          
          data-embedded_url=""
          data-embedded_url="" 
          class="hello-move-me components accordion-content pb-widget-preview-panel" >
            
            
              <div class="">
                <div class="row">
                  <div class="col-md-12">
                    <div class="">
                    
              <div class="">
                <div class=" col-md-12">
                   


                <div class="actions-set pull-right" >
               

                  <span ><a href="#myModalMarkdownEditorEditMode"
                  data-name=""
               data-idx=""
          data-parent=""
          data-pos=""
          data-description=""
          data-component_type=""
          data-name=""
          data-content_type=""
          data-form=""
          data-action-figure=""
          data-append="" 
          data-getitup="" 
          
          data-embedded_url=""
          data-embedded_url="" 
          

              role="button"
              data-toggle="modal">
              <i onclick="LaunchEditBoxEvent(this)"
               class="pb-handle-widget fa fa-edit fa-2x"

                data-name=""
               data-idx=""
          data-parent=""
          data-pos=""
          data-description=""
          data-component_type=""
          data-name=""
          data-content_type=""
          data-form=""
          data-action-figure=""
          data-append="" 
          data-getitup="" 
          
          data-embedded_url=""
          data-embedded_url=""  


               ></i>
               </a></span>
                               
                  <span><i 

                  data-name=""
               data-idx=""
          data-parent=""
          data-pos=""
          data-description=""
          data-component_type=""
          data-name=""
          data-content_type=""
          data-form=""
          data-action-figure=""
          data-append="" 
          data-getitup="" 
          
          data-embedded_url=""
          data-embedded_url="" 


                  class="pb-remove fa fa-trash fa-2x" onClick={(e) =>{ handleWidgetRemove(e.target)}}></i></span>
                
                   <span><a
          data-name="${component?.name}"
        
          data-description="" 

         class="drag-handle-list-lessons" style={{marginRight:"10px"}}
         
              data-name=""
               data-idx=""
          data-parent=""
          data-pos=""
          data-description=""
          data-component_type=""
          data-name=""
          data-content_type=""
          data-form=""
          data-action-figure=""
          data-append="" 
          data-getitup="" 
          
          data-embedded_url=""
          data-embedded_url="" 
           
         
                 
          >

         <i class="fa fa-arrows fa-2x"
            data-name=""
               data-idx=""
          data-parent=""
          data-pos=""
          data-description=""
          data-component_type=""
          data-name=""
          data-content_type=""
          data-form=""
          data-action-figure=""
          data-append="" 
          data-getitup="" 
          
          data-embedded_url=""
          data-embedded_url=""  

          
        

         ></i>
        </a></span>
                </div>
                </div>
                
              </div>
              <br/> <br/><br/><br/>
            
                      <div class="col-md-12">
                      <h4
                  class="col-md-12"
                  
                > <span class="compo-type" style={{fontSize:"25px"}}>Component Type: </span><br/>
                <span style={{fontSize:"25px"}}>Title</span>
                <span style={{fontSize:"25px",fontWeight:"bold",color:"#000"}} class=" unit_title_place_holder  title-given "> 
                  </span>
                 </h4><br/>


                      <div id="readmore_" style={{display:"block"}}  class="readmore js-read-more" data-rm-words="70">
                          dummy content
                      </div>

                                              
                        <div data-append="" 
                        data-getitup="" class="content-section-from-input unit_content_place_holder">
                           <p style={{display:"block"}}  id="embedded_url_"></p>
                           
                          <p>Video section ${    "Click the edit icon above to edit this unit" } Question section</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
          </ul>



        {/*video modal template iframe preview*/}





      
        

  
  





        {/*colla borator template container*/}
         <div class="col-lg-3 col-md-3 col-sm-6">
                      <a href="#">
                        <div className="widget-panel widget-style-2 bg-white">
                          <i className="fa fa-trash fa-2x text-pink"></i>
                          <h2
                            className="m-0 text-dark-x counter font-600-x text-holder"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}

                          >
                           
                          </h2>
                          <div
                            className="text-muted-x m-t-5-x delete-holder"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}

                            
                          >{/*handle delete of collaborator*/}
                            Remove
                          }
                          </div>
                        </div>
                      </a>
                    </div>






          <div class="pb-widget-preview-panel-generic-form">
            
            
              <div class="container">
                <div class="row">
                  <div class="col-md-10">
                    <div class="panel-xx panel-dark">
                    
              <div class="panel-heading-xx">
                <span
                  class="panel-title unit_title_place_holder-generic"
                  style={{ float: "left",  marginLeft: "10px" }}
                >
                  Title
                </span>
                <div class="actions-set">


                   <span><a href="#myModalGenericFormEditorEditMode"
              role="button"
              data-toggle="modal"><i
               onclick="LaunchEditBoxEvent(this)"

               class="pb-handle-widget fa fa-edit fa-2x"></i></a></span>
               
                             
                  <span><i class="pb-remove fa fa-trash fa-2x" onclick="handleWidgetRemove(this)"></i></span>
                </div>
              </div>
            
                      <div class="panel-body-xx ">
                        
                        <div class="content-section-from-input unit_content_place_holder-generic">
                          Edit this section
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
          </div>




        </div>
      </div>
    </React.Fragment>
  );
};

const cloneNew = () => {
  $(document).on("click", ".js-add-row", function () {
    $("table").append($("table").find("tr:last").clone());
  });

  $(document).on("click", ".js-del-row", function () {
    $("table").find("tr:last").remove();
  });
};

window.removeSection = (el) => {




};

window.removeSubSection = (el) => {
};

window.editSection = (el) => {
  
};

window.editSubSection = (el) => {
  // alert($("."+el.dataset.id).find(".tits").text())
  $("#title_edit_2").val(
    $("." + el.dataset.id)
      .find(".title_sub")
      .text()
  );
  $("#section_id_edit_2").val(
    $("." + el.dataset.id)
      .find(".subsect")
      .text()
  );
  let form = $("#form-edit-subsection")
  let url = "/lms/api/update/subsection/"+ el.dataset.eid
  let sectionRes = createAnyResource('PATCH',url,form)

};

window.replicateSection = (el) => {


    // save the replicated section to database
     let  form  = $("form#addSectionForm");
     form.find("#title").val(el.getAttribute("data-name"));
     form = $("form#addSectionForm");
    //here is the modal form to add section
    let url = "/lms/api/create/section/"
    let sectionRes = createAnyResource('POST',url,form)


       

  setTimeout(function(){
       //type check for replacers
        //if(typeof sectionRes =="object"){
       let rootSectionBloc = $(el).parent().parent().parent()
       let clonedNode = rootSectionBloc.clone(true);
       clonedNode.insertAfter(rootSectionBloc);
       //work on this for version 2

       //for now reload solves the problem
       window.location.reload()

  },3000)

    //replace the id with the section api created
};

window.replicateSubSection = (el) => {
  let rootSectionBloc = $(el).parent().parent().parent().parent()
    //get the form data
  let  form  = $("form#addSubSectionForm"); //here is the modal form to add section
  form.find("#title_2").val(el.getAttribute("data-name"));
  form.find("#section_mount_id").val(el.getAttribute("data-parent-id"));
  let url = "/lms/api/create/subsection/"
  let sectionRes = createAnyResource('POST',url,form)
  console.log(rootSectionBloc.html())
  let clonedNode = rootSectionBloc.clone(true);
  clonedNode.insertAfter(rootSectionBloc);
  window.location.reload();
};

window.exportSection = (el) => {
  //becomes like this {section: subsection{lesson: {component}}}
  let rootSectionBloc = $(el).parent().parent().parent()

  try {
    $.fn.pop = [].pop;
    $.fn.shift = [].shift;
    var headers = [];
    var data = [];
    var $EXPORT = $("#export");


    var $rows = $(rootSectionBloc).find("tits");
    // Get the headers (add special header logic here)
    $($rows.shift())
      .find("span.export_title")
      .each(function () {
        headers.push($(this).text().toLowerCase());
      });

    // Turn all existing rows into a loopable array
    $rows.each(function () {
      var $td = $(this).find("span.export_title");
      var h = {};

      // Use the headers from earlier to name our hash keys
      headers.forEach(function (header, i) {
        h[header] = $td.eq(i).text(); // will adapt for inputs if text is empty
      });

      data.push(h);
    });

    $EXPORT.text(JSON.stringify(data));
  } catch (err) {
    alert(err);
  }
};


//handle state positioning

class Step6 extends React.Component {
  constructor(){
     super()

     
    let id = this.cleanUpExtension(
       this.cleanUpId(window.location.href)
      )
    // alert(id)
     this.state = {
      groups:[],
      name_group:"",
      members:[],
      course: id ,
      group_type:""

     }
     this.handleSave = this.saveGroupAddition.bind(this)
  }

  cleanUpId(url) {
  const filename = decodeURIComponent(new URL(url).pathname.split('/').pop());
  if (!filename) return swal('No Course ID', "A course unique id is needed"); // some default filename
  return filename;
}

cleanUpExtension(filename) {
  return filename.replace(/^(.+?)(?:\.[^.]*)?$/, '$1');
}

  showAdvancedSettings(e){
	  e.preventDefault();
	
	  let target = document.querySelector("#slideeffect")
	  target.style.width = "80%"
	  target.style.left="0"
	  $("#slideeffect").fadeIn("slow")
	   $("#slideeffect").css({width:"80%"})
  }

  handleChange(e){
    const {name,value} = e.target;

    if(e.target.name=="name"){
      let tag =`input[name='${name}']`
      $("#group-make").find(tag).val(value)
    }else{
      let tag =`input[name='${name}']`
       $("#group-make").find(tag).val(value) 
    }
    
  }
  
  closeAdvancedSettingsPanel(e){
	  e.preventDefault()
	  $("#slideeffect").fadeOut("slow")
	  $("#slideeffect").css({width:"0px"})
  }

  async componentDidMount(){
    try{
      let res = await getGroups();
      this.setState({
        groups: Array.from(res.results)
      })
    }catch(e){
      swal("Error", "Probably a network error : " + e)
    }

    $("#add-group").click((e)=>{
      e.preventDefault()
      this.handleSave(e)
    })
   
  }

  saveGroupAddition(e){
    //alert("called")
    let buildUrl = "/lms/api/create/gaps-group"
    let res = createAnyResource("POST",buildUrl,$("#group-make"))
  }
  render() {
    // if (this.props.currentStep !== 4) {
    //   return null;
    // }

    const { groups,course } = this.state
    const {instructors } = this.props
    
    return (
      <React.Fragment>
        {/*
         <div className="tab-content b-0 mb-0" >
          <div className="tab-pane active" >
            <div className="row">
              <div className="col-md-12 card-box">

        <div className="tab-pane-x" id="seo">
          <div className="row">
            <div className="col-md-12"> 




			
			
			<div class="col-md-12 configurations">
      <br/><br/><br/>
<div class="toggleslider"><a href="" onClick={(e)=>{this.showAdvancedSettings(e)}}>Advanced Settings</a></div>
    
   

  <div class="pull-left col-md-6">
<h1 class=" ">Group Configurations</h1>
    <p>Configuration settings for different possible group of learners</p>
  </div>
  
  <div class="pull-right col-md-12">

        <table class="table">
            <thead>
                <tr>
                    <th class="name-col">Course General Settings</th>
                    <th>Enrollable</th>
                    <th>Discussable</th>
                    <th>Viewable</th>
                    <th>LMS(CONFIGURATION)</th>
                    <th>Can ETC</th>
                    <th>ETC...</th>
                    <th class="missed-col">Revert</th>
                </tr>
            </thead>
            <tbody>
              {groups && groups.map(group =>{
                return (
                    
              
                <tr class="student">
                    <td class="name-col">{group.name}</td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
              
             <td style={{cursor:"pointer"}} class="missed-col" data-id={group.id}>Save Changes</td>
              </tr>
               )
            })}
                
            </tbody>
        </table>
         <br/><br/><br/><br/>
         
         <form id="group-make" method="POST" novalidate>

         <div className=" form-group col-md-6 fl-left">
                        <div className="col-md-10  fl-left author">
                        <label>Group Type</label>
                          <select onChange={this.handleChange} name="group_type" class="form-control">
                            <option value="1">Student</option>
                             <option value="2">Readers</option>
                              <option value="3">Authors</option>
                          </select>

                      </div>
                </div>
                
                <div className=" form-group col-md-6 fl-left">
                        <div className="col-md-10  fl-left ">
                        <label>Group Name</label>
                           <input
                            type="text"
                            placeholder={"Add a new member to group by email"}
                            onChange={this.handleChange}
                            className="form-control fl-left"
                            id="member-inset"
                            name="name"
                            
                          />

                           <input
                            type="hidden"
                            placeholder={"Add a new member to group by email"}
                           
                            className="form-control fl-left"
                            id="course"
                            name="course"
                            value={course}
                            
                          />

                      </div>
                </div>

               <div className=" form-group col-md-6 fl-left">
                        <div className="col-md-10  fl-left groupmember">
                         <label class="col-md-12 col-form-label" for="level">
                    Add Members<span className="required">*</span></label>
                          <input
                            type="text"
                            placeholder={"Add a new member to group by email"}
                             
                            className="form-control fl-left"
                            id="member-inset"
                            name="member"
                            disabled
                            
                          />
                        </div>
                         <div class="col-md-2  fl-left">
                            <button
                              type="button"

                            
                              className="small text-white"


                                onClick={ () => {
              let values = this.props.instructors            

              swal({
                text: 'Search for an instructor by email/ phone number. e.g. "saladinjake@company.com ".',
                content: "input",
                button: {
                text: "Search!",
                closeModal: false,
                },
              })
              .then(name => {
                if (!name)  return swal("No instructor email or phone entered was entered!");
                  // check if user existed in our initial fetch 
                  // do not make another api request 
                  //this saves pull request

                     
                  //TODO: if no collaborators selected 
                  //LET THE LOGGED IN OR LEAD INSTRUCTOR BE APPENDED AS A COLLABORATOR

                let targetInstructor = instructors.find(instructor => {
                    console.log(instructor)
                    return (instructor?.profile?.name === name) ||  (instructor?.profile?.email === name) || (instructor?.profile?.phone_number === name)
                })
               
                  if(targetInstructor){
                     let collaborators =  $("#collabo-members")
                      
                     let newGuy = $(`
                      <div class="col-lg-3 col-md-3 col-sm-6">
                      <a href="#">
                        <div className="">
                          <i className="fa fa-trash fa-2x text-pink"></i>
                          <p
                            className="m-0 text-dark-x counter font-600-x"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "12px",
                            }}

                          >
                            ${targetInstructor?.profile?.first_name} - ${targetInstructor?.profile?.email}
                          </p>
                          <div
                            className="text-muted-x m-t-5-x"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                            onclick="alert('test delete operation')"

                            data-id=${targetInstructor?.profile?.id}
                          >
                            Remove
                          </div>
                        </div>
                      </a>
                    </div>
                     `)
                     
                    collaborators.append(newGuy.html())
                  

                     // now let js do the dynamic selection of the hidden authoring_team select form fields
                    const { name, id, email, phone_number} = targetInstructor?.profile
                     values.push({
                      id,name, email, phone_number
                     })

                     this.setState({members: values})

                      $('select[name=members]').val(this.state.members) // all collaborators as listArray
      
                     return swal("Success!", "The Instructor was found", "Success");

                 }else{

                    
                      swal("Oh noes!", "We could not find instructor", "error");
            
                      swal.stopLoading();
                     return swal.close();
                

                 }
              })
             
                 
                           
                          

      }}



                            >
                              <i style={{marginTop:"-20px"}} class="fa fa-undo fa-2x"></i>
                            </button>
                            </div>

                       <select name="members[]" multiple  style={{display:"none"}}>
                      {this.state.members.length > 0  && this.state.members.map(instructor => {
                          return (
                             <option value={instructor.id}>{instructor.name}</option>
                          )
                      })}
                </select>
                <ul id="collabo-members"></ul>
                       
                </div>



                



              </form>



                <div className=" form-group col-md-6 fl-left">
                        <div className="col-md-10  fl-left">
                          <a 
                          class="btn btn-danger pull-left" 
                          id="add-group"
                          href="#"

                         >Create New group</a>

                      </div>
                </div>

  </div>






  
  <div class="slideeffect" id="slideeffect">
  
  <br/><br/><br/><br/><br/><br/>
   
      
  <div class="pull-left col-md-6">
  <p class="closeslide pull-left" ><a onClick={(e)=>{this.closeAdvancedSettingsPanel(e)}} href="">X</a></p>
  
<h1 class=" ">Advanced Settings</h1>
 

    <p>Configuration settings for specific course features</p>
  </div>
  
  <div class="pull-right col-md-12" style={{height:"500px",overflowY:"scroll",overflowX:"hidden",borderTop:"4px solid #fff"}}>

        <table class="table">
            <thead>
                <tr>
                    <th class="name-col">Advanced Settings</th>
                    <th>Can Edit</th>
                    <th>Can Delete</th>
                    <th>Can Read</th>
                    <th>Can Create</th>
                    <th>5</th>
                    <th>6</th>
                    <th class="missed-col">Revert</th>
                </tr>
            </thead>
            <tbody>
                <tr class="student">
                    <td class="name-col">Free Course Enrolled Learners Group</td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
             <td class="missed-col">Undo Previledges</td>
              </tr>
                <tr class="student">
                        <td class="name-col">Paid Enrolled Learners</td>
                     <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
             <td class="missed-col">Undo Previledges</td>
                </tr>
                <tr class="student">
                    <td class="name-col">Premium Members</td>
                     
                <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
             <td class="missed-col">Undo Previledges</td>
                </tr>
                <tr class="student">
                    <td class="name-col">Subscribers Group</td>
                     <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
             <td class="missed-col">Undo Previledges</td>
                </tr>
                <tr class="student">
                    <td class="name-col">MultiNational Learning Group</td>
                      
                     <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
                  
                    <td class="attend-col"><input type="checkbox" /></td>
             <td class="missed-col">Undo Previledges</td>
                </tr>
            </tbody>
        </table>


  </div>




</div>
</div>


            
            </div>
		  </div>
        </div>

        </div></div></div></div> */}
      </React.Fragment>
    );
  }
}

class Step7 extends React.Component {
  render() {
    if (this.props.currentStep !== 7) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="tab-pane" id="finish">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h2 className="mt-0">
                  <i className="fa fa-check-all"></i>
                </h2>

                <div class="form-group  mb-3 col-md-12 ">
                  <label class="col-md-12 col-form-label" for="level">
                    Publication Status
                  </label>

                  <div class="" data-select2-id="94">
                    <select
                      class="form-control select2 select2-hidden-accessible"
                      data-toggle="select2"
                      name="level"
                      id="level"
                      data-select2-id="level"
                      tabindex="-1"
                      aria-hidden="true"
                    >
                       <option value="1" selected="">Draft (Never Published)</option>
                      <option value="3">Draft Unpublished Changes</option>
                      
                      </select>
                  </div>
                </div>

                <h3 className="mt-0">Thank you !</h3>

                <p className="w-75 mb-2 mx-auto">You are just one click away</p>

                <div className="mb-3 mt-3">
                  <button
                    type="button"
                    className="btn btn-primary text-center"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.handleSubmit(e)
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Step8 extends React.Component {
  updateList = function () {
    var input = document.getElementById("file");
    var output = document.getElementById("fileList");
    var children = "";
    for (var i = 0; i < input.files.length; ++i) {
		console.log(input.files.item(i))
		
		children = `<tr class="col-md-3"><td>
        ${input.files.item(i).name} 
       
        </td>
		<td> ${input.files.item(i).lastModifiedDate}</td>
		<td>${input.files.item(i).type}</td>
		<td><img style="height:200px" width="200px" src="${input.files.item(i).name}" /></td>
		<td> <span class="remove-list fa fa-trash" onclick="return this.parentElement.parentNode.remove()"></span></td>
		
		</tr>`
      output  = $(output);
	  output.append(children)
    }
    
  };
  render() {
    if (this.props.currentStep !== 8) {
      return null;
    }
    return (
      <React.Fragment>

       <div className="tab-content b-0 mb-0" >
          <div className="tab-pane active" >
            <div className="row">
              <div className="col-md-12 card-box">

        <div className="" id="resource">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h2 className="mt-0">
                  <i className="fa fa-check-all"></i>
                </h2>

                <div class="col-md-12">
                  <div class="form-group">
                    <input
                      type="file"
                      class="form-control"
                      id="file"
                      multiple
                      onChange={this.updateList}
                    />
                    <label class="custom-file-label" for="file">
                     
                      Upload Multiple files 
                    </label>
                  </div>
                </div>

                <table class="table col-md-12">
				<thead style={{background:"rgba(8,23,200)"}}>
                  <th class="col-md-3" style={{color:"#fff"}}>File Name</th>
                  <th class="col-md-3" style={{color:"#fff"}}>Last Modified</th>
                  <th class="col-md-3" style={{color:"#fff"}}>Type</th>
				  <th class="col-md-3" style={{color:"#fff"}}>Preview</th>
                  <th class="col-md-3" style={{color:"#fff"}}>Action</th>
				 </thead>
                  <tbody id="fileList" class="file-list"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        </div></div></div></div>
      </React.Fragment>
    );
  }
}
