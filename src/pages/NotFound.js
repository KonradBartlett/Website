import React from 'react';
import { Button } from "primereact/button";
import { useHistory } from 'react-router-dom';

export const NotFound = () => {

	const history = useHistory();

	const goDashboard = () => {
		history.push('/');
	}

	return <div className="exception-body notfound-body">

		<div className="exception-container">
			<img src="assets/layout/images/logo-dark.png" alt="apollo-layout" />
			<h1>Not Found</h1>
			<p>
				Resource is not found.
				</p>

			<Button label="Go To Dashboard" icon="pi pi-arrow-left" onClick={goDashboard} />
		</div>
	</div>
}

