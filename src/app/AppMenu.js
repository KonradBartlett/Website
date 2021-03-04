import React, { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Ripple } from 'primereact/ripple';

const AppSubmenu = (props) => {

	const [activeIndex, setActiveIndex] = useState(null);

	const onMenuItemClick = (event, item, index) => {
		//avoid processing disabled items
		if (item.disabled) {
			event.preventDefault();
			return true;
		}

		if (props.root && props.onRootItemClick) {
			props.onRootItemClick({
				originalEvent: event,
				item: item
			});
		}

		//execute command
		if (item.command) {
			item.command({ originalEvent: event, item: item });
			event.preventDefault();
		}

		if (item.items) {
			setActiveIndex(activeIndex === index ? null : index);
		}

		if (props.onMenuItemClick) {
			props.onMenuItemClick({
				originalEvent: event,
				item: item
			});
		}
	}

	const onKeyDown = (event, item, index) => {
		if (event.key === 'Enter') {
			onMenuItemClick(event, item, index);
		}
	}

	const onMenuItemMouseEnter = (index) => {
		if (props.root && props.menuActive && isHorizontalOrSlim() && !isMobile()) {
			setActiveIndex(index)
		}
	}

	const isHorizontalOrSlim = useCallback(() => {
		return (props.layoutMode === 'horizontal' || props.layoutMode === 'slim');
	}, [props.layoutMode]);

	const isMobile = useCallback(() => {
		return window.innerWidth < 1025;
	}, []);

	const isHorizontal = () => {
		return props.layoutMode === 'horizontal';
	}
	const isSlim = () => {
		return props.layoutMode === 'slim';
	}

	useEffect(() => {
		if (!props.menuActive && isHorizontalOrSlim() && !isMobile()) {
			setActiveIndex(null);
		}
	}, [props, isHorizontalOrSlim, isMobile]);


	const renderLinkContent = (item) => {
		let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down layout-menuitem-toggler"></i>;
		let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;

		return (
			<React.Fragment>
				<i className={classNames('layout-menuitem-icon', item.icon)}></i>
				<span>{item.label}</span>
				{submenuIcon}
				{badge}
			</React.Fragment>
		);
	}

	const renderLink = (item, i) => {
		let content = renderLinkContent(item);
		let linkStyle = classNames(item.class, 'p-ripple');

		if (item.to) {
			return (
				<NavLink activeClassName="router-link-active" to={item.to}
					onClick={(e) => onMenuItemClick(e, item, i)} exact role="menuitem"
					target={item.target} onMouseEnter={(e) => onMenuItemMouseEnter(i)}
					className={linkStyle}>{content}
					<Ripple />
				</NavLink>
			)
		} else {
			return (
				<a href={item.url} tabIndex={item.url ? '' : 0} role="menuitem" onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}
					onMouseEnter={(e) => onMenuItemMouseEnter(i)} onKeyDown={(e) => onKeyDown(e, item, i)} className={linkStyle}>
					{content}
					<Ripple />
				</a>
			);

		}
	}
	const isMenuActive = (index) => {
		return activeIndex === index;
	}

	var items = props.items && props.items.map((item, i) => {
		const active = isMenuActive(i);
		let styleClass = classNames(item.badgeStyleClass, { 'active-menuitem': active }, { 'layout-root-menuitem': props.root });
		let tooltip = props.root && <div className="layout-menuitem-root-text" style={{ textTransform: 'uppercase' }}>
			{item.label}
		</div>;

		return <li className={styleClass} key={i} role="none">
			{item.items && props.root === true && <div className='arrow'></div>}
			{renderLink(item, i)}
			{tooltip}
				<CSSTransition classNames="layout-submenu-container" timeout={{ enter: 400, exit: 400 }} in={item.items && (props.root && !((isHorizontal() || isSlim()) && !isMobile() && (!isSlim() || (isSlim() && activeIndex !== null))) ? true : active)} unmountOnExit>
					<AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} layoutMode={props.layoutMode}
						menuActive={props.menuActive} parentMenuItemActive={active} />
				</CSSTransition>

		</li>
	});

	return items ? <ul role="menu" className={props.className}>{items}</ul> : null;

}

const AppMenu = (props) => {

	return <AppSubmenu items={props.model} className="layout-menu layout-main-menu clearfix"
		menuActive={props.active} onRootItemClick={props.onRootMenuItemClick}
		onMenuItemClick={props.onMenuItemClick} root={true} layoutMode={props.layoutMode}
		parentMenuItemActive={true} />
}

export default AppMenu;
