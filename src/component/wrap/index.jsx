import React, { Component } from 'react';
import './index.scss';

class Wrap extends Component {
    render() {
        return (
            <div className="wrap">{ this.props.children }</div>
        );
    }
}

export default Wrap;

