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
       template =``;
       break;
    case "[pb_html][/pb_numeric_input]":
        template =``;
       break;

    case "[pb_html][/pb_text_input]":
       template =``;
       break;
    case "[pb_html][/pb_multichoice]":
       template =``;
       break;
    case "[pb_html][/pb_text_input]":
        template =``;
       break;
    case "[pb_html][/pb_dropdown]":
        template =``;
       break;
    case "[pb_html][/pb_dropdown_feed]":
        template =``;
       break;
    case "[pb_html][/pb_checkboxes_feed]":
        template =``;
       break;
    case "[pb_html][/pb_text_input_feed]":
       template =``;
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
    default:
       
       return false;
        
  }

  return template;
	
}



class EditorBox extends React.Component{
	constructor(props){
		super(props)
		this.editor = null;
		this.toolbar =null;
		this.buttons = null;
	}
	componentDidMount(){
		// define vars
		const editor = document.getElementsByClassName('editor')[0];
		const toolbar = editor.getElementsByClassName('toolbar')[0];
		const buttons = toolbar.querySelectorAll('.btn:not(.has-submenu)');
		const contentArea = editor.getElementsByClassName('content-area')[0];
		const visuellView = contentArea.getElementsByClassName('visuell-view')[0];
		const htmlView = contentArea.getElementsByClassName('html-view')[0];
		const modal = document.getElementsByClassName('modal')[0];

		// add active tag event
		document.addEventListener('selectionchange', selectionChange);

		// add toolbar button actions
		for(let i = 0; i < buttons.length; i++) {
		  let button = buttons[i];
		  
		  button.addEventListener('click', function(e) {
		    let action = this.dataset.action;
		    
		    switch(action) {
		      case 'code':
		        execCodeAction(this, editor);
		        break;
		      case 'createLink':
		        execLinkAction();
		        break;
		      default:
		        execDefaultAction(action);
		    }
		    
		  });
		}



			}



		// this function toggles between visual and html view
	execCodeAction(button, editor) {

	  if(button.classList.contains('active')) { // show visuell view
	    visuellView.innerHTML = htmlView.value;
	    htmlView.style.display = 'none';
	    visuellView.style.display = 'block';

	    button.classList.remove('active');     
	  } else {  // show html view
	    htmlView.innerText = visuellView.innerHTML;
	    visuellView.style.display = 'none';
	    htmlView.style.display = 'block';

	    button.classList.add('active'); 
	  }
	}

