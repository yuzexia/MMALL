/*
 * @Author: yuze.xia 
 * @Date: 2021-05-10 09:54:01 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-11 15:27:34
 */
import React from 'react';
import {Link} from 'react-router-dom';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';    

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';
import ListSearch from './index-list-search.jsx';

import './index.less';

let _mm         = new MUtil();
let _product    = new Product();

class ProductList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageNum         : 1,
            list            : [],
            listType        : 'list',
            searchType      : '',
            searchKeyword   : ''
        }
    }
    // 获取商品列表
    loadProductList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        
        // 如果是搜索的话，需要传入searchType,searchKeyword参数
        if(this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.searchKeyword = this.state.searchKeyword;
        }
        _product.getProductList(listParam).then(res => {
            this.setState(res, () => {
                console.log('回调');
            })
        }, errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg);
        })
    }
    // 切换页面
    onPageNumChange(pageNum) {
        this.setState({
            pageNum         : pageNum
        }, () => {
            this.loadProductList();
        })
    }
    // 操作上下架按钮
    onSetProductStatus(e, productId, currentStatus) {
        console.log(e, productId, currentStatus);
        let newStatus = currentStatus == 1 ? 2 : 1;
        _product.setProductStatus({
            productId: productId,
            status: newStatus
        }).then(res => {
            console.log(res);
            _mm.successTips(res);
            // 更改成功之后重新请求数据，更新状态
            this.loadProductList();
        }, errMsg => {
            _mm.errorTips(errMsg)
        })
    }
    // 搜索事件
    onSearch(searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            pageNum         : 1,
            listType        : listType,
            searchType      : searchType,
            searchKeyword   : searchKeyword
        }, () => {
            this.loadProductList();
        })
    }
    componentDidMount() {
        this.loadProductList();
    }
    render(){
        let tableHeads = [
            {name: '商品ID', width: '10%'},
            {name: '商品信息', width: '50%'},
            {name: '价格(元)', width: '10%'},
            {name: '状态', width: '15%'},
            {name: '操作', width: '15%'}
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={ (searchType, searchKeyword) => this.onSearch(searchType, searchKeyword)}/>
                <div className="col-md-12">
                    <TableList tableHeads={ tableHeads }>
                        {
                            this.state.list.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>
                                            <p>{product.name}</p>
                                            <p>{product.subtitle}</p>
                                        </td>
                                        <td>{product.price}</td>
                                        <td>
                                            <p>{product.status == 1 ? '在售' : '已下架'}</p>
                                            <button className="btn btn-warning btn-xs"
                                                    onClick={(e) => this.onSetProductStatus(e, product.id, product.status)}>
                                                {product.status == 1 ? '下架' : '上架'}
                                            </button>
                                        </td>
                                        <td>
                                            <Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
                                            <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>    
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </TableList>
                    <Pagination 
                        current={this.state.pageNum}
                        total={this.state.total}
                        onChange={pageNum => {this.onPageNumChange(pageNum)}}
                    />
                </div>
            </div>
        )
    }
}

export default ProductList;
