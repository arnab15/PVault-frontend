import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Switch, Router } from "react-router-dom";
import { Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import AuthContextProvider from "./context/AuthContextProvider";
import PasswordsPage from "./Pages/PasswordsPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Redirect } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<AuthContextProvider>
				<Navbar />
				<Switch>
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/signup" component={SignupPage} />
					<ProtectedRoute exact path="/dashboard" component={PasswordsPage} />
					<Redirect to="/login" from="/" />
				</Switch>
			</AuthContextProvider>
		</div>
	);
}

export default App;
