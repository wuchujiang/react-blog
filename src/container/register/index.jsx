import React, { Component } from 'react';
import formProvider from 'src/util/formProvider';
import Form from 'src/component/form';
import { Header } from 'src/component';
import fetchPosts from 'src/util/fetch';

class Register extends Component {
    submitHandle = () => {
        const { form: { user, password, repeatPassword } } = this.props;
        const data = {
            user: user.value,
            password: password.value,
            repeatPassword: repeatPassword.value
        };
        fetchPosts('http://localhost:3000/users/register', 'post', data).then(datas => {
            console.log(datas);
        });
    };


    render() {
        const { form: { user, password, repeatPassword }, onFormChange, onFormFocus } = this.props;
        return (
            <div>
                <Header title="注册" />
                <Form
                  type="register"
                  user={user}
                  password={password}
                  onFormChange={onFormChange}
                  onFormFocus={onFormFocus}
                  repeatPassword={repeatPassword}
                  button="注册"
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
    repeatPassword: {
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
            },
            {
                pattern: (value, preValue) => {
                    return preValue === value;
                },
                error: '密码输入不正确！'
            }
        ]
    },
};

export default formProvider(vaild)(Register);
