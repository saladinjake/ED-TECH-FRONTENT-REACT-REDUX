import httpRequest from "services/axiosAuthoring";
import qs from "qs";
import Sortable from "sortablejs/modular/sortable.complete.esm.js"; 

/*magicican victor jake dibs*/

import loading_image from "assets/gifs/loading-buffering.gif";
import $ from "jquery";
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import toast from "react-hot-toast";


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

let url_new_problem_component =  "/lms/api/create/problem-component/"
let url_new_discussion_component = "/lms/api/create/discussion-component/"

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

//date format to mysql
/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

function showNotificationSuccess(type="success",stitle="",message=""){
  

  $(document).ready(function(){

    //notification set
        // Selecting all required elements
    const wrapper = document.querySelector(".notification-notice"),
    toast = wrapper.querySelector(".toast-offline2"),
    title = toast.querySelector("span"),
    subTitle = toast.querySelector("p"),
    wifiIcon = toast.querySelector(".icon"),
    closeIcon = toast.querySelector(".close-icon");

    


    wrapper.style.display="block"
    wrapper.classList.remove("hide");
    toast.classList.remove("offline");
    title.innerText = stitle;
    subTitle.innerText = message;
    let bg="gray", checkmark="fa fa-times"
    if(type=="success"){
     bg="green"
     checkmark="fa fa-check-circle"
    }else if(type=="error"){
      bg="red"
    }else{
      checkmark="fa fa-arrows"
      bg ="gray"
    }
    wifiIcon.innerHTML = `<i style="background:${bg}" class="${checkmark} fa-2x"></i>`;
    closeIcon.onclick = ()=>{ //hide toast notification on close icon click
        wrapper.classList.add("hide");
    }
    setTimeout(()=>{ //hide the toast notification automatically after 5 seconds
        wrapper.classList.add("hide");
    }, 5000);

  })
  
}


export const DateFormatter = {
  
  mysqlDate: (dateStr) => {
      Date.prototype.toMysqlFormat = function() {
          return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
      }

      let dateObj;

      if(dateStr.length> 0){
       dateObj =new Date(dateStr)
      }else{
        dateObj = new Date();
      }
       alert(dateObj.toMysqlFormat())
      return dateObj.toMysqlFormat();
  },

}



