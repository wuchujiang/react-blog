import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from 'src/redux/action/home';
import { Header, Wrap } from 'src/component';
import fetchPosts from 'src/util/fetch';
import Article from './Article';
import './index.scss';

class Home extends Component {
    state = {
        article: []
    }
    componentDidMount() {
        fetchPosts('http://localhost:3000/article', 'post').then(data => {
            if (data.code === 0 && data.data.length > 0) {
                this.setState({
                    article: data.data
                });
            }
        });
    }
    render() {
        return (
            <div>
                <Header {...this.props} />
                <Wrap>
                    <div className="title">
                        <h2>前端开发学习</h2>
                        <p>前端开发学习</p>
                    </div>
                    <Article article={this.state.article} />
                </Wrap>
            </div>
        );
    }
}


const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(HomeActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Home);

