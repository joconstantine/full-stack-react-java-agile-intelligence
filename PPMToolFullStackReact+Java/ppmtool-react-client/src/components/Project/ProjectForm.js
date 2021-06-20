import React from 'react';
import { Form, Field } from 'react-final-form';
import { renderInput, renderTextArea } from '../common/FormUtil';

class ProjectForm extends React.Component {
    render() {
        return (
            <Form
                onSubmit={this.props.onFormSubmit}
                // validate={validate}
                initialValues={this.props.initialValues}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="projectName"
                            component={renderInput}
                            className="form-group"
                            inputClassName="form-control form-control-lg "
                            placeholder="Project Name"
                            backendError={this.props.errors['projectName']}
                        />
                        <Field
                            name="projectIdentifier"
                            component={renderInput}
                            className="form-group"
                            inputClassName="form-control form-control-lg "
                            placeholder="Unique Project ID"
                            disabled={this.props.isUpdate}
                            backendError={this.props.errors['projectIdentifier']}
                        />
                        {
                            //< !--disabled for Edit Only!! remove "disabled" for the Create operation -->
                        }
                        <Field
                            name="description"
                            component={renderTextArea}
                            className="form-group"
                            inputClassName="form-control form-control-lg "
                            placeholder="Project Description"
                            backendError={this.props.errors['description']}
                        />
                        <Field
                            name="start_date"
                            type="date"
                            component={renderInput}
                            className="form-group"
                            inputClassName="form-control form-control-lg "
                            label="Start Date"
                            backendError={this.props.errors['start_date']}
                        />
                        <Field
                            name="end_date"
                            type="date"
                            component={renderInput}
                            className="form-group"
                            inputClassName="form-control form-control-lg "
                            label="Estimated End Date"
                            backendError={this.props.errors['end_date']}
                        />
                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                )} />
        );
    }
}

export default ProjectForm;