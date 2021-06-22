import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectTaskForm from './ProjecTaskForm';
import { updateProjectTask, getProjectTask } from '../../../actions/backlogActions';
import { clearErrors, } from '../../../actions/projectActions';

class UpdateProjectTask extends React.Component {
    componentDidMount() {
        this.props.clearErrors();
        this.props.getProjectTask(this.props.match.params['projectId'],
            this.props.match.params['projectTaskId']);
    }

    onFormSubmit = (formValues) => {
        const projectId = this.props.match.params['projectId'];
        const projectTaskId = this.props.match.params['projectTaskId']
        this.props.updateProjectTask(projectId, projectTaskId, formValues);
    }

    render() {
        const projectId = this.props.match.params['projectId'];
        console.log(this.props.projectTask);
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${projectId}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Update Project Task</h4>
                            <hr />
                            <ProjectTaskForm
                                onFormSubmit={this.onFormSubmit}
                                errors={this.props.errors}
                                initialValues={this.props.projectTask}
                            />
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

UpdateProjectTask.propTypes = {
    updateProjectTask: PropTypes.func.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    projectTask: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    projectTask: state.backlog.project_task,
});

export default connect(
    mapStateToProps,
    { updateProjectTask, clearErrors, getProjectTask }
)(UpdateProjectTask);