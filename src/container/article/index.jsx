import React, { Component } from 'react';
import fetchPosts from 'src/util/fetch';
import '../writer/markdown.scss';

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
            <div className="article">
                <p>{article.createDate}</p>
                <h2>{article.title}</h2>
                <div className="markdown" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
        );
    }
}

export default Article;
