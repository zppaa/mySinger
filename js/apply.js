$(function(){
    init();
    function init(){
    //photo 水平居中
    var w = $(window).width()- $(".sc-img").width();
    $(".sc-img").css("left",w/2);
}
$(".submit0").click(function(){
       $(".submit0").attr("href","#pageone");
});


//读取cokkie uid
    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
             return null;
    }

    var uid = getCookie("userId");
    var stageId = getCookie("stageId");
    if(uid && stageId){
        window.location.href="/h5/share?appVersion=2.0.0&uid="+uid+"&stageId="+stageId;
    }
}); 

$("#cardType").on("change",function(){
    var cardType = $("#cardType").val();
    if(cardType != "1"){
        $(".byCard").slideDown();
        $("#cardNum").val("");
        $("#country,#pro").val('').prev("span").html('&nbsp;');
        $("#ageshow").val("");
        $("#age").val("");
    }else{
        $(".byCard").slideUp();
    }
})
$("#cardNum").on("input",function () {
    var idNumber = $("#cardNum").val();
    var cardType = $("#cardType").val();
    if(cardType == "1"){
        if (trim(idNumber).length > 0) {

            if(trim(idNumber).length == 15 || trim(idNumber).length == 18){
                if (checkIdcard(idNumber)) {
                    $(".byCard").slideDown();
                    getSex(idNumber);
                    var birthday = getBirthdatByIdNo(idNumber);
                    $("#age").val(birthday);
                    var  age = getAgeBybrith(birthday);
                    $("#ageshow").val(age);
                    var provinceName = getProvinceNameByIdNo(idNumber);
                    $("#country").val("中国");
                    $("#country").prev("span").text("中国");
                    $("#pro").val(provinceName);
                    $("#pro").prev("span").text(provinceName);
                }

            }
        }
    }else if(trim(idNumber).length > 0){
            $(".byCard").slideDown();
    }
})
$("#cardNum").on("change",function(){
var idNumber = $("#cardNum").val();
    var cardType = $("#cardType").val();
    if(cardType == 1){
        if (!checkIdcard(idNumber)) {
            pop("#transitionExample0","输入的身份证号格式错误");
            return;
        }
    }
});
function trim(s) { return s.replace(/^\s+|\s+$/g, ""); };
//验证纷纷证获取性别信息
function getSex(idcard){
    var num = "";
    if(idcard.length == 15){
        num = idcard.substr(idcard.length-1,1);
    }else{
        num = idcard.substring(16,17);
    }
    if(num % 2 == 0){
        $("#female").attr("checked","checked");
        $("#female").prev("label").removeClass("ui-radio-off").addClass("ui-radio-on"); 
        $("#male").attr("checked","");
        $("#male").prev("label").addClass("ui-radio-off").removeClass("ui-radio-on"); 
    }else{
        $("#male").attr("checked","checked");
        $("#male").prev("label").addClass("ui-radio-on").removeClass("ui-radio-off"); 
        $("#female").attr("checked","");
        $("#female").prev("label").addClass("ui-radio-off").removeClass("ui-radio-on"); 
    }
}
//验证身份证号并获取籍贯
function getProvinceNameByIdNo(idcard) {
    var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
        21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
        33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北",
        43: "湖南", 44: "广东", 45: "广西",
        46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西",
        62: "甘肃", 63: "青海", 64: "宁夏",
        65: "新疆"
    }

    var provinceName = "";
    var provinceNo = idcard.substr(0, 2);
    if (area[parseInt(provinceNo)] != null) {
        provinceName = area[parseInt(provinceNo)];
    }
    return provinceName;
}

//获取出生日期
function getBirthdatByIdNo(iIdNo) {
    var tmpStr = "";
    var strReturn = "";

    if (iIdNo.length == 15) {
        tmpStr = iIdNo.substring(6, 12);
        tmpStr = "19" + tmpStr;
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
            return tmpStr;
    }
    else {
        tmpStr = iIdNo.substring(6, 14);
        tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
            return tmpStr;
    }
}
//根据出生日期得到年龄
function getAgeBybrith(brith){
    age = getAge(brith);
    if(age < 18){
        $(".jianhu").slideDown();
    }else{
        $(".jianhu").slideUp();
    }
return age;
}

function checkIdcard(num) {
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
    //下面分别分析出生日期和校验位 
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确 
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    return false;
                }
                else {
                    //将15位身份证转成18位 
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    num += arrCh[nTemp % 11];
                    return true;
                }
            }
            if (len == 18) {
                re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
                arrSplit = num.match(re);

                //检查生日日期是否正确 
                dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                // var bGoodDay;
                bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    return false;
                }
                else {
                    //检验18位身份证的校验码是否正确。 
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
                    var valnum;
                    arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    nTemp = 0, i;
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    valnum = arrCh[nTemp % 11];
                    if (valnum != num.substr(17, 1)) {
                        return false;
                    }
                    return true;
                }
            }
            return false;
        }

