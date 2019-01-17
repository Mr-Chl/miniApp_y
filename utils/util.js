import {
    BASE_URL
} from '../config/config.js' // 接口域名   图片域名
// 格式化时间 parseTime( new Date()/毫秒数/秒数, (转化格式){y}/{m}/{d} {h}:{i}:{s} );
const parseTime = (time, cFormat) => {
    if (!time) return '';
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000;
        date = new Date(time);
    }
    // 大写代表00，小写代表0
    const formatObj = {
        y: date.getFullYear(),
        yy: date.getFullYear().toString().slice(2),
        m: date.getMonth() + 1,
        M: date.getMonth() + 1,
        d: date.getDate(),
        D: date.getDate(),
        h: date.getHours(),
        H: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const timeStr = format.replace(/{(yy|y|m|M|d|D|h|H|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return ['日','一', '二', '三', '四', '五', '六'][value];
        if (result.length > 0 && value < 10) {
            switch (key) {
                case 'M':
                case 'D':
                case 'H':
                case 'i':
                case 's':
                    value = '0' + value;
                    break;
            }
        }
        return value || 0;
    });
    return timeStr;
};

// 请求方法
const wxTools = {
    _get: function(url, data, success, fail) {
      let token = wx.getStorageSync("token"); 
        wx.request({
            url: BASE_URL + url,
            data: {
              token:token,
              ...data},
            success: function(res) {
                success && success(res);
            },
            fail: function(err) {
                fail && fail(err);
            }
        });
    },

    _post: function(url, data, success, fail) {
      let token = wx.getStorageSync("token"); 
        wx.request({
            url: BASE_URL + url,
            method: 'POST',
            data: Object.assign({ token: token }, data),
            success: function(res) {
                success && success(res);
            },
            fail: function(err) {
                fail && fail(err);
            }
        });
    },
};


export {
    parseTime,
    wxTools
}