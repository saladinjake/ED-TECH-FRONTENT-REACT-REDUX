import React, { useState } from "react";
import { Collapse } from "react-bootstrap";

const course_category = [
  {
    key: 1,
    course_category_title: "Arts & Humanities",
    sub_courses: [
      {
        key: 1,
        sub_course_title: "Education",
      },
      {
        key: 2,
        sub_course_title: "History",
      },
      {
        key: 3,
        sub_course_title: "Politics",
      },
      {
        key: 4,
        sub_course_title: "Sociology",
      },
      {
        key: 5,
        sub_course_title: "Geography",
      },
      {
        key: 6,
        sub_course_title: "Law",
      },
      {
        key: 7,
        sub_course_title: "Psychology",
      },
      {
        key: 8,
        sub_course_title: "Media And Journalism",
      },
      {
        key: 9,
        sub_course_title: "Architecture",
      },
    ],
  },
  {
    key: 2,
    course_category_title: "Business And Operations Management",
    sub_courses: [
      {
        key: 1,
        sub_course_title: "Human Resources Administration	",
      },
      {
        key: 2,
        sub_course_title: "Leadership And Management	",
      },
      {
        key: 3,
        sub_course_title: "Finance And Banking",
      },
      {
        key: 4,
        sub_course_title: "Business Process Management",
      },
      {
        key: 5,
        sub_course_title: "Service Management",
      },
      {
        key: 6,
        sub_course_title: "Supply Chain Management",
      },
      {
        key: 7,
        sub_course_title: "Sales And Marketing Management",
      },
      {
        key: 8,
        sub_course_title: "Risk Management",
      },
      {
        key: 9,
        sub_course_title: "Customer Service",
      },
    ],
  },
  {
    key: 3,
    course_category_title: "Engineering",
    sub_courses: [
      {
        key: 1,
        sub_course_title: "Computer Engineering",
      },
      {
        key: 2,
        sub_course_title: "Electrical Engineering",
      },
      {
        key: 3,
        sub_course_title: "Mechanical Engineering",
      },
      {
        key: 4,
        sub_course_title: "Chemical Engineering",
      },
      {
        key: 5,
        sub_course_title: "Civil Engineering",
      },
    ],
  },
  {
    key: 4,
    course_category_title: "Physical Sciences ",
    sub_courses: [
      {
        key: 1,
        sub_course_title: "Biology",
      },
      {
        key: 2,
        sub_course_title: "Physics",
      },
      {
        key: 3,
        sub_course_title: "Chemistry",
      },
      {
        key: 4,
        sub_course_title: "Environmental Studies",
      },
      {
        key: 5,
        sub_course_title: "Agricultural Science",
      },
    ],
  },
  {
    key: 5,
    course_category_title: "Mathematics ",
    sub_courses: [
      {
        key: 1,
        sub_course_title: "Calculus",
      },
      {
        key: 2,
        sub_course_title: "Probability And Statistics",
      },
      {
        key: 3,
        sub_course_title: "Algebra",
      },
    ],
  },
  {
    key: 6,
    course_category_title: "Computer Schience & Information Technology",
    sub_courses: [
      {
        key: 1,
        sub_course_title: "Computer Science",
      },
      {
        key: 2,
        sub_course_title: "Network And Security",
      },
      {
        key: 3,
        sub_course_title: "Software Development",
      },
      {
        key: 4,
        sub_course_title: "Digital Marketing",
      },
      {
        key: 5,
        sub_course_title: "IT Management",
      },
    ],
  },
  {
    key: 7,
    course_category_title: "Law & Social Sciences",
    sub_courses: [
      {
        key: 1,
        sub_course_title: "Economics",
      },
      {
        key: 2,
        sub_course_title: "Law",
      },
      {
        key: 3,
        sub_course_title: "Psychology",
      },
    ],
  },
  {
    key: 8,
    course_category_title: "Health Care",
    sub_courses: [
      {
        key: 1,
        sub_course_title: "Nursing",
      },
      {
        key: 2,
        sub_course_title: "Disease And Disorders",
      },
      {
        key: 3,
        sub_course_title: "Nutrition",
      },
      {
        key: 4,
        sub_course_title: "Caregiving",
      },
      {
        key: 5,
        sub_course_title: "Pharmacology",
      },
    ],
  },
];

