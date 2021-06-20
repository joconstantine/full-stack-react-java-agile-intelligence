import { GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from '../actions/types';

const intitialState = {
    project_tasks: [],
    project_task: {},
};

const backlogReducer = (state = intitialState, action) => {
    switch (action.type) {
        case GET_BACKLOG:
            return {
                ...state,
                project_tasks: action.payload,
            }
        case GET_PROJECT_TASK:
            return {
                ...state,
                project_task: action.payload,
            }

        case DELETE_PROJECT_TASK:
            return {
                ...state,
                // TO DO: remove the deleted task
            }

        default:
            return state;
    }
};

export default backlogReducer;
