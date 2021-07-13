import React from 'react';
import { Form, Field } from 'react-final-form';

import { renderInput } from '../common/FormUtil';

class Login extends React.Component {
    onFormSubmit = () => {
        console.log("To login the user");
    }
    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <Form
                                onSubmit={this.onFormSubmit}
                                initialValues={this.props.initialValues}
                                render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
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

export default Login;