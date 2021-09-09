import httpRequest from "services/axiosAuthoring";
import qs from "qs";
import Sortable from "sortablejs/modular/sortable.complete.esm.js"; 

/*magicican victor jake dibs*/

import loading_image from "assets/gifs/loading-buffering.gif";
import $ from "jquery";
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';

import { getLanguages } from "services/language";
import axios from "axios"
import swal from "sweetalert"
let base_url = "http://gapslmsservices.herokuapp.com"; //process.env.REACT_APP_API_URL2
/*django ajax set up here for post request*/
var contentType = "application/x-www-form-urlencoded"; //"multipart/form-data"
window.drf = {
  csrfHeaderName: "X-CSRFTOKEN",
  csrfToken: "BflbcAqq5u5i8NdzTKBhUZmfFrYXlb1tZwq3EQPrUornyky8l9Vn2AKUJkfHXVR6",
};


function removeLoader(){
  $( "#loadingDiv" ).fadeOut(500, function() {
          // fadeOut complete. Remove the loading div
      $( "#loadingDiv" ).remove(); //makes page more lightweight 
  });  
}


window.setTargetItem = (insertionId) =>{
  localStorage.setItem('given_id','dynamic_section_'+insertionId);
  localStorage.setItem('tracker',insertionId);
}

window.setTargetLessonComponent = (insertionId) => {
  localStorage.setItem("given_lsid","dynamic_lsubsection_"+insertionId);
  localStorage.setItem('ls_tracker',insertionId);
}


window.setTargetSubsectionItem = (insertionId) =>{
  localStorage.setItem('given_sid','dynamic_subsection_'+insertionId);
  localStorage.setItem('s_tracker',insertionId);
}

window.setTargetLessonItem = (insertionId) =>{
  localStorage.setItem('given_lsid','dynamic_lsubsection_'+insertionId);
  localStorage.setItem('ls_tracker',insertionId);
}

let getVal = (id) => {
  return document.getElementById(id).value;
}

function lessonObjectToFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}

const saveLessonComponent = (url, formId) => {
  let lessonData = {
  component{
    name: getVal("c-name"),
    description: getVal("c-description"),
    type: getVal("c-type"),  //int
    lesson: getVal("c-lesson-id")
  }
  content_type: getVal("c-content-type")
  html_text :getVal("c-html-text")
 };
 let formEl = $("#"+ formId);

 let formData = lessonObjectToFormData(lessonData);

  //make the post and voala
  createAnyResource("post",
  url,
  formEl) 
}



