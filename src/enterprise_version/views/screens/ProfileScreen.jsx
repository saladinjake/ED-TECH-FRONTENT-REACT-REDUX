import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProfilePageHeader from "../components/ProfilePageHeader";
import ProfileComponent from "../components/ProfileComponent";

import { getAuthProfile } from "../../api/learner.services";

const ProfileScreen = () => {
  return (
    <>
      <NavBar />
      <ProfilePageHeader
        pageTitle=""
        bgClass="courses-banner-bg"
        textPosition="text-start"
      />
      <ProfileComponent />
      <Footer />
    </>
  );
};

export default ProfileScreen;
