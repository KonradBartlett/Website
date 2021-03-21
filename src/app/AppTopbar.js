import React from 'react';
import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import { CSSTransition } from 'react-transition-group';

const AppTopbar = (props) => {

    const onTopbarItemClick = (event, item) => {
        if (props.onTopbarItemClick) {
            props.onTopbarItemClick({
                originalEvent: event,
                item: item
            });
        }
    };

    let topbarItemsClassName = classNames('topbar-menu fadeInDown', { 'topbar-menu-visible': props.topbarMenuActive });

    return (
        <div className="topbar clearfix">


            <h3 style={{ float: 'left' }}>Konrad Bartlett</h3>

            <button type="button" className="p-link menu-button" id="menu-button" onClick={props.onMenuButtonClick}>
                <i className="pi pi-align-left"></i>
            </button>

        </div>
    );

}

export default AppTopbar;
