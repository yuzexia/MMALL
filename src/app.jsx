/*
 * @Author: yuze.xia 
 * @Date: 2021-04-01 15:32:05 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-04-03 00:32:11
 */

import React from 'react';
import ReactDOM from 'react-dom';

//引入css
import './index.css';
import './index.less';
// 引入字体图标库
import 'font-awesome/css/font-awesome.min.css'

let style ={
    color: 'red',
    fontSize: '30px'
}

let flag = true;

let jsx = (
    <div className="jsx" style={style}>
        <h1>Hello MMall</h1>
    </div>
);
ReactDOM.render(
    jsx,
    document.getElementById('app')
);