import React, { useEffect } from "react";
import { Styles } from "../styles/courseCategory.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from "jquery";

const CoursePrice = ({ course: { courses }, setFilterAllCourses }) => {
  useEffect(() => {
    $(".list-group-item-set").each(function (i, div) {
      var currentli = $(div);
      $(currentli)
        .find("#paid-1")
        .on("change", function () {
          $(currentli).find("#paid-2").not(this).prop("checked", false);
        });

      $(currentli)
        .find("#paid-2")
        .on("change", function () {
          $(currentli).find("#paid-1").not(this).prop("checked", false);
        });
    });
  });

  const filterPrice = (e) => {
    // const isChecked = e.target.checked;
    // if (isChecked) {
    //   //checked
    //   let price = parseInt(e.target.value);
    //   let filtered = [];
    //   switch (price) {
    //     case 2:
    //       filtered = courses.filter((course) => {
    //         return parseInt(course.price) === parseInt(0);
    //       });
    //       setFilterAllCourses([...filtered]);
    //       break;
    //     case 1:
    //       filtered = courses.filter((course) => {
    //         return parseInt(course.price) > parseInt(0);
    //       });
    //       setFilterAllCourses([...filtered]);
    //       break;
    //     default:
    //       return true;
    //   }
    // } else {
    //   //unchecked
    //   setFilterAllCourses([...courses]);
    // }
  };

  return (
    <Styles>
      {/* Course Price */}
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
          Filter By Price
        </h5>
        <div className="form__group">
          {/*<select name="category" onChange={filterPrice} required>
            <option value="">-- Filter By Price --</option>
            <option value="0">All</option>
            <option value="1">Paid</option>
            <option value="2">Free</option>
          </select>*/}

          <div className="list-group-item-set">
            <div style={{ margin: "5px" }}>
              <input
                name="paid-1"
                onChange={filterPrice}
                type="checkbox"
                id={"paid-1"}
                value="1"
                key={"price1"}
              />
              <label for={"paid-1"}>Paid</label>
            </div>

            <div className="list-group-item-set" style={{ margin: "5px" }}>
              <input
                name="paid-1"
                onChange={filterPrice}
                type="checkbox"
                id={"paid-2"}
                value="2"
                key={"price2"}
              />
              <label for={"paid-2"}>Free</label>
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

CoursePrice.propTypes = {
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps)(CoursePrice);
