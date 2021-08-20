import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.css";

import { SideBar, OverviewDash } from "./sidebar";
import NavBar from "components/Navbar";

window.openModal = () => {};

function removeBlock(element) {
  // alert("triggered delete")
  const container = element.target.parentElement.parentElement;
  if (container !== null) container.remove(container);
}

class DynamicElements extends React.Component {
  constructor(props) {
    super(props);

    this.Tabs = null;
    this.TabContents = null;
    this.Widgets = null;
    this.AddButton = null;
    this.AddSubButton = null;
    this.Block = null;
    this.Blocks = null;
    this.ModalClose = null;

    this.Modal = null;
    this.activeBlock = null;
    this.ClonedModal = null;
    this.newElementCreated = null;
    this.state = {
      lessonCounter: 1,
      newElement: this.newElementCreated,
      targetParent: null,
    };
  }

  handleModalInputFromUser(e) {
    e.preventDefault();
    let titleName, sectionName;
    let that = this;
    // alert(that.state.newElement)
    if (that.state.newElement !== null) {
      switch (this.newElementCreated.dataset.previledges) {
        /*since user has clicked submit then show the new created element*/
        case "SECTION_CREATION":
          //get user input and set it on the cloned template
          titleName = $(that.state.newElement).find(".given-title_name")[0];
          sectionName = $(that.state.newElement).find(".given-section_id")[0];
          if ($("#title").val() == "" || $("#section_id").val() == "") {
            alert("You can not create an empty section title or id");
            return false;
          }
          titleName.innerHTML = $("#title").val();
          sectionName.innerHTML = $("#section_id").val();
          that.state.newElement.style.display = "block";
          //now display and append it
          that.state.newElement
            .querySelector(".builder-row-content")
            .appendChild(that.PlaceholderTemplate());
          that.Blocks.appendChild(that.state.newElement);

          break;
        case "SUB_SECTION_CREATION":
          //get user input and set it on the cloned template

          //get user input and set it on the cloned template
          titleName = $(that.state.newElement).find(".given-subtitle_name")[0];
          sectionName = $(that.state.newElement).find(
            ".given-subsection_id"
          )[0];

          if ($("#title").val() == "" || $("#section_id").val() == "") {
            alert("You can not create an empty section title or id");
            return false;
          }

          titleName.innerHTML = $("#title").val();
          sectionName.innerHTML = $("#section_id").val();
          that.state.newElement.style.display = "block";
          // that.state.newElement.style.position="relative"
          let div = document.createElement("div");
          div.style.display = "table";
          div.style.width = "100%";
          div.appendChild(that.state.newElement);
          // alert(that.state.targetParent)
          console.log(that.state.targetParent.innerHTML);

          that.state.targetParent.parentElement.parentElement.appendChild(div);
          break;
        case "LESSON_CREATION":
          //get user input and set it on the cloned template
          titleName = this.newElementCreated.querySelector(
            ".given-subtitle_name"
          );
          sectionName = this.newElementCreated.querySelector(
            ".given-subsection_id"
          );
          titleName.textContent = $("title").val();
          sectionName.textContent = $("section_id").val();
          break;
        case "SECTION_EDIT":
          //get user input and set it on the cloned template
          titleName = this.newElementCreated.querySelector(".given-title_name");
          sectionName = this.newElementCreated.querySelector(
            ".given-section_id"
          );
          titleName.textContent = $("title").val();
          sectionName.textContent = $("section_id").val();
          break;
        case "SUB_SECTION_EDIT":
          //get user input and set it on the cloned template
          titleName = this.newElementCreated.querySelector(".given-title_name");
          sectionName = this.newElementCreated.querySelector(
            ".given-section_id"
          );
          titleName.textContent = $("title").val();
          sectionName.textContent = $("section_id").val();
          break;
        case "LESSON_EDIT":
          //get user input and set it on the cloned template
          titleName = this.newElementCreated.querySelector(".given-title_name");
          sectionName = this.newElementCreated.querySelector(
            ".given-section_id"
          );
          titleName.textContent = $("title").val();
          sectionName.textContent = $("section_id").val();
          break;
        default:
          return 0;
      }
    }
  }

  handleIncrement = () => {
    this.setState({ lessonCounter: (prevCount) => prevCount + 1 });
  };

