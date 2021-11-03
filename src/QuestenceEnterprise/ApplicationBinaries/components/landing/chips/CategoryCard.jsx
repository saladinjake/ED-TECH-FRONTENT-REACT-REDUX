import React from 'react';


const CategoryCard = () => {
    return (
        <div className="col m-2">
            <div className="card shadow-md border-radius-20 bg-grey-gradient shadow-sm">                   
                <div className="card-body px-5 py-5 bg-grey-gradient top-right-radius-20 top-left-radius-20">

                    <h5 className="card-title text-white">PHYSICAL SCIENCES</h5>
                    <h6 className="card-subtitle text-white mt-4">Biology, Physics, Chemistry, Environmental Studies, Agricultural Science</h6>
                </div>
                <div className="card-footer bg-white border m-0 border-radius-20">
                    <div className="row pt-2">
                        <a href="#" className="text-center fs-6 p-2 fw-bold text-decoration-none text-dark col q-text-link">Category</a>
                        <a href="#" className="text-center fs-6 p-2 fw-bold text-decoration-none text-dark col q-text-link">Details</a>
                    </div>
                </div>
            </div>
        </div> 
     );
}
 
export default CategoryCard;