import React from "react";
import { Styles } from "./styles/coursePrice.js";

const CoursePrice = ({ title, filterType, filtername }) => {
  return (
    <Styles>
      <div className="filter-type">{filterType}</div>
      <div className="course-price">
        {/* <h5>{title}</h5> */}
        {/* <ul className="price-item list-unstyled">
                    <li className="check-btn">
                        <label htmlFor="price1"><input type="checkbox" id="price1" className="check-box" />All<span>(121)</span></label>
                    </li>
                    <li className="check-btn">
                        <label htmlFor="price2"><input type="checkbox" id="price2" className="check-box" />Free<span>(09)</span></label>
                    </li>
                    <li className="check-btn">
                        <label htmlFor="price3"><input type="checkbox" id="price3" className="check-box" />Paid<span>(77)</span></label>
                    </li>
                    <li className="check-btn">
                        <label htmlFor="price4"><input type="checkbox" id="price4" className="check-box" />Scholarship<span>(35)</span></label>
                    </li>
                </ul> */}

        <div className="form-group select-filter">
          <select className="form-control">
            <option value="">{filtername}</option>
          </select>
        </div>
      </div>
    </Styles>
  );
};

export default CoursePrice;
