/*
 * @Author: yuze.xia 
 * @Date: 2021-05-11 13:54:08 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-12 16:56:13
 */
import React from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import FileUploader from 'util/file-upload/index.jsx';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
class ProductSave extends React.Component{
    constructor(props){
        super(props);
    }

    onCategoryChange(categoryId, parentCategoryId) {
        console.log('save::::', categoryId, parentCategoryId);
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
                            <FileUploader />
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
