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
import TinyMyce from './tinymyce-plugin';



import HTMLForm from "./Editor";

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
  getSectionsOfCourseId
  

 
} from "services/authoring"



/*the base url link*/
let base_url = "http://gapslmsservices.herokuapp.com"; //process.env.REACT_APP_API_URL2

// Change JQueryUI plugin names to fix name collision with Bootstrap.
$.widget.bridge('uitooltip', $.ui.tooltip);
$.widget.bridge('uibutton', $.ui.button);


//import other jquery plugins
//import bridget like this 

//hook other plugins to jquery using bridget like this in the future
// jqueryBridget( 'tinymyce', TinyMyce, $ );



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



// this is to  prevent enter key when modal is shown
//enforce user to click the modal buton or close it

      // $("body").keyup(function (e) {
      //   // ESC key maps to keycode `27`
      //   if (e.keyCode ==   13) {
     //        e.preventDefault()
       //      return false;
      //   }
      // });


      // $(document).keyup(function(objEvent) {
    //   if (objEvent.keyCode ==  13) {
    //       return false
    //   }
    // });

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


  // Methods


  const handleWidgetRemove = (widget) => {
    widget.parentElement.parentElement.parentElement.parentElement.remove();
  };


const LaunchEditBoxEvent = (e) =>{
   /*this is based on categorized module widgets*/
   alert("testingedit" + e.dataset.template)
  

  }

window.LaunchPreviewBoxEvent =(Target,MainClone,TemplateType) =>{
    /*just previews the content in the modal section view*/
  }
function removeLoader(){
  $( "#loadingDiv" ).fadeOut(500, function() {
          // fadeOut complete. Remove the loading div
      $( "#loadingDiv" ).remove(); //makes page more lightweight 
  });  
}




/*custom drag drop event handling for lessons and components to their respective subsections*/


window.handleLessonDraggingEntered = function(ev, el) {
  // alert("you are dragging the id: "+ ev.target.getAttribute('id'))
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData( 'text', $(el).attr("data-template") );
  console.log("dragging id:"+  $(el).attr("data-id") + "  template clone :" + $(el).attr("data-template"))
  // ev.target.classList.add( "draggable--active" );
  localStorage.setItem("sendZone",$(el).attr("data-template"))
}

// these functions prevents default behavior of browser
window.dragEnterIntoSection = (ev) => {
  console.log("entering drop-zone:" + ev.target.id)
  window.event.preventDefault();
  return true;
}
window.dragOverSection = (ev) => {
  window.event.preventDefault();
  ev.dataTransfer.effectAllowed = 'move';
  ev.target.closest( ".drop-zone-section" ).classList.add( "drop-zone--active" );
}

window.dragLeaveLessonIntoSubsection = ( event ) => {
  // console.log( "DRAG LEAVE" );
  event.target.classList.remove( "drop-zone--active" );
}


// function defined for when drop element on target
window.dragDropLessonComponentToSubSection = ( event ) => {
  // console.log( 'DROP' );
  console.log(event.dataTransfer.getData( 'text' ), localStorage.getItem("ls_tracker"))
  console.log(document.getElementById( "dynamic_subsection_" + localStorage.getItem("s_tracker") + "_lesson_component"  ) )

  $(event.target).closest( ".drop-zone-section" )

  console.log($( "#" + localStorage.getItem("sendZone") ).html())
     .append( $( "#" + localStorage.getItem("sendZone") ).html()  )


   if( document.getElementsByClassName( "draggable--active" )){
    // document.getElementsByClassName( "draggable--active" )[0].classList.remove( "draggable--active" );
   }
  
  if ( document.getElementsByClassName( "drop-zone--active" )[0] ) {
    document.getElementsByClassName( "drop-zone--active" )[0].classList.remove("drop-zone--active" );
  }

  event.preventDefault();
  event.stopPropagation()

}


window.dragEndedSoon = ( event ) => {
  // event.preventDefault();
  console.log( 'DRAG END' );
  document.getElementsByClassName( "console" )[0].innerHTML = "<h4>CONSOLE: DRAG END</h4>";
  timeDelay();
  // remove applied active classes, regardless of where released.
  if ( document.getElementsByClassName( "draggable--active" )[0] ) {
    document.getElementsByClassName( "draggable--active" )[0].classList.remove( "draggable--active" );
  }
  if ( document.getElementsByClassName( "dropzone--active" )[0] ) {
    document.getElementsByClassName( "dropzone--active" )[0].classList.remove( "dropzone--active" );
  }
}

// UTILITY FUNCTIONS
function timeDelay() {
  let timeoutID = window.setTimeout(clearConsole, 2000);
}

function clearConsole() {
  document.getElementsByClassName( "console" )[0].innerHTML = "<h4>CONSOLE:</h4>";
}



       
let lesson_counter = 1;

