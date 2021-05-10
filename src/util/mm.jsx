/*
 * @Author: yuze.xia 
 * @Date: 2021-05-02 15:15:33 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-10 14:46:36
 */
class MUtil{
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type    : param.type        || 'get',
                url     : param.url         || '',
                dataType: param.dataType    || 'json',
                data    : param.data        || null,
                success : res => {
                    console.log(res);
                    if (res.status == 0) {
                        // 
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    } else if (res.status == 10) {
                        // 未登录
                        this.doLogin();
                    } else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error   : (err) => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            })
        })
    }
    // 跳转登陆
    doLogin() {
        window.location.href = '/login?redirect' + encodeURIComponent(window.location.pathname);
    }
    // 获取参数
    getUrlParam(name) {
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            result      = queryString.match(reg);
        
        return result ? decodeURIComponent(result[2]) : null

    }
    // 成功提示
    successTips(successMsg) {
        alert(successMsg || '更改成功！')
    }
    // 错误提示
    errorTips(errMsg) {
        alert(errMsg || '好像哪里不对~');
    }
    // 本地存储的处理
    // 设置本地存储
    setStorage(name, data) {
        let dataType = typeof data;

        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data))
        } else if (['string', 'number', 'boolean'].indexOf(dataType)) {
            window.localStorage.setItem(name, data)
        } else {
            this.errorTips('该数据类型不能用于本地存储')
        }
    }
    // 取出本地存储
    getStorage(name) {
        let data = window.localStorage.getItem(name);

        if(data){
            return JSON.parse(data);
        } else {
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil;