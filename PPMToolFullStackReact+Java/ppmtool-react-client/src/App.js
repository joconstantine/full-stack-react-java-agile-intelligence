import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';
import store from './store';
import history from './history';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <Header />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:projectId" component={UpdateProject} />
            <Route exact path="/projectBoard/:projectId" component={ProjectBoard} />
            <Route exact path="/addProjectTask/:projectId" component={AddProjectTask} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
