import React from 'react';

const AppTopbar = (props) => {

    return (
        <div className="topbar clearfix">

            <h3>Konrad Bartlett</h3>

            <button type="button" className="p-link menu-button" id="menu-button" onClick={props.onMenuButtonClick}>
                <i className="pi pi-align-left"></i>
            </button>

        </div>
    );

}

export default AppTopbar;
