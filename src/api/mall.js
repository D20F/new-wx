import { getData, postData, deleteData } from '@/utils/request/uniapp_request_mapi.js'

// 商城轮播图
export const getMallBanner = params => getData('/appBanner/app/banner', params)

// 商品分类
export const getProductClassify = params => getData('/productClassify/app/all', params)

// 商品列表
export const getProductPage = params => getData('/product/app/page', params)

// 商品详情
export const getProduct = id => getData('/product/app/' + id)

// 购物车
export const myCart = params => getData('/shoppingCart/app/myCart', params)

// 加入购物车
export const addCart = params => postData('/shoppingCart/app/addCart', params)

// 删除购物车
export const delCart = params => deleteData('/shoppingCart/app/batchDelete', params)

// 创建订单
export const addOrder = params => postData('/orders/app/appCreate', params)

// 统一下单
export const wxPay = params => getData('/wxPay/app/createOrder', params)

// 订单列表
export const getOrders = params => getData('/orders/app/page', params)

// 地址列表
export const addrList = params => getData('/receivingAddress/app/myAddressList', params)

// 默认地址
export const myAddr = params => getData('/receivingAddress/app/myAddress', params)

// 添加地址
export const addAddr = params => postData('/receivingAddress/app/create', params)
