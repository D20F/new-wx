import { getData, postData } from '@/utils/request/uniapp_request_mapi.js'


/*
    获取小程序seesionkey
    params:{   
        code:''
    }
 */
export const authAppCode = (reqData) => {
    const url = '/auth/app/code';
    const data = reqData;
    return postData(url, data);
}
/*
    小程序登录
    params:{
        "encryptedData": "",
        "iv": "",
        "openId": "",
        "recommendUsername": ""
    }
 */
export const authAppLogin = (reqData) => {
    const url = '/auth/app/login';
    const data = reqData;
    return postData(url, data);
}

/*
    获取首页轮播图
    params:{}
*/
export const getHomeRotationPage = (reqData) => {
    const url = '/homeRotation/app/page';
    const data = reqData;
    return getData(url, data);
}
/*
    预约内容 查询 汽车租聘 办证预约 旅行社团 直通车
    params:{
    }
*/
export const getReserveApp = (id) => {
    const url = `/reserve/app/${id}`;
    const data = '';
    return getData(url, data);
}
/*
    获取 可编辑套餐的 套餐详情
    params:{}
*/
export const getComboPage = (reqData) => {
    const url = '/combo/app/all';
    const data = reqData;
    return getData(url, data);
}
/*
    景区门票   门票 车票 演艺 其他 
    params:{}
*/
export const getTicketPage = (reqData) => {
    const url = '/ticket/app/page';
    const data = reqData;
    return getData(url, data);
}
/*
    景区门票   门票 车票 演艺 其他 详情
    params:{
    }
*/
export const getTicketApp = (id) => {
    const url = `/ticket/app/${id}`;
    const data = '';
    return getData(url, data);
}
/*
    旅游住宿   民宿  酒店
    params:{}
*/
export const getHotelPage = (reqData) => {
    const url = '/hotel/app/page';
    const data = reqData;
    return getData(url, data);
}
/*
    旅游住宿   民宿  酒店 详情
    params:{}   
*/
export const getHotelApp = (id) => {
    const url = `/hotel/app/${id}`;
    const data = '';
    return getData(url, data);
}
/*
    服务热线  常用电话 旅游电话 组团 拼车
    params:{}
*/
export const getServiceHotLinePage = (reqData) => {
    const url = '/serviceHotLine/all/page';
    const data = reqData;
    return getData(url, data);
}
/*
    景区介绍列表
    params:{}
*/
export const getScenicSpotPage = (reqData) => {
    const url = '/scenicSpot/app/page';
    const data = reqData;
    return getData(url, data);
}
/*
    景区介绍列表 详情
    params:{}   
*/
export const getScenicSpotApp = (id) => {
    const url = `/scenicSpot/app/${id}`;
    const data = '';
    return getData(url, data);
}
/*
    便民服务  附近医院 核酸检测点 警务站点
    params:{}
*/
export const getConveniencePage = (reqData) => {
    const url = '/convenience/all/page';
    const data = reqData;
    return getData(url, data);
}
/*
    旅游攻略分页查询
    params:{}
*/
export const getTravelGuidesPage = (reqData) => {
    const url = '/travelGuides/app/page';
    const data = reqData;
    return getData(url, data);
}
/*
    旅游攻略详情查询
    params:{}
*/
export const getTravelGuidesDetails = (id) => {
    const url = `/travelGuides/app/${id}`;
    const data = '';
    return getData(url, data);
}
/*
    创建旅游攻略
    params:{}
*/
export const addTravelGuides = (reqData) => {
    const url = '/travelGuides/app/create';
    const data = reqData;
    return postData(url, data);
}
/*
    创建投诉反馈
    params:{}
*/
export const addComplaint = (reqData) => {
    const url = '/complaint/app/create';
    const data = reqData;
    return postData(url, data);
}
/*
    投诉反馈分页查询
    params:{}
*/
export const getComplaintPage = (reqData) => {
    const url = '/complaint/app/page';
    const data = reqData;
    return getData(url, data);
}
/*
    获取 我的界面基础信息
    params:{}
*/
export const getAppUser = (reqData) => {
    const url = '/appUser/app/my';
    const data = reqData;
    return getData(url, data);
}
/*
    提交  办证预约表单
    params:{}
*/
export const addVisa = (reqData) => {
    const url = '/reserve/app/create';
    const data = reqData;
    return postData(url, data);
}
/*
    获取 办证预约表单列表
    -1 已取消
     1 待支付
     2 待使用
     3 已完成
     4 已过期
    params:{}
*/
export const getVisaPage = (reqData) => {
    const url = '/reserve/app/page';
    const data = reqData;
    return getData(url, data);
}
/*
    取消 订单 通用 
    params:{}
*/
export const cancelOrder = (id) => {
    const url = `/ordersReserve/app/cancel/${id}`;
    const data = '';
    return getData(url, data);
}
/*
    查询订单套餐数量 通用 
    params:{}
*/
export const getComboQuantity = (id, reqData) => {
    const url = `/ordersReserve/app/surplus/${id}`;
    const data = reqData;
    return getData(url, data);
}
/*
    提交 旅行社团表单
    params:{}
*/
export const addTravel = (reqData) => {
    const url = '/reserve/app/create3';
    const data = reqData;
    return postData(url, data);
}
/*
    获取 旅行社团列表
    -1 已取消
     1 待支付
     2 待使用
     3 已完成
     4 已过期
    params:{}
*/
export const getTravelPage = (reqData) => {
    const url = '/reserve/app/page3';
    const data = reqData;
    return getData(url, data);
}
/*
    提交 直通车表单
    params:{}
*/
export const addThrough = (reqData) => {
    const url = '/reserve/app/create4';
    const data = reqData;
    return postData(url, data);
}
/*
    获取 直通车列表
    -1 已取消
     1 待支付
     2 待使用
     3 已完成
     4 已过期
    params:{}
*/
export const getThrough = (reqData) => {
    const url = '/reserve/app/page4';
    const data = reqData;
    return getData(url, data);
}
/*
    预约 再次支付
    params:{}
*/
export const wxReservePay = (reqData) => {
    const url = '/wxPay/app/reserveOrder';
    const data = reqData;
    return getData(url, data);
}
/*
    查询景区门票数量  
    params:{}
*/
export const getTicketQuantity = (id, reqData) => {
    const url = `/ticket/app/surplus/${id}`;
    const data = reqData;
    return getData(url, data);
}
/*
    获取 预订景区门票列表
    -1 已取消
     1 待支付
     2 待使用
     3 已完成
     4 已过期
    params:{}
*/
export const getTicketReservePage = (reqData) => {
    const url = '/ticket/app/reserve';
    const data = reqData;
    return getData(url, data);
}
/*
    提交 景区门票表单
    params:{}
*/
export const addTicket = (reqData) => {
    const url = '/ticket/app/create';
    const data = reqData;
    return postData(url, data);
}
/*
    提交 旅游住宿表单
    params:{}
*/
export const addHotel = (reqData) => {
    const url = '/hotel/app/create';
    const data = reqData;
    return postData(url, data);
}
/*
    获取 预订酒店民宿列表
    -1 已取消
     1 待支付
     2 待使用
     3 已完成
     4 已过期
    params:{}
*/
export const getHotelReservePage = (reqData) => {
    const url = '/hotel/app/reserve';
    const data = reqData;
    return getData(url, data);
}
/*
    获取 关于我们
    params:{}
*/
export const getConfigure = (reqData) => {
    const url = '/configure/app/about';
    const data = reqData;
    return getData(url, data);
}
/*
    经纬度获取地址
    params:{}
*/
export const getAddress = (reqData) => {
    const url = '/configure/app/getAddress';
    const data = reqData;
    return getData(url, data);
}
/*
    获取旅游攻略评论
    params:{}
*/
export const getTravelComment = (reqData) => {
    const url = '/travelComment/app/list';
    const data = reqData;
    return getData(url, data);
}
/*
    发布旅游攻略评论
    params:{}
*/
export const addTravelComment = (reqData) => {
    const url = '/travelComment/app/create';
    const data = reqData;
    return postData(url, data);
}
/*
    获取旅游住宿评论
    params:{}
*/
export const getHotelComment = (reqData) => {
    const url = '/evaluation/app/hotelPage';
    const data = reqData;
    return getData(url, data);
}
/*
    发布旅游住宿评论
    params:{}
*/
export const addHotelComment = (reqData) => {
    const url = '/evaluation/app/hotel';
    const data = reqData;
    return postData(url, data);
}
/*
    获取景区门票评论
    params:{}
*/
export const getTicketComment = (reqData) => {
    const url = '/evaluation/app/ticketPage';
    const data = reqData;
    return getData(url, data);
}
/*
    发布景区门票评论
    params:{}
*/
export const addTicketComment = (reqData) => {
    const url = '/evaluation/app/ticket';
    const data = reqData;
    return postData(url, data);
}
/*
    获取我的消息
    params:{}
*/
export const getMessage = (reqData) => {
    const url = '/message/app/page';
    const data = reqData;
    return getData(url, data);
}

