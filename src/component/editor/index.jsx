import React, { PropTypes, Component } from 'react';
import marked from 'marked';
import cNames from 'classnames';
import Icon from '../icon';
import './index.scss';

export default class MdEditor extends Component {

    state = {
        panelClass: 'md-panel',
        mode: 'split',
        isFullScreen: false,
        result: marked('')
    };

    componentWillUnmount() {
        this.textControl = null;
        this.previewControl = null;
    }
    // public methods
    getValue = () => this.state.content;
    isDirty = () => this._isDirty || false;

    _getToolBar = () => {
        return (
            <ul className="md-toolbar clearfix">
                <li className="tb-btn"><a title="加粗" onClick={this._boldText}><Icon type="bold" /></a></li>{/* bold */}
                <li className="tb-btn"><a title="斜体" onClick={this._italicText}><Icon type="italic" /></a></li>{/* italic */}
                <li className="tb-btn spliter" />
                <li className="tb-btn"><a title="链接" onClick={this._linkText}><Icon type="link" /></a></li>{/* link */}
                <li className="tb-btn"><a title="引用" onClick={this._blockquoteText}><Icon type="quote" /></a></li>{/* blockquote */}
                <li className="tb-btn"><a title="代码段" onClick={this._codeText}><Icon type="code" /></a></li>{/* code */}
                <li className="tb-btn"><a title="图片" onClick={this._pictureText}><Icon type="photo" /></a></li>{/* picture-o */}
                <li className="tb-btn spliter" />
                <li className="tb-btn"><a title="有序列表" onClick={this._listOlText}><Icon type="list_bulleted" /></a></li>{/* list-ol */}
                <li className="tb-btn"><a title="无序列表" onClick={this._listUlText}><Icon type="list_numbered" /></a></li>{/* list-ul */}
                <li className="tb-btn"><a title="标题" onClick={this._headerText}><Icon type="title" /></a></li>{/* header */}
                {this._getExternalBtn()}
            </ul>
        );
    };

    _getExternalBtn = () => {
        return React.Children.map(this.props.children, (option) => {
            return option.type === 'option' ? <li className="tb-btn"><a {...option.props}>{option.props.children}</a></li> : null;
        });
    };

    _getModeBar = () => {
        const checkActive = (mode) => cNames({ active: this.state.mode === mode });

        return (
            <ul className="md-modebar">
                <li className="tb-btn pull-right">
                <a className={checkActive('preview')} onClick={this._changeMode('preview')} title="预览模式">
                    <Icon type="eye" />
                </a>
                </li> { /* preview mode */ }
                <li className="tb-btn pull-right">
                <a className={checkActive('split')} onClick={this._changeMode('split')} title="分屏模式">
                    <Icon type="sceen" />
                </a>
                </li> { /* split mode */ }
                <li className="tb-btn pull-right">
                <a className={checkActive('edit')} onClick={this._changeMode('edit')} title="编辑模式">
                    <Icon type="edit" />
                </a>
                </li> { /* edit mode */ }
                <li className="tb-btn spliter pull-right" />
                <li className="tb-btn pull-right"><a title="全屏模式" onClick={this._toggleFullScreen}><Icon type="fullscreen" /></a></li> {/* full-screen */}
            </ul>
        );
    };
    // event handlers
    _onChange = (e) => {
        this._isDirty = true; // set dirty
        if (this._ltr) clearTimeout(this._ltr);

        this._ltr = setTimeout(() => {
            this.setState({ result: marked(this.textControl.value) }); // change state
            this.props.changeContent(this.textControl.value);
        }, 300);
    };
    _changeMode = (mode) => {
        return (e) => {
            this.setState({ mode });
        };
    };
    _toggleFullScreen = (e) => {
        this.setState({ isFullScreen: !this.state.isFullScreen });
    };
    // default text processors
    _preInputText = (text, preStart, preEnd) => {
        const start = this.textControl.selectionStart;
        const end = this.textControl.selectionEnd;
        const origin = this.textControl.value;

        if (start !== end) {
            const exist = origin.slice(start, end);
            text = text.slice(0, preStart) + exist + text.slice(preEnd);
            preEnd = preStart + exist.length;
        }
        this.textControl.value = origin.slice(0, start) + text + origin.slice(end);
        // pre-select
        this.textControl.setSelectionRange(start + preStart, start + preEnd);
        this.setState({ result: marked(this.textControl.value) }); // change state
        this.props.changeContent(this.textControl.value);
    };
    _boldText = () => {
        this._preInputText('**加粗文字**', 2, 6);
    };
    _italicText = () => {
        this._preInputText('_斜体文字_', 1, 5);
    };
    _linkText = () => {
        this._preInputText('[链接文本](www.yourlink.com)', 1, 5);
    };
    _blockquoteText = () => {
        this._preInputText('> 引用', 2, 4);
    };
    _codeText = () => {
        this._preInputText('```\ncode block\n```', 4, 14);
    };
    _pictureText = () => {
        this._preInputText('![alt](www.yourlink.com)', 2, 5);
    };
    _listUlText = () => {
        this._preInputText('- 无序列表项0\n- 无序列表项1', 2, 8);
    };
    _listOlText = () => {
        this._preInputText('1. 有序列表项0\n2. 有序列表项1', 3, 9);
    };
    _headerText = () => {
        this._preInputText('## 标题', 3, 5);
    };

    render() {
        const panelClass = cNames(['md-panel', { fullscreen: this.state.isFullScreen }]);
        const editorClass = cNames(['md-editor', { expand: this.state.mode === 'edit' }]);
        const previewClass = cNames(['md-preview', 'markdown', { expand: this.state.mode === 'preview', shrink: this.state.mode === 'edit' }]);
        return (
            <div className={panelClass}>
                <div className="md-menubar">
                {this._getModeBar()}
                {this._getToolBar()}
                </div>
                <div className={editorClass}>
                    <textarea ref={ref => (this.textControl = ref)} name="content" onChange={this._onChange} />{/* style={{height: this.state.editorHeight + 'px'}} */}
                </div>
                <div
                  className={previewClass}
                  ref={ref => (this.previewControl = ref)}
                  dangerouslySetInnerHTML={{ __html: this.state.result }}
                />
                <div className="md-spliter" />
            </div>
        );
    }
}
