import React, { Component } from 'react';

class Index extends Component {
    componentDidMount() {
        this.process();
    }

    process = () => {
        this.animate().then(() => {
            setTimeout(() => {
                this.span.style.opacity = 0;
                this.span.style.width = '0%';
            }, 1000);
        });
    }
    animate = () => {
        return new Promise((resolve, reject) => {
            const _this = this;
            function _animate() {
                setTimeout(() => {
                    const width = parseInt(_this.span.style.width.replace('%', ''), 10);
                    if (width === 100) {
                        resolve();
                    } else {
                        _this.span.style.width = `${width + 1}%`;
                        _animate();
                    }
                }, 5);
            }
            _animate();
        });
    }

    render() {
        return (
            <div>
                <div className="process">
                    <span style={{ width: '0%' }} ref={ref => (this.span = ref)} className="process-inner" />
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default Index;
