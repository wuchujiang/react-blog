import React, { Component } from 'react';
import './index.scss';

class Wrap extends Component {
    render() {
        return (
            <div style={this.props.style} className="wrap">{ this.props.children }</div>
        );
    }
}

export default Wrap;

