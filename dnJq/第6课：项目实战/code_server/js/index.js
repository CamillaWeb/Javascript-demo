$(function(){
   var $header = $("header");
   var $menubar = $(".menubar");
   $("#sw").sectionWrapper({
       showSerials : true //是否显示序列号
   }).on("beforeWheel",function(event,ops){
       $header.addClass("hide");
       $(".section-2").removeClass("action");
   }).on("afterWheel",function(event,ops){
       var index = ops.after;
       if(index == 0){
           $menubar.removeClass("black").addClass("white");
       }else{
           $menubar.addClass("black").removeClass("white");
       }
       if(index == 1){
           // $(".section-2").addClass("action");
           ops.afterDOM.addClass("action");
       }
        $header.removeClass("hide");
   });
})


















//封装前
// $(function(){
//    var $header = $("header");
//    var $menubar = $(".menubar");
//    var $sectionWrapper = $(".section-wrapper");
//    var $sectionWrap = $sectionWrapper.find(".section-wrap");
//    var index = 0;
//    var lock = true;
//    var maxCount = $sectionWrap.find("li.section").length-1;
//    function onBeforeWheel(index){
//        $header.addClass("hide");
//        $(".section-2").removeClass("action");
//     }
//     function onAfterWheel(index){
//        if(index == 0){
//            $menubar.removeClass("black").addClass("white");
//        }else{
//            $menubar.addClass("black").removeClass("white");
//        }
//        if(index == 1){
//            $(".section-2").addClass("action");
//        }
//         $header.removeClass("hide");
//     }
//    $(document.body).on("mousewheel",function(e){
//        // console.log(e.originalEvent.deltaY);
//        var dir = e.originalEvent.deltaY<0;
//        if(lock){
//            lock = false;
//            var beforeIndex = index;
//            // console.log(index);
//            dir?index--:index++;
//            index = Math.min(maxCount,index);
//            index = Math.max(index,0);
//            // index = index<0?0:index;
//            // index = index>maxCount?maxCount:index;
//            // console.log(index);
//            if(beforeIndex == index){
//                lock = true;
//                return;
//            }
//            onBeforeWheel(index);
//            $sectionWrap.css({
//                "transform" : "translateY(-"+index+"00%)",
//                "-moz-transform" : "translateY(-"+index+"00%)",
//                "-webkit-transform" : "translateY(-"+index+"00%)",
//                "-o-transform" : "translateY(-"+index+"00%)"
//            })
//        }
//        setTimeout(function(){
//           lock = true;
//            onAfterWheel(index);
//        },1000)
//    })
// })