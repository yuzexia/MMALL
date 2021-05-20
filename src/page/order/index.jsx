/*
 * @Author: yuze.xia 
 * @Date: 2021-05-20 09:38:16 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-20 16:37:02
 */
import React from 'react';
import {Link} from 'react-router-dom';

import Order from 'service/order-service.jsx';
import MUtil from 'util/mm.jsx';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import OrderSearch from './order-list-search.jsx';

const _order = new Order();
const _mm = new MUtil();

class OrderList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list',
            searchType: '',
            searchKeyword: ''
        }
    }
    //获取订单列表
    loadOrderList() {
        let params = {}
        
        params.type = this.state.listType;
        params.pageNum = this.state.pageNum;

        if(this.state.listType === 'search') {
            params.searchType = this.state.searchType;
            params.searchKeyword = this.state.searchKeyword;
        }
        _order.getOrderList(params).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg);
        })
    }
    // 当分页发生变化时
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList();
        })
    }
    // 搜索
    onSearch(searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            pageNum: 1,
            listType: listType,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadOrderList();
        })
    }
    componentDidMount() {
        this.loadOrderList();
    }
    render() {
        let tableHeads = [
            {name: '订单号', width: '20%'},
            {name: '收件人', width: '10%'},
            {name: '订单状态', width: '20%'},
            {name: '订单总价（元）', width: '20%'},
            {name: '创建时间', width: '20%'},
            {name: '操作', width: '10%'}
        ]
        return(
            <div id="page-wrapper">
                <PageTitle title="订单列表"/>
                <OrderSearch onSearch={(searchType, searchKeyword) => this.onSearch(searchType, searchKeyword)}/>
                <div className="row">
                    <div className="col-md-12">
                        <TableList tableHeads={tableHeads}>
                            {
                                this.state.list.map((order, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Link className="opear" to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                                            </td>
                                            <td>{order.receiverName}</td>
                                            <td>{order.statusDesc}</td>
                                            <td>￥{order.payment}</td>
                                            <td>{order.createTime}</td>
                                            <td>
                                                <Link className="opear" to={`/order/detail/${order.orderNo}`}>详情</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </TableList>
                    </div>
                </div>
                <Pagination current={this.state.pageNum}
                            total={this.state.total}
                            onChange={(pageNum) => this.onPageNumChange(pageNum)}
                />
            </div>
        )
    }
}

export default OrderList;