window.addlessonSection = (e) => {
  localStorage.setItem("lesson_component", e.dataset.id);
}
const createLessonSection = (el) => {
  let muu_counter = lesson_counter++;
  localStorage.setItem("l_tracker", muu_counter);
  // alert(localStorage.getItem("lesson_component"))
  let panel_class =  $(".muu_" + localStorage.getItem("s_tracker"));  // $("." + localStorage.getItem("lesson_component")) //  $(".muu_" + localStorage.getItem("s_tracker"));
  // let lesson_components = document.getElementById("myModalLessonGroup");
  // lesson_components.style.display = "block"; //should not show up until you click add component


// onDragStart="dragStart(event)" onDragEnd="dragEnd( event )"
  let template = ` 
      <ul    id="dynamic_subsection_${muu_counter}_lesson_component "  data-id="${
    "muu_" + muu_counter
  }" class="reaper-${muu_counter} fold root-lesson-ul draggable dynamo_${localStorage.getItem("l_tracker")} card-box ${
    "muu_" + muu_counter
  } col-md-8   section-parent_${localStorage.getItem(
    "tracker"
  )} subsection-child_${localStorage.getItem(
    "s_tracker"
  )} " style="margin-right:20px;min-width:98%;width:98%" 
   dragable="true"  
  
   >
  
   
      <div class="console" style="display:none">
    <h4>CONSOLE:</h4>
  </div>
        <li class="fold-content">
  
               <span class="title_sub " data-th="Company name" style="font-size:15px">${
                 $("#title_3").val() || "Lesson"
               }</span>
                <span class="subsect" data-th="Customer no"></span>
                <span class="action" data-th="Customer nam"  style="float:right">



        <a style="margin-right:10px;background:#fff;color:#000"
            href="#myModalSubSectionEdit" role="button" data-toggle="modal"
          data-id="${"muu_" + muu_counter}"
            onclick="localStorage.setItem('given_lsid','dynamic_lsubsection_'+${muu_counter});localStorage.setItem('ls_tracker',${muu_counter});"       
          >
                
          <i class="fa fa-edit "></i>
        </a>


        <a style="margin-right:10px;background:#fff;color:#000"
          
          data-id="${"lmuu_" + muu_counter}"
           onclick=""        
          >
                
          <i class="fa fa-trash "></i>
        </a>


         <a class="drag-handle-list-lessons" style="margin-right:10px;background:#fff;color:#000"
          data-id="${"lmuu_" + muu_counter}"
          data-template="dynamic_subsection_${muu_counter}_lesson_component "
           ondragstart="handleLessonDraggingEntered(event, this)"
           ondragend="dragEndedSoon(event)"
           onclick="localStorage.setItem('given_lsid','dynamic_lsubsection_'+${muu_counter});localStorage.setItem('ls_tracker',${muu_counter});"
                 
          >

         <i class="fa fa-arrows "></i>
        </a>



         <a class="dropright dropright "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
                <i class="fa fa-ellipsis-v " style="color:#000"></i>
             
        <ul class="dropdown-menu" style="margin-left:40px" >

 

                

                <li><a class="dropdown-item"   href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${"lmuu_" + muu_counter}"
            onclick="localStorage.setItem('given_lsid','dynamic_lsubsection_'+${muu_counter});localStorage.setItem('ls_tracker',${muu_counter});"       
          >Edit </a></li>



                <li><a class="dropdown-item"   
          data-id="${"lmuu_" + muu_counter}"
            onclick="showComponentModal(this);localStorage.setItem('given_lsid','dynamic_lsubsection_'+${muu_counter});localStorage.setItem('ls_tracker',${muu_counter});"       
          >Add Component</a></li>


                <li><a class="dropdown-item" 
                 data-id="${"lmuu_" + muu_counter}"
                onclick="localStorage.setItem('given_lsid','dynamic_lsubsection_'+${muu_counter});localStorage.setItem('ls_tracker',${muu_counter});"

                >Replicate Section</a></li>
                
                <li><a class="dropdown-item" href="#noclick"  data-id="${
                  "lmuu_" + muu_counter
                }"
           onclick="" >Delete</a></li>
           </ul>
         </a>
         



                </span>
</li></ul>`;

   $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


  panel_class.append(template);

// panel_class.append(template)



/*sort lessons sections */
    /*can only move along lesson sections  and no where else*/
    // if (document.querySelectorAll(".centerSubsection")) {
      
    //   var children = $(".centerSubsection").children.length; 

    //   // alert(children)
    //   var lessonsGroups = document.querySelectorAll(".root-lesson-ul");
    //   lessonsGroups.forEach(function (ele) {
    //     Sortable.create(ele, {
    //       group: "columns-newset",
    //       handle: ".drag-handle-list-lessons",
    //     });
    //   });
    // }

    //this is triky as it needs restrictions
    // lessons can only be dropped on subsections with its entire components passed into it


    // handle drag start

    // handle drag stop

};


const  handleSaveComponentTextEditor =(e) => {
    let randId = uuid()
     let Target = $(".dynamo_" + localStorage.getItem("l_tracker"));
    
    let allowedHeaders =  document.getElementById("myModalMarkdownEditor")
    let T = allowedHeaders.getAttribute('data-basestation')
    let markdownTemplate =  allowedHeaders.getAttribute("data-markdown")
    let _title =  allowedHeaders.getAttribute("data-title")

        
         // alert("its editorial") 

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
      
        MainClone.querySelector(".fa-edit").setAttribute("data-template",markdownTemplate)
        MainClone.querySelector(".fa-edit").setAttribute("data-id",randId) //ref the curr main lesson box
        MainClone.querySelector(".fa-edit").addEventListener("click",(es) =>{
             document.getElementById(MainClone.id).setAttribute("data-parent",MainClone.id)
                  const extracts = $("#" + MainClone.getAttribute("id")).find(".unit_content_place_holder").html();
                  const editBoard = document.getElementById("myModalMarkdownEditorEditMode").querySelector(".visuell-view2");
                  editBoard.value = extracts;
                  const markupBoard = document.getElementById("markup-template-content")
                  markupBoard.innerHTML =markdownTemplate
        })

        MainClone.querySelector(".fa-trash").addEventListener("click", (e) => {
             handleWidgetRemove(e.target)
        })
      MainClone.querySelector(".unit_title_place_holder").innerHTML= _title   //no title initially for this comonent
      MainClone.querySelector(".unit_content_place_holder").innerHTML =  getTemplateType(markdownTemplate)        //$("#input-area").val()      //getTemplateType(markdownTemplate)           //$(".visuell-view").html() || "Edit this content"
      const markupBoard = document.getElementById("markup-template-content")

      // document.getElementById("myModalMarkdownEditorEditMode").querySelector(".visuell-view2")
      markupBoard.innerHTML =markdownTemplate
      $(".visuell-view").html(getTemplateType(markdownTemplate))
      Target.append(MainClone);


}





