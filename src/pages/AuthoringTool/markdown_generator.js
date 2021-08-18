


      
      

      
      
      
      


const getTemplateType =  (templateType) => {
  let template = ``;
  
  switch( TemplateType ){
    case "[pb_html][/pb_text]":
      template =``;
       break;
    case "[pb_html][/pb_iframe]":
        template =``;
       break;
    case "[pb_html][/pb_common_problems]":
        template =``;
       break;
    case "[pb_html][/pb_checkboxes]":
       template =`<form class="form mainroot-authoring" autocomplete="off" >
<fieldset>
        <legend>Checkbox</legend>
        <div class="form__group_authoring_component">
            <!-- Checkbox selected -->
            <div class="form__checkbox">
              <input class="form__input" type="checkbox" id="checkbox-checked" checked>
              <label class="form__label" for="checkbox-checked">Checkbox Selected</label>
            </div>
            <!-- // Checkbox selected -->

            <!-- Checkbox unselected -->
            <div class="form__checkbox">
              <input class="form__input" type="checkbox" id="checkbox">
              <label class="form__label" for="checkbox">Checkbox unselected</label>
            </div>
            <!-- // Checkbox unselected -->

            <!-- Checkbox selected disabled -->
            <div class="form__checkbox">
              <input class="form__input" type="checkbox" id="checkbox-selected-disabled" checked disabled>
              <label class="form__label" for="checkbox-selected-disabled">Checkbox Disabled Selected</label>
            </div>
            <!-- // Checkbox selected disabled -->

            <!-- Checkbox unselected disabled -->
            <div class="form__checkbox">
              <input class="form__input" type="checkbox" id="checkbox-unselected-disabled" disabled>
              <label class="form__label" for="checkbox-unselected-disabled">Checkbox Disabled Unselected</label>
            </div>
            <!-- // Checkbox unselected disabled -->
        </div>
      </fieldset>

       </form>`;
       break;
    case "[pb_html][/pb_numeric_input]":
        template =``;
       break;

    case "[pb_html][/pb_text_input]":
       template =`    <form class="form mainroot-authoring" autocomplete="off" >

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
       template =``;
       break;
    case "[pb_html][/pb_text_input]":
        template =``;
       break;
    case "[pb_html][/pb_dropdown]":
        template =`<form class="form mainroot-authoring" autocomplete="off" >
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
        template =``;
       break;
    case "[pb_html][/pb_checkboxes_feed]":
        template =``;
       break;
    case "[pb_html][/pb_text_input_feed]":
       template =`<form class="form mainroot-authoring" autocomplete="off" >
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
        template =``;
       break;
    case "[pb_html][/pb_broadcasting]":
       template =``;
       break;
    case "[pb_html][/pb_confrencing]":
       template =``;
       break;

    case "[pb_html][/pb_video]":
       template =``;

    case "[pb_html][/pb_text_area]":
       template =`<form class="form mainroot-authoring" autocomplete="off" >

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

       </form>`
       break;
       case "[pb_html][/pb_button]":
       template = `<form class="form mainroot-authoring" autocomplete="off" >

<fieldset>
        <legend>Buttons</legend>

        <!-- Button Primary -->
        <div class="form__group_authoring_component">
          <button class="btn btn--primary">Button label</button>
          <button class="btn btn--primary" disabled>Button label</button>
        </div>
        <!-- // Button Primary -->
        <!-- Button Secondary -->
        <div class="form__group_authoring_component">
          <button class="btn btn--secondary">Button label</button>
          <button class="btn btn--secondary" disabled>Button label</button>
        </div>        
        <!-- // Button Secondary -->

        <div class="form__group_authoring_component">
          <!-- Button Primary with icon right -->
          <button class="btn btn--primary">
            <span>Button label</span>
            <i class="icon icon-camera icon--lg"></i>
          </button>
          <!-- // Button with icon right -->
          

          <!-- Button Primary with icon left -->
          <button class="btn btn--primary">
            <i class="icon icon-camera icon--lg"></i>
            <span>Button label</span>
          </button>
          <!-- // Button with icon left -->

            
        </div>

        <div class="form__group_authoring_component">
          <!-- Button Secondary with icon left -->
          <button class="btn btn--secondary">
            <i class="icon icon-clock icon--lg"></i>
            <span>Button label</span>
          </button>
          <!-- // Button Secondary with icon left -->


          <!-- Button Secondary with icon right -->
          <button class="btn btn--secondary">
            <span>Button label</span>
            <i class="icon icon-clock icon--lg"></i>
          </button>
          <!-- // Button Secondary with icon right -->

        </div>
      </fieldset>


       </form>`
       break;
      case "[pb_html][/pb_radio]":
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

       </form>`
    default:
       
       return false;
        
  }

  return template;
	
}


