import React from "react";
import UploadService from "../../api/enrollment_services/uploads.services";
import toast from "react-hot-toast";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "", message: "", progress: 0 };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    // this.upload(this.state.file);
    // console.log("handle uploading-", this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    console.log(file);

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
      console.log(reader.result);
      this.upload(reader.result);
    };

    // setTimeout(() => {
    //   this.upload(file);
    // }, 10000);

    reader.readAsDataURL(file);
  }

  upload = (file) => {
    // let currentFile =file

    console.log(file);
    UploadService.upload(file)
      .then((response) => {
        console.log(response);
        this.setState({ message: response.data.message });
        //fetch the profile
        return response;
      })
      .then((files) => {
        //return the profile
        console.log(files);
        return files;
      })
      .catch((e) => {
        console.log(e);
        this.setState({ message: "Could not upload the file!" });
      });
  };

  render() {
    let { imagePreviewUrl, message } = this.state;
    let currentFile = this.state.file;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          height="100"
          width="100"
          alt="noimgh"
          className="circle card-box"
        />
      );
    } else {
      $imagePreview = (
        <div>
          <img
            src={process.env.PUBLIC_URL + `/assets/images/product-01.jpg`}
            height="100"
            width="100"
            alt="avatar-old"
            className="circle card-box"
          />
          <p className="previewText">Please select an Image for Preview</p>
        </div>
      );
    }

    return (
      <div className="previewComponent">
        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <div
          className="imgPreview"
          style={{ margin: "auto", borderRadius: "50%" }}
        >
          {$imagePreview}
        </div>
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={(e) => this._handleImageChange(e)}
          />
          {/*<button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>*/}
        </form>
      </div>
    );
  }
}

export default ImageUpload;
