import React, { useRef, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { RadioButton } from 'primereact/radiobutton';
import { InputSwitch } from 'primereact/inputswitch';

const AppConfig = (props) => {

	const [active, setActive] = useState(false);
	const config = useRef(null);
	let outsideClickListener = useRef(null);

	let themeColors = [
		{ title: 'Blue', name: 'blue', color: '#39a3f4' },
		{ title: 'Green', name: 'green', color: '#6ebc3b' },
		{ title: 'Cyan', name: 'cyan', color: '#1989AC' },
		{ title: 'Purple', name: 'purple', color: '#7E57C2' },
		{ title: 'Indigo', name: 'indigo', color: '#5C6BC0' },
		{ title: 'Yellow', name: 'yellow', color: '#ffc800' },
		{ title: 'Orange', name: 'orange', color: '#f6a821' },
		{ title: 'Pink', name: 'pink', color: '#EC407A' }
	]

	const unbindOutsideClickListener = useCallback(() => {
		if (outsideClickListener.current) {
			document.removeEventListener('click', outsideClickListener.current);
			outsideClickListener.current = null;
		}
	}, []);

	const hideConfigurator = useCallback((event) => {
		setActive(false);
		unbindOutsideClickListener();
		event.preventDefault();
	}, [unbindOutsideClickListener]);

	const bindOutsideClickListener = useCallback(() => {
		if (!outsideClickListener.current) {
			outsideClickListener.current = (event) => {
				if (active && isOutsideClicked(event)) {
					hideConfigurator(event);
				}
			};
			document.addEventListener('click', outsideClickListener.current);
		}
	}, [active, hideConfigurator]);

	useEffect(() => {
		if (active) {
			bindOutsideClickListener()
		}
		else {
			unbindOutsideClickListener()
		}
	}, [active, bindOutsideClickListener, unbindOutsideClickListener]);

	const isOutsideClicked = (event) => {
		return !(config.current.isSameNode(event.target) || config.current.contains(event.target));
	}

	const toggleConfigurator = (event) => {
		setActive(prevState => !prevState);
	}

	const configClassName = classNames('layout-config', {
		'layout-config-active': active
	});

	return (
		<div ref={config} id="layout-config" className={configClassName}>
			<div className="layout-config-content">
				<button type="button" className="layout-config-button p-link" id="layout-config-button" onClick={toggleConfigurator}>
					<i className="pi pi-cog" />
				</button>

				<button type="button" className="layout-config-close p-link" onClick={hideConfigurator}>
					<i className="pi pi-times" />
				</button>

				<h5 style={{ marginTop: 0 }}>Input Style</h5>
				<div className="p-formgroup-inline">
					<div className="p-field-radiobutton">
						<RadioButton id="input_outlined" name="inputstyle" value="outlined" checked={props.inputStyle === 'outlined'} onChange={(e) => props.onInputStyleChange(e.value)} />
						<label htmlFor="input_outlined">Outlined</label>
					</div>
					<div className="p-field-radiobutton">
						<RadioButton id="input_filled" name="inputstyle" value="filled" checked={props.inputStyle === 'filled'} onChange={(e) => props.onInputStyleChange(e.value)} />
						<label htmlFor="input_filled">Filled</label>
					</div>
				</div>

				<h5>Ripple Effect</h5>
				<InputSwitch checked={props.ripple} onChange={props.onRippleChange} />

				<h5>Menu Type</h5>
				<div className="p-field-radiobutton">
					<RadioButton id="static" name="layoutMode" value="static" checked={props.layoutMode === 'static'} onChange={(e) => props.changeMenuMode({ menuMode: e.value })} />
					<label htmlFor="static">Static</label>
				</div>
				<div className="p-field-radiobutton">
					<RadioButton id="overlay" name="layoutMode" value="overlay" checked={props.layoutMode === 'overlay'} onChange={(e) => props.changeMenuMode({ menuMode: e.value })} />
					<label htmlFor="overlay">Overlay</label>
				</div>
				<div className="p-field-radiobutton">
					<RadioButton id="horizontal" name="layoutMode" value="horizontal" checked={props.layoutMode === 'horizontal'} onChange={(e) => props.changeMenuMode({ menuMode: e.value })} />
					<label htmlFor="horizontal">Horizontal</label>
				</div>
				<div className="p-field-radiobutton">
					<RadioButton id="slim" name="layoutMode" value="slim" checked={props.layoutMode === 'slim'} onChange={(e) => props.changeMenuMode({ menuMode: e.value })} />
					<label htmlFor="slim">Slim</label>
				</div>

				<h5>Color Scheme</h5>
				<div className="p-field-radiobutton">
					<RadioButton id="light" name="color" value="light" checked={props.scheme === 'light'} onChange={(e) => props.onSchemeChange(e.value)} />
					<label htmlFor="light">Light</label>
				</div>
				<div className="p-field-radiobutton">
					<RadioButton id="dark" name="color" value="dark" checked={props.scheme === 'dark'} onChange={(e) => props.onSchemeChange(e.value)} />
					<label htmlFor="dark">Dark</label>
				</div>
				<div className="p-field-radiobutton">
					<RadioButton id="dim" name="color" value="dim" checked={props.scheme === 'dim'} onChange={(e) => props.onSchemeChange(e.value)} />
					<label htmlFor="dim">Dim</label>
				</div>

				<h5>Themes</h5>
				<div className="layout-themes">
					{
						themeColors.map(color => {
							return <div key={color.name}>
								<button type="button" className="p-link" style={{ backgroundColor: color.color }} onClick={(event) => props.onThemeChange(color.name)}>
									{props.themeColor === color.name && <i className="pi pi-check"></i>}
								</button>
							</div>
						})
					}
				</div>
			</div>
		</div>
	);

}

export default AppConfig;
