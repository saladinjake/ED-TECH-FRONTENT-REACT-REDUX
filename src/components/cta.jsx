import React from "react";
import professor from "assets/svgs/professor.svg";
import university from "assets/svgs/university.svg";
import "./styles/cta.scss";

const CTA = () => {
  return (
    <section className="cta mainCta"  >
      
            <div className="cta__item brown" style={{background: `linear-gradient(200deg, #6441A5 30%, #2a0845 60%)` }}>
              <figure class="cta__item-icon mt-xs">
                <img src={professor} alt="professor" />
              </figure>
              <h3 className="badge mt-xs">For Businesses</h3>
              <p className="info mt-xs">
              Using our courses as it is or customized, or using our platform for your own internal courses, 
              our aim is to help you create essential skills pathways with verifiable and stackable credentials 
              to upskill and train every employee with the highest quality eLearning experiences, in 
              today's most job-relevant subject areas.
              </p>
              <button className="mt-xs">Read More</button>
            </div>

            <div className="cta__item inst" style={{background: `linear-gradient(200deg, #6441A5 30%, #2a0845 60%)` }}>
              <figure class="cta__item-icon mt-xs">
                <img src={university} alt="university" />
              </figure>
              <h3 className="badge mt-xs">For Governments</h3>
              <p className="info mt-xs">
              In addition to the need to provide adequate training and education for their staff, 
              some government agencies also have the responsibilities to provide training and skill 
              acquisition services to the public. We are poised to work with any government agency to 
              help them achieve these training needs using our world-class eLearning platform.
              </p>
              <button className="mt-xs">Read More</button>
            </div>
          
    </section>
  );
};

export default CTA;
