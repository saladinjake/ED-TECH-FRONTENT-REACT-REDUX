import React from "react";

const InstructorCard = ({
  authorName,
  authorImage,
  authorPosition,
  authorCompany,
}) => {
  return (
    <div className=" left-flexes">
      <div className="m-2 border-0 card border-radius-20 p-0">
      <ul class=" trigger-nav">
          <li class="" data-toggle="tab">
              <a href="./terms-of-service" >Terms Of Use</a></li>
              <li class="authorText" >
                  <a class="authorText" href="./honour-code" data-toggle="tab" >Honour Code</a></li>
                  <li class="authorText" >
                <a class="authorText" href="./privacy" data-toggle="tab" >Privacy Policy</a></li></ul>
      </div>
    </div>
  );
};

export default InstructorCard;
