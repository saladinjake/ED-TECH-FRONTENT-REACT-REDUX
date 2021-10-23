import React from 'react';


const SlickNextArrow = (props) => {
    const { className, style, onClick } = props;
    return ( 
        <button className="slick-arrow slick-next" style={{ ...style, background: "white" }} onClick={onClick}>
            
        </button>
     );
}
 
export default SlickNextArrow;