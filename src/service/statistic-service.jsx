/*
 * @Author: yuze.xia 
 * @Date: 2021-05-08 10:26:54 
 * @Last Modified by: yuze.xia
 * @Last Modified time: 2021-05-08 10:32:51
 */

import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Statistic{
    getHomeCount() {
        return _mm.request({
            url: '/manage/statistic/base_count.do'
        })
    }
}

export default Statistic;
