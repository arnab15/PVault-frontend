/* eslint-disable camelcase */
import httpService from "./apiService";

const loginEndpoint = "/auth/login";
const signUpEndpoint = "/auth/signup";

const login = ({ email, password }) => httpService.post(loginEndpoint, { email, password });

const signup = ({ name, email, password }) => httpService.post(signUpEndpoint, { name, email, password });

export default {
	login,
	signup,
};
