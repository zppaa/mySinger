$("#province").on("change",function (argument) {
    toCity();
    var _val = $(this).val();
    $(this).prev("span").text(_val);
    $('#city').prev('span').text('请选择');
});
$("#city").on("change",function (argument) {
    var _val = $(this).val();
    $(this).prev("span").text(_val);
})

//单选框
$(".pay_list_c1").on("click",function(){
    $(this).addClass("on").parent("p").siblings("p").children(".pay_list_c1").removeClass("on");
});
//创建select
var year = document.getElementById('year'),
    month = document.getElementById('month'),
    day = document.getElementById('day');

function createYear(startYear, endYear){
    var option = document.createElement('option');
    option.innerHTML = '';
    option.value = '';
    year.appendChild(option);
    for(var i=endYear; i>=startYear; i--){
        var option = document.createElement('option');
        option.innerHTML = i;
        option.value = i;
        year.appendChild(option);
    }
}

createYear(1930, 2003);

createDay(year.value, month.value);

function createDay(yy, mm){
    var days = [31,28,31,30,31,30,31,31,30,31,30,31];

    day.innerHTML = '';
    if(yy%100 == 0){
        if(!(yy%400)){
            days[1] = 29;
        }
    } else if(!(yy%4)){
        days[1] = 29;
    }

    var option = document.createElement('option');
    option.innerHTML = '';
    option.value = '';
    day.appendChild(option);
    for(var i=1; i<=days[mm-1]; i++){
        var option = document.createElement('option');
        option.innerHTML = i;
        option.value = i;
        day.appendChild(option);
    }
}

month.onchange = function(){
    var yy = year.value;
    createDay(yy, this.value);
}
year.onchange = function(){
    var yy = this.value,
        mm = month.value;

    if(mm == '2'){
        createDay(yy, mm);
    }
}

var date = new Date();
var yy = date.getFullYear()-18;
$('#jhyear').append('<option></option>');
for (ii = 0; ii < 80; ii++) {
    var oP = document.createElement("option");
    var oText = document.createTextNode(yy);
    oP.appendChild(oText);
    oP.setAttribute("value",yy);
    document.getElementById('jhyear').appendChild(oP);
    yy =yy - 1;
};

var j = 1;
$('#jhmonth').append('<option></option>');
for (i = 1; i < 13; i++) {
    var month = document.createElement("option");
    var monthText = document.createTextNode(j);
    month.appendChild(monthText);
    month.setAttribute("value", j);
    document.getElementById('jhmonth').appendChild(month);
    j = j + 1;
};

//出生年月
$(".birth select").on("change",function(){
    var _year   = $("#year").val();
    var _month  = $("#month").val();
    var _day    = $("#day").val();
    var _val    = $(this).val();

    $(this).prev("span").text(_val);

    var age = getAge(_year+"-"+_month+"-"+_day);
    if(age < 18){
        $(".jianhu").addClass("show").removeClass("hide");
    }else{
        $(".jianhu").addClass("hide").removeClass("show");
    }

    if (_year) {
        $("#ageshow").html(age);
    } else {
        $("#ageshow").html("");
    }
})
$(".jhbrith select").on("change",function(){
    var _val = $(this).val();
    $(this).prev("span").text(_val);
})

//证件类型
$(".zjcode select").on("change",function(){
    var val = $(this).val();
    $(this).prev("span").text(val);
    if(val == "身份证号"){
        $(this).prev('span').attr("data-val",1);
    }else if(val == "护照号"){
        $(this).prev('span').attr('data-val',3);
    }else if(val == '军官证'){
        $(this).prev('span').attr('data-val',2);
    }
});
//上传图片视频
var index;
$(".js-photo").click(function(){
    index = $(this).index();
    app.photo();

});
function photoCallback(src){
    if(src){
        $(".photo").eq(index).next().addClass("showLine");
        if( $(".photo").eq(index).next().hasClass("last")){

            tipBox.box.init({tip:"最多添加5张照片"});
        }
        $(".photo").eq(index).find("img").attr("src",src);
        $(".photo").eq(index).find("em").hide();
    }

} 
$(".radiobtn").click(function(){
    app.recordVideo();

})
$(".cha-btn").click(function(){
    app.recordVideo();
})

function videoCallback (src) {
    if(src){
        $(".video-box").html('<video id="video" controls="controls" src="'+src+'"></video>');
        $(".radio").find("em").hide();
        $(".radiobtn").hide();
        $(".cha-btn").show();
    }
}

