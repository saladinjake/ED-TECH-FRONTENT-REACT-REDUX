import React from "react";

const SearchWidget = ({actionTrigger}) => {

 const  handleSearch = (e) =>{
   actionTrigger(e)
  };

  return (
    <div className="container">
      <div className="row pt-4 pb-2 mx-auto">
        <div className="col-sm-12 col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control py-2"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              id="search"
            />
            <button
              className="btn btn-secondary"
              type="button"
              id="search-btn"
              onClick={(e)=>{ handleSearch(e)}}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWidget;
