import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import Loader from "components/Loader/Loader";

import { getWishlist, deleteWishlist } from "services/wishlist";
import toast from "react-hot-toast";

const Active = () => {
  let history = useHistory();
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getWishlist();
        if (res?.data?.data?.data?.length > 0) {
          setWishlists([...res.data.data.data]);
        } else {
          toast.success(`No wishlist yet`);
        }
      } catch (err) {
        toast.error(`No wishlist yet`);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (wId) => {
    setLoading(true);
    try {
      await deleteWishlist(wId);
        toast.success(`Course removed from wishlist`);

      let res = await getWishlist();
      if (res?.data?.data?.data?.length > 0) {
        setWishlists([...res.data.data.data]);
      } else {
        toast.success(`No wishlist yet`);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          `Error occured fetching active wishlists`
      );
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Col md="12">
        <div className="sec-title text-center">
          <h4>Active Wishlists</h4>
        </div>
        <Row className="filter-items">
          {loading ? (
            <Loader width="70" />
          ) : wishlists.length > 0 ? (
            <Fragment>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlists.map((data, i) => {
                    return (
                      <tr key="i">
                        <td>{data.id}</td>
                        <td>{data?.course?.course_name}</td>
                        <td className="center">
                          <Button
                            className="mx-4"
                            onClick={() =>
                              history.push(`/courses/${data?.course?.id}`)
                            }
                            variant="success"
                          >
                            View
                          </Button>
                          <Button
                            onClick={handleDelete.bind(this, data?.course?.id)}
                            variant="danger"
                          >
                            {loading ? (
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Creating...</span>
                              </div>
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Fragment>
          ) : (
            <p>No Wsihlist yet.</p>
          )}
        </Row>
      </Col>
    </Fragment>
  );
};

export default Active;
