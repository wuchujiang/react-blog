import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'src/component/';
import './index.scss';

class Form extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        onFormChange: PropTypes.func.isRequired,
        onFormFocus: PropTypes.func.isRequired,
        submitHandle: PropTypes.func.isRequired,
    };
    static defaultProps = {
        button: '按钮',
        type: 'login'
    }
    render() {
        const { user, password, onFormChange, onFormFocus, type, submitHandle, button, repeatPassword } = this.props;
        return (
            <div className="login">
                <div className="normal-title">
                    {type === 'login' ? <span>登录</span> : <Link to="login">登录</Link>}
                    <i className="point">·</i>
                    {type === 'register' ? <span>注册</span> : <Link to="register">注册</Link>}
                </div>
                <div className="login-container">
                    <div className="input-item user-name">
                        <Icon type="group" />
                        <input
                          placeholder="请输入用户名"
                          onChange={e => onFormChange('user', e.target.value)}
                          onBlur={e => onFormFocus('user')}
                          value={user.value}
                          className="login-user"
                          type="text"
                        />
                        {(typeof user.vaild !== 'undefined' && !user.vaild) && <div className="error-info"><span>{user.error}</span></div>}
                    </div>
                    <div className="input-item user-password">
                        <Icon type="unlock" />
                        <input
                          placeholder="请输入密码"
                          onChange={e => onFormChange('password', e.target.value)}
                          onBlur={e => onFormFocus('password')}
                          value={password.value}
                          className="login-user"
                          type="password"
                        />
                        {(typeof password.vaild !== 'undefined' && !password.vaild) && <div className="error-info"><span>{password.error}</span></div>}
                    </div>
                    {
                        type === 'register' && <div className="input-item user-password repeat-password">
                            <Icon type="lock" />
                            <input
                              placeholder="请再次输入密码"
                              onChange={e => onFormChange('repeatPassword', e.target.value)}
                              onBlur={e => onFormFocus('repeatPassword')}
                              value={repeatPassword.value}
                              className="login-user"
                              type="password"
                            />
                            {(typeof repeatPassword.vaild !== 'undefined' && !repeatPassword.vaild && repeatPassword) && <div className="error-info"><span>{repeatPassword.error}</span></div>}
                        </div>
                    }
                </div>
                <button onClick={e => { submitHandle(); }}>{button}</button>
            </div>
        );
    }
}

export default Form;
