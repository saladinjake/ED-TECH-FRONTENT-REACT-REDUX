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
import Lessons from "./dynamic_content";
/*magicican victor jake dibs*/
import  { getTemplateType } from "./markdown_generator"
import loading_image from "assets/gifs/loading-buffering.gif";
import $ from "jquery";
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import HTMLForm from "./Editor";

import { getLanguages } from "services/language";
import axios from "axios"
import swal from "sweetalert"
import TinyMyceRender from './tinymyce-plugin';
import TreeBuilder, { findObjectById } from "./TreeBuilder"



//TODO :2) REPLICATE  20% done for sections, reorder subsections, reorder lessons
//TODO :3) PREVIEW    50% done
//TODO :4) EXPORT     30% done
//TODO :5) CHECK AND TEST ALL FIELDS ARE SAVED TO DB  70% done (exception: intro_video,resource section)
//TODO :6) REORDERING POSITIONING  > done
  
   //reorder subsections, 
   //reorder lessons


import FroalaEditor from 'froala-editor'

// Load a plugin.
import 'froala-editor/js/plugins/align.min.js'

// 
// Initialize editor.
//

import toast from "react-hot-toast";



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
 deleteApi,
 getComponent
} from "services/authoring"

import  { enableDragSortPositionUpdater } from "./reorder_positioning" 



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
  let sectionRes = createAnyResource('POST',url,form)
};

