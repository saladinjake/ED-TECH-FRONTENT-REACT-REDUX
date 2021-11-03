import React from 'react';


const CourseCard = () => {
    return (
        
            // <div className="">
                <div className="m-2 card border-radius-20 shadow-sm">
                    <img src="/course-1.png" className="card-img-top" alt="..." /> 
                    <div className="col-4 offset-8 bottom-left-radius-20 fw-bold text-center p-2 bg-grey text-white">N10, 000</div>
                        
                    <div className="card-body">
                    
                        <h5 className="card-title text-light-green">MITX-LAUNCHX</h5>
                        <h6 className="card-subtitle text-light-green">Becoming An Entrepreneur</h6>
                        <p className="mt-2 text-14">Amazon Service <br/> Martin Caulpepper</p>
                        {/* <p className="card-text">Martin Caulpepper</p> */}
                        <div className="row border-top pt-2">
                            <a href="#" className="border-end text-center fw-bold text-decoration-none text-danger col q-text-link">See Details</a>
                            <a href="#" className="border-end text-center fw-bold text-decoration-none text-warning col q-text-link">Wishlist</a>
                            <a href="#" className="text-center fw-bold text-decoration-none text-success col q-text-link">Buy</a>
                        </div>
                    </div>
                </div>
            // </div> 
        
     );
}
 
export default CourseCard;