import React from "react";
const SortWidget = ({ onHandleSort ,onFilterCateoriesSearch}) => {

 

  const querySearch = () => {
    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    return parameters;
  };
  let searchVal = querySearch()
  searchVal =  searchVal.get("search")

  const reRouteTo =(e) =>{
      e.preventDefault()
    let el = e.target;

    const searchLink = el.options[el.selectedIndex].getAttribute("data-link")
   return window.location.href=process.env.PUBLIC_URL+ searchLink
  }


  const handleFilterSearch = (e) => {
     e.preventDefault()
     //change this to reroute to page
  }

  const handleReset = (e) => {
    e.preventDefault()
     window.location.href=process.env.PUBLIC_URL+"/courses"
  }


  return (
    <div className="container">
      <div className="row bg-white pt-4 pb-2 mx-auto">
        <div className="col-md-8 col-sm-12">
          {/* <button onClick={(e) => {
            onFilterCateoriesSearch(e)
          }} className="btn btn-solid-teal text-14 fw-bold">
            Filter <i class="bi bi-sliders"></i>
          </button>
          <button onClick={(e)=>{handleReset(e)}} className="btn btn-solid-warning mx-2 text-14 fw-bold">
            Reset <i className="bi bi-x"></i>
          </button> */}
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="input-group mb-3">
            <label
              className="input-group-text border-0 bg-white fw-bold"
              for="inputGroupSelect01"
            >
              Sort By
            </label>
            {/* <select
              className="form-select bg-light border-0"
              id="inputGroupSelect01"
              onChange={(e)=> { reRouteTo(e)}}
            >
              <option selected>Sort By</option>
              <option value="name" data-link={`/courses?method=name&search=${searchVal}&filter=course&applied_search=naming_convention`} >Name</option>
              <option value="pace" data-link={`/courses?method=pace&search=${searchVal}&filter=course&applied_search=cp&search_result=self`} >Self Paced</option>
              <option value="fee" data-link={`/courses?method=fee&search=${searchVal}&filter=course&applied_search=fee&bonus=free_course_offering`} >Free</option>
              <option value="fee" data-link={`/courses?method=fee&search=${searchVal}&filter=course&applied_search=fee&bonus=payment_required`} >Paid</option>
             
            </select> */}
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
