import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import RecentBlog from "./RecentPost";


class BlogSidebar extends Component {
  render() {
    return (
      <div className="course-sidebar">
        <Row>
          {/*<Col md="12">
            <RecentBlog />
          </Col>*/}
          <Col md="12">
            <CourseTag />
          </Col>
        </Row>
      </div>
    );
  }
}

export default BlogSidebar;
