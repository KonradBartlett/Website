import React, { useEffect } from 'react';
import { Route, withRouter, useLocation } from 'react-router-dom';
import App from "./App";
import { NotFound } from "../pages/NotFound";
import { Access } from "../pages/Access";

const AppWrapper = (props) => {
	let location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location]);

	switch (props.location.pathname) {
		case "/notfound":
			return <Route path="/notfound" component={NotFound} />
		case "/access":
			return <Route path="/access" component={Access} />
		default:
			return <App />;
	}

}

export default withRouter(AppWrapper);