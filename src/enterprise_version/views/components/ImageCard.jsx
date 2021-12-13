import React from 'react';


const ImageCard = ({ImgUrl}) => {
    return ( 
        <>
            {/* <div className="card" > */}
                <img src={ImgUrl} className="card-img-top border-radius-10" alt="Teacher's Picture" />
            {/* </div>   */}
        </>
     );
}
 
export default ImageCard;