import * as React from "react";
import { render } from "react-dom";
import ReactQuill, { Mixin, Toolbar, Quill } from "react-quill";
import Dropzone, { ImageFile } from "react-dropzone";

import "react-quill/dist/quill.snow.css";
import "./editor.css";

import $ from "jquery";

let quilloBJ ;;

const isWhitespace = (char) => {
  const whiteSpaceRegex = /\s/;
  return typeof char === 'string' && whiteSpaceRegex.test(char);
};
const whiteSpaceRegex = /\s/;

// export default HtmlEditor for all html editing fields
//one single editor class that replicates 
//distinguishing features
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editorHtml: this.props.placeholder || "Edit this content" || "", 
      theme: "snow" };
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleChange(html) {
    console.log(html)
    

    if(quilloBJ){
      let editor = quilloBJ.getEditor()
      console.log(editor)
      // //link copy to click board
      // editor.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
      //     var regex = /https?:\/\/[^\s]+/g;
      //     if(typeof(node.data) !== 'string') return;
      //     var matches = node.data.match(regex);

      //     if(matches && matches.length > 0) {
      //       var ops = [];
      //       var str = node.data;
      //       matches.forEach(function(match) {
      //         var split = str.split(match);
      //         var beforeLink = split.shift();
      //         ops.push({ insert: beforeLink });
      //         ops.push({ insert: match, attributes: { link: match } });
      //         str = split.join(match);
      //       });
      //       ops.push({ insert: str });
      //       delta.ops = ops;
      //     }

      //     return delta;
      //   });



      // //convert img links to actual images
      // editor.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
      //     var regex = /https?:\/\/[^\s]+/g;
      //         if(typeof(node.data) !== 'string') return;
      //             var matches = node.data.match(regex);

      //             if(matches && matches.length > 0) {
      //                 var ops = [];
      //                 var str = node.data;

      //                 matches.forEach(function(match) {
      //                      var split = str.split(match);
      //                      if(match.match(/\.(png|jpg|jpeg|gif)$/)!=null){
      //                          var beforeLink = split.shift();                     
      //                          ops.push({ insert: beforeLink });
      //                          ops.push({ insert:{image: match}, attributes: { link: match } 
      //                       });

      //                     str = split.join(match);                    
      //                     } else { //if link is not an image
      //                         var beforeLink = split.shift();
      //                         ops.push({ insert: beforeLink });                        
      //                         ops.push({ insert: match, attributes: { link: match } 
      //                     }); 
      //                         str = split.join(match);
      //                     }                                                     
      //     });
      //                 ops.push({ insert: str });
      //                 delta.ops = ops;
      //              }                   
      //     return delta;
      // });



         // when user types a link url
         // Autolink URLs when typing
        // quilloBJ.on('editor-change', function(delta, oldDelta, source) {
        //   var regex = /https?:\/\/[^\s]+$/;
        //   if(delta.ops.length === 2 && delta.ops[0].retain && isWhitespace(delta.ops[1].insert)) {
        //     var endRetain = delta.ops[0].retain;
        //     var text = quilloBJ.getText().substr(0, endRetain);
        //     var match = text.match(regex);

        //     if(match !== null) {
        //       var url = match[0];

        //       var ops = [];
        //       if(endRetain > url.length) {
        //         ops.push({ retain: endRetain - url.length });
        //       }

        //       ops = ops.concat([
        //         { delete: url.length },
        //         { insert: url, attributes: { link: url } }
        //       ]);

        //       quilloBJ.updateContents({
        //         ops: ops
        //       });
        //     }
        //   }
        // });


    }


    // if(this.props.maxlength){
    //   if(this.html.length> this.props.maxlength){
    //     alert("error")
    //   }
    // }
    this.setState({ editorHtml: html });
    this.props.action(html);


    localStorage.setItem(this.props.placeholder,html)

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
            let fakeQuill = quilloBJ.getEditor()

            // Save current cursor state
            const range = quilloBJ.getSelection(true);

            // Insert temporary loading placeholder image
            fakeQuill.insertEmbed(range.index, 'image', `${window.location.origin}/public/images/loaders/placeholder.gif`);

            // Move cursor to right side of image (easier to continue typing)
            fakeQuill.setSelection(range.index + 1);
			
			//save the image to the api end point resource

            const res = await postNewsImageToCloudinaryApi(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

            // Remove placeholder image
            fakeQuill.deleteText(range.index, 1);

            // Insert uploaded image
            // this.quill.insertEmbed(range.index, 'image', res.body.image);
			      if(res){
			        fakeQuill.insertEmbed(range.index, 'image', res);	
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
        ref={(el) => {  
                quilloBJ = el;  
          }}
          theme={this.state.theme}

          modules={{  
               toolbar:{
                container: [
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
              },
                clipboard: {
                  // toggle to add extra line breaks when pasting HTML:
                  matchVisual: false,
                },
                
                handlers: {
                  image: this.imageHandler
                },
  
                table: true  
              }}  
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
//Editor.modules = {
 //  toolbar: [
 //    [
 //      { header: "1" },
 //      { header: "2" },
	//   { header: [3, 4, 5, 6] },
     
 //      { font: [] },
 //    ],
 //    [{ size: [] }],
 //    ["bold", "italic", "underline", "strike", "blockquote"],
 //    [
 //      { list: "ordered" },
 //      { list: "bullet" },
 //      { indent: "-1" },
 //      { indent: "+1" },
 //    ],
 //    ["link", "image", "video"],
 //    ["clean"],
	// ["codeblock"]
	
 //  ],
 //  clipboard: {
 //    // toggle to add extra line breaks when pasting HTML:
 //    matchVisual: false,
 //  },
  
 //  handlers: {
 //    image: this.imageHandler
 //  },
  
 
//};
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
