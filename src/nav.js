import React from 'react';
import {isMobile} from './resumeData';require('./style/nav.scss');

const isItMobile = isMobile.any();

class Nav extends React.Component{
    constructor(){
        super();
        this.menuList = this.menuList.bind(this);
    }
    open(e){
        e.preventDefault();
        this.props.open();
    }
    menuList(){
        if(isItMobile){
            return (
                <a className="menuIcon" href="" onClick={(e) => {this.props.openDrawer(e)} }>
                    <svg style={{width:'24px',height:'24px'}} viewBox="0 0 24 24">
                        <path fill="#ffffff" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                    </svg>
                </a>
            )
        }
        else {
            return (
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="" onClick={(e) => {this.open(e)}} alt="Email">
                                    <svg style={{width:'24px',height:'24px'}} viewBox="0 0 24 24">
                                        <path fill="#ffffff" d="M4,8L12,13L20,8V8L12,3L4,8V8M22,8V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V8C2,7.27 2.39,6.64 2.97,6.29L12,0.64L21.03,6.29C21.61,6.64 22,7.27 22,8Z" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/geekorlife"  alt="GitHub">
                                    <svg style={{width:'24px',height:'24px'}} viewBox="0 0 24 24">
                                        <path fill="#ffffff" d="M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H14.85C14.5,21.92 14.5,21.24 14.5,21V18.26C14.5,17.33 14.17,16.72 13.81,16.41C16.04,16.16 18.38,15.32 18.38,11.5C18.38,10.39 18,9.5 17.35,8.79C17.45,8.54 17.8,7.5 17.25,6.15C17.25,6.15 16.41,5.88 14.5,7.17C13.71,6.95 12.85,6.84 12,6.84C11.15,6.84 10.29,6.95 9.5,7.17C7.59,5.88 6.75,6.15 6.75,6.15C6.2,7.5 6.55,8.54 6.65,8.79C6,9.5 5.62,10.39 5.62,11.5C5.62,15.31 7.95,16.17 10.17,16.42C9.89,16.67 9.63,17.11 9.54,17.76C8.97,18 7.5,18.45 6.63,16.93C6.63,16.93 6.1,15.97 5.1,15.9C5.1,15.9 4.12,15.88 5,16.5C5,16.5 5.68,16.81 6.14,17.97C6.14,17.97 6.73,19.91 9.5,19.31V21C9.5,21.24 9.5,21.92 9.14,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2Z" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/pascal-boudier-b7555221/en"  alt="Linkedin">
                                    <svg style={{width:'24px',height:'24px'}} viewBox="0 0 24 24">
                                        <path fill="#ffffff" d="M19,4V7H17A1,1 0 0,0 16,8V10H19V13H16V20H13V13H11V10H13V7.5C13,5.56 14.57,4 16.5,4M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/pascal.boudier"  alt="Facebook">
                                    <svg style={{width:'24px',height:'24px'}} viewBox="0 0 24 24">
                                        <path fill="#ffffff" d="M19,19H16V13.7A1.5,1.5 0 0,0 14.5,12.2A1.5,1.5 0 0,0 13,13.7V19H10V10H13V11.2C13.5,10.36 14.59,9.8 15.5,9.8A3.5,3.5 0 0,1 19,13.3M6.5,8.31C5.5,8.31 4.69,7.5 4.69,6.5A1.81,1.81 0 0,1 6.5,4.69C7.5,4.69 8.31,5.5 8.31,6.5A1.81,1.81 0 0,1 6.5,8.31M8,19H5V10H8M20,2H4C2.89,2 2,2.89 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com/geekorlife"  alt="Twitter">
                                    <svg style={{width:'24px',height:'24px'}} viewBox="0 0 24 24">
                                        <path fill="#ffffff" d="M17.71,9.33C17.64,13.95 14.69,17.11 10.28,17.31C8.46,17.39 7.15,16.81 6,16.08C7.34,16.29 9,15.76 9.9,15C8.58,14.86 7.81,14.19 7.44,13.12C7.82,13.18 8.22,13.16 8.58,13.09C7.39,12.69 6.54,11.95 6.5,10.41C6.83,10.57 7.18,10.71 7.64,10.74C6.75,10.23 6.1,8.38 6.85,7.16C8.17,8.61 9.76,9.79 12.37,9.95C11.71,7.15 15.42,5.63 16.97,7.5C17.63,7.38 18.16,7.14 18.68,6.86C18.47,7.5 18.06,7.97 17.56,8.33C18.1,8.26 18.59,8.13 19,7.92C18.75,8.45 18.19,8.93 17.71,9.33M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
            )
        }
    }
    render(){
        const cls = 'navbar navbar-default '+this.props.addClass;
        return (
            <nav className={cls}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="" onClick={(e) => {this.props.openDrawer(e)}}>
                            <img alt="Pascal" src="img/pascal.jpg"/>
                        </a>
                    </div>
                    {this.menuList()}
                </div>
            </nav>
        )
    }
}

export default Nav;