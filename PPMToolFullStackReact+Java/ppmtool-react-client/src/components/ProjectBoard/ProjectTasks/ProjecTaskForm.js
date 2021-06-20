import React from 'react';
import { Form, Field } from 'react-final-form';
import { renderInput, renderTextArea, renderSelect } from '../../common/FormUtil';

class ProjectTaskForm extends React.Component {

    render() {
        return (
            <Form
                onSubmit={this.props.onFormSubmit}
                // validate={validate}
                initialValues={this.props.initialValues}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="summary"
                            component={renderInput}
                            className="form-group"
                            inputClassName="form-control form-control-lg "
                            placeholder="Project Task Summary"
                            backendError={this.props.errors['summary']}
                        />
                        <Field
                            name="acceptanceCriteria"
                            component={renderTextArea}
                            className="form-group"
                            inputClassName="form-control form-control-lg "
                            placeholder="Acceptance Criteria"
                            backendError={this.props.errors['acceptanceCriteria']}
                        />
                        <Field
                            name="dueDate"
                            type="date"
                            component={renderInput}
                            className="form-group"
                            inputClassName="form-control form-control-lg "
                            label="Due Date"
                            backendError={this.props.errors['dueDate']}
                        />
                        <Field
                            name="priority"
                            component={renderSelect}
                            className="form-group"
                            inputClassName="form-control form-control-lg "
                            backendError={this.props.errors['priority']}
                            options={[
                                { value: 1, label: 'High' },
                                { value: 2, label: 'Medium' },
                                { value: 3, label: 'Low' },

                            ]}
                            label="Priority"
                        />
                        <Field
                            name="status"
                            component={renderSelect}
                            className="form-group"
                            inputClassName="form-control form-control-lg "
                            backendError={this.props.errors['status']}
                            options={[
                                { value: 'TODO', label: 'TO DO' },
                                { value: 'IN_PROGRESS', label: 'IN PROGRESS' },
                                { value: 'DONE', label: 'DONE' },

                            ]}
                            label="Status"
                        />
                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                )} />
        );
    }
}

export default ProjectTaskForm;