import jwtDecode from "jwt-decode";
const key = "_accessToken";
export const setItem = (jwt) => {
	return localStorage.setItem(key, jwt);
};
export const deleteItem = () => {
	return localStorage.removeItem(key);
};

export const getItem = () => {
	return localStorage.getItem(key);
};

export const getCurrentUser = () => {
	try {
		const data = jwtDecode(getItem());
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const storeValue = (key, value) => {
	return localStorage.setItem(key, value);
};

export const retriveValue = (key) => {
	return localStorage.getItem(key);
};

export const objToString = (obj) => {
	return JSON.stringify(obj);
};
export const stringToObj = (str) => {
	return JSON.parse(str);
};
