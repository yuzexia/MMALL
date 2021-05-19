/*
 * @Author: yuze.xia 
 * @Date: 2021-05-11 13:54:08 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-19 11:24:15
 */
import React from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';


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
                res.defaultDetail = res.detail;
                this.setState(res)
            }, errMsg => {
                _mm.errorTips(errMsg);
            })
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
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-10 col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品分类</label>
                        <CategorySelector 
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => {this.onCategoryChange(categoryId, parentCategoryId)}}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="text" className="form-control"
                                    aria-describedby="basic-addon2"
                                    value={this.state.price}
                                    readOnly
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
                                    aria-describedby="basic-addon2" 
                                    value={this.state.stock}
                                    readOnly/>
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
                                        </div>
                                    )
                                })
                                : (<div>暂无图片</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default ProductSave;
