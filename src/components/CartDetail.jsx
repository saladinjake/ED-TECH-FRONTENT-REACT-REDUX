import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import TextCard from "./TextCard";
import InstructorCard from "./InstructorCard";

const CartDetail = () => {
  const [activeKey, setActiveKey] = useState("home");
  return (
    <>
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-8">
            <div className="mt-n-0-9 col-md-11 bg-teal pills-link col-md-10 px-4 py-2 bottom-left-radius-15 bottom-right-radius-15">
              <div className="row">
                <div className="col-8 col-sm-6">Course Details</div>
                <div className="col-4 col-sm-6 text-end">Price</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-11 border-radius-10 border shadow-sm mx-1 my-3 height-419px overflow-auto"></div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-teal mt-5 border-radius-10">
              <div className="text-center p-3">Cart Summary</div>
              <div className="height-370px border-bottom"></div>
              <div className="row px-3 py-2">
                <div className="col">Total</div>
                <div class="col text-end">N 0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
