import React, { useState } from 'react';
import classNames from 'classnames';

import AppTopbar from './AppTopbar';
import AppBreadcrumb from './AppBreadcrumb';
import AppFooter from './AppFooter';
import AppMenu from './AppMenu';

import { Blog } from "../pages/Blog";
import { Home } from "../pages/Home";
import { Resume } from "../pages/Resume";
import { Contact } from "../pages/Contact";
import { Degree } from "../pages/Degree";
import { Game } from "../pages/game/Game";
import { Projects } from "../pages/Projects";

import PrimeReact from 'primereact/api';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Route, withRouter, useLocation } from 'react-router-dom';

const App = () => {

    const [layoutMode, setLayoutMode] = useState('horizontal');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [menuActive, setMenuActive] = useState(false);
    const [themeColor, setThemeColor] = useState('blue');
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const [scheme, setScheme] = useState('light');

    let menuClick;
    let topbarItemClick;

    const menu = [
        {
            label: 'Home', icon: 'fas pi-fw fa-home', to: '/'
        },
        {
            label: 'Resume', icon: 'fas pi-fw fa-certificate', to: '/resume'
        },
        {
            label: 'Degree/Certificates', icon: 'fas pi-fw fa-file', to: '/degree'
        },
        {
            label: 'Projects', icon: 'fas pi-fw fa-briefcase', to: '/project'
        },
        {
            label: 'Blog', icon: 'fas pi-fw fa-blog', to: '/blog'
        },
        {
            label: 'Game Reviews', icon: 'fas pi-fw fa-gamepad', to: '/reviews'
        },
        {
            label: 'Contact', icon: 'fas pi-fw fa-phone', to: '/contact'
        },
        // {
        //     label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
        //     items: [
        //         {
        //             label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
        //             items: [
        //                 {
        //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
        //                     items: [
        //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left' },
        //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left' },
        //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left' },
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
        //                     items: [
        //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left' },
        //                         { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-align-left' }
        //                     ]
        //                 },
        //             ]
        //         },
        //         {
        //             label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
        //             items: [
        //                 {
        //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
        //                     items: [
        //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left' },
        //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left' },
        //                         { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-align-left' },
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
        //                     items: [
        //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left' },
        //                         { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-align-left' }
        //                     ]
        //                 },
        //             ]
        //         }
        //     ]
        // },
    ];

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    }

    const onMenuClick = (event) => {
        menuClick = true;
    }

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarMenuActive(false);

        if (layoutMode === 'overlay' && !isMobile()) {
            setOverlayMenuActive(prevState => !prevState);
        } else {
            if (isDesktop())
                setStaticMenuDesktopInactive(prevState => !prevState);
            else
                setStaticMenuMobileActive(prevState => !prevState);
        }

        event.preventDefault();
    }

    const onTopbarMenuButtonClick = (event) => {
        topbarItemClick = true;
        setTopbarMenuActive(prevState => !prevState)
        hideOverlayMenu();
        event.preventDefault();
    }

    const onTopbarItemClick = (event) => {
        topbarItemClick = true;

        if (activeTopbarItem === event.item)
            setActiveTopbarItem(null);
        else
            setActiveTopbarItem(event.item);

        event.originalEvent.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();
        }
        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false);
        }
    }

    const onRootMenuItemClick = (event) => {
        setMenuActive(prevState => !prevState);
    }

    const onDocumentClick = (event) => {
        if (!topbarItemClick) {
            setActiveTopbarItem(null)
            setTopbarMenuActive(false)
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false)
            }

            hideOverlayMenu();
        }

        topbarItemClick = false;
        menuClick = false;
    }

    const isMenuVisible = () => {
        if (isDesktop()) {
            if (layoutMode === 'static')
                return !staticMenuDesktopInactive;
            else if (layoutMode === 'overlay')
                return overlayMenuActive;
            else
                return true;
        }
        else {
            return true;
        }
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false)
    }

    const isMobile = () => {
        return window.innerWidth < 1025;
    }

    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    const isHorizontal = () => {
        return layoutMode === 'horizontal';
    }

    const isSlim = () => {
        return layoutMode === 'slim';
    }

    const changeMenuMode = (event) => {
        setLayoutMode(event.menuMode);
        setStaticMenuDesktopInactive(false);
        setOverlayMenuActive(false);
    }

    const onSchemeChange = (color) => {
        setScheme(color);
        const themeLink = document.getElementById('theme-css');
        const href = themeLink.href;
        const themeFile = href.substring(href.lastIndexOf('/') + 1, href.lastIndexOf('.'));
        const themeTokens = themeFile.split('-');
        const themeName = themeTokens[1];
        changeTheme(themeName + '-' + color);
        changeLogo(color);
    }

    const changeTheme = (theme) => {
        setThemeColor(theme.split('-')[0]);
        changeStyleSheetUrl('layout-css', theme, 'layout');
        changeStyleSheetUrl('theme-css', theme, 'theme');
    }

    const onThemeChange = (theme) => {
        setThemeColor(theme)
        changeTheme(theme + '-' + scheme);
    }

    const changeStyleSheetUrl = (id, value, prefix) => {
        let element = document.getElementById(id);
        let urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
        let newURL = urlTokens.join('/');

        replaceLink(element, newURL);
    }

    const changeLogo = (scheme) => {
        const invoiceLogoLink = document.getElementById("invoice-logo");
        const logoUrl = `assets/layout/images/logo-${scheme === 'light' ? 'dark' : 'white'}.png`;

        if (invoiceLogoLink) {
            invoiceLogoLink.src = logoUrl;
        }
    };

    const isIE = () => {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent)
    }

    const replaceLink = (linkElement, href) => {
        if (isIE()) {
            linkElement.setAttribute('href', href);
        }
        else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    const layoutClassName = classNames('layout-wrapper', {
        'layout-horizontal': layoutMode === 'horizontal',
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-slim': layoutMode === 'slim',
        'layout-static-inactive': staticMenuDesktopInactive && layoutMode !== 'slim',
        'layout-mobile-active': staticMenuMobileActive,
        'layout-overlay-active': overlayMenuActive,
        'p-input-filled': inputStyle === 'filled'
    });

    const menuContainerClassName = classNames('layout-menu-container', { 'layout-menu-container-inactive': !isMenuVisible() })

    return (
        <div className={layoutClassName} onClick={onDocumentClick}>

            <AppTopbar
                topbarMenuActive={topbarMenuActive} activeTopbarItem={activeTopbarItem}
                onMenuButtonClick={onMenuButtonClick}
                onTopbarMenuButtonClick={onTopbarMenuButtonClick}
                onTopbarItemClick={onTopbarItemClick} />

            <div className={menuContainerClassName} onClick={onMenuClick}>
                <div className="layout-menu-content">
                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick}
                        onRootMenuItemClick={onRootMenuItemClick}
                        layoutMode={layoutMode} active={menuActive} />
                </div>
            </div>

            <div className="layout-content">
                <AppBreadcrumb />

                <div className="layout-content-container">
                    <Route exact path='/' component={Home} />
                    <Route path='/resume' component={Resume} />
                    <Route path='/degree' component={Degree} />
                    <Route path='/project' component={Projects} />
                    <Route path='/contact' component={Contact} />
                    <Route path='/blog' component={Blog} />
                    <Route path='/reviews' component={Game} />
                </div>

                <AppFooter />

                {/* {staticMenuMobileActive && <div className="layout-mask"></div>} */}
            </div>
        </div>
    );

}

export default App;
