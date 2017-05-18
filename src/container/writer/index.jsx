import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from 'src/component';
import MdEditor from 'src/component/editor';
import './index.scss';

@connect(
    state => ({ ...state }),
    dispatch => bindActionCreators({}, dispatch)
)
class Write extends Component {
    render() {
        return (
            <div className="writer">
                <Header title="记笔记" />
                <div className="container">
                    <MdEditor>
                        <option title="自定义按钮"><i className="fa fa-bomb" /></option>
                    </MdEditor>
                </div>
            </div>
        );
    }
}

export default Write;
