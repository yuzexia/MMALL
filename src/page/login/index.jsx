/*
 * @Author: yuze.xia 
 * @Date: 2021-05-07 09:50:55 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-07 16:28:36
 */

import React from 'react';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

import './index.less'

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }

    componentWillMount() {
        document.title = '登录 - MMALL ADMIN';
    }

    // 处理输入框
    onInputChange(e) {
        let inputName   = e.target.name,
            inputValue  = e.target.value;
        this.setState({
            [inputName]: inputValue
        })
    }
    // 登录操作
    onSubmit(e) {
        let loginInfo = {
                username: this.state.username,
                password: this.state.password
            },
            checkResult = _user.checkLoginInfo(loginInfo);
        
        // 验证通过
        if (checkResult.status) {
            _user.login(loginInfo).then((res) => {
                // resolve
                console.log(res)
                console.log(this.state.redirect);
                _mm.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                // reject
                _mm.errorTips(errMsg);
            })
        }
        //验证不通过
        else{
            _mm.errorTips(checkResult.msg);
        }
    }
    
    // 回车登录
    onInputKeyUp(e) {
        if(e.keyCode === 13) {
            this.onSubmit();
        }
    }


    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登陆 - HMMAL管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="email" 
                                    name="username"
                                    className="form-control" 
                                    placeholder="请输入用户名" 
                                    onKeyUp={ e => this.onInputKeyUp(e) }
                                    onChange={ e => this.onInputChange(e) }/>
                            </div>
                            <div className="form-group">
                                <input type="password" 
                                    name="password"
                                    className="form-control" 
                                    placeholder="请输入密码" 
                                    onKeyUp={ e => this.onInputKeyUp(e) }
                                    onChange={ e => this.onInputChange(e) }/>
                            </div>
                            <button
                             className="btn btn-lg btn-primary btn-block"
                             onClick={e => this.onSubmit(e)}>登陆</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
