import md5 from 'md5'
/**
 * 百度地图
 */
function UseBMap(callback) {
    let script = document.getElementById('bddtscript');
    if (!script) {
        script = document.createElement('script');
        script.src = '//api.map.baidu.com/api?v=2.0&ak=Wab2jsL3GGv5tjdlZ3Getyss&callback=initialize'
        window.initialize = callback;
        document.body.appendChild(script);
    } else {
        callback();
    }
}
/**
 * 地图
 * @param {} callback
 */
function UseMap(callback) {
    // let script = document.getElementById('bddtscript');
    let script = window.AMap;
    if (!script) {
        script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=1.4.10&key=${AMAP_KEY}&callback=initialize`
        window.initialize = function () {
            // let uiscript = document.getElementById('bddtscript-ui');
            let uiscript = window.AMapUI;
            if (!uiscript) {
                uiscript = document.createElement('script');
                uiscript.src = '//webapi.amap.com/ui/1.0/main.js?v=1.0.11';
                document.body.appendChild(uiscript);
                if (uiscript.readyState) {
                    uiscript.onreadystatechange = () => {
                        if (uiscript.readyState === "loaded" || uiscript.readyState === "complete") {
                            uiscript.onreadystatechange = null;
                            resolve('success');
                        }
                    }
                } else {
                    uiscript.onload = () => {
                        callback();
                    }
                }
            } else {
                callback();
            }
        };
        document.body.appendChild(script);
    } else {
        callback();
    }
}
/**
 * 阿里视频播放器
 */
function LoadAiplayer() {
    let script = document.getElementById('aiplayerscript');
    let link = document.getElementById('aiplayercss');
    if (!link) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css';
        document.head.appendChild(link);
    }
    return new Promise((resolve, reject) => {
        let init = () => {
            if (script.readyState) {
                script.onreadystatechange = () => {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve('success');
                    }
                }
            } else {
                script.onload = () => {
                    resolve('success');
                }
            }
        }
        if (!script) {
            script = document.createElement('script');
            script.src = 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js';
            script.type = "text/javascript";
            script.id = 'aiplayerscript';
            init();
            document.body.appendChild(script);

        } else if (!window.Aliplayer) {
            init();
        } else {
            resolve();
        }
    })
}
/**
 * 阿里记忆播放组件
 */
function LoadAiplayerMemory() {
    let script = document.getElementById('aiplayermemoryscript');
    return new Promise((resolve, reject) => {
        let init = () => {
            if (script.readyState) {
                script.onreadystatechange = () => {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve('success');
                    }
                }
            } else {
                script.onload = () => {
                    resolve('success');
                }
            }
        }
        if (!script) {
            script = document.createElement('script');
            script.src = '//player.alicdn.com/aliplayer/presentation/js/aliplayercomponents.min.js';
            script.type = "text/javascript";
            script.id = 'aiplayermemoryscript';
            init();
            document.body.appendChild(script);

        } else if (!window.AliPlayerComponent && !window.AliPlayerComponent.MemoryPlayComponent) {
            init();
        } else {
            resolve();
        }
    })
}

/**
 * 直播播放组件
 */
function LoadAliLivePlayer() {
    let script = document.getElementById('aliliveplayerscript');
    return new Promise((resolve, reject) => {
        let init = () => {
            if (script.readyState) {
                script.onreadystatechange = () => {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve('success');
                    }
                }
            } else {
                script.onload = () => {
                    resolve('success');
                }
            }
        }
        if (!script) {
            script = document.createElement('script');
            script.src = '//resource.cddyjy.com/assets/global/plugins/Lhyj/Sdk/live-broadcast.min.js';
            // script.src = 'http://127.0.0.1:5500/dist/live-broadcast.min.js'
            script.type = "text/javascript";
            script.id = 'aliliveplayerscript';
            init();
            document.body.appendChild(script);

        } else if (!window.LiveBroadcast) {
            init();
        } else {
            resolve();
        }
    })
}

/**
 * 日期转化
 * @param {*} data
 * @param {*} reg
 */
function FormatTimeJson(data, reg = "yyyy-MM-dd") {
    for (let key in data) {
        if (isNaN(data[key]) && !isNaN(Date.parse(data[key]))) {
            data[key] = (new Date(data[key].replace(/\-/g, '/').replace('T', ' '))).Format(reg);
        }
    }
    return data;
}
/**
 * 通过id取名字
 * @param {*} id
 * @param {*} arr
 */
function GetNameById(id, arr) {
    let str = '';
    for (let el of arr) {
        if (el.id === id) {
            str = el.organizationName;
            break;
        } else if (el.children && el.children.length) {
            str = GetNameById(id, el.children);
        }
    }
    return str;
}
/**
 * 通过value取名字
 * @param {*} value
 * @param {*} arr
 */
function GetLableByValue(value, arr) {
    let str = '';
    for (let el of arr) {
        if (el.value === value) {
            str = el.label;
            break;
        } else if (el.children && el.children.length) {
            str = GetLableByValue(value, el.children);
            if (str) {
                break;
            }
        }
    }
    return str;
}
/**
 * 下载文件
 * @param {*} sUrl
 */
function DownloadFile(sUrl) {
    let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    let isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
    if (/(iP)/g.test(navigator.userAgent)) {
        throw new Error('Your device does not support files downloading. Please try again in desktop browser.');
    }
    if (isChrome || isSafari) {
        let link = document.createElement('a');
        link.href = sUrl;
        if (link.download !== undefined) {
            let fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }
        if (document.createEvent) {
            let e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }
    window.open(sUrl, '_self');
    return true;
}
/**
 * 查询URL参数
 * @param {string} name
 */
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
/**
 * 暂停
 * @param {number} time
 */
function Sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}
/**
 * 获取浏览器窗口大小
 * @param {*} target 
 */
function getWindowsSize() {
    let height, width;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        height = document.documentElement.clientHeight;
        width = document.documentElement.clientWidth;
    }
    return {
        height, width
    }
}
/**
 * 判断是否为空对象
 * @param {*} target
 */
function isEmptyObject(target) {
    if (target && JSON.stringify(target) === "{}") {
        return true;
    }
    return false;
}
/**
 * cascader初始化数据
 * @param {string,number} key
 * @param {array} treeData
 */
function getCascaderValue(key, treeData) {
    let arr = []; // 在递归时操作的数组
    let returnArr = []; // 存放结果的数组
    let depth = 0; // 定义全局层级
    // 定义递归函数
    function childrenEach(childrenData, depthN) {
        for (let j = 0; j < childrenData.length; j++) {

            depth = depthN; // 将执行的层级赋值 到 全局层级

            arr[depthN] = (childrenData[j].value);

            if (childrenData[j].value === key) {

                // returnArr = arr; // 原写法不行, 因 此赋值存在指针关系
                returnArr = arr.slice(0, depthN + 1); //将目前匹配的数组，截断并保存到结果数组，
                break

            } else {
                if (childrenData[j].children) {

                    depth++;
                    childrenEach(childrenData[j].children, depth);

                }
            }

        }
        return returnArr;
    }
    return childrenEach(treeData, depth);
}
/**
 * validate code
 */
function buildRandomCode() {
    return md5((new Date()).getTime() + "" + Math.random()).substr(0, 20);
}
/**
 * 分页
 * @param {*} MaxResultCount
 * @param {*} PageIndex
 */
function SkipCount(MaxResultCount, PageIndex) {
    return PageIndex * MaxResultCount - MaxResultCount;
}
function FormatDate(t, reg) {
    if (t) {
        return (new Date(String(t).replace('T', ' ').replace(/\-/g, '/'))).Format(reg);
    }
    return t;
}
function getChartCityData({ level = 'province', subdistrict = 1, extensions = 'base', city = '四川省' }) {
    return new Promise((resolve, reject) => {
        let d = localStorage.getItem(`${PREFIX}_echart_map_data_${city}`);
        if (d) {
            resolve(JSON.parse(d));
            return;
        }
        UseMap(() => {
            AMap.plugin('AMap.DistrictSearch', () => {
                let districtSearch = new AMap.DistrictSearch({
                    level,
                    subdistrict,
                    extensions
                })
                let getCdPolgan = (city) => {
                    return new Promise((resolve, reject) => {
                        let districtSearch2 = new AMap.DistrictSearch({
                            level: 'city',
                            subdistrict: 1,
                            extensions: 'all'
                        })
                        districtSearch2.search(city, (status, result) => {
                            if (status === 'complete') {
                                resolve(result.districtList[0].boundaries);
                            } else {
                                resolve([]);
                            }
                        })
                    })
                }
                let f = (arr) => {
                    return arr.map(e => {
                        if (Object.prototype.toString.call(e) === '[object Object]') {
                            e = [e.lat, e.lng];
                        } else if (Object.prototype.toString.call(e) === '[object Array]') {
                            e = f(e);
                        }
                        return e;
                    })
                }
                districtSearch.search(city, async (status, result) => {
                    if (status === 'complete') {
                        let d = result.districtList[0].districtList;
                        let obj = {
                            type: 'FeatureCollection',
                            features: []
                        };
                        for (let i = 0; i < d.length; i++) {
                            let cd = await getCdPolgan(d[i].name);
                            let arr = f(cd);
                            let obj2 = {
                                type: 'Feature',
                                properties: {
                                    name: d[i].name
                                },
                                geometry: {
                                    type: 'MultiPolygon',
                                    coordinates: [arr]
                                }
                            }
                            obj.features.push(obj2);
                        }
                        localStorage.setItem(`${PREFIX}_echart_map_data_${city}`, JSON.stringify(obj));
                        resolve(obj);
                    } else {
                        resolve({});
                    }
                })
            })
        })
    })
}
function FormatResourceTypeData(arr, parentId = null) {
    let arrs = [];
    if (parentId === null) {
        arrs.push({
            id: null,
            resourceClassPath: null,
            parentId: null,
            className: '全部',
            selected: true
        });
    }
    arr.forEach(e => {
        if (e.parentId === parentId) {
            let obj = JSON.parse(JSON.stringify(e));
            obj.selected = false;
            if (arr.findIndex(e2 => e2.parentId === e.id) !== -1) {
                obj.children = FormatResourceTypeData(arr, e.id);
            }
            arrs.push(obj);
        }
    })
    return arrs;
}
function FormatResourceTypeDataCascader(arr, parentId = null) {
    let arrs = [];
    arr.forEach(e => {
        if (e.parentId === parentId) {
            let obj = JSON.parse(JSON.stringify(e));
            if (arr.findIndex(e2 => e2.parentId === e.id) !== -1) {
                obj.children = FormatResourceTypeDataCascader(arr, e.id);
            }
            arrs.push({
                label: obj.className,
                value: obj.id,
                children: obj.children || []
            });
        }
    })
    return arrs;
}

function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}


function addClass(el, cls) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}


function removeClass(el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

/**
 * 判断是否有权限
 */

function hasAuthority(path, permissions) {
    let isAuthority = false;
    let fn = (str, data) => {
        for (let item of data) {
            if (isAuthority) {
                return
            } else if (item.url == str) {
                isAuthority = true;
            } else if (item.children.length) {
                fn(str, item.children)
            }

        }
    }
    fn(path, permissions);
    return isAuthority
}

/**
 * 时间format
 * @param {*} dateStr
 */

function getDateDiff(dateStr) {
    var publishTime = Date.parse(dateStr) / 1000,
        d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = parseInt(new Date().getTime() / 1000),
        d,

        date = new Date(publishTime * 1000),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    //小于10的在前面补0
    if (M < 10) {
        M = '0' + M;
    }
    if (D < 10) {
        D = '0' + D;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }

    d = timeNow - publishTime;
    d_days = parseInt(d / 86400);
    d_hours = parseInt(d / 3600);
    d_minutes = parseInt(d / 60);
    d_seconds = parseInt(d);

    if (d_days > 0 && d_days < 3) {
        return d_days + '天前';
    } else if (d_days <= 0 && d_hours > 0) {
        return d_hours + '小时前';
    } else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + '分钟前';
    } else if (d_seconds < 60) {
        if (d_seconds <= 0) {
            return '刚刚发表';
        } else {
            return d_seconds + '秒前';
        }
    } else if (d_days >= 3 && d_days < 30) {
        return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
    } else if (d_days >= 30) {
        return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
    }
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

export {
    UseMap,
    UseBMap,
    FormatTimeJson,
    GetLableByValue,
    GetNameById,
    DownloadFile,
    getQueryString,
    Sleep,
    isEmptyObject,
    getCascaderValue,
    buildRandomCode,
    SkipCount,
    LoadAiplayer,
    LoadAiplayerMemory,
    FormatDate,
    getChartCityData,
    FormatResourceTypeData,
    FormatResourceTypeDataCascader,
    hasClass,
    addClass,
    removeClass,
    hasAuthority,
    getDateDiff,
    getWindowsSize,
    LoadAliLivePlayer,
    getNowFormatDate
}
