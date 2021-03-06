/*
 * @Author: yuze.xia 
 * @Date: 2021-05-07 14:30:04 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-08 14:40:30
 */
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class User{
    // 登录
    login(loginInfo) {
        return _mm.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        })
    }
    // 校验用户名密码
    checkLoginInfo(loginInfo) {
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);

        if(typeof username !== 'string' || username.length === 0) {
            return {
                status: false,
                msg: '用户名不能为空'
            }
        }
        if(typeof password !== 'string' || password.length === 0) {
            return {
                status: false,
                msg: '密码不能为空'
            }
        }
        
        return {
            status: true,
            msg: '验证通过'
        }
    }
    // 退出登录
    logout() {
        return _mm.request({
            type: 'post',
            url: '/user/logout.do'
        })
    }
    // 用户列表
    getUserList(pageNum) {
        return _mm.request({
            type: 'post',
            url: '/manage/user/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }
}

export default User;