  //Create handleDecrement event handler
  handleDecrement = () => {
    this.setState({ lessonCounter: (prevCount) => prevCount - 1 });
  };

  handleAddClick = (e) => {
    e.preventDefault();
    this.addBlock();
  };

  handleAddSubClick = (e) => {
    e.preventDefault();
    this.addSubBlock(e);
  };

  addBlock() {
    /*NEW SECTION CREATION*/
    // alert("make parent section")
    this.handleIncrement();
    let that = this;
    let Clone = this.Block.cloneNode(true);
    this.newElementCreated = Clone; // keeps track of new element created on the fly
    this.newElementCreated.dataset.previledges = "SECTION_CREATION";

    this.newElementCreated.style.display = "none"; //hide it until user has hit save
    //if user hits the cancel btn in the modal then delete it
    this.newElementCreated.style.border = "1px solid #000";

    //no need to show the newly created element until user click the add button from the modal

    // this.newElementCreated.querySelector(".builder-row-content").appendChild(
    //   that.PlaceholderTemplate()
    // );
    // // Clone.querySelector(".me-o")[0].innerHTML= "Lesson "+ this.state.lessonCounter
    // that.Blocks.appendChild(that.newElementCreated);

    this.setState({ newElement: that.newElementCreated });
  }

  addSubBlock(e) {
    // alert("clicked to make sub section")
    this.handleIncrement();
    let that = this;
    let Clone = this.SubBlock.cloneNode(true);
    Clone.appendChild(that.PlaceholderTemplate());

    this.activeBlock = e.target;

    this.newElementCreated = Clone; // keeps track of new element created on the fly
    this.newElementCreated.dataset.previledges = "SUB_SECTION_CREATION";

    this.newElementCreated.style.display = "none"; //hide it until user has hit save
    //if user hits the cancel btn in the modal then delete it
    this.newElementCreated.style.border = "2px solid #f6f6f6";
    let targetParent = this.activeBlock.parentNode; //parentNode .parentElement.parentElement

    this.setState({
      newElement: that.newElementCreated,
      targetParent: targetParent,
    });
  }

  insertAfter(parent, newNode) {
    parent.insertBefore(newNode, parent.nextSibling);
  }

  insertBefore(element, newElement) {
    element.parentNode.insertBefore(newElement, element);
  }

  PlaceholderTemplate = () => {
    // add main sections
    let Wrapper = this.pbCreateNode("div", [
      { class: "pb-placeholder sub-block-event col-md-12" },
      // { onclick:  () => { "openModal(this)" }
    ]);

    let SubSectionWrapper = this.pbCreateNode("div", [
      { class: "pb-placeholder sub-block-event col-md-6" },
      // { onclick:  () => { "openModal(this)" }
    ]);

    SubSectionWrapper.setAttribute("href", "#myModalDynamicCreation");
    SubSectionWrapper.setAttribute("role", "button");
    SubSectionWrapper.setAttribute("data-toggle", "modal");

    let that = this;
    SubSectionWrapper.addEventListener("click", function (e) {
      that.addSubBlock(e);
    });
    let Content = this.pbCreateNode("div", null, "Add Sub Section");
    SubSectionWrapper.appendChild(Content);

    Wrapper.appendChild(SubSectionWrapper);

    let LessonWrapper = this.pbCreateNode("div", [
      { class: "pb-placeholder sub-block-event col-md-6" },
      // { onclick:  () => { "openModal(this)" }
    ]);
    LessonWrapper.style.backgroundColor = "rgba(8,23,200)";
    LessonWrapper.style.color = "#fff";

    LessonWrapper.addEventListener("click", function (e) {
      that.openModal(this);
    });

    let LessonWrapperContent = this.pbCreateNode(
      "div",
      null,
      "Add Lesson to Section"
    );
    LessonWrapper.appendChild(LessonWrapperContent);
    Wrapper.appendChild(LessonWrapper);

    return Wrapper;
  };

  // PlaceholderTemplateSubSection = () => {
  //   //add sub section template
  //   let Wrapper = this.pbCreateNode("div", [
  //     { class: "pb-placeholder" },
  //     // { onclick:  () => { "openModal(this)" }
  //   ]);
  //   let that = this;
  //   Wrapper.addEventListener("click",function(e){
  //     // that.openModal(this)
  //     that.addSubBlock(e)
  //   })
  //  let Content = this.pbCreateNode('div', null , 'Add  Lesson');
  //   Wrapper.appendChild(Content);
  //   return Wrapper;
  // };

