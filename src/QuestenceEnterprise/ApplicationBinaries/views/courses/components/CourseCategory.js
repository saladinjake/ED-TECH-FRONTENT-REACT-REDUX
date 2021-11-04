import React, { useState, useEffect, Fragment } from "react";
import { Styles } from "../styles/courseCategory.js";
import { getCategories } from "../../../api/enrollment_services/category.services";


import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import "./checkbox_filter.css";

const CourseCategory = (props) => {
  const {
    course: { courses },
    setFilterAllCourses,
  } = props;
  const [categories, setCategories] = useState([]);

  let selectedSearchFormNav = null;

  const [batchedCategories, setBatchedCategories] = useState([]);
  const [combinedCategories, setCombinedCategories] = useState([]);

  const [categoriesClone, setCategoriesCloned] = useState([]);

  const history = useHistory();

  useEffect(() => {
    (async function loadContent() {
      await fetchCategories();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    $(document).ready(function () {
      if (history.location.pathname.match("courses/category")) {
        setTimeout(() => {
          let idCkecked = history?.location?.pathname?.split("/")?.pop();
          if (idCkecked) {
            // let el = document.getElementById("reset-display");
            // el.style.display=""
            $("input[type=checkbox].sudo-get-category").each(function () {
              if ($(this).val() == idCkecked) {
                this.checked = "checked";
              }
            });
          }
        }, 5000);
      }
    });
  });

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
    document.getElementById("cat-form").style.display = "block";

    document.getElementById("style-boxes").style.display = "block";
    document.getElementById("price-boxes").style.display = "block";

    // $("input[type=checkbox].sudo-get-category").each(function (
    $("input[type=checkbox]").each(function (index, checkbox) {
      // if (index != 0) {
      checkbox.checked = false;
      // window.location.reload()

      // }
    });
    setFilterAllCourses([...courses]);
    setCategoriesCloned([...courses]);

    if (document.getElementById("search-result")) {
      document.getElementById("search-result").style.display = "none";
      window.location.href = process.env.PUBLIC_URL + "/courses";
    }
  };

  const filterCategoryByFilterBtn = () => {
    //works for only category section
    document.getElementById("cat-form").style.display = "none";
    document.getElementById("style-boxes").style.display = "none";
    document.getElementById("price-boxes").style.display = "none";
    if (categoriesClone.length > 0) {
      setFilterAllCourses([...categoriesClone]);
    } else {
      // setCategoriesCloned([...courses])
      setFilterAllCourses([...courses]);
    }

    //now if filter by price is checked
    if (
      document.getElementById("paid-2") &&
      document.getElementById("paid-1") &&
      categoriesClone?.length > 0
    ) {
      let price_free = document.getElementById("paid-2");
      let price_paid = document.getElementById("paid-1");
      let isChecked = price_free?.checked
        ? price_free?.checked
        : price_paid?.checked
        ? price_paid?.checked
        : false;
      let elementChecked = price_free?.checked
        ? price_free
        : price_paid?.checked
        ? price_paid
        : null;
      //we have element checked and the value then we switch between the element and values
      if (isChecked === true && elementChecked !== null) {
        //checked
        let price = parseInt(elementChecked?.value);
        let filtered = [];
        switch (price) {
          case 2:
            filtered = categoriesClone.filter((course) => {
              return parseInt(course.price) === parseInt(0);
            });
            setFilterAllCourses([...filtered]);
            break;
          case 1:
            filtered = categoriesClone.filter((course) => {
              return parseInt(course.price) > parseInt(0);
            });
            setFilterAllCourses([...filtered]);
            break;
          default:
            setFilterAllCourses([...categoriesClone]);
            break;
        }
      }
    } else {
      let price_free = document.getElementById("paid-2");
      let price_paid = document.getElementById("paid-1");
      let isChecked = price_free?.checked
        ? price_free?.checked
        : price_paid?.checked
        ? price_paid?.checked
        : false;
      let elementChecked = price_free?.checked
        ? price_free
        : price_paid?.checked
        ? price_paid
        : null;

      let price = parseInt(elementChecked?.value);
      let filtered = [];
      switch (price) {
        case 2:
          filtered = courses.filter((course) => {
            return parseInt(course.price) === parseInt(0);
          });
          setFilterAllCourses([...filtered]);
          break;
        case 1:
          filtered = courses.filter((course) => {
            return parseInt(course.price) > parseInt(0);
          });
          setFilterAllCourses([...filtered]);
          break;
        default:
          return true;
      }
    }

    //filter by learning style

    if (
      document.getElementById("paid-11") &&
      document.getElementById("paid-12") &&
      categoriesClone.length > 0
    ) {
      let learning_style_self = document.getElementById("paid-11");
      let learning_style_instructor = document.getElementById("paid-12");
      let isChecked = learning_style_self.checked
        ? learning_style_self.checked
        : learning_style_instructor.checked
        ? learning_style_instructor.checked
        : false;
      let elementChecked = learning_style_self.checked
        ? learning_style_self
        : learning_style_instructor.checked
        ? learning_style_instructor
        : null;
      //we have element checked and the value then we switch between the element and values
      if (isChecked === true && elementChecked !== null) {
        //checked
        let style = parseInt(elementChecked.value);
        let filtered = [];
        switch (style) {
          case 0:
            setFilterAllCourses([...categoriesClone]);
            break;
          case 1:
            filtered = categoriesClone.filter((course) => {
              return course.learning_style === "Self Paced";
            });
            setFilterAllCourses([...filtered]);
            break;
          case 2:
            filtered = categoriesClone.filter((course) => {
              return course.learning_style === "Instructor Paced";
            });
            setFilterAllCourses([...filtered]);
            break;
          default:
            setFilterAllCourses([...categoriesClone]);
            break;
        }
      }
    } else {
      let learning_style_self = document.getElementById("paid-11");
      let learning_style_instructor = document.getElementById("paid-12");
      let isChecked = learning_style_self.checked
        ? learning_style_self.checked
        : learning_style_instructor.checked
        ? learning_style_instructor.checked
        : false;
      let elementChecked = learning_style_self.checked
        ? learning_style_self
        : learning_style_instructor.checked
        ? learning_style_instructor
        : null;

      let style = parseInt(elementChecked.value);
      let filtered = [];
      switch (style) {
        case 2:
          filtered = courses.filter((course) => {
            return parseInt(course.price) === parseInt(0);
          });
          setFilterAllCourses([...filtered]);
          break;
        case 1:
          filtered = courses.filter((course) => {
            return parseInt(course.price) > parseInt(0);
          });
          setFilterAllCourses([...filtered]);
          break;
        default:
          return true;
      }
    }
  };

  const filterCategory = (e) => {
    let unselected = [];

    if (document.getElementById("search-result")) {
      let element = document.getElementById("search-result");
      element.style.display = "none";
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
        // setFilterAllCourses([...courses]);
        setCategoriesCloned([...courses]);
      } else {
        // setFilterAllCourses([...filtered]);
        setCategoriesCloned([...filtered]);
      }
    } else {
      //unchecked

      let filteredUnchecked = [];

      let uniqueDeleted = batchedCategories.filter(
        (ids) => parseInt(ids) !== parseInt(e.target.value)
      );
      unselected.push(parseInt(e.target.value)); //what was deselected

      let dataResult = uniqueDeleted.filter(onlyUnique);

      uniqueDeleted = dataResult.filter((catId) => catId != e.target.value);
      // setBatchedCategories([...uniqueDeleted])
      setBatchedCategories([...uniqueDeleted]);

      //array diff is the subset of what is required
      // unselected = arrayDiff(batchedCategories, unselected);
      unselected = uniqueDeleted;
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
        // setFilterAllCourses([...courses]);
        setCategoriesCloned([...courses]);
      } else {
        // setFilterAllCourses([...filteredUnchecked]);
        setCategoriesCloned([...filteredUnchecked]);
      }
    }
  };

  return (
    <Fragment>
      <Styles>
        {/* Course Search */}
        <div className="course-search">
          <div style={{ margin: "3px" }}>
            <button
              style={{
                width: "100px",
                color: "#fff",
                background: "#0253c8",
                height: "40px",
                padding:"5px",
                fontSize: "14px",
              }}
              className="act-cat"
              onClick={filterCategoryByFilterBtn}
              value="Reset"
              id="btnUncheckAll"
            >
              <span style={{ marginTop: "-30px", padding: "5px" }}>Filter</span>
            </button>

            <button
              style={{
                width: "100px",
                height: "40px",
                background: "#fff",
               
                fontSize: "14px",
              }}
              className="act-cat"
              onClick={handleReset}
              value="Reset"
              id="btnUncheckAll"
            >
              <span
                style={{
                  marginTop: "-30px",
                  padding: "5px",
                  background: "#fff",
                }}
              >
                Reset
              </span>
            </button>
          </div>
        </div>
      </Styles>

      <Styles>
        {/* Course Tag */}
        <div
          id="cat-form"
          className="course-category hide"
          style={{ background: "#fff" }}
        >
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
            Course Category
          </h5>

          <div className="form__group boxes">
           
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
                    <label
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        fontSize: "14px",
                      }}
                      for={"box-" + category.id}
                    >
                      {" "}
                      {category.name}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="course-category shown" style={{ background: "#fff" }}>
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
            Course Category
          </h5>

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
                    <label
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        fontSize: "14px",
                      }}
                      for={"box-" + category.id}
                    >
                      {" "}
                      {category.name}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
      </Styles>
    </Fragment>
  );
};

CourseCategory.propTypes = {
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps)(CourseCategory);
