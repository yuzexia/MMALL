/*
 * @Author: yuze.xia 
 * @Date: 2021-05-07 09:50:55 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-07 11:14:04
 */

import React from 'react';

import './index.less'

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passworld: ''
        }
    }
    // 处理用户名输入框
    onUsernameChange(e) {
        console.log('username:::', e.target.value)
        this.setState({
            username: e.target.value
        })
    }
    // 处理密码输入框
    onPassworldChange(e) {
        console.log('passworld:::', e.target.value);
        this.setState({
            passworld: e.target.value
        })
    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登陆 - HMMAL管理系统</div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <input type="email" 
                                    className="form-control" 
                                    placeholder="请输入用户名" 
                                    onChange={ e => this.onUsernameChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                    className="form-control" 
                                    placeholder="请输入密码" 
                                    onChange={e => this.onPassworldChange(e)}/>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">登陆</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
