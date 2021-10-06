import React, { useEffect, useState, Fragment } from "react";
import "./megamenu.css";
import $ from "jquery";
import { Link } from "react-router-dom";

import { getCategories } from "services/category";
import toast from "react-hot-toast";

const Hambugger = () => {
  const [CATEGORIES, setInfo] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getCategories();

        setInfo([...res.data.data]);
      } catch (err) {
        toast.error("Error occured fetching categories");
      }
      // setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  $(document).ready(function () {
    $(document).ready(function () {
      $(".dropdown , .menu-large").hover(
        function () {
          $(".dropdown-menu", this).stop().fadeIn("fast");
          $(".megamenu").css({
            width: "600px",
            top: "40px",
            left: "260px",
            position: "absolute",
            margin: "0px",
          });
        },
        function () {
          $(".dropdown-menu", this).stop().fadeOut("fast");
        }
      );
    });
  });

  return (
    <Fragment>
      <ul className="nav navbar-nav" style={{ width: "100%" }}>
        <li className="dropdown menu-large" style={{ width: "100%" }}>
          <a href="" class="grid-icon grid-icon--fill" data-toggle="dropdown">
            <span class="layer layer--primary">
              <span></span>
            </span>
            <span class="layer layer--secondary">
              <span></span>
            </span>
            <span class="layer layer--tertiary">
              <span></span>
            </span>
          </a>

          <ul className="dropdown-menu megamenu row">
            {CATEGORIES.length > 0 &&
              CATEGORIES.map((item, i) => {
                return (
                  <li
                    style={{ width: "380px" }}
                    className="col-md-4"
                    id={"item" + item.id}
                  >
                    <ul>
                      {item.name && (
                        <Fragment>
                          <li className="dropdown-header">
                            {" "}
                            <Link
                              style={{ fontSize: "15px" }}
                              className="DropDown__link"
                              to={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}
                            >
                              {" "}
                              {item.name}
                            </Link>
                          </li>

                          {item?.subcategories?.length > 0 &&
                            item?.subcategories?.slice(-2)?.map((cat) => {
                              return (
                                <li>
                                  <Link
                                    onClick={() => {
                                      window.location.href = `${process.env.PUBLIC_URL}/courses/${cat.id}`;
                                    }}
                                    to={`${process.env.PUBLIC_URL}/courses/${cat.id}`}
                                  >
                                    {" "}
                                    {cat.name}
                                  </Link>
                                </li>
                              );
                            })}
                        </Fragment>
                      )}
                    </ul>
                  </li>
                );
              })}
          </ul>
        </li>
      </ul>
    </Fragment>
  );
};

export default Hambugger;
