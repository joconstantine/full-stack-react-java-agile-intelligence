import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProject, clearErrors, getProject } from '../../actions/projectActions';
import ProjectForm from './ProjectForm';

class UpdateProject extends React.Component {
    state = {
        formValues: {
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
        },
    };

    componentDidMount() {
        this.props.clearErrors();
        this.props.getProject(this.props.match.params.projectId);
    }

    onFormSubmit = (formValues) => {
        this.props.updateProject(this.props.project.project.id, formValues);
    }

    render() {
        if (!this.props.project) {
            return <div>Loading...</div>;
        }
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Project form</h5>
                            <hr />
                            <ProjectForm
                                onFormSubmit={this.onFormSubmit}
                                initialValues={this.props.project.project}
                                errors={this.props.errors}
                                isUpdate={true}
                            />
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

UpdateProject.propTypes = {
    updateProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    project: state.project,
});

export default connect(
    mapStateToProps,
    { updateProject, clearErrors, getProject }
)(UpdateProject);