//文件读取
function readFile(){
    var file = document.getElementById("image0").files[0];
    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
    if(!/image\/\w+/.test(file.type)){ 
        pop("#transitionExample0","请确保文件为图像类型");
        return false;
    }
    if(file.size > '10485760'){
        pop("#transitionExample0","图片最大不可超过10兆");
        return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        var img = this.result;
        $.ajax({
            type:'post',
            url:'/apply/gettoken?appVersion=2.0.2&src=web',
            dataType:'json',
            success:function(res){
                if(res && res.errno === 0){
                    var token = res.data.token;
                    $.ajax({
                        type:'post',
                        url:'/resource/upload',
                        data:{type:"image",biztype:"apply",data:img,token:token,appVersion:"2.0.2",src:"web"},
                        dataType:'json',
                        beforeSend:function(){
                              $(".ui-loader").show();
                        },
                        success:function(res){
                            if(res && res.errno === 0)
                    {
                        $(".img-tip").hide();
                        document.getElementById("uploadPreview").setAttribute("src",img);
                        $("#image0").attr("datasrc",res.data.resUrl)    
                    }else{
                        pop("#transitionExample0",res.mrrmsg);
                    }
                        },
                        complete:function(){
                            $(".ui-loader").hide();
                        }
                    });

                }else{
                    pop("#transitionExample0",res.errmsg);
                }
            }
        });

    }
}
$("#image0").on("change",function(){
    readFile();
})
function pop(id,msg){
    $(id).find("p").text(msg);
    $(id).popup("open");
    setTimeout(function() {
        $(id).popup("close");
    }, 2500);

}
//下一步one到 two
var dataobj1,dataobj2,dataobj3;
$(".submit1").on("click",function(){
    dataobj2 = $("#image0").attr("datasrc");
    dataobj1 = $("#form1").serialize()+"&image0="+dataobj2;
    var dataobj = dataobj1+'&appVersion=2.0.2&src=web';
    var cardNum = $("#cardNum").val(),cnname = $("#cnname").val(),mobile =$("#mobile").val();
    if(!cnname){
        pop("#transitionExample0","请填写您的姓名");
        return;
    }
    if(!mobile){
        pop("#transitionExample0","请填写您的手机号");
        return;
    }
    if(!cardNum){
        pop("#transitionExample0","请填写证件信息");
        return;
    }
    $.ajax({
        type:'post',
        url:'/apply/checkapplyparam/',
        data:dataobj,
        dataType:'json',
        beforeSend:function(){
            $(".ui-loader").show();
        },
        success:function(res){
            if(res && res.errno === 0){
                $(".onepage").attr("href","#pagethree").click(); 
            }else{
                pop("#transitionExample0",res.errmsg);
           }
        },
        complete:function(){
            $(".ui-loader").hide();
        }
    });
});
$(".submit3").on("click",function(){
    dataobj3 = $("#form3").serialize();
    //dataobj = 'cnname=anan&sex=2&age=1991-04-101&country=中国&nativePlace=河北&mobile=17701151027&cardType=1&cardNum=130432198904011764&jobCompany=nhh&school=cc&address=北京-东城&image0=http://jiayongwei.upload.singer.me.cn/apply/image/2016/01/02/568777259b8739851.png&likeSinger=anan&likeSong=dfdfli&singerCond=sdfdfdffdfdd&singerVoteCond=ddfdfopij&signReason=joidffdji&appVersion=2.0.2&src=web';
    $.ajax({
        type:'post',
        url:'/apply/gettoken?appVersion=2.0.2&src=web',
        dataType:'json',
        success:function(res){
            var token = res.data.token;
            var  dataobj = dataobj1+'&'+dataobj3+'&token='+token+'&appVersion=2.0.2&src=web';
            if(res && res.errno === 0){
                $.ajax({
                    type:'post',
                    url:'/apply/adduser/',
                    data:dataobj,
                    dataType:'json',
                    beforeSend:function(){
                        $(".ui-loader").show();
                    },
                    success:function(res){
                        if(res && res.errno === 0){
                            document.cookie="userId="+res.data.uid;         
                            document.cookie="stageId="+res.data.stageId;         
                           window.location.href = '/h5/share?appVersion=2.0.0&uid='+res.data.uid+'&stageId='+res.data.stageId; 
                        }else{
                            pop("#transitionExample2",res.errmsg);
                        }
                    },
                    complete:function(){
                        $(".ui-loader").hide();
                    }
                })

            }else{
                pop("#transitionExample0",res.errmsg);
            }
        }
    });
});
//计算年龄
function getAge(strBirthday)
{       
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if(nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0) {
            if(nowMonth == birthMonth){
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff ;
                }
            } else {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff ;
                }
            }
        } else {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }
    return returnAge;//返回周岁年龄
}