const addSubSectionContent = (el) => {
  let insertionId =  document.getElementById("section_mount_id");
  insertionId.value =localStorage.getItem('tracker');
  //get the form data
  let  form  = $("form#addSubSectionForm"); //here is the modal form to add section
  let url = "/lms/api/create/subsection/"
  let sectionRes = createAnyResource('POST',url,form)
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


const createLessonComponent = (url, form) => {

  let lessonRes = createAnyResource('POST',url,form);
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
  document.getElementById('myModalLessonGroup').style.display="block"
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

window.LaunchEditBoxEvent = (el) => {
  let form = $("#myModalMarkdownEditor-SELECT") //will be reset back to post after update
    form.attr("method", "patch") // switch to edit mode for the same form
    form.find("#editor-html-name").val(el.getAttribute("data-name"))
    form.find("#component_id").val(el.getAttribute("data-idx")) //component id
    form.find("#lesson-editor-id").val(el.getAttribute("data-parent")) //lesson id
    form.find("#editor-html-description").val(el.getAttribute("data-description"))
    form.find("#editor-html-type").val(el.getAttribute("data-component_type"))
    form.find("#editor-html-content-type").val(el.getAttribute("data-content_type"))
    form.find("#html_text").val(el.getAttribute("data-html_text"))


}

const LaunchEditBoxEvent = (el) =>{
     let form = $("#myModalMarkdownEditor-SELECT")
     form.attr("method", "patch")

     form.find("#editor-html-name").val(el.getAttribute("data-name"))
     form.find("#component_id").val(el.getAttribute("data-idx")) //component id
     form.find("#lesson-editor-id").val(el.getAttribute("data-parent")) //lesson id
   
     form.find("#editor-html-description").val(el.getAttribute("data-description"))
     form.find("#editor-html-type").val(el.getAttribute("data-component_type"))
     form.find("#editor-html-content-type").val(el.getAttribute("data-content_type"))
     form.find("#html_text").val(el.getAttribute("data-html_text"))

  
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



       



const  handleSaveComponentTextEditor =(e) => {
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

        wrapWrapper.appendChild(SClone)
        wrapWrapper.setAttribute("id", randId )
        let MainClone = wrapWrapper.cloneNode(true);
        MainClone.id =randId


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




       //fall back attributes if it fails upon saving new data
        MainClone.querySelector(".fa-edit").setAttribute("data-id", randId)
        MainClone.querySelector(".fa-edit").setAttribute("data-parent-id", localStorage.getItem("l_tracker"))
        MainClone.querySelector(".fa-edit").setAttribute("data-content_type",$("#myModalMarkdownEditor-SELECT").find("#editor-html-content-type").val())
        MainClone.querySelector(".fa-edit").setAttribute("data-component_type",$("#myModalMarkdownEditor-SELECT").find("#editor-html-type").val())
        MainClone.querySelector(".fa-edit").setAttribute("data-name",$("#myModalMarkdownEditor-SELECT").find("#editor-html-name").val())
        MainClone.querySelector(".fa-edit").setAttribute("data-pos","1.0")
        MainClone.querySelector(".fa-edit").setAttribute("data-description",$("#myModalMarkdownEditor-SELECT").find("#editor-html-description").val())


        //fall back attributes if it fails upon saving new data

        MainClone.setAttribute("data-id", randId)


        MainClone.querySelector(".fa-edit").setAttribute("data-template",markdownTemplate)
        MainClone.querySelector(".fa-edit").setAttribute("data-id",randId) //ref the curr main lesson box
        MainClone.querySelector(".fa-edit").addEventListener("click",(es) =>{
             document.getElementById(MainClone.id).setAttribute("data-parent",MainClone.id)
                  // const extracts = $("#" + MainClone.getAttribute("id")).find(".unit_content_place_holder").html();
                  // const editBoard = document.getElementById("myModalMarkdownEditorEditMode").querySelector(".visuell-view2");
                  // editBoard.value = extracts;
                  // const markupBoard = document.getElementById("markup-template-content")
                  // markupBoard.innerHTML =markdownTemplate
                  localStorage.setItem("edit_component", randId )
                  form.attr("method","patch")

        })

        // document.getElementById("myModalMarkdownEditorEditMode").querySelector(".visuell-view2")
      $("#myModalMarkdownEditor-SELECT").find("#input-area4").val(
        localStorage.getItem("html_text_content")
      )
      

        MainClone.querySelector(".fa-trash").addEventListener("click", (e) => {
             handleWidgetRemove(e.target)
        })
      MainClone.querySelector(".unit_title_place_holder").innerHTML= $("#editor-html-name").val()  /// _title   //no title initially for this comonent
      MainClone.querySelector(".unit_content_place_holder").innerHTML = localStorage.getItem("html_text_content")  //getTemplateType(markdownTemplate)        //$("#input-area").val()      //getTemplateType(markdownTemplate)           //$(".visuell-view").html() || "Edit this content"
      const markupBoard = document.getElementById("markup-template-content")


     let res = createLessonComponent(url,form)

     console.log(res);
     localStorage.setItem("html_text_content", "")


     
     console.log($("#myModalMarkdownEditor-SELECT").find(".visuell-view").html())
      markupBoard.innerHTML =markdownTemplate
      $(".visuell-view").html(getTemplateType(markdownTemplate))
     

      //MainClone.querySelector(".fa-edit")
      // MainClone.querySelector(".fa-trash")
      Target.append(MainClone);


}





const  handleSaveComponentGenericForm = () => {
    let Target = $(".dynamo_" + localStorage.getItem("l_tracker"));
    let allowedHeaders =  document.getElementById("myModalGenericForm")
    let T = allowedHeaders.getAttribute('data-basestation')
    let markdownTemplate =  allowedHeaders.getAttribute("data-markdown");
    let url =  allowedHeaders.getAttribute("data-url")


    let randId = uuid()
    let Preview = document.querySelector(
                  "#template-container > .pb-widget-preview-panel-generic-form"
    );

    let SClone = Preview.cloneNode(true);
    let   wrapWrapper = pbCreateNode("li", [
                                { class: "pb-placeholder-main col-md-12" },
                             // { onclick:  () => { "openModal(this)" }
    ]);

    wrapWrapper.appendChild(SClone)
    wrapWrapper.setAttribute("id", randId )
                    
    let MainClone = wrapWrapper.cloneNode(true);
                // MainClone.setAttribute("id", randId )
    MainClone.id=randId
                
    MainClone.querySelector(".fa-edit").setAttribute("data-template", markdownTemplate)
    MainClone.querySelector(".fa-edit").setAttribute("data-id",randId) //=randId //ref the curr main lesson box
                
                 //edit view when clicked not saved
    MainClone.querySelector(".fa-edit").addEventListener("click",(evv) =>{
            // if(evv.target.dataset.template && evv.target.dataset.template !=="[pb_html][/pb_text]"){
                      // alert(evv.target.parentNode)
                const title =  $("#"+ MainClone.getAttribute("id")).find(".unit_title_place_holder-generic").html();
                const body = $("#"+ MainClone.getAttribute("id")).find(".unit_content_place_holder-generic").html();
                      
                      // alert(title,body)  
                      //then place these content in the header and frames
                      // eg: EDITING COMPONENT - HTML IFRAME
                      // eg src will display the iframe content 
                      $(".iframe-boxer2").attr("src",body)
                      $(".iframe-box").css("display","block")
                      $("main-videosection").css({display:"block"})
                      $("#title-unit-b").val(title)
                      $("#title-unit2-b").val(body)
                      $("#edit-title").html("Editing Html component: "+ title)
                      document.getElementById("edit-title").setAttribute("data-parent", MainClone.id)
                      // $("#edit-title").attr("data-parent"+ MainClone.getAttribute("id")) //attach this to know where to save
                      $("#projector-view").attr("src",body)

                     
                    // }
                }) 


    MainClone.querySelector(".fa-trash").addEventListener("click", (e) => {
             handleWidgetRemove(e.target)
        })

    let res = createLessonComponent(url,$("#myModalGenericForm-SELECT"))

    MainClone.querySelector(".unit_title_place_holder-generic").innerHTML =   $("#title-unit").val()  //add validation for unit component
    MainClone.querySelector(".unit_content_place_holder-generic").innerHTML  = $("#title-unit2").val() || "Edit this content"
    Target.append(MainClone);



  }


  const handleEditSaveGeneric = () =>{
    // $("#save_new_insertion_component_generic-edit").on("click", () =>{
        let targetBase =  document.getElementById("edit-title").getAttribute("data-parent")
        //alert(targetBase)
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
	if(localStorage.getItem("code")
	   
	   ){
		
        code = localStorage.getItem("code")
       
        	
	}else if(localStorage.getItem("name") ){
		name = localStorage.getItem("name");
	}else if(localStorage.getItem("institution")){
		 institution = localStorage.getItem("institution");
	}else if(
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
      author: "", // THE LOGGED IN USER NAME {...details}.username
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
      
      }else if(event.target.name == "card_image"){
        //handle image upload here
        const fileUploader = document.getElementById('file-uploader');
        const feedback = document.getElementById('feedback');
        const progress = document.getElementById('progress');
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

        // for just input and text area or editable 
         let limitCode =10, limitName =150
        if(name=="code"){
          limitCode = 10
          if(value.length > limitCode){
              value = value.substring(0, limitCode);
              let queryInputEnforce = `input[name=${name}]`;
              queryInputEnforce = document.querySelector(queryInputEnforce);
               queryInputEnforce.value = value


               wrapper.style.display="block"
               wrapper.classList.remove("hide");
            toast.classList.remove("offline");
                title.innerText = "Notification Message";
                subTitle.innerText = "Limit text exceeded. Maximum input allowed is " + limitCode + " characters";
                wifiIcon.innerHTML = '<i style="background:red" class="uil uil-wifi fa fa-times fa-2x"></i>';
                closeIcon.onclick = ()=>{ //hide toast notification on close icon click
                    wrapper.classList.add("hide");
                }
                setTimeout(()=>{ //hide the toast notification automatically after 5 seconds
                    wrapper.classList.add("hide");
                }, 5000);

          } else{
             let query = `div[class=${name}]`;
             let labelCount;
             if(document.querySelector(query)){
            
               labelCount = document.querySelector(query);
               labelCount = labelCount.querySelector("span")
               labelCount.innerHTML = value.length + "/" + limitCode + " inputs characters entered";
             }
         
           
          }

        }

        if(name=="name"){
          

          if(value.length > limitName){
            value = value.substring(0, limitName);
            let queryInputEnforce = `input[name=${name}]`;
            queryInputEnforce = document.querySelector(queryInputEnforce);
            queryInputEnforce.value = value


            


          } else{
             let query = `div[class=${name}]`;
             let labelCount;
             if(document.querySelector(query)){
            
                labelCount = document.querySelector(query);
                labelCount = labelCount.querySelector("span")
                labelCount.innerHTML = value.length + "/" + limitName + " inputs characters entered";
             }
          
          }
        }

         if(name=="description"){
            let limit =250

            if(value.length > limit){
              value = value.substring(0, limit);
              let queryInputEnforce = `input[name=${name}]`;
              queryInputEnforce = document.querySelector(queryInputEnforce);
              queryInputEnforce.value = value

            } else{
               let query = `div[class=${name}]`;
               let labelCount;
                if(document.querySelector(query)){
                  
                   labelCount = document.querySelector(query);
                   labelCount = labelCount.querySelector("span")
                   labelCount.innerHTML = value.length + "/" + limit + " inputs characters entered";
                }
            }
        }

        
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
  handleHtmlPrerequisitesChange =(newValue) => {
      localStorage.setItem("prerequisite", newValue);
    this.setState({
      ...this.state,
      prerequisite: newValue
    })
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
              /*validation hooks*/
              this.validateField(name, value);
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
         await this.fetchContent()
       }catch(e){
         console.log("some error occured")
       }
    })("run-logic-sequence")
     // let T = new  TinyMyceRender();
     // T.render("")
  var formElements = new Array();
    $("input, select, textarea").each(function(){
        formElements.push($(this));
    });


    


        let formEl = $("#create-course");
     
          formElements.filter(e =>{ 
            var element = e;
            var title = element.title;
            var id = element.id;
            var name = element.name;
            var value = element.value;
            var type = element.type;
            var cls = element.className;
            var tagName = element.tagName;
            var options = [];
            var hidden = [];
            var formDetails = '';

            // check if the data exist in local store
            if( localStorage.getItem( e.attr("name") ) ){
               console.log(e.attr("name"))
               formEl.find("#"+ e.attr("name")).val(localStorage.getItem( e.attr("name")))
            }
          })

    $(document).ready(function(){

      let el = null, vall ="";
    if(localStorage.getItem("course_start_date_time")){
      
      el = formEl.find("#"+ "course_start_date_time");
      vall =localStorage.getItem("course_start_date_time")
      el.attr("type", "text");
      el.val(vall) 
      
    }

    if(localStorage.getItem("course_end_date_time")){
      el = formEl.find("#"+ "course_end_date_time");
      vall =localStorage.getItem("course_end_date_time")
      el.attr("type", "text");
      el.val(vall) 
    }
    if(localStorage.getItem("enrolment_start_date_time")){
       el = formEl.find("#"+ "enrolment_start_date_time");
        vall =localStorage.getItem("enrolment_start_date_time")
      el.attr("type", "text");
      el.val(vall) 
    }

    if(localStorage.getItem("enrolment_end_date_time")){
       el = formEl.find("#"+ "course_start_date_time");
        vall =localStorage.getItem("course_start_date_time")
      el.attr("type", "text");
      el.val(vall) 
    }



    })
    



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
	let textEditors = ["learning_expectation","description", "prerequisite", "overview", "curriculum"]
    for(var k in a){
		console.log(k)
      //check if name is part of a dropdown then select the dropdown or make it checked
      if($('select[name="'+k+'"]')){
        
         $('select[name="'+k+'"]').attr('selected', $(this).text() == a[k]);
      }
	  
	  //check if k is a rich text editor content
	  if(textEditors.includes(k)){
		  //inject to text editor
		  var myEditor = $('div[data-placeholder="'+k+'"]') // the editor itself
          //myEditor = myEditor.children[0];
		  let html = a[k] || "Place your content for editing with rich text editor";
		  myEditor.html(html);
	  }


      if($('textarea[name="'+k+'"]')){
      
         $('textarea[name="'+k+'"]').val(a[k]);
      }

      //if input type of file for image
      if($('input[type="file"]')){
        $('input[name="'+k+'"]').val(a[k]);
      }else{

      if($('[name="'+k+'"]')){
        $('[name="'+k+'"]').val(a[k]);
       }

     }
    }
 }


 getAllFormElements = element => Array.from(element.elements).filter(tag =>  ["select", "textarea", "input"].includes(tag.tagName.toLowerCase()));

 fetchContent = async () => {
  $("#none-display").css({"opacity":0}).fadeOut("fast")
   let instId = this.state.institution
   this.courseData = await this.courseDetailJson()
   localStorage.setItem("course_edit",this.props.match.params.id);
   //automated logic
    Promise.all(
      [
        getLanguages(),
        getCourses(),
        getInstitutions(),
        getInstructorProfiles(),
        getCourse(this.props.match.params.id),
        getSectionsOfCourseId(this.props.match.params.id),
        // getSubsectionsOfSectionId(secId)
      ].map((err) => err.catch(() => console.log( err)))
    )
      .then((res) => {
        

        console.log(res[4])
        if(typeof (res[2].results) == "Array") {
          // do nothing
        }else{
          // alert(typeof res[2].results )
          // console.log(Array.from(res[4].results))

          this.setState({
          languages: res[0].data.data, // from enrollments this is already an array
          courses:  this.transformObject(res[1].results), //from lms  this needs to be reformed
          institutions: this.transformObject(res[2].results), // reformation needed
          instructors: this.transformObject(res[3].results),  // reformation needed
          currentCourseId: res[4]?.id, //just an object
          sections:res[4]?.results
        })
        //now dynamically fill in the form
        this.fill(res[4]) 

        $("#none-display").css({"opacity":1}).fadeIn("slow")		
      }
        
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // toast.error("Error Occured fetching data");
        // setLoading(false);
      });


  }

  reorder(response){

    

  }




  htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim(); // Never return a space text node as a result
    temp.innerHTML = html;
    return temp.content.firstChild;
  }



  sorted_by_position_id = (arr) =>{
     return arr.sort((a, b) => {
       return a.position_id - b.position_id;
     });
  } 


  /*everything belonging to course*/
  courseDetailJson = async () => {
   let BIG_JSON  = await getCourseData(this.props.match.params.id);
   console.log(BIG_JSON)
   let courseData = BIG_JSON.course_sections;
   let temp =``;
   let tempArr =[];
   let tempArrLessons = [];
   courseData = this.sorted_by_position_id(courseData) // sorts by position id

   console.log(courseData);

   //resort sections by their position id before d*splay*n


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
           data-parent-id="${lessons.subsection}"
            onclick='showComponentModal(this);setTargetLessonComponent("${muu_counter}")'      
          ><i class="fa fa-plus "></i></a>



          <a class="text-white"   href="#myModalEditLesson" role="button" data-toggle="modal"
          data-id="${"lmuu_" + muu_counter}"
          data-idx="${muu_counter}"
          data-name="${lessons?.name}"
          data-pos="${lessons?.position_id}"
          data-description="${lessons?.description}"
           data-parent-id="${lessons?.subsection}"
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
           data-parent-id="${lessons?.subsection}"
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
           data-parent-id="${lessons?.subsection}"

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
                      let launchPad ="#myModalMarkdownEditor"
                      let Info = "IFRAME/VIDEO EDITABLE COMPONENT"
                      if(component.component_type ==1){
                        launchPad ="#myModalGenericFormEditorEditMode"
                      }else {
                        launchPad ="#myModalMarkdownEditor"
                        Info = "HTML TEXT EDITABLE COMPONENT"
                      }

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

                                              
                        <div class="content-section-from-input unit_content_place_holder">
          
                          <p>${ component?.html_text?.substr(0,200) || component?.embedded_url || "Click the edit icon above to edit this unit" }</p>
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
         let course = await getCourses(id)
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




  
   /*implements save and continue logic*/
  saveAndContinue = (e) =>{
     const {id } =  this.props.match.params;
     let curr = this.state.currentStep;
     /*Our default url  assumes an update method because much work would be left incomplete during course creation*/
     let url=  `/lms/api/update/course/${id}/`  //
     let step = parseInt(curr)
	  let stateData = {...this.state};
	  
	  stateData = {
		  
        name: localStorage.getItem("name") || "",
        code:  localStorage.getItem("code") || "",
        run: localStorage.getItem("run") || "",
        //card_image:  localStorage.getItem("card_image")|| "",
        intro_video: localStorage.getItem("intro_video") || "",
        description: localStorage.getItem("description") || "",
        overview: localStorage.getItem("overview") || "",
        learning_expectation: localStorage.getItem("learning_expectation") || "",
        curriculum: localStorage.getItem("curriculum") || "",
        level: localStorage.getItem("level") || 1,  //int
        enrolment_type: localStorage.getItem("enrolment_type") || 1,
        entrance_exam_required: localStorage.getItem("entrance_exam_required") || false, 
        cost: localStorage.getItem("cost") || 0.00,  //float
        //auditing: true,
        course_pacing: localStorage.getItem("course_pacing") || 1, //int
        course_start_date_time: localStorage.getItem("course_start_date_time") || "2021-08-26T17:13:00+01:00",  //2021-08-26T17:13:00+01:00
        course_end_date_time: localStorage.getItem("course_end_date_time") || "2021-08-26T17:13:00+01:00",
        enrolment_start_date_time: localStorage.getItem("enrolment_start_date_time") || "2021-08-26T17:13:00+01:00",
        enrolment_end_date_time: localStorage.getItem("enrolment_end_date_time") || "2021-08-26T17:13:00+01:00",
        course_language: localStorage.getItem("course_language") || 1,
        requirement_hours_per_week: localStorage.getItem("requirement_hours_per_week") || 1, //int
        requirement_no_of_week: localStorage.getItem("requirement_no_of_week") || 1,  //int
        grace_period_after_deadline: localStorage.getItem("grace_period_after_deadline") || 1, //int
         publication_status: localStorage.getItem("publication_status") || 2,  //int
        institution: localStorage.getItem("institution") || "",    //keypair preporpulated set of inst id
        author:  localStorage.getItem("author") || "" ,  //keypair preporpulated set of author id
		//for the authoring team you can uselocalstorage but i dont want to do that
		//make it more complex to be deciphered
		authoring_team :  JSON.parse(localStorage.getItem("authoring_team")) || []
		
		
		//inthe  create course or update on the fly append the jackpacks of all entered or searched authors
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
    const {institutions, languages, instructors, courses } = this.state;
    
    return (
      <Fragment>
        <AddHead />
		
		
		
		<div class="wrapper-loop">

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
                      href={process.env.PUBLIC_URL + "/authoring/create/new/"}
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
                        window.location.reload()
                      }}
                      href={"#"}
                      className=""
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> 
                      Clear
                    </a>
					</li>
					
					<li>

                      <a
                      style={{}}
                      href={process.env.PUBLIC_URL + "/authoring/course/history"}
                      className=""
                    >
                      <i className=" mdi mdi-keyboard-backspace"></i> Courses
                      List
                    </a>
					</li>
					
					<li>
                    <a
                      style={{ marginRight: "3px" }}
                      href="#no-grid"
                      onClick={this.togglerFullscreen}
                      id="toggle_fullscreen"
                      className=""
                    >
                      <i className=" mdi mdi-keyboard-backspace"></i> 
                      Fullscreen
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
                <div id="make-fixed-on-fullscreen" >
                  <h4>
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
                  <br />
				  
				  

                  <div className="col-md-12">
                    <ul
                      className="col-md-12 nav nav-pills nav-justified form-wizard-header mb-3"
                      style={{ background: "#f6f6f6", height: "45px" }}
                    >
                      <a

                      onClick={async (e) => {
                            this.goToStep(e, 1);
                            await  this.fetchContent()
                             // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                             //  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                                                   
                        }}
                        
                        href="#basic"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2 "
                      >
                        <i className="fa fa-edit mr-1"></i>
                        <span className="d-none d-sm-inline">Basic</span>
                      </a>


                      <a
                        style={{display:"none"}}
                      onClick={async (e) => {
                            this.goToStep(e, 1);
                            await  this.fetchContent()
                             // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                             //  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                          
                        }}
                        
                        href="#basic"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2 "
                      >
                        <i className="fa fa-edit mr-1"></i>
                        <span className="d-none d-sm-inline">Basic</span>
                      </a>


                      <a
                      onClick={async (e) => {
                            this.goToStep(e, 2);
                            await  this.fetchContent()
                        }}

                        href="#basic"  className="nav-link rounded-0 pt-2 pb-2 " data-toggle="tab"
                         
                      >
                        <i className="fa fa-edit mr-1"></i>
                        <span className="d-none d-sm-inline">Schedules</span>
                      </a>


                      <a
                        onClick={ async (e) => {
                          await  this.fetchContent()
                          this.goToStep(e, 3);
                          // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                          //     setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                           
                        }}
                        href="#requirements"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2 "
                      >
                        <i className="fa fa-bell mr-1"></i>
                        <span className="d-none d-sm-inline">Grading</span>
                      </a>

                      <a
                        onClick={async (e) => {
                            this.goToStep(e, 4);
                            await  this.fetchContent()
                             // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                             //  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                                                   
                        }}
                        href="#seo"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2 "
                      >
                        <i className="fa fa-tag mr-1"></i>
                        <span className="d-none d-sm-inline">
                           Group Config
                        </span>
                      </a>
                      

                      <a
                        onClick={async (e) => {
                            this.goToStep(e, 5);
                           
                             // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                             //  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                                                   
                        }}
                        href="#pricing"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2 "
                      >
                        <i className="fa fa-users mr-1"></i>
                        <span className="d-none d-sm-inline">
                          Authoring Team
                        </span>
                      </a>

                      <a
                       onClick={async (e) => {
                            this.goToStep(e, 8);
                            await  this.fetchContent()
                             // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                             //  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                                                   
                        }}
                        href="#resource"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2 "
                      >
                        <i className="fa fa-file mr-1"></i>
                        <span className="d-none d-sm-inline">Resource</span>
                      </a>

                      <a
                        onClick={ async(e) => {
                          this.goToStep(e, 6);
                          await  this.fetchContent()
                                 
                          // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                          //     setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                          $("#js-parent").html("")
                          await this.courseDetailJson()
                        }}
                        href="#media"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2 "
                      >
                        <i className="fa fa-menu mr-1"></i>
                        <span className="d-none d-sm-inline">Content</span>
                      </a>

                      <a
                        onClick={(e) => {
                          this.goToStep(e, 7);
                          
                           

                         
                        }}
                        href="#finish"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2 "
                      >
                        <i className="fa fa-checkbox mr-1"></i>
                        <span className="d-none d-sm-inline">Process</span>
                      </a>
                    </ul>
                  </div>
                </div>



                <div className="row">
                  <div className="col-md-12">
                    <form
                      
                      action="#" 
                      method="PATCH" 
                       novalidate
                      // enctype="multipart/form-data"
                      enctype="application/x-www-form-urlencoded"
                    >
                      {/*<CSRFToken /> Ready to django into the server*/}
                      <input type="hidden" name="csrfmiddlewaretoken" value={getCookie("csrfmiddlewaretoken")} />
                      <Step1
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleInputChange}
                        stateInitial={this.state}
						autoUpdateFilledData={this.autoUpdateFilledData}
                        
                        
                        actions={
                          {
                    stateAction:this.handleChangeTextEditor,
                    description:this.handleHtmlDescriptionChange,
                    overview: this.handleHtmlCourseOverViewChange,
                    learning_expectation: this.handleHtmlOutComeChange,
                    prerequisite: this.handleHtmlPrerequisitesChange,
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
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                      />

                      <Step3
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
                      />

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
                      />

                      <Step2
                      stateInitial={this.state}
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleInputChange}
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
                      />

                      <Step5
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
                      />

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
                      />
                      <Step7
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
                      />

                      <Step8
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
                      />

                      <br />
                      <br />
                    </form>



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
		
		
		
		
		   </article>
        </section>
    </div>
		

        {/*<EditorBox />*/}
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
      sprerequisite = localStorage.getItem("prerequisite") ||  this.props.stateInitial.prerequisite || ""
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
	let textEditors = ["learning_expectation","description", "prerequisite", "overview", "curriculum"]
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


  





  
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    const {institutions, languages, instructors, courses } = this.props
    

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
                  
                  <div className="code">
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="text"
                      className="form-control"
                      id="code"
                      name="code"
                      placeholder="Enter course code"
                      value={this.props.code}
                     onChange={this.props.handleChange}
                    />
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
                 
                  <div className="author">
                    <input
                      style={{ position: "relative", zIndex: "1" , display:"none"}}
                      type="text"
                      className="form-control"
                      id="author"
                      name="author"
                      placeholder="Enter course code"
                      value={this.props.author}
                     
                    />
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

                      value={this.props.course_name || this.state.name}
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
                                
                                 return swal("Success!", "The Instructor was found", "Success");
                                  
                             }else{

                                
                                  swal("Error", "We could not find instructor", "error");
                        
                                  swal.stopLoading();
                                 return swal.close();
                            

                             }
                          })
                          
                           
                          

                    }}

                            >
                              +
                            </button>
                            </div>

                        <br />
                        <br />
                        <label class="col-md-12 col-form-label" for="level">
                    Author<span className="required">*</span></label>
                </div>



                
                <div className="form-group col-md-12 fl-left">
                 
                  <div className="description">


                  <textarea
                    
                      name="description"
                      id="description"
                      style={{display:"none"}}
                      className="form-control"
                      placeholder="Short description"
                       value={this.state.description}
                     
                    ></textarea>
                    
                <label
                    className="col-md-12 col-form-label"
                    for="short_description"
                  >
                    Course Short description
                  </label><span></span>

                     <HTMLForm
                        title="description"

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
                    style={{display:"none"}}
                      
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
                      placeholder="Short description"
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
                  
                  <div className="">
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="text"
                      className="form-control"
                      id="intro_video"
                      name="intro_video"
                      placeholder="You tube url"
                       value={this.props.intro_video}
                     onChange={this.props.handleChange}
                    />

                    <label
                    className="col-md-12 col-form-label"
                    for="course_title"
                  >
                    video url<span className="required">*</span>{" "}
                  </label>
                  </div>
                </div>





        
                <div class="form-group  mb-3 col-md-12 fl-left">
                 
                  <div class="co" data-select2-id="94">
                  <label class="col-md-12 col-form-label" for="level">
                     Auditing
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="checkbox"
                      className=""
                      id="auditing"
                      name="auditing"
                      
                       value={this.props.intro_video}
                     onChange={this.props.handleChange}
                    />


                  </label>

                     
                  </div>
                </div>






 <div className="form-group col-md-12 fl-left">

                    <div class="file-drop-area col-md-12" style={{background: "#f5f5f5",
  padding: "40px 0 20px 0", margin:"20px"}}>
                      <span class="fake-btn">Choose files</span>
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    );
  }

  componentDidMount(){

  }
}


