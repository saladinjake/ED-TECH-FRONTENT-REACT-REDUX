import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavBar from "components/Navbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "components/Footer";
// import { Styles } from "./styles/account.js";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { createCourse } from "services/course";
import { getLanguages } from "services/language";
import { getCategories } from "services/category";
import { getCertificates } from "services/category";
import { getBusiness } from "services/business";
import { courseSchema } from "helper/validations";
import { LearnigStyles } from "helper/data";
import Dropzone from 'react-dropzone';
// import Loader from "components/Loader/Loader";

import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import "./styles.scss"
import "./course.css"



import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorState } from 'draft-js';


class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;

    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="rich-editor demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          placeholder="The message goes here..."
        />
      </div>
    );
  }
}





const CreateCourse = (props) => {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [business, setBusiness] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [outcomes, setOutcomes] = useState([]);



  const [file, setFile] = useState(null); // state for storing actual image
  const [file2, setFile2] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [previewSrc2, setPreviewSrc2] = useState('');
  const [state, setState] = useState({
    title: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const [isPreviewAvailable2, setIsPreviewAvailable2] = useState(false);
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const dropRef2 = useRef();

  const [editorState, setEditorState] = useState(EditorState.createEmpty())


  const onEditorStateChange = editorState => {
    
    setEditorState( editorState)
  };

  const handleInputChange = (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.value
      });
    };


   const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, description } = state;
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);

          setErrorMsg('');
          await axios.post(`/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          props.history.push('/list');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };


   const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };




  const onDrop2 = (files) => {
    const [uploadedFile2] = files;
    setFile2(uploadedFile2);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc2(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile2);
    setIsPreviewAvailable2(uploadedFile2.name.match(/\.(jpeg|jpg|png)$/));
    dropRef2.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder2 = (dragState) => {
    if (dragState === 'over') {
      dropRef2.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef2.current.style.border = '2px dashed #e9ebeb';
    }
  };







  let counter =1 ;
  let topicBag =[]
  const handleTopics = (e) => {
    //   console.log("value", e.target.value);
    e.preventDefault();
    // e.stopPropagation();
    if (e.keyCode === 13) {
      let topic = { title: e.target.value, parent_id: counter++ };
      topicBag.push(topic)
     //setTopics([...topics, e.target.value]);
       setTopics([...topicBag]);

       console.log( topicBag)
      e.target.value = "";
    }
  };

  const handleOutcomes = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    if (e.keyCode === 13) {
      setOutcomes([...outcomes, e.target.value]);
      e.target.value = "";
    }
  };

  const deleteTopic = (id) => {
    // eslint-disable-next-line
    const remainder = topics.filter((topic) => {
      if (topic.id !== id) return topic;
    });
    setTopics([...remainder]);
  };

  const initialValues = {
    
    topics:[],
    // outcomes:[]
  };


  useEffect(() => {
    (async function loadContent() {
      await fetchContent();
    })();
  }, []);

  const fetchContent = async () => {
    Promise.all(
      [
        getCategories(),
        getCertificates(),
        getLanguages(),
        getBusiness(),
      ].map((err) => err.catch(() => err))
    )
      .then((res) => {
        setCategories([...res[0].data.data]);
        setCertificates([...res[1].data.data]);
        setLanguages([...res[2].data.data]);
        setBusiness([...res[3].data.data.profiles.data]);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");

        setLoading(false);
      });
  };


  




  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

    if(!values.topics && !values.outcomes && !values.course_thumbnail && !values.course_cover_image){
         toast.error("Form not completed");
        return false;
    }

    console.log(topics, outcomes)
    try {
       let formData = new FormData();
       values.topics= topics;
       values.outcomes = outcomes;
       values.overall_grade_range = values.overall_grade_range.toString()
       values.course_thumbnail = file
       values.course_cover_image = file2

       formData.append("course_name", values.course_name)
       formData.append("price", values.price)

    formData.append("learning_style", values.learning_style)
    formData.append("duration", values.duration)
    formData.append("language_id", values.language_id)
    formData.append("certificate_id", values.certificate_id)
    formData.append("category_id", values.category_id)
    formData.append("course_description", values.course_description)
    formData.append("course_thumbnail", values.course_thumbnail)
    formData.append("business_id", values.business_id)
    formData.append("introduction_video", values.introduction_video)
    formData.append("start_date", values.start_date)
    formData.append("end_date", values.end_date)
    formData.append("course_code", values.course_code)

    formData.append("enrollment_start", values.enrollment_start)
    formData.append("enrollment_end", values.enrollment_end)
    formData.append("course_overview", values.course_overview)
    formData.append("prerequisite_course", values.prerequisite_course)
    formData.append("entrance_exam", values.entrance_exam)
    formData.append("license", values.license)
    formData.append("overall_grade_range", values.overall_grade_range)
    formData.append("grace_period_on_deadline", values.grace_period_on_deadline)
    formData.append("course_cover_image",values.course_cover_image)
    formData.append("topics[]", [].concat(values.topics))
    formData.append("outcomes[]", values.outcomes)
  

      console.log(values)
      await createCourse(formData);
      toast.success("Course sucessfully created.");
      history.push("/instructor-pages/mycourses")
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message);
      toast.error(JSON.stringify(err?.response?.data?.errors));
    }
    setLoading(false);
  };


   function onChangeImage(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage(files[0]);
    }
   function  createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          [e.target.name]: e.target.result
        })
      };
      reader.readAsDataURL(file);
    }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: courseSchema,
    onSubmit: handleSubmit,
  });



  // const onEditorStateChange = editorState => {    
  //    console.log(editorState) 
  //   setEditorState({  editorState });  
  // };

  return (
    <div>
    <NavBar />
    <br/><br/><br/><br/>
      {/* Main Wrapper */}
      <div className="">
        <BreadcrumbBox title="Create Course" />
        <section className="course" style={{height:"3900px"}}>




        

          <Container>

              
             <br/><br/><br/>
                <section className="card-box"  >
                 
                  <form
                    onSubmit={formik.handleSubmit}
                    id="form_registration"
                    className="form-horizontal" role="form"
                   
                  >
            
        
                        <p>
                          Topics (Press Enter to save)
                        </p>

                        <input
                        style={{backgroundColor:"#fff"}}
                         className="form-control"
                          type="text"
                          placeholder="Topics"
                          name="topics"
                          id="topics"
                          onKeyUp={handleTopics}
                        />
                        <ul className="topics">
                          {topics.length > 0 &&
                            topics.map((item, i) => {
                              return (
                                <li key={i}>
                                  {item.text}
                                  <button
                                    onClick={deleteTopic.bind(this, item.id)}
                                  ></button>
                                </li>
                              );
                            })} 
                          {topics.length > 0 &&
                            topics.map((item, i) => {
                              return <li key={i}>{item.title}</li>;
                            })}
                        </ul>
          

                        
                    
                   
                    {/*<a href="#"   onClick={(e) => {

                      if( e.keyCode === 13 ){

                      }else{
                        e.preventDefault()
                      formik.handleSubmit()

                      }
                      }} disabled={formik.isSubmitting}>
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Create Course"
                      )}
                    </a>*/}
                  </form>
                </section>
             
          </Container>
        </section>

      
      </div>
    </div>
  );
};

export default CreateCourse;
