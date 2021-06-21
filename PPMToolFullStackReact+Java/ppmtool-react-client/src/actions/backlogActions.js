import projectsAxios from '../apis/projects';
import history from '../history';
import { CLEAR_ERRORS, GET_ERRORS, GET_BACKLOG } from '../actions/types';

export const addProjectTask = (backlog_id, project_task) => async dispatch => {
    try {
        await projectsAxios.post(`/backlog/${backlog_id}`, project_task);
        dispatch({
            type: CLEAR_ERRORS
        })
        history.push("/projectBoard");
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

