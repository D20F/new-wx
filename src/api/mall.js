import { getData, postData, deleteData, putData } from '@/utils/request/uniapp_request_mapi.js'

// 商家地址
export const getMallAddr = params => getData('/dataDictionary/app/address', params)

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

// 修改购物车
export const editCart = params => postData('/shoppingCart/app/updateCart', params)

// 删除购物车
export const delCart = params => deleteData('/shoppingCart/app/batchDelete', params)

// 创建订单
export const addOrder = params => postData('/orders/app/appCreate', params)

// 订单详情
export const orderInfo = id => getData('/orders/app/' + id)

// 提醒发货
export const remindOrder = id => getData('/orders/app/remind/' + id)

// 修改订单状态
export const editOrder = params => putData('/orders/app/' + params.id, params)

// 退费列表
export const getRefund = params => getData('/ordersResult/app/page', params)

// 退费
export const refundOrder = params => postData('/ordersResult/app/create', params)

// 退费详情
export const refundInfo = id => getData('/ordersResult/app/' + id)

// 提交物流
export const express = params => getData('/ordersResult/app/express/' + params.id, params)

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
