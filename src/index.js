/*Import Application configurations and core modules*/
import React from 'react';
import ReactDOM from 'react-dom';

import QuestenceEnterpriseApp from './QuestenceEnterprise/BootInitializer/App';
import reportWebVitals from './QuestenceEnterprise/ApplicationBinaries/helpers/reportWebVitals';

/*redux store provisioner*/
import { Provider as Provisioner }  from "react-redux";
import QuestenceReduxStore from "./QuestenceEnterprise/ApplicationBinaries/redux/store";

/*css : todo:encapsulate this location*/
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ROOT_INJECTOR = "root";

ReactDOM.render(
  <React.StrictMode>
     {/*REDUX STATE ENHANCER*/}
    <Provisioner store={QuestenceReduxStore}>
       <QuestenceEnterpriseApp />
    </Provisioner>
  </React.StrictMode>,
  document.getElementById(ROOT_INJECTOR)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
