//过滤特殊字符的函数，在vue中必须将其export,外面才可以使用！！！！

export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
    return rs;
}


//正则验证邮箱！！！
export function validateEmail(value) {
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value) ? true : false


}

//正则验证密码！！！===>> 6--20位的字母和数字
export function validatePass(value) {

    let reg = /^.*(?=.{6,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    return !reg.test(value) ? true : false

    
}

//正则验证验证码！！！===>> 6位数字
export function validateVerificationCode(value) {

    let reg = /^[0-9]{6}$/;
    return !reg.test(value) ? true : false

    
}
        
    