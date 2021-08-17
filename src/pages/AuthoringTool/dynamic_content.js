import React, { Fragment , useEffect, useState } from "react"
import $ from "jquery"
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';

import { SideBar, OverviewDash } from "./sidebar";
import NavBar from "components/Navbar";

window.openModal = () =>{

}


class DynamicElements extends React.Component {
   constructor(props){
   	super(props)

   	    this.Tabs = null;
		this.TabContents = null;
		this.Widgets =null;
		this.AddButton = null;
		this.Block = null;
		this.Blocks = null;
		this.ModalClose = null;

		this.Modal = null;
		this.activeBlock = null;
		this.state ={
			lessonCounter: 1
		}

		


   }


  handleIncrement = () => {
     this.setState({lessonCounter:
     	(prevCount )=> prevCount + 1});
  };

  //Create handleDecrement event handler
 handleDecrement = () => {
     this.setState({lessonCounter: (prevCount) => prevCount - 1});
  };


     



	handleAddClick = e => {
	  e.preventDefault();
	  this.addBlock();
	};

	addBlock() {
	let that = this;
	  let Clone = this.Block.cloneNode(true);
	  Clone.querySelector(".builder-row-content").appendChild(
	    that.PlaceholderTemplate()
	  );
	  // Clone.querySelector(".me-o")[0].innerHTML= "Lesson "+ this.state.lessonCounter
	  that.Blocks.appendChild(Clone);
	}

	PlaceholderTemplate = () => {

	 // add switching types
     

	  let Wrapper = this.pbCreateNode("div", [
	    { class: "pb-placeholder" },
	    // { onclick:  () => { "openModal(this)" }
	  ]);
	  let that = this;
	  Wrapper.addEventListener("click",function(e){
	  	that.openModal(this)
	  })
	 let Content = this.pbCreateNode('div', null , 'Add components');
	  Wrapper.appendChild(Content);
	  return Wrapper;
	};

