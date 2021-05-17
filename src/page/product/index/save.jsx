/*
 * @Author: yuze.xia 
 * @Date: 2021-05-11 13:54:08 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-18 01:52:24
 */
import React from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import FileUploader from 'util/file-upload/index.jsx';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';

import './save.less';

const _mm = new MUtil();

class ProductSave extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryId          : 0,
            parentCategoryId    : 0,
            subImages           : []
        }
    }
    // 品类选择器的变化
    onCategoryChange(categoryId, parentCategoryId) {
        console.log('save::::', categoryId, parentCategoryId);
    }

    // 上传图片成功方法
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res)
        // 上传成功之后将图片插入到subImages中
        this.setState({
            subImages: subImages
        })
        console.log('uploadFilesSuccess::::', this.state);
    }
    // 上传图片失败方法
    onUploadError(errMsg) {
        _mm.errorTips(errMsg);
    }
    // 删除图片操作
    onImageDelete(e) {
        let index       = parseInt(e.target.getAttribute('index')),
            subImages   = this.state.subImages;
        subImages.splice(index, 1)
        this.setState({
            subImages: subImages
        })
    }
    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="新增商品"/>
                <div className="col-md-12">
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-10 col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品名称" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-10 col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品描述" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品分类</label>
                        <CategorySelector onCategoryChange={(categoryId, parentCategoryId) => {this.onCategoryChange(categoryId, parentCategoryId)}}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="价格" aria-describedby="basic-addon2" />
                                <span className="input-group-addon" id="basic-addon2">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="库存" aria-describedby="basic-addon2" />
                                <span className="input-group-addon" id="basic-addon2">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map((image, index) => {
                                    return (
                                        <div className="img-con" key={index}>
                                            <img className="img" src={image.url}/>
                                            <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                                        </div>
                                    )
                                })
                                : (<div>请上传图片</div>)
                            }
                        </div>
                        <div className="col-md-10 col-md-offset-2 file-upload-con">
                            <FileUploader onSuccess={(res) => {this.onUploadSuccess(res)}}
                                        onError={(errMsg) => {this.onUploadError(errMsg)}}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            详情
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                        <button className="btn btn-default">添加</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default ProductSave;
