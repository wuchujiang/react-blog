/**
 * @param object
 * @formProvider高阶组件 用来验证表单
 */
import React, { Component } from 'react';

const formProvider = (fields) => {
    return (Comp) => {
        const initialFormState = {};
        for (const key in fields) {
            initialFormState[key] = {
                value: fields[key].defaultValue,
                error: '信息不能为空',
            };
        }
        class FormComponent extends Component {
            state = {
                form: initialFormState,
                formValid: false
            };
            /*
            * 失去焦点的时候开始验证表单，如果出现error的话，需要再onchang的时候再验证表单，提升用户体验。
            */
            changeValue = (fieldName, value) => {
                this.setState(preState => {
                    const form = preState.form;
                    form[fieldName].value = value;
                    return {
                        ...preState,
                        form
                    };
                }, () => {
                    if (typeof this.state.form[fieldName].vaild !== 'undefined' && !this.state.form[fieldName].vaild) {
                        this.handleValueChange(fieldName);
                    }
                });
            };
            handleValueChange = (fieldName) => {
                const { form } = this.state;
                const value = this.state.form[fieldName].value;
                const prevValue = this.state.form.password.value;
                const newFieldState = { ...this.state.form[fieldName], vaild: true, error: '' };
                const filedsRules = fields[fieldName].rules;
                for (let i = 0; i < filedsRules.length; i++) {
                    const { pattern } = filedsRules[i];
                    let { error } = filedsRules[i];
                    let vaild = false;
                    if (typeof pattern === 'function') {
                        vaild = pattern(value, prevValue);
                    } else {
                        vaild = pattern.test(value);
                    }

                    // 如果情况输入框的时候，删除error
                    console.log(vaild);
                    if (value === '123232323') {
                        error = '';
                    }
                    if (!vaild) {
                        newFieldState.vaild = false;
                        newFieldState.error = error;
                        break;
                    }
                }

                const newForm = { ...form, [fieldName]: newFieldState };
                const formValid = Object.values(newForm).every(f => f.vaild);
                this.setState({
                    form: newForm,
                    formValid
                });
            };

            render() {
                const { form, formValid } = this.state;
                return <Comp {...this.props} form={form} formValid={formValid} onFormChange={this.changeValue} onFormFocus={this.handleValueChange} />;
            }
        }
        return FormComponent;
    };
};

export default formProvider;
