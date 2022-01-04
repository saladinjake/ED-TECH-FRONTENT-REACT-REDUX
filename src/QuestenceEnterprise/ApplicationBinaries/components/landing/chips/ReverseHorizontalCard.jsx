import React from 'react';


const ReverseHorizontalCard = () => {
    return ( <>
        <div className="container d-none d-md-flex">
            <div className="card mb-5 border-radius-20 border-0 mt-5">
                <div className="row g-0">
                    <div className="col-md-6 bg-green-gradient top-left-radius-20 bottom-left-radius-20 d-flex align-items-center">
                        <div className="card-body text-white px-5">
                            <h3 className="text-24 fw-bold">Building new skill with ease and earn recognized credential</h3>
                            <p className="card-text text-14">Learn anytime, anywhere, at your own space with an interactive multimedia content provided by world-class institutions and trainers, while receiving instant feedback through online exercises and grading.  We also offer the option to earn a verified certificate upon successful completion of a course.</p>
                            <a href="" className="btn btn-light border-radius-50 btn-sm px-4">Start Learning</a>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 top-right-radius-20 bottom-right-radius-20 overflow-hidden">
                        <img src="/buildingNewSkill.png" className="" alt="BuildWithUs-Questence" style={{width:"100%"}} />
                    </div>
                </div>
            </div>
        </div>
        <div className="container d-md-none my-5">
            <div className="card text-white border-radius-20 overflow-hidden">
                <div style={{height: "auto",width: "100%", overflow: "hidden"}}>
                    <img src="/buildingNewSkill-mobile.png" className="card-img-top img-fluid" alt="Coaches-img" />
                </div>
                <div className="card-body bg-green-gradient p-4">
                    <h5 className="card-heading ">Building new skill with ease and earn recognized credential</h5>
                    <p className="card-text text-14">Learn anytime, anywhere, at your own space with an interactive multimedia content provided by world-class institutions and trainers, while receiving instant feedback through online exercises and grading.  We also offer the option to earn a verified certificate upon successful completion of a course.</p>
                    <a href="#" className="btn btn-light border-radius-50 btn-sm">Read more</a>
                </div>
            </div>
        </div>
    </> );
}
 
export default ReverseHorizontalCard;