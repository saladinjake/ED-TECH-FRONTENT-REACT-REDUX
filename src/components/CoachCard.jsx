import React from 'react';


const CoachCard = ({cardTitle, cardImage, cardText, cardText2, cardBtnText}) => {
    return ( 
        <>
        <div className="col m-2">
            <div className="card text-white border-radius-20 overflow-hidden">
                <div style={{height: "auto",width: "100%", overflow: "hidden"}}>
                    <img src={cardImage} className="card-img-top img-fluid" alt="Coaches-img" style={{height:"200px"}}/>
                </div>
                <div className="card-body bg-dark-gradient p-5">
                    <h5 className="card-title text-14">{cardTitle}</h5>
                    <p className="card-text text-14">{cardText}</p>
                    <p className="card-text text-14">{cardText2}</p>
                    <a href="#" className="btn btn-light border-radius-50 btn-sm">{cardBtnText}</a>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default CoachCard;