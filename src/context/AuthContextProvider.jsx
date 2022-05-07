/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const Authcontext = createContext({
	currentUser: null,
	logout() {},
	isAuthenticated: false,
	setCurrentUser(user) {},
	authLoading: false,
	userLogin(email, password) {},
	userSignup(name, email, password) {},
});
Authcontext.displayName = "AuthContext";

function AuthContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [authLoading, setAuthLoading] = useState(false);
	const userLogin = async (email, password) => {
		try {
			const { data } = await authService.login({ password, email });
			if (data.token) {
				localStorage.setItem("_accessToken", data.token);
				const decodedData = jwtDecode(data.token);
				setCurrentUser(decodedData);
				return true;
			}
		} catch (error) {
			return false;
		}
	};
	const userSignup = async (name, email, password) => {
		try {
			const { data } = await authService.signup({ name, password, email });
			if (data.token) {
				localStorage.setItem("_accessToken", data.token);
				const decodedData = jwtDecode(data.token);
				setCurrentUser(decodedData);
				return true;
			}
		} catch (error) {
			return false;
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			setAuthLoading(true);
			const accessToken = localStorage.getItem("_accessToken");
			if (accessToken) {
				try {
					const decodedData = jwtDecode(accessToken);
					const currentTime = new Date().getTime() / 1000;
					if (currentTime > decodedData.exp) {
						localStorage.removeItem("_accessToken");
						setCurrentUser(null);
						setAuthLoading(false);
					} else {
						setCurrentUser(decodedData);
						setAuthLoading(false);
					}
				} catch (error) {
					console.log("error decoding token auth context");
				}
			}
		}
	}, []);
	return (
		<Authcontext.Provider
			value={{
				isAuthenticated: !!currentUser,
				currentUser,
				setCurrentUser,
				authLoading,
				userLogin,
				userSignup,
			}}>
			{children}
		</Authcontext.Provider>
	);
}

export default AuthContextProvider;

export const useAuth = () => useContext(Authcontext);