  // PlaceholderTemplateLesson = () => {

  //  // add switching types

  //   let Wrapper = this.pbCreateNode("div", [
  //     { class: "pb-placeholder" },
  //     // { onclick:  () => { "openModal(this)" }
  //   ]);
  //   let that = this;
  //   Wrapper.addEventListener("click",function(e){
  //     that.openModal(this)

  //   })
  //  let Content = this.pbCreateNode('div', null , 'Add components');
  //   Wrapper.appendChild(Content);
  //   return Wrapper;
  // };

  pbCreateNode = (type, props, html) => {
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

  handleRemoveClick(element) {
    let that = this;

    removeBlock(element);
  }

  componentDidMount = () => {
    let that = this;
    this.Tabs = document.querySelectorAll(".modal-tab");
    this.TabContents = document.querySelectorAll(".modal-build-content");
    this.Widgets = document.querySelectorAll(".pb-widget");
    this.AddButton = document.querySelector(".pb-add-row");
    // this.AddSubButton = document.querySelector(".pb-add-row-sub");
    this.Block = document.querySelector("#template-container > .pb-row");
    this.Blocks = document.querySelector(".pb-rows");
    this.SubBlock = document.querySelector(
      "#template-container > .pb-row-subblock"
    );
    this.SubBlocks = document.querySelector(".pb-rows-sub");
    this.ModalClose = document.querySelector(".closeit");
    this.Modal = document.getElementById("myModal");
    // this.ClonedModal = document.querySelector(".modal-build")
    this.activeBlock = null;

    // Listener
    this.AddButton.addEventListener("click", that.handleAddClick);
    // this.AddSubButton.addEventListener("click", that.handleAddSubClick);
    window.addEventListener("click", that.handleWindowClick);
    document
      .querySelector(".builder")
      .addEventListener("click", (e) => this.handleClonedEvents(e));

    // Sorting
    // jQuery Sorting Lib
    $(".pb-rows").sortable({
      handle: ".pb-handle",
      cursor: "grabbing",
    });

    $(".pb-rows-sub").sortable({
      handle: ".pb-handle",
      cursor: "grabbing",
    });

    // jQuery Sorting Lib
    $(".builder-row-content").sortable({
      handle: ".pb-handle-widget",
      cursor: "grabbing",
    });

    let IntialContent = document.querySelector(".builder-row-content");
    // intial placeholder to add widget

    IntialContent.appendChild(that.PlaceholderTemplate());
    this.Widgets.forEach((widget) => {
      widget.onclick = that.handleWidgetClick;
    });

    this.Tabs.forEach((tab) => {
      tab.onclick = that.handleTabClick;
    });

    //editor tasks
    $("#mineer a").click(function (e) {
      switch ($(this).data("role")) {
        case "h1":
        case "h2":
        case "p":
          document.execCommand("formatBlock", false, $(this).data("role"));
          break;
        default:
          document.execCommand($(this).data("role"), false, null);
          break;
      }
      update_output();
    });

    $("#editor").bind("blur keyup paste copy cut mouseup", function (e) {
      update_output();
    });

    function update_output() {
      $("#output").val($("#editor").html());
    }

    // raw html editor dynamic reation event handler
    function updateOutput() {
      $(".-vieweriframe-viewer")
        .contents()
        .find("html")
        .html(
          "<html><head><style type='text/css'>" +
            $("#cssPanel").val() +
            "</style></head><body>" +
            $("#htmlPanel").val() +
            "</body></html>"
        );

      // document.getElementById("outputPanel").contentWindow.eval($("#javascriptPanel").val());
    }

    $(".toggleButton").hover(
      function () {
        $(this).addClass("highlightedButton");
      },
      function () {
        $(this).removeClass("highlightedButton");
      }
    );

    $(".toggleButton").click(function () {
      $(this).toggleClass("active-viewer");

      $(this).removeClass("highlightedButton");

      var panelId = $(this).attr("id") + "Panel";

      $("#" + panelId).toggleClass("hidden");

      var numberOfActivePanels = 4 - $(".hidden").length;

      $(".panel-viewer").width($(window).width() / numberOfActivePanels - 10);
    });

    $(".panel-viewer-viewer").height(
      $(window).height() - $("#header").height() - 15
    );

    $(".panel-viewer-viewer-viewer").width($(window).width() / 2 - 10);

    updateOutput();

    $("textarea-viewer").on("change keyup paste", function () {
      updateOutput();
    });
  };

  handleTabClick = (tab) => {
    const Tab = tab.target;
    this.Tabs.forEach((elem) => {
      elem.classList.remove("active-tab");
    });
    this.TabContents.forEach((content) => {
      content.classList.remove("active-content");
      if (content.classList.contains(tab.target.classList[1])) {
        content.classList.add("active-content");
      }
    });
    Tab.classList.add("active-tab");
  };

  handleWindowClick = (e) => {
    let that = this;
    if (e.target == this.Modal) {
      this.closeModal(e);
    }
  };

  openModal = (block) => {
    let that = this;
    this.activeBlock = block;
    // alert(block)
    that.ClonedModal = this.Modal.cloneNode(true);
    that.ClonedModal.style.display = "block";
    that.activeBlock.parentNode.parentNode.appendChild(that.ClonedModal);
    that.ClonedModal.setAttribute("id", new Date().toString());

    //this.Modal.style.display = "block";
  };

  closeModal = (e) => {
    // alert("try to clike me")
    this.activeBlock = undefined;
    // this.Modal.style.display = "none";
    this.ClonedModal.remove();
  };

  handleClonedEvents = (e) => {
    if (
      e.target.getAttribute("id") == "pb-modal-close" &&
      e.target.matches(".closeit") &&
      !e.target.matches(".pb-widget") &&
      !e.target.hasAttribute("data-template")
    ) {
      this.closeModal(e);
    } else if (e.target.matches(".fa-trash")) {
      removeBlock(e);
    } else if (
      e.target.matches(".pb-widget") &&
      e.target.hasAttribute("data-template") &&
      e.target.hasAttribute("data-type")
    ) {
      this.handleWidgetClick(e);
    }
  };

  // Methods

  handleWidgetClick = (e) => {
    let that = this;
    const Widget = e.target;
    const Type = Widget.getAttribute("data-type");
    const TemplateType = Widget.getAttribute("data-template");

    //widget

    let Target = this.activeBlock;
    let Title = Widget.querySelector("span").innerHTML;
    let Preview = document.querySelector(
      "#template-container > .pb-widget-preview"
    );
    let MainClone = Preview.cloneNode(true);
    MainClone.classList.add(Type);

    // MainClone.querySelector("div h5").innerHTML = Title;
    // MainClone.querySelector("div").appendChild(Clone)
    Target.parentNode.parentNode.appendChild(MainClone);
    // Target.parentElement.appendChild(that.PlaceholderTemplate());
    // Target.remove(Target);
    this.closeModal(e);
  };

  stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  handleWidgetRemove = (widget) => {
    widget.parentElement.remove(widget.parentElement);
  };

  plainTextTemplate() {
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
</div>`;

    return this.stringToHTML(template);
  }

  rawHtmlTemplate() {
    let template = `
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

`;
    return this.stringToHTML(template);
  }

  textEditorTemplate() {}

  iframeTemplate() {}

  fileUploadTemplate() {}

  videoTemplate() {}

  imageTemplate() {}

  sliderImageTemplate() {}

  discussionTemplate() {}

  render() {
    return (
      <Fragment>
        <NavBar />
        <br />
        <br />
        <br />
        <div class="builder">
          <div class="builder-header">
            <div class="builder-content">
              {/*    ACTION BUTTONS */}
              <div class="pb-actions">
                <a
                  class="pb-add-row builder-btn"
                  href="#myModalDynamicCreation"
                  role="button"
                  data-toggle="modal"
                >
                  Add Section
                </a>
              </div>

              {/* BLOCK SECTIONS */}
              <div class="pb-rows">
                <div
                  class="pb-row"
                  name="pb-row"
                  style={{ border: "1px solid #000" }}
                >
                  <div class="builder-row-header">
                    <span class="row-btn pb-handle fa fa-sort"></span>
                    <div class="given-title_name me-o">Create sections</div>
                    <span class="given-section_id"></span>
                    <span
                      onClick={this.handleRemoveClick}
                      class="row-btn row-btn-right pb-remove fa fa-trash"
                    ></span>
                  </div>
                  <div class="pb-container">
                    <div class="builder-row-content">
                      <div
                        class="pb-row-subblock pb-rows-sub"
                        name="pb-row-subblock"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="template-container">
                {/* Bloc Section */}
                <div class="pb-row" name="pb-row">
                  <div class="builder-row-header">
                    <span class="row-btn pb-handle fa fa-sort"></span>
                    <div class="given-title_name">Section 1 </div>
                    <span class="given-section_id">Empty</span>

                    <span
                      onClick={this.handleRemoveClick}
                      class="row-btn row-btn-right pb-remove fa fa-trash"
                    ></span>
                  </div>

                  <div class="pb-container">
                    <div class="builder-row-content">
                      <div class="pb-row-subblock" name="pb-row-subblock">
                        <div class="builder-row-header">
                          <span class="row-btn pb-handle fa fa-sort"></span>
                          {/*<div class="given-subtitle_name"></div>
                        <span class="given-subsection_id"></span>*/}
                          <span
                            onClick={this.handleRemoveClick}
                            class="row-btn row-btn-right pb-remove fa fa-trash"
                          ></span>
                        </div>

                        <div class="pb-container">
                          <div class="builder-row-content-subsection"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*Block sub sections*/}
                <div class="pb-row-subblock" name="pb-row-subblock">
                  <div class="builder-row-header">
                    <span class="row-btn pb-handle fa fa-sort"></span>
                    <div class="given-subtitle_name"></div>
                    <span class="given-subsection_id"></span>
                    <span
                      onClick={this.handleRemoveClick}
                      class="row-btn row-btn-right pb-remove fa fa-trash"
                    ></span>
                  </div>

                  <div class="pb-container">
                    <div class="builder-row-content-subsection"></div>
                  </div>
                </div>

                {/* WIDGET SECTIONS */}
                <div class="pb-widget-preview">
                  <div style={{ background: "#ebebeb" }}>
                    <div class="panel-heading">
                      <span
                        class="panel-title"
                        style={{
                          float: "left",
                          color: "#000",
                          marginLeft: "10px",
                        }}
                      >
                        Headings
                      </span>
                      <div class="actions" style={{ float: "right" }}>
                        <i class="pb-handle-widget fa fa-sort"></i>
                        <i
                          class="fa fa-refresh"
                          data-perform="panel-refresh"
                        ></i>
                        <i class="fa fa-expand"></i>
                        <i class="fa fa-chevron-down"></i>
                        <i class="fa fa-times"></i>
                        <i
                          class="pb-remove fa fa-trash"
                          onClick={this.handleWidgetRemove}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div style={{ clear: "both" }}>
                    <div class="container">
                      <div class="row">
                        <div class="col-md-10">
                          <div class="panel panel-dark">
                            <div class="panel-body">
                              <h4 class="a-text-place-holder1">
                                Adds a dummy information about the component
                              </h4>
                              <h5 class="a-text-place-holder1">
                                Adds more detail about
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*Lesson categories section*/}

                <div id="myModal" class="modal-build">
                  <div class="modal-build-inner">
                    <div class="modal-toolbar" style={{ background: "#fff" }}>
                      <h2 class="modal-title" style={{ display: "none" }}>
                        Select A Lesson Components
                      </h2>
                      <i
                        id="pb-modal-close"
                        class="fa fa-times closeit"
                        style={{ color: "rgba(8,23,200)" }}
                      ></i>
                    </div>

                    <div class="modal-tabs" style={{ display: "none" }}>
                      <div class="modal-tab widgets-tab active-tab">
                        <i class="tab-icon fa fa-hammer"></i>Textual Content
                      </div>
                    </div>

                    <div class="modal-build-content widgets-tab active-content container-fluid">
                      <div class="box-inset col-md-3">
                        <h1 style={{ marginTop: "100px" }}>html</h1>
                        <div class="wrapper-box">
                          <input type="checkbox" />
                          <div class="fab"></div>
                          <div class="fac">
                            <a
                              href="#"
                              data-title="html"
                              data-template="[pb_link][/pb_html]"
                              data-type="content-block"
                            >
                              <i class="fa fa-link"></i>HTML
                            </a>
                            <a
                              href="#"
                              data-title="iframe"
                              data-template="[pb_iframe][/pb_iframe]"
                              data-type="content-block"
                            >
                              <i class="fa fa-link"></i> IFRAME
                            </a>
                            <a
                              href="#"
                              data-template="[pb_video][/pb_video]"
                              data-type="content-block"
                            >
                              ANOTHER
                            </a>
                          </div>
                        </div>
                      </div>

                      <div class="box-inset col-md-3">
                        <h1 style={{ marginTop: "100px" }}>Problems</h1>
                        <div class="wrapper-box">
                          <input type="checkbox" />
                          <div class="fab"></div>
                          <div class="fac">
                            <a
                              href="#"
                              data-title="html"
                              data-template="[pb_link][/pb_html]"
                              data-type="content-block"
                            >
                              <i class="fa fa-link"></i>HTML
                            </a>
                            <a
                              href="#"
                              data-title="iframe"
                              data-template="[pb_iframe][/pb_iframe]"
                              data-type="content-block"
                            >
                              <i class="fa fa-link"></i> IFRAME
                            </a>
                            <a
                              href="#"
                              data-template="[pb_video][/pb_video]"
                              data-type="content-block"
                            >
                              ANOTHER
                            </a>
                          </div>
                        </div>
                      </div>

                      <div class="box-inset col-md-3">
                        <h1 style={{ marginTop: "100px" }}>html</h1>
                        <div class="wrapper-box">
                          <input type="checkbox" />
                          <div class="fab"></div>
                          <div class="fac">
                            <a
                              href="#"
                              data-title="html"
                              data-template="[pb_link][/pb_html]"
                              data-type="content-block"
                            >
                              <i class="fa fa-link"></i>HTML
                            </a>
                            <a
                              href="#"
                              data-title="iframe"
                              data-template="[pb_iframe][/pb_iframe]"
                              data-type="content-block"
                            >
                              <i class="fa fa-link"></i> IFRAME
                            </a>
                            <a
                              href="#"
                              data-template="[pb_video][/pb_video]"
                              data-type="content-block"
                            >
                              ANOTHER
                            </a>
                          </div>
                        </div>
                      </div>

                      <div class="box-inset col-md-3">
                        <h1 style={{ marginTop: "100px" }}>html</h1>
                        <div class="wrapper-box">
                          <input type="checkbox" />
                          <div class="fab "></div>
                          <div class="fac">
                            <a
                              href="#"
                              data-title="html"
                              data-template="[pb_link][/pb_html]"
                              data-type="content-block"
                            >
                              <i class="fa fa-link"></i>HTML
                            </a>
                            <a
                              href="#"
                              data-title="iframe"
                              data-template="[pb_iframe][/pb_iframe]"
                              data-type="content-block"
                            >
                              <i class="fa fa-link"></i> IFRAME
                            </a>
                            <a
                              href="#"
                              data-template="[pb_video][/pb_video]"
                              data-type="content-block"
                            >
                              ANOTHER
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* <div class="pb-widget col-md-3" data-title="html" data-template="[pb_link][/pb_html]" data-type="content-block"><i class="fas fa-link"></i><span>Raw Html</span></div>
          <div class="pb-widget col-md-3" data-title="iframe" data-template="[pb_iframe][/pb_iframe]" data-type="content-block"><i class="fa fa-square"></i><span>Iframe</span></div>
          <div class="pb-widget col-md-3" data-template="[pb_video][/pb_video]" data-type="content-block"><i class="fa fa-video-camera"></i><span>Video</span></div>
        */}
                    </div>
                    <div class="modal-build-content background-tab"></div>
                    <div class="modal-build-content special-tab"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Add edit modal for sections/sub sections/ lessons dynamic content */}

          <div
            style={{ marginTop: "80px" }}
            class="modal fade"
            id="myModalDynamicCreation"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title pull-left">Section Detail</h5>
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

                      <div class="form-group">
                        <label>Section ID</label>
                        <input
                          type="text"
                          class="form-control"
                          id="section_id"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button
                    onClick={(e) => {
                      this.handleModalInputFromUser(e);
                    }}
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
        </div>
      </Fragment>
    );
  }
}

export default DynamicElements;
