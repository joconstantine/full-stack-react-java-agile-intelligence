import React from 'react';
import { Form, Field } from 'react-final-form';

class ProjectForm extends React.Component {
    renderError({ error, touched }, backendError) {
        if (touched && error) {
            return (
                <div className="invalid-feedback">
                    <div className="header">{error}</div>
                </div>
            );
        } else if (backendError) {
            return (
                <div className="invalid-feedback">
                    <div className="header">{backendError}</div>
                </div>
            );
        }
        return null;
    }

    renderInput = ({ input, placeholder,
        className, inputClassName,
        disabled, meta, label
    }) => {
        const backendError = this.props.errors[input.name];
        const hasErrors = (meta.error && meta.touched) || backendError;
        inputClassName = inputClassName + ` ${hasErrors ? 'is-invalid' : ''}`;
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
                {this.renderError(meta, backendError)}
            </div>
        );
    };

    renderTextArea = ({ input, placeholder, className, inputClassName, disabled, meta }) => {
        const backendError = this.props.errors[input.name];
        const hasErrors = (meta.error && meta.touched) || backendError;
        inputClassName = inputClassName + ` ${hasErrors ? 'is-invalid' : ''}`;
        return (
            <div className={className}>
                <textarea {...input}
                    autoComplete="off"
                    placeholder={placeholder}
                    className={inputClassName}
                    disabled={disabled}
                ></textarea>
                {this.renderError(meta, backendError)}
            </div>
        );
    };

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
                            disabled={this.props.isUpdate}
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
        );
    }
}

export default ProjectForm;