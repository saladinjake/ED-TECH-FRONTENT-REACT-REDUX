import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DashboardPageHeader from "../components/DashboardPageHeader";
import QuickMenus from "../components/QuickMenus";
import CoursesSection from "../components/CoursesSection";
import Notifications from "../components/Notifications";

const DashbaordScreen = () => {
  return (
    <>
      <NavBar />
      <DashboardPageHeader
        welcomeTitle="Hey, Temi"
        welcomeSubtitle="Welcome back to your questense dashboard.
        You can continue your learning path by exploring 
        our pages"
        btnTitle="Explore my courses"
        bgClass="courses-banner-bg"
      />
      <QuickMenus />
      <CoursesSection />
      <Notifications />
      <Footer />
    </>
  );
};

export default DashbaordScreen;
