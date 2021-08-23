import React, { Fragment, useEffect } from "react";
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
// Change JQueryUI plugin names to fix name collision with Bootstrap.
$.widget.bridge('uitooltip', $.ui.tooltip);
$.widget.bridge('uibutton', $.ui.button);

//import other jquery plugins
//import bridget like this import jqueryBridget from "jquery-bridget"
//hook other plugins to jquery using bridget like this in the future
//jqueryBridget( 'plugin-designated-name', ImportedPlugin, $ );






// if  prevent enter key when modal is shown
      // $("body").keyup(function (e) {
      //   // ESC key maps to keycode `27`
      //   if (e.keyCode == 27) {
     //        e.preventDefault()
       //      return false;
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
             //alert(e.target)

              // if(e.target.dataset.template=="[pb_html][/pb_text]"){

                           // alert("not working as expecte")
                                /*just extracts and replace contents detail on edit*/
                                
                  const extracts = $("#" + MainClone.getAttribute("id")).find(".unit_content_place_holder").html();
                  const editBoard = document.getElementById("myModalMarkdownEditorEditMode").querySelector(".visuell-view2");
                  editBoard.innerHTML = extracts;
                  const markupBoard = document.getElementById("markup-template-content")
                  markupBoard.innerHTML =markdownTemplate


                  // document.getElementById("edit-title").setAttribute("data-parent", MainClone.id)


                                


              // }

        })

        MainClone.querySelector(".fa-trash").addEventListener("click", (e) => {
             handleWidgetRemove(e.target)
        })




          MainClone.querySelector(".unit_title_place_holder").innerHTML= _title   //no title initially for this comonent
          MainClone.querySelector(".unit_content_place_holder").innerHTML =   getTemplateType(markdownTemplate)           //$(".visuell-view").html() || "Edit this content"
          const markupBoard = document.getElementById("markup-template-content")
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
        let targetBase =  document.getElementById("edit-title").getAttribute("data-parent")
       // alert(targetBase)
        $("#"+targetBase).find(".unit_title_place_holder-generic").html($("#title-unit-b").val())  //add validation for unit component
        $("#"+targetBase).find(".unit_content_place_holder-generic").html($("#title-unit2-b").val()) 
         $("#projector-view").attr("src",$("#title-unit2-b").val())        
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
      currentStep: 1,
      sectionStep: 1,
      subSectionStep: 1,
      lessonStep: 1,
      finishedClicked: false,
      email: "",
      username: "",
      password: "",
      comment: "",
      passwordConfirmation: "",
      formErrors: {
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
      },
      formValidity: {
        email: false,
        username: false,
        password: false,
        passwordConfirmation: false,
      },
      canSubmit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  goToStep(e, step) {
    e.preventDefault();
    e.target.parentElement.style.border = "1px solid #eee";
    e.target.parentElement.style.padding = "2px";
    this.setState({
      currentStep: step,
    });
  }

  _next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 7 ? 8 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      function () {
        this.validateField(name, value);
      }
    );
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

  validateField(name, value) {
    if (Object.keys(this.state.formErrors).includes(name)) {
      const fieldValidationErrors = this.state.formErrors;
      const validity = this.state.formValidity;
      const isEmail = name === "email";
      const isPassword = name === "password";
      const isPasswordConfirmation = name === "passwordConfirmation";
      const label =
        name === "passwordConfirmation" ? "password confirmation" : name;
      const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      validity[name] = value.length > 0;
      fieldValidationErrors[name] = validity[name]
        ? ""
        : `${label} is required and cannot be empty`;

      if (validity[name]) {
        if (isPassword) {
          validity[name] = value.length >= 5;
          fieldValidationErrors[name] = validity[name]
            ? ""
            : `${label} should be 5 characters or more`;
        }
        if (isEmail) {
          validity[name] = emailTest.test(value);
          fieldValidationErrors[name] = validity[name]
            ? ""
            : `${label} should be a valid email address`;
        }
        if (isPasswordConfirmation) {
          validity[name] = value === this.state.password;
          fieldValidationErrors[name] = validity[name]
            ? ""
            : `${label} should match password`;
        }
      }

      this.setState(
        {
          formErrors: fieldValidationErrors,
          formValidity: validity,
        },
        () => this.canSubmit()
      );
    }
  }

  canSubmit() {
    this.setState({
      canSubmit:
        this.state.formValidity.email &&
        this.state.formValidity.username &&
        this.state.formValidity.password &&
        this.state.formValidity.passwordConfirmation,
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "is-invalid";
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, username, password } = this.state;
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`);
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

  render() {
    return (
      <Fragment>
        <AddHead />

        <div className="row" id="container-fullscreen">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
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
                      className="required-form"
                      
                      enctype="multipart/form-data"
                    >
                      <Step1
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        errorEmailClass={this.errorClass(
                          this.state.formErrors.email
                        )}
                        email={this.state.email}
                        errorEmail={this.state.formErrors.email}
                        errorUsernameClass={this.errorClass(
                          this.state.formErrors.username
                        )}
                        username={this.state.username}
                        errorUsername={this.state.formErrors.username}
                      />

                      <Step3
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                      />

                      <Step4
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
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
                      />

                      <Step5
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                      />

                      <Step6
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                      />
                      <Step7
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                      />

                      <Step8
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                      />

                      <br />
                      <br />
                    </form>


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
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="tab-content b-0 mb-0">
          <div className="tab-pane active" id="basic">
            <div className="row">
              <div className="col-md-12 card-box">
                <div className="form-group col-md-6 fl-left">
                  <label
                    className="col-md-12 col-form-label"
                    for="course_title"
                  >
                    Course Code <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="text"
                      className="form-control"
                      id="course_title"
                      name="title"
                      placeholder="Enter course title"
                    />
                  </div>
                </div>

                <div className="form-group col-md-6 fl-left">
                  <label
                    className="col-md-12 col-form-label"
                    for="course_title"
                  >
                    Course Name <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="text"
                      className="form-control"
                      id="course_title2"
                      name="title"
                      placeholder="Enter course title"
                    />
                  </div>
                </div>

                <div class="form-group  col-md-6 fl-left">
                  <label class="col-md-12 col-form-label" for="level">
                    Institution
                  </label>
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
                    >
                      <option value="beginner" data-select2-id="4">
                        Questence
                      </option>
                      <option value="advanced" data-select2-id="95">
                        ABU-Zaria
                      </option>
                      <option value="intermediate" data-select2-id="96">
                        UNILAG
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-group col-md-6 fl-left">
                  <label
                    className="col-md-12 col-form-label"
                    for="short_description"
                  >
                    Course Short description
                  </label>
                  <div className="">
                    <textarea
                      style={{ position: "relative", zIndex: "1" }}
                      className="form-control"
                      placeholder="Short description"
                    ></textarea>
                  </div>
                </div>

                <div className=" col-md-12 ">
                  <label
                    className="col-md-12 col-form-label"
                    for="short_description"
                  >
                    Course Overview
                  </label>
                  <div className="">
                    <Editor placeholder="course overview" />
                  </div>
                </div>

                <div className=" col-md-12">
                  <label className="col-md-12 col-form-label" for="description">
                    What You Will Learn
                  </label>
                  <div className="">
                    <Editor placeholder="What you will learn" />
                  </div>
                </div>

                <div class="form-group  mb-3 col-md-6 fl-left">
                  <label class="col-md-12 col-form-label" for="level">
                    Level
                  </label>
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
                    >
                      <option value="beginner" data-select2-id="4">
                        Introductory
                      </option>
                      <option value="advanced" data-select2-id="95">
                        Intermediate
                      </option>
                      <option value="intermediate" data-select2-id="96">
                        Advanced
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group  mb-3 col-md-6 fl-left">
                  <label class="col-md-12 col-form-label" for="level">
                    Enrollment Type
                  </label>
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
                    >
                      <option value="beginner" data-select2-id="4">
                        Open
                      </option>
                      <option value="advanced" data-select2-id="95">
                        By Invitation
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group  mb-3 col-md-6 fl-left">
                  <label class="col-md-12 col-form-label" for="level">
                    Entrance Exam Required
                  </label>
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
                    >
                      <option value="beginner" data-select2-id="4">
                        False
                      </option>
                      <option value="advanced" data-select2-id="95">
                        True
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group  mb-3 col-md-6 fl-left">
                  <label class="col-md-12 col-form-label" for="level">
                    Auditing
                  </label>
                  <div class="co" data-select2-id="94">
                    <select
                      style={{ position: "relative", zIndex: "1" }}
                      class="form-control select2 select2-hidden-accessible"
                      data-toggle="select2"
                      name="level"
                      id="level"
                      data-select2-id="level"
                      tabindex="-1"
                      aria-hidden="true"
                    >
                      <option value="beginner" data-select2-id="4">
                        YES
                      </option>
                      <option value="advanced" data-select2-id="95">
                        NO
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-group col-md-6 fl-left">
                  <label
                    className="col-md-12 col-form-label"
                    for="course_title"
                  >
                    video url<span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                      style={{ position: "relative", zIndex: "1" }}
                      type="text"
                      className="form-control"
                      id="course_title2"
                      name="title"
                      placeholder="You tube url"
                    />
                  </div>
                </div>

                <div className="form-group row col-md-6 fl-left">
                  <div className="f">
                    <label
                      className="col-md-12 col-form-label"
                      for="course_thumbnail_label"
                    >
                      Course thumbnail
                    </label>
                    <div className="">
                      <div
                        className="wrapper-image-preview"
                        style={{ marginLeft: "-6px" }}
                      >
                        <div className="box">
                          <div
                            className="js--image-preview"
                            style={{
                              backgroundImage:
                                "ourse_thumbnail_placeholder.jpg",
                              backgroundColor: "#F5F5F5",
                            }}
                          ></div>
                          <div className="upload-options">
                            <label for="course_thumbnail" className="btn">
                              {" "}
                              <i className="fa fa-camera"></i> Course thumbnail{" "}
                              <br /> <small>(600 X 600)</small>{" "}
                            </label>
                            <input
                              id="course_thumbnail"
                              style={{ visibility: "hidden" }}
                              type="file"
                              className="image-upload"
                              name="course_thumbnail"
                              accept="image/*"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" col-md-12">
                  <label className="col-md-12 col-form-label" for="description">
                    Curriculum
                  </label>
                  <div className="">
                    <Editor placeholder="Curriculum" />
                  </div>
                </div>

                <br />
                <br />
                <br />
                <br />
                <br />

                {/*                  <div class="form-group col-md-6 fl-left mb-3" data-select2-id="11">
    <label class="col-md-12 col-form-label" for="sub_category_id">Category<span class="required">*</span></label>
    <div class="" data-select2-id="10">
        <select style={{marginLeft:"90px"}} class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="sub_category_id" id="sub_category_id" required="" data-select2-id="sub_category_id" tabindex="-1" aria-hidden="true">
            <option value="" data-select2-id="2">Select a category</option>
            <optgroup label="ARTS &amp; HUMANITIES " data-select2-id="28">
                <option value="69" data-select2-id="29">Education</option>
                <option value="70" data-select2-id="30">History</option>
                <option value="71" data-select2-id="31">Political Science</option>
                <option value="72" data-select2-id="32">Sociology</option>
                <option value="73" data-select2-id="33">Geography</option>
                <option value="76" data-select2-id="34">Media and Journalism</option>
                <option value="77" data-select2-id="35">Architecture</option>
            </optgroup>
            <optgroup label="BUSINESS" data-select2-id="36">
                <option value="86" data-select2-id="37">Business Process Management </option>
                <option value="124" data-select2-id="38">Service Management</option>
                <option value="125" data-select2-id="39">Supply Chain Management</option>
                <option value="126" data-select2-id="40">Sales and Marketing Management</option>
                <option value="127" data-select2-id="41">Risk Management</option>
                <option value="128" data-select2-id="42">Customer Service</option>
                <option value="129" data-select2-id="43">Business Leadership</option>
                <option value="130" data-select2-id="44">Human Resources</option>
                <option value="131" data-select2-id="45">Finance and Banking</option>
                <option value="132" data-select2-id="46">Accounting</option>
            </optgroup>
            <optgroup label="HEALTH CARE" data-select2-id="47">
                <option value="88" data-select2-id="48">Nursing </option>
                <option value="89" data-select2-id="49">Disease and Disorders</option>
                <option value="90" data-select2-id="50">Nutrition</option>
                <option value="91" data-select2-id="51">Caregiving</option>
                <option value="92" data-select2-id="52">Pharmacology</option>
            </optgroup>
            <optgroup label="LAW &amp; SOCIAL SCIENCES" data-select2-id="53">
                <option value="95" data-select2-id="54">Law</option>
                <option value="96" data-select2-id="55">Economics</option>
                <option value="97" data-select2-id="56">Psychology</option>
            </optgroup>
            <optgroup label="INFORMATION TECHNOLOGY" data-select2-id="57">
                <option value="100" data-select2-id="58">Network and security</option>
                <option value="101" data-select2-id="59">IT Management</option>
                <option value="102" data-select2-id="60">Digital Marketing</option>
                <option value="103" data-select2-id="61">Web Site and Application Development</option>
            </optgroup>
            <optgroup label="MATHEMATICS " data-select2-id="62">
                <option value="105" data-select2-id="63">SS1 Mathematics</option>
                <option value="106" data-select2-id="64">SS2 Mathematics</option>
                <option value="107" data-select2-id="65">SS3 Mathematics</option>
            </optgroup>
            <optgroup label="ENGINEERING AND PHYSICAL SCIENCES" data-select2-id="66">
                <option value="110" data-select2-id="67">Computer Science and Engineering</option>
                <option value="111" data-select2-id="68">Electrical Engineering </option>
                <option value="112" data-select2-id="69">Mechanical Engineering</option>
                <option value="113" data-select2-id="70">Chemical Engineering</option>
                <option value="114" data-select2-id="71">Civil Engineering</option>
                <option value="116" data-select2-id="72">Biology </option>
                <option value="117" data-select2-id="73">Physics </option>
                <option value="118" data-select2-id="74">Chemistry</option>
                <option value="119" data-select2-id="75">Environmental Studies</option>
                <option value="120" data-select2-id="76">Agricultural Science</option>
            </optgroup>
            <optgroup label="LANGUAGE " data-select2-id="77">
                <option value="134" data-select2-id="78">English</option>
                <option value="135" data-select2-id="79">Yoruba</option>
                <option value="136" data-select2-id="80">Igbo</option>
                <option value="137" data-select2-id="81">Hausa</option>
                <option value="138" data-select2-id="82">Chinese</option>
                <option value="139" data-select2-id="83">French</option>
            </optgroup>
        </select>
            </div>
</div>





<div class="form-group  mb-3 col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="level">Level</label>
    <div class="" data-select2-id="94">
        <select  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">Beginner</option>
            <option value="advanced" data-select2-id="95">Advanced</option>
            <option value="intermediate" data-select2-id="96">Intermediate</option>
        </select>
        
    </div>
</div>

<div class="form-group  mb-3 col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="language_made_in">Language made in</label>
    <div class="">
        <select  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="language_made_in" id="language_made_in" data-select2-id="language_made_in" tabindex="-1" aria-hidden="true">
            <option value="english" data-select2-id="6">English</option>
        </select>
      
    </div>
</div>*/}
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

class DynamicForm extends React.Component {
  constructor() {
    super();
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
    return (
      <div className="row">
        <div className="col-md-12">
          <h6>{this.props.title}</h6>

          {this.state.shareholders.map((shareholder, idx) => (
            <div className="shareholder form-group ">
              <div className="col-md-10 fl-left">
                <input
                  type="text"
                  placeholder={` #${idx + 1} Enter an instructors email`}
                  value={shareholder.name}
                  onChange={this.handleShareholderNameChange(idx)}
                  className="form-control fl-left"
                />
              </div>
              {/*<div class="col-md-2">
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              className="small text-white"
            >
              -
            </button>
            </div>*/}

              <br />
              <br />
            </div>
          ))}
          <br />
          <button
            type="button"
            onClick={this.handleAddShareholder}
            className="btn btn-primary text-white"
            style={{ width: "300px", margin: "10px" }}
          >
            Add A Team
          </button>
        </div>

        <br />
        <br />
      </div>
    );
  }
}

