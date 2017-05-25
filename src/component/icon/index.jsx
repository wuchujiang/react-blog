import React, { Component, PropTypes } from 'react';
import './index.scss';

class Icon extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired
    }
    render() {
        return (
            <svg className={`icon icon-${this.props.type}`} aria-hidden="true">
                <use xlinkHref={`#icon-${this.props.type}`} />
            </svg>
        );
    }
}

export default Icon;
