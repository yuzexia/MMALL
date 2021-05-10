/*
 * @Author: yuze.xia 
 * @Date: 2021-05-10 11:22:18 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-10 14:45:46
 */
import React from 'react';

class TableList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoading : true
        }
    }

    componentWillReceiveProps(){
        // 列表只有在第一次挂载的时候，isFirstLoading为true，其他情况为false
        this.setState({
            isFirstLoading : false
        })
    }
    render(){
        // 表头信息
        let tableHeader = this.props.tableHeads.map(
                (tableHead, index) => {
                    if (typeof tableHead === 'object') {
                        return <th key={index} width={tableHead.width}>{tableHead.name}</th>
                    } else if(typeof tableHead === 'string') {
                        return <th key={index}>{tableHead}</th>
                    }
                }
            )
        //列表内容
        let tableInfo = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isFirstLoading ? '数据加载中...' : '没有查询到数据' }
                </td>
            </tr>
        )
        let listBody = this.props.children;

        let tableBody = this.props.children.length > 0 ? listBody : tableInfo;
        
        return (
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        { tableHeader }
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        )
    }
}

export default TableList;
