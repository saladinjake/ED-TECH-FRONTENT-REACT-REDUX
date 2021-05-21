import React, { Component } from 'react';
import {
getBusiness,
getLanguages,
getCategories,
getCertificates
} from "services/course"
import toast from "react-hot-toast";

class FileUploadComponent extends Component
{
  

  async componentDidMount(){
    //fetch all the select options
    try{
      let businessList = await getBusiness();
      let languageList = await getLanguages();
      let categoryList = await getCategories();
      let certificateList = await getCertificates();
      this.setState({
        categoryList: categoryList.data.data,
        certificateList: certificateList.data.data,
        languageList: languageList.data.data,
        businessList: businessList.data.data
      })


    }catch(err){
      toast.error(`some error occured fetching data`)
    }

  }
  constructor(props) {
      super(props);
      this.state ={
        categoryList: [],
        certificateList: [],
        businessList: [],
        languageList: [],
        
        course_name: "",
        learning_style: "Self Paced",
        duration: "20hours",
        language_id: "64",
        certificate_id: "1",
        category_id: "1",
        course_description: "Lorem Ipsum",
        course_thumbnail: "http://lorempixel.com/150/150/cats/image.jpg",
        business_id: "1",
        introduction_video: "http://shutterstock.com/video.mp4",
        start_date: "2000-09-09",
        end_date : "2000-09-09",
        enrollment_start: "2000-09-09",
        enrollment_end: "2000-09-09",
        course_overview: "Lorem Ipsum",
        prerequisite_course: "Lorem Ipsum",
        entrance_exam: "1",
        license: "MIT Open License 3.0",
        overall_grade_range: "70",
        grace_period_on_deadline: "24hours",
        course_cover_image: "http://lorempixel.com/150/150/cats/image.jpg",
        topics: "[{'title' => 'Module 1 - Excuses', 'parent_id' => '1'}, {'title' => '<p>Module 1 - Life</p>', 'parent_id' => '2'}, {'title' => '<h1>Module 1 - Path</h1>', 'parent_id' => '3'}]",
        outcomes: "['How to Live', 'How to Love', 'How to Not']"
      }
      this.onFormSubmit = this.onFormSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
      e.preventDefault() 
      this.fileUpload(this.state.image);
    }
    onChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage(files[0]);
    }
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          course_thumbnail: e.target.result
        })
      };
      reader.readAsDataURL(file);
    }
    fileUpload(image){
      const url = 'http://localhost:8000/api/fileupload';
      const formData = {file: this.state.course_thumbnail}
      return  post(url, formData)
              .then(response => console.log(response))
    }
  
   render()
   {

    console.log(this.state)

    const { 
      businessList,
      categoryList,
      languageList,
      certificateList

    } = this.state;
      return(

         <form onSubmit={this.onFormSubmit}>
        <h1>Add Course</h1>

      <select onChange={(e)=>{
           this.setState({learning_style: e.target.value })
         }}>

        <option value="albums">--Learning Style--</option>
        <option value="members">Self Paced</option>
        <option value="formed"></option>
      </select>

      <select onChange={(e)=>{
           this.setState({language_id: e.target.value })
         }}>
        { languageList.length > 0 && languageList.map(language =>{
             return(
                 <option value={language.id}>{language}</option>
             )
        }) } 
       
        
      </select>

      <select onChange={(e)=>{
           this.setState({certificate_id: e.target.value })
         }}>
        <option value="albums">--Certificate Type--</option>
        <option value="members">Self Paced</option>
        <option value="formed"></option>
      </select>

      <select onChange={(e)=>{
           this.setState({category_id: e.target.value })
         }}>
        <option value="albums">--Course Category--</option>
        <option value="members">Self Paced</option>
        <option value="formed"></option>
      </select>

      <div>
         <label>Course Name</label>
         <input type="text" onChange={(e)=>{
           this.setState({course_name: e.target.value })
         }} />
      </div>

       

       <div>
         <label>Course Duration in hours</label>
         <input type="number" onChange={(e)=>{
           this.setState({duration: e.target.value })
         }}/>
      </div>

       <div>
         <label>Course Description</label>
         <input type="text" onChange={(e)=>{
           this.setState({course_description: e.target.value })
         }} />
      </div>

      <div>
         <label>Thumbnail </label>
         <input type="file"  onChange={this.onChange} />
      </div>

      <div>
         <label>Course Cover Image </label>
         <input type="file"  onChange={this.onChangeCover} />
      </div>

      <div>
         <label>Video</label>
        <input type="file"  onChange={this.onChangeVideo} />
      </div>

      <div>
         <label>Course Start Date</label>
         <input type="date" onChange={(e)=>{
           this.setState({start_date: e.target.value })
         }}/>
      </div>

      <div>
         <label>Course End Date</label>
         <input type="date" onChange={(e)=>{
           this.setState({end_date: e.target.value })
         }}/>
      </div>

      <div>
         <label>Course Enrollment Start Date</label>
         <input type="date" onChange={(e)=>{
           this.setState({enrollment_start: e.target.value })
         }}/>
      </div>
      <div>
         <label>Course Enrollment End Date</label>
         <input type="date" onChange={(e)=>{
           this.setState({enrollment_end: e.target.value })
         }}/>
      </div>

     


        
        <button type="submit">Upload</button>
      </form>
      )
   }
}



class CourseForm extends Component {
  render() {
    return (
      <div className="App">
          <FileUploadComponent/>      
      </div>
    );
  }
}
