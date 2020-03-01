import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Bookmark from "@material-ui/icons/Bookmark";
import { deleteProjectTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ProjectTask extends Component {
  onDeleteClick(backlog_id, pt_id) {
    this.props.deleteProjectTask(backlog_id, pt_id);
  }

  render() {
    const { project_task } = this.props;
    let priorityClass;

    if (project_task.priority === 1) {
      priorityClass = "text-danger";
    }

    if (project_task.priority === 2) {
      priorityClass = "text-warning";
    }

    if (project_task.priority === 3) {
      priorityClass = "text-primary";
    }

    return (
      <Card style={{ marginBottom: "1px" }}>
        <CardContent>
          <Typography className="card-title" component="h5" variant="h5">
            <Bookmark className={`${priorityClass}`} />
            {project_task.summary}
          </Typography>
          <Typography
            className="card-text text-truncate"
            component="p"
            variant="p"
          >
            {project_task.acceptanceCriteria}
          </Typography>
          <Typography
            className="card-text text-truncate"
            component="p"
            variant="p"
          >
            〆{project_task.dueDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button style={{ color: "#007bff" }}>View / Update</Button>
          </Link>
          <Button
            style={{ color: "#f50057" }}
            onClick={this.onDeleteClick.bind(
              this,
              project_task.projectIdentifier,
              project_task.projectSequence
            )}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

ProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired
};

export default connect(null, { deleteProjectTask })(ProjectTask);