/*create the boxes holding the lessons*/
export const addSubSectionData = (response) => {
  let muu_counter =response?.id;
  let subsec = response;
  //validate that response has a new key id first to avoid thrown error

  if(typeof response == "object" &&  response.hasOwnProperty("id")){
 
      let template = `
         <ul 
         
         id="dynamic_subsection_${muu_counter}"  data-id="${
    "muu_" + muu_counter
  }" class="fold card-box drop-zone-section root-sub-ul centerSubsection column-list-section-parade ${
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
     <h4 style="background:rgba(8,23,200); margin-right:10px;padding:10px">
            
              <span class=""  style="height:60px;border-left:3px solid black;margin-top:10px">
               <span class="title_sub " data-th="Company name" style="font-size:20px;color:#fff">${
                 subsec?.name + " " + subsec?.position_id  || "Subsection"
               }</span>
                <span class="subsect" data-th="Customer no"></span>
                <span data-th="Customer name"></span>
                <span class="action" data-th="Customer nam"  style="float:right">
       
       <a    href="#myModalLesson" role="button" data-toggle="modal"
       style="margin-right:10px;color:#fff"
          data-id="${"muu_" + muu_counter}"
            onclick='addlessonSection(this);setTargetSubsectionItem("${muu_counter}") '      
          ><i class="fa fa-plus"></i></a>


        <a style="margin-right:10px;color:#fff"
            href="#myModalSubSectionEdit" role="button" data-toggle="modal"
          data-id="${"muu_" + muu_counter}"

            data-idx="${muu_counter}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"
          data-modal="myModalSubSectionEdit"

            onclick="injectToModal(this);"       
          >
                
          <i class="fa fa-edit "></i>
        </a>


        <a style="margin-right:10px;color:#fff"
          data-extint="subsection"

            data-idx="${muu_counter}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec.section}"

          data-id="${"muu_" + muu_counter}"
           onclick="genericDelete(this)"        
          >
                
          <i class="fa fa-trash "></i>
        </a>


         <a  class="drag-handle-list" style="margin-right:10px;color:#fff"
          
         
                 
          >

         <i class="fa fa-arrows "></i>
        </a>





         <a class="dropright dropright "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
                <i class="fa fa-ellipsis-v " style="color:#fff"></i>
             
        <ul class="dropdown-menu" style="margin-left:40px" >

  <li><a class="dropdown-item"   href="#myModalLesson" role="button" data-toggle="modal"
          data-id="${"muu_" + muu_counter}"
            onclick='addlessonSection(this);setTargetSubsectionItem("${muu_counter}") '      
          >Add</a></li>

                

                <li><a class="dropdown-item"    href="#myModalSubSectionEdit" role="button" data-toggle="modal"
          data-id="${"muu_" + muu_counter}"
           data-idx="${muu_counter}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
          data-parent-id="${subsec?.section}"

          data-modal="myModalSubSectionEdit"
            onclick="injectToModal(this)"       
          >Edit </a></li>



               


                <li><a class="dropdown-item" 
                 data-id="${"muu_" + muu_counter}"
                  data-idx="${muu_counter}"
          data-name="${subsec?.name}"
          data-pos="${subsec?.position_id}"
          data-description="${subsec?.description}"
           data-parent-id="${subsec?.section}"
          data-modal="myModalSubSectionEdit"
                onclick="replicateSubSection(this);localStorage.setItem('given_sid','dynamic_subsection_'+${muu_counter});localStorage.setItem('s_tracker',${muu_counter});"

                >Replicate Section</a></li>
                
           </ul>
         </a>
                </span>
      </li>

      </h4>
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

    // $("#js-parent")
    //   .find("#" + target)
    //   .append(template);

       $("#js-parent").find("#" + target)
      .append(template);
    //or 
       $("#" + localStorage.getItem("tracker"))
      .append(template);


  } else {
       $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
      setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.

    // alert($("#js-parent").find("#"+target).parent().find(`tr.section-parent_${localStorage.getItem("tracker")}` ).length)
   


         
      $("#js-parent").find("#" + target)
      .append(template);
    //or 
      //  $("#" + localStorage.getItem("tracker"))
      // .append(template);

      
  }
}

};




export const addSectionData = (response) => {
  let insertionId = response?.id
  let section = response;
  // let mycounter = counter++;
  localStorage.setItem("sec_counter", response?.id);
  let templateData ="no data returned"
  // if(sectionRes){
  if(typeof response == "object" &&  response.hasOwnProperty("id")){

  templateData =`
  <li id="${insertionId}" data-parent="${insertionId}" data-restriction="${
    "miller_" + insertionId
  }"    data-id="${
    "miller_" + insertionId
  }" id="dynamic_section_${insertionId}"  class="card-box root-li view tr-of-root opened col-md-12 ${
    "miller_" + insertionId
  } section-list" style=" margin-bottom:10px;background:#fff;border:2px solid #f5f5f5">

   <h4 style="background:rgba(8,23,200); margin-right:10px;padding:10px">
   <a style="color:#fff"
          data-id="${"miller_" + insertionId}"
          onclick="localStorage.setItem('given_id','dynamic_section_'+'${insertionId}');localStorage.setItem('tracker','${insertionId}');showSetSubsection(this);"           
          >
           <span ><i class="fa fa-chevron-down "></i></span>
    </a>
     <span class="tits section__name first-child-of-td" style="font-size:20px;color:#fff"> ${
       section.name + " " + section.position_id  || "Section " + insertionId
     }</span>
      <span class="per action" style="float:right">
      <a style="margin-right:10px;color:#fff"
                   href="#myModalSubsection" role="button" data-toggle="modal"
                   onclick="localStorage.setItem('given_id','dynamic_section_'+'${insertionId}');
  localStorage.setItem('tracker','${insertionId}');"
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
          data-modal="myModalEdit"

            onclick="injectToModal(this);localStorage.setItem('given_id','dynamic_section_'+'${insertionId}');localStorage.setItem('tracker','${insertionId}');"       
          >
                
          <i class="fa fa-edit "></i>
        </a>


        <a style="margin-right:10px;color:#fff"
          data-extint="section"

          data-idx="${insertionId}"
          data-name="${section.name}"
          data-pos="${section.position_id}"
          data-description="${section.description}"
          data-id="${"miller_" + insertionId}"
           onclick="genericDelete(this)"        
          >
                
          <i class="fa fa-trash "></i>
        </a>

        

         <a class="drag-handle" style="margin-right:10px;color:#fff"
                        
          >
         <i class="fa fa-arrows "></i>
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

            onclick="injectToModal(this);localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});"       
          >Edit </a></li>
                <li><a class="dropdown-item" 
                data-idx="${insertionId}"
          data-name="${section.name}"
          data-pos="${section.position_id}"
          data-description="${section.description}"
          data-parent-id="${section.id}"

                 data-id="${"miller_" + insertionId}"
                onclick="replicateSection(this);localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});"

                >Replicate</a></li>
                <li><a class="dropdown-item" 
                href="#myModalExport" role="button" data-toggle="modal"
          data-id="${
            "miller_" + insertionId
          }" onclick="exportSection();localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});" >Export </a></li>
                
             
           </ul>
         </a>

          <a style="margin-right:10px;color:#fff"
        
          data-id="${"miller_" + insertionId}"
          onclick="showSetSubsection(this);localStorage.setItem('given_id','dynamic_section_'+${insertionId});localStorage.setItem('tracker',${insertionId});"
                
          >

