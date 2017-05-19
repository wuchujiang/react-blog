import React, { Component } from 'react';
import './index.scss';

class Login extends Component {
    render() {
        return (
            <div className="login">
                <h4>登录</h4>
                <div className="login-container">
                    <div className="user-name">
                        <span className="user-icon" />
                        <input placeholder="请输入用户名" className="login-user" type="text"/>
                    </div>
                    <div className="user-password">
                        <span className="password-icon" />
                        <input placeholder="请输入密码" className="login-user" type="password"/>
                    </div>
                </div>
                <button>登录</button>
            </div>
        );
    }
}

export default Login;
