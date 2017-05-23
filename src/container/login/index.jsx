import React, { Component, PropTypes } from 'react';
import formProvider from 'src/util/formProvider';
import Form from 'src/component/form';
import { Header } from 'src/component';
import fetchPosts from 'src/util/fetch';

class Login extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props, context) {
        super(props);
    }
    submitHandle = () => {
        const { form: { user, password } } = this.props;
        const data = {
            user: user.value,
            password: password.value
        };
        fetchPosts('http://localhost:3000/users/login', 'post', data).then(result => {
            console.log(result);
            if (result.code === 0) {
                const token = {
                    token: result.token,
                    curTime: new Date().getTime()
                };
                localStorage.setItem('token', JSON.stringify(token));
                const reUrl = this.props.location.query.reUrl;
                if (reUrl) {
                    this.context.router.push(`/${reUrl}`);
                } else {
                    this.context.router.push('/');
                }
            }
        });
    };

    render() {
        const { form: { user, password }, onFormChange, onFormFocus } = this.props;
        return (
            <div>
                <Header title="登录" />
                <Form
                  type="login"
                  user={user}
                  password={password}
                  onFormChange={onFormChange}
                  onFormFocus={onFormFocus}
                  button="登录"
                  submitHandle={this.submitHandle}
                />
            </div>
        );
    }
}

const vaild = {
    user: {
        defaultValue: '',
        rules: [
            {
                pattern: (value) => {
                    return value.length > 0;
                },
                error: '请输入用户名'
            },
            {
                pattern: /^[A-Za-z1-9]{4,10}$/,
                error: '请输入4到10个字符'
            }
        ]
    },
    password: {
        defaultValue: '',
        rules: [
            {
                pattern: (value) => {
                    return value.length > 0;
                },
                error: '请输入密码'
            },
            {
                pattern: /^[A-Za-z1-9]{4,10}$/,
                error: '请输入4到10个字符'
            }
        ]
    },
};

export default formProvider(vaild)(Login);