</a>
          
          
              
        </span>
        </h4>
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

  
  var children = $("#js-parent").children.length;



  if (children > 0) {
    


    /*sort the main sections that holds all subsection*/
    /*can only move along root section or can only be replaced along root sections*/
    // if (document.getElementById("js-parent")) {
    //   var el = document.getElementById("js-parent");
    //   var sortableSections = Sortable.create(el, {
    //     group: "sections",
    //     handle: ".drag-handle",
    //   });
    // }
    
    // /*sort sections subheader components*/
    // /*can only move along sub section component and no where else*/
    // if (document.querySelectorAll(".root-li")) {
    //   var children = $(".root-li").children.length;
    //   // alert(children)
    //   var subsectionGroups = document.querySelectorAll(".root-li");
    //   subsectionGroups.forEach(function (ele) {
    //     Sortable.create(ele, {
    //       group: "columns",
    //       handle: ".drag-handle-list",
    //     });
    //   });
    // }

   }
  } //end if
};




export const addLessonData = (response) => {
  let muu_counter = response.id;
  let lessons = response;

    if(typeof response == "object" &&  response.hasOwnProperty("id")){


        localStorage.setItem("l_tracker", muu_counter);
        // alert(localStorage.getItem("lesson_component"))
        let panel_class =  $(".muu_" + localStorage.getItem("s_tracker"));  // $("." + localStorage.getItem("lesson_component")) //  $(".muu_" + localStorage.getItem("s_tracker"));
       
     
  let rndId = "dynamic_subsection_" + muu_counter + "_lesson_component"
  let templateLesson = ` 
      <ul id="${rndId}"  data-id="${
    "muu_" + muu_counter
  }" class="reaper-${muu_counter} fold root-lesson-ul draggable dynamo_${localStorage.getItem("l_tracker")} card-box ${
    "muu_" + muu_counter
  } col-md-8   section-parent_${localStorage.getItem(
    "tracker"
  )} subsection-child_${localStorage.getItem(
    "s_tracker"
  )} " style="margin-right:20px; background:#fff; min-width:98%;width:98%" 
   dragable="true"  
  
   >

  
   
      <div class="console" style="display:none">
    <h4>CONSOLE:</h4>
  </div>
        <li class="fold-content">
  
    <h4 style="background:rgba(8,23,200); margin-right:10px;padding:10px">
               <span class="title_sub " data-th="Company name" style="font-size:20px;color:#fff">${
                 lessons.name || "Lesson" }
               </span>
                <span class="subsect" data-th="Customer no"></span>
                <span class="action" data-th="Customer nam"  style="float:right">



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


         <a class="drag-handle-list-lessons" style="margin-right:10px;color:#fff"
          data-id="${"lmuu_" + muu_counter}"
          data-template="dynamic_subsection_${muu_counter}_lesson_component "
           
           onclick='setTargetLessonItem("${muu_counter}")'
                 
          >

         <i class="fa fa-arrows "></i>
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

                >Replicate Section</a></li>
                
           </ul>
         </a>
         



                </span>

                </h4>
</li></ul>`;

         $("body").append(`<div style="" id="loadingDiv"><div class="LockOn" >Loading...</div></div>`);
            setTimeout(removeLoader,2000); //wait for page load PLUS two seconds.

        panel_class.append(templateLesson);


  }
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


let getVal = (el_id) => {
  if(document.getElementById(el_id)){
     return document.getElementById(el_id).value;
  }
  return "you dont know what you are doing";
 
}

function lessonObjectToFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}


