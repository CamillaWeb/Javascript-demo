$(function(){
    $("#mainForm")
        .bootstrapValidator({
            triggerEvent : "keyup"
        })
        .on("success",function(){
            alert(1);
        });
    $.getJSON("data/data1.json",function(obj){
        $.each(obj.detail,function(key,val){
            var $obj = $("#"+key);
            $obj.text(Utils.numberFormat($obj,val));
        });
    });
});