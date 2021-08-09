import styled from "styled-components";
export const Styles = styled.div`
  .main-work-bench {
    float: right;
  }

  .authoring-sidebar {
    width: 300px;
    background: #fff;
    float: left;
    overflow: hidden;
    transition: all 0.3s ease-in;

    height: 800px;
    background: #fff;
  }

  /*Nav Layout */

  /*---------- vertical icon menu ----------*/
  div#menu-lateral {
    position: relative;
    max-width: 280px;
    padding-top: 2.5em;
    font-family: "0pen Sans";
  }

  li.menu-item {
    background-color: #fff;
    margin: 15px;
    font-family: "0pen Sans";
  }

  li.menu-item i.iconMenu {
    color: #000;
    margin-right: 15px;
  }

  li.menu-item i {
    margin-right: 15px;
  }

  li.menu-item:hover,
  li.menu-item:focus-within {
    background-color: white;
    font-family: "0pen Sans";
  }
  li.menu-item:hover i.iconMenu,
  li.menu-item:focus-within i.iconMenu {
    color: grey;
  }
  ul#menu-menu-lateral li {
    padding: 0.5rem;
    font-family: "0pen Sans";
  }

  ul#menu-menu-lateral li a {
    font-size: 1.2em;
    color: #fff;
    height: 100%;
    width: 100%;
    font-family: "0pen Sans";
  }

  ul#menu-menu-lateral li:hover,
  ul#menu-menu-lateral li:focus-within {
    background-color: #fff;
    font-family: "0pen Sans";
  }

  ul#menu-menu-lateral li:hover > a,
  ul#menu-menu-lateral li:focus-within > a {
    color: #fff;
    font-family: "0pen Sans";
  }

  #menu-lateral ul.menu .sub-menu {
    display: none;
  }

  #menu-lateral ul.menu li:hover > .sub-menu,
  #menu-lateral ul.menu li:focus-within > .sub-menu {
    display: inline-table;
    position: relative;
    width: 100%;
    font-family: "0pen Sans";
  }

  ul#menu-menu-lateral li > .sub-menu li > a {
    font-size: 1em;
    color: grey;
    font-family: "0pen Sans";
  }

  ul#menu-menu-lateral li > .sub-menu li {
    background-color: #fff;
  }

  ul#menu-menu-lateral li > .sub-menu li:hover,
  ul#menu-menu-lateral li > .sub-menu li:focus-within {
    background-color: rgba(8, 23, 200);
    font-family: "0pen Sans";
  }

  ul#menu-menu-lateral li > .sub-menu li:hover > a,
  ul#menu-menu-lateral li > .sub-menu li:focus-within > a {
    color: #fff;
  }

  ul#menu-menu-lateral li > .sub-menu li:last-child {
    border-bottom: none;
    font-family: "0pen Sans";
  }

  ul#menu-menu-lateral li.hover i.right.iconMenu {
    -ms-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    color: grey;
    font-family: "0pen Sans";
  }

  i.iconMenu {
    color: #000;
    margin: 5px;
  }

  /**graphs */

  .bx--graph-header {
    font-weight: 300;
    font-size: 24px;
  }

  .overlay {
    fill: #3d70b2;
    opacity: 0.1;
    display: none;
    pointer-events: none;
  }

  .line {
    stroke-width: 2;
    stroke: #ff00ff;
    fill: none;
    pointer-events: none;
  }

  .axis path {
    stroke: #5a6872;
  }

  .tick line {
    stroke: #5a6872;
  }

  .tick text {
    fill: #5a6872;
  }

  .graph-container {
    position: relative;
  }

  .tooltip {
    font-weight: 700;
    padding-left: 1rem 2rem;
    background-color: #fff;
    position: absolute;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #dfe3e6;
    padding: 0.25rem 0.5rem;
    pointer-events: none;
    display: none;

    &:after {
      content: "";
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #fff;
    }
  }

  .y path {
    display: none;
  }

  .label {
    font-size: 10px;
    font-weight: 700;
    fill: #5a6872;
    text-anchor: middle;
  }

  .padded {
    padding: 10px;
  }

  .padded-down {
    margin: 30px;
  }

  /*search box filter inputs*/

  .dropdown-container,
  .instructions {
    width: 200px;
    margin: 20px auto 0;
    font-size: 14px;
    font-family: sans-serif;
    overflow: auto;
  }

  .instructions {
    width: 100%;
    text-align: center;
  }

  .dropdown-button {
    float: left;
    width: 100%;

    padding: 10px 12px;
    cursor: pointer;
    border: 1px solid lightgray;
    box-sizing: border-box;
  }
  .dropdown-button .dropdown-label,
  .dropdown-button .dropdown-quantity {
    float: left;
  }
  .dropdown-button .dropdown-quantity {
    margin-left: 4px;
  }
  .dropdown-button .fa-search {
    float: right;
  }

  .dropdown-list {
    float: left;
    width: 100%;
    border: 1px solid lightgray;
    border-top: none;
    box-sizing: border-box;
    padding: 10px 12px;
  }
  .dropdown-list input[type="search"] {
    padding: 5px 0;
  }
  .dropdown-list ul {
    margin: 10px 0;
    max-height: 200px;
    overflow-y: auto;
  }
  .dropdown-list ul input[type="checkbox"] {
    position: relative;
    top: 2px;
  }

  /*Navigations course form wizard*/

  ul.tabs-of-form {
    display: inline;
    background: #e3eaef;
    width: 100%;
    height: 200px;
    padding: 20px;
    margintop: 15px;
    marginbottom: 15px;
  }

  ul.tabs-of-form li {
    display: inline;
    padding: 5px;

    width: 100%;
    margin: 15px;
  }

  ul.tabs-of-form li:hover {
    background: rgba(8, 23, 200);
    color: #fff;
    padding: 15px;
  }

  .wizard-form {
    padding: 0 40px;
    font-family: "Open Sans";
  }

  .wizard-form input[type="text"],
  .wizard-form input[type="number"] {
    display: block;
    width: 100%;
    font-size: 20px;
    padding: 5px 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-family: "Open Sans";
  }
  label {
    font-family: "Open Sans";
  }

  .wizard-form input.error {
    border-color: red;
  }

  .wizard-form button {
    display: block;
    width: 100%;
    appearance: none;
    border-radius: 5px;
    background-color: rgba(8, 23, 200);
    color: #fff;
    border: none;
    font-size: 16px;
    height: 40px;
    margin-top: 30px;
  }

  .wizard-form button:hover {
    background-color: #669509;
  }

  .wizard-form button:disabled {
    background-color: #dbf99f;
    color: #333;
  }

  .wizard-form button.small {
    display: inline-block;
    width: auto;
    padding: 0 20px;
    background-color: rgba(8, 23, 200);
    font-size: 14px;
  }

  .wizard-form button.small:hover {
    background-color: green;
  }

  .shareholder {
    display: flex;
    direction: row;
    align-items: center;
  }

  .shareholder button {
    margin: 0;
    margin-left: 10px;
  }

  .profile-badge {
    border: 1px solid #c1c1c1;
    padding: 5px;
    position: relative;
  }

  .user-detail {
    background-color: #fff;
    position: relative;
    padding: 115px 0px 10px 0px;
    color: #8b8b89;
  }
  .user-detail h3 {
    margin: 0px;
    margin: 0px 0px 5px 0px;
    color: #000;
  }
  .user-detail p {
    font-size: 14px;
  }
  .user-detail .btn {
    margin-bottom: 10px;
    background-color: #fff;

    border-radius: 0px;
    color: black;
  }
  .user-detail .btn i {
    color: #d35b4d;
    padding-right: 18px;
  }
  .profile-pic {
    height: 120px;
    width: 120px;

    top: 0px;
    z-index: 1001;
    padding: 10px;
  }
  .profile-pic img {
    border-radius: 50%;
    box-shadow: 0px 0px 5px 0px #c1c1c1;
    cursor: pointer;
    width: 100px;
    height: 100px;
  }
`;
