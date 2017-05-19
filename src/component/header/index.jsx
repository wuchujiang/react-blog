import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.scss';

class Header extends Component {
    state = { nav: false, width: 0 };
    showMenu = () => {
        this.setState(preState => {
            return {
                nav: !preState.nav
            };
        });
    };

    render() {
        return (
            <header className="header">
                <div onClick={e => { this.showMenu(); }} className="header-right">
                    <a href="javascript:void(0)">
                        <img src={require('assets/image/svg/menu.svg')} alt="" />
                    </a>
                </div>
                <div className="header-title">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="header-left">
                    <a href="https://github.com/wuchujiang/kit.git">
                        <img src={require('assets/image/svg/github.svg')} alt="" />
                    </a>
                </div>
                <ul onMouseLeave={e => { this.showMenu(); }} style={{ display: this.state.nav ? 'block' : 'none' }} className="nav">
                    <li><Link to="/"><span className="li-home" />主页</Link></li>
                    <li><Link to="writer"><span className="li-writer" />发表</Link></li>
                    <li><Link to="categorise"><span className="li-categorise" />归档</Link></li>
                    <li><Link to="login"><span className="li-login" />登录</Link></li>
                    <li><Link to="about"><span className="li-about" />关于</Link></li>
                </ul>
            </header>
        );
    }
}

export default Header;
