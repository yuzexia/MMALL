/*
 * @Author: yuze.xia 
 * @Date: 2021-05-07 09:50:55 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-07 11:31:53
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
    // 处理输入框
    onInputChange(e) {
        let inputName   = e.target.name,
            inputValue  = e.target.value;
        console.log(inputName, inputValue);
        this.setState({
            [inputName]: inputValue
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
                                    name="username"
                                    className="form-control" 
                                    placeholder="请输入用户名" 
                                    onChange={ e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                    name="passworld"
                                    className="form-control" 
                                    placeholder="请输入密码" 
                                    onChange={e => this.onInputChange(e)}/>
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
