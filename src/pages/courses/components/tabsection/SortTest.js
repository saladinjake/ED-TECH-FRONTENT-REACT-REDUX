import React, { useState, useEffect } from "react";
import { getCategories } from "services/category";

function SortTest({ course: { courses }, setFilterAllCourses }) {
  // console.log(course)

  const [categories, setCategories] = useState([]);

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

  const filterCategory = (e) => {
    if (parseInt(e.target.value) === 0) {
      setFilterAllCourses([...courses]);
    } else {
      const filtered = courses.filter((course) => {
        return parseInt(course.category_id) === parseInt(e.target.value);
      });
      setFilterAllCourses([...filtered]);
    }
  };

  return (
    <div className="App">
      <div className="course-category card-box">
        <h5>Course Category</h5>

        <div className="form__group">
          <select name="category" onChange={filterCategory} required>
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
          </select>
        </div>
      </div>

      {courses.map((band) => (
        <div key={band.id} style={{ margin: "30px" }}>
          hello
        </div>
      ))}
    </div>
  );
}
export default SortTest;
