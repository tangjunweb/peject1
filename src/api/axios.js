import axios from 'axios'
import qs from 'qs'
import { Message } from 'iview'
// import Cookies from 'js-cookie'
/**
 * axios config
 */
axios.defaults.baseURL = API_PATH;
axios.defaults.timeout = 30000;
axios.interceptors.request.use(function(request) {
    return request;
})
axios.interceptors.response.use(async function(response) {
    return response;
}, function(error) {
    return Promise.reject(error.response);
})
axios.defaults.headers = {
    'Content-Type': 'application/json-patch+json'
}
axios.defaults.withCredentials = true;
export const CallBack = {};
async function ajax({ url, type = 'get', param = null }) {
    // console.log(JSON.stringify(param))
    try {
        let get = async function() {
            let res;
            if (!param) {
                res = await axios[type](url);
            } else {
                switch (type) {
                    case 'get':
                        res = await axios[type](url, {
                            params: param,
                            paramsSerializer: params => {
                                return qs.stringify(params, { indices: false })
                            }
                        });
                        break;
                    case 'post':
                        res = await axios[type](url, param, {
                            indices: false
                        });
                        break;
                    case 'put':
                        res = await axios[type](url, param, {
                            indices: false
                        });
                        break;
                    case 'delete':
                        res = await axios[type](url, {
                            params: param,
                            paramsSerializer: params => {
                                return qs.stringify(params, { indices: false })
                            }
                        });
                        break;
                }
            }
            return res;
        }
        let res = await get();
        return res.data.result;
    } catch (res) {
        switch (res.status) {
            case 401:
                if (CallBack.unauthorized) {
                    CallBack.unauthorized(res);
                }
                throw new Error(res)
                break;
            default:
                Message.destroy();
                Message.error({
                    content: res.data.error ? res.data.error.details || res.data.error.message : res.statusText
                })
                return Promise.reject(res);
                break;
        }
    }
}
class Http {
    static get(url, param) {
        return ajax({
            url,
            param
        });
    }
    static post(url, param) {
        return ajax({
            url,
            param,
            type: 'post'
        })
    }
    static del(url, param) {
        return ajax({
            url,
            param,
            type: 'delete'
        })
    }
    static put(url, param) {
        return ajax({
            url,
            param,
            type: 'put'
        })
    }
    static ajax(type = 'get', url, param) {
        return ajax({
            type,
            url,
            param
        })
    }
    static setOption(key, value) {
        axios.defaults.headers[key] = value;
    }
}
export default Http;