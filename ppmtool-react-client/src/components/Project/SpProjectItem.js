import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";

const classes = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 12
  }
});

class SpProjectItem extends Component {
  onDeleteClick = id => {
    this.props.deleteProject(id);
  };

  render() {
    const { project } = this.props;
    return (
      <Card className={classes.root}>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/projectBoard/${project.projectIdentifier}`}
        >
          <CardContent>
            <Typography
              style={{ textDecoration: "none" }}
              variant="h5"
              component="h2"
            >
              {project.projectName}
            </Typography>
            <Typography
              style={{ textDecoration: "none" }}
              variant="body2"
              component="p"
            >
              {project.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Link to={`/updateProject/${project.projectIdentifier}`}>
                更新する
              </Link>
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={this.onDeleteClick.bind(this, project.projectIdentifier)}
            >
              削除する
            </Button>
          </CardActions>
        </Link>
      </Card>
    );
  }
}

SpProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default connect(null, { deleteProject })(SpProjectItem);
