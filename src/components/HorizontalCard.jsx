import React from 'react';


const HorizontalCard = () => {
    return ( <>
        <div className="container d-none d-md-flex">
            <div className="card mb-5 border-radius-20 border-0 mt-5">
                <div className="row g-0">
                    <div className="col-md-5">
                        <img src="/partnerWithUs.png" className="img-fluid rounded-start-20" alt="..." style={{width:"100%"}}/>
                    </div>
                    <div className="col-md-7 bg-green-gradient top-right-radius-20 bottom-right-radius-20 p-4 d-flex align-items-center">
                        <div className="card-body text-white">
                            <h3 className="fs-2 fw-bold">Partner With Us</h3>
                            <h5 className="fs-4">For Business</h5>
                            <p className="card-text">Using our courses as it is or customized, or using our platform for your own internal courses, our aim is to help you create essential skills pathways with verifiable  and stackable credentials to upskill and train every  employee with the highest quality eLearning  experiences in today’s most wanted job relevant subject areas.</p>
                            <a href="" className="btn btn-light border-radius-50 btn-sm px-4">Read more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container d-md-none my-5">
            <div className="card text-white border-radius-20 overflow-hidden">
                <div style={{height: "auto",width: "100%", overflow: "hidden"}}>
                    <img src="/partnerWithUs-mobile.png" className="card-img-top img-fluid" alt="Coaches-img" />
                </div>
                <div className="card-body bg-green-gradient p-4">
                    <h5 className="card-heading ">Partner With Us</h5>
                    <p className="card-text">For Business</p>
                    <p className="card-text text-14">Using our courses as it is or customized, or using our platform for your own internal courses, our aim is to help you create essential skills pathways with verifiable  and stackable credentials to upskill and train every  employee with the highest quality eLearning  experiences in today’s most wanted job relevant subject areas.</p>
                    <a href="#" className="btn btn-light border-radius-50 btn-sm">Read more</a>
                </div>
            </div>
        </div>
    </> );
}
 
export default HorizontalCard;