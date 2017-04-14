$(function(){
    //扩展规则
    $.fn.bootstrapValidator.extendRules({
        //身份证号码
        cardid : function(){
            return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.val());
        }
    });
    $("#frmLogin").bootstrapValidator({
        triggerEvent : "keyup"
    }).on("error",function(event){
        alert("请填写信息");
        return false;
    }).on("success",function(event){
        this.submit();
        return false;
    });
})



//开启某表单的验证功能
//实现对登陆表单的验证
//用户名必须是字母数字下划线组成，不允许中文
//密码必须由字母数字组成，必须在8-12位之间
// $(function(){
//     //用户名
//     $("#username").on("blur",function(){
//         var $group = $(this).parent().removeClass("has-success has-error");
//         $group.next().remove();
//         if(/^\w+$/.test(this.value)){
//             $group.addClass("has-success");
//         }else{
//             $group.addClass("has-error");
//             $group.after("<p class='text-danger'>输入不合法</p>")
//         }
//     })
//     //密码
//     $("#password").on("blur",function(){
//         var $group = $(this).parent().removeClass("has-success has-error");
//         $group.next().remove();
//         if(/^[a-zA-Z0-9]{8,12}$/.test(this.value)){
//             $group.addClass("has-success");
//         }else{
//             $group.addClass("has-error");
//             $group.after("<p class='text-danger'>输入不合法</p>")
//         }
//     })
//     //验证码
//     $("#verifyCode").on("blur",function(){
//         var $group = $(this).parent().removeClass("has-success has-error");
//         $group.next().remove();
//         if(/^[a-zA-Z0-9]{4}$/.test(this.value)){
//             $group.addClass("has-success");
//         }else{
//             $group.addClass("has-error");
//             $group.after("<p class='text-danger'>输入不合法</p>")
//         }
//     })
//     //表单提交
//     $("#frmLogin").on("submit",function(){
//         var count1 = $(this).find("input").length;
//         var count2 = $(this).find(".has-success").length;
//         if(count1===count2){
//             this.submit();
//         }else{
//             return false;
//         }
//     })
// })