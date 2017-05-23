import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from 'src/component';
import MdEditor from 'src/component/editor';
import className from 'classnames';
import fetchPosts from 'src/util/fetch';
import './index.scss';

@connect(
    state => ({ ...state }),
    dispatch => bindActionCreators({}, dispatch)
)
class Write extends Component {
    state = {
        classify: '',
        info: '',
        title: '',
        content: ''
    };
    setClassify = () => ([
        'javascript', 'nodejs', 'react', 'vue', 'angular', 'webpack'
    ]);

    getEditorContent = (value) => {
        this.setState({
            content: value
        });
    }

    clickHandle = (type, value) => {
        this.setState({
            [type]: value
        });
    };
    submitHandle = () => {
        const data = {
            title: this.state.title,
            keyword: this.state.classify,
            content: this.state.content
        };
        fetchPosts('http://localhost:3000/article/writer', 'post', data).then(datas => {
            console.log(datas);
        });
    };
    render() {
        return (
            <div className="writer">
                <Header title="记笔记" />
                <div className="container">
                    <div className="writer-form">
                        <input value={this.state.title} onChange={e => { this.clickHandle('title', e.target.value); }} className="w-form-title" width="100%" placeholder="请输入文章标题" />
                        <div className="writer-classify">
                            <p>选择类别</p>
                            <ul className="writer-c-keyword">
                            {
                                this.setClassify().map((item, index) => {
                                    return (
                                        <li
                                          className={className({ active: this.state.classify === item })}
                                          onClick={e => this.clickHandle('classify', item)}
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
                        <MdEditor changeContent={this.getEditorContent} content={this.state.content} />
                    </div>
                    <div className="submit">
                        <button onClick={this.submitHandle}>提交</button>
                        <span className="error">{this.state.info}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Write;
