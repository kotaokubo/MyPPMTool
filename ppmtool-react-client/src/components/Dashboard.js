import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import SpProjectItem from "./Project/SpProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";
import { isSp } from "./isSp";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sp: false
    };
  }
  componentWillMount() {
    const sp = isSp();
    this.setState({ sp });
  }

  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props.project;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">親タスク一覧</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {projects.map(project =>
                this.state.sp ? (
                  <SpProjectItem key={project.id} project={project} />
                ) : (
                  <ProjectItem key={project.id} project={project} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