//this is the editor box when edit is cliked in the authoring course creation
//for each component added on the fly
//it will take in props for the markup_tag eg [pb_html][pb_text]
//and preformats all the changes on imput change

//To do:
// parse content on input and preformat any that is a markup


class EditorBox extends React.Component{
	constructor(props){
		super(props)
		this.editor = null;
		this.toolbar =null;
		this.buttons = null;
		this.contentArea = null;
		this.visuellView = null;
		this.htmlView = null;
		this.modal = null;
	}



    /*the main code wizard that ties everything together for the markdown input preprocessor*/
    /*this is handled in the component did mount*/
	updateHTML() {
		// initiate the mark down parser
		let mkdownparser = new MarkdownParser()
		mkdownparser.defaultCheck(); //called everytime update occurs on input change

		var md = document.querySelector('.editor-authoring').value; // the input board editor
		var html = mkdownparser.parseMarkdown(md);  //the engine preprocessor
		document.querySelector('.html').innerHTML = html; //output preview board
	}

	componentDidMount(){
		// define vars for the editing buttons and action
		this.editor = document.getElementsByClassName('editor-authoring')[0];
		this.toolbar = editor.getElementsByClassName('toolbar')[0];
		this.buttons = toolbar.querySelectorAll('.btn:not(.has-submenu)');
		this.contentArea = editor.getElementsByClassName('content-area')[0];
		this.visuellView = contentArea.getElementsByClassName('visuell-view')[0];
		this.htmlView = contentArea.getElementsByClassName('html-view')[0];
		this.modal = document.getElementsByClassName('modal')[0];
        let that = this;
		// add active tag event
		document.addEventListener('selectionchange', selectionChange);

		// add toolbar button actions
		for(let i = 0; i < buttons.length; i++) {
		  let button = buttons[i];
		  
		  button.addEventListener('click', function(e) {
		    let action = this.dataset.action;
		    switch(action) {
		      case 'code':
		        that.execCodeAction(this, editor);
		        break;
		      case 'createLink':
		        that.execLinkAction();
		        break;
		      default:
		        that.execDefaultAction(action);
		    }
		    
		  });
		}
       
      /* this is for live update with  the markdown  parser changing dynamically*/
		document.querySelector('.markdown').addEventListener('input', updateHTML);
        this.updateHTML();

	}



    // this function toggles between visual and html view
	execCodeAction(button, editor) {
      
	  if(button.classList.contains('active')) { // show visuell view
	    this.visuellView.innerHTML = htmlView.value;
	    this.htmlView.style.display = 'none';
	    this.visuellView.style.display = 'block';

	    button.classList.remove('active');     
	  } else {  // show html view
	    this.htmlView.innerText = visuellView.innerHTML;
	    this.visuellView.style.display = 'none';
	    this.htmlView.style.display = 'block';

	    button.classList.add('active'); 
	  }
	}

	// add link action
	execLinkAction() {  
	  this.modal.style.display = 'block';
	  let selection = saveSelection();

	  let submit = this.modal.querySelectorAll('button.done')[0];
	  let close = this.modal.querySelectorAll('.close')[0];
	  let that = this;
	  // done button active => add link
	  submit.addEventListener('click', function() {
	    let newTabCheckbox = that.modal.querySelectorAll('#new-tab')[0];
	    let linkInput = that.modal.querySelectorAll('#linkValue')[0];
	    let linkValue = linkInput.value;
	    let newTab = newTabCheckbox.checked;    
	    
	    that.restoreSelection(selection);
	    
	    if(window.getSelection().toString()) {
	      let a = document.createElement('a');
	      a.href = linkValue;
	      if(newTab) a.target = '_blank';
	      window.getSelection().getRangeAt(0).surroundContents(a);
	    }

	    that.modal.style.display = 'none';
	    linkInput.value = '';
	    
	    // deregister modal events
	    submit.removeEventListener('click', arguments.callee);
	    close.removeEventListener('click', arguments.callee);
	  });  
	  
	  // close modal on X click
	  close.addEventListener('click', function() {
	    let linkInput = that.modal.querySelectorAll('#linkValue')[0];
	    
	    that.modal.style.display = 'none';
	    linkInput.value = '';
	    
	    // deregister modal events
	    submit.removeEventListener('click', arguments.callee);
	    close.removeEventListener('click', arguments.callee);
	  });
	}

