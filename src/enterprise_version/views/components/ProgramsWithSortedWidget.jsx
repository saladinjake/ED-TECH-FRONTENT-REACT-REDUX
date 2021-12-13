import React, { useState } from "react";
import ProgramSortWidget from "./ProgramSortWidget";
import ProgramHorizontalCard from "./ProgramHorizontalCard";

import ProgramCard from "./ProgramCard";
const CoursesWithSortWidget = ({ relatedCourses, institution, hero_image }) => {
  const [sortType, setSortType] = useState("grid");
  const handleSort = (sortType) => {
    setSortType(sortType);
  };

  const [randomImage, setRandomImages] =useState([
    "1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg",
    "8.jpg","9.jpg",'10.jpg'
  ])

  function removeTags(str) {
    if (str.match(/(<([^>]+)>)/gi)) return str.replace(/(<([^>]+)>)/gi, "");
    else return str;
  }

 

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

const toggleModal = (e) =>{
      e.preventDefault()
    const modal =  document.querySelector(".md-modal")
    const detailTrigger = document.querySelector(".md-trigger")
    modal.classList.add('md-show')
 
   
  }
  

    return (
        <>
          <ProgramSortWidget onHandleSort={handleSort} filter={false} />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="mb-5">
                  {sortType === "fullWidth" && (
                    <>
                      {relatedCourses.length > 0 &&
                        relatedCourses.map((course, index) => {
                            console.log(course)

                            let imageBanner = ""
                                    if(index > randomImage.length){
                                    let MidImageBanner = Math.floor(randomImage.length/2)
                                    imageBanner = shuffle(randomImage)
                                    imageBanner = imageBanner[MidImageBanner]
                                    }else{
                                    imageBanner = randomImage[index]
                                    }
                          return (
                            <ProgramHorizontalCard
                              key={index + "_" + Math.random() * 90}
                              courseTitle={removeTags(course?.title)}
                              courseDesc={removeTags(course?.title)}
                              courseAuthorCompany={institution}
                              courseAuthor={course?.author}
                              coursePrice={course?.price}
                              courseId={index+1}
                              courseImage={process.env.PUBLIC_URL+"/institutions_courses/"+ imageBanner}
                              learningLang={""}
                              learningStyle={""}
                              learningLevel={""}
                              courseBtnText="View Course"
                              courseRating="3"
                              courseCompletion="90"
                              toggleModal={toggleModal}
                            />
                          );
                        })}
                    </>
                  )}
                  {sortType === "grid" && (
                    <>
                      <div className="row">
                        <>
                          {relatedCourses.length > 0 &&
                            relatedCourses.map((course, index) => {
                              
                                
                                    let imageBanner = ""
                                    if(index > randomImage.length){
                                    let MidImageBanner = Math.floor(randomImage.length/2)
                                    imageBanner = shuffle(randomImage)
                                    imageBanner = imageBanner[MidImageBanner]
                                    }else{
                                    imageBanner = randomImage[index]
                                    }
                              return (
                                <div className="col-md-4">
                                  <ProgramCard
                                    key={index + "_" + Math.random() * 90}
                                    courseTitle={removeTags(course?.title)}
                                    courseDesc={removeTags(course?.title)}
                                    courseAuthorCompany={institution}
                                    courseAuthor={course?.author}
                                    coursePrice={course?.price}
                                    courseId={""}
                                    courseImage={process.env.PUBLIC_URL+"/institutions_courses/"+ imageBanner}
                                    learningLang={""}
                                    learningStyle={""}
                                    learningLevel={""}
                                    courseBtnText="View Course"
                                    courseRating="4"
                                    courseCompletion="40"
                                    toggleModal={toggleModal}
                                  />
                                </div>
                              );
                            })}
                        </>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )
};

export default CoursesWithSortWidget;
