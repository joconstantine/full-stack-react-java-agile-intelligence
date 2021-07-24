import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../actions/securityActions';

class Header extends React.Component {
    logout = () => {
        this.props.logout();
    };

    render() {
        const { validToken, user } = this.props.security;
        let headerLink;

        if (validToken && user) {
            headerLink = (
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav m-md-auto">
                        <li className="nav-item">
                            <Link className="nav-link " to="/dashboard">
                                <i className="fa fa-user-circle mr-1" />
                                {user.fullName}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <i className="nav-link " onClick={this.logout} type="button">
                                Logout
                            </i>
                        </li>
                    </ul>
                </div>
            );
        } else {
            headerLink = (
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav m-md-auto">
                        <li className="nav-item">
                            <Link className="nav-link " to="/register">
                                Sign Up
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            );
        }
        
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/dashboard">
                        Personal Project Management Tool
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {headerLink}
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps, {
    logout
})(Header);