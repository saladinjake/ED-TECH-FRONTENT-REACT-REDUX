import React, { Fragment , useEffect, useState } from "react"
import $ from "jquery"
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';


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

		


   }


     



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
	 let Content = this.pbCreateNode('div', null , 'add item');
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
  const container = element.parentElement.parentElement;
  this.removeBlock(container);
}

removeBlock(container) {
  if (container !== null) container.remove(container);
}

componentDidMount = () => {
let that = this;
   	    this.Tabs = document.querySelectorAll(".modal-tab");
		this.TabContents = document.querySelectorAll(".modal-content");
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
  const Widget = e.target;
  const Type = Widget.getAttribute("data-type");
  let Target = this.activeBlock;
  let Title = Widget.querySelector("span").innerHTML;
  let Preview = document.querySelector(
    "#template-container > .pb-widget-preview"
  );
  let Clone = Preview.cloneNode(true);
  Clone.classList.add(Type);
  let that = this;
  Clone.querySelector("div").innerHTML = Title;
  Target.parentElement.appendChild(Clone);
  Target.parentElement.appendChild(that.PlaceholderTemplate());
  Target.remove(Target);
  this.closeModal();
};

handleWidgetRemove = widget => {
  widget.parentElement.remove(widget.parentElement);
};



 
render(){
	return (

 

<Fragment>
  <div class="builder">
    <div class="builder-header">
      <div class="builder-content">
       {/*		ACTION BUTTONS */}
        <div class="pb-actions">
          <span class="pb-add-row builder-btn">add</span>
        </div>
        

     {/* BLOCK SECTIONS */}
        <div class="pb-rows">
          <div class="pb-row" name="pb-row">
            <div class="builder-row-header">
              <span class="row-btn pb-handle fas fa-sort">handle</span>
              <div>SECTIONS</div>
              <span onClick={() => { this.handleRemoveClick(this)}} class="row-btn row-btn-right pb-remove fa fa-trash">remove</span>
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
              <span class="row-btn pb-handle fas fa-sort">handle</span>
              <div>Block</div>
              <span onClick={() => {this.handleRemoveClick(this)}} class="row-btn row-btn-right pb-remove fa fa-trash">remove</span>
            </div>
            <div class="pb-container">
              <div class="builder-row-content"></div>
            </div>
          </div>
         

          {/*	WIDGET SECTIONS */}
          <div class="pb-widget-preview">
            <span class="row-btn btn-widget pb-handle-widget fa fa-sort">handle</span>
            <div></div>
            <span class="row-btn btn-widget pb-remove fa fa-trash" onClick={() => { this.handleWidgetRemove(this)}}>delete</span>
          </div>


        </div>
      </div>
    </div>

    
    <div id="myModal" class="modal-build">
      <div class="modal-build-inner">
        <div class="modal-toolbar">
          <h2 class="modal-title">Wähle ein Widget 1</h2>
          <i id="pb-modal-close" class="fa fa-times"></i>
        </div>
        <div class="modal-tabs">
          <div class="modal-tab widgets-tab active-tab"><i class="tab-icon fas fa-hammer"></i>Textual Content</div>
          <div class="modal-tab background-tab"><i class="tab-icon fas fa-fill"></i> Media
          </div>
          <div class="modal-tab special-tab"><i class="tab-icon fas fa-star"></i> Specials
          </div>
        </div>
        <div class="modal-build-content widgets-tab active-content">
          <div class="pb-widget" data-template="[pb_text][/pb_text]" data-type="content-block"><i class="fas fa-heading"></i><span>TEXT</span></div>
          <div class="pb-widget" data-template="[pb_link][/pb_link]" data-type="content-block"><i class="fas fa-link"></i><span>HTML</span></div>
          <div class="pb-widget" data-template="[pb_button][/pb_button]" data-type="content-block"><i class="fas fa-square"></i><span>IFRAME</span></div>
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