	pbCreateNode = (type, props, html) => {
	  let element = document.createElement(type);
	  props &&
	    props.forEach(prop => {
	      let key = Object.keys(prop)[0];
	      let value = prop[key];
	      element.setAttribute(key, value);
	    });
	  html && (element.innerHTML = html);
	  return element;
	};

handleRemoveClick(element) {
  const container = element.target.parentElement.parentElement;
  this.removeBlock(container);
}

removeBlock(container) {
  if (container !== null) container.remove(container);
}

componentDidMount = () => {
let that = this;
   	    this.Tabs = document.querySelectorAll(".modal-tab");
		this.TabContents = document.querySelectorAll(".modal-build-content");
		this.Widgets = document.querySelectorAll(".pb-widget");
		this.AddButton = document.querySelector(".pb-add-row");
		this.Block = document.querySelector("#template-container > .pb-row");
		this.Blocks = document.querySelector(".pb-rows");
		this.ModalClose = document.querySelector("#pb-modal-close");

		this.Modal = document.getElementById("myModal");
		this.activeBlock = null;

  			// Listener
  		
		this.AddButton.addEventListener("click",that.handleAddClick);
		
		window.addEventListener("click",that.handleWindowClick);
		this.ModalClose.addEventListener("click", () => this.closeModal());

		// Sorting
		// jQuery Sorting Lib
		$(".pb-rows").sortable({
		  handle: ".pb-handle",
		  cursor: "grabbing"
		});

		// jQuery Sorting Lib
		$(".builder-row-content").sortable({
		  handle: ".pb-handle-widget",
		  cursor: "grabbing"
		});


  let IntialContent = document.querySelector(".builder-row-content");
  // intial placeholder to add widget
  
  IntialContent.appendChild(that.PlaceholderTemplate());
  this.Widgets.forEach(widget => {
    widget.onclick = that.handleWidgetClick;
  });
 
  this.Tabs.forEach(tab => {
    tab.onclick = that.handleTabClick;
  });



//editor tasks
$('#mineer a').click(function(e) {
  switch($(this).data('role')) {
    case 'h1':
    case 'h2':
    case 'p':
      document.execCommand('formatBlock', false, $(this).data('role'));
      break;
    default:
      document.execCommand($(this).data('role'), false, null);
      break;
    }
  update_output();
})

$('#editor').bind('blur keyup paste copy cut mouseup', function(e) {
  update_output();
})

function update_output() {
  $('#output').val($('#editor').html());
}




// raw html editor dynamic reation event handler
 function updateOutput() {
 	
 	$(".-vieweriframe-viewer").contents().find("html").html("<html><head><style type='text/css'>" + $("#cssPanel").val() + "</style></head><body>" + $("#htmlPanel").val() + "</body></html>");
 	
 	// document.getElementById("outputPanel").contentWindow.eval($("#javascriptPanel").val());
 	
 	
 	
 }
 
 $(".toggleButton").hover(function() {
 	
 	$(this).addClass("highlightedButton");
 	
 }, function() {
 	
 	$(this).removeClass("highlightedButton");
 	
 });
 
 $(".toggleButton").click(function() {
 	
 	$(this).toggleClass("active-viewer");
 	
 	$(this).removeClass("highlightedButton");
 	
 	var panelId = $(this).attr("id") + "Panel";
 	
 	$("#" + panelId).toggleClass("hidden");
 	
 	var numberOfActivePanels = 4 - $('.hidden').length;
 	
 	$(".panel-viewer").width(($(window).width() / numberOfActivePanels) - 10);
 	
 })
 
 $(".panel-viewer-viewer").height($(window).height() - $("#header").height() - 15);
 
 $(".panel-viewer-viewer-viewer").width(($(window).width() / 2) - 10);
 
 updateOutput();
 
 $("textarea-viewer").on('change keyup paste', function() {
 	
 	updateOutput();
 	
 	
 });







};


handleTabClick = tab => {
  const Tab = tab.target;
  this.Tabs.forEach(elem => {
    elem.classList.remove("active-tab");
  });
  this.TabContents.forEach(content => {
    content.classList.remove("active-content");
    if (content.classList.contains(tab.target.classList[1])) {
      content.classList.add("active-content");
    }
  });
  Tab.classList.add("active-tab");
};

handleWindowClick = e => {
  let that = this;
  if (e.target == this.Modal) {
    this.closeModal();
  }
};

openModal = block => {
  this.activeBlock = block;
  this.Modal.style.display = "block";
};

closeModal = () => {
  this.activeBlock = undefined;
  this.Modal.style.display = "none";
};

// Methods

handleWidgetClick = e => {
  let that = this;
  const Widget = e.target;
  const Type = Widget.getAttribute("data-type");
  const TemplateType = Widget.getAttribute("data-template")
  let Clone = null;
  alert(TemplateType)
  switch( TemplateType ){
  	case "[pb_text][/pb_text]":
  	   Clone = that.plainTextTemplate();
  	   break;
  	case "[pb_link][/pb_html]":
  	   Clone = that.rawHtmlTemplate();
  	   break;
  	case "[pb_iframe][/pb_iframe]":
  	   Clone = that.iframeTemplate()
  	   break;
  	case "[pb_slider][/pb_slider]":
  	   Clone = that.sliderImageTemplate();
  	   break;
  	case "[pb_image][/pb_image]":
  	   Clone = that.imageTemplate();
       break;
    case "[pb_video][/pb_video]":
       Clone = that.videoTemplate()
    default:
       Clone = that.plainTextTemplate()


        
        
        
        
        
  }


  
  let Target = this.activeBlock;
  let Title = Widget.querySelector("span").innerHTML;
  let Preview = document.querySelector(
    "#template-container > .pb-widget-preview"
  );
  let MainClone = Preview.cloneNode(true);
  MainClone.classList.add(Type);

  // MainClone.querySelector("div h5").innerHTML = Title;
  MainClone.querySelector("div").appendChild(Clone)
  Target.parentElement.appendChild(MainClone);
  Target.parentElement.appendChild(that.PlaceholderTemplate());
  Target.remove(Target);
  this.closeModal();
};


stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

handleWidgetRemove = widget => {
  widget.parentElement.remove(widget.parentElement);
};


plainTextTemplate(){



  let template = `<div class="container-fluid">
  <div class="row">
    <div id='editControls' class="col-md-12">
      <h1>Text Editor</h1>
      <div class="card-box mineer" id="mineer">
        <a data-role='undo' href='#'><i class='fa fa-undo'></i></a>
        <a data-role='redo' href='#' ><i class='fa fa-repeat'></i></a>
        <a data-role='bold' href='#' ><i class='fa fa-bold'></i></a>
        <a data-role='italic' href='#' ><i class='fa fa-italic'></i></a>
        <a data-role='underline' href='#' ><i class='fa fa-underline'></i></a>
        <a data-role='strikeThrough' href='#' ><i class='fa fa-strikethrough'></i></a>
        <a data-role='justifyLeft' href='#' ><i class='fa fa-align-left'></i></a>
        <a data-role='justifyCenter' href='#' ><i class='fa fa-align-center'></i></a>
        <a data-role='justifyRight' href='#' ><i class='fa fa-align-right'></i></a>
        <a data-role='justifyFull' href='#' ><i class='fa fa-align-justify'></i></a>
        <a data-role='indent' href='#' ><i class='fa fa-indent'></i></a>
        <a data-role='outdent' href='#' ><i class='fa fa-outdent'></i></a>
        <a data-role='insertUnorderedList' href='#' ><i class='fa fa-list-ul'></i></a>
        <a data-role='insertOrderedList' href='#' ><i class='fa fa-list-ol'></i></a>
        <a data-role='h1' href='#' >h<sup>1</sup></a>
        <a data-role='h2' href='#' >h<sup>2</sup></a>
        <a data-role='h2' href='#' >h<sup>3</sup></a>
        <a data-role='h2' href='#' >h<sup>4</sup></a>
        <a data-role='h2' href='#' >h<sup>5</sup></a>
        <a data-role='h2' href='#' >h<sup>6</sup></a>
        <a data-role='p' href='#' >p</a>
        <a data-role='subscript' href='#' ><i class='fa fa-subscript'></i></a>
        <a data-role='superscript' href='#' ><i class='fa fa-superscript'></i></a>
      </div>
    </div>
    <div id='editor' contenteditable class="container">
      <h1>This is a title!</h1>
      <p>This is just some example text to start us off</p>
    </div>
    <textarea id='output' class="col-md-12"></textarea>
  </div>
</div>`

  return this.stringToHTML(template)
}


rawHtmlTemplate() {
	let template =`
	<div class="container-fluid">
  <div class="row">
    <div  class="col-md-12">


	<div id="header-viewer" class="container-fluid">

		<div id="logo-viewer">

			Raw Html

		</div>

		<div id="buttonContainer">

		<div class="toggleButton active" id="html-viewer" >HTML</div>

		

			<div class="toggleButton active" id="output-rviewer">Preview</div>

		</div>

	</div>

	<div id="bodyContainer"  class="container">

		<textarea id="htmlPanel" class="panel-viewer textarea-viewer" placeholder="Place your HTML code here.."></textarea>

		<textarea id="cssPanel" class="panel-viewer hidden textarea-viewer" placeholder="Place your CSS code here.."></textarea>

		<textarea id="javascriptPanel" class="panel-viewer hidden textarea-viewer" placeholder="Place your Javascript code here.."></textarea>

		<iframe id="outputPanel" class="panel-viewer iframe-viewer"></iframe>


	</div>
	</div></div></div>

`
  return this.stringToHTML(template)
}

textEditorTemplate(){

}

iframeTemplate() {

}

fileUploadTemplate(){

}

videoTemplate() {

}

imageTemplate(){}

sliderImageTemplate(){}

discussionTemplate(){}



 
render(){
	return (

 

<Fragment>
<NavBar />
<br/><br/><br/>
  <div class="builder">
    <div class="builder-header">
      <div class="builder-content">
       {/*		ACTION BUTTONS */}
        <div class="pb-actions">
          <span class="pb-add-row builder-btn">Add Lesson</span>
        </div>
        

     {/* BLOCK SECTIONS */}
        <div class="pb-rows">
          <div class="pb-row" name="pb-row">
            <div class="builder-row-header">
              <span class="row-btn pb-handle fa fa-sort"></span>
              <div class="me-o">Lesson</div>
              <span onClick={this.handleRemoveClick} class="row-btn row-btn-right pb-remove fa fa-trash"></span>
            </div>
            <div class="pb-container">
              <div class="builder-row-content">

              </div>
            </div>
          </div>
        </div>

        <div id="template-container">
       


          <div class="pb-row" name="pb-row">
            <div class="builder-row-header">
              <span class="row-btn pb-handle fa fa-sort"></span>
              <div>Lesson 1.0</div>
              <span onClick={this.handleRemoveClick} class="row-btn row-btn-right pb-remove fa fa-trash"></span>
            </div>
            <div class="pb-container">
              <div class="builder-row-content"></div>
            </div>
          </div>
         

          {/*	WIDGET SECTIONS */}
          <div class="pb-widget-preview">
          <div style={{background:"#ebebeb"}}>
            <span class="row-btn btn-widget pb-handle-widget fa fa-sort" style={{float:"left"}}></span>
            <span class="row-btn btn-widget pb-remove fa fa-trash" style={{float:"right"}} onClick={this.handleWidgetRemove}></span>
         </div>
            <div style={{clear:"both"}}>
                 <h5></h5>
            </div>
             </div>


        </div>
      </div>
    </div>

    
    <div id="myModal" class="modal-build">
      <div class="modal-build-inner">
        <div class="modal-toolbar">
          <h2 class="modal-title">Select A Lesson Components</h2>
          <i id="pb-modal-close" class="fa fa-times"></i>
        </div>
        <div class="modal-tabs">
          <div class="modal-tab widgets-tab active-tab"><i class="tab-icon fas fa-hammer"></i>Textual Content</div>
          <div class="modal-tab background-tab"><i class="tab-icon fas fa-fill"></i> Interactivity
          </div>
          <div class="modal-tab special-tab"><i class="tab-icon fas fa-star"></i> Specials
          </div>
        </div>

        <div class="modal-build-content widgets-tab active-content">
          <div class="pb-widget" data-template="[pb_text][/pb_text]" data-type="content-block"><i class="fas fa-heading"></i><span>Plain Text</span></div>
          <div class="pb-widget" data-template="[pb_link][/pb_html]" data-type="content-block"><i class="fas fa-link"></i><span>Raw Html</span></div>
          <div class="pb-widget" data-template="[pb_iframe][/pb_iframe]" data-type="content-block"><i class="fas fa-square"></i><span>Iframe</span></div>
          <div class="pb-widget" data-template="[pb_slider][/pb_slider]" data-type="content-block">
            <div>
              <i class="fa fa-chevron-left"></i>
              <i class="fa fa-chevron-right"></i>
            </div>
            <span>Slider</span>
          </div>
          <div class="pb-widget" data-template="[pb_image][/pb_image]" data-type="content-block"><i class="fa fa-image"></i><span>Image</span></div>
          <div class="pb-widget" data-template="[pb_video][/pb_video]" data-type="content-block"><i class="fa fa-video"></i><span>Video</span></div>
        </div>
        <div class="modal-build-content background-tab">
          <div class="pb-widget" data-template="[pb_color_section][/pb_color_section]" data-type="background">
            <i class="fa fa-tint"></i><span>DISCUSSION</span></div>
          <div class="pb-widget" data-template="[pb_background_video][/pb_background_video]" data-type="background"><i class="fa fa-file-video"></i><span>NOTE</span></div>
          <div class="pb-widget" data-template="[pb_fullscreen_background][/pb_fullscreen_background]" data-type="background"><i class="fa fa-compress"></i><span>Multiple Choice</span></div>
        </div>
        <div class="modal-build-content special-tab">
          <div class="pb-widget" data-template="[pb_masonry][/pb_masonry]" data-type="special"><i class="fas fa-th-large"></i><span>Masonry</span></div>
          <div class="pb-widget" data-template="[pb_blog][/pb_blog]" data-type="special"><i class="fas fa-blog"></i><span>Blog</span></div>
        </div>
      </div>
    </div>
   

   </div>
</Fragment>

	)

}
}

export default DynamicElements