
 var pkg=function(sche){
	this.AddBefore = function (fun, func) {//添加事件
        if (!this.AddBefore[fun]) {
            this.AddBefore[fun] = {};
        }
        this.AddBefore[fun][func] = func;
    };
    this.RaiseBefore = function (fun, args) {//触发事件
        var dataObject = null;
        if (event && event.srcElement) {
            if (event.srcElement.menuType == "rightMenu")
                dataObject = this.dataObject;
        }
        if (this.Authorize(fun, true, dataObject, args)) {
            for (var i in this.AddBefore[fun]) {
                eval(this.AddBefore[fun][i]).apply(this, [fun, args]);
            }
            return true;
        }
        return false;
    };
	this.Authorize=function(fun, istrue, dataObject, args){
		return true;
	}
 }
 
 
 var f={
	a1:function(){alert('a1')},
	a2:function(){alert('a2')},
	a3:function(){alert('a3')},
	a4:function(){alert('a4')},
	a:function(str){alert(str)}
 }
 
 
 //init 
 var a=new pkg();
 var b=new pkg();