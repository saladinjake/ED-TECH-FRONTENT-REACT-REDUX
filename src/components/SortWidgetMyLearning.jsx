import React from "react";
const SortWidget = ({ onHandleSort, onFilterCategoriesSearch }) => {
  const querySearch = () => {
    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    return parameters;
  };
  let searchVal = querySearch();
  searchVal = searchVal.get("search");

  const reRouteTo = (e) => {
    e.preventDefault();
    let el = e.target;

    const searchLink = el.options[el.selectedIndex].getAttribute("data-link");
    return (window.location.href = process.env.PUBLIC_URL + searchLink);
  };

  const handleFilterSearch = (e) => {
    e.preventDefault();
    //change this to reroute to page
  };

  const handleReset = (e) => {
    e.preventDefault();
    window.location.href = process.env.PUBLIC_URL + "/mylearning";
  };

  return (
    <div className="container">
      <div className="row bg-white pt-4 pb-2 mx-auto">
        {/* <div className="col-md-8 col-sm-12">
          <button onClick={(e) => {
            
          }} className="btn btn-solid-teal text-14 fw-bold">
            Filter <i class="bi bi-sliders"></i>
          </button>
          <button onClick={(e)=>{handleReset(e)}} className="btn btn-solid-warning mx-2 text-14 fw-bold">
            Reset <i className="bi bi-x"></i>
          </button>
        </div> */}
        <div className="col-sm-6 col-md-5">
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
              onChange={(e) => {
                reRouteTo(e);
              }}
            >
              <option selected>Sort By</option>
              <option
                value="name"
                data-link={`/mylearning?method=name&search=${searchVal}&filter=course&search_menu=naming_convention`}
              >
                Name
              </option>
              <option
                value="pace"
                data-link={`/mylearning?method=pace&search=${searchVal}&filter=course&search_menu=self`}
              >
                Self Paced
              </option>
              <option
                value="fee"
                data-link={`/mylearning?method=fee&search=${searchVal}&filter=course&search_menu=free_course_offering`}
              >
                Free
              </option>
              <option
                value="fee"
                data-link={`/mylearning?method=fee&search=${searchVal}&filter=course&search_menu=payment_required`}
              >
                Paid
              </option>
            </select>
          </div>
        </div>
        <div className="col-sm-6 col-md">
          <div className="float-end">
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
