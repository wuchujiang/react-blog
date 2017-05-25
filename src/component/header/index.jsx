import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from '../icon';
import './index.scss';

class Header extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    state = { nav: false, width: 0 };
    showMenu = () => {
        this.setState(preState => {
            return {
                nav: !preState.nav
            };
        });
    };

    lagoutHandle = () => {
        localStorage.removeItem('token');
        this.props.actions.userInfo('');
        this.context.router.push('/');
    }

    render() {
        return (
            <header className="header">
                <div onClick={e => { this.showMenu(); }} className="header-right">
                    <Icon type="other" />
                </div>
                <div className="header-title">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="header-left">
                    <a href="https://github.com/wuchujiang/kit.git">
                        <Icon type="github" />
                    </a>
                </div>
                <ul onMouseLeave={e => { this.showMenu(); }} style={{ display: this.state.nav ? 'block' : 'none' }} className="nav">
                    <li><Link to="/"><Icon type="homepage" />主页</Link></li>
                    <li><Link to="writer"><Icon type="brush" />发表</Link></li>
                    <li><Link to="categorise"><Icon type="share" />归档</Link></li>
                    <li>{this.props.userInfo === '' ? <Link to="login"><Icon type="group" />登录</Link> : <p onClick={e => this.lagoutHandle()}><Icon type="layout" /><span>退出</span></p>}</li>
                    <li><Link to="about"><Icon type="about" />关于</Link></li>
                </ul>
            </header>
        );
    }
}

export default Header;
