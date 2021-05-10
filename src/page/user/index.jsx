/*
 * @Author: yuze.xia 
 * @Date: 2021-05-08 11:13:38 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-10 14:56:56
 */
import React        from 'react';
import MUtil        from 'util/mm.jsx';
import User         from 'service/user-service.jsx';

import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'util/pagination/index.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm           = new MUtil();
const _user         = new User();

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pageNum         : 1,
            list            : []
        }
    }

    loadUserList() {
        _user.getUserList(this.state.pageNum).then(res => {
            console.log(res);
            this.setState(res)
        }, errMsg => {
            this.setState({
                list: []
            })
            _mm.errorTips(errMsg);
        })
    }
    // 页数发生变化
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        })
    }
    componentDidMount(){
        this.loadUserList();
    }
    render() {
        let tableHeads = ['ID', '用户名', '邮箱', '电话', '注册时间'];
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" />
                <div className="row">
                    <div className="col-md-12">
                        <TableList tableHeads={ tableHeads }>
                            { this.state.list.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{new Date(user.createTime).toLocaleString()}</td>
                                    </tr>
                                )
                            })}
                        </TableList>
                    </div>
                </div>
                <Pagination current={this.state.pageNum} 
                            total={this.state.total} 
                            onChange={ pageNum => { this.onPageNumChange(pageNum) }}/>
            </div>
        )
    }
}

export default UserList;