//form1的下一步
var obj = {};
$(".form1 .next-btn").on("click",function () {
    var codeRge = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,phoneRge = /^1[3|4|5|7|8]\d{9}$/;
    var name = $("#name").val(),sex = $(".gender:checked").val(),year = $(".year .m-sel").text(), month = $(".month .m-sel").text(),day = $(".day .m-sel").text(),idcode = $("#idcode").val(),job = $("#job").val(),school = $("#school").val(), province = $(".province .m-sel").text(),city = $(".city .m-sel").text();
    var cardType = $(".zjidcode .m-sel").attr("data-val"),guardianCardType = $('.jhzjcode .m-sel').attr('data-val');
    var jhname = $("#jhname").val(),jhgx = $("#jhgx").val(),jhphone = $("#jhphone").val(),jhcode = $("#jhcode").val();
    var country = $(".country .m-sel").text(),nativePlace = $(".pro .m-sel").text();
    var jhyear = $('.jhyear .m-sel').text(),jhmonth = $('.jhmonth .m-sel').text();
    var video = document.getElementById("video");
    var image = [];
    for(var i = 0; i < 5; i++){
        var img = document.getElementById("portrait"+i).src;
        if (img != "") {
            image.push(img);
        }
    }
    var age = year+'-'+ month+'-'+day,address = province+'-'+city,jhage = jhyear +'-'+jhmonth;
    if( $.trim(name) == ''){
        $('body,html').scrollTop(0);
        tipBox.box.init({tip:"请填写姓名"});
        $("#name").focus();
        return;
    }
    if( sex == '' || sex== undefined){
        $('body,html').scrollTop(0);
        tipBox.box.init({tip:"请选择性别"});
        return;
    }
    if( $.trim(year) == '选择'|| $.trim(year) == '' || $.trim(month) == ''|| $.trim(month) == '选择' || $.trim(day) == ''|| $.trim(day) == '选择'){
        $('body,html').scrollTop(0);
        tipBox.box.init({tip:"请选择出生年月日"});
        return;
    }
    if($(".jianhu").hasClass("show")){
        if($.trim(jhname) == ''){
            $('body,html').scrollTop(0);
            $("#jhname").focus();
            tipBox.box.init({tip:"请填写监护人姓名"});
            return;
        }
        if( $.trim(jhyear) == '' || $.trim(jhmonth) == '' || $.trim(jhyear) == '请选择' || $.trim(jhmonth) == '请选择'){
            $('body,html').scrollTop(0);
            tipBox.box.init({tip:"请选监护人择出生年月"});
            return;
        }

        if($.trim(jhgx) == ''){
            $('body,html').scrollTop(100);
            $("#jhgx").focus();
            tipBox.box.init({tip:"请填写监护人关系"});
            return;
        }
        if($.trim(jhphone) == ''){
            $('body,html').scrollTop(100);
            $("#jhphone").focus();
            tipBox.box.init({tip:"请填写监护人电话"});
            return;
        }
        if(!phoneRge.test(jhphone)){
            $('body,html').scrollTop(100); 
            $("#jhphone").focus();
            tipBox.box.init({tip:"请填写正确的监护人电话"});
            return;
        }

        if($.trim(jhcode) == ''){
            $('body,html').scrollTop(200);
            $("#jhcode").focus();
            if(guardianCardType == 1){
                tipBox.box.init({tip:"请填写监护人身份证号"});
            }else if(guardianCardType == 2){
                tipBox.box.init({tip:"请填写监护人军官证"});
            }else if(guardianCardType == 3){
                tipBox.box.init({tip:"请填写监护人护照号"});
            }
            return;
        }
        if(guardianCardType == 1){
            if(!codeRge.test(jhcode)){
                $('body,html').scrollTop(200); 
                $("#jhcode").focus();
                tipBox.box.init({tip:"请填写正确的监护身份证号"}); 
                return;

            }
        }
    }
    if( $.trim(idcode) == ''){ 
        if($(".jianhu").hasClass("show")){
            $('body,html').scrollTop(320); 
        }else{
            $('body,html').scrollTop(0); 
        }
        $("#idcode").focus();
        if( cardType == 1){
            tipBox.box.init({tip:"请填写身份证号"});
        }else if(cardType == 2){
            tipBox.box.init({tip:"请填写军官证"});
        }else if(cardType == 3){
            tipBox.box.init({tip:"请填写护照号"});
        }
        return;
    }
    if(cardType == 1){
        if(!codeRge.test(idcode)){
            if($(".jianhu").hasClass("show")){
                $('body,html').scrollTop(320); 
            }else{
                $('body,html').scrollTop(0); 
            }
            $("#idcode").focus();
            tipBox.box.init({tip:"请填写正确的身份证号"}); 
            return;
        }
    }

    if( $.trim(job) == ''){
        if($(".jianhu").hasClass("show")){
            $('body,html').scrollTop(350); 
        }else{
            $('body,html').scrollTop(100); 
        }
        $("#job").focus();
        tipBox.box.init({tip:"请填写工作/公司名"}); 
        return;
    }
    if( $.trim(school) == ''){
        if($(".jianhu").hasClass("show")){
            $('body,html').scrollTop(350); 
        }else{
            $('body,html').scrollTop(100); 
        }
        $("#school").focus();
        tipBox.box.init({tip:"请填写专业/学校名"}); 
        return;
    }
    if($.trim(country)==''){
        tipBox.box.init({tip:"请选择国籍"}); 
        return;

    }
    if($.trim(nativePlace)=='' || nativePlace == '请选择'){
        tipBox.box.init({tip:"请选择籍贯"}); 
        return;
    }

    if($.trim(province) == '请选择' || $.trim(city) == '请选择'){
        tipBox.box.init({tip:"请选择现居地"}); 
        return;
    }
    if(image.length == 0){
        tipBox.box.init({tip:"请上传您的靓照"});

        return;
    }
    if($.trim(video) == ""){
        obj["video"]="";
    } else {
        obj["video"]=video.src;
    }

    obj["cnname"] = name,obj["sex"] = sex,obj["age"] = age,obj["cardType"]=cardType,obj["guardianCardType"]=guardianCardType,obj["cardNum"] = idcode,obj["jobCompany"] = job,obj["school"] = school,
        obj["address"] = address,obj["guardianName"] = jhname,obj["guardianRelate"] = jhgx,obj["guardianMobile"] = jhphone,obj["guardianCardNum"] = jhcode;
    obj["country"]=country,obj["nativePlace"]=nativePlace;
    obj["guardianAge"]=jhage;
    for(var j =0; j < image.length; j++){
        obj["image"+j]=image[j];
    }
    $(".form1").hide();
    $(".form2").show();
    $('body,html').scrollTop(0);

});
//返回上一步
$(".backfrist").click(function(){
    $(".form2").hide();
    $(".form1").show();
})
//弹窗按钮

