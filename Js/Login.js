var LoginPage={
	CheckLogin:function(){
		return !!this.Store.Out["Login"];
	},
	Store:{
		GetSession:function(){
			return sessionStorage;
		},
		In:function(item,value){
			this.GetSession().setItem(item,value);
		},
		Out:function(item){
			return this.GetSession().getItem(item);
		}
	},
	CheckMd5:function(str){
		if(!$.md5)	
			$.getScript("/Js/md5.min.js");
		return $.md5(str);
	}
	
	
	
}