class Step5 extends React.Component {
  constructor() {
    super();
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
    return (
      <React.Fragment>
        <div className="tab-pane card-box" id="outcomes">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="form-group col-md-6 fl-left">
                <label className="col-md-12 col-form-label" for="course_title">
                  Grace period after deadline in weeks{" "}
                  <span className="required">*</span>{" "}
                </label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="course_title2"
                    name="title"
                    placeholder="Enter course title"
                    required=""
                  />
                </div>
              </div>

              <div class="form-group  col-md-6 fl-left">
                <label class="col-md-12 col-form-label" for="level">
                  Grade
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
                </div>
              </div>

              <div class="form-group  col-md-6 fl-left">
                <label class="col-md-12 col-form-label" for="level">
                  Assignment/Exam Type
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
                    <option value="beginner" data-select2-id="4">
                      Professional
                    </option>
                    <option value="advanced" data-select2-id="95">
                      Certificate issued
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group  mb-3 col-md-6 fl-left">
                <label class="col-md-12 col-form-label" for="language_made_in">
                  Language made in
                </label>
                <div class="">
                  <select
                    class="form-control select2 select2-hidden-accessible"
                    data-toggle="select2"
                    name="language_made_in"
                    id="language_made_in"
                    data-select2-id="language_made_in"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option value="english" data-select2-id="6">
                      English
                    </option>
                  </select>
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
  constructor() {
    super();
    this.state = {
      shareholders: [{ name: "" }],
    };
  }

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="tab-pane" id="requirements">
          <div className="row card-box">
            <div className="col-md-12">
              <div className="form-group col-md-6 fl-left">
                <label className="col-md-12 col-form-label" for="course_title">
                  Course Start Date <span className="required">*</span>{" "}
                </label>
                <div className="">
                  <input
                    type="date"
                    className="form-control"
                    id="course_title"
                    name="title"
                    placeholder="Enter course title"
                    required=""
                  />
                </div>
              </div>

              <div className="form-group col-md-6 fl-left">
                <label className="col-md-12 col-form-label" for="course_title">
                  Course End Date <span className="required">*</span>{" "}
                </label>
                <div className="">
                  <input
                    type="date"
                    className="form-control"
                    id="course_title2"
                    name="title"
                    placeholder="Enter course title"
                    required=""
                  />
                </div>
              </div>

              <div className="form-group col-md-6 fl-left">
                <label className="col-md-12 col-form-label" for="course_title">
                  Enrollments Start Date <span className="required">*</span>{" "}
                </label>
                <div className="">
                  <input
                    type="date"
                    className="form-control"
                    id="course_title"
                    name="title"
                    placeholder="Enter course title"
                    required=""
                  />
                </div>
              </div>

              <div className="form-group col-md-6 fl-left">
                <label className="col-md-12 col-form-label" for="course_title">
                  Enrollments End Date/Time <span className="required">*</span>{" "}
                </label>
                <div className="">
                  <input
                    type="date"
                    className="form-control"
                    id="course_title2"
                    name="title"
                    placeholder="Enter course title"
                    required=""
                  />
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
                    name="title"
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
                    name="title"
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
                  <Editor placeholder="Prerequisites" />
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
                    name="level"
                    id="level"
                    data-select2-id="level"
                    tabindex="-1"
                    aria-hidden="true"
                  >
                    <option value="beginner" data-select2-id="4">
                      Instructor Paced
                    </option>
                    <option value="advanced" data-select2-id="95">
                      Self Paced
                    </option>
                  </select>
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
  render() {
    if (this.props.currentStep !== 5) {
      return null;
    }
    return (
      <React.Fragment>
        {" "}
        <div className="tab-pane" id="pricing">
          <div className="row card-box">
            <div className="col-md-12">
              <DynamicForm />
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





    /*LETS DEFINE OUR ACTION EVENT FOR  THE MARDOWN EDITOR*/








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
  <span class="hint-message" style={{}}> Double click on each created section to reorder positioning of the section</span>
                  
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
                      <Editor placeholder="overview" />
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
                      <Editor placeholder="overview" />
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
                      <Editor placeholder="overview" />
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
                              <div class="editor-authoring">
          <div class="authoring-edit-toolbar">
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
          <div class="content-area">
            <div style={{textAlign: "center",fontSize:"20px",color:"#000"}} class="visuell-view2"  contentEditable='true'>
                  <p style={{textAlign: "center",fontSize:"20px",color:"#000"}}>Edit <b>your content </b> Editor <i>
                  (What you see is what you get)</i>!</p>
      <p style={{textAlign: "center",fontSize:"20px",color:"#000"}} style={{textAlign: "center"}}>Add text content <u>(plain text)</u>, 
          <i><u>markups</u> </i>and pure <u>html code</u>, <strike></strike>!</p>
      <hr/>
  
             
            </div>
            <textarea class="html-view"></textarea>
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
                      saveMarkdownEditContent()
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
                              <div class="editor-authoring">
          <div class="authoring-edit-toolbar">
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
          <div class="content-area">
            <div class="visuell-view"  contentEditable='true'>
                  <p style={{textAlign: "center"}}>Edit <b>your content </b> Editor <i>
                  (What you see is what you get)</i>!</p>
      <p style={{textAlign: "center"}}>Add text content <u>(plain text)</u>, 
          <i><u>markups</u> </i>and pure <u>html code</u>, <strike></strike>!</p>
      <hr/>
  
             
            </div>
            <textarea class="html-view"></textarea>
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
                    Status
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
                      <option value="beginner" data-select2-id="4">
                        Draft
                      </option>
                      <option value="advanced" data-select2-id="95">
                        Published And Live
                      </option>
                      <option value="intermediate" data-select2-id="96">
                        Published
                      </option>
                      <option value="intermediate" data-select2-id="96">
                        Visible To Staff Only
                      </option>
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
                      window.location.href =
                        process.env.PUBLIC_URL + "/authoring/create/new/step2";
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
