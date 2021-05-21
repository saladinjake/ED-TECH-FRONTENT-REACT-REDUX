import React from "react";
import { Styles } from "../styles/courseSearch.js";

function CourseSearch({ setSearch, search }) {
  return (
    <Styles>
      {/* Course Search */}
      <div className="course-search card-box">
        <h6>Sort By</h6>
        <br />
        {/* {search} */}
        <form action="#">
          <input
            type="text"
            name="search"
            placeholder="Search Here"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <i className="las la-search"></i>
          </button>
        </form>
      </div>
    </Styles>
  );
}

export default CourseSearch;
