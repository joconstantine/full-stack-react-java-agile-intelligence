import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderInput } from '../common/FormUtil';
import { login } from '../../actions/securityActions';
import history from '../../history';

class Login extends React.Component {

    componentDidMount() {
        const { validToken, user } = this.props.security;
        if (validToken && user) {
            history.push("/dashboard");
        }
    }

    onFormSubmit = (LoginRequest) => {
        this.props.login(LoginRequest);
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
                                            name="username"
                                            component={renderInput}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            placeholder="Email Address"
                                            backendError={this.props.errors['username']}
                                            required="true"
                                            type="email"
                                        />
                                        <Field
                                            name="password"
                                            component={renderInput}
                                            className="form-group"
                                            inputClassName="form-control form-control-lg "
                                            placeholder="Password"
                                            backendError={this.props.errors['password']}
                                            required="true"
                                            type="password"
                                        />
                                        <input type="submit" className="btn btn-info btn-block mt-4" value="Login"/>
                                    </form>
                                )} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    security: state.security,
});

export default connect(mapStateToProps, {
    login
})(Login);