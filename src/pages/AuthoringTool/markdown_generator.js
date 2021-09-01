import React, { Fragment } from "react";
import $ from "jquery";

const uuid = () => {
  var now = new Date();

  var timestamp = now.getFullYear().toString();
  timestamp += (now.getMonth < 9 ? "0" : "") + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
  timestamp += (now.getDate < 10 ? "0" : "") + now.getDate().toString(); // pad with a 0

  return timestamp;
};

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

export const getTemplateType = (templateType) => {
  let template = ``;
  let widgetModuleBlock = ``;
  let information = ``;

  /*the mark down templates that are used in quickly creating reusable units*/

  switch (templateType) {
    case "[pb_html][/pb_text]":
      template = `<div><p>Edit this text</p></div>`;
      break;
    case "[pb_html][/pb_iframe]":
    case "[pb_html][/pb_video]":
    case "[pb_html][/pb_you_tube]":
    case "[pb_html][/pb_vimeo]":
      template = `Edit this text`;
      break;
    case "[pb_html][/pb_common_problems]": // this can take all other forms of mark down
      template = `<div><p>Add all types of markdown here</p></div>`;
      break;
    case "[pb_html][/pb_checkboxes]":
      information = `You can use this template as a guide to the simple editor markdown and OLX markup to use for checkboxes problems. Edit this component to replace this template with your own assessment.

 

>>Add the question text, or prompt, here. This text is required.||You can add an optional tip or note related to the prompt like this. <<`;
      widgetModuleBlock = `[x] a correct answer

                        [ ] an incorrect answer

                        [ ] an incorrect answer

                        [x] a correct answer`;
      template = `<form class="form mainroot-authoring" autocomplete="off" >
<fieldset>
        <legend>${information}</legend>
        <div class="form__group_authoring_component">
            <!-- Checkbox selected -->
            <div class="form__checkbox">
              <input class="form__input" type="checkbox" id="checkbox-checked" checked>
              <label class="form__label" for="checkbox-checked">[ ] an incorrect answer</label>
            </div>
            <!-- // Checkbox selected -->

            <!-- Checkbox unselected -->
            <div class="form__checkbox">
              <input class="form__input" type="checkbox" id="checkbox">
              <label class="form__label" for="checkbox">[ ] an incorrect answer</label>
            </div>
            <!-- // Checkbox unselected -->

            <!-- Checkbox selected disabled -->
            <div class="form__checkbox">
              <input class="form__input" type="checkbox" id="checkbox-selected-disabled" >
              <label class="form__label" for="checkbox-selected-disabled">[x] an incorrect answer</label>
            </div>
            <!-- // Checkbox selected disabled -->

            <!-- Checkbox unselected disabled -->
            <div class="form__checkbox">
              <input class="form__input" type="checkbox" id="checkbox-unselected-disabled" >
              <label class="form__label" for="checkbox-unselected-disabled">an incorrect</label>
            </div>
            <!-- // Checkbox unselected disabled -->
        </div>
      </fieldset>

       </form>`;
      break;
    case "[pb_html][/pb_numeric_input]":
      information = `You can use this template as a guide to the simple editor markdown and OLX markup to use for numerical input problems. Edit this component to replace this template with your own assessment.
        
 

>>Add the question text, or prompt, here. This text is required.||You can add an optional tip or note related to the prompt like this. <<`;
      template = `<input type="number" />`;
      widgetModuleBlock = `=A+B`;

      break;

    case "[pb_html][/pb_text_input]":
      information = `You can use this template as a guide to the simple editor markdown and OLX markup to use for text input problems. Edit this component to replace this template with your own assessment.

 

>>Add the question text, or prompt, here. This text is required.||You can add an optional tip or note related to the prompt like this. <<

 

= the correct answer

or= optional acceptable variant of the correct answer

 `;
      template = `    <form class="form mainroot-authoring" autocomplete="off" >

      <fieldset>
        <legend>Input</legend>


        <!-- Default -->
        <div class="form__group_authoring_component">
          <label class="form__label" for="default">Default <sup>(optional)</sup></label>
          <input
            class="form__input"
            id="default"
            type="password"
            placeholder="Placeholder"
            aria-invalid="false"
          />
        </div>
        <!-- // Default -->

        <!-- Required -->
        <div class="form__group_authoring_component">
          <label class="form__label" for="required">Required</label>
          <input
            class="form__input"
            id="required"
            type="text"
            value="Hello World"
            placeholder="Placeholder"
            aria-invalid="false"
            required
          />
        </div>
        <!-- // Default -->

        <!-- Error -->
        <div class="form__group_authoring_component form__group_authoring_component--error">
          <label class="form__label" for="required">Error</label>
          <input
            class="form__input"
            id="required"
            type="text"
            placeholder="Placeholder"
            value="Hello World"
            required
            aria-invalid="true"
            aria-describedBy="required-error"
            />
          <span class="form__error" id="required-error" class="">This is an error</span>
        </div>
        <!-- // Error -->

      </fieldset>
</form>`;
      break;
    case "[pb_html][/pb_multichoice]":
      template = ``;
      widgetModuleBlock = `( ) an incorrect answer

                          (x) the correct answer

                          ( ) an incorrect answer`;
      break;
    case "[pb_html][/pb_text_input]":
      template = ``;
      break;
    case "[pb_html][/pb_dropdown]":
      information = `You can use this template as a guide to the simple editor markdown and OLX markup to use for dropdown problems. Edit this component to replace this template with your own assessment.

>>Add the question text, or prompt, here. This text is required.||You can add an optional tip or note related to the prompt like this. <<`;
      widgetModuleBlock = `[[

              an incorrect answer

              (the correct answer)

              an incorrect answer

        ]]`;
      template = `<form class="form mainroot-authoring" autocomplete="off" >
              <fieldset>
        <legend>Dropdowns</legend>

        <!-- Disabled -->
        <div class="form__group_authoring_component form__group_authoring_component--disabled">
          <label class="form__label" for="select-disabled">Disabled field</label>
          <div class="form__select_authoring_component">
            <select class="form__input" id="select-disabled" aria-invalid="false" disabled>
              <option value="disabled selected">Select</option>
              <option value="item1">Option 1</option>
              <option value="item2">Option 2</option>
              <option value="item3">Option 3</option>
              <option value="item4">Option 4</option>
              <option value="item5">Option 5</option>
            </select>
          </div>
        </div>
        <!-- // Disabled -->

        <!-- Default -->
        <div class="form__group_authoring_component">
        <label class="form__label" for="select-default">Default field</label>
        <div class="form__select_authoring_component">
          <select
            class="form__input"
            id="select-default"
            aria-invalid="false"
            required
          >
            <option value="" disabled selected>Select</option>
            <option value="item1">Value not selected</option>
            <option value="item2">Umm.... nothing here</option>
            <option value="item3">Not this one either</option>
            <option value="item4">Yep this too</option>
            <option value="item5">Sadly not this one either :(</option>
          </select>
        </div>
      </div>
      <!-- // Default -->

      <!-- Selected -->
      <div class="form__group_authoring_component">
        <label class="form__label" for="select-value">Selected</label>
        <div class="form__select_authoring_component">
          <select class="form__input" id="select-value" aria-invalid="false">
            <option value="item1">Value not selected</option>
            <option value="item2" selected>Value selected</option>
            <option value="item3">Not this one either</option>
            <option value="item4">Yep this too</option>
            <option value="item5">Sadly not this one either :(</option>
          </select>
        </div>
      </div>
      <!-- // Selected -->

      <!-- Error -->
      <div class="form__group_authoring_component form__group_authoring_component--error">
        <label class="form__label" for="select-error">Error</label>

        <div class="form__select_authoring_component">
          <select
            class="form__input"
            id="select-default"
            aria-invalid="true"
            aria-describedBy="select-error"
          >
            <option value="disabled selected">Select</option>
            <option value="item1">Value not selected</option>
            <option value="item2" selected>Value selected</option>
            <option value="item3">Not this one either</option>
            <option value="item4">Yep this too</option>
            <option value="item5">Sadly not this one either :(</option>
          </select>
        </div>
        <span class="form__error" id="select-error">This is an error</span>
      </div>
      <!-- // Error -->

      </fieldset>



        </form>`;
      break;
    case "[pb_html][/pb_dropdown_feed]":
      template = ``;
      widgetModuleBlock = ``;
      information = ``;
      break;
    case "[pb_html][/pb_checkboxes_feed]":
      template = ``;
      widgetModuleBlock = ``;
      information = ``;
      break;
    case "[pb_html][/pb_text_input_feed]":
      information = ``;
      widgetModuleBlock = ``;
      template = `<form class="form mainroot-authoring" autocomplete="off" >
<fieldset>
        <legend>Input with Hint</legend>

        <!-- Default with Hint -->
        <div class="form__group_authoring_component">
          <label class="form__label" for="default-hint">Default with Hint</label>
          <input
            class="form__input"
            id="default-hint"
            type="text"
            placeholder="Placeholder"
            value="Hello World"
            aria-invalid="false"
            aria-describedBy="default-hint"
          />
          <span class="form__hint" id="default-hint">This is a hint</span>
        </div>
        <!-- // Default with Hint -->

        <!-- Default with Hint -->
        <div class="form__group_authoring_component form__group_authoring_component--error">
          <label class="form__label" for="Error-hint">Error with Hint</label>
          <input
            class="form__input"
            id="Error-hint"
            type="text"
            placeholder="Placeholder"
            value="Hello World"
            aria-invalid="true"
            aria-describedBy="Error-hint-error Error-hint"
          />
          <span class="form__error" id="Error-hint-error" class="">This is an error</span>
          <span class="form__hint" id="Error-hint">This is a hint</span>
        </div>
        <!-- // Default with Hint -->

      </fieldset>

       </form>`;
      break;
    case "[pb_html][/pb_multiple_choice_feed]":
      information = `You can use this template as a guide to the simple editor markdown and OLX markup to use for multiple choice problems. Edit this component to replace this template with your own assessment.

 

>>Add the question text, or prompt, here. This text is required.||You can add an optional tip or note related to the prompt like this. <<`;
      template = ``; //your multiple choice radio template
      widgetModuleBlock = `( ) an incorrect answer

                           (x) the correct answer

                           ( ) an incorrect answer`;
      break;
    case "[pb_html][/pb_broadcasting]": //broadcast template
      template = ``;
      widgetModuleBlock = ``;
      information = ``;
      break;
    case "[pb_html][/pb_confrencing]": //confrence template
      template = ``;
      break;

    case "[pb_html][/pb_text_area]": //textarea template
      widgetModuleBlock = ``;
      information = ``;
      template = `<form class="form mainroot-authoring" autocomplete="off" >

<fieldset>
        <legend>Textarea</legend>

        <!-- Disabled -->
        <div class="form__group_authoring_component form__group_authoring_component--disabled">
          <label class="form__label" for="textarea-disabled">Disabled field</label>
          <textarea
            rows="7"
            class="form__input"
            id="textarea-disabled"
            type="text"
            placeholder="Placeholder"
            aria-invalid="false"
            disabled></textarea>
        </div>
        <!-- // Disabled -->

        <!-- Default -->
        <div class="form__group_authoring_component">
          <label class="form__label" for="textarea-disabled"> Default field</label>
          <textarea
            rows="7"
            class="form__input"
            id="textarea-disabled"
            type="text"
            placeholder="Placeholder"
            aria-invalid="false">Hello World</textarea>
        </div>
        <!-- // Disabled -->

        <!-- Default -->
        <div class="form__group_authoring_component form__group_authoring_component--error">
          <label class="form__label" for="textarea-disabled">Error</label>
          <textarea
            rows="7"
            class="form__input"
            id="textarea-disabled"
            type="text"
            placeholder="Placeholder"
            aria-invalid="true"
            aria-describedBy="textarea-error">Hello World</textarea>
          <span class="form__error" id="textarea-error" class="">This is an error</span>
        </div>
        <!-- // Disabled -->

      </fieldset>

       </form>`;
      break;
    case "[pb_html][/pb_button]": //button template
      template = `<form class="form mainroot-authoring" autocomplete="off" >

<fieldset>
        <legend>Buttons</legend>

        <!-- Button Primary -->
        <div class="form__group_authoring_component">
          <button class="btn--primary">Button label</button>
          <button class="btn--primary" disabled>Button label</button>
        </div>
        <!-- // Button Primary -->
        <!-- Button Secondary -->
        <div class="form__group_authoring_component">
          <button class="btn--secondary">Button label</button>
          <button class="btn--secondary" disabled>Button label</button>
        </div>        
        <!-- // Button Secondary -->

        <div class="form__group_authoring_component">
          <!-- Button Primary with icon right -->
          <button class="btn--primary">
            <span>Button label</span>
            <i class="icon icon-camera icon--lg"></i>
          </button>
          <!-- // Button with icon right -->
          

          <!-- Button Primary with icon left -->
          <button class="btn--primary">
            <i class="icon icon-camera icon--lg"></i>
            <span>Button label</span>
          </button>
          <!-- // Button with icon left -->

            
        </div>

        <div class="form__group_authoring_component">
          <!-- Button Secondary with icon left -->
          <button class="btn--secondary">
            <i class="icon icon-clock icon--lg"></i>
            <span>Button label</span>
          </button>
          <!-- // Button Secondary with icon left -->


          <!-- Button Secondary with icon right -->
          <button class="btn--secondary">
            <span>Button label</span>
            <i class="icon icon-clock icon--lg"></i>
          </button>
          <!-- // Button Secondary with icon right -->

        </div>
      </fieldset>


       </form>`;
      break;
    case "[pb_html][/pb_radio]": // radio template
      template = `<form class="form mainroot-authoring" autocomplete="off" >
<fieldset>
        <legend>Radio Buttons</legend>

          <div class="form__group_authoring_component">
            
            <!-- Radio button selected -->
            <div class="form__radio">
              <input class="form__input" type="radio" name="options" value="item 1" id="radio-selected" checked>
              <label class="form__label" for="radio-selected">Radio button selected</label>
            </div>
            <!-- // Radio button selected -->

            <!-- Radio button unselected -->
            <div class="form__radio">
              <input class="form__input" type="radio" name="options" value="item 2" id="radio-unselected">
              <label class="form__label" for="radio-unselected">Radio button selected</label>
            </div>
            <!-- // Radio button unselected -->

            <!-- Radio button selected -->
            <div class="form__radio">
              <input class="form__input" type="radio" name="options-2" value="item 1" id="radio-selected-disabled" disabled checked>
              <label class="form__label" for="radio-selected-disabled">Radio button Selected Disabled</label>
            </div>
            <!-- // Radio button selected -->

            <!-- Radio button unselected -->
            <div class="form__radio">
              <input class="form__input" type="radio" name="options-2" value="item 2" id="radio-unselected-disabled" disabled>
              <label class="form__label" for="radio-unselected-disabled">Radio button Unselected Disabled</label>
            </div>
            <!-- // Radio button unselected -->
          </div>
      </fieldset>

       </form>`;
    default:
      return false;
  }

  return template;
};

