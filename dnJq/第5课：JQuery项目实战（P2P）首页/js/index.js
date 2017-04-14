$(function(){
    var $header = $("header");
    var $menubar = $header.find(".menubar");
    var $sectionWrap = $(".section-wrap");
    var maxCount = $sectionWrap.find("li.section").length-1;
    var index = 0;
    var lock = true;
    function onbeforeWhell(index){
        $header.addClass("hide");
        $(".section-2").removeClass("action");
    }
    function onafterWhell(index){
        if(index == 0){
            $menubar.removeClass("black").addClass("white");
        }else{
            $menubar.removeClass("white").addClass("black");
        }
        if(index==1){
            $(".section-2").addClass("action");
        }
        $header.removeClass("hide");
    }
    $(document.body).on("mousewheel",function(e){
         if(lock){
             lock = false; //等定时器过后为true时再执行下面的代码
             var dir = e.originalEvent.deltaY<0;
             dir?index--:index++;
             index = Math.min(index,maxCount);//取两者间最小数
             // index = index<0?0:index;
             // index = index>maxCount?maxCount:index;
             onbeforeWhell(index);
             $sectionWrap.css({
                 "transform":"translateY(-"+index+"00%)",
                 "-moz-transform":"translateY(-"+index+"00%)",
                 "-webkit-transform":"translateY(-"+index+"00%)",
                 "-o-transform":"translateY(-"+index+"00%)"
             })
         }
         setTimeout(function(){
             lock = true;
             onafterWhell(index);
         },1000)
    })
})