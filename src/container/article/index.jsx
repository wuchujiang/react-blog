import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from 'src/redux/action/home';
import fetchPosts from 'src/util/fetch';
import { Link } from 'react-router';
import { Header, Wrap } from 'src/component';
import './github-markdown.css';
import './index.scss';

class Article extends Component {
    state = {
        article: {}
    }
    componentDidMount() {
        fetchPosts(`http://localhost:3000/article/blog/${this.props.params.id}`, 'post').then(data => {
            if (data.code === 0) {
                this.setState({
                    article: data.data
                });
            }
        });
    }
    render() {
        const { article } = this.state;
        return (
            <div className="article-content">
                <Header {...this.props} title="文章" />
                <Wrap style={{ maxWidth: '768px' }}>
                    <p className="article-info"><Link to={`/author/${article.anthor}`}>{article.anthor}</Link><span className="article-date">{article.createDate}</span></p>
                    <h2 className="article-title">{article.title}</h2>
                    <p className="words">本文约{article.words}字，阅读预计花费{Math.ceil(article.words / 300)}分钟</p>
                    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: article.content }} />
                </Wrap>
            </div>
        );
    }
}

export default connect(
    state => ({ ...state }),
    dispatch => ({ actions: bindActionCreators(HomeActions, dispatch) })
)(Article);
