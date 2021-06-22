import projectsAxios from '../apis/projects';
import history from '../history';
import { CLEAR_ERRORS, GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from '../actions/types';

export const addProjectTask = (backlog_id, project_task) => async dispatch => {
    try {
        await projectsAxios.post(`/backlog/${backlog_id}`, project_task);
        dispatch({
            type: CLEAR_ERRORS
        })
        history.push(`/projectBoard/${backlog_id}`);
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response ? err.response.data : err,
        });
    }
};

export const getBacklog = backlog_id => async dispatch => {
    try {
        const res = await projectsAxios.get(`/backlog/${backlog_id}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data,
        })
    } catch (err) {
        history.push('/dashboard');
    }
}

export const getProjectTask = (backlog_id, pt_id) => async dispatch => {
    try {
        const res = await projectsAxios.get(`/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data,
        })
    } catch (err) {
        history.push('/dashboard');
    }
};

export const updateProjectTask = (backlog_id, pt_id, project_task) => async dispatch => {
    try {
        await projectsAxios.patch(`/backlog/${backlog_id}/${pt_id}`, project_task);
        dispatch({
            type: CLEAR_ERRORS
        })
        history.push(`/projectBoard/${backlog_id}`);
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response ? err.response.data : err,
        });
    }
};

export const deleteProjectTask = (backlog_id, pt_id) => async dispatch => {
    if (window.confirm(`You are deleting project task ${pt_id}. Are you sure you want to proceed?`)) {
        await projectsAxios.delete(`/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id,
        });
    }
}