//this is the editor box when edit is cliked in the authoring course creation
//for each component added on the fly
//it will take in props for the markup_tag eg [pb_html][pb_text]
//and preformats all the changes on imput change

//To do:
// parse content on input and preformat any that is a markup

class EditorBox extends React.Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.toolbar = null;
    this.buttons = null;
    this.contentArea = null;
    this.visuellView = null;
    this.htmlView = null;
    this.modal = null;

    this.handleSelectionChange.bind(this);

    /*for component creation*/
    this.activeBlock = null;
    this.ClonedModal = null;
    this.newElementCreated = null;
    this.state = {
      lessonCounter: 1,
      newElement: this.newElementCreated,
      targetParent: null,
    };
  }

  /*the main code wizard that ties everything together for the markdown input preprocessor*/
  /*this is handled in the component did mount*/
  updateHTML() {
    // initiate the mark down parser
    let mkdownparser = new MarkdownParser();
    mkdownparser.defaultCheck(); //called everytime update occurs on input change

    // var md = document.querySelector('.visuell-view').innerHTML; // the input board editor
    // var html = mkdownparser.parseMarkdown(md);  //the engine preprocessor
    // document.querySelector('.html').innerHTML = html; //output preview board
  }

  handleSelectionChange() {
    let that = this;
    document.addEventListener("selectionchange", that.selectionChange);
  }

  componentDidMount() {
    // define vars for the editing buttons and action
    this.editor = document.getElementsByClassName("editor-authoring")[0];
    this.toolbar = this.editor.getElementsByClassName(
      "authoring-edit-toolbar"
    )[0];
    this.buttons = this.toolbar.querySelectorAll(
      ".btn-action-editor:not(.has-submenu)"
    );
    this.contentArea = this.editor.getElementsByClassName("content-area")[0];
    this.visuellView = this.contentArea.getElementsByClassName(
      "visuell-view"
    )[0];
    this.htmlView = this.contentArea.getElementsByClassName("html-view")[0];
    this.modal = document.getElementsByClassName("modal")[0];
    let that = this;
    // add active tag event

    // add toolbar button actions
    for (let i = 0; i < that.buttons.length; i++) {
      let button = that.buttons[i];

      button.addEventListener("click", function (e) {
        let action = this.dataset.action;
        switch (action) {
          case "code":
            that.execCodeAction(this, that.editor);
            break;
          case "createLink":
            that.execLinkAction();
            break;
          default:
            that.execDefaultAction(action);
        }
      });
    }

    /* this is for live update with  the markdown  parser changing dynamically*/
    document
      .querySelector(".visuell-view")
      .addEventListener("input", that.updateHTML);
    this.updateHTML();
  }

  // this function toggles between visual and html view
  execCodeAction(button, editor) {
    if (button.classList.contains("active")) {
      // show visuell view
      this.visuellView.innerHTML = this.htmlView.value;
      this.htmlView.style.display = "none";
      this.visuellView.style.display = "block";

      button.classList.remove("active");
    } else {
      // show html view
      this.htmlView.innerText = this.visuellView.innerHTML;
      this.visuellView.style.display = "none";
      this.htmlView.style.display = "block";

      button.classList.add("active");
    }
  }

  // add link action
  execLinkAction() {
    this.modal.style.display = "block";
    let selection = this.saveSelection();

    let submit = this.modal.querySelectorAll("button.done")[0];
    let close = this.modal.querySelectorAll(".close")[0];
    let that = this;
    // done button active => add link
    submit.addEventListener("click", function () {
      let newTabCheckbox = that.modal.querySelectorAll("#new-tab")[0];
      let linkInput = that.modal.querySelectorAll("#linkValue")[0];
      let linkValue = linkInput.value;
      let newTab = newTabCheckbox.checked;

      that.restoreSelection(selection);

      if (window.getSelection().toString()) {
        let a = document.createElement("a");
        a.href = linkValue;
        if (newTab) a.target = "_blank";
        window.getSelection().getRangeAt(0).surroundContents(a);
      }

      that.modal.style.display = "none";
      linkInput.value = "";

      // deregister modal events
      submit.removeEventListener("click", arguments.callee);
      close.removeEventListener("click", arguments.callee);
    });

    // close modal on X click
    close.addEventListener("click", function () {
      let linkInput = that.modal.querySelectorAll("#linkValue")[0];

      that.modal.style.display = "none";
      linkInput.value = "";

      // deregister modal events
      submit.removeEventListener("click", arguments.callee);
      close.removeEventListener("click", arguments.callee);
    });
  }

  // executes normal actions
  execDefaultAction(action) {
    document.execCommand(action, false);
  }

  // saves the current selection
  saveSelection() {
    if (window.getSelection) {
      let sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        let ranges = [];
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
          ranges.push(sel.getRangeAt(i));
        }
        return ranges;
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
    return null;
  }

  // loads a saved selection
  restoreSelection(savedSel) {
    if (savedSel) {
      if (window.getSelection) {
        let sel = window.getSelection();
        sel.removeAllRanges();
        for (var i = 0, len = savedSel.length; i < len; ++i) {
          sel.addRange(savedSel[i]);
        }
      } else if (document.selection && savedSel.select) {
        savedSel.select();
      }
    }
  }

  // sets the current format buttons active/inactive
  selectionChange() {
    let that = this;

    for (let i = 0; i < that.buttons.length; i++) {
      let button = that.buttons[i];
      button.classList.remove("active");
    }

    this.parentTagActive(window.getSelection().anchorNode.parentNode);
  }

  parentTagActive(elem) {
    if (elem.classList.contains("visuell-view")) return false;

    let toolbarButton;

    // active by tag names
    let tagName = elem.tagName.toLowerCase();
    toolbarButton = document.querySelectorAll(
      `.authoring-edit-toolbar .btn-action-editor[data-tag-name="${tagName}"]`
    )[0];
    if (toolbarButton) {
      toolbarButton.classList.add("active");
    }

    // active by text-align
    let textAlign = elem.style.textAlign;
    toolbarButton = document.querySelectorAll(
      `.authoring-edit-toolbar .btn-action-editor[data-style="textAlign:${textAlign}"]`
    )[0];
    if (toolbarButton) {
      toolbarButton.classList.add("active");
    }

    return this.parentTagActive(elem.parentNode);
  }

  handleSaveComponentTextEditor = (e) => {
    let randId = uuid();
    let Target = $(".dynamo_" + localStorage.getItem("l_tracker"));

    let allowedHeaders = document.getElementById("myModalMarkdownEditor");
    let T = allowedHeaders.getAttribute("data-basestation");
    let markdownTemplate = allowedHeaders.getAttribute("data-markdown");
    let _title = allowedHeaders.getAttribute("data-title");

    // alert("its editorial")

    let Preview = document.querySelector(
      "#template-container > .pb-widget-preview-panel"
    );

    let SClone = Preview.cloneNode(true);

    let wrapWrapper = pbCreateNode("li", [
      { class: "pb-placeholder-main col-md-12" },
      // { onclick:  () => { "openModal(this)" }
    ]);

    wrapWrapper.appendChild(SClone);
    wrapWrapper.setAttribute("id", randId);
    let MainClone = wrapWrapper.cloneNode(true);
    MainClone.id = randId;

    MainClone.querySelector(".fa-edit").setAttribute(
      "data-template",
      markdownTemplate
    );
    MainClone.querySelector(".fa-edit").setAttribute("data-id", randId); //ref the curr main lesson box

    MainClone.querySelector(".fa-edit").addEventListener("click", (es) => {
      //alert(e.target)

      // if(e.target.dataset.template=="[pb_html][/pb_text]"){

      // alert("not working as expecte")
      /*just extracts and replace contents detail on edit*/

      const extracts = $("#" + MainClone.getAttribute("id"))
        .find(".unit_content_place_holder")
        .html();
      const editBoard = document
        .getElementById("myModalMarkdownEditorEditMode")
        .querySelector(".visuell-view2");
      editBoard.innerHTML = extracts;
      const markupBoard = document.getElementById("markup-template-content");
      markupBoard.innerHTML = markdownTemplate;

      // }
    });

    MainClone.querySelector(".unit_title_place_holder").textContent = _title; //no title initially for this comonent
    MainClone.querySelector(
      ".unit_content_place_holder"
    ).innerHTML = getTemplateType(markdownTemplate); //$(".visuell-view").html() || "Edit this content"
    const markupBoard = document.getElementById("markup-template-content");
    markupBoard.innerHTML = markdownTemplate;
    $(".visuell-view").html(getTemplateType(markdownTemplate));

    Target.append(MainClone);
  };

  render() {
    return <Fragment />;
  }
}

