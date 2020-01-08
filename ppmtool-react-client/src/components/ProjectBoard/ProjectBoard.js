import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";

class ProjectBoard extends Component {
  // constructor() {
  //   super();
  //   this.status = {
  //     errors: {}
  //   };
  // }

  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   this.props.getBacklog(id);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState;
  //     ({ errors: this.nextProps.errors });
  //   }
  // }
  render() {
    const { id } = this.props.match.params;
    // const { project_tasks } = this.props.backlog;
    // const { errors } = this.state;

    // let BoardContent;

    // const boardAlgorithm = (errors, project_tasks) => {
    //   if (project_tasks.length < 1) {
    //     return (
    //       <div className="alert alert-danger text-center" role="alert">
    //         {errors.projectNotFound}
    //       </div>
    //     );
    //   } else if (errors.projectIdentifier) {
    //     return (
    //       <div className="alert alert-danger text-center" role="alert">
    //         {errors.projectIdentifier}
    //       </div>
    //     );
    //   } else {
    //     return (
    //       <div className="alert alert-info text-center" role="alert">
    //         No Project Tasks on this board
    //       </div>
    //     );
    //   }
    // };

    // BoardContent = boardAlgorithm(errors, project_tasks);

    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        <Backlog />
      </div>
    );
  }
}

export default ProjectBoard;

// ProjectBoard.propTypes = {
//   backlog: PropTypes.object.isRequired,
//   getBacklog: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   backlog: state.Backlog,
//   errors: state.errors
// });

// export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
