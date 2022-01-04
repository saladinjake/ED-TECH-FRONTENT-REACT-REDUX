import React, { useEffect } from "react";
/*removed styled component css for new bootsrap css */
import { Styles } from "../styles/courseCategory.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from "jquery";

const CourseStyle = ({ course: { courses }, setFilterAllCourses }) => {
  useEffect(() => {
    $(".list-group-item-set-group").each(function (i, div) {
      var currentli = $(div);
      $(currentli)
        .find("#paid-11")
        .on("change", function () {
          $(currentli).find("#paid-12").not(this).prop("checked", false);
        });

      $(currentli)
        .find("#paid-12")
        .on("change", function () {
          $(currentli).find("#paid-11").not(this).prop("checked", false);
        });
    });
  });

  const filterStyle = (e) => {
    //old method
    // const isChecked = e.target.checked;
    // if (isChecked) {
    //   //checked
    //   if (parseInt(e.target.value) === 0) {
    //     setFilterAllCourses([...courses]);
    //   } else {
    //     let style = parseInt(e.target.value);
    //     let filtered = [];
    //     switch (style) {
    //       case 0:
    //         setFilterAllCourses([...courses]);
    //         break;
    //       case 1:
    //         filtered = courses.filter((course) => {
    //           return course.learning_style === "Self Paced";
    //         });
    //         setFilterAllCourses([...filtered]);
    //         break;
    //       case 2:
    //         filtered = courses.filter((course) => {
    //           return course.learning_style === "Instructor Paced";
    //         });
    //         setFilterAllCourses([...filtered]);
    //         break;
    //       default:
    //         return true;
    //     }
    //   }
    // } else {
    //   setFilterAllCourses([...courses]);
    // }
  };

  return (
    <Styles>
      {/* Course Tag */}
      <div className="course-category " style={{ background: "#fff" }}>
        <h5
          style={{
            fontWeight: "300px",
            color: "#000",
            fontSize: "24px",
            fontFamily: "Open Sans",
            lineHight: "34px",
            letterSpacing: "-1px",
            fontWeight: "normal",
          }}
        >
          Learning Style
        </h5>

        <div className="form__group">
          {/*<select name="category" onChange={filterStyle} required>
            <option value="">-- Choose Learning Style --</option>
            <option value="0">All</option>
            <option value="1">Self Paced</option>
            <option value="2">Instructor Paced</option>
          </select>*/}

          <div className="list-group-item-set-group">
            <div style={{ margin: "5px" }}>
              <input
                name="paid-11"
                onChange={filterStyle}
                type="checkbox"
                id={"paid-11"}
                value="1"
                key={"price1"}
              />
              <label for={"paid-11"}>Self Paced</label>
            </div>

            <div style={{ margin: "5px" }}>
              <input
                name="paid-12"
                onChange={filterStyle}
                type="checkbox"
                id={"paid-12"}
                value="2"
                key={"price2"}
              />
              <label for={"paid-12"}>Instructor Paced</label>
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

CourseStyle.propTypes = {
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps)(CourseStyle);
