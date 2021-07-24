import projectAxios from '../apis/projects';

const setJwtToken = token => {
  if (token) {
    projectAxios.defaults.headers.common["Authorization"] = token;
  } else {
    delete projectAxios.defaults.headers.common["Authorization"];
  }
};

export default setJwtToken;