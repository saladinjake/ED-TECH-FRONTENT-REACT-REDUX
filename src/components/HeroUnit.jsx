import React from 'react';


const HeroUnit = () => {
    return ( 
        <>
            <div className="border-bottom shadow-sm my-auto hero-banner-bg min-height-430">
                <div class="container">
                    <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 rounded-3">
                        <div class="col-lg-6 p-3 p-lg-5 pt-lg-3 d-flex flex-column offset-lg-6">
                            <h1 class="heading-lg fw-bold lh-1 mb-4 text-green">Accelerate your quest, learn anywhere, anytime</h1>
                            <p class="p-lg-font">Acquire new knowledge and skills, train for certification diplomas and degrees from world-class instituitions at your own pace and space.</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3 mt-4">
                                <a class="btn btn-outline-dark border-radius-50 btn-sm px-4 me-md-2 fw-bold">Log In</a>
                                <a class="btn btn-solid-teal border-radius-50 btn-sm px-4">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default HeroUnit;