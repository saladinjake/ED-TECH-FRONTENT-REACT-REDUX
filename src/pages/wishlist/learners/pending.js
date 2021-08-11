import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import Loader from "components/Loader/Loader";

import { getLearners } from "services/admin.js";
import toast from "react-hot-toast";

const Pending = () => {
  let history = useHistory();
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLearners();
  }, []);

  const fetchLearners = async () => {
    try {
      let allLearners = await getLearners();
      let transformed = [];
      allLearners.data.data.forEach((item) => {
        if (item.learner_profile === null) {
          transformed.push(item);
        }
      });
      setLearners([...transformed]);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Col md="12">
        <div className="sec-title text-center">
          <h4>Learners</h4>
        </div>
        <Row className="filter-items">
          {loading ? (
            <Loader width="70" />
          ) : learners.length > 0 ? (
            <Fragment>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {learners.map((data, i) => {
                    return (
                      <tr key="i">
                        <td>{data.id}</td>
                        <td>{data?.email}</td>
                        <td>{data?.first_name}</td>
                        <td>{data?.last_name}</td>
                        <td className="center">
                          <Button
                            onClick={() =>
                              history.push(`/admin/learners/${data?.id}`)
                            }
                            variant="success"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Fragment>
          ) : (
            <p>No learner yet.</p>
          )}
        </Row>
      </Col>
    </Fragment>
  );
};

export default Pending;