	// executes normal actions
	execDefaultAction(action) {
	  document.execCommand(action, false);
	}

	// saves the current selection
	saveSelection() {
	    if(window.getSelection) {
	        sel = window.getSelection();
	        if(sel.getRangeAt && sel.rangeCount) {
	            let ranges = [];
	            for(var i = 0, len = sel.rangeCount; i < len; ++i) {
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
	    if(savedSel) {
	        if(window.getSelection) {
	            sel = window.getSelection();
	            sel.removeAllRanges();
	            for(var i = 0, len = savedSel.length; i < len; ++i) {
	                sel.addRange(savedSel[i]);
	            }
	        } else if(document.selection && savedSel.select) {
	            savedSel.select();
	        }
	    }
	}

	// sets the current format buttons active/inactive
   selectionChange() {
	  
	  for(let i = 0; i < buttons.length; i++) {
	    let button = buttons[i];
	    button.classList.remove('active');
	  }
	  
	  this.parentTagActive(window.getSelection().anchorNode.parentNode);
	}

    parentTagActive(elem) {
	  if(elem.classList.contains('visuell-view')) return false;
	  
	  let toolbarButton;
	  
	  // active by tag names
	  let tagName = elem.tagName.toLowerCase();
	  toolbarButton = document.querySelectorAll(`.toolbar .btn[data-tag-name="${tagName}"]`)[0];
	  if(toolbarButton) {
	    toolbarButton.classList.add('active');
	  }
	  
	  // active by text-align
	  let textAlign = elem.style.textAlign;
	  toolbarButton = document.querySelectorAll(`.toolbar .btn[data-style="textAlign:${textAlign}"]`)[0];
	  if(toolbarButton) {
	    toolbarButton.classList.add('active');
	  }
	  
	  return this.parentTagActive(elem.parentNode);
	}

	render(){
		<div class="editor-authoring">
				  <div class="toolbar">
				    <div class="line">
				      
				      <div class="box">
				        <span class="btn icon smaller" data-action="bold" data-tag-name="b" title="Bold">
				          <img src="https://image.flaticon.com/icons/svg/25/25432.svg" />
				        </span>
				        <span class="btn icon smaller" data-action="italic" data-tag-name="i" title="Italic">
				          <img src="https://image.flaticon.com/icons/svg/25/25392.svg" />
				        </span>
				        <span class="btn icon smaller" data-action="underline" data-tag-name="u" title="Underline">
				          <img src="https://image.flaticon.com/icons/svg/25/25433.svg" />
				        </span>
				        <span class="btn icon smaller" data-action="strikeThrough" data-tag-name="strike" title="Strike through">
				          <img src="https://image.flaticon.com/icons/svg/25/25626.svg" />
				        </span>
				      </div>
				      
				      <div class="box">
				        <span class="btn icon has-submenu">
				          <img src="https://image.flaticon.com/icons/svg/25/25351.svg" />
				          <div class="submenu">
				            <span class="btn icon" data-action="justifyLeft" data-style="textAlign:left" title="Justify left">
				              <img src="https://image.flaticon.com/icons/svg/25/25351.svg" />  
				            </span>
				            <span class="btn icon" data-action="justifyCenter" data-style="textAlign:center" title="Justify center">
				              <img src="https://image.flaticon.com/icons/svg/25/25440.svg" />  
				            </span>
				            <span class="btn icon" data-action="justifyRight" data-style="textAlign:right" title="Justify right">
				              <img src="https://image.flaticon.com/icons/svg/25/25288.svg" />  
				            </span>
				            <span class="btn icon" data-action="formatBlock" data-style="textAlign:justify" title="Justify block">
				              <img src="https://image.flaticon.com/icons/svg/25/25181.svg" />  
				            </span>
				          </div>
				        </span>
				        <span class="btn icon" data-action="insertOrderedList" data-tag-name="ol" title="Insert ordered list">
				          <img src="https://image.flaticon.com/icons/svg/25/25242.svg" />  
				        </span>
				        <span class="btn icon" data-action="insertUnorderedList" data-tag-name="ul" title="Insert unordered list">
				          <img src="https://image.flaticon.com/icons/svg/25/25648.svg" />  
				        </span>
				        <span class="btn icon" data-action="outdent" title="Outdent">
				          <img src="https://image.flaticon.com/icons/svg/25/25410.svg" />  
				        </span>
				        <span class="btn icon" data-action="indent" title="Indent">
				          <img src="https://image.flaticon.com/icons/svg/25/25233.svg" />  
				        </span>
				        
				      </div>
				      <div class="box">
				        <span class="btn icon" data-action="insertHorizontalRule" title="Insert horizontal rule">
				          <img src="https://image.flaticon.com/icons/svg/25/25232.svg" />  
				        </span>
				      </div>
				      
				    </div>
				    <div class="line">
				      
				      <div class="box">
				        <span class="btn icon smaller" data-action="undo" title="Undo">
				          <img src="https://image.flaticon.com/icons/svg/25/25249.svg" />
				        </span>
				        <span class="btn icon" data-action="removeFormat" title="Remove format">
				          <img src="https://image.flaticon.com/icons/svg/25/25454.svg" />  
				        </span>
				      </div>
				      
				      <div class="box">
				        <span class="btn icon smaller" data-action="createLink" title="Insert Link">
				          <img src="https://image.flaticon.com/icons/svg/25/25385.svg" />
				        </span>
				        <span class="btn icon smaller" data-action="unlink" data-tag-name="a" title="Unlink">
				          <img src="https://image.flaticon.com/icons/svg/25/25341.svg" />
				        </span>
				      </div>
				      
				      <div class="box">
				        <span class="btn icon" data-action="code" title="Show HTML-Code">
				          <img src="https://image.flaticon.com/icons/svg/25/25185.svg" />
				        </span>
				      </div>
				      
				    </div>
				  </div>
				  <div class="content-area">
				    <div class="visuell-view" contenteditable>
				      <p style="text-align: center;">Edit  <b>this </b> content <i></i>!</p>
				     
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
				      <input type="text" id="linkValue" placeholder="Link (example: https://webdeasy.de/)">
				      <div class="row">
				        <input type="checkbox" id="new-tab">
				        <label for="new-tab">Open in new Tab?</label>
				      </div>
				      <button class="done">Done</button>
				    </div>
				  </div>
				</div>


	}
}













/*Now create the parser that parses the mark down*/
class MarkdownParser{
	constructor(){
		this.tagPusher = [];
		//fill the parser on input change

		//just like a well in which you keep filling up water
		this.defaultCheck();



	}


	parseBlock(str) {
		return this.tagMatchers.reduce(function(prev, matcher) {
			return matcher.match(str) ? matcher : prev;
		}).stringify(str);
   }

	parseMarkdown(str) {
		return str.split('\n\n')
			.map(this.parseBlock)
			.reduce(function(base, val) {
				return base + val;
			});
	}


	defaultCheck(){
       //add mor markup chk

       //add more custom check for markup


		// Paragraph
		tagMatchers.push({
			match: function() {
				return true;
			},
			stringify: function(s) {
				return '<p>' + s + '</p>';
			}
		});

		// Heading level 1
		tagMatchers.push({
			match: function(s) {
				return s.charAt(0) === '#';
			},
			stringify: function(s) {
				return '<h1>' + s.substr(2) + '</h1>';
			}
		});

		// Heading level 2
		tagMatchers.push({
			match: function(s) {
				return s.substr(0, 2) === '##';
			},
			stringify: function(s) {
				return '<h2>' + s.substr(3) + '</h2>';
			}
		});

		// Blockquote
		tagMatchers.push({
			match: function(s) {
				return s.substr(0, 2) === '> ';
			},
			stringify: function(s) {
				return '<blockquote>' + s.substr(2) + '</blockquote>';
			}
		});

		// Preformatted
		tagMatchers.push({
			match: function(s) {
				return s.substr(0, 3) === '```';
			},
			stringify: function(s) {
				return '<pre>' + s.substr(3, s.length - 6).trim() + '</pre>';
			}
		});


	}
}