/*
 * @Author: yuze.xia 
 * @Date: 2021-05-11 13:54:08 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-18 17:25:42
 */
import React from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import FileUploader from 'util/file-upload/index.jsx';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import RichEditor from 'util/rich-editor/index.jsx';


import './save.less';

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id                  : this.props.match.params.pid,
            name                : '',
            subtitle            : '',
            categoryId          : 0,
            parentCategoryId    : 0,
            subImages           : [],
            detail              : '',
            price               : '',
            stock               : '',
            status              : 1 //商品状态1为在售
        }
    }

    componentDidMount() {
        this.loadProduct();
    }
    // 加载商品详情
    loadProduct() {
        // 有id的时候，表示是编辑功能，需要表单回填
        if(this.state.id) {
            _product.getProduct(this.state.id).then(res => {
                let subImages = res.subImages ? res.subImages.split(',') : [];
                res.subImages = subImages.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                })
                this.setState(res, () => {
                    console.log('::::::', this.state);
                })
            }, errMsg => {
                _mm.errorTips(errMsg);
            })
        }
    }
    // 处理普通输入框 商品名称，描述，价格，库存
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();

        this.setState({
            [name]: value
        })
    }
    // 品类选择器的变化
    onCategoryChange(categoryId, parentCategoryId) {
        this.setState({
            categoryId          : categoryId,
            parentCategoryId    : parentCategoryId
        })
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
    // 富文本框变化时操作
    onDetailValueChange(value) {
        console.log('onDetailValueChange:::', value);
        this.setState({
            detail: value
        })
    }
    // 将图片数组处理为","分割的字符串
    getSubImagesString() {
        return this.state.subImages.map((image, index) => {
            return image.uri
        }).join(',')
    }
    // 表单提交
    onSubmit(e) {
        let productInfo = {
            name                : this.state.name,
            subtitle            : this.state.subtitle,
            categoryId          : parseInt(this.state.categoryId),
            parentCategoryId    : parseInt(this.state.parentCategoryId),
            subImages           : this.getSubImagesString(),
            detail              : this.state.detail,
            price               : parseFloat(this.state.price),
            stock               : parseInt(this.state.stock),
            status              : 1
        },
        productCheckResult = _product.checkProduct(productInfo);
        // 表单验证成功
        if(productCheckResult.status) {
            _product.saveProduct(productInfo).then(res => {
                _mm.successTips(res);
                this.props.history.push('/product/index');
            }, errMsg => {
                _mm.errorTips(errMsg);
            })
        }
        // 表单验证失败
        else {
            _mm.errorTips(productCheckResult.msg)
        }
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
                            <input type="text" className="form-control" 
                                placeholder="请输入商品名称"
                                name="name"
                                value={this.state.name}
                                onChange={e => this.onValueChange(e)}
                             />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-10 col-md-5">
                            <input type="text" className="form-control" 
                                name="subtitle"
                                value={this.state.subtitle}
                                onChange={e => this.onValueChange(e)}
                                placeholder="请输入商品描述" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品分类</label>
                        <CategorySelector 
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => {this.onCategoryChange(categoryId, parentCategoryId)}}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="text" className="form-control" 
                                    placeholder="价格" 
                                    aria-describedby="basic-addon2" 
                                    name="price"
                                    value={this.state.price}
                                    onChange={e => this.onValueChange(e)}
                                    />
                                <span className="input-group-addon" id="basic-addon2">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="text" className="form-control" 
                                    placeholder="库存" 
                                    aria-describedby="basic-addon2" 
                                    name="stock"
                                    value={this.state.stock}
                                    onChange={e => this.onValueChange(e)}/>
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
                            <RichEditor 
                                detail={this.state.detail}
                                onValueChange={(value) => this.onDetailValueChange(value)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                        <button className="btn btn-default" onClick={e => this.onSubmit(e)}>添加</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default ProductSave;