const  handleSaveComponentGenericForm = () => {
    let Target = $(".dynamo_" + localStorage.getItem("l_tracker"));
    let allowedHeaders =  document.getElementById("myModalGenericForm")
    let T = allowedHeaders.getAttribute('data-basestation')
    let markdownTemplate =  allowedHeaders.getAttribute("data-markdown")


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

export default class MasterForm extends React.Component {
  constructor(props) {
    super(props);

    let sname,scode, sauthor,sinstitution;
    if(localStorage.getItem("name")){
      sname= localStorage.getItem("name") || "";
      scode = localStorage.getItem("course_code") || "";
      sauthor = localStorage.getItem("author") || "" ;
      sinstitution = localStorage.getItem("institution") || ""

    }
    let sdescription, soverview, sprerequisite, slearning_expectation, scurriculum
    if(localStorage.getItem("overview")){

      soverview = localStorage.getItem("overview") || ""
    }

    if(localStorage.getItem("description")){

      sdescription = localStorage.getItem("description") || ""
    }
    if(localStorage.getItem("prerequisite")){
      sprerequisite = localStorage.getItem("prerequisite") || ""
    }
    if(localStorage.getItem("learning_expectation")){
      slearning_expectation = localStorage.getItem("learning_expectation") || ""
    }
    if(localStorage.getItem("curriculum")){
      scurriculum = localStorage.getItem("curriculum") || ""
    }


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
      name: sname,
      code: scode,
      institution: sinstitution,   //keypair preporpulated set of inst id
      author: sauthor,  //keypair preporpulated set of author id

      description: sdescription,
      overview: soverview,
      learning_expectation: slearning_expectation,
      curriculum: scurriculum,
     



      
      //state fields
      /*request form data*/
      
        
        run: "",
        card_image: "",
        intro_video: "",
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
    };
    /*movement logic data*/
    this.handleChange = this.handleInputChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
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
    
      let { name, value } = event.target;
      localStorage.setItem(name,value)

      this.setState({
        ...this.state,
        [event.target.name]: event.target.value,
      });
      

  };




   /*navigation skipper*/

  goToStep(e, step) {
    e.preventDefault();
    // e.target.parentElement.style.border = "1px solid #eee";
    // e.target.parentElement.style.padding = "2px";
    this.setState({
      currentStep: step,
    });

    console.log(this.state)
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
        this.state.formValidity.code &&
        this.state.formValidity.institution  
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
        <a href="javascript::" className="" disabled>
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

  clearItems(list) {
    for (const item of list) {
      localStorage.removeItem(item, "");
    }
    localStorage.clear()
  }




  
  componentDidMount(){
    

    (async (trigger) =>{
       try{
         await this.fetchContent()
       }catch(e){
         console.log("some error occured")
       }
    })("run-logic-sequence")
    
   $("label").css({color:"#000"})

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
         let classAttr = `ql-editor[data-placeholder=${e.attr("name")}]`        
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

 fetchContent = async () => {
   //automated logic
   const itemsToRemove = ['name', 
                       'author', 
                       'description', 
                       'code', 
                       'institution', 
                       'overview',
                       'prerequisite',
                       'outcomes'
    ];
    this.clearItems(itemsToRemove)
       
    Promise.all(
      [
        getLanguages(),
        getCourses(),
        getInstitutions(),
        getInstructorProfiles(),
      ].map((err) => err.catch(() => console.log( err)))
    )
      .then((res) => {

        

        

        console.log(res[2].results)
        if(typeof (res[2].results) == "Array") {
          // do nothing
        }else{
          // alert(typeof res[2].results )
          console.log(Array.from(res[2].results))

          this.setState({
          languages: res[0].data.data, // from enrollments this is already an array
          courses:  this.transformObject(res[1].results), //from lms  this needs to be reformed
          institutions: this.transformObject(res[2].results), // reformation needed
          instructors: this.transformObject(res[3].results)  // reformation needed
        })
        }
        
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // toast.error("Error Occured fetching data");
        // setLoading(false);
      });

      

  };


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


  saveOrUpdateData = async ( type, mode="", url, data) => {
    //after api call to update or create
    switch(mode){
      case "CREATE_MODE": // this is only done once when the app is launched to create new course
        //call the create handler to api with form data
        let newCourseRes = await createAnyResource("POST",url, data)
        console.log("success creating new course", newCourseRes)  
        break;
      
      default:
        throw new Error(`Wrongly accessed mode:- ${mode}`)
        return false;
    }
    
    //inform user
      var button = document.querySelector('.save-generic');
      var slideout = document.getElementById('notifier');
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
  saveAndContinue =  (e) =>{
    const {currentCourseId } = this.state;
    let curr = this.state.currentStep;
    this.persistData("mode","CREATE_MODE")
    let url=   "/lms/api/create/course/"
           //this is a create action
    try{
    let result = this.saveOrUpdateData("create", 'CREATE_MODE', url, $("form#create-course") )
    
    if(result?.id){

    }else{

    }
    }catch (e){

    }
    
  }


  render() {
    const {institutions, languages, instructors, courses } = this.state;
    
    return (
      <Fragment>
        <NavBar />
       

        <div className="row" id="container-fullscreen">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div id="make-fixed-on-fullscreen">
                  <h4 className="header-title mb-3">
                    Course adding form{" "}


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
                      <i className=" mdi mdi-keyboard-backspace"></i> Create
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
                      href={process.env.PUBLIC_URL + "/authoring/course/history"}
                      className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"
                    >
                      <i className=" mdi mdi-keyboard-backspace"></i> Courses
                      List
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
                

                  
                </div>



                <div className="row">
                  <div className="col-md-12">








<dl class="responsive-tabs">
  <dt class="active"  onClick={async (e) => {
                            this.goToStep(e, 1);
                            await  this.fetchContent()
                             // $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
                             //  setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.


                                                   
                        }}>Basic</dt>
  <dd>
      <h2>Course Basics</h2><br/>
      
                    <form
                      id="stepUpFormWithAI"
                      className="required-form"
                      action="/lms/api/create/course/" 
                      method="POST" 
                       novalidate
                      // enctype="multipart/form-data"
                      enctype="application/x-www-form-urlencoded"
                      style={{height:"300px"}}
                    >
                      {/*<CSRFToken /> Ready to django into the server*/}
                      Ensure to select an authoring team*
                      <input type="hidden" name="csrfmiddlewaretoken" value={getCookie("csrfmiddlewaretoken")} />
                      <Step1
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        camelOverride={this.handleInputOverride}
                        stateInitial={this.state}
                        
                        
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

                      
                     
                    </form>
                      </dd>

  <dt onClick={(e) => {
                          $(e.target.parentElement).css({background:"#fff"})
                          $(e.target).css({color:"#333"})
                          swal("Sorry!!!", "You need to fill out the required fields marked asterisk (*)", "error");
                        
                        }}>Schedules</dt>
  <dd        
>
      <h2>Course Scheduling</h2><br/>
     



      </dd>

  <dt  onClick={(e) => {
                          $(e.target.parentElement).css({background:"#fff"})
                          $(e.target).css({color:"#333"})
                          swal("Sorry!!!", "You need to fill out the required fields marked asterisk (*)", "error");
                        
                        }}>Grading</dt>
  <dd>
      <h2>Grading</h2><br/>
       
      
  </dd>

  <dt  onClick={(e) => {
                          $(e.target.parentElement).css({background:"#fff"})
                          $(e.target).css({color:"#333"})
                          swal("Sorry!!!", "You need to fill out the required fields marked asterisk (*)", "error");
                        
                        }}>Group Config</dt>
  <dd>
     
  </dd>
    
    
     
     <dt   
                        onClick={ async (e) => {
                          $(e.target.parentElement).css({background:"#fff"})
                          swal("WOOPS!", "You need to fill out the required fields marked asterisk (*)", "error");
                           

                           //this.goToStep(e, 1); 

                        }}>Authoring Team</dt>
     <dd>
 <h2>Authoring Team</h2><br/>
         

     </dd>
     <dt onClick={(e) => {
                          $(e.target.parentElement).css({background:"#fff"})
                          $(e.target).css({color:"#333"})
                          swal("Sorry!!!", "You need to fill out the required fields marked asterisk (*)", "error");
                        
                        }}
                       >Resource</dt>
     <dd>
       <h2>Files and Media Resources</h2><br/>
        

     </dd>
     <dt onClick={(e) => {
                          $(e.target.parentElement).css({background:"#fff"})
                          $(e.target).css({color:"#333"})
                          swal("Sorry!!!", "You need to fill out the required fields marked asterisk (*)", "error");
                        
                        }}>Content</dt>
     <dd>

     </dd>
</dl>








                     <div class="notifier" id="notifier">
                          <div class="success-notification">
                             {/*success message*/}

                          </div>

                          <div class="error-notification">
                              {/*error message*/}
                              Could not perform operation
                          </div>
                     </div>

                    {/*<div style={{ position: "absolute", bottom: "0px", marginLeft:"20px" }}>
                      <ul className="list-inline mb-0 wizard text-center">
                        {this.previousButton}

                        {this.nextButton}
                      </ul>
                    </div>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      sname= localStorage.getItem("name") || "";
      scode = localStorage.getItem("course_code") || "";
      sauthor = localStorage.getItem("author") || "" ;
      sinstitution = localStorage.getItem("institution") || ""

    }
    
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
      name: sname,
      code: scode,
      institution: sinstitution,   //keypair preporpulated set of inst id
      author: sauthor,  //keypair preporpulated set of author id

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
    };

    
     

    this.dropRef = createRef()
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
                  
                  <div className="">
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="text"
                      className="form-control"
                      id="code"
                      name="code"
                      placeholder="Enter course code"
                      value={this.props.code}
                     onChange={this.props.camelOverride}
                     maxlength="10"
                    />
                    <label
                    style={{display:"block"}}
                    className="col-md-12 col-form-label"
                    for="course_title"
                  >
                    Course Code <span className="required">*</span>{" "}
                  </label>
                  </div>
                </div>

               {/*this will be the logged in instructor id hidden */}
                <div className="form-group col-md-6 fl-left" >
                 
                  <div className="">
                    <input
                      style={{ position: "relative", zIndex: "1" , display:"none"}}
                      type="text"
                      className="form-control"
                      id="author"
                      name="author"
                      placeholder="Enter course code"
                      value=""
                     
                    />
                  </div>
                   </div>

                <div className="form-group col-md-6 fl-left">
                 
                  <div className="">
                    <input
                      style={{ position: "relative", zIndex: "1", marginTop:"-10px" }}
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter course title"
                    maxlength="150"
                      value={this.props.course_name}
                     onChange={this.props.handleChange}
                    />
                     <label
                     style={{display:"block"}}
                    className="col-md-12 col-form-label"
                    for="course_title"
                  >
                    Course Name <span className="required">*</span>{" "}
                  </label>
                  </div>
                </div>





              <div class="form-group  col-md-6 fl-left">
                 
                  <div class="" data-select2-id="94">
                    <select
                      style={{ position: "relative", zIndex: "1" }}
                      class="form-control select2 select2-hidden-accessible"
                      data-toggle="select2"
                      id="institution"
                      name="institution"
                      
                      data-select2-id="level"
                      tabindex="-1"
                      aria-hidden="true"
                       value={this.props.institution}
                     onChange={this.props.handleChange}
                    >


                      

                      <option>-- Institutions --</option>
                        {institutions &&
                          institutions.map((language, i) => {
                            return (
                              <option style={{fontSize:"16px"}} key={i} value={language.id}>
                                {language.name}
                              </option>
                            );
                          })}
                        

                    </select>

                     <label style={{display:"block"}} class="col-md-12 col-form-label" for="level">
                    Institution <span className="required">*</span>
                  </label>
                  </div>
                </div>




                <div className=" form-group col-md-6 fl-left">
                        <div className="col-md-10  fl-left">
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
                              style={{padding:"10px",width:"80px"}}

                            
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
                <br /> <br />
                <br />
                <br />
                <br />
                <br /> <br />
                <br />
                <br />
                <br />
                <br /> <br />
                <br />
                <br />
                <br />
                <br /> <br />
                <br />
                <br />
                <br />
                <br />

                
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
        <div className="tab-pane card-box" id="outcomes">
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
              </div>

              <div class="form-group  mb-3 col-md-6 fl-left">
                
                <div class="">
                  <select
                    class="form-control select2 select2-hidden-accessible"
                    data-toggle="select2"
                    name="course_language"
                    id="language_made_in"
                    data-select2-id="language_made_in"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option>-- Language --</option>
                        {languages.length > 0 &&
                          languages.map((language, i) => {
                            return (
                              <option key={i} value={language.id}>
                                {language.english}
                              </option>
                            );
                          })}
                  </select>
                  <label class="col-md-12 col-form-label" for="language_made_in">
                  Language made in
                </label>
                </div>
              </div>
              {/*<div className="form-group row mb-3">
                <label className="col-md-2 col-form-label" for="outcomes">
                  Requirements
                </label>
                <div className="col-md-10">
                  <div id="outcomes_area">
                    <div className="d-flex mt-2">
                      <div className="flex-grow-1 px-3">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="outcomes[]"
                            id="outcomes"
                            placeholder="Provide outcomes"
                          />
                        </div>
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          name="button"
                            onClick={this.handleAddShareholder}
                        >
                          {" "}
                          <i className="fa fa-plus"></i>{" "}
                        </button>
                      </div>
                    </div>
                    <div id="blank_outcome_field" style={{ display: "none" }}>
                      <div className="d-flex mt-2">
                        <div className="flex-grow-1 px-3">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="outcomes[]"
                              id="outcomes"
                              placeholder="Provide outcomes"
                            />
                          </div>
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            style={{ marginTop: "0px" }}
                            name="button"
                            onclick="removeOutcome(this)"
                          >
                            {" "}
                            <i className="fa fa-minus"></i>{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
  }

  render() {
    const {institutions, languages, instructors, courses } = this.props
 
    if (this.props.currentStep !== 2) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="tab-pane" id="requirements">
          <div className="row card-box">
            <div className="col-md-12">
              <div className="form-group col-md-6 fl-left">
               
                <div className="">
                  <input
                    type="date"
                    className="form-control"
                   
                    name="course_start_date_time"
                    placeholder="Enter course title"
                    required=""
                     value={this.props.course_start_date_time}
                     onChange={this.props.handleChange}
                  />

                   <label className="col-md-12 col-form-label" for="course_title">
                  Course Start Date <span className="required">*</span>{" "}
                </label>
                </div>
              </div>

              <div className="form-group col-md-6 fl-left">
                
                <div className="">
                  <input
                    type="date"
                    className="form-control"
                    id="course_title2"
                    name="course_end_date_time"
                    placeholder="Enter course title"
                    required=""
                     value={this.props.course_end_date_time}
                     onChange={this.props.handleChange}
                  />
                  <label className="col-md-12 col-form-label" for="course_title">
                  Course End Date <span className="required">*</span>{" "}
                </label>
                </div>
              </div>

              <div className="form-group col-md-6 fl-left">
               
                <div className="">
                  <input
                    type="date"
                    className="form-control"
                    id="course_title"
                    name="enrolment_start_date_time"
                    placeholder="Enter course title"
                    required=""
                    value={this.props.enrolment_start_date_time}
                     onChange={this.props.handleChange}
                  />
                   <label className="col-md-12 col-form-label" for="course_title">
                  Enrollments Start Date <span className="required">*</span>{" "}
                </label>
                </div>
              </div>

              <div className="form-group col-md-6 fl-left">
                
                <div className="">
                  <input
                    type="date"
                    className="form-control"
                    id="course_title2"
                    name="enrolment_end_date_time"
                    placeholder="Enter course title"
                    required=""
                    value={this.props.enrolment_end_date_time}
                     onChange={this.props.handleChange}
                  />
                  <label className="col-md-12 col-form-label" for="course_title">
                  Enrollments End Date/Time <span className="required">*</span>{" "}
                </label>
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
                    id="course_title2"
                    name="requirement_no_of_week"
                    placeholder="Enter course title"
                    required=""
                  />
                </div>
              </div>

              <div className="form-group col-md-12 fl-left">
                <label className="col-md-12 col-form-label" for="description">
                  Prerequisites
                </label>
                <div className="">
                  <textarea
                      name="prerequisite"
                      style={{ position: "relative", zIndex: "1" }}
                      className="form-control"
                      placeholder="Short description"
                       value={this.props.name}
                     onChange={this.props.handleChange}
                    ></textarea>
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
                    id="level"
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



                <div className="mb-3 mt-3">
                  <button
                    type="button"
                    className="btn btn-primary text-center"
                    onClick={(e) => {
                      e.preventDefault();
                      
                    }}
                  >
                    Save 
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

class Step4 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collaborators: [],

    };
  }





  render() {
    const { instructors } = this.props
    if (this.props.currentStep !== 5) {
      return null;
    }
    return (
      <React.Fragment>
        {" "}
        <div className="tab-pane" id="pricing">
          <div className="row card-box">
            <div className="col-md-12">
              




              <div className="mb-3 mt-3">
                  <button
                    type="button"
                    className="btn btn-primary text-center"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.saveAndContinue(e)
                    }}
                  >
                    Save 
                  </button>
                </div>

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}



const editSaveSection = (el) => {
  $(".miller_" + localStorage.getItem("tracker"))
    .find(".tits")
    .text($("#title_edit").val());
  $(".miller_" + localStorage.getItem("tracker"))
    .find(".pcs")
    .text($("#section_id_edit").val());
};

const editSaveSubSection = (el) => {
  $(".muu_" + localStorage.getItem("s_tracker"))
    .find(".title_sub")
    .text($("#title_edit_2").val());
  $(".muu_" + localStorage.getItem("s_tracker"))
    .find(".subsect")
    .text($("#section_id_edit_2").val());
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
        $(".change-title").html("I frame Title")
        $(".change-title2").html("Add a link to the resource page ( Website )")
        $(".change-description").html("Iframe Component")
        
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

    }else{

      //alert(TemplateType)
      allowedHeaders =  document.getElementById("myModalMarkdownEditor")
      allowedHeaders.setAttribute('data-basestation', ".dynamo_" + localStorage.getItem("l_tracker"))
      allowedHeaders.setAttribute("data-markdown", TemplateType)
      allowedHeaders.setAttribute("data-title",componentTitle)


    }

   
   
    
  }

  





  function handleModalInputFromUser(e) {
   //no use
   }


  if (props.currentStep !== 6) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="tab-pane" id="media">
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

              <ul id="js-parent" class="widow-window"></ul>
            
            <br />
            <br /> <br />
            <br />
            <br />
            <a
              style={{ marginRight: "10px" }}
              href="#myModal"
              role="button"
              data-toggle="modal"
              className="alignToTitle btn btn-outline-secondary btn-rounded btn-lg"
            >
              <i className=" mdi mdi-keyboard-backspace"></i>Add A New Section
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
                    <div class="form-group">
                      <label>Title</label>
                      <input type="text" class="form-control" id="title" />
                    </div>

                    <div class="form-group" >
                      <label>Section ID</label>
                      <input type="text" class="form-control" id="section_id" />
                    </div>

                    <div class="form-group">
                      <label>Overview</label>
                      <textarea name="overview"></textarea>
                    </div>
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
                    <div class="form-group">
                      <label>Title</label>
                      <input type="text" class="form-control" id="title_edit" />
                    </div>

                    <div class="form-group" style={{ display: "none" }}>
                      <label>Section ID</label>
                      <input
                        type="text"
                        class="form-control"
                        id="section_id_edit"
                      />
                    </div>

                    <div class="form-group">
                      <label>Overview</label>
                      <textarea placeholder="overview" name="overview" ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  onClick={editSaveSection}
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
                    <div class="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        class="form-control"
                        id="title_edit_2"
                      />
                    </div>

                    <div class="form-group" style={{ display: "none" }}>
                      <label>Section ID</label>
                      <input
                        type="text"
                        class="form-control"
                        id="section_id_edit_2"
                      />
                    </div>

                    <div class="form-group">
                      <label>Overview</label>
                      <textarea></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  onClick={editSaveSubSection}
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
                    <div class="form-group">
                      <label>Title</label>
                      <input type="text" class="form-control" id="title_2" />
                    </div>

                    <div class="form-group" >
                      <label>Sub Section ID</label>
                      <input
                        type="text"
                        class="form-control"
                        id="section_id_2"
                      />
                    </div>

                    <div class="form-group">
                      <label>Overview</label>
                      <textarea></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  onClick={addSubSectionContent}
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
                    <div class="form-group">
                      <label>Title</label>
                      <input type="text" class="form-control" id="title_3" />
                    </div>

                    <div class="form-group" style={{ display: "none" }}>
                      <label>Sub Section ID</label>
                      <input
                        type="text"
                        class="form-control"
                        id="section_id_3"
                      />
                    </div>

                    <div class="form-group">
                      <label>Overview</label>
                      <textarea></textarea>
                    </div>
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
            <div class="modal-toolbar">
              <h2 class="modal-title">Lessons Component</h2>
              <i id="pb-modal-close" class="fa fa-times"></i>
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
              <div class="modal-tab special-conference">
                <i class="tab-icon fa fa-video-camera fa-2x"></i> Teleconfrencing
              </div>
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
            <div class="modal-build-content special-conference">
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
                      <div class="form-group root-block">
                        <label class="change-title">Title</label>
                        <input type="text" class="form-control" id="title-unit" />
                      </div>


                      <div class="form-group root-block2" >
                        <label class="change-title2">Title 2</label>
                        <input onInput={(e) =>{
                            //if its iframe component
                            let board = document.querySelector("#projector-view")
                            if(document.querySelector(".iframe-box").style.display=="block"){
                              document.querySelector(".iframe-boxer").src= e.target.value
                              board.src= e.target.value
                            }else if(document.querySelector(".main-videosection2").style.display=="block"){
                               document.querySelector(".main-videosection-xx").src= e.target.value
                                board.src= e.target.value
                            }


                            //if its video component
                        }} type="text" class="form-control" id="title-unit2" />
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
                              <div class="editor-authoring" id="markdown-editor">
          <div class="authoring-edit-toolbar">
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
            <div class="line">
              
              <div class="box-internal">
                
              </div>
              
              <div class="box-internal">
                
              </div>
              
              <div class="box-internal">
                
              </div>
              
            </div>
          </div>
          <div class="content-area" id="input-output">
            <textarea id="input-area" class="visuell-view"  rows="30" cols="50">
                  Edit your content Editor 
                  (What you see is what you get)
      Add text content(plain text), 
          markupsand pure html code
      
  
             
            </textarea>
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
                      <div class="form-group root-block">
                        <label class="change-title">Title</label>
                        <input type="text" class="form-control" id="title-unit-b" />
                      </div>


                      <div class="form-group root-block2" >
                        <label class="change-title2">Title 2</label>
                        <input onInput={(e) =>{
                            //if its iframe component
                            if(document.querySelector(".iframe-box").style.display=="block"){
                              document.querySelector(".iframe-boxer2").src= e.target.value
                            }else if(document.querySelector(".main-videosection2").style.display=="block"){
                                document.querySelector(".main-videosection-xx").src= e.target.value
                            }


                            //if its video component
                        }} type="text" class="form-control" id="title-unit2-b" />
                      </div>


                      <div class="iframe-box2 col-md-12"  >
                       
                        <iframe id="" src="" class="col-md-12 iframe-boxer2" style={{width:"100%",border:"2px solid #000"}}/>
                      </div>


                      <div
                                        className=" main-videosection22 col-md-12"
                                        
                                      >
                                        <section
                                        >
                                          <div  class="embed-responsive embed-responsive-16by9">
  <iframe  class="embed-responsive-item main-videosection-xx2" src="" id="main-videosection-x"  allowscriptaccess="always" allow="autoplay"></iframe>
</div>
                                        </section>
                                      </div>


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
  // alert(el.dataset.id)
   $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.
     
  // $("#js-remove").on("click", function(){
  var count = $(".js-child").length;
  $("." + el.dataset.id).remove(); //addClass("removed"); // hide + remove last child
  //$("#js-count").text(count - 1); // update count
  //});
};

window.removeSubSection = (el) => {
   $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.
     
  var count = $(".js-child").length;
  $("." + el.dataset.id).remove(); //addClass("removed"); // hide + remove last child
};

window.editSection = (el) => {
   $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.
     
  // alert($("."+el.dataset.id).find(".tits").text())
  $("#title_edit").val(
    $("." + el.dataset.id)
      .find(".tits")
      .text()
  );
  $("#section_id_edit").val(
    $("." + el.dataset.id)
      .find(".pcs")
      .text()
  );
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
};

window.replicateSection = () => {
  var subchildren = $(".section-parent_" + localStorage.getItem("tracker"))
    .length;

  let target = "dynamic_section_" + localStorage.getItem("tracker");
  if (subchildren <= 0) {
    //alert("here"+ $("#js-parent").find("#"+target).parent().attr("class"))

    var $template = $("#js-parent")
      .find("#" + target)
      .clone(true);
    $("#js-parent").append($template);
  } else {
    var $template = $("#js-parent")
      .find("#" + target)
      .clone(true);

    // alert($("#js-parent").find("#"+target).parent().find(`tr.section-parent_${localStorage.getItem("tracker")}` ).length)
    $("#js-parent").append($template);
  }
};

window.replicateSubSection = (el) => {
  // var subchildren = $(".subsection-child_" + localStorage.getItem("s_tracker"))
  //   .length;
  // let target = $("."+ el.target.dataset.id)
  // let target2 = ("."+ target).clone(true)

  
  // var subchildren = $(".section-parent_" + localStorage.getItem("tracker"))
  //   .length;

  // target = "muu_" + localStorage.getItem("s_tracker");


  //      $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
  //     setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.

  //   // alert($("#js-parent").find("#"+target).parent().find(`tr.section-parent_${localStorage.getItem("tracker")}` ).length)
  //   $("#" + target)
  //     .append(target2);
  
};

window.exportSection = () => {
  try {
    $.fn.pop = [].pop;
    $.fn.shift = [].shift;
    var headers = [];
    var data = [];
    var $EXPORT = $("#export");

    var subchildren = $(".section-parent_" + localStorage.getItem("tracker"))
      .length;

    let target = "dynamic_section_" + localStorage.getItem("tracker");
    // if(subchildren<=0){
    // alert("here"+ $(".fold-table").find("#"+target).parent().attr("class"))

    var $rows = $(".fold-table").find("tr:not(.action)");
    // Get the headers (add special header logic here)
    $($rows.shift())
      .find("th:not(.action)")
      .each(function () {
        headers.push($(this).text().toLowerCase());
      });

    // Turn all existing rows into a loopable array
    $rows.each(function () {
      var $td = $(this).find("td:not(.action)");
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

let counter = 1;
const addSectionContent = () => {
  let mycounter = counter++;
  localStorage.setItem("sec_counter", mycounter);

  let templateData = `
 
  <li data-restriction="${
    "miller_" + mycounter
  }"    data-id="${
    "miller_" + mycounter
  }" id="dynamic_section_${mycounter}"  class=" root-li view tr-of-root opened col-md-12 ${
    "miller_" + mycounter
  } section-list" style=" margin-bottom:10px;">
   <a style="margin-right:10px;background:#fff;color:#000"
         
          data-id="${"miller_" + mycounter}"
          onclick="showSetSubsection(this);localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"
                
          >

           <span ><i class="fa fa-chevron-down "></i></span>
</a>
     
    
     <span class="tits section__name first-child-of-td" style="font-size:20px"> ${
       document.getElementById("title").value || "Section " + mycounter
     }</span>
      <span class="per action" style="float:right">
      <a style="margin-right:10px;background:#fff;color:#000"
                   href="#myModalSubsection" role="button" data-toggle="modal"
                   onclick="localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"
                  >
                
                    <i class="fa fa-plus "></i>
        </a>

        <a style="margin-right:10px;background:#fff;color:#000"
            href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${"miller_" + mycounter}"
            onclick="editSection(this);localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"       
          >
                
          <i class="fa fa-edit "></i>
        </a>


        <a style="margin-right:10px;background:#fff;color:#000"
          
          data-id="${"miller_" + mycounter}"
           onclick="removeSection(this)"        
          >
                
          <i class="fa fa-trash "></i>
        </a>

        

         <a class="drag-handle" style="margin-right:10px;background:#fff;color:#000"
                        
          >
         <i class="fa fa-arrows "></i>
        </a>

       

        
         <a class="dropright dropright "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
                <i class="fa fa-ellipsis-v " style="color:#000"></i>
             
        <ul class="dropdown-menu" style="margin-left:40px" >
                <li><a class="dropdown-item" href="#myModalSubsection" role="button" 
                data-toggle="modal"
                data-id="${"miller_" + mycounter}"
                   onclick="localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"
                  >Add Sub Section</a></li>

                  

                <li><a class="dropdown-item"   href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${"miller_" + mycounter}"
            onclick="editSection(this);localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"       
          >Edit </a></li>
                <li><a class="dropdown-item" 
                 data-id="${"miller_" + mycounter}"
                onclick="replicateSection(this);localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"

                >Replicate Section</a></li>
                <li><a class="dropdown-item" href="#noclick" >Import </a></li>
                <li><a class="dropdown-item" 
                href="#myModalExport" role="button" data-toggle="modal"
          data-id="${
            "miller_" + mycounter
          }" onclick="exportSection();localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});" >Export </a></li>
                <li><a class="dropdown-item" href="#noclick" onclick="alert('published to live course')" >Publish </a></li>
                
             
           </ul>
         </a>

          <a style="margin-right:10px;background:#fff;color:#000"
        
          data-id="${"miller_" + mycounter}"
          onclick="showSetSubsection(this);localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"
                
          >

           <span ><i class="fa fa-chevron-down "></i></span>
</a>
          
          
              
        </span>
</li>

    `;

  // mockup variables for some randomness
  var heightValue = Math.random() * 10;
  // var count = $(".section-parent").length;
  var childrenHeight;
  // var newChild = $("<div class='child-table js-child'>").html(templateData );
     $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" ></div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.

  // $("#js-count").text(count +1);  // set child text
  $("#js-parent").append(templateData); // spawn child to DOM
  // });

  //FOR DRAGABLE EFFECT
  //FOR DRAGABLE EFFECT

  /*
  *@description: subsection drag event handler
  @rules0: move root section positions
  *@rules1: cant move subsection to root section that did not create the subsection
  *@rules2: cant move lessons to root subsections that did not create the lesson
  *@rules3: cant move components to root lessons that do not create the component
  */

  var children = $("#js-parent").children.length;

  //  $("#js-parent").sortable({
  //     connectWith: "li",
  //     placeholder: "placeholder",
  //     delay: 150
  //   })
  //   .disableSelection()
  //   .dblclick( function(e){
  //     var item = e.target;
  //     /*No restrictions needed on root navigation*/
  //     if (e.currentTarget.id === 'js-parent'){
  //       //move from all to user
  //       $(item).fadeOut('fast', function() {
  //         // $(item).appendTo($('#some-other-staging')).fadeIn('slow');
          
  //         // $(item).appendTo( $("#js-parent") ).fadeIn('slow');
  //         $(item).appendTo($(item).parent()).fadeIn('slow');
          
  //       });
  //      }

      
  // })

  // $("#js-parent").sortable({
  //     connectWith: "ul",
  //     placeholder: "placeholder",
  //     delay: 150
  //   })


 
  //   .disableSelection()
  //   // .dblclick( function(e){
  //   //   var item = e.target;
  //   //   if (e.currentTarget.id  && $(e.currentTarget).hasClass("root-li")) {
  //   //     //move from all to user
  //   //     $(item).fadeOut('fast', function() {
  //   //       // $(item).appendTo($('#userFacets')).fadeIn('slow');
          
  //   //       // $(item).appendTo($('#allFacets')).fadeIn('slow');
          
  //   //       $(item).appendTo($(item).parent()).fadeIn('slow');
          
          
          
          
  //   //     });
  //   //   } else {
  //   //     //move from user to all
  //   //     $(item).fadeOut('fast', function() {
  //   //       // $(item).appendTo($('#allFacets')).fadeIn('slow');
          
  //   //       // $(item).appendTo($('#userFacets')).fadeIn('slow');
          
  //   //       $(item).appendTo($(item).parent()).fadeIn('slow');
          
  //   //     });
  //   //   }
  //   // });


   

  //  // $(".root-li").sortable({
  //  //    connectWith: "ul",
  //  //    placeholder: "placeholder",
  //  //    delay: 150
  //  //  })
  //  //  .disableSelection()
  //  //  .dblclick( function(e){
  //  //    var item = e.target;

  //  //    // if (e.currentTarget.dataset.id === e.target.dataset.restriction && $(e.currentTarget).hasClass("root-li")) {
  //  //    //   //move from all to user
  //  //    //   $(item).fadeOut('fast', function() {
  //  //    //     // $(item).appendTo($('#some-other-staging')).fadeIn('slow');
  //  //    //     // .appendTo( $(item).parent("ul:not('#js-parent')"))
  //  //    //     $(item).appendTo( $("li:not('#js-parent')")  ).fadeIn('slow');
          
  //  //    //   });
  //  //    //  }
      
      
  //  //  });


  if (children > 0) {
    /*sort the main sections that holds all subsection*/
    /*can only move along root section or can only be replaced along root sections*/
    if (document.getElementById("js-parent")) {
      var el = document.getElementById("js-parent");
      var sortableSections = Sortable.create(el, {
        group: "sections",
        handle: ".drag-handle",
      });
    }
    
    /*sort sections subheader components*/
    /*can only move along sub section component and no where else*/
    if (document.querySelectorAll(".root-li")) {
      var children = $(".root-li").children.length;
      // alert(children)
      var subsectionGroups = document.querySelectorAll(".root-li");
      subsectionGroups.forEach(function (ele) {
        Sortable.create(ele, {
          group: "columns",
          handle: ".drag-handle-list",
        });
      });
    }





    


  }
};

let muu_count = 0;
let section_counter = 0.1;
const addSubSectionContent = (el) => {
  let muu_counter = muu_count++;
  let gen_sec_id =
    parseInt(localStorage.getItem("sec_counter")) + section_counter;
  localStorage.setItem("sec_counter", gen_sec_id);

  // onDragEnter="dragEnter( event )" onDragOver="dragOver( event )" 
  // onDragLeave="dragLeave( event )" onDrop="dragDrop( event )"
   const template = `
         <ul 
         

         id="dynamic_subsection_${muu_counter}"  data-id="${
    "muu_" + muu_counter
  }" class="fold drop-zone-section root-sub-ul centerSubsection column-list-section-parade ${
    "muu_" + muu_counter
  } col-md-10 section-parent_${localStorage.getItem(
    "tracker"
  )} subsection-child_${localStorage.getItem(
    "s_tracker"
  )} " style="min-width:99%;width:99%;border-bottom:none;border-top:none;margin-left:10px"

ondragenter="return dragEnterIntoSection(event)" 
         ondrop="return dragDropLessonComponentToSubSection(event)" 
         ondragover="return dragOverSection(event)"  
         ondragleave="return dragLeaveLessonIntoSubsection(event)" 
  >
            
              <span class=""  style="height:60px;border-left:3px solid black;margin-top:10px">
               <span class="title_sub " data-th="Company name" style="font-size:15px">${
                 $("#title_2").val() || "Subsection"
               }</span>
                <span class="subsect" data-th="Customer no"></span>
                <span data-th="Customer name"></span>
                <span class="action" data-th="Customer nam"  style="float:right">



        <a style="margin-right:10px;background:#fff;color:#000"
            href="#myModalSubSectionEdit" role="button" data-toggle="modal"
          data-id="${"muu_" + muu_counter}"
            onclick="editSubSection(this);localStorage.setItem('given_sid','dynamic_subsection_'+${muu_counter});localStorage.setItem('s_tracker',${muu_counter});"       
          >
                
          <i class="fa fa-edit "></i>
        </a>


        <a style="margin-right:10px;background:#fff;color:#000"
          
          data-id="${"muu_" + muu_counter}"
           onclick="removeSubSection(this)"        
          >
                
          <i class="fa fa-trash "></i>
        </a>


         <a  class="drag-handle-list" style="margin-right:10px;background:#fff;color:#000"
          
         
                 
          >

         <i class="fa fa-arrows "></i>
        </a>





         <a class="dropright dropright "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
                <i class="fa fa-ellipsis-v " style="color:#000"></i>
             
        <ul class="dropdown-menu" style="margin-left:40px" >

 

                

                <li><a class="dropdown-item"    href="#myModalSubSectionEdit" role="button" data-toggle="modal"
          data-id="${"muu_" + muu_counter}"
            onclick="editSubSection(this);localStorage.setItem('given_sid','dynamic_subsection_'+${muu_counter});localStorage.setItem('s_tracker',${muu_counter});"       
          >Edit </a></li>



                <li><a class="dropdown-item"   href="#myModalLesson" role="button" data-toggle="modal"
          data-id="${"muu_" + muu_counter}"
            onclick="addlessonSection(this);localStorage.setItem('given_sid','dynamic_subsection_'+${muu_counter});localStorage.setItem('s_tracker',${muu_counter});"       
          >Add Lesson</a></li>


                <li><a class="dropdown-item" 
                 data-id="${"muu_" + muu_counter}"
                onclick="replicateSubSection(this);localStorage.setItem('given_sid','dynamic_subsection_'+${muu_counter});localStorage.setItem('s_tracker',${muu_counter});"

                >Replicate Section</a></li>
                
                <li><a class="dropdown-item" href="#noclick"  data-id="${
                  "muu_" + muu_counter
                }"
           onclick="removeSubSection(this)" >Delete</a></li>
           </ul>
         </a>
         



                </span>

      </li>
    </ul>
  
       
      
   
`;

  var newChild = $("<div class='child-table js-child'>").html(template);
  var subchildren = $(".section-parent_" + localStorage.getItem("tracker"))
    .length;

  let target = "dynamic_section_" + localStorage.getItem("tracker");
  if (subchildren <= 0) {
    // alert("here"+ $("#js-parent").find("#"+target).parent().attr("class"))
       $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.

    $("#js-parent")
      .find("#" + target)
      .append(template);
  } else {
       $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.

    // alert($("#js-parent").find("#"+target).parent().find(`tr.section-parent_${localStorage.getItem("tracker")}` ).length)
    $("#js-parent")
      .find("#" + target)
      .append(template);
  }




  


};

class Step6 extends React.Component {
  render() {
    if (this.props.currentStep !== 4) {
      return null;
    }
    return (
      <React.Fragment>
        {" "}
        <div className="tab-pane" id="seo">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="form-group row mb-3">
                <label
                  className="col-md-2 col-form-label"
                  for="website_keywords"
                >
                  Add Field Name
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control bootstrap-tag-input"
                    id="meta_keywords"
                    name="meta_keywords"
                    data-role="tagsinput"
                    style={{ width: "100%", display: "none" }}
                    placeholder="Write a keyword and then press enter button"
                  />
                  <div className="bootstrap-tagsinput">
                    <input
                      size="43"
                      type="text"
                      placeholder="Write a keyword and then press enter button"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="form-group row mb-3"></div>
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
      children +=
        "<tr><td>" +
        input.files.item(i).name +
        '<span class="remove-list" onclick="return this.parentNode.remove()">X</span>' +
        "</td></tr>";
    }
    output.innerHTML = children;
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

                <div class="divbox">
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input-style"
                      id="file"
                      multiple
                      onChange={this.updateList}
                    />
                    <label class="custom-file-label" for="file">
                      <img
                        width="30"
                        src="https://image.flaticon.com/icons/svg/54/54565.svg"
                      />{" "}
                      Upload Files
                    </label>
                  </div>
                </div>

                <table>
                  <th>File Name</th>
                  <th>image url</th>
                  <th>preview</th>
                  <th>Action</th>
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
