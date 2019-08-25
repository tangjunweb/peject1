
//手机号验证
export function ValidateTel(rule, value, callback) {
    let str = String(value);
    if (!str) {
        callback(new Error('请输入手机号'))
    } else if (!str.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
        callback(new Error('手机号格式错误'))
    } else {
        callback()
    }
}
/*
根据身份证号码判断性别
15位身份证号码：第7、8位为出生年份(两位数) ，第9、10位为出生月份，第11、12位代表出生日
18位身份证号码：第7、8、9、10位为出生年份(四位数) ，第11、第12位为出生月份，
第13、14位代表出生日期，第17位代表性别，奇数为男，偶数为女。
*/
export function ValidateIDCardBirthday(val) {
    var year, month, day;
    if (15 == val.length) { //15位身份证号码
        year = val.charAt(6) + val.charAt(7);
        if (parseInt(year) < 10) {
            year = '20' + year;
        } else {
            year = '19' + year;
        }
        year = year;
        month = val.charAt(8) + val.charAt(9)
        day = val.charAt(10) + val.charAt(11)
    }
    if (18 == val.length) { //18位身份证号码
        year = val.charAt(6) + val.charAt(7) + val.charAt(8) + val.charAt(9);
        month = val.charAt(10) + val.charAt(11)
        day = val.charAt(12) + val.charAt(13)
    }
    return {
        year: year,
        month: month,
        day: day
    }
}
// 18位身份证号最后一位校验
function ValidateIDCardLastNum(code) {
    code = code.split('');
    //∑(ai×Wi)(mod 11)
    //加权因子
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    //校验位
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0;
    var ai = 0;
    var wi = 0;
    for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
    }
    var last = parity[sum % 11];
    //最后一位不区分大小写
    if (code[17] == 'x') code[17] = code[17].toUpperCase();
    if (parity[sum % 11] != code[17]) {
        return false
    } else {
        return true
    }
}
//身份证验证
export function ValidateIDCard(rule, value, callback) {
    let str = String(value);
    if (!str) {
        callback(new Error('请输入身份证号'))
    } else if (!str.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
        callback(new Error('身份证号格式错误'))
    } else if (str.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
        let obj = ValidateIDCardBirthday(str);
        let currentYear = new Date().getFullYear();
        if (currentYear - obj.year < 15 || currentYear - obj.year > 200) {
            callback(new Error('您输入的身份证号码出生年限不在范围只能内'))
        } else if (obj.month < 1 || obj.month > 12) {
            callback(new Error('您输入的身份证号码出生月份不在范围只能内'))
        } else if (obj.day < 1 || obj.day > 31) {
            callback(new Error('您输入的身份证号码出生日期不在范围只能内'))
        } else if (str.length == 18 && !ValidateIDCardLastNum(str)) {
            callback(new Error('您输入的身份证号码校验位错误'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}


//验证清单个数
export function ValidateInvertory(rule, value, callback) {
    if (!value.length){
        callback(new Error('请上传清单'))
    } else if (value.length>10){
        callback(new Error('最多上传10个清单'))
    }
}