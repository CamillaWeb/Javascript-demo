(function(root,factory,plug){//root代表环境，目前是window环境，别人用这插件，不一定是在window环境下;factory表示你这个插件功能函数;plug表示插件名称
    factory(root.jQuery,plug);
})(window,function($,plug){
    var __PROTOTYPE__ = {
        //初始化架构层面的dom的样式，初始化一些属性
        _init : function(){
               this.$sectionWrap = this.addClass("section-wrapper")
                    .find("ul:first").addClass("section-wrap section-animate")
                    .children().addClass("section").parent();

               this.$section =  this.$sectionWrap.find("li.section")
               this.index = 0;
               this.lock = true;
               this.maxCount = this.$section.length-1;
        },
        //生成旁边的序列按钮
        _serials : function(){
             if(!this.showSerials)return; //如果不显示序列号，return出去
             this.$serials = $("<ul></ul>");
             this.$serials.addClass("wrap-nav");
             for(var i=0;i<this.$section.length;i++){
                 this.$serials.append("<li class='"+(!i?"curr":"")+"'><a href='#'></a></li>");
             }
             this.append(this.$serials);
        },
        //封装了自定义事件的触发机制
        _attachEvent : function(event,args){
             this.trigger(event,args);
        },
        //滚屏
        _bind : function(){
               var _$this = this;
               // console.log(this);//this指的是jQuery对象
               this.on("mousewheel",function(e){
                   // console.log(this); //this指的是dom对象
                   // console.log(e.originalEvent.deltaY);
                   var dir = e.originalEvent.deltaY<0;
                   if(_$this.lock){
                       _$this.lock = false;
                       var beforeIndex = _$this.index;
                       // console.log(index);
                       dir?_$this.index--:_$this.index++;
                       _$this.index = Math.min(_$this.maxCount,_$this.index);
                       _$this.index = Math.max(_$this.index,0);
                       // index = index<0?0:index;
                       // index = index>maxCount?maxCount:index;
                       // console.log(index);
                       if(beforeIndex == _$this.index){
                           _$this.lock = true;
                           return;
                       }
                       _$this._attachEvent("beforeWheel",{
                           before : beforeIndex,
                           beforeDOM : _$this.$section.eq(beforeIndex),
                           after : _$this.index,
                           afterDOM : _$this.$section.eq(_$this.index)
                       });
                       _$this.$sectionWrap.css({
                           "transform" : "translateY(-"+_$this.index+"00%)",
                           "-moz-transform" : "translateY(-"+_$this.index+"00%)",
                           "-webkit-transform" : "translateY(-"+_$this.index+"00%)",
                           "-o-transform" : "translateY(-"+_$this.index+"00%)"
                       })
                   }
                   setTimeout(function(){
                       _$this.lock = true;
                       _$this._attachEvent("afterWheel",{
                           before : beforeIndex,
                           beforeDOM : _$this.$section.eq(beforeIndex),
                           after : _$this.index,
                           afterDOM : _$this.$section.eq(_$this.index)
                       });
                       if(!_$this.showSerials)return; //如果不显示序列号，return出去
                       _$this.$serials.children().eq(_$this.index).addClass("curr").siblings().removeClass("curr");
                   },1000)
               })
        }
    };
    //设置默认值
    var __DEFAULTS__ = {
        showSerials : true
    };
    //扩展功能
    $.fn[plug] = function(options){
        $.extend(this,__PROTOTYPE__,__DEFAULTS__,options);
        this._init();//初始化
        this._serials();//生成序列
        this._bind();//设置功能事件
        return this;
    }
},"sectionWrapper");