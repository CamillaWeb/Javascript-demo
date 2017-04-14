(function(){
	var _def_ = {
	   data : [],
	   p1 : 0,
	   p2 : "",
	   p3 : false
	}
	var _pro_ = {
	   _int : function(){
		   var $ul = $("<ul></ul>");
		   for(var i=0;i<this.data.length;i++){
			   var $li = $("<li>"+this.data[i]+"</li>");
			   $ul.append($li);
		   };
		   this.append($ul);
	   }
	}
	$.fn.addList = function(options){
	   $.extend(this,_def_,options,_pro_);
	   this._int();
	}
})()