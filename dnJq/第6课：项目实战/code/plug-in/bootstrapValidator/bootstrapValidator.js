(function(root,factory,plug){
    factory(root.jQuery,plug);
})(window,function($,plug){
    //默认参数
    var __DEFAULT__ = {
        triggerEvent : "change", //默认事件
        errorMessage : "您输入错误" //默认提示
    };
    /*
     require 必填项
     regex 正则验证
     length 长度限制
     minlength 最小长度
     maxlength 最大长度
     between 两者长度之间 8-8
     equalTo 和XX相等
     greaterThan 大于 17
     lessThan 小于 101
     middle 两个数值之间 18-100
     integer 必须是整数
     number 必须是数字
     email 必须是邮箱地址
     mobile 必须是手机号码
     phone 必须是电话号码 xxxx-xxxxxxxx0
     uri 必须是有效的统一资源标示符
     uri和url的关系  如果这个序列是url，你可以说它是uri；如果这个序列是uri，它不见得是url
     //cardId 身份证号码
     //bankId 银行卡号码
     //...其他的规则（根据业务规则来）
     */

    var __RULES__ = {
        //必填项
        require : function(){
           return this.val()!="";
        },
        //正则验证
        regex : function(){
            return new RegExp(this.data("bv-regex")).test(this.val());
        },
        //长度限制
        length : function(){
            return this.val().length===Number(this.data("bv-length"));
        },
        //最小长度
        minlength : function(){
            return this.val().length>=Number(this.data("bv-minlength"));
        },
        //最大长度
        maxlength : function(){
            return this.val().length<=Number(this.data("bv-maxlength"));
        },
        //两者长度之间 8-8
        between : function(){
            var value = this.val().length;
            var middle = this.data("bv-between").split("-");
            return value>=Number(middle[0])&&value<=Number(middle[1]);
        },
        //和XX相等
        equalto : function(){
            if($(this.data("bv-equalto")).val()===this.val()){
                $(this.data("bv-equalto")).parents(".input-group").removeClass("has-error").addClass("has-success").next("p").remove();
                return true;
            }
            return false;
        },
        //大于
        greaterthan : function(){
            return this.val()>Number(this.data("bv-greaterthan"));
        },
        //小于
        lessthan : function(){
            return this.val()<Number(this.data("bv-lessthan"));
        },
        //两个数值之间
        middle : function(){
            var value = this.val();
            var middle = this.data("bv-middle").split("-");
            return value>=Number(middle[0])&&value<=Number(middle[1]);
        },
        //必须是整数
        integer : function(){
            return /^\-?[0-9]*[1-9][0-9]*$/.test(this.val());
        },
        //必须是数字
        number : function(){
            return !isNaN(Number(this.val()));
        },
        //必须是邮箱地址
        email : function(){
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.val());
        },
        //必须是手机号码
        mobile : function(){
            return /^1\d{10}$/.test(this.val());
        },
        //必须是电话号码 xxxx-xxxxxxxx
        phone : function(){
            return /^\d{4}\-\d{8}$/.test(this.val());
        },
        //必须是邮箱
        url : function(){
            return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(this.val());
        },
        //最多保留两位小数
        amount : function(){
            if(!this.val())return true;
            return /^([1-9][\d]{0,}|0)(\.[\d]{1,2})?$/.test(this.val());
        }
    };
    //原型功能
    var __PROTOTYPE__ = {
        _init : function(){
            //初始化目标验证对象
            this.$files = this.find(".form-group .form-control:visible");
        },
        //封装了自定义事件的触发机制
        _attachEvent : function(event,args){
            this.trigger(event,args);
        },
        _bind : function(){
            var _$this = this;
            //事件功能绑定
            this.$files.on(_$this.triggerEvent,function(){
                var $file = $(this);//被验证的表单元素
                var $groups = $file.parents(".input-group");//拿到表单组
                $groups.next("p").remove();//移除之前的错误提示
                var result = true;//本次验证结果，默认为true
                $.each(__RULES__,function(key,rule){
                    if($file.data("bv-"+key)){
                         //call方法的作用用一句话来说明，调用rule函数的时候，rule函数里面的this引用变成了$filed
                        result = rule.call($file);
                        // if(!result){
                        //     $groups.after("<p class='text-danger'>"+($file.data("bv-"+key+"-message")||(_$this.errorMessage))+"</p>")
                        // }
                        (!result)&&$groups.after("<p class='text-danger'>"+($file.data("bv-"+key+"-message")||(_$this.errorMessage))+"</p>");//如果验证错误，提示错误信息
                      return result;
                    }
                })
                $groups.removeClass("has-error has-success").addClass("has-"+(result?"success":"error"));//根据true,false修改样式
            });
            this.on("submit",function(){
                var $group = _$this.$files.trigger(_$this.triggerEvent).parents(".input-group");//提交表单时触发每个表单
                if($group.filter(".has-error").size() === 0){
                    _$this._attachEvent("success",{});
                }else{
                    _$this._attachEvent("error",{});
                }
                return false;
            });
        }
    };
    $.fn[plug] = function(options){
        // console.log(this.is("form"));
        if(!this.is("form"))//判断目标是否form标签，如果不是则程序抛出异常
            throw new Error("the target is not form tag");
        $.extend(this,__DEFAULT__,options,__PROTOTYPE__);
        this._init();
        this._bind();
        return this;
    };
    //扩展规则
    $.fn[plug].extendRules = function(news){
        $.extend(__RULES__,news);
    }
},"bootstrapValidator");