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

function App() {
	return (
		<div className="App">
			<AuthContextProvider>
				<Navbar />
				<Switch>
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/signup" component={SignupPage} />
					<ProtectedRoute exact path="/dashboard" component={PasswordsPage} />
				</Switch>
			</AuthContextProvider>
		</div>
	);
}

export default App;
