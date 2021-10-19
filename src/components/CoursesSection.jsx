import React from 'react';
import CourseCard from './CourseCard';

const CoursesSection = () => {
    return ( 
        <>
            <div className="container mt-5">
                <h4 className="subheading-1">Featured Courses</h4>
                <div className="row">
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
            </div>
        </>
     );
}
 
export default CoursesSection;