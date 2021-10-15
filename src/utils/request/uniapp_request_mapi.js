
const baseURL = 'http://101.132.174.237:8075';




export const getData = (url, params) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseURL + url,
            data: params,
            header: {
                tokenType: 2,
            },
            method: 'GET',
            timeout: 30000,
            success: (res) => { resolve(res.data) },
            fail: (err) => { reject(err) }
        });
    })
}
export const postData = (url, params) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseURL + url,
            data: params,
            header: {
                tokenType: 2,
            },
            method: 'POST',
            timeout: 30000,
            success: (res) => { resolve(res.data) },
            fail: (err) => { reject(err) }
        });
    })
}
export const deleteData = (url, params) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseURL + url,
            data: params,
            header: {
                tokenType: 2,
            },
            method: 'DELETE',
            timeout: 30000,
            success: (res) => { resolve(res.data) },
            fail: (err) => { reject(err) }
        });
    })
}
export const putData = (url, params) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseURL + url,
            data: params,
            header: {
                tokenType: 2,
            },
            method: 'PUT',
            timeout: 30000,
            success: (res) => { resolve(res.data) },
            fail: (err) => { reject(err) }
        });
    })
}























