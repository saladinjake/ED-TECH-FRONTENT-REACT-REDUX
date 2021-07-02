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

  useEffect(() => {
    $(document).ready(function () {
      $(document).ready(function () {
        $(".dropdown").hover(
          function () {
            $(".dropdown-menu", this).stop().fadeIn("fast");
          },
          function () {
            $(".dropdown-menu", this).stop().fadeOut("fast");
          }
        );
      });
    });
  });

  return (
    <Fragment>
      <ul className="section-6" style={{ width: "100%" }}>
        <li className="dropdown menu-large" style={{ width: "100%" }}>
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            Categories <b className="caret"></b>
          </a>
          <ul className="dropdown-menu megamenu row">
            {CATEGORIES.length > 0 &&
              CATEGORIES.map((item, i) => {
                return (
                  <li className="col-sm-3" id={"item" + item.id}>
                    <ul>
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

                      {item?.subcategories &&
                        item?.subcategories.map((cat) => {
                          return (
                            <li>
                              <a href="#">{cat.name}</a>
                            </li>
                          );
                        })}
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
