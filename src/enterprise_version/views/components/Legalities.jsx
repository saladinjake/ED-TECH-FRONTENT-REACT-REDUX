import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import TextCard from "./TextCard";
import InstructorCard from "./InstructorCard";
import toast from "react-hot-toast"

const CourseDetail = ({ 
  }) => {
  const [activeKey, setActiveKey] = useState("home");
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="home">
  
    </Tab.Container>
  );
};

export default CourseDetail;
