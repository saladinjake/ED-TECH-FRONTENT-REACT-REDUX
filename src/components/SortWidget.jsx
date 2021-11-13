import React from "react";
const SortWidget = ({ onHandleSort }) => {
  return (
    <div className="container">
      <div className="row bg-white pt-4 pb-2 mx-auto">
        <div className="col-md-8 col-sm-12">
          <button className="btn btn-solid-teal text-14 fw-bold">
            Filter <i class="bi bi-sliders"></i>
          </button>
          <button className="btn btn-solid-warning mx-2 text-14 fw-bold">
            Reset <i className="bi bi-x"></i>
          </button>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="input-group mb-3">
            <label
              className="input-group-text border-0 bg-white fw-bold"
              for="inputGroupSelect01"
            >
              Sort By
            </label>
            <select
              className="form-select bg-light border-0"
              id="inputGroupSelect01"
            >
              <option selected>Release date</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <button
              className="btn btn-light mx-2"
              onClick={() => onHandleSort("grid")}
            >
              <i className="bi bi-grid-fill"></i>
            </button>
            <button
              className="btn btn-light"
              onClick={() => onHandleSort("fullWidth")}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortWidget;
