import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

function ProtectedRoute({ path, component: Component, render, ...rest }) {
	const { currentUser } = useAuth();
	return (
		<Route
			{...rest}
			path={path}
			render={(props) => {
				// console.log(props);
				if (!currentUser) {
					return <Redirect to="/login" />;
				}
				return Component ? <Component {...props} /> : render(props);
			}}
		/>
	);
}

export default ProtectedRoute;
