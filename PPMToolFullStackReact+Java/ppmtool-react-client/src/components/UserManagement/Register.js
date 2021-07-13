import React from 'react';
import { Form, Field } from 'react-final-form';

import { renderInput } from '../common/FormUtil';

class Register extends React.Component {
    onFormSubmit = () => {
        console.log("To register the user");
    }
    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <Form
                                onSubmit={this.onFormSubmit}
                                initialValues={this.props.initialValues}
                                render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Field
                                            name="name"
                                            component={renderInput}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            placeholder="Name"
                                            // backendError={this.props.errors['name']}
                                            required="true"
                                        />
                                        <Field
                                            name="email"
                                            component={renderInput}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            placeholder="Email Address"
                                            // backendError={this.props.errors['email']}
                                            required="true"
                                            type="email"
                                        />
                                        <Field
                                            name="password"
                                            component={renderInput}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            placeholder="Password"
                                            // backendError={this.props.errors['password']}
                                            required="true"
                                            type="password"
                                        />
                                        <Field
                                            name="confirmPassword"
                                            component={renderInput}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            placeholder="Confirm Password"
                                            // backendError={this.props.errors['confirmPassword']}
                                            required="true"
                                            type="password"
                                        />
                                        <input type="submit" className="btn btn-info btn-block mt-4" />
                                    </form>
                                )} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;