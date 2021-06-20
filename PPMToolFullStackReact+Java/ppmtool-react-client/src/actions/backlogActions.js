import projectsAxios from '../apis/projects';
import history from '../history';
import { CLEAR_ERRORS, GET_ERRORS } from '../actions/types';

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
}