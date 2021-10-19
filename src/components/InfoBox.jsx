import React from 'react';
import ImageCard from './ImageCard';

const InfoBox = () => {
    return ( 
    <>
        <div className="container">
            <div className="row py-5">
                <div className="col-4">
                    <img src="/Main.png" className="w-100"/>
                    <div class="d-block w-100"><a href="" className="w-100 d-block text-center border-radius-50 bg-dark fs-3 opacity-50 text-white py-3 text-decoration-none fw-bold">Meet your Teachers</a></div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col bg-dark-gradient text-white border-radius-15 p-4">
                            <p className="text-uppercase fs-4 fw-bold">OLUYEMI ADEOSUN</p>
                            <p>Join me on Questence for exciting adventure as we muster the basics of playing the guitar.</p>
                            <p>ELECTED MEMBER  |  GOVERNING COUNCIL  |  CHARTERED INSTITUTE OF PERSONAL MANAGEMENT (CIPM)  |  SPHRI GPHR MCIPM MBA MSC</p>
                            <p className="float-end"><a href="" className="btn btn-light border-radius-50 btn-lg">Start Learning</a></p>
                        </div>
                    </div> 
                    <div className="row mt-4 gx-4">
                        <div className="col">
                            <ImageCard ImgUrl="/main 1.png" />
                        </div>
                        <div className="col">
                            <ImageCard ImgUrl="/main 2.png" />
                        </div>
                        <div className="col">
                            <ImageCard ImgUrl="/main 3.png" />
                        </div>
                    </div> 
                </div>
            </div> 
        </div>
    </>
    );
}
 
export default InfoBox;