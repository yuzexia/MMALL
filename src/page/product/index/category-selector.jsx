/*
 * @Author: yuze.xia 
 * @Date: 2021-05-12 13:57:20 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-12 16:49:05
 */
import React from 'react';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import './category-selector.less';

const _mm       = new MUtil();
const _product = new Product();

class CategorySelector extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            firstCategoryList   : [],
            firstCategoryId     : 0,
            secondCategoryList  : [],
            secondCategoryId    : 0
        }
    }

    // 获取一级品类
    loadFirstCategory() {
        _product.getCategoryList().then((res) => {
            this.setState({
                firstCategoryList: res
            })
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        })
    }
    // 获取二级品类
    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then((res) => {
            this.setState({
                secondCategoryList: res
            })
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        })
    }
    // 选择一级品类
    onFirstCategoryChange(e) {
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId     : newValue,
            secondCategoryList  : [],
            secondCategoryId    : 0
        }, () => {
            // 更新二级品类
            this.loadSecondCategory();
            this.onPropsCategoryChange()
        })
    }
    // 选择二级品类
    onSecondCategoryChange(e) {
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue
        }, () => {
            this.onPropsCategoryChange();
        })
    }
    // 选中的数据传递给父组件
    onPropsCategoryChange() {
        
        let categoryChangeable = typeof this.props.onCategoryChange === 'function';

        // 如果有二级品类
        if (this.state.secondCategoryId) {
            categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        } 
        // 如果只有一级品类
        else {
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }
    componentDidMount() {
        this.loadFirstCategory();
    }

    render(){
        return(
            <div className="col-md-10">
                <select name="firstCategory" 
                        className="form-control cate-select"
                        onChange={(e) => {this.onFirstCategoryChange(e)}}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category, index) => {
                            return <option key={index} value={category.id}>{category.name}</option>
                        })
                    }
                </select>
                {
                    this.state.secondCategoryList.length ?
                        (<select name="secondCategory"
                                className="form-control cate-select"
                                onChange={(e) => {this.onSecondCategoryChange(e)}}>
                            <option value="">请选择二级分类</option>
                            {
                                this.state.secondCategoryList.map((category, index) => {
                                    return <option key={index} value={category.id}>{category.name}</option>
                                })
                            }
                        </select>) : null
                }
            </div>
        )
    }
}

export default CategorySelector
