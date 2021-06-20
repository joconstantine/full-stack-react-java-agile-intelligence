import { GET_ERRORS, CLEAR_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from './types';
import history from '../history';
import projectsAxios from '../apis/projects';

export const createProject = (project) => async dispatch => {
    try {
        await projectsAxios.post("/project/", project);
        dispatch({
            type: CLEAR_ERRORS
        })
        history.push("/dashboard");
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response ? err.response.data : err,
        });
    }
}

export const clearErrors = () => {
    return { type: CLEAR_ERRORS };
}

export const getProjects = () => async dispatch => {
    try {
        const res = await projectsAxios.get("/project/");
        dispatch({
            type: GET_PROJECTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response ? err.response.data : err,
        });
    }
}

export const getProject = (id) => async dispatch => {
    try {
        const res = await projectsAxios.get(`/project/${id}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data,
        });
    } catch (err) {
        history.push('/dashboard');
    }
}

export const updateProject = (id, project) => async dispatch => {
    try {
        const projectToPost = { ...project, id: id };
        await projectsAxios.post(`/project/`, projectToPost);
        dispatch({
            type: CLEAR_ERRORS
        })
        history.push("/dashboard");
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response ? err.response.data : err,
        });
    }
}

export const deleteProject = (id) => async dispatch => {
    await projectsAxios.delete(`/project/${id}`);
    dispatch({
        type: DELETE_PROJECT,
        payload: id
    });
}