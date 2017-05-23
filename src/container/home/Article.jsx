import React, { Component } from 'react';
import { Link } from 'react-router';

class Article extends Component {

    render() {
        const { article } = this.props;
        return (
            <div className="article">
                {
                    article.length > 0 && article.map((item, index) => {
                        return (
                            <div className="article-item" key={item.articleId}>
                                <p className="article-date">{item.createDate}</p>
                                <h4>{item.title}</h4>
                                <p className="article-excerpt">{item.abstract.html}</p>
                                <Link to={`/article/${item.articleId}`}>阅读详情→</Link>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Article;
