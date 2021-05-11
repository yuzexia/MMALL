/*
 * @Author: yuze.xia 
 * @Date: 2021-05-10 10:23:05 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-10 14:54:52
 */
import MUtil from 'util/mm.jsx';

let _mm = new MUtil();

class Product {
    // 获取商品列表
    getProductList(listParam) {
        let url = '',
            data ={};

        if (listParam.listType === 'list') {
            url = '/manage/product/list.do'
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'search') {
            url = '/manage/product/search.do'
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.searchKeyword;
        }

        return _mm.request({
            type: 'post',
            url: url,
            data: data
        })
    }
    // 操作商品上下架
    setProductStatus(productInfo) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        })
    }
}

export default Product;