const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
}, new FormData());



function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();
  
  buildFormData(formData, data);
  
  return formData;
}



function obj2FormData(obj, formData = new FormData()){

    formData = formData;

    const createFormData = function(obj, subKeyStr = ''){
        for(let i in obj){
            let value          = obj[i];
            let subKeyStrTrans = subKeyStr ? subKeyStr + '[' + i + ']' : i;

            if(typeof(value) === 'string' || typeof(value) === 'number'){

                formData.append(subKeyStrTrans, value);

            } else if(typeof(value) === 'object'){

                createFormData(value, subKeyStrTrans);

            }
        }
    }

    createFormData(obj);

    return formData;
}

/*the post handler action*/
/*
 *@param url : description: http://apibase/createlink
 *@param form : jquery form element
 *@ Function createAnyResource: creates any resource via jquery formElement
 *@ example usage : createAnyResource("/lms/api/create/section", $("form")) // sweet!!!
 */
export const createAnyResource = (mode="post",
  parts = "/lms/api/create/course/",
  formEl,
  state ={} // optional
) => {
  var url = base_url + parts;
  var form = formEl[0];
  console.log(formEl.attr("id"))
  // You need to use standard javascript object here
  var formData = new FormData(form);
  // Attach file only if the generic form contains (.* input[type="file"])
  // if($('input[type=file]')[0].files[0].length > 0){
  // for(let i=0; i <= $('input[type=file]')[0].files[0].length; i++){
  // if(formEl.attr("id")=="stepUpFormWithAI" || formEl.attr("id")=="stepUpFormWithAI2"){
  //   formData.append("filename", $("input[type=file]")[0].files[0]); //
  // }




  //if its course  creation form
        if(formEl.attr("id")=="create-course" ){
           //automatic method
          // const formIk = document.querySelector(formEl.attr("id"))
          // Array.from(formIk.elements).filter(e =>{ 
           
          //   if( localStorage.getItem( e.getAttribute("name") ) ){
          //      formEl.find("#"+ e.getAttribute("name")).val(localStorage.getItem( e.getAttribute("name")))
          //   }
          // })

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

          //procedural method
          // check for basic required fields validation requirements
          // formEl.find("#course_name").val(localStorage.getItem("name"))  ;
          // formEl.find("#course_code").val(localStorage.getItem("code"))  ;
          // formEl.find("#author").val(localStorage.getItem("author")) ;
          // formEl.find("#institution").val(localStorage.getItem("institution")) 
          // //institutionId = institutionId.options[institutionId.selectedIndex].value;
          

          if (formEl.find("#author").val() == "-- Institutions --") {
            //throw error
            swal("Error!", "We could not find instructor", "error");
            return false;
          } else if (formEl.find("#course_name").val() == "" ){
            swal("Error!", "Course name is required", "error");
            return false;
          } else if(  formEl.find("#course_code").val() == "" ){
            swal("Error!", "Course code required", "error");
            return false;
          }else if(formEl.find("#institution").val() == "-- Institutions --")
          {
            swal("Sorry!", "The course must be attached to an institution it belongs to", "error");
            return false;
          }
        }


       // else if its an update of the form for each tab run the following event
	   if(formEl.attr("id")=="stepUpFormWithAI2"){ //or more
          //loop thru the current state then update what we have by cfreateing the form value then append to the
      		//dynamic invisible form element to be sent to database
		     //ie. gen form data on fly not added to the dom itself. just a temp usage
		       formEl = $("#stepUpFormWithAI2");
			
		if(state){
           formEl = $("#stepUpFormWithAI2");
		      	console.log(state)
		  //recreate the form data with the state changed value by filling it with what was typed before
          //url will be an update method if the resource exists
		  let textEditors = [
		    "learning_expectation",
		    "description","prerequisite", 
			"overview","curriculum"
		  ];
		  let new_form = $("<form id='quickform-update-onfly' method='patch' enctype='application/x-www-form-urlencoded'></form>")
          for(var k in state){
            console.log(k + " : " + state[k]) 
			if(k=="card_image" || k=="intro_video"){
				//for uploads handle this when agreed upon change made for video upload of intro_video bcus there is no where to upload files on backend
				
			}else if(k=="authoring_team"){
				//now clone and append the jetpacks of all my collaborators
				
				
				let template = `<input name="${k}" style='display:none' value="${state[k]}">`;
			    new_form.append(template)
				console.log(k,state[k])
      
				
			}else{
				let template = `<input name="${k}" style='display:none' value="${state[k]}">`;
			    new_form.append(template)
			}
			
			//for booleans checks
			
		  }
		  formEl =    new_form;//$("#stepUpFormWithAI2"); // switch to a new fly form
		  
		  
		 
		}
		 
	   }
        
  

  if(formEl.attr("id")=="myModalMarkdownEditor-SELECT"){
        document.getElementById("lesson-editor-id").value = localStorage.getItem("ls_tracker") 
        formData.append("lesson", localStorage.getItem("ls_tracker"))
        form = $("#"+ "myModalMarkdownEditor-SELECT")[0]  
  }else if(formEl.attr("id")=="myModalGenericForm-SELECT"){
         document.getElementById("lesson-editor-id2").value = localStorage.getItem("ls_tracker") 
        form = $("#"+ "myModalGenericForm-SELECT")[0]  
        formData.append("lesson", localStorage.getItem("ls_tracker"))
  }else {
    //problem and discussion
  }
        //no validation for now
  

  // }
  // }
  let data = null;
  let jsonData = {};
  let dataType =""
  let lessonData = {};
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
      
      //if its only lesson component, data sent has been trasformed above
      if(formEl.attr("id")=="myModalMarkdownEditor-SELECT" 
            || formEl.attr("id")=="myModalGenericForm-SELECT" 
             ){

        contentType ="application/x-www-form-urlencoded; charset=UTF-8";
        // dataType ="json";

        data = formEl.serialize();

      }else{
        contentType = "application/x-www-form-urlencoded; charset=UTF-8"
        data = formEl.serialize();
      }


      
    }
  }

  console.log(data);
  let type = "POST"

  if(formEl.attr("method") == "put"|| formEl.attr("method") == "PUT"){
    type ="PUT"
  }else if(mode){
    if(mode.toLowerCase() !=="post" ){
       type = "PATCH"
    }

  }
  

  //switching between the mode cases
  // if(formEl.attr("method") =="put"){
  //     type = "PUT"
  // }else if(mode.toLowerCase() !=="put"){

  //   if(mode.toLowerCase() !=="post" ){
  //      type = "PATCH"
  //   }else{
  //      type = "POST"
  //   }

  // }
  


  



    
  
   let httpRequestAjax = $.ajax({
    url: url,
    // method: "POST",
    type:type,
    // data:formData, //multipart form
    // data: JSON.stringify(data), // if not multipart form
    // contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+) multipart
    // processData: false, // NEEDED, DON'T OMIT THIS  multipart
    contentType:  contentType,   //"application/x-www-form-urlencoded; charset=UTF-8", //enc
    data: data, //
    // headers: {// multipart
    //   'Accept': "application/json 'text/html; q=1.0, */*"  // let the backend accepts html element of the form data request instead of jsons
    // },
  });

   

  //make the post request
  
