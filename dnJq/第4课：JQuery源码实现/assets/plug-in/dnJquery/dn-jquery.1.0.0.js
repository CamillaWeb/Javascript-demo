var $dn = dnQuery = (function(root){
	var _proxy = function(selector){
		return root.document.querySelectorAll(selector);
	}
	var $ = function(selector,parent){
		return _proxy(selector);
	};
	$.extend = function(target){
		for (var i = 1; i < arguments.length; i++) {
			for(var prop in arguments[i]){
				target[prop] = arguments[i][prop];
			}
		}
		return target;
	}

	var __PROTO__ = {
		each : function(callback){
			for (var i = 0; i < this.length; i++) {
				callback&&callback.call(this[i],i,this[i]);
			}
		},
		get : function(index){
			return this[index];
		},
		find : function(selector){
			return $(selector);
		},
		html : function(html){
			this.each(function(index,object){
				object.innerHTML = html;
			});
			return this;
		},
		addClass : function(clazz){
			this.each(function(index,object){
				object.className = clazz;
			});
			return this;
		},
		removeClass : function(){
			this.each(function(index,object){
				object.className = "";
			});
			return this;
		}
	};

	//[native code] prototype 是 const
	$.fn = $.extend(NodeList.prototype,__PROTO__);
	//创建了一个闭包空间
	return $;
}(window));