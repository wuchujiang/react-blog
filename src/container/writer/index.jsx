import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header } from 'src/component';
import MdEditor from 'src/component/editor';
import * as HomeActions from 'src/redux/action/home';
import className from 'classnames';
import fetchPosts from 'src/util/fetch';
import './index.scss';

class Write extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    state = {
        classify: '',
        info: '',
        title: '',
        content: '',
        recommend: false
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
            content: this.state.content,
            recommend: this.state.recommend
        };
        fetchPosts('http://localhost:3000/article/writer', 'post', data, 'writer').then(datas => {
            if (datas.code === 0) {
                this.context.router.push(`/article/${datas.articleId}`);
            }
        });
    };
    recommendHandle = () => {
        this.setState((preState) => {
            return {
                recommend: !preState.recommend
            };
        });
    }
    render() {
        return (
            <div className="writer">
                <Header {...this.props} title="记笔记" />
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
                        <div className="recommend">
                            <label htmlFor="yes">推荐</label><input id="yes" onClick={e => { this.recommendHandle(); }} checked={this.state.recommend} name="recommend" type="checkbox" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ ...state }),
    dispatch => ({ actions: bindActionCreators(HomeActions, dispatch) })
)(Write);
