import projectAxios from '../apis/projects';
import history from '../history';
import jwt_decode from 'jwt-decode';
import setJwtToken from '../securityUtils/setJwtToken';
import { CLEAR_ERRORS, GET_ERRORS, SET_CURRENT_USER } from './types';

export const createNewUser = (newUser) => async dispatch => {
  try {
    await projectAxios.post("/users/register", newUser);
    history.push("/login");
    dispatch({
      type: CLEAR_ERRORS
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err,
    });
  }
}

export const login = LoginRequest => async dispatch => {
  try {
    // post => LoginRequest
    const res = await projectAxios.post("/users/login", LoginRequest);
    
    // extract the token from res.data
    const { token } = res.data;

    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);

    // set our token in the header
    setJwtToken(token);

    // decode token on React
    const decodedToken = jwt_decode(token);

    
    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decodedToken,
    });
    
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : err,
    });
  } 
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJwtToken(false);
  history.push("/login");
  dispatch({
    type: SET_CURRENT_USER,
    payload: null,
  });
}