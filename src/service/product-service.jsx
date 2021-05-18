/*
 * @Author: yuze.xia 
 * @Date: 2021-05-10 10:23:05 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-18 16:12:47
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
    // 获取商品详情
    getProduct(productId) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/detail.do',
            data: {
                productId: productId || 0
            }
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

    // 检查商品的表单数据
    checkProduct(productInfo){
        let result = {
            status: true,
            msg: '验证通过'
        }
        // 判断商品名称
        console.log(productInfo.name.length === 0);
        if (typeof productInfo.name !== 'string' || productInfo.name.length === 0) {
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        // 判断商品描述
        if (typeof productInfo.subtitle !== 'string' || productInfo.subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        // 判断商品品类ID
        if (typeof productInfo.categoryId !== 'number' || !(productInfo.categoryId > 0)) {
            return {
                status: false,
                msg: '请选择商品品类！'
            }
        }
        // 判断商品价格
        if (typeof productInfo.price !== 'number' || !(productInfo.price >= 0)) {
            return {
                status: false,
                msg: '请输入正确的价格！'
            }
        }
        // 判断商品库存
        if (typeof productInfo.stock !== 'number' || !(productInfo.stock >= 0)) {
            return {
                status: false,
                msg: '请输入正确的库存！'
            }
        }
        return result;
    }
    // 保存商品
    saveProduct(productInfo) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: productInfo
        })
    }
    /**
     * 品类相关
     */
    // 获取分类别表
    getCategoryList(parentCategoryId) {
        return _mm.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        })
    }

}

export default Product;
