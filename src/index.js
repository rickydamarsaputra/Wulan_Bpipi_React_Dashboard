import React from "react";
import { BpipiContextProvider } from "./context/BpipiContext";
import { BpipiSurveyContextProvider } from "./context/BpipiSurveyContext";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./css/tailwind.css";

ReactDOM.render(
	<React.StrictMode>
		<BpipiContextProvider>
			<BpipiSurveyContextProvider>
				<Router>
					<Switch>
						<App />
					</Switch>
				</Router>
			</BpipiSurveyContextProvider>
		</BpipiContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
