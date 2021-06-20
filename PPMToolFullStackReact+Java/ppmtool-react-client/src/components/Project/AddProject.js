import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject, clearErrors } from '../../actions/projectActions';
import ProjectForm from './ProjectForm';

class AddProject extends React.Component {
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
    }

    onFormSubmit = (formValues) => {
        this.props.createProject(formValues);
    }

    render() {
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr />
                            <ProjectForm
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

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { createProject, clearErrors }
)(AddProject);