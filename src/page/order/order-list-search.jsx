/*
 * @Author: yuze.xia 
 * @Date: 2021-05-20 11:20:11 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-20 14:33:00
 */
import React from 'react';

class OrderSearch extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchType: 'orderNo',
            searchKeyword: ''

        }
    }
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    onSearchkeywordKeyUp(e){
        let keyCode = e.keyCode;
        if(keyCode === 13) {
            this.onSearch();
        }
    }
    onSearch(e){
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
    }
    render(){
        return (
            <div className="form-inline col-md-12 search-wrap">
                <div className="form-group">
                    <select className="form-control"
                            name="searchType"
                            onChange={(e) => { this.onValueChange(e) }}>
                        <option value="orderNo">按订单号查询</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" 
                            className="form-control" 
                            placeholder="订单号"
                            name="searchKeyword"
                            onKeyUp={ (e) => {this.onSearchkeywordKeyUp(e)} }
                            onChange={(e) => { this.onValueChange(e) }}/>
                </div>
                <button className="btn btn-primary"
                        onClick={(e) => { this.onSearch(e) }}>搜索</button>
            </div>
        )
    }
}

export default OrderSearch;
