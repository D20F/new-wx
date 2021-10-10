export const regular_phone = function (val) {
    const regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    return regex.test(val)
}
export const regular_identityNumber = function (val) {
    const regex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return regex.test(val)
}
export const regular_password = function (val) {
    const regex = /^[0-9A-Za-z]{6,16}$/
    return regex.test(val)
}