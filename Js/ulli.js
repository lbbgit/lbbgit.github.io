var CreateUl=function(id,name){
    var str="<ul";
    if(typeof(id)!="undefined"){
        str += " id='"+id+"' ";
    }
    if(name){
        str+=" name='"+name+"' "
    }
    str+=">"
    if(name){
        str+= name 
    }
    str+="</ul>";
	return str;
};
var InsertLi=function(Ul,id,name){
   var str=Ul;
   
   return str;
};


 var pkg=function(sche){
	 
    this.DiyName; //����
    this.pageIndex = 1; 
    this.maxCount = 200;
    this.readOnly = false; //��ֻ��
    this.pageLoadingList = true; 
    this.condition = ""; 
   
	this.AddBefore = function (fun, func) {//����¼�
        if (!this.AddBefore[fun]) {
            this.AddBefore[fun] = {};
        }
        this.AddBefore[fun][func] = func;
    };
    this.RaiseBefore = function (fun, args) {//�����¼�
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
	this.Authorize = function (fun, istrue, dataObject, args){ return true; }; 
	this.Authorize = function (fun, aler) {
        var defaultState = "ViewData,ViewNode"; //ViewData,DownData,ViewNode
        if (this.readOnly && defaultState.indexOf(fun) == -1) {
            return false;
        }
        return true;
    };
	
	//OnOpClick('DownData','Category.DownData')
	this.OnOpClick = function (fun, opClick, args) {
        try {
            if (!args) {
                args = [];
            }
            if (this.RaiseBefore(fun, args)) {
                if (args) {
                    eval(opClick).apply(this, args);
                }
                else {
                    eval(opClick).apply(this);
                }
            }
        }
        catch (e) {
            alert(e.message);
        }
    };
	
	this.writeLog = function (op, opName, sender) { }; //��־�ӿ�
    this.onLoadAfter = function () { }; //���غ�ӿ�
	
	
	//learn config
	this.SetCofigCols = function (arg) {
        this.configCols = {};
        if (arg && arg.length > 0) {
            for (var i = 0, l = arg.length; i < l; i++) {
                var fieldName = arg[i].fieldName;
                if (fieldName) {
                    this.configCols[fieldName] = arg[i];
                }
            }
        }
    };
	
	
	this.runJsFile=function(jsUrl){
		 $.ajax({
                        type: "GET",
                        url: "/getJs.ashx?href=" + jsUrl,
                        dataType: "script",
                        async: false,
                        cache: true
                    });
	};
	 
    this.getResponse = function(xmlPath) { 
        var listAtrDom = this.CreateXMLDOM();
        //ͨ��Ajax���ؿ���ʵ������ļ�����
        listAtrDom.loadXML($.ajax({
            url: xmlPath ? xmlPath :"/Config/config1.xml",
            async: false,
            cache: true
        }).responseText);
		return listAtrDom;
	};
	this.CreateXMLDOM=function(){ };
	this.CreateXMLDOM=f.CreateXMLDOM;
 }
 
 
 var f={
	a1:function(){alert('a1')},
	a2:function(){alert('a2')},
	a3:function(){alert('a3')},
	a4:function(){alert('a4')},
	a:function(str){alert(str)}
 }
 
 
var Create = f.CreateXMLDOM = function () {
    var xmlDoc = null;
    try {
        //Mozilla, Opera and webkit nightlies
        if (document.implementation && document.implementation.createDocument) {
            xmlDoc = document.implementation.createDocument("", "", null);
        }
        else {//IE
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        }
        xmlDoc.async = false;
        return xmlDoc;
    }
    catch (e) {
           alert("������޷�����XMLDOM����,���վ������Ϊ����վ�㲢����ActiveXObjectִ�С�");
        return null;
    }
}

 
 //init 
 var a=new pkg();
 var b=new pkg();