/*create the boxes holding the lessons*/
const addSubSectionData = (response) => {
  let muu_counter =response?.id
 
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
                 response?.name || "Subsection"
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
            onclick='addlessonSection(this);setTargetSubsectionItem("${muu_counter}") '      
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




const addSectionData = (response) => {
  let insertionId = response?.id
  // let mycounter = counter++;
  localStorage.setItem("sec_counter", response?.id);
  let templateData ="no data returned"
  // if(sectionRes){

  templateData =`
  <li data-parent="${insertionId}" data-restriction="${
    "miller_" + insertionId
  }"    data-id="${
    "miller_" + insertionId
  }" id="dynamic_section_${insertionId}"  class=" root-li view tr-of-root opened col-md-12 ${
    "miller_" + insertionId
  } section-list" style=" margin-bottom:10px;">
   <a style="margin-right:10px;background:#fff;color:#000"
          data-id="${"miller_" + insertionId}"
          onclick="localStorage.setItem('given_id','dynamic_section_'+'${insertionId}');localStorage.setItem('tracker','${insertionId}');showSetSubsection(this);"           
          >
           <span ><i class="fa fa-chevron-down "></i></span>
    </a>
     <span class="tits section__name first-child-of-td" style="font-size:20px"> ${
       response.name || "Section " + insertionId
     }</span>
      <span class="per action" style="float:right">
      <a style="margin-right:10px;background:#fff;color:#000"
                   href="#myModalSubsection" role="button" data-toggle="modal"
                   onclick='setTargetItem("${insertionId}")'
                  >
                
                    <i class="fa fa-plus "></i>
        </a>

        <a style="margin-right:10px;background:#fff;color:#000"
            href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${"miller_" + insertionId}"
            onclick="editSection(this);localStorage.setItem('given_id','dynamic_section_'+'${insertionId}');localStorage.setItem('tracker','${insertionId}');"       
          >
                
          <i class="fa fa-edit "></i>
        </a>


        <a style="margin-right:10px;background:#fff;color:#000"
          
          data-id="${"miller_" + insertionId}"
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
                data-id="${"miller_" + insertionId}"
                   onclick="localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});"
                  >Add Sub Section</a></li>

                  

                <li><a class="dropdown-item"   href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${"miller_" + insertionId}"
            onclick="editSection(this);localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});"       
          >Edit </a></li>
                <li><a class="dropdown-item" 
                 data-id="${"miller_" + insertionId}"
                onclick="replicateSection(this);localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});"

                >Replicate Section</a></li>
                <li><a class="dropdown-item" href="#noclick" >Import </a></li>
                <li><a class="dropdown-item" 
                href="#myModalExport" role="button" data-toggle="modal"
          data-id="${
            "miller_" + insertionId
          }" onclick="exportSection();localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});" >Export </a></li>
                <li><a class="dropdown-item" href="#noclick" onclick="alert('published to live course')" >Publish </a></li>
                
             
           </ul>
         </a>

          <a style="margin-right:10px;background:#fff;color:#000"
        
          data-id="${"miller_" + insertionId}"
          onclick="showSetSubsection(this);localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});"
                
          >

           <span ><i class="fa fa-chevron-down "></i></span>
</a>
          
          
              
        </span>
</li>

    `;


  // }

  
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




const addLessonData = (response) => {
  let muu_counter = response.id;

  localStorage.setItem("l_tracker", muu_counter);
  // alert(localStorage.getItem("lesson_component"))
  let panel_class =  $(".muu_" + localStorage.getItem("s_tracker"));  // $("." + localStorage.getItem("lesson_component")) //  $(".muu_" + localStorage.getItem("s_tracker"));
 
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
           onclick='setTargetLessonItem("${muu_counter}")'
                 
          >

         <i class="fa fa-arrows "></i>
        </a>
         <a class="dropright dropright "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-ellipsis-v " style="color:#000"></i>
        <ul class="dropdown-menu" style="margin-left:40px" >
                <li><a class="dropdown-item"   href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${"lmuu_" + muu_counter}"
            onclick='setTargetLessonComponent("${muu_counter}")'       
          >Edit </a></li>



                <li><a class="dropdown-item"   
          data-id="${"lmuu_" + muu_counter}"
            onclick='showComponentModal(this);setTargetLessonComponent("${muu_counter}")'      
          >Add Component</a></li>


                <li><a class="dropdown-item" 
                 data-id="${"lmuu_" + muu_counter}"
                onclick='setTargetLessonComponent("${muu_counter}")'

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

};





export const getIdFromUrl = () =>{
//   var url = 'http://www.site.com/234234234';
// var id = url.substring(url.lastIndexOf('/') + 1);
// alert(id); // 

 var full_url = document.URL; // Get current url
 var url_array = full_url.split('/') // Split the string into an array with / as separator
 var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
 return last_segment
}       
                            //id       //link     //true or false
export const getUrlParameters = (parameter, staticURL, decode) =>{

       var currLocation = (staticURL.length)? staticURL : window.location.search,
           parArr = currLocation.split("?")[1].split("&"),
           returnBool = true;

       for(var i = 0; i < parArr.length; i++){
            let parr = parArr[i].split("=");
            if(parr[0] == parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
                returnBool = true;
            }else{
                returnBool = false;            
            }
       }

       if(!returnBool) return false;  
}

const getCookie = (name) => {
  var cookieValue = null;

  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = $.trim(cookies[i]);

      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const csrfSafeMethod = (method) => {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
};

const sameOrigin = (url) => {
  // test that a given url is a same-origin URL
  // url could be relative or scheme relative or absolute
  var host = document.location.host; // host + port
  var protocol = document.location.protocol;
  var sr_origin = "//" + host;
  var origin = protocol + sr_origin;

  // Allow absolute or scheme relative URLs to same origin
  return (
    url == origin ||
    url.slice(0, origin.length + 1) == origin + "/" ||
    url == sr_origin ||
    url.slice(0, sr_origin.length + 1) == sr_origin + "/" ||
    // or any other URL that isn't scheme relative or absolute i.e relative.
    !/^(\/\/|http:|https:).*/.test(url)
  );
};

/*the post handler action*/
/*
 *@param url : description: http://apibase/createlink
 *@param form : jquery form element
 *@ Function createAnyResource: creates any resource via jquery formElement
 *@ example usage : createAnyResource("/lms/api/create/section", $("form")) // sweet!!!
 */
export const createAnyResource = (mode="post",
  parts = "/lms/api/create/course/",
  formEl
) => {
  var url = base_url + parts;
  var form = formEl[0];
  console.log(formEl.attr("id"))
  // You need to use standard javascript object here
  var formData = new FormData(form);

  // Attach file only if the generic form contains (.* input[type="file"])
  // if($('input[type=file]')[0].files[0].length > 0){
  // for(let i=0; i <= $('input[type=file]')[0].files[0].length; i++){
  if(formEl.attr("id")=="stepUpFormWithAI" || formEl.attr("id")=="stepUpFormWithAI2"){

  formData.append("filename", $("input[type=file]")[0].files[0]); //
}
  // }
  // }
  let data = null;
  let alert = new Alert({
    time: 5000,
  });
  // in the future get the csrf token from the header after identity is established
  var csrftoken = window.drf.csrfToken;
  $.ajaxSetup({
    beforeSend: function (xhr, settings) {
      // xhr.setRequestHeader("Content-Type","application/json");
      // xhr.setRequestHeader("Accept","text/json");
      if (
        !csrfSafeMethod(settings.type) // && sameOrigin(settings.url)
      ) {
        // Send the token to same-origin, relative URLs only.
        // Send the token only if the method warrants CSRF protection
        // Using the CSRFToken value acquired earlier
    
        //if its course  creation form
        if(formEl.attr("id")=="stepUpFormWithAI" || formEl.attr("id")=="stepUpFormWithAI2"){

              // check for basic required fields validation requirements
              let name = document.getElementById("course_name").value;
              let code = document.getElementById("course_code").value;
              let authorId = document.getElementById("author").value;
              let institutionId = document.getElementById("institution");
              institutionId =
                institutionId.options[institutionId.selectedIndex].value;

              if (institutionId == "-- Institutions --") {
                //throw error
                swal("Error!", "We could not find instructor", "error");
                return false;
              } else if (name == "" ){
                swal("Error!", "Course name is required", "error");
                return false;
              } else if( code == "" ){
                swal("Error!", "Course code required", "error");
                return false;
              }else if(institutionId == "")
              {
                

                swal("Sorry!", "The course must be attached to an institution it belongs to", "error");

                return false;
              }
        }
        //if it section creation form: check required validation


        //if it subsection creation or update form : check required validation


        //if its lesson creation or update form : check required validation

        //if only file download is required or needed via backend to check for file upload
        // xhr.setRequestHeader("Content-Disposition", 'attachment; filename=' + form[0].files.name);
        xhr.overrideMimeType("multipart/form-data");

        xhr.setRequestHeader(window.drf.csrfHeaderName, csrftoken);
      }
    },
  });

  if (contentType) {
    if (contentType === "multipart/form-data") {
      //multipart/form-data
      if (!window.FormData) {
        alert("Your browser does not support AJAX multipart form submissions");
        return;
      }
      //this is needed in multipart/forms
      contentType = false;
      // console.log(form[0])
    } else {
      contentType = "application/x-www-form-urlencoded; charset=UTF-8";
      data = formEl.serialize();
    }
  }

  console.log(data);
  let type = "POST"
  if(mode.toLowerCase() !=="post"){
     type = "PATCH"
  }

  //make the post request
  var httpRequestAjax = $.ajax({
    url: url,
    // method: "POST",
    type:type,
    // data:formData, //multipart form
    // data: JSON.stringify(data), // if not multipart form
    // contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+) multipart
    // processData: false, // NEEDED, DON'T OMIT THIS  multipart

    contentType: "application/x-www-form-urlencoded; charset=UTF-8", //enc
    data: data, //

    // headers: {// multipart
    //   'Accept': "application/json"   //'text/html; q=1.0, */*'  // let the backend accepts html element of the form data request instead of jsons
    // },
  });
let dataObj ={}
  /*jquery always ajax method used instead of success and error*/
  httpRequestAjax.always(function (data, textStatus, jqXHR) {
    
    console.log(textStatus)
    if (textStatus != "success") {
      jqXHR = data;
      dataObj.data=  data;
      console.log(data)
      // alert.success("Success", "Created a resource");
     
      if(formEl.attr("id")=="stepUpFormWithAI" || formEl.attr("id")=="stepUpFormWithAI2"){
          if(mode.toLowerCase() =="post"){
              swal("Sorry", "Failed to create the resource", "error");
           }else{
              swal("Sorry", "Failed to update changes on this resource", "error");
           }
      }

       if(formEl.attr("id")=="addSectionForm"){
          if(mode.toLowerCase() =="post"){
              swal("Sorry", "Failed to create the section", "error");
           }else{
              swal("Sorry", "Failed to update changes on this section", "error");
           }
      }

      if(formEl.attr("id")=="addSubSectionForm"){
          if(mode.toLowerCase() =="post"){
              swal("Sorry", "Failed to create the section", "error");
           }else{
              swal("Sorry", "Failed to update changes on this section", "error");
           }
      }


      if(formEl.attr("id")=="addLessonSectionForm"){
          if(mode.toLowerCase() =="post"){
              swal("Sorry", "Failed to create the Lesson Section . You can not add any component to the lesson", "error");
           }else{
              swal("Sorry", "Failed to update changes on this section", "error");
           }
      }

    } else {

       if(formEl.attr("id")=="stepUpFormWithAI" || formEl.attr("id")=="stepUpFormWithAI2"){
      
           if(mode.toLowerCase() =="post"){
             swal("Congratulations", "You successfully created a course", "success");
           }else{
             swal("Congratulations", "You successfully updated this course", "success");
           }

        }



        if(formEl.attr("id")=="addSectionForm"){
          if(mode.toLowerCase() =="post"){
             swal("Congratulations", "You successfully created a section for this course. You Can add subsections and then create lessons for your intending course", "success");
           }else{
             swal("Congratulations", "You successfully updated this section of this course", "success");
           }
      }



      if(formEl.attr("id")=="addSubSectionForm"){
          if(mode.toLowerCase() =="post"){
             swal("Congratulations", "You successfully created a subsection for this course. You Can add subsections and then create lessons for your intending course", "success");
           }else{
             swal("Congratulations", "You successfully updated this subsection of this course", "success");
           }
      }


      if(formEl.attr("id")=="addLessonSectionForm"){
          if(mode.toLowerCase() =="post"){
             swal("Congratulations", "You successfully created a lesson section to hold your course units for this course. You Can add subsections and then create lessons for your intending course", "success");
           }else{
             swal("Congratulations", "You successfully updated this lesson section of this course", "success");
           }
      }
     
      // alert.error("Failed to create the resource", "Error");
    }
    var responseContentType = jqXHR.getResponseHeader("content-type") || "";
    if (responseContentType.toLowerCase().indexOf("text/html") === 0) {
      // do something awesome like animate success box
      console.log(jqXHR.responseText, "text type");

       // dataObj.response = JSON.parse(jqXHR.responseText)
      console.log(dataObj.response, dataObj.response.id)

       // return  jqXHR.responseText

    } else {
      // console.log(jqXHR.responseJSON);
      // console.log(JSON.parse(jqXHR.responseText), "here is the content");
      dataObj.response = JSON.parse(jqXHR.responseText)
      console.log(dataObj.response, dataObj.response.id)
      if(formEl.attr("id")=="stepUpFormWithAI" || formEl.attr("id")=="stepUpFormWithAI2" ){
          if(mode.toLowerCase() =="post" && textStatus != "success"){
            window.location.href= process.env.PUBLIC_URL + "/authoring/create/new/"+ dataObj.response.id
            return dataObj.response.id
          }else if(mode.toLowerCase() =="patch" && textStatus != "success"){
             return dataObj.response.id
          }else{
            console.table(jqXHR.responseText) // console the error response
            return dataObj.response.id
          }
      }



      if(formEl.attr("id")=="addSectionForm"  ){
          if(mode.toLowerCase() =="post" && textStatus != "success"){
            // window.location.href= process.env.PUBLIC_URL + "/authoring/create/new/"+ dataObj.response.id
           swal("Some error occured","error") // console the error response
       
          }else if(mode.toLowerCase() =="patch" && textStatus != "success"){
             // return dataObj.response.id
             //update the change
          }else{
             addSectionData(dataObj.response)
                 // return dataObj.response.id
          }
      }


        if(formEl.attr("id") == "addSubSectionForm"  ){
          if(mode.toLowerCase() =="post" && textStatus != "success"){
            // window.location.href= process.env.PUBLIC_URL + "/authoring/create/new/"+ dataObj.response.id
           swal("Some error occured","error") // console the error response
       
          }else if(mode.toLowerCase() =="patch" && textStatus != "success"){
             // return dataObj.response.id
          }else{
             addSubSectionData(dataObj.response)
                 // return dataObj.response.id
          }
        }


       if(formEl.attr("id") == "addLessonSectionForm"  ){
          if(mode.toLowerCase() =="post" && textStatus != "success"){
            // window.location.href= process.env.PUBLIC_URL + "/authoring/create/new/"+ dataObj.response.id
           swal("Some error occured","error") // console the error response
       
          }else if(mode.toLowerCase() =="patch" && textStatus != "success"){
             // return dataObj.response.id
          }else{
             addLessonData(dataObj.response)
                 // return dataObj.response.id
          }
        }


        //finally for lesson components



      
    }

   
  });
   
  return  dataObj?.response?.id
};



/*api request*/
export const makeRequest = (url, method = "get", details) => {
  switch (method.toLowerCase()) {
    // case:"post":
    // case "put":
    // case "patch":

    //   break;
    case "get":
      console.log("calling get");
      return fetch(url, {
        method: method.toLowerCase(),
        // credentials: "same-origin",
        headers: {
          // "X-CSRFToken": getCookie("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      break;
    default:
      console.log("calling get");
      return fetch(url, {
        method: method.toLowerCase(),
        // credentials: "same-origin",
        headers: {
          // "X-CSRFToken": getCookie("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      break;
  }
};

export const getCourses = async (limit = 800000, offset = 0) => {
  let url = base_url + `/lms/api/courses/?limit=${limit}&offset=${offset}`;
  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getInstitutionCourses = async (
  id = 0,
  limit = 800000,
  offset = 0
) => {
  let url =
    base_url + `/lms/api/courses/${id}/?limit=${limit}&offset=${offset}`;

  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getCourse = async (id) => {
  let url = base_url + `/lms/api/course/${id}`;

  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getSectionsOfCourseId = async (courseId) => {
  let url = base_url + `/lms/api/sections/${courseId}`;

  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
}

//awesome
export const createCourse = async (parts, form) => {
  return createAnyResource(parts, form);
};

/*will try this method differently for update: Realworld solutions provided here*/
export const updateCourse = async (courseId, data) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      _method: "PUT",
    },
  };

  let request = httpRequest.put(
    `courses/${courseId}`,
    qs.stringify(data),
    // data,
    config
  );
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });

  // let url = base_url + `courses/${id}/?limit=${limit}&offset=${offset}`
  // let request   = makeRequest(url)

  // let request   = makeRequest(url)
  // return request.then(function(response) {

  //        return response.json();
  //   }).then( (data) => {
  //       if (data){
  //         console.log("Data retrieved from lms:" + data)
  //         return data
  //       }

  //   })
};

export const getInstitutions = async (limit = 8000000, offset = 0) => {
  let url = base_url + `/lms/api/institutions`;
  let request = makeRequest(url);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getInstitution = async (id) => {
  let url = base_url + `/lms/api/institution/${id}`;
  let request = makeRequest(url);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getInstructorProfiles = async (limit = 8000000, offset = 0) => {
  let url = base_url + `/profile-resource/api/author-profiles/`;
  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getInstructorProfile = async (id) => {
  let url = base_url + `/profile-resource/api/author-profiles/${id}`;
  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

/*future implementations create*/

export const createSection = async (details) => {
  let url = base_url + "/lms/api/create/section";
  let request = makeRequest(url, "post", details);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createSubsection = async (details) => {
  let url = base_url + "/lms/api/create/subsection";
  let request = makeRequest(url, "post", details);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createLesson = async (details) => {
  let url = base_url + "/lms/api/create/lesson";
  let request = makeRequest(url, "post", details);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createInstitution = async (details) => {
  let url = base_url + "/lms/api/create/institution";
  let request = makeRequest(url, "post", details);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createGapsGroup = async (details) => {
  let url = base_url + "/lms/api/create/gaps-group";
  let request = makeRequest(url, "post", details);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createUserProfile = async (details) => {
  let url = base_url + "/lms/api/create/user-profile";
  let request = makeRequest(url, "post", details);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createStudentProfile = async (details) => {
  let url = base_url + "/lms/api/create/student-profile";

  let request = makeRequest(url, "post", details);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createAuthorProfile = async (details) => {
  let url = base_url + "/lms/api/create/author-profile";

  let request = makeRequest(url, "post", details);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export class Alert {
  constructor(config) {
    let defaultConfig = {
      time: 5000,
    };

    this.config = {
      ...defaultConfig,
      ...config,
    };
    document.body.append(
      new DOMParser().parseFromString(
        `<div class="alert-container"></div>`,
        "text/html"
      ).body.firstChild
    );
  }

  createDom(text) {
    let dom = new DOMParser().parseFromString(
      `
      <div class="alert">
        <div class="alert__close"><i class="fas fa-times"></i></div>
        <div class="alert__icon"></div>
        <div class="alert__title">Titulo de Alerta</div>
        <div class="alert__body">
          <p>${text}</p>
        </div>
      </div>`,
      "text/html"
    ).body.firstChild;
    let idsetTimeout = setTimeout(
      () => dom.querySelector(".alert__close").click(),
      this.config.time
    );
    dom
      .querySelector(".alert__close")
      .addEventListener("click", this.close.bind(this));
    dom.querySelector(".alert__close").addEventListener("click", () => {
      clearTimeout(idsetTimeout);
    });

    return dom;
  }

  isObject(value) {
    return value && typeof value === "object" && value.constructor === Object;
  }

  success(text, ...params) {
    let json = this.isObject(text) ? text : false;

    let alert = this.createDom(text);
    alert.classList.add("alert-success");
    alert.querySelector(".alert__body").innerHTML = json ? json.text : text;
    alert.querySelector(".alert__icon").innerHTML =
      '<i class="fas fa-check-circle"></i>';
    if (json || params[0]) {
      alert.querySelector(".alert__title").innerHTML = json
        ? json.title
        : params[0];
    }

    document.querySelector(".alert-container").appendChild(alert);
  }

  error(text, ...params) {
    let alert = this.createDom(text);
    alert.classList.add("alert-error");
    alert.querySelector(".alert__body").innerHTML = text;
    alert.querySelector(".alert__icon").innerHTML =
      '<i class="fas fa-exclamation-circle"></i>';
    if (params[0]) {
      alert.querySelector(".alert__title").innerHTML = params[0];
    }

    document.querySelector(".alert-container").appendChild(alert);
  }

  show(text, ...params) {
    let json = this.isObject(text) ? text : false;

    let alert = this.createDom(text);
    alert.querySelector(".alert__body").innerHTML = json ? json.text : text;
    if (json && json.icon) {
      alert.classList.add("alert-icon-custom");
      alert.querySelector(".alert__icon").innerHTML =
        '<i class="' + json.icon + '"></i>';
    }

    if (json || params[0]) {
      alert.querySelector(".alert__title").innerHTML = json
        ? json.title
        : params[0];
    }

    if (json && json.color) alert.style.setProperty("--color", json.color);

    document.querySelector(".alert-container").appendChild(alert);
  }

  close(ev) {
    document
      .querySelector(".alert-container")
      .removeChild(ev.target.parentNode);
  }
}
