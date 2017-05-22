import React, { Component } from 'react';
import formProvider from 'src/util/formProvider';
import Form from 'src/component/form';
import './index.scss';

class Login extends Component {
    handleSubmit = () => {
    };

    render() {
        const { form: { user, password }, onFormChange, onFormFocus } = this.props;
        return (
            <Form
              type="login"
              user={user}
              password={password}
              onFormChange={onFormChange}
              onFormFocus={onFormFocus}
              button="登录"
            />
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
