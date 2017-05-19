import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from 'src/component';
import MdEditor from 'src/component/editor';
import className from 'classnames';
import './index.scss';

@connect(
    state => ({ ...state }),
    dispatch => bindActionCreators({}, dispatch)
)
class Write extends Component {
    state = {
        classify: '',
        info: ''
    };
    setClassify = () => ([
        'javascript', 'nodejs', 'react', 'vue', 'angular', 'webpack'
    ]);

    clickHandle = item => {
        this.setState({
            classify: item
        });
    };
    render() {
        return (
            <div className="writer">
                <Header title="记笔记" />
                <div className="container">
                    <div className="writer-form">
                        <input className="w-form-title" width="100%" placeholder="请输入文章标题" />
                        <div className="writer-classify">
                            <p>选择类别</p>
                            <ul className="writer-c-keyword">
                            {
                                this.setClassify().map((item, index) => {
                                    return (
                                        <li
                                          className={className({ active: this.state.classify === item })}
                                          onClick={e => this.clickHandle(item)}
                                          key={index}
                                        >
                                            {item}
                                        </li>
                                    );
                                })
                            }
                            </ul>
                        </div>
                    </div>
                    <div className="editor-contain">
                        <MdEditor />
                    </div>
                    <div className="submit">
                        <button>提交</button>
                        <span className="error">{this.state.info}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Write;
