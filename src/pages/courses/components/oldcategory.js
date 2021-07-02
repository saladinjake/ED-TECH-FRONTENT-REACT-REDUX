import React, { useState, useEffect } from "react";
import { Styles } from "../styles/courseCategory.js";
import { getCategories } from "services/category";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from "jquery";

import "./checkbox_filter.css";

const CourseCategory = ({ course: { courses }, setFilterAllCourses }) => {
  const [categories, setCategories] = useState([]);
  let selectedSearchFormNav = null;

  const [batchedCategories, setBatchedCategories] = useState([]);
  const [combinedCategories, setCombinedCategories] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      await fetchCategories();
    })();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    try {
      let res = await getCategories();
      await setCategories([...res.data.data]);
    } catch (err) {}
  };

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  // usage example:
  // var a = ['a', 1, 'a', 2, '1'];
  // var unique = a.filter(onlyUnique);

  // diff between just two arrays:
  function arrayDiff(a, b) {
    return [
      ...a.filter((x) => !b.includes(x)),
      ...b.filter((x) => !a.includes(x)),
    ];
  }

  // diff between multiple arrays:
  function arrayDiff(...arrays) {
    return [].concat(
      ...arrays.map((arr, i) => {
        const others = arrays.slice(0);
        others.splice(i, 1);
        const unique = [...new Set([].concat(...others))];
        return arr.filter((x) => !unique.includes(x));
      })
    );
  }

  function arrayDiffByKey(key, ...arrays) {
    return [].concat(
      ...arrays.map((arr, i) => {
        const others = arrays.slice(0);
        others.splice(i, 1);
        const unique = [...new Set([].concat(...others))];
        return arr.filter((x) => !unique.some((y) => x[key] === y[key]));
      })
    );
  }

  const handleReset = () => {
    // $(document).ready(function () {
    // $('#btnUncheckAll').click(function () {
    $("input[type=checkbox].sudo-get-category").each(function (
      index,
      checkbox
    ) {
      // if (index != 0) {
      checkbox.checked = false;
      // window.location.reload()

      // }
    });
    setFilterAllCourses([...courses]);
    // });
    // });
  };

  const filterCategory = (e) => {
    let unselected = [];

    if(document.getElementById("search-result")){
          let element = document.getElementById("search-result")
          element.style.display="none"
    }

    let newBatch = batchedCategories;

    const isChecked = e.target.checked;
    if (isChecked) {
      //checked

      let unique = [];
      let filteredUnchecked = [];
      let filtered = [];

      unique = batchedCategories.push(parseInt(e.target.value));
      unique = batchedCategories.filter(onlyUnique);
      setBatchedCategories([...unique]);

      courses.forEach((course) => {
        if (unique.indexOf(parseInt(course.category_id)) >= 0) {
          filtered.push(course);
        }
      });

      if (!(filtered.length > 0)) {
        setFilterAllCourses([...courses]);
      } else {
        setFilterAllCourses([...filtered]);
      }
    } else {
      //unchecked

      let filteredUnchecked = [];
      let uniqueDeleted = batchedCategories;
      unselected.push(parseInt(e.target.value)); //what was deselected

      let dataResult = uniqueDeleted.filter(onlyUnique);

      uniqueDeleted = dataResult.filter((catId) => catId != e.target.value);
      // setBatchedCategories([...uniqueDeleted])

      //array diff is the subset of what is required
      unselected = arrayDiff(batchedCategories, unselected);

      console.log(unselected);

      courses.forEach((course) => {
        if (unselected.includes(parseInt(course.category_id))) {
          // unselected.pop()
          filteredUnchecked.push(course);
        } else {
          // console.log(unselected.indexOf(parseInt(course.category_id)),course.category_id)
        }
      });

      console.log(filteredUnchecked, unselected);

      if (!(filteredUnchecked.length > 0)) {
        setFilterAllCourses([...courses]);
      } else {
        setFilterAllCourses([...filteredUnchecked]);
      }
    }

    //works for single selection of item

    // const isChecked = e.target.checked;
    //  if(isChecked){ //checked
    //    const filtered = courses.filter((course) => {
    //        return parseInt(course.category_id) === parseInt(e.target.value);
    //      });
    //      setFilterAllCourses([...filtered]);

    //  }else{ //unchecked
    //    setFilterAllCourses([...courses]);

    //  }

    //old documentation works for select  option html element and single item check or radio button

    // if (parseInt(e.target.value) === 0) {
    //   setFilterAllCourses([...courses]);
    // } else {
    //   const filtered = courses.filter((course) => {
    //     return parseInt(course.category_id) === parseInt(e.target.value);
    //   });
    //   setFilterAllCourses([...filtered]);
    // }
  };

  return (
    <Styles>
      {/* Course Tag */}
      <div className="course-category" style={{ background: "#fff" }}>
        <h5>Course Category</h5>

        <div className="form__group boxes">
          {/*<select
            id="selectedSearch"
            name="category"
            onChange={filterCategory}
            required
          >
            <option value="">-- Choose Category --</option>
            <option value="0">All</option>
            {categories.length > 0 &&
              categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
          </select>*/}

          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <div style={{ margin: "5px" }}>
                  <input
                    className="sudo-get-category"
                    onInput={filterCategory}
                    type="checkbox"
                    id={"box-" + category.id}
                    value={category.id}
                    key={category.id}
                  />
                  <label for={"box-" + category.id}> {category.name}</label>
                </div>
              );
            })}
        </div>

        <button onClick={handleReset} value="Reset" id="btnUncheckAll">
          Reset
        </button>
      </div>
    </Styles>
  );
};

CourseCategory.propTypes = {
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps)(CourseCategory);
