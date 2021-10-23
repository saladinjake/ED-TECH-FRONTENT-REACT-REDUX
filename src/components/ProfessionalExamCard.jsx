import React from 'react';


const ProfessionalExamCard = ({imgUrl}) => {
    return (
        <div className="col m-2">
            <div className="card shadow-md border-radius-20  shadow-sm">                   
                <div className="card-body px-5 py-5 top-right-radius-20 top-left-radius-20">
                <img src={imgUrl} className="img-fluid top-right-radius-20 bottom-right-radius-20" alt="..." />
                </div>
                <div className="card-footer bg-grey-gradient border m-0 border-radius-20">
                    <div className="row pt-2">
                        <a href="#" className="text-center fs-6 p-2 fw-bold text-decoration-none text-white col q-text-link">Program</a>
                        <a href="#" className="text-center fs-6 p-2 fw-bold text-decoration-none text-white col q-text-link">Details</a>
                    </div>
                </div>
            </div>
        </div> 
     );
}
 
export default ProfessionalExamCard;