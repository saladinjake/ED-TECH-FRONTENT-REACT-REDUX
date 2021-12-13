import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useHistory ,withRouter } from 'react-router-dom'; // version 5.2.0

const AuthSidebarMenus = () => {
//  let history = useHistory ();
  const [domRefresh,setDomRefresh] = useState(Math.random()*400)
  
  return (
    <>
      <div key={domRefresh} className="bg-green-gradient mt-n-0-4 px-4 py-3 bottom-left-radius-20 bottom-right-radius-20">
        <ul className="nav flex-column pills-link col-md-10 text-center offset-md-1">
          <li className="nav-item py-2">
            <a  
              className="nav-link text-white inherit active induct"
              aria-current="page"
              href={process.env.PUBLIC_URL+"/mylearning?search_menu=all&optimize=true&max_range=1000"}
             data-nameval="all"
            >
              All Courses
            </a>
          </li>
          <li className="nav-item py-2">
            <a 
             data-nameval="active"
              className="induct nav-link text-white" href={process.env.PUBLIC_URL+"/mylearning?search_menu=active&optimize=true&max_range=1000"}>
              Active Courses
            </a>
          </li>
          <li className="nav-item py-2">
            <a 
             data-nameval="upcoming"
              className="induct nav-link text-white" href={process.env.PUBLIC_URL+"/mylearning?search_menu=upcoming&optimize=true&max_range=1000"}>
              Upcoming Courses
            </a>
          </li>
          <li className="nav-item py-2">
            <a data-nameval="completed"   className="induct nav-link text-white" href={process.env.PUBLIC_URL+"/mylearning?search_menu=completed&optimize=true&max_range=1000"}>
              Completed Courses
            </a>
          </li>
          <li className="nav-item py-2">
            <a data-nameval="expired"   className="induct nav-link text-white" href={process.env.PUBLIC_URL+"/mylearning?search_menu=expired&optimize=true&max_range=1000"}>
              Expired Courses
            </a>
          </li>
          <li className="nav-item py-2">
            <a data-nameval="accomplished"   className="induct nav-link text-white" href={process.env.PUBLIC_URL+"/mylearning?search_menu=accomplished&optimize=true&max_range=1000"}>
              Accomplishment
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
 
export default withRouter(AuthSidebarMenus);
