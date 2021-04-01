/*
 * @Author: yuze.xia 
 * @Date: 2021-04-01 15:32:05 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-04-01 20:44:25
 */

import React from 'react';
import ReactDOM from 'react-dom';

//引入css
import './index.css';
import './index.less';
// 引入字体图标库
import 'font-awesome/css/font-awesome.min.css'

ReactDOM.render(
    <div>
        {/* <i className="fa fa-address-book"></i> */}
        <h1>
            Hello, World!
            hello, React
        </h1>
    </div>,
    document.getElementById('app')
);