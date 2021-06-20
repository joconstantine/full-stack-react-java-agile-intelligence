import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectTaskForm from './ProjecTaskForm';
import { addProjectTask, } from '../../../actions/backlogActions';
import { clearErrors, } from '../../../actions/projectActions';

class AddProjectTask extends React.Component {
    componentDidMount() {
        this.props.clearErrors();
    }

    onFormSubmit = (formValues) => {
        const projectId = this.props.match.params['projectId'];
        this.props.addProjectTask(projectId, formValues);
    }

    render() {
        const projectId = this.props.match.params['projectId'];
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${projectId}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Add Project Task</h4>
                            <hr />
                            <ProjectTaskForm
                                onFormSubmit={this.onFormSubmit}
                                errors={this.props.errors}
                            />
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { addProjectTask, clearErrors }
)(AddProjectTask);