class Step5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareholders: [{ name: "" }],
    };
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
        <div className="tab-pane card-box schedules-form" id="outcomes">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="form-group col-md-6 fl-left">
               
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="course_title2"
                    name="grace_period_after_deadline"
                    placeholder="Enter course title"
                    required=""

                  />
                   <label className="col-md-12 col-form-label" for="course_title">
                  Grace period after deadline in weeks{" "}
                  <span className="required">*</span>{" "}
                </label>
                </div>
              </div>

              {/*<div class="form-group  col-md-6 fl-left">
                
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
                    <option value="beginner" data-select2-id="4">
                      20-50%
                    </option>
                    <option value="advanced" data-select2-id="95">
                      50-70%
                    </option>
                    <option value="intermediate" data-select2-id="96">
                      90%
                    </option>
                  </select>

                  <label class="col-md-12 col-form-label" for="level">
                  Grade
                </label>
                </div>
              </div>

              <div class="form-group  col-md-6 fl-left">
                
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
                    <option value="beginner" data-select2-id="4">
                      Professional
                    </option>
                    <option value="advanced" data-select2-id="95">
                      Certificate issued
                    </option>
                  </select>
                  <label class="col-md-12 col-form-label" for="level">
                  Assignment/Exam Type
                </label>
                </div>
              </div>*/}

             
            </div>
          </div>
        </div>
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
      }
      
  }

  render() {
    const {institutions, languages, instructors, courses } = this.props
 
    if (this.props.currentStep !== 2) {
      return null;
    }
    return (
      <React.Fragment>
	   <form id="schedules-form" className="required-form" action="#"  method="PATCH"  enctype="application/x-www-form-urlencoded">
        <div className="tab-pane" id="requirements">
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
                     value={this.state.course_start_date_time}
                     onChange={this.props.handleChange}
                  />
				  
				  	<div data-for="course_start_date_time" class="col-md-2 fl-left undo" onClick={(e)=>{ this.bindUndo(e)}}><i class="fa fa-undo"></i>Change</div>
                 
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
				  
				  	<div data-for="course_end_date_time" class="col-md-2 fl-left undo" onClick={(e)=>{ this.bindUndo(e)}}><i class="fa fa-undo"></i>Change</div>
                 
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
                     value={this.state.enrolment_start_date_time}
                     onChange={this.props.handleChange}
                  />
				  
				  	<div data-for="enrolment_start_date_time" class="col-md-2 fl-left undo" onClick={(e)=>{ this.bindUndo(e)}}><i class="fa fa-undo"></i> Change</div>
                 
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
                     value={this.state.enrolment_end_date_time}
                     onChange={this.props.handleChange}
                  />
				  
				  	<div data-for="enrolment_end_date_time" onClick={(e)=>{ this.bindUndo(e)}} class="col-md-2 fl-left undo"><i class="fa fa-undo"></i> Change</div>
                 
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
                  />
                </div>
              </div>

             
             

                <div className="form-group col-md-6 fl-left">
                     <label className="col-md-12 col-form-label" for="description">
                    Prerequisites (Enter the unique ID of the prerequisite course)
                  </label>

                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="prerequisite"
                    name="prerequisite"
                    placeholder="Enter course title"
                    required=""
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
                     value={this.props.name}
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
		  let teamleadTemplate =`<div style="background:#f6f6f6;padding:20px" id="cardbox card" class="card1 animate-slide-out ">
                    <div class="mdl-card__media">
                            <div class="article-image-purple">
                                <div class="mdl-card__title">
                                    <h4 class="mdl-card__title-text title-text--white">Team Lead: ${leadDetail.first_name} ${leadDetail.last_name}</h4>
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
                        <span class="mdl-chip__text" data-filter=".mdl-card" data-filter-tag="e">Email: ${leadDetail.email}</span>
                        </span><br/>
                        <span class="mdl-chip">
                        <span class="mdl-chip__text" data-filter=".mdl-card" data-filter-tag="g">Phone ${leadDetail.phone_number}</span>
                        </span><br/>
                    </div>
                    <div class="mdl-card__supporting-text">
                        Title :
                    </div>
                    <div class="mdl-card__actions mdl-card--border pagination">
                        <a id="nextLead" onclick="alert('event bubbles'); ${this.nextInstructor()}" class="next btn-next mdl-button btn-default" style="color:#fff">NEXT</a>
                    </div>
                </div>
              `
			  
			  
			  
			  let collaborators = $("#collabo-guys")
			  collaborators.append(teamleadTemplate)
	      }else{
			  //some error occured
		  }
	  }else{
		  swal("Notice","Please Ensure to have a team lead")
		  let teamLeadInstall = document.querySelector("div#teamleadInstall");
		  teamLeadInstall.style.opacity="1"
		  return "No Team Lead"
	  }
  }
  
  async getLeadDetail(){
	 //a fresh api search detail of instructor to find all information of the team leader
	 //avoid expensive api calls
	 if(localStorage.getItem("author")){
		 let instructorId = localStorage.getItem("author")
		 let lead_guy = await getInstructorProfile(instructorId)
		 console.log(lead_guy)
		 return lead_guy
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
	
    if (this.props.currentStep !== 5) {
      return null;
    }
    return (
      <React.Fragment>
        {" "}
        <div className="tab-pane schedules-form" id="pricing">
          <div className="row card-box">
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
                    className="form-control col-md-10 fl-left"
                    id="collaboratorslist"
                    name="collaboratorslist"
                    placeholder="Search or add collaborator"
                    required=""
                     
                     onChange={this.props.handleChange}
                  />
				  
				  	<div   class="col-md-2 fl-left undo" 
                                onClick={ () => {
			  let temp =[]
              let values = (this.state.collaborators.length > 0 ) ? this.state.collaborators : [];
			  if(localStorage.getItem("authoring_team")){
				  temp = localStorage.getItem("authoring_team") || [];
				  	  
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
                   
					if(temp){
						 let tempstore = localStorage.getItem("authoring_team")
						 console.log(tempstore)
						temp = JSON.parse(tempstore)
						temp = [...temp,...values]
						localStorage.setItem("authoring_team",JSON.stringify(temp))
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
				    <h4>Course Team</h4><hr/>
					
					
					<main class="mdl-layout__content">
            
                   <div id="collabo-guys" class="content-grid mdl-grid portfolio-max-width">
				   {this.runLoopSlideShow()}

				   
                     </div>
				  
				  </main>
				  
				  <div id="teamleadInstall" style={{opacity:"0"}}>
					    <h5>Add Team Lead</h5>
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
							<div style="background:#f6f6f6;padding:20px;width:100%;display:none" id="" class="card2 animate-slide-out">
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





    /*LETS DEFINE OUR ACTION EVENT FOR  THE MARDOWN EDITOR*/
    const preview = document.querySelector( '#preview' );
    const boldButton = document.querySelector( '#bold' );
    const italicButton = document.querySelector( '#italic' );
    const heading1Button = document.querySelector( '#heading1' );
    const heading2Button = document.querySelector( '#heading2' );
    const heading3Button = document.querySelector( '#heading3' );
    const linkButton = document.querySelector( '#link' );
    const tokenButton = document.querySelector( '#token' );
    const ulButton = document.querySelector( '#list-ul' );
    const olButton = document.querySelector( '#list-ol' );


    // DEFAULT INPUT AND OUTPUT AREA mark down effect
let textarea = document.querySelector( '#input-area' );
let outputArea = document.querySelector( '#output-area' );
let previewMessage = document.querySelector( '.preview-message' );



  if(heading1Button && heading2Button){

    preview.addEventListener( 'click', () => {
        output( parse( textarea.value ) );

      outputArea.classList.toggle( 'show' );
      previewMessage.classList.toggle( 'show' );
      preview.classList.toggle( 'active' );
    } );

    boldButton.addEventListener( 'click', () =>
      insertText( textarea, '****', 'demo', 2, 6 )
    );

    italicButton.addEventListener( 'click', () =>
      insertText( textarea, '**', 'demo',  1, 5 )
    );

    heading1Button.addEventListener( 'click', () =>
      insertText( textarea, '#', 'heading1', 1, 9 )
    );

    heading2Button.addEventListener( 'click', () =>
      insertText( textarea, '##', 'heading2', 2, 10 )
    );

    heading3Button.addEventListener( 'click', () =>
      insertText( textarea, '###', 'heading3', 3, 11 )
    );

    linkButton.addEventListener( 'click', () =>
      insertText( textarea, '[](http://...)', 'url text', 1, 9 )
    );

    tokenButton.addEventListener( 'click', () =>
      insertText( textarea, '{{}}', 'tokenValue', 2, 12 )
    );

    ulButton.addEventListener( 'click', function() {
      insertText( textarea, '* ', 'item', 2, 6 );
    } );

    olButton.addEventListener( 'click', () =>
      insertText( textarea, '1. ', 'item', 3, 7 )
    );

  }
    

// -------------------------------------------

function setInputArea( inputElement ) {
  textarea = inputElement;
}

function setOutputArea( outputElement ) {
  outputArea = outputElement;
}

function insertText( textarea, syntax, placeholder = 'demo', selectionStart = 0, selectionEnd = 0 ) {
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

function output( lines ) {
  outputArea.innerHTML = lines;
}

// -------------------------------------------
// PARSER
// -------------------------------------------

function parse( content ) {
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

  // Example: # Heading 1
  if( h1.test( content ) ) {
    const matches = content.match( h1 );

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
    let that = this;
    const Widget = e.target;
    const Type = Widget.getAttribute("data-type");
    const TemplateType = Widget.getAttribute("data-template"); //
    $("#title-unit").val("")
    $("#title-unit2").val("")
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


        $(".iframe-box").css({
          display:"block"
        })




         //change the field of the modal to match the widget module
        // $(".change-title").html("I frame Title")
        $(".change-title2").html("Add a link to the resource page ( Website )")
        // $(".change-description").html("Iframe Component")
        
        break;

      case "[pb_html][/pb_common_problems]":
         _title ="Problems : Common Problems"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_common_problems]",
          Target,
          MainClone,
          _title
        );

        markdownTemplate = "[pb_html][/pb_common_problems]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_common_problems]")
        break;
      case "[pb_html][/pb_checkboxes]":
       _title ="Problems : Checkboxes"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_checkboxes]",
          Target,
          MainClone,
          _title
        );

        markdownTemplate = "[pb_html][/pb_checkboxes]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_checkboxes]")
        break;
      case "[pb_html][/pb_numeric_input]":
       _title ="Problems : Numerical Inputs"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_numeric_input]",
          Target,
          MainClone,
          _title
        );

        markdownTemplate = "[pb_html][/pb_numeric_input]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_numeric_input]")
        break;
     case "[pb_html][/pb_numeric_input_feed]":
         _title ="Problems : Numerical Input With Feed Back"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_numeric_input_feed]",
          Target,
          MainClone,
          _title
        );

        markdownTemplate = "[pb_html][/pb_numeric_input_feed]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_numeric_input_feed]")
        break;

      case "[pb_html][/pb_text_input]":
       _title ="Problems : Text Input"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_text_input]",
          Target,
          MainClone,
          _title
        );

        markdownTemplate = "[pb_html][/pb_text_input]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_text_input]")
        break;
      case "[pb_html][/pb_multiple_choice]":
       _title ="Problems : Multi Choice"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_multiple_choice]",
          Target,
          MainClone,
          _title
        );

        markdownTemplate = "[pb_html][/pb_multiple_choice]"
        htmlEquivalentTemplate =getTemplateType("[pb_html][/pb_multiple_choice]")
        break;
      case "[pb_html][/pb_text_input_feed]":
        _title ="Problems : Text Input With Feed Back"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_text_input_feed]",
          Target,
          MainClone,
          _title
        );

        markdownTemplate = "[pb_html][/pb_text_input_feed]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_text_input_feed]")
        break;
      case "[pb_html][/pb_dropdown]":
       _title ="Problems : Drop Down"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_dropdown]",
          Target,
          MainClone,
           _title
        );

        markdownTemplate = "[pb_html][/pb_dropdown]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_dropdown]")
        break;
      case "[pb_html][/pb_dropdown_feed]":
       _title ="Problems : Drop Down With Feed Back"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_dropdown_feed]",
          Target,
          MainClone,
          _title
        );

        markdownTemplate =  "[pb_html][/pb_dropdown_feed]"
        htmlEquivalentTemplate = getTemplateType( "[pb_html][/pb_dropdown_feed]")
        break;
      case "[pb_html][/pb_checkboxes_feed]":
       _title ="Problems : Checkboxes With Feed Back"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_checkboxes_feed]",
          Target,
          MainClone,
          _title
        );
        break;
      case "[pb_html][/pb_button]":
       _title ="Problems : Buttons"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_button]",
          Target,
          MainClone,
          _title
        );
          markdownTemplate = "[pb_html][/pb_button]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_button]")
        break;
      case "[pb_html][/pb_multiple_choice_feed]":
         _title ="Problems : Multiple Choice"
        Clone = launchFormBoxIntoModal(
          "[pb_html][/pb_multiple_choice_feed]",
          Target,
          MainClone,
          _title
        );
          markdownTemplate = "[pb_html][/pb_multiple_choice_feed]"
        htmlEquivalentTemplate = getTemplateType("[pb_html][/pb_multiple_choice_feed]")
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
        Clone = launchFormBoxIntoModal("[pb_html][/pb_text]",Target,MainClone, "HTML: Text Editor")
        return false;
    }







 


  // if(TemplateType =="[pb_html][/pb_iframe]" || TemplateType =="[pb_html][/pb_video]"
  //    || TemplateType =="[pb_html][/pb_broadcasting]" || TemplateType == "[pb_html][/pb_google_meet]"
  //    || TemplateType == "[pb_html][/pb_confrencing]" ||  TemplateType == "[pb_html][/pb_vimeo]"  ||  TemplateType == "[pb_html][/pb_you_tube]"
  //    ){
          // alert("its generic")   
       // }

     

     
  };





  const launchFormBoxIntoModal = (TemplateType,Target,cloneElement, componentTitle) =>{
    //add code deception from data-fields



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


     let T = new  TinyMyceRender();
     T.render("")

    
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

        {/*lesson categories section goes here* myModalLessonGroup*/}
        <div id="myModalLessonGroup" class="modal-build">
          <div class="modal-build-inner">
            <div class="modal-toolbar" onClick={()=>{closeModal()}}>
              <h2 class="modal-title">Lessons Component</h2>
              <i id="pb-modal-close" class="fa fa-times" ></i>
            </div>
            <div class="modal-tabs">
              <div class="modal-tab widgets-tab active-tab">
                <i class="tab-icon fa fa-code fa-2x"></i>Html
              </div>
              <div class="modal-tab background-tab">
                <i class="tab-icon fa  fa-question-circle-o fa-2x"></i> Problem
              </div>
              <div class="modal-tab special-video">
                <i class="tab-icon fa fa-video-camera fa-2x"></i> Video
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
                 href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >
                <i class="fa fa-comment fa-2x"></i>
                <span>Common Problems</span>
              </div>
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_checkboxes]"
                data-type="background"
                href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                  
              >
                <i class="fa fa-check-square-o fa-2x"></i>
                <span>Checkboxes</span>
              </div>

              <div
                class="pb-widget"
                data-template="[pb_html][/pb_numeric_input]"
                data-type="background"
                href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 onClick={()=>{localStorage.setItem('user_action',"[pb_html][/pb_numeric_input]")}}
              >
                <i class="fa fa-keyboard-o fa-2x"></i>
                <span>Numerical Input</span>
              </div>
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_text_input]"
                data-type="background"
                href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >

                <i class="fa fa-keyboard-o fa-2x"></i>
                <span>Text Input</span>
              </div>

              

              <div
                class="pb-widget"
                data-template="[pb_html][/pb_multiple_choice]"
                data-type="background"
                href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >
                <i class="fa fa-quora fa-2x"></i>
                <span>Multiple Choice </span>
              </div>

              <div
                class="pb-widget"
                data-template="[pb_html][/pb_dropdown]"
                data-type="background"
                href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >
                <i class="fa fa-chevron-circle-down fa-2x"></i>
                <span>Dropdown</span>
              </div>
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_dropdown_feed]"
                data-type="background"
                href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >
                <i class="fa fa-chevron-circle-down fa-2x"></i>
                <span>Dropdown + hint and feedback</span>
              </div>

              <div
                class="pb-widget"
                data-template="[pb_html][/pb_checkboxes_feed]"
                data-type="background"
                href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >
                <i class="fa fa-check-square-o fa-2x"></i>
                <span>Checkboxes + hint and feedback</span>
              </div>
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_multiple_choice_feed]"
                data-type="background"
                href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >
                <i class="fa fa-quora fa-2x"></i>
                <span>Multiple Choice + hint and feed back</span>
              </div>
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_numeric_input_feed]"
                data-type="background"
                href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >
                <i class="fa fa-text fa-2x"></i>
                <span>Numerical Input + hint and feed back</span>
              </div>
              <div
                class="pb-widget"
                data-template="[pb_html][/pb_text_input_feed]"
                data-type="background"
                href="#myModalMarkdownEditor" 
                 role="button" data-toggle="modal"
                  data-fields="['','']"
                 
              >
                <i class="fa fa-text fa-2x"></i>
                <span>Text Input + hint and feed back</span>
              </div>
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
                  <h5 class="modal-title pull-left put-title" >Add Unit Component</h5>
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
                        <input type="text" class="form-control" id="editor-html-name" name="name"/>
                      </div>


                      <div class="form-group root-block" >
                        
                        <input type="hidden" name="lesson" class="form-control" id="lesson-editor-id2"  />
                      </div>


                      <div class="form-group root-block">
                        <label class="change-title">Description</label>
                        <input type="text" name="description" class="form-control" id="editor-html-description" />
                      </div>

                      <div class="form-group root-block">
                        <label class="change-title">Content Type </label>
                        <select id="editor-html-type" class="form-control" name="component_type">
                             <option value="1">Video</option>   
                               <option value="2">HTML</option>
                             
                          
                      </select>
                      </div>

                      <div class="form-group">
                       <select class="form-control" id="editor-html-content-type" name="content_type">
                          
                                <option value="1">I-Frame</option> 
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
                        }} type="text" name="embedded_url" class="form-control" id="title-unit2" />
                      </div>


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
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>






        {/*Preview videos and iframes*/}

        {/*modalFullScreenPreviewIframeAndVideos*/}
      <Fragment>

      <div
          style={{ marginTop: "80px" }}
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
          
          
          <iframe class="content-area" id="projector-view" />
          
      



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
                        <input type="text" class="form-control" id="editor-html-name" name="name"/>
                      </div>


                      <div class="form-group root-block" >
                      <input type="hidden" name="component_id" class="form-control" id="component_id"  />
  
                        
                        <input type="hidden" name="lesson" class="form-control" id="lesson-editor-id"  />
                      </div>


                      <div class="form-group root-block">
                        <label class="change-title">Description</label>
                        <input type="text" name="description" class="form-control" id="editor-html-description" />
                      </div>

                      <div class="form-group root-block">
                        <label class="change-title">Component Type </label>
                        <select id="editor-html-type" class="form-control" name="component_type">                      
                              <option value="2">HTML</option>                      
                              <option value="3">Problem</option>
                              <option value="4">Discussion</option>
                      </select>
                      </div>
                      <div class="form-group">
                       <select class="form-control" id="editor-html-content-type" name="content_type">
                                <option value="1">I-Frame</option>
                                <option value="2">HTML TEXT</option>
                                <option value="3">HYBRID</option>
                        </select>
                      </div>
                      <input  
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
                  <h5 class="modal-title pull-left edit-title" id="edit-title">Editing</h5>
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
                        <input type="text" class="form-control" id="editor-html-name" name="name"/>
                      </div>


                      <div class="form-group root-block" >
                        
                        <input type="hidden" name="lesson" class="form-control" id="lesson-editor-id2"  />
                      </div>


                      <div class="form-group root-block">
                        <label class="change-title">Description</label>
                        <input type="text" name="description" class="form-control" id="editor-html-description" />
                      </div>

                      <div class="form-group root-block">
                        <label class="change-title">Content Type </label>
                        <select id="editor-html-type" class="form-control" name="component_type">
                              <option value="1">Video</option>    
                              <option value="2">HTML</option>
                              <option value="3">Problem</option>
                              <option value="4">Discussion</option>
                          
                      </select>
                      </div>

                      <div class="form-group">
                       <select class="form-control" id="editor-html-content-type" name="content_type">
                                <option value="1">I-Frame</option>
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
                        }} type="text" name="embeded_url" class="form-control" id="title-unit2" />
                      </div>


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
                    onClick={handleEditSaveGeneric}
                   
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








          <div class="pb-widget-preview-panel">
            
            
              <div class="container">
                <div class="row">
                  <div class="col-md-10">
                    <div class="panel-xx panel-dark">
                    
              <div class="panel-heading-xx">
                <span
                  class="panel-title unit_title_place_holder"
                  style={{ float: "left",  marginLeft: "10px" }}
                >
                  
                </span>
                <div class="actions-set">
                  <span><a href="#myModalMarkdownEditorEditMode"
              role="button"
              data-toggle="modal"><i
               onclick="LaunchEditBoxEvent(this)"

               class="pb-handle-widget fa fa-edit fa-2x"></i></a></span>
                               
                  <span><i class="pb-remove fa fa-trash fa-2x" onclick="handleWidgetRemove(this)"></i></span>
                </div>
              </div>
            
                      <div class="panel-body-xx ">
                        
                        <div class="content-section-from-input unit_content_place_holder">
                          Edit this section
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
          </div>


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
  showAdvancedSettings(e){
	  e.preventDefault();
	
	  let target = document.querySelector("#slideeffect")
	  target.style.width = "80%"
	  target.style.left="0"
	  $("#slideeffect").fadeIn("slow")
	   $("#slideeffect").css({width:"80%"})
  }
  
  closeAdvancedSettingsPanel(e){
	  e.preventDefault()
	  $("#slideeffect").fadeOut("slow")
	  $("#slideeffect").css({width:"0px"})
  }
  render() {
    if (this.props.currentStep !== 4) {
      return null;
    }
    return (
      <React.Fragment>
        {" "}
        <div className="tab-pane" id="seo">
          <div className="row">
            <div className="col-md-12">
			
			
			
			{/*here is what you can manage*/}
			
			<div class="col-md-12 configurations">
<div class="toggleslider pull-right"><a href="" onClick={(e)=>{this.showAdvancedSettings(e)}}>Advanced Settings</a></div>

  <div class="pull-left col-md-6">
<h1 class=" ">Group Configurations</h1>
    <p>Configuration settings for different possible group of learners</p>
  </div>
  
  <div class="pull-right col-md-12">

        <table class="table">
            <thead>
                <tr>
                    <th class="name-col">Course General Settings</th>
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






  
  <div class="slideeffect" id="slideeffect">
  <p class="closeslide" ><a onClick={(e)=>{this.closeAdvancedSettingsPanel(e)}} href="">X</a></p>
   
    
      
  <div class="pull-left col-md-6">
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











			
			
			
			{/*ends work here*/}
            
            </div>
		  </div>
        </div>
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
        <div className="tab-pane" id="resource">
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
      </React.Fragment>
    );
  }
}
