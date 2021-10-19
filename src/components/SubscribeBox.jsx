import React from 'react';


const SubscribeBox = () => {
    return ( 
        <div class="px-4 py-5 text-center bg-dark subscribe-box">
            <div class="col-lg-4 mx-auto">
                <h2 class="fw-bold text-white">Stay tuned with us and subscribe to our blog</h2>
                <p class="fs-6 mb-4 text-white">The Questence platform allows you plan and learn at your own pace and in your own style.</p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <div class="input-group mb-3">
                    <input type="text" class="form-control top-left-radius-50 bottom-left-radius-50 p-2p5" placeholder="E-mail address" aria-label="E-mail address" aria-describedby="button-addon2" />
                    <button class="btn btn-solid-teal bottom-right-radius-50 top-right-radius-50 width-170" type="button" id="button-addon2">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SubscribeBox;