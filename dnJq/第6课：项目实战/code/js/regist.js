$(function(){
    //扩展规则
    $.fn.bootstrapValidator.extendRules({
        //身份证号码
    	cardid : function(){
    		return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.val());
    	}
    });
   $("#frmRegist").bootstrapValidator({
       triggerEvent : "keyup"
   }).on("error",function(event){
       alert("请填写信息");
       return false;
   }).on("success",function(event){
       this.submit();
       return false;
   });
})

