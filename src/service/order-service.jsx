/*
 * @Author: yuze.xia 
 * @Date: 2021-05-20 10:00:04 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-20 16:55:47
 */
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Order {
    /**
     * 
     * 订单列表：/manage/order/list.do @pageNum
     * 订单查询：/manage/order/search.do @orderNo
     */
    // 获取订单列表
    getOrderList(params) {
        let url = '',
            data = {};

        if(params.type === 'list') {
            url = '/manage/order/list.do';
            data.pageNum = params.pageNum
        } 
        else if(params.type === 'search') {
            url = '/manage/order/search.do';
            data[params.searchType] = params.searchKeyword;
        }

        return _mm.request({
            type: 'post', 
            url: url,
            data: data
        })
    }
    // 获取订单详情
    getOrderNumberDetail(orderNo) {
        return _mm.request({
            type: 'post',
            url: '/manage/order/detail.do',
            data: {
                orderNo: orderNo
            }
        })
    }
    // 发货操作
    sendGoods(orderNo) {
        return _mm.request({
            type: 'post',
            url: '/manage/order/send_goods.do',
            data: {
                orderNo: orderNo
            }
        })
    }
}

export default Order;
