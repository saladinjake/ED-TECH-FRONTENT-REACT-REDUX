import React from 'react';


const SubscribeBox = () => {
    return ( 
        <div className="px-4 py-5 text-center bg-dark subscribe-box">
            <div className="col-lg-4 mx-auto">
                <h2 className="fw-bold text-white">Stay tuned with us and subscribe to our blog</h2>
                <p className="fs-6 mb-4 text-white">The Questence platform allows you plan and learn at your own pace and in your own style.</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <div className="input-group mb-3">
                    <input type="text" className="form-control top-left-radius-50 bottom-left-radius-50 p-2p5" placeholder="E-mail address" aria-label="E-mail address" aria-describedby="button-addon2" />
                    <button className="btn btn-solid-teal bottom-right-radius-50 top-right-radius-50 col-md-3 col-sm-4" type="button" id="button-addon2">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SubscribeBox;