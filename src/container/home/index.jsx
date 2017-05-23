import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from 'src/redux/action/home';
import { Header, Wrap } from 'src/component';
import fetchPosts from 'src/util/fetch';
import Article from './Article';
import './index.scss';

class Home extends Component {
    componentDidMount() {
        fetchPosts('http://localhost:3000/article', 'post').then(data => {
            console.log(data);
        });
    }
    render() {
        return (
            <div>
                <Header />
                <Wrap>
                    <div className="title">
                        <h2>前端开发学习</h2>
                        <p>前端开发学习</p>
                    </div>
                    <Article />
                </Wrap>
            </div>
        );
    }
}


const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(HomeActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Home);

