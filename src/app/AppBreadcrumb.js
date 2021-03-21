import React from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';


const AppBreadcrumb = () => {

    const location = useLocation();
    const history = useHistory();

    const paths = location.pathname.split('/');

    return (
        <div className="layout-breadcrumb">
            <ul>
                <li><button type="button" className="p-link" onClick={() => history.push('/')}><i className="fas pi-fw fa-home"></i></button></li>
                {
                    location.pathname === '/' ? <li>/</li> : paths.map((path, index) => <li key={index}>{path === '' ? '/' : path}</li>)
                }
            </ul>
        </div>
    );

}

export default withRouter(AppBreadcrumb);
