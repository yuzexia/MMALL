/*
 * @Author: yuze.xia 
 * @Date: 2021-05-19 16:50:49 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-19 16:53:05
 */
import React from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryAdd extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            categoryList: [],
            parentId: 0,
            categoryName: ''
        }
    }
    // 获取品类列表
    loadCategoryList() {
        _product.getCategoryList().then(res => {
            console.log(res);
            this.setState({
                categoryList: res
            })
        }, errMsg => {
            _mm.errorTips(errMsg);
        })
    }
    // 处理简单表单
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value;
        console.log("object:::", name, value);
        this.setState({
            [name]: value
        })
    }
    // 提交表单
    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        if (categoryName) {
            _product.addCategory({
                parentId: this.state.parentId,
                categoryName: this.state.categoryName
            }).then(res => {
                _mm.successTips(res);
                this.props.history.push('/product-category/index');
            }, errMsg => {
                _mm.errorTips(errMsg);
            })
        }
        // 品类名称为空时
        else {
            _mm.errorTips('品类名称不能为空！')
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加品类"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-10 col-md-5">
                                    <select name="parentId" 
                                        className="form-control"
                                        onChange={(e) => this.onValueChange(e)}>
                                        <option value="0">根品类/</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option value={category.id} key={index}>根品类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-10 col-md-5">
                                    <input type="text" className="form-control" 
                                        name="categoryName"
                                        onChange={e => this.onValueChange(e)}
                                        placeholder="请输入品类名称" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button className="btn btn-default btn-primary" onClick={e => this.onSubmit(e)}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryAdd;
