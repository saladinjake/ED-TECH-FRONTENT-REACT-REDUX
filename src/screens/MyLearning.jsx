import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import AuthSidebarMenus from "../components/AuthSidebarMenus";
import CoursesWithSortWidget from "../components/CoursesWithSortWidget";

const MyLearning = () => {
  return (
    <>
      <NavBar auth={false} />
      <PageHeader
        pageTitle="My Learning"
        textPosition="text-start"
        bgClass="courses-banner-bg"
      />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <AuthSidebarMenus />
          </div>
          <div className="col-md-9 pt-5">
            <CoursesWithSortWidget />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyLearning;
