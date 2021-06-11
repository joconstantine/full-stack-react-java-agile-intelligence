import React from 'react';
import ProjectItem from './Project/ProjectItem';
import CreateProjectButton from './Project/CreateProjectButton';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.getProjects();
    }

    renderProjectItems() {
        return this.props.project.projects.map(
            project => <ProjectItem key={project.projectIdentifier} project={project} />
        );
    }

    render() {
        return (
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br />
                            <CreateProjectButton />
                            <br />
                            <hr />
                            {this.renderProjectItems()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        project: state.project,
    };
};

export default connect(mapStateToProps,
    {
        getProjects
    })(Dashboard);