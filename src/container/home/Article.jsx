import React, { Component } from 'react';

class Article extends Component {
    getData = () => {
        const data = {
            title: 'IK分词原理',
            excerpt: 'IKAnalyzer是一个开源的，基于Java语言开发的轻量级的中文分词语言包,基于Java语言开发的轻量级的中文分词语言包, 基于Java语言开发的轻量级的中文分词语言包',
            date: '2017-11-11',
            url: 'www.baidu.com'
        };
        const datas = [];
        for (let i = 0; i < 10; i++) {
            datas.push(data);
        }

        return datas;
    };

    render() {
        return (
            <div className="article">
                {
                    this.getData().map((item, index) => {
                        return (
                            <div className="article-item" key={index++}>
                                <p className="article-date">{item.date}</p>
                                <h4>{item.title}</h4>
                                <p className="article-excerpt">{item.excerpt}</p>
                                <a href={item.url}>阅读详情→</a>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Article;
