/*
 * @Author: yuze.xia 
 * @Date: 2021-05-10 17:44:02 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-10 18:24:10
 */
import React from 'react';

class ListSearch extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchType: 'productId', //productId, productName
            searchKeyword: ''
        }
    }
    // 输入框改变事件
    onValueChange(e) {
        let name    = e.target.name,
            value   = e.target.value.trim();
        this.setState({
            [name]: value
        })
        console.log('object', this.state);
    }

    // 点击搜索按钮
    onSearch(e) {
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
    }

    render() {
        return (
            <div className="form-inline col-md-12 search-wrap">
                <div className="form-group">
                    <select className="form-control"
                            name="searchType"
                            onChange={(e) => { this.onValueChange(e) }}>
                        <option value="productId">通过商品ID查询</option>
                        <option value="productName">通过商品名称查询</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="password" 
                            className="form-control" 
                            placeholder="关键词"
                            name="searchKeyword"
                            onChange={(e) => { this.onValueChange(e) }}/>
                </div>
                <button className="btn btn-primary"
                        onClick={(e) => { this.onSearch(e) }}>搜索</button>
            </div>
        )
    }
}

export default ListSearch
