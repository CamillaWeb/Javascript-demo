$(function(){
    $("#mainForm")
        .bootstrapValidator({
            triggerEvent : "keyup"
        }).on("success",function(){
            $.getJSON("data/data2.json",MetaData.changeQuery(this),function(data){
                 MetaData.load(data);
            });
    });
    $.getJSON("data/data1.json",function(obj){
         MetaData.load(obj);
    })

    var $chkAll = $(".chk-all");
    var $items = $(".check-group .btn-check");
    $items.on("click",function(){
        $(this).toggleClass("checked");
        if($items.parents(".form-group").find(".checked").length==$items.length){
            $chkAll.addClass("checked");
        }else{
            $chkAll.removeClass("checked");
        }
    });
    //全选、不选
    $chkAll.on("click",function(){
        var $check = $(this).toggleClass("checked").hasClass("checked");
        if($check){
            $items.not(".checked").trigger("click");
        }else{
            $items.filter(".checked").trigger("click");
        }
    });

    $("#billList tbody").on("click","tr",function(){
        $(this).find("td:first span").toggleClass("checked");
        var totalInvestmentAmt=0,
            totalBillAmt=0,
            totalDueYield=0,
            weightedAverageYield=0,
            totalBillCnt=0;
        $.each($(this).parent().find("td span.checked"),function(){
            var meta = $(this).data("meta");
            totalInvestmentAmt += meta.subscriptionAmt;
            totalBillAmt += meta.faceAmt;
            totalDueYield += meta.yearlyRate;
            weightedAverageYield += meta.discountRate;
            totalBillCnt++;
        });
        totalBillAmt /= totalBillCnt;
        weightedAverageYield /= totalBillCnt;
        MetaData.load({
           "detail": {
               "totalInvestmentAmt": totalInvestmentAmt,
               "totalBillAmt": totalBillAmt||0,
               "totalDueYield": totalDueYield||0,
               "weightedAverageYield": weightedAverageYield||0,
               "totalBillCnt": totalBillCnt||0
           }
        })
        console.log(MetaData.detail.data);
    })

});
