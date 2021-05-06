import React, { useEffect, useState } from "react";
import InstructorNavBar from "components/Navbar/InstructorNavbar";
import { BreadcrumbBox } from "components/common/Breadcrumb";
import InstructorBox from "../../components/InstructorBox";
import Footer from "components/Footer";
import { getInstructorInfo } from "services/dashboard";

const DashBoard = () => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getInstructorInfo();
        setInfo({ ...res.data.data });
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, []);
  return (
    <div className="main-wrapper">
      <InstructorNavBar />
      <BreadcrumbBox title="Instructor Dashboard" />
      <InstructorBox info={info} />
      <Footer />
    </div>
  );
};

export default DashBoard;
