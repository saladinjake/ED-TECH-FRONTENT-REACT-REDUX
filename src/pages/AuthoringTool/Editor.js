import * as React from "react";
import { render } from "react-dom";
import ReactQuill, { Mixin, Toolbar, Quill } from "react-quill";
import Dropzone, { ImageFile } from "react-dropzone";

import "react-quill/dist/quill.snow.css";
import "./editor.css";

import $ from "jquery";

// export default HtmlEditor
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editorHtml: this.props.placeholder || "Edit this content" || "", 
      theme: "snow" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    this.props.action(html);

    this.props.stateAction(this.props.placeholder, html);
  }

  componentDidMount() {
    $(function () {
      $(".md-trigger").on("click", function () {
        $(".md-modal-preview").addClass("md-show");

        //get the down element content and place in the modal box
      });

      $(".button-preview-md-close").on("click", function () {
        $(".md-modal-preview").removeClass("md-show");
        //get the cotent and preplace in to the initial preview box

        // $('#div1').html($('#div2').html());
      });
    });

    const first = document.querySelector(".first");
    const iframe = document.querySelector("iframe");
    const btn = document.querySelector("button");

    btn.addEventListener("click", () => {
      var html = first.textContent;
      iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
    });
  }
  
  imageHandler = () => {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append("file", file);

            // Save current cursor state
            const range = this.quill.getSelection(true);

            // Insert temporary loading placeholder image
            this.quill.insertEmbed(range.index, 'image', `${window.location.origin}/public/images/loaders/placeholder.gif`);

            // Move cursor to right side of image (easier to continue typing)
            this.quill.setSelection(range.index + 1);
			
			//save the image to the api end point resource

            const res = await postNewsImageToCloudinaryApi(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

            // Remove placeholder image
            this.quill.deleteText(range.index, 1);

            // Insert uploaded image
            // this.quill.insertEmbed(range.index, 'image', res.body.image);
			if(res){
			this.quill.insertEmbed(range.index, 'image', res);	
			}
            
        };
    }
	

  render() {
    return (
      <div style={{ marginLeft: "10px" }}>
        <br />
        <br />
        <div>
          
          {/*<button className="md-trigger button-preview" data-modal="modal-12">Live Edit Preview</button>*/}
        </div>
        <ReactQuill
          theme={this.state.theme}
          onChange={(e) => {
            this.handleChange(e);
          }}
          value={this.state.editorHtml}
          name={this.props.name}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={".app"}
          placeholder={this.props.placeholder}
        />

        <div className="md-modal-preview md-effect-12">
          <div className="md-content">
            <h3>
              Live Edit Preview{" "}
              <button
                style={{ float: "right" }}
                className="button-preview-md-close"
              >
                Close
              </button>
            </h3>
            <div>
              <div className="main-editor">
                <button className="btn-test">Run</button>
                <div className="first" contenteditable={true}>
                  writecode
                </div>
                <iframe className="second"></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="md-overlay"></div>
      </div>
    );
  }
}










	
async function postNewsImageToCloudinaryApi(formData){
		
    formData.append("upload_preset", "hpvklb3p");
              // eslint-disable-next-line no-undef
	let res = await fetch("https://api.cloudinary.com/v1_1/questence/image/upload", {
       method: "POST",
      body: formData,
    })
	
	 if (typeof res?.secure_url !== "undefined") { // ensure the api saving data of uploaded 3rdparty image has a return call to the iamge successfully uploaded
      let  imageUrl = res.secure_url; //get the generated image url

        return imageUrl

     } else {
                     //toast.error("could not upload image");
        return false
    }
            
           
}



/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [
      { header: "1" },
      { header: "2" },
	  { header: [3, 4, 5, 6] },
     
      { font: [] },
    ],
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
	["codeblock"]
	
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  
  //handlers: {
                    //image: this.imageHandler
    //},
  
 
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
  "color",
  "align",

  "image",
  "video",
  //
];

/*
 * PropType validation
 */
// Editor.propTypes = {
//   placeholder: PropTypes.string,
// }

export default Editor;
