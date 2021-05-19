/*
 * @Author: yuze.xia 
 * @Date: 2021-05-18 10:16:47 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-19 10:30:44
 */
import React from 'react';
import Simditor from 'simditor';

import 'simditor/styles/simditor.css';
import './index.less';

// 通用富文本编辑器，依赖于JQuery
class RichEditor extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadEditor();
    }
    componentWillReceiveProps(nextProps){
        let detailChange = this.props.defaultDetail !== nextProps.defaultDetail;

        if(!detailChange) {
            return ;
        }
        this.simditor.setValue(nextProps.defaultDetail);
    }
    loadEditor() {
        let element = this.refs['textarea'];
        this.simditor = new Simditor ({
            textarea: $(element),
            defaultValue: this.props.placeholder || '请输入内容',
            upload: {
                url             : '/manage/product/richtext_img_upload.do',
                defaultImage    : '',
                fileKey         : 'upload_file'
            }
        })
        this.bindEditorEvent();
    }
    // 初始化富文本编辑器的事件
    bindEditorEvent(){
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue())
        })
    }

    render() {
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}

export default RichEditor
