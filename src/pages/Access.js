import React from 'react';
import { Button } from "primereact/button";
import { useHistory } from 'react-router-dom';

export const Access = () => {

	const history = useHistory();
	
	const goDashboard = () => {
		history.push('/');
	}
	

	return <div className="exception-body access-body">
		<div className="exception-container">
			<img src="assets/layout/images/logo-dark.png" alt="apollo-layout" />
			<h1>Denied</h1>
			<p>
				You do not have the necessary privileges.
				</p>

			<Button label="Go To Dashboard" icon="pi pi-arrow-left" onClick={goDashboard} />
		</div>
	</div>
}