let dataObj ={}
  /*jquery always ajax method used instead of success and error*/
  httpRequestAjax.always(function (data, textStatus, jqXHR) {
    
    console.log(textStatus)
    if (textStatus != "success") {
      jqXHR = data;
      dataObj.data=  data;
      console.log(data)
      // alert.success("Success", "Created a resource");
     
      if(formEl.attr("id")=="create-course" || formEl.attr("id")=="stepUpFormWithAI2"){
          if(mode.toLowerCase() =="post"){
              swal("Sorry", "Failed to create the resource. Ensure to fill the required fields for course name, course code, institution and select an authoring team", "error");
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

      //edit section

      
      if(formEl.attr("id")=="form-edit-section"){
          if(mode.toLowerCase() =="patch"){ // this is apatch
              swal("Sorry", "Failed to update the section", "error");
           }
      }


      //delete section

      if(formEl.attr("id")=="form-delete-section"){
          if(mode.toLowerCase() =="delete"){
              swal("Sorry", "Failed to delete the section", "error");
           }
      }

      //edit subsection

      //delete subsection form-edit-subsection: form-edit-subsection

      if(formEl.attr("id")=="form-edit-subsection"){
          if(mode.toLowerCase() =="patch"){ // this is apatch
              swal("Sorry", "Failed to update the section", "error");
           }
      }


      //delete section

      if(formEl.attr("id")=="form-delete-subsection"){
          if(mode.toLowerCase() =="delete"){
              swal("Sorry", "Failed to delete the section", "error");
           }
      }


      if(formEl.attr("id")=="addLessonSectionForm"){
          if(mode.toLowerCase() =="post"){
              swal("Sorry", "Failed to create the Lesson Section . You can not add any component to the lesson", "error");
           }else{
              swal("Sorry", "Failed to update changes on this section", "error");
           }
      }

      //edit lesson

      //delete lessons

      if(formEl.attr("id")=="form-edit-lesson"){
          if(mode.toLowerCase() =="patch"){ // this is apatch
              swal("Sorry", "Failed to update the lesson", "error");
           }
      }


      //delete section

      if(formEl.attr("id")=="form-delete-lesson"){
          if(mode.toLowerCase() =="delete"){
              swal("Sorry", "Failed to delete the lesson", "error");
           }
      }


      //component creation
      if(formEl.attr("id")=="myModalMarkdownEditor-SELECT" 
            || formEl.attr("id")=="myModalGenericForm-SELECT" ){
          if(mode.toLowerCase() =="post"){
              swal("Sorry", "Failed to create the Lesson component . ", "error");
           }else{
              swal("Sorry", "Failed to update changes on this section", "error");
           }
      }

    } else {

       if(formEl.attr("id")=="create-course" || formEl.attr("id")=="quickform-update-onfly"){
      
           if(mode.toLowerCase() =="post"){
              localStorage.setItem("name","")
              localStorage.setItem("code","")
              localStorage.setItem("author","")
              localStorage.setItem("institution","")
              toast.success("You successfully created a course");

              showNotificationSuccess("success", "New Course Created", "You successfully created a course")

                  
             // swal("Congratulations", "You successfully created a course", "success");
           }else{
             toast.success("You successfully edited this course");
             swal("Success", "Course Updated", "success");

             showNotificationSuccess("success", "Course Updated", "Course has been sucessfully updated")
              
           }

        }



        if(formEl.attr("id")=="addSectionForm"){
          if(mode.toLowerCase() =="post"){
           toast.success("You successfully created a section");

           showNotificationSuccess("success", "Section Creation", "You successfully created a section")
             


                  
             // swal("Congratulations", "You successfully created a course", "success");
           }else{
             toast.success("You successfully edited this course section");

            showNotificationSuccess("success", "Section Updated", "You successfully edited this course section")

              
           }
      }



      if(formEl.attr("id")=="addSubSectionForm"){
          if(mode.toLowerCase() =="post"){
           toast.success("You successfully created a sub section");

           showNotificationSuccess("success", "Sub Section Creation", "You successfully created a sub set section")
           
                  
             // swal("Congratulations", "You successfully created a course", "success");
           }else{
             toast.success("You successfully edited this course sub section");

              showNotificationSuccess("success", "Sub Section Edit", "You successfully edited this sub section")
           

              
           }
      }


      if(formEl.attr("id")=="addLessonSectionForm"){
          if(mode.toLowerCase() =="post"){
           toast.success("You successfully created a lesson section");

           showNotificationSuccess("success", "Lesson Creation", "You successfully created a Lesson section")
           
                  
             // swal("Congratulations", "You successfully created a course", "success");
           }else{
             toast.success("You successfully edited this course lesson section");
              showNotificationSuccess("success", "Lesson Update ", "You successfully updated the lesson")
           
           }
      }
     
      // alert.error("Failed to create the resource", "Error");

      

      if(formEl.attr("id")=="myModalMarkdownEditor-SELECT" 
            || formEl.attr("id")=="myModalGenericForm-SELECT"){
          if(mode.toLowerCase() =="post"){
           //   swal("Congratulations", "You successfully created a unit for this lesson", "success");
           // }else{
           //   swal("Congratulations", "You successfully updated the unit for this lesson section of this course", "success");
           // }
           toast.success("You successfully created a unit section");

           showNotificationSuccess("success", "Unit Created", "You successfully created a lesson unit or module")
           
                  
             // swal("Congratulations", "You successfully created a course", "success");
           }else{
             toast.success("You successfully edited this course unit section");
             showNotificationSuccess("success", "Unit Edited", "You successfully edited this lesson unit or module")
            
           }
       }
    }
    var responseContentType = jqXHR.getResponseHeader("content-type") || "";
    if (responseContentType.toLowerCase().indexOf("text/html") === 0) {
      // do something awesome like animate success box
      console.log(jqXHR.responseText, "text type");

       // dataObj.response = JSON.parse(jqXHR.responseText)
//      console.log(dataObj.response, dataObj.response.id)

       // return  jqXHR.responseText

    } else {
      // console.log(jqXHR.responseJSON);
      // console.log(JSON.parse(jqXHR.responseText), "here is the content");
      dataObj.response = JSON.parse(jqXHR.responseText)

      console.log(dataObj.response, dataObj.response.id)
      if(formEl.attr("id")=="create-course" || formEl.attr("id")=="stepUpFormWithAI2" ){
          if(mode.toLowerCase() =="post" && textStatus == "success"){
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
           showNotificationSuccess("error", "Section Creation Error", "An error occured while creating the resource. refresh and try again.")
           
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
           showNotificationSuccess("error", "Sub Section Creation Error", "An error occured while creating the resource. refresh and try again.")
           
          }else if(mode.toLowerCase() =="patch" && textStatus != "success"){
             // return dataObj.response.id
          }else{
             addSubSectionData(dataObj.response)
                 // return dataObj.response.id
          }
        }


        //discussion success error notification



       if(formEl.attr("id") == "addLessonSectionForm"  ){
          if(mode.toLowerCase() =="post" && textStatus != "success"){
            // window.location.href= process.env.PUBLIC_URL + "/authoring/create/new/"+ dataObj.response.id
           swal("Some error occured","error") // console the error response
          showNotificationSuccess("error", "Lesson Creation Error", "An error occured while creating the resource. refresh and try again.")
           
          }else if(mode.toLowerCase() =="patch" && textStatus != "success"){
             // return dataObj.response.id
          }else{
             addLessonData(dataObj.response)
            //return dataObj.response.id
          }
        }


        //finally for lesson components

        if(formEl.attr("id")=="myModalMarkdownEditor-SELECT" 
            || formEl.attr("id")=="myModalGenericForm-SELECT"  ||  formEl.attr("id")=="myModalMarkdownEditorEditMode-SELECT" 
            || formEl.attr("id")=="myModalGenericFormEditMode-SELECT" ){
          if(mode.toLowerCase() =="post" && textStatus != "success"){

            console.log(data, url)
            // window.location.href= process.env.PUBLIC_URL + "/authoring/create/new/"+ dataObj.response.id
           swal("Something went wrong","error") // console the error response
           showNotificationSuccess("error", "Lesson Module Creation Error", "An error occured while creating the resource. refresh and try again.")
           
          }else if(mode.toLowerCase() =="patch" || mode.toLowerCase() =="put" && textStatus == "success"){
              showNotificationSuccess("success", "Lesson Module Edit ", "The Module/course unit was saved successfully")
          
             return dataObj.response.id
             //fetch and update record seamlessly via ajax
          }else{
            // was implemented via another sequence
             // addUnitSectionData(dataObj.response) 

                return dataObj.response.id
          }
        }


        // this  for creation

        if(formEl.attr("id") == "myModalDiscussionForm-CREATESELECT"  ){
          if(mode.toLowerCase() =="post" && textStatus != "success"){
            // window.location.href= process.env.PUBLIC_URL + "/authoring/create/new/"+ dataObj.response.id
           swal("Some error occured","error") // console the error response
           showNotificationSuccess("error", "Discussion Module Creation Error", "An error occured while creating the resource. refresh and try again.")
           
          }else if(mode.toLowerCase() =="patch" && textStatus != "success"){
             // return dataObj.response.id
          }else{
             showNotificationSuccess("Success Created Resource", "Discussion Module Creation ", "You have created a discussion module. you can click to edit")
             // addUnitSectionData(dataObj.response) // not yet implemented

             //get the parent lesson id and append the created component for discussion
          }
        }

        //myModalDiscussionForm-EDITSELECT for edit of discussion component
        if(formEl.attr("id") == "myModalDiscussionForm-EDITSELECT"  ){
          if(mode.toLowerCase() =="put" && textStatus != "success"){
            // window.location.href= process.env.PUBLIC_URL + "/authoring/create/new/"+ dataObj.response.id
           swal("Some error occured","error") // console the error response
           showNotificationSuccess("error", "Discussion Module Creation Error", "An error occured while creating the resource. Refresh and try again.")
           
          }else if(mode.toLowerCase() =="patch" && textStatus != "success"){
             // return dataObj.response.id
             swal("Some error occured","error") // console the error response
           showNotificationSuccess("error", "Discussion Module Creation Error", "An error occured while creating the resource. Refresh and try again.")
           
          }else{
             showNotificationSuccess("Success", "Discussion Module Edited ", "You have successfully edited this discussion module.")
             // addUnitSectionData(dataObj.response) // not yet implemented

             //get the parent lesson id and append the created component for discussion
          }
        }






      
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



export const getCourseData = async (id) => {
  let url = base_url + `/lms/api/course-content/${id}/`;
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
  let url = base_url + `/lms/api/sections/${courseId}/`;

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




export const  getSubSectionsOfSectionId= async (sectionId) => {
  let url = base_url + `/lms/api/subsections/${sectionId}/`;

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
export const getLessonsOfSubsection= async (subsectionId) => {
  let url = base_url + `/lms/api/lessons/${subsectionId}/`;

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
export const getComponentsOfLessons = async (lessonId) => {
  let url = base_url + `/lms/api/lesson-html-components/${lessonId}`;

  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      // console.log(data)
      return data
    });
}




export const getComponent = async (componentId, type) => {
  let bitUrls =`/lms/api/`
  let url = base_url 
  if(type==1){
    bitUrls = bitUrls + `video-component/`
    url = base_url+ bitUrls + `${componentId}`
  }else if(type==2){
    bitUrls = bitUrls + `html-component/`
     url = base_url+ bitUrls + `${componentId}`
  }else if(type==3){
   bitUrls = bitUrls + `problem-component/`
     url = base_url+ bitUrls + `${componentId}`
  }else{
     bitUrls = bitUrls + `discussion-component/`
     url = base_url+ bitUrls + `${componentId}`
  }

  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      // console.log(data)
      return data
    });
}


export const deleteApi =  async (urlBuild) =>  {
  let url= base_url + `/lms/api/delete/${urlBuild}/`;
  console.log(url);
  return fetch(url, {
    method:"delete",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json" // application/x-www-form-urlencoded; charset=UTF-8
    },
  })


}


export const getVideoComponentsOfLessons = async (lessonId) => {
  let url = base_url + `/lms/api/lesson-video-components/${lessonId}`;

  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
       return data
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
  let url = base_url + `/profile-resource/api/author-profile/${id}`;
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
