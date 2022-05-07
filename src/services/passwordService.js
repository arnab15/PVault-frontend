import httpService from "./apiService";
const pass = "/pass";
const getMyPasswords = () => httpService.get(pass);
const addPassword = (data) => httpService.post(pass, { ...data });
const updatePassword = (id, data) => httpService.post(`${pass}/${id}`, { ...data });

const getMyDecriptedPassword = (id) => httpService.get(`${pass}/${id}`);
const deletePassword = (id) => httpService.delete(`${pass}/${id}`);

export default {
	getMyPasswords,
	getMyDecriptedPassword,
	deletePassword,
	addPassword,
	updatePassword,
};
