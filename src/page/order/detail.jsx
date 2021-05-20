/*
 * @Author: yuze.xia 
 * @Date: 2021-05-20 14:59:11 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-20 16:59:14
 */
import React from 'react';

import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new MUtil();
const _order = new Order();

import './detail.less';

class OrderDetail extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            orderNo: this.props.match.params.orderNo,
            dataInfo: {}
        }
    }
    // 获取订单详情
    loadOrderNumberDetail() {
        _order.getOrderNumberDetail(this.state.orderNo).then(res => {
            console.log(':::::', res);
            this.setState({
                dataInfo: res
            })
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        })
    }
    // 发货操作
    onSendGoods(){
        if(window.confirm('是否确认该订单已经发货')) {
            _order.sendGoods(this.state.orderNo).then(res => {
                _mm.successTips(res);
                this.loadOrderNumberDetail();
            }, errMsg =>{
                _mm.errorTips(errMsg);
            })
        }
    }
    componentDidMount(){
        this.loadOrderNumberDetail()
    }
    render() {
        let receiverInfo = this.state.dataInfo.shippingVo || {},
            orderItemVoList = this.state.dataInfo.orderItemVoList || [],
            tableHeads = [
                {name: '商品图片', width: '10%'},
                {name: '商品信息', width: '45%'},
                {name: '单价', width: '15%'},
                {name: '数量', width: '15%'},
                {name: '合计', width: '15%'}
            ]
        return(
            <div id="page-wrapper">
                <PageTitle title="订单详情"/>
                <div className="row">
                    <div className="clo-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">订单号</label>
                                <div className="col-md-10 col-md-5">
                                    <p className="form-control-static">{this.state.dataInfo.orderNo}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">创建时间</label>
                                <div className="col-md-10 col-md-5">
                                    <p className="form-control-static">{this.state.dataInfo.createTime}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">收件人</label>
                                <div className="col-md-10 col-md-5">
                                    <p className="form-control-static">
                                        {receiverInfo.receiverName}，
                                        {receiverInfo.receiverProvince}
                                        {receiverInfo.receiverCity}
                                        {receiverInfo.receiverAddress}，
                                        {receiverInfo.receiverMobile || receiverInfo.receiverPhone}，
                                        {receiverInfo.receiverZip}
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">订单状态</label>
                                <div className="col-md-10 col-md-5">
                                    <p className="form-control-static">
                                        {this.state.dataInfo.statusDesc}
                                        {
                                            this.state.dataInfo.status === 20
                                            ? <button className="btn btn-primary btn-sm btn-send-goods"
                                                    onClick={(e) => this.onSendGoods(e)}
                                                >立即发货</button>
                                            : null
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">支付方式</label>
                                <div className="col-md-10 col-md-5">
                                    <p className="form-control-static">{this.state.dataInfo.paymentTypeDesc}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">订单金额</label>
                                <div className="col-md-10 col-md-5">
                                    <p className="form-control-static">￥{this.state.dataInfo.payment}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品列表</label>
                                <div className="col-md-10">
                                    <TableList tableHeads={tableHeads}>
                                        {
                                            orderItemVoList.map((order, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img className="detail-img" src={`${this.state.dataInfo.imageHost}${order.productImage}`} alt={order.productName} />
                                                        </td>
                                                        <td>{order.productName}</td>
                                                        <td>{order.currentUnitPrice}</td>
                                                        <td>{order.quantity}</td>
                                                        <td>{order.totalPrice}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </TableList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetail;
