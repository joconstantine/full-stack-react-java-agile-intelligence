import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBacklog } from '../../actions/backlogActions';

import Backlog from './Backlog';

class ProjectBoard extends React.Component {

    componentDidMount() {
        this.props.getBacklog(this.props.match.params['projectId']);
    }
    render() {
        const projectId = this.props.match.params['projectId'];
        if (!this.props.backlog) {
            return (
                <div className="container">
                    <Link to={`/addProjectTask/${projectId}`} className="btn btn-primary mb-3">
                        <i className="fas fa-plus-circle"> Create Project Task</i>
                    </Link>
                    <br />
                    <hr />
                    <div className="alert alert-info text-center" role="alert">
                        LOADING...
                    </div>
                </div>
            );
        }
        const project_tasks = this.props.backlog.project_tasks;

        if (!project_tasks || project_tasks.length < 1) {
            return (
                <div className="container">
                    <Link to={`/addProjectTask/${projectId}`} className="btn btn-primary mb-3">
                        <i className="fas fa-plus-circle"> Create Project Task</i>
                    </Link>
                    <br />
                    <hr />
                    <div className="alert alert-info text-center" role="alert">
                        No Project Tasks found on this board
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <Link to={`/addProjectTask/${projectId}`} className="btn btn-primary mb-3">
                        <i className="fas fa-plus-circle"> Create Project Task</i>
                    </Link>
                    <br />
                    <hr />
                    <Backlog project_tasks_prop={this.props.backlog.project_tasks} />
                </div>
            );
        }
    }
}

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
}

const mapStateToProp = (state) => {
    return { backlog: state.backlog }
}

export default connect(
    mapStateToProp,
    { getBacklog }
)(ProjectBoard);