import React from "react";
import { Link } from "react-router-dom";

const CreateProjectButton = () => {
  return (
    <React.Fragment>
      <Link to="/addProject" className="btn btn-lg btn-primary">
        親タスクを作成
      </Link>
    </React.Fragment>
  );
};

export default CreateProjectButton;
