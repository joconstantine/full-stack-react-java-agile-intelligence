import React from 'react';
import { Form, Field } from 'react-final-form';

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

    onFormSubmit = (formValues) => {
        this.setState({ formValues });
    }

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
        return null;
    }

    renderInput = ({ input, placeholder,
        className, inputClassName,
        disabled, meta, label
    }) => {
        className = className + ` ${meta.error && meta.touched ? 'error' : ''}`;
        const labelTag = label ? <h6>{label}</h6> : null;
        return (
            <div className={className}>
                {labelTag}
                <input {...input}
                    autoComplete="off"
                    placeholder={placeholder}
                    className={inputClassName}
                    disabled={disabled}
                />
                {this.renderError(meta)}
            </div>
        );
    };

    renderTextArea = ({ input, placeholder, className, inputClassName, disabled, meta }) => {
        className = className + ` ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <textarea {...input}
                    autoComplete="off"
                    placeholder={placeholder}
                    className={inputClassName}
                    disabled={disabled}
                ></textarea>
                {this.renderError(meta)}
            </div>
        );
    };

    render() {
        console.log(this.state);
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr />
                            <Form
                                onSubmit={this.onFormSubmit}
                                // validate={validate}
                                initialValues={this.state.formValues}
                                render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Field
                                            name="projectName"
                                            component={this.renderInput}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            placeholder="Project Name"
                                        />
                                        <Field
                                            name="projectIdentifier"
                                            component={this.renderInput}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            placeholder="Unique Project ID"
                                            disabled={true}
                                        />
                                        {
                                            //< !--disabled for Edit Only!! remove "disabled" for the Create operation -->
                                        }
                                        <Field
                                            name="description"
                                            component={this.renderTextArea}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            placeholder="Project Description"
                                        />
                                        <Field
                                            name="start_date"
                                            type="date"
                                            component={this.renderInput}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            label="Start Date"
                                        />
                                        <Field
                                            name="end_date"
                                            type="date"
                                            component={this.renderInput}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            label="Estimated End Date"
                                        />
                                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                                    </form>
                                )} />
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default AddProject;