import React from "react";
const Section = () => {
  return (
    <div className="nav" style={{ marginTop: "0px" }}>
      <nav className="">
        <a href="javascript:void(0);" className="mobile-menu-trigger">
          Open mobile menu
        </a>
        <ul className="menu menu-bar">
          <li>
            <a
              href="javascript:void(0);"
              className="menu-link menu-bar-link"
              aria-haspopup="true"
            >
              Category menu
            </a>
            <ul className="mega-menu mega-menu--multiLevel">
              <li>
                <a
                  href="javascript:void(0);"
                  className="menu-link mega-menu-link"
                  aria-haspopup="true"
                >
                  1.1 Flyout link
                </a>
                <ul className="menu menu-list">
                  <li>
                    <a href="/page" className="menu-link menu-list-link">
                      1.1.1 Page link
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="menu-link menu-list-link"
                      aria-haspopup="true"
                    >
                      1.1.2 Flyout link
                    </a>
                    <ul className="menu menu-list">
                      <li>
                        <a href="/page" className="menu-link menu-list-link">
                          1.1.2.1 Page link
                        </a>
                      </li>
                      <li>
                        <a href="/page" className="menu-link menu-list-link">
                          1.1.2.2 Page link
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/page" className="menu-link menu-list-link">
                      1.1.3 Page link
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  className="menu-link mega-menu-link"
                  aria-haspopup="true"
                >
                  1.2 Flyout link
                </a>
                <ul className="menu menu-list">
                  <li>
                    <a href="/page" className="menu-link menu-list-link">
                      1.2.1 Page link
                    </a>
                  </li>
                  <li>
                    <a href="/page" className="menu-link menu-list-link">
                      1.2.2 Page link
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  className="menu-link mega-menu-link"
                  aria-haspopup="true"
                >
                  1.3 Flyout link
                </a>
                <ul className="menu menu-list">
                  <li>
                    <a href="/page" className="menu-link menu-list-link">
                      1.3.1 Page link
                    </a>
                  </li>
                  <li>
                    <a href="/page" className="menu-link menu-list-link">
                      1.3.2 Page link
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/page" className="menu-link mega-menu-link">
                  1.4 Page link
                </a>
              </li>
              <li className="mobile-menu-back-item">
                <a
                  href="javascript:void(0);"
                  className="menu-link mobile-menu-back-link"
                >
                  Back
                </a>
              </li>
            </ul>
          </li>

          <li className="search__group">
            <div className="search__form">
              <input
                style={{
                  float: "left",
                  width: "350px",
                  padding: "10px",
                  marginTop: "10px",
                  marginRight: "20px",
                }}
                type="text"
                name="search"
                id="search"
                placeholder="Search for a course"
              />
            </div>
          </li>

          {/*   */}

          <li>
            <a
              href="javascript:void(0);"
              className="menu-link menu-bar-link"
              aria-haspopup="true"
            >
              Courses and programs
            </a>
            <ul className="mega-menu mega-menu--flat">
              <li>
                <a
                  href="#"
                  className="menu-link mega-menu-link mega-menu-header"
                >
                  3.1 Page link header
                </a>
                <ul className="menu menu-list">
                  <li>
                    <a href="/page" className="menu-link menu-list-link">
                      3.1.1 Page link
                      <br />
                      <small>Short decription of link</small>
                    </a>
                  </li>
                  <li>
                    <a href="/page" className="menu-link menu-list-link">
                      3.1.2 Page link
                      <br />
                      <small>Short decription of link</small>
                    </a>
                  </li>
                  <li>
                    <a href="/page" className="menu-link menu-list-link">
                      3.1.2 Page link
                      <br />
                      <small>Short decription of link</small>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="mega-menu-content">
                <p className="mega-menu-header">3.2 Page link header</p>
                <p>
                  This is just static content. You can add anything here.
                  Images, text, buttons, your grandma's secrect recipe.
                </p>
              </li>
              <li className="mobile-menu-back-item">
                <a
                  href="javascript:void(0);"
                  className="menu-link mobile-menu-back-link"
                >
                  Back
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a href="/page" className="menu-link menu-bar-link">
              Static link
            </a>
          </li>

          <li className="mobile-menu-header">
            <a href="/home" className="">
              <span>Home</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Section;
