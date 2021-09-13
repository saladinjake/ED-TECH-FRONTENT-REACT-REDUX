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

import { getLanguages } from "services/language";
import axios from "axios"
import swal from "sweetalert"
import TinyMyceRender from './tinymyce-plugin';





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
  getSectionsOfCourseId
  

 
} from "services/authoring"


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


  
  let lessonRes = createAnyResource('POST',url,form) 
  //save to db
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



       



const  handleSaveComponentTextEditor =(e) => {
    let randId = uuid()
     let Target = $(".dynamo_" + localStorage.getItem("l_tracker")); //localStorage.getItem('ls_tracker');
    
    let allowedHeaders =  document.getElementById("myModalMarkdownEditor")
    let T = allowedHeaders.getAttribute('data-basestation')
    let markdownTemplate =  allowedHeaders.getAttribute("data-markdown")
    let _title =  allowedHeaders.getAttribute("data-title")
    let url = allowedHeaders.getAttribute("data-url")

        
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
      
     let res = createLessonComponent(url,$("#myModalMarkdownEditor-SELECT"))

      markupBoard.innerHTML =markdownTemplate
      $(".visuell-view").html(getTemplateType(markdownTemplate))
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
      
        name: "",
        code: "",
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
        institution: "",   //keypair preporpulated set of inst id
        author: "",  //keypair preporpulated set of author id
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
    this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

   /*navigation skipper*/

  goToStep(e, step) {
    e.preventDefault();
    e.target.parentElement.style.border = "1px solid #eee";
    e.target.parentElement.style.padding = "2px";
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
    // if (Object.keys(this.state.formErrors).includes(field_name)) {
    //   const fieldValidationErrors = this.state.formErrors;
    //   const validity = this.state.formValidity;
    //   const isCourseCode = field_name === "code";
    //   const isDescription = field_name === "description";
    
    //   validity[field_name] = value.length > 0;
    //   fieldValidationErrors[field_name] = validity[field_name]
    //     ? ""
    //     : ` is required and cannot be empty`;

    //   if (validity[field_name]) {
    //     if (isCourseCode) {
    //       validity[field_name] = value.length >= 5;
    //       fieldValidationErrors[field_name] = validity[field_name]
    //         ? ""
    //         : `${label} should be at least 6-12 characters or more`;
    //     }
    //     if (isDescription) {
    //       validity[field_name] = emailTest.test(value);
    //       fieldValidationErrors[field_name] = validity[field_name]
    //         ? ""
    //         : `${label} should be at least 20 characters long`;
    //     }
    //     if (isPasswordConfirmation) {
    //       validity[field_name] = value === this.state.password;
    //       fieldValidationErrors[field_name] = validity[field_name]
    //         ? ""
    //         : `${label} should match password`;
    //     }
    //   }

    //   this.setState(
    //     {
    //       formErrors: fieldValidationErrors,
    //       formValidity: validity,
    //     },
    //     () => this.canSubmit()
    //   );
    // }
  }

  canSubmit() {
    this.setState({
      canSubmit:
        //RELAX VALIDATION OF INPUT FOR FLEXIBILITY ON THE USER END NOT TO ENTER ALL DATA
        //THIS FEATURE COULD CHANGE IN THE FUTURE

        this.state.formValidity.name &&
        this.state.formValidity.code   
        //&&
        // this.state.formValidity.run &&
        // this.state.formValidity.card_image &&
        // this.state.formValidity.intro_video &&
        // this.state.formValidity.description &&
        // this.state.formValidity.overview &&
        // this.state.formValidity.learning_expectation &&
        // this.state.formValidity.curriculum &&
        // this.state.formValidity.level &&  //int
        // this.state.formValidity.enrolment_type &&
        // this.state.formValidity.entrance_exam_required && 
        // this.state.formValidity.cost &&
        // this.state.formValidity.auditing &&
        // this.state.formValidity.course_pacing &&
        // this.state.formValidity.course_start_date_time &&  //2021-08-26T17:13:00+01:00
        // this.state.formValidity.course_end_date_time &&
        // this.state.formValidity.enrolment_start_date_time &&
        // this.state.formValidity.enrolment_end_date_time &&
        // this.state.formValidity.course_language &&
        // this.state.formValidity.requirement_hours_per_week && 
        // this.state.formValidity.requirement_no_of_week && 
        // this.state.formValidity.grace_period_after_deadline &&
        // this.state.formValidity.publication_status && 
        // this.state.formValidity.institution && 
        // this.state.formValidity.author && 
        // this.state.formValidity.prerequisite &&
        // this.state.formValidity.authoring_team
      
        
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
     let T = new  TinyMyceRender();
     T.render("")
    //handle generic events
   //description overview learning_expectation curriculum prerequisite input-area2
   //  T.render("description")
   //  T.render("overview")
   //  T.render("learning_expectation")
   //  T.render("curriculum")
   //  T.render("prerequisite")
   //  T.render("input-area2")
   // T.render("input-area")
    // editor.render("")
    // editor.render("")
   


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
    for(var k in a){
      //check if name is part of a dropdown then select the dropdown or make it checked
      if($('select[name="'+k+'"]')){
      
         $('select[name="'+k+'"]').attr('selected', $(this).text() == a[k]);
      }


      if($('textarea[name="'+k+'"]')){
      
         $('textarea[name="'+k+'"]').val(a[k]);
      }




      if($('[name="'+k+'"]')){
        console.log(a[k])
        $('[name="'+k+'"]').val(a[k]);
       }
    }
 }

 fetchContent = async () => {
   let instId = this.state.institution
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


  saveOrUpdateData =  ( type, mode="EDIT_MODE", url, data) => {
    //after api call to update or create
    switch(mode){
      
      case "EDIT_MODE": // called subsequently
        //call the update handler to api
        let updateCourseRes = createAnyResource("PATCH",url, data)
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
  saveAndContinue = (e) =>{
     const {currentCourseId } = this.state;
     let curr = this.state.currentStep;
     /*Our default url  assumes an update method because much work would be left incomplete during course creation*/
     let url=  `/lms/api/update/course/${currentCourseId}/`  //
     let step = parseInt(curr)
    // alert(step)
    //switch on the step action
    switch(step){
       case 1:
       case 2:
       case 3:
       case 4:
       case 5:
       case 6:
           //url will be an update method if the resource exists
          this.saveOrUpdateData("edit",'EDIT_MODE', url, $("form#stepUpFormWithAI2") )
          break;
       case 7:
        // URL WILL CHANGE TO SECTIONS/ SUBSECTIONS AND LESSONS based onaddition and positioning
        // update all fields here
         // url ="/lms/api/create/section/"
         this.saveOrUpdateData("edit", 'EDIT_MODE',url, $("form#stepUpFormWithAI2") )
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

        <div className="row" id="container-fullscreen" style={{margin:"10px"}}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body" >
                <div id="make-fixed-on-fullscreen">
                  <h4 className="header-title mb-3">
                    Course adding form{" "}
                    <a
                      href={process.env.PUBLIC_URL + "/authoring/courselist"}
                      className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> Back to
                      course list
                    </a>
                    <a
                      style={{ marginRight: "10px" }}
                      href="#no-grid"
                      onClick={this.togglerFullscreen}
                      id="toggle_fullscreen"
                      className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"
                    >
                      {" "}
                      <i className=" mdi mdi-keyboard-backspace"></i> Toggle
                      Fullscreen
                    </a>
                    <br />
                  </h4>
                  <br />

                  <div className="col-md-12">
                    <ul
                      className="nav nav-pills nav-justified form-wizard-header mb-3"
                      style={{ background: "#f6f6f6", height: "45px" }}
                    >
                      <a
                        onClick={(e) => {
                          this.goToStep(e, 1);
                        }}
                        href="#basic"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2 "
                      >
                        <i className="fa fa-pen mr-1"></i>
                        <span className="d-none d-sm-inline">Basic</span>
                      </a>

                      <a
                        onClick={(e) => {
                          this.goToStep(e, 2);
                        }}
                        href="#outcomes"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2"
                      >
                        <i className="fa fa-camera mr-1"></i>
                        <span className="d-none d-sm-inline">Schedules</span>
                      </a>

                      <a
                        onClick={(e) => {
                          this.goToStep(e, 3);
                        }}
                        href="#requirements"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2"
                      >
                        <i className="fa fa-bell mr-1"></i>
                        <span className="d-none d-sm-inline">Grading</span>
                      </a>

                      {/*<li
                        id="list-nav-gate-6"
                       style={{border:"1px solid #eee",padding:"2px"}}
                          className="nav-item"
                          
                        >*/}
                      <a
                        onClick={(e) => {
                          this.goToStep(e, 4);
                        }}
                        href="#seo"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2"
                      >
                        <i className="fa fa-tag mr-1"></i>
                        <span className="d-none d-sm-inline">
                          Learners Group
                        </span>
                      </a>
                      {/*</li>*/}

                      <a
                        onClick={(e) => {
                          this.goToStep(e, 5);
                        }}
                        href="#pricing"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2"
                      >
                        <i className="fa fa-currency mr-1"></i>
                        <span className="d-none d-sm-inline">
                          Authoring Team
                        </span>
                      </a>

                      <a
                        onClick={(e) => {
                          this.goToStep(e, 8);
                        }}
                        href="#resource"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2"
                      >
                        <i className="fa fa-currency mr-1"></i>
                        <span className="d-none d-sm-inline">Resource</span>
                      </a>

                      <a
                        onClick={(e) => {
                          this.goToStep(e, 6);
                        }}
                        href="#media"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2"
                      >
                        <i className="fa fa-video mr-1"></i>
                        <span className="d-none d-sm-inline">Content</span>
                      </a>

                      <a
                        onClick={(e) => {
                          this.goToStep(e, 7);
                        }}
                        href="#finish"
                        data-toggle="tab"
                        className="nav-link rounded-0 pt-2 pb-2"
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
                      id="stepUpFormWithAI2"
                      className="required-form"
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
                        handleChange={this.handleChange}
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
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                      />

                      <Step4
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                      />

                      <Step2
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
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
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                      />

                      <Step6
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                      />
                      <Step7
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                      />

                      <Step8
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                        institutions={institutions} 
                        languages={languages}
                        instructors={instructors} 
                        courses={courses}
                        saveAndContinue={this.saveAndContinue}
                      />

                      <br />
                      <br />
                    </form>



                     <div class="notifier" id="notifier">
                          <div class="success-notification">
                             {/*success message*/}

                          </div>

                          <div class="error-notification">
                              {/*error message*/}
                              Could not perform operation
                          </div>
                     </div>


                    <br />
                    <br />
                    <div style={{ position: "absolute", bottom: "0px" }}>
                      <ul className="list-inline mb-0 wizard text-center">
                        {this.previousButton}

                        {this.nextButton}
                      </ul>
                    </div>
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



    this.state ={
      
    }

    this.dropRef = createRef()
  }


  





  
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    const {institutions, languages, instructors, courses } = this.props
    console.log(institutions)

    return (
      <React.Fragment>
        <div className="tab-content b-0 mb-0">
          <div className="tab-pane active" id="basic">
            <div className="row">
              <div className="col-md-12 card-box">


                                <div className="form-group col-md-6 fl-left">
                  
                  <div className="">
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="text"
                      className="form-control"
                      id="course_code"
                      name="code"
                      placeholder="Enter course code"
                      value={this.props.code}
                     onChange={this.props.handleChange}
                    />
                    <label
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
                      value="097cd2bb-ae72-48e4-9a4d-1ebd2c05be03"
                     
                    />
                  </div>
                   </div>

                <div className="form-group col-md-6 fl-left">
                 
                  <div className="">
                    <input
                      style={{ position: "relative", zIndex: "1", marginTop:"-10px" }}
                      type="text"
                      className="form-control"
                      id="course_name"
                      name="name"
                      placeholder="Enter course title"

                      value={this.props.course_name}
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



                
                <div className="form-group col-md-6 fl-left">
                 
                  <div className="">
                    <textarea
                      name="description"
                      style={{ position: "relative", zIndex: "1" }}
                      className="form-control"
                      placeholder="Short description"
                       value={this.props.description}
                     onChange={this.props.handleChange}
                    ></textarea>

                     <label
                    className="col-md-12 col-form-label"
                    for="short_description"
                  >
                    Course Short description
                  </label>
                  </div>
                </div>



                <div className="form-group col-md-6 fl-left">
                 
                  <div className="">
                    <textarea
                      name="overview"
                      style={{ position: "relative", zIndex: "1" }}
                      className="form-control"
                      placeholder="Short description"
                       value={this.props.overview}
                     onChange={this.props.handleChange}
                    ></textarea>

                     <label
                    className="col-md-12 col-form-label"
                    for="short_description"
                  >
                    Course Overview
                  </label>
                  </div>
                </div>



                 <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="description">
                    Curriculum
                  </label>
                  <div className="">
                    <textarea
                      name="curriculum"
                      style={{ position: "relative", zIndex: "1" }}
                      className="form-control"
                      placeholder="Short description"
                       value={this.props.curriculum}
                     onChange={this.props.handleChange}
                    ></textarea>
                  </div>
                </div>


                <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="description">
                    What You Will Learn
                  </label>
                  <div className="">
                    <textarea
                      name="learning_expectation"
                      style={{ position: "relative", zIndex: "1" }}
                      className="form-control"
                      placeholder="Short description"
                       value={this.props.learning_expectation}
                     onChange={this.props.handleChange}
                    ></textarea>
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
                              <option key={i} value={language.id}>
                                {language.name}
                              </option>
                            );
                          })}
                        

                    </select>

                     <label class="col-md-12 col-form-label" for="level">
                    Institution
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
                      name="level"
                      id="level"
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
                      id="level"
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




                <div class="form-group  mb-3 col-md-6 fl-left">
                 
                  <div class="co" data-select2-id="94">
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="checkbox"
                      className="form-control"
                      id="course_title2"
                      name="auditing"
                      
                       value={this.props.intro_video}
                     onChange={this.props.handleChange}
                    />

                     <label class="col-md-12 col-form-label" for="level">
                    Auditing
                  </label>
                  </div>
                </div>

                <div className="form-group col-md-6 fl-left">
                  
                  <div className="">
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="text"
                      className="form-control"
                      id="course_title2"
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














                <h2>Card Image</h2>

                    <div class="file-drop-area col-md-6" style={{background: "#f5f5f5",
  padding: "40px 0 20px 0", margin:"20px"}}>
                      <span class="fake-btn">Choose files</span>
                      <span class="file-msg"></span>
                      <input name="card_image" class="file-input" type="file" multiple   accept="image/*"
                               value={this.props.card_image}
                               onChange={this.props.handleChange} />

                                 <div id="feedback" style={{display:"none"}}>
    
  </div>
  
  <label  id="progress-label" for="progress" style={{display:"none"}}></label>
  <progress id="progress" value="0" max="100" style={{display:"none"}}> </progress>
                    </div>

                    

                




                


                






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
                </div>

                <br />
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
                  id="prerequisite"
                      name="prerequisite"
                      style={{ position: "relative", zIndex: "1",height:"300px" }}
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
              

              <div className="row">
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
                      <textarea name="description" class="form-control" style={{height:"300px"}}></textarea>
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
                      <Editor placeholder="overview" />
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
                      <Editor placeholder="overview" />
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
                    </form>
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

          <form id="myModalMarkdownEditor-SELECT" enctype="application/x-www-form-urlencoded">


          <div class="form-group root-block">
                        <label class="change-title" >Name</label>
                        <input type="text" class="form-control" id="editor-html-name" name="name"/>
                      </div>


                      <div class="form-group root-block" >
                        
                        <input type="hidden" name="lesson" class="form-control" id="lesson-editor-id"  />
                      </div>


                      <div class="form-group root-block">
                        <label class="change-title">Description</label>
                        <input type="text" name="description" class="form-control" id="editor-html-description" />
                      </div>

                      <div class="form-group root-block">
                        <label class="change-title">Component Type </label>
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

            <textarea id="input-area" class="visuell-view" name="html_text"  rows="30" cols="50">
                  Edit your content Editor 
                  (What you see is what you get)
      Add text content(plain text), 
          markupsand pure html code
  
            </textarea>


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


//handle state positioning

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
