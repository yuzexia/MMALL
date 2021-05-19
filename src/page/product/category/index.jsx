/*
 * @Author: yuze.xia 
 * @Date: 2021-05-10 09:54:14 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-19 16:28:10
 */
import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryList extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        }
    }
    // 获取品类列表
    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list: res
            })
        }, errMsg => {
            _mm.errorTips(errMsg);
        })
    }
    // 修改品类名称
    onUpdateName(categoryId, categoryName){
        let newName = window.prompt('请输入新的品类名称', categoryName)
        if(newName !== categoryName) {
            _product.setCategoryName({
                categoryId      : categoryId,
                categoryName    : newName
            }).then(res => {
                _mm.successTips(res)
                this.loadCategoryList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            })
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    // 组件更新生命周期
    componentDidUpdate(prevProps, prevState) {
        console.log("object", prevProps, prevState);
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId;
        
        if(oldPath !== newPath) {
            this.setState({
                parentCategoryId: newId
            },() => {
                this.loadCategoryList();
            })
        }
    }
    render() {
        let tableHeads = ['品类ID', '品类名称', '操作'];
        let tableBody = this.state.list.map((category, index) => {
                            return (
                                <tr key={index}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <a className="opear"
                                        onClick={(e) => {this.onUpdateName(category.id, category.name)}}
                                        >修改名称</a>
                                        {
                                            category.parentId === 0 
                                            ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                                            : null
                                        }
                                    </td>
                                </tr>
                            )
                        })
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID：{this.state.parentCategoryId}</p>
                    </div>
                </div>
                <div className="col-md-12">
                    <TableList tableHeads={tableHeads}>
                        {tableBody}
                    </TableList>
                </div>
            </div>
        )
    }
}

export default CategoryList;