const FilterWidget = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);

  return (
    // <div className="container">
    <div className="bg-light">
      <div className="container">
        <div className="row pt-4 pb-4 rounded mx-auto">
          <div className="col-sm-12 col-md-12 border-bottom pb-1 mb-2">
            <p className="text-14 fw-bold">Categories</p>

            <div className="my-3">
              <p
                onClick={() => setOpen(!open)}
                aria-controls="arts-humanities"
                aria-expanded={open}
                className="text-13"
              >
                {course_category[0].course_category_title}
                <i className="bi bi-chevron-down fs-07rem float-end"></i>
              </p>
              <Collapse in={open}>
                <div>
                  {course_category[0].sub_courses.map((ele) => (
                    <div className="form-check" key={ele.key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label ml-2"
                        for="flexCheckDefault"
                      >
                        {ele.sub_course_title}
                      </label>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
            <div className="my-3">
              <p
                onClick={() => setOpen1(!open1)}
                aria-controls="arts-humanities"
                aria-expanded={open1}
                className="text-13"
              >
                {course_category[1].course_category_title}
                <i className="bi bi-chevron-down fs-07rem float-end"></i>
              </p>
              <Collapse in={open1}>
                <div>
                  {course_category[1].sub_courses.map((ele) => (
                    <div className="form-check" key={ele.key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label ml-2"
                        for="flexCheckDefault"
                      >
                        {ele.sub_course_title}
                      </label>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
            <div className="my-3">
              <p
                onClick={() => setOpen2(!open2)}
                aria-controls="arts-humanities"
                aria-expanded={open2}
                className="text-13"
              >
                {course_category[2].course_category_title}
                <i className="bi bi-chevron-down fs-07rem float-end"></i>
              </p>
              <Collapse in={open2}>
                <div>
                  {course_category[2].sub_courses.map((ele) => (
                    <div className="form-check" key={ele.key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label ml-2"
                        for="flexCheckDefault"
                      >
                        {ele.sub_course_title}
                      </label>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
            <div className="my-3">
              <p
                onClick={() => setOpen3(!open3)}
                aria-controls="arts-humanities"
                aria-expanded={open3}
                className="text-13"
              >
                {course_category[3].course_category_title}
                <i className="bi bi-chevron-down fs-07rem float-end"></i>
              </p>
              <Collapse in={open3}>
                <div>
                  {course_category[3].sub_courses.map((ele) => (
                    <div className="form-check" key={ele.key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label ml-2"
                        for="flexCheckDefault"
                      >
                        {ele.sub_course_title}
                      </label>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
            <div className="my-3">
              <p
                onClick={() => setOpen4(!open4)}
                aria-controls="arts-humanities"
                aria-expanded={open4}
                className="text-13"
              >
                {course_category[4].course_category_title}
                <i className="bi bi-chevron-down fs-07rem float-end"></i>
              </p>
              <Collapse in={open4}>
                <div>
                  {course_category[4].sub_courses.map((ele) => (
                    <div className="form-check" key={ele.key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label ml-2"
                        for="flexCheckDefault"
                      >
                        {ele.sub_course_title}
                      </label>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
            <div className="my-3">
              <p
                onClick={() => setOpen5(!open5)}
                aria-controls="arts-humanities"
                aria-expanded={open5}
                className="text-13 whitespace"
              >
                {course_category[5].course_category_title}
                <i className="bi bi-chevron-down fs-07rem float-end"></i>
              </p>
              <Collapse in={open5}>
                <div>
                  {course_category[5].sub_courses.map((ele) => (
                    <div className="form-check" key={ele.key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label ml-2"
                        for="flexCheckDefault"
                      >
                        {ele.sub_course_title}
                      </label>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
            <div className="my-3">
              <p
                onClick={() => setOpen6(!open6)}
                aria-controls="arts-humanities"
                aria-expanded={open6}
                className="text-13"
              >
                {course_category[6].course_category_title}
                <i className="bi bi-chevron-down fs-07rem float-end"></i>
              </p>
              <Collapse in={open6}>
                <div>
                  {course_category[6].sub_courses.map((ele) => (
                    <div className="form-check" key={ele.key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label ml-2"
                        for="flexCheckDefault"
                      >
                        {ele.sub_course_title}
                      </label>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
            <div className="my-3">
              <p
                onClick={() => setOpen7(!open7)}
                aria-controls="arts-humanities"
                aria-expanded={open7}
                className="text-13"
              >
                {course_category[7].course_category_title}
                <i className="bi bi-chevron-down fs-07rem float-end"></i>
              </p>
              <Collapse in={open7}>
                <div>
                  {course_category[7].sub_courses.map((ele) => (
                    <div className="form-check" key={ele.key}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label ml-2"
                        for="flexCheckDefault"
                      >
                        {ele.sub_course_title}
                      </label>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 border-bottom pb-3">
            <p className="text-14 fw-bold">Learning Style</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label ml-2 text-13"
                for="flexCheckDefault"
              >
                Instructor Led
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label ml-2 text-13"
                for="flexCheckDefault"
              >
                Self Paced
              </label>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 mt-3">
            <p className="text-14 fw-bold">Price</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label ml-2 text-13"
                for="flexCheckDefault"
              >
                All
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label ml-2 text-13"
                for="flexCheckDefault"
              >
                Free
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label ml-2 text-13"
                for="flexCheckDefault"
              >
                Paid
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterWidget;