	// add link action
	execLinkAction() {  
	  modal.style.display = 'block';
	  let selection = saveSelection();

	  let submit = modal.querySelectorAll('button.done')[0];
	  let close = modal.querySelectorAll('.close')[0];
	  
	  // done button active => add link
	  submit.addEventListener('click', function() {
	    let newTabCheckbox = modal.querySelectorAll('#new-tab')[0];
	    let linkInput = modal.querySelectorAll('#linkValue')[0];
	    let linkValue = linkInput.value;
	    let newTab = newTabCheckbox.checked;    
	    
	    restoreSelection(selection);
	    
	    if(window.getSelection().toString()) {
	      let a = document.createElement('a');
	      a.href = linkValue;
	      if(newTab) a.target = '_blank';
	      window.getSelection().getRangeAt(0).surroundContents(a);
	    }

	    modal.style.display = 'none';
	    linkInput.value = '';
	    
	    // deregister modal events
	    submit.removeEventListener('click', arguments.callee);
	    close.removeEventListener('click', arguments.callee);
	  });  
	  
	  // close modal on X click
	  close.addEventListener('click', function() {
	    let linkInput = modal.querySelectorAll('#linkValue')[0];
	    
	    modal.style.display = 'none';
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
	  
	  parentTagActive(window.getSelection().anchorNode.parentNode);
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
	  
	  return parentTagActive(elem.parentNode);
	}

	render(){
		<div class="editor-authoring">
				  <div class="toolbar">
				    <div class="line">
				      
				      <div class="box">
				        <span class="btn icon smaller" data-action="bold" data-tag-name="b" title="Bold">
				          <img src="https://image.flaticon.com/icons/svg/25/25432.svg">
				        </span>
				        <span class="btn icon smaller" data-action="italic" data-tag-name="i" title="Italic">
				          <img src="https://image.flaticon.com/icons/svg/25/25392.svg">
				        </span>
				        <span class="btn icon smaller" data-action="underline" data-tag-name="u" title="Underline">
				          <img src="https://image.flaticon.com/icons/svg/25/25433.svg">
				        </span>
				        <span class="btn icon smaller" data-action="strikeThrough" data-tag-name="strike" title="Strike through">
				          <img src="https://image.flaticon.com/icons/svg/25/25626.svg">
				        </span>
				      </div>
				      
				      <div class="box">
				        <span class="btn icon has-submenu">
				          <img src="https://image.flaticon.com/icons/svg/25/25351.svg">
				          <div class="submenu">
				            <span class="btn icon" data-action="justifyLeft" data-style="textAlign:left" title="Justify left">
				              <img src="https://image.flaticon.com/icons/svg/25/25351.svg">  
				            </span>
				            <span class="btn icon" data-action="justifyCenter" data-style="textAlign:center" title="Justify center">
				              <img src="https://image.flaticon.com/icons/svg/25/25440.svg">  
				            </span>
				            <span class="btn icon" data-action="justifyRight" data-style="textAlign:right" title="Justify right">
				              <img src="https://image.flaticon.com/icons/svg/25/25288.svg">  
				            </span>
				            <span class="btn icon" data-action="formatBlock" data-style="textAlign:justify" title="Justify block">
				              <img src="https://image.flaticon.com/icons/svg/25/25181.svg">  
				            </span>
				          </div>
				        </span>
				        <span class="btn icon" data-action="insertOrderedList" data-tag-name="ol" title="Insert ordered list">
				          <img src="https://image.flaticon.com/icons/svg/25/25242.svg">  
				        </span>
				        <span class="btn icon" data-action="insertUnorderedList" data-tag-name="ul" title="Insert unordered list">
				          <img src="https://image.flaticon.com/icons/svg/25/25648.svg">  
				        </span>
				        <span class="btn icon" data-action="outdent" title="Outdent">
				          <img src="https://image.flaticon.com/icons/svg/25/25410.svg">  
				        </span>
				        <span class="btn icon" data-action="indent" title="Indent">
				          <img src="https://image.flaticon.com/icons/svg/25/25233.svg">  
				        </span>
				        
				      </div>
				      <div class="box">
				        <span class="btn icon" data-action="insertHorizontalRule" title="Insert horizontal rule">
				          <img src="https://image.flaticon.com/icons/svg/25/25232.svg">  
				        </span>
				      </div>
				      
				    </div>
				    <div class="line">
				      
				      <div class="box">
				        <span class="btn icon smaller" data-action="undo" title="Undo">
				          <img src="https://image.flaticon.com/icons/svg/25/25249.svg">
				        </span>
				        <span class="btn icon" data-action="removeFormat" title="Remove format">
				          <img src="https://image.flaticon.com/icons/svg/25/25454.svg">  
				        </span>
				      </div>
				      
				      <div class="box">
				        <span class="btn icon smaller" data-action="createLink" title="Insert Link">
				          <img src="https://image.flaticon.com/icons/svg/25/25385.svg">
				        </span>
				        <span class="btn icon smaller" data-action="unlink" data-tag-name="a" title="Unlink">
				          <img src="https://image.flaticon.com/icons/svg/25/25341.svg">
				        </span>
				      </div>
				      
				      <div class="box">
				        <span class="btn icon" data-action="code" title="Show HTML-Code">
				          <img src="https://image.flaticon.com/icons/svg/25/25185.svg">
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