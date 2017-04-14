(function (root,factory,plug){
	root[plug] = factory(root.jQuery,plug);
})(window,function($,plug){
	var __def__ = {
		data : [],
		p1 : 0,
		p2 : "",
		p3 : false
	};
	var __prop__ = {
		_init : function(){
			var $ul = $("<ul></ul>");
			for(var i=0;i<this.data.length;i++){
				$ul.append($("<li>"+this.data[i]+"</li>"));
			}
			this.append($ul);
			console.log(this.p1);
		}
	};
	$.fn[plug] = function(options){
		$.extend(this,__def__,options,__prop__);
		this._init();
	}
	return function(options){
		var dom = options.dom;
		$(dom)[plug].call($(dom),options);
	}
},"dnList");