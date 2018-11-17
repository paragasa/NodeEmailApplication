//Main Dashboard, allow survey creation
//routed from google callback OAUTH
import React from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div className="fixex-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons"> add</i>
        </Link>
      </div>
    </div>
  );
};
export default Dashboard;
