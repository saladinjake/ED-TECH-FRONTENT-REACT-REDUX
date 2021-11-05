import React, { useEffect, useState } from "react";
import InstructorNavBar from "../../components/shared/NavBar"; //old
import Footer from "../../components/shared/Footer";

import InstructorBox from "../../components/InstructorBox";

import { getInstructorInfo } from "../../api/enrollment_services/dashboard.services";

const DashBoard = () => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getInstructorInfo();
        setInfo({ ...res.data.data });
        console.log({ ...res.data.data });
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, []);
  return (
    <div className="main-wrapper">
      <InstructorNavBar />
     
      <InstructorBox info={info} />
      <Footer />
    </div>
  );
};

export default DashBoard;
