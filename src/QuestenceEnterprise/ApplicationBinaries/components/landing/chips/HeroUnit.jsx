import React from 'react';


const HeroUnit = () => {
    return ( 
        <>
            <div className="border-bottom shadow-sm my-auto hero-banner-bg px-4 py-5 my-5 text-center">
                <div className="container">
                    <div className="row pb-0 pe-lg-0 pt-lg-5 rounded-3">
                        <div className="col-lg-6 offset-lg-3 p-3 p-lg-5 pt-lg-3 d-flex flex-column">
                            <h1 className="heading-lg text-center fw-bold lh-1 mb-4 text-white">Accelerate your quest, learn anywhere, anytime</h1>
                            <p className="p-lg-font text-white text-center">Acquire new knowledge and skills, train for certification diplomas and degrees from world-class instituitions at your own pace and space.</p>
                            {/* <div class="d-grid gap-2 d-md-flex align-items-center justify-content-md-start mb-4 mb-lg-3 mt-4">
                                <a class="btn btn-outline-light d-block border-radius-50 btn-sm px-4 me-md-2 fw-bold">Log In</a>
                                <a class="btn btn-solid-teal border-radius-50 d-block btn-sm px-4">Sign Up</a>
                            </div> */}
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <a className="btn btn btn-outline-light border-radius-50 btn-sm px-4 gap-3 modal-link">Log In</a>
                                <a type="button" className="btn btn-solid-teal border-radius-50 btn-sm px-4 modal-link2">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default HeroUnit;