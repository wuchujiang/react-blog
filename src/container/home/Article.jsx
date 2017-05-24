import React, { Component } from 'react';
import { Link } from 'react-router';
import className from 'classnames';

class Article extends Component {

    render() {
        const { article } = this.props;
        return (
            <div className="article">
                {
                    article.length > 0 && article.map((item, index) => {
                        return (
                            <div className={className('article-item', { recommend: item.recommend })} key={item.articleId}>
                                <p className="article-date">{item.createDate}</p>
                                <h2>{item.title}</h2>
                                <p className="article-excerpt">{item.abstract}...</p>
                                <Link className="read-more" to={`/article/${item.articleId}`}>{`${'阅读详情 >'}`}</Link>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Article;