/*Now create the parser that parses the mark down*/
class MarkdownParser {
  constructor() {
    this.tagMatchers = [];
    //fill the parser on input change
    //just like a well in which you keep filling up water
    this.defaultCheck();
  }

  parseBlock(str) {
    return this.tagMatchers
      .reduce(function (prev, matcher) {
        return matcher.match(str) ? matcher : prev;
      })
      .stringify(str);
  }

  parseMarkdown(str) {
    return str
      .split("\n\n")
      .map(this.parseBlock)
      .reduce(function (base, val) {
        return base + val;
      });
  }

  defaultCheck() {
    //add mor markup chk
    //add more custom check for markup
    // Paragraph
    this.tagMatchers.push({
      match: function () {
        return true;
      },
      stringify: function (s) {
        return "<p>" + s + "</p>";
      },
    });

    // Heading level 1
    this.tagMatchers.push({
      match: function (s) {
        return s.charAt(0) === "#";
      },
      stringify: function (s) {
        return "<h1>" + s.substr(2) + "</h1>";
      },
    });

    // Heading level 2
    this.tagMatchers.push({
      match: function (s) {
        return s.substr(0, 2) === "##";
      },
      stringify: function (s) {
        return "<h2>" + s.substr(3) + "</h2>";
      },
    });

    // Blockquote
    this.tagMatchers.push({
      match: function (s) {
        return s.substr(0, 2) === "> ";
      },
      stringify: function (s) {
        return "<blockquote>" + s.substr(2) + "</blockquote>";
      },
    });

    // Preformatted
    this.tagMatchers.push({
      match: function (s) {
        return s.substr(0, 3) === "```";
      },
      stringify: function (s) {
        return "<pre>" + s.substr(3, s.length - 6).trim() + "</pre>";
      },
    });
  }
}

const LaunchEditBox = () => {};

const LaunchPreviewBox = () => {};

export default EditorBox;
