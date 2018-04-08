//var jquery_Microsoft_CDN = 'ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js';
//var jquery_CDN = 'code.jquery.com/jquery-1.9.1.min.js';

function MyRdm(name){ 
	document.body.style.backgroundColor = "#" + (Math.random() * 0xffffff << 0).toString(16);   
};   

var rdmColor=new function(){
    document.body.style.backgroundColor = "#" + (Math.random() * 0xffffff << 0).toString(16);
};

rdmColor();