$(".tc-box .back").click(function () {
    $(".tc-box ").hide();
});
$(".tc-box .next").click(function () {
    fnajax();
});
//提交
$(".form2 .next-btn").on("click",function () {
    var likeSinger = $("#likeSinger").val(),likeSong = $("#likeSong").val(),singerCond = $("#singerCond").val(),singerVoteCond=$("#singerVoteCond").val(),signReason = $("#signReason").val();
    if($.trim(likeSinger) == ''){
        $('body,html').scrollTop(0); 
        $("#likeSinger").focus();
        tipBox.box.init({tip:"请填写喜欢的歌手"}); 
        return;
    }
    if($.trim(likeSong) == ''){
        $('body,html').scrollTop(0); 
        $("#likeSong").focus();
        tipBox.box.init({tip:"请填写最喜欢的一首歌"}); 
        return;
    }
    if($.trim(singerCond) == ''){
        $("#singerCond").focus();
        tipBox.box.init({tip:"您认为歌手最需要具备什么条件？"}) 
    return;
    }
    if($.trim(singerVoteCond) == ''){
        $("#singerVoteCond").focus();
        tipBox.box.init({tip:"现场的歌手什么样的表现才能获得您的选票？"})
            return;
    }
    if($.trim(signReason) == ''){
        tipBox.box.init({tip:"您申请参加节目的理由？"});
        $("#signReason").focus();
        return;
    }

    obj["likeSinger"] = likeSinger,obj["likeSong"] = likeSong,obj["singerCond"] = singerCond,obj["singerVoteCond"] = singerVoteCond,obj["signReason"] = signReason;
    $(".tc-box").show();
});
var lock = false;
function fnajax(){
    $.ajax({
        type:'post',
        url:'/Api/addUser',
        data:obj,
        dataType:'json',
        beforeSend:function () {
            if (lock) {
                return false;
            };
            lock = true;
            $(".loading").show();
        },
        success:function(res){
            if(res && res.errno === 1000){
                window.location.href = res.data.redirectUrl;       
            }else{
                tipBox.box.init({tip:res.errmsg});
            }
        },
        complete:function  () {
            lock = false;
            $(".loading").hide();
        }

    });
}

//退出是否刷新
if (typeof(app) !== 'undefined') {
    if (device.android()) {
        app.logoutReload(true);
    } else {
        app.logoutNeedReload(true);
    }
}
var logoutNeedReload = function (){
    return true;
}
if (typeof(app) !== 'undefined' && typeof(app.setToken) !== 'undefined') {
    app.setToken(getToken());
}
function getToken()
{
    return getCookie("MT");
}
function getCookie(name)
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}

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
