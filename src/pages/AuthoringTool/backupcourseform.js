import React, { Fragment , useEffect, useState } from "react"
import $ from "jquery"
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';


const DynamicElements = () => {
  const [activeBlocks,setActiveBlock] = useState(null)
  let [counterId, setCounterId] = useState(1);
  let activeBlock;

  const handleIncrement = () => {
     setCounterId(prevCount => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
     setCounterId(prevCount => prevCount - 1);
  };


window.openModal = block => {
  

  const Modal = document.getElementById("myModal");
  activeBlock = block;
  Modal.style.display = "block";
};

const openModal = block => {
  // let activeBlock;

  const Modal = document.getElementById("myModal");
  activeBlock = block;
  Modal.style.display = "block";
};

const closeModal = () => {
  // let activeBlock;

  const Modal = document.getElementById("myModal");
  activeBlock = undefined;
  Modal.style.display = "none";
  setCounterId(counterId++)
};


const handleAddClick = e => {
  e.preventDefault();
  addBlock();
};

function addBlock() {

  const Block = document.querySelector("#template-container > .pb-row");
  const Blocks = document.querySelector(".pb-rows");
  let Clone = Block.cloneNode(true);
  Clone.querySelector(".builder-row-content").appendChild(
    PlaceholderTemplate()
  );
  Blocks.appendChild(Clone);
  
}

const PlaceholderTemplate = () => {
 handleIncrement()
 let newId= "magic_node_"+ counterId
 //alert(newId)
  let Wrapper = pbCreateNode("div", [
    { class: `pb-placeholder ${newId}`, "title":  newId },
    { onclick: "openModal(this)" }
  ]);
  Wrapper.setAttribute("title",newId)
   Wrapper.setAttribute("id",newId)
 let Content = pbCreateNode('div', null , 'add item');
  Wrapper.appendChild(Content);
  console.log(Wrapper)

  return Wrapper;
};

const pbCreateNode = (type, props, html) => {
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

function handleRemoveClick(element) {
  const container = element.parentElement.parentElement;
  removeBlock(container);
}

function removeBlock(container) {
  if (container !== null) container.remove(container);
}

const componentDidMount = () => {
  let IntialContent = document.querySelector(".builder-row-content");
  const Tabs = document.querySelectorAll(".modal-tab");
	const TabContents = document.querySelectorAll(".modal-build-content");
const Widgets = document.querySelectorAll(".pb-widget");

  // intial placeholder to add widget
  IntialContent.appendChild(PlaceholderTemplate());
  Widgets.forEach(widget => {
    widget.onclick = handleWidgetClick;
  });
  Tabs.forEach(tab => {
    tab.onclick = handleTabClick;
  });
};


const handleTabClick = tab => {
  const Tab = tab.target;
  const Tabs = document.querySelectorAll(".modal-tab");
	const TabContents = document.querySelectorAll(".modal-build-content");

  Tabs.forEach(elem => {
    elem.classList.remove("active-tab");
  });
  TabContents.forEach(content => {
    content.classList.remove("active-content");
    if (content.classList.contains(tab.target.classList[1])) {
      content.classList.add("active-content");
    }
  });
  Tab.classList.add("active-tab");
};

const handleWindowClick = e => {
 
  const Modal = document.getElementById("myModal");

  if (e.target == Modal) {
    closeModal();
  }
};

// Methods

const handleWidgetClick = e => {
  const Widget = e.target;
  console.log(e.target.parentElement)
  if(localStorage.getItem("target_view")!=""){
    localStorage.setItem("target_view","magic_node_"+ counterId)
  }
  const Type = Widget.getAttribute("data-type");
  let Target = activeBlock;
  // console.log(Target)
  let Title = Widget.querySelector("span").innerHTML;
  let Preview = document.querySelector(
    "#template-container > .pb-widget-preview"
  );
  let Clone = Preview.cloneNode(true);
  Clone.classList.add(Type);
  Clone.querySelector("div").innerHTML = Title;
  Target.parentElement.appendChild(Clone);
  Target.parentElement.appendChild(PlaceholderTemplate());
  Target.remove(Target);
  closeModal();
};

const handleWidgetRemove = widget => {
  widget.parentElement.remove(widget.parentElement);
};



 useEffect(() => {



	

	
	const AddButton = document.querySelector(".pb-add-row");
	
	const ModalClose = document.querySelector("#pb-modal-close");

	// Modal

	 	// Listener
	AddButton.onclick = handleAddClick;
	window.onload = componentDidMount;
	window.onclick = handleWindowClick;
	ModalClose.onclick = () => closeModal();

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

 })

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
              <span onclick="handleRemoveClick(this)" class="row-btn row-btn-right pb-remove fa fa-trash">remove</span>
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
              <span onclick="handleRemoveClick(this)" class="row-btn row-btn-right pb-remove fa fa-trash">remove</span>
            </div>
            <div class="pb-container">
              <div class="builder-row-content"></div>
            </div>
          </div>
         

          {/*	WIDGET SECTIONS */}
          <div class="pb-widget-preview">
            <span class="row-btn btn-widget pb-handle-widget fa fa-sort">handle</span>
            <div></div>
            <span class="row-btn btn-widget pb-remove fa fa-trash" onclick="handleWidgetRemove(this)">delete</span>
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

export default DynamicElements