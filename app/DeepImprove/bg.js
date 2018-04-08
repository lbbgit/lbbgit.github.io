console.log("background")
chrome.tabs.onUpdated.addListener(function(tabId , info) {
	/*
    if (info.status == "complete") {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;
            console.log(url)
            if(url=="http://www.baidu.com/alert"){
                chrome.tabs.executeScript(null,{code:'alert("Hello World!")'});
            }
	    else{
		chrome.tabs.executeScript(null,{code:'alert('+ url +')'});
	    };
 	    if(url=="https://www.baidu.com/alert"){
                chrome.tabs.executeScript(null,{code:'alert("Hellos World!")'});
            }
        });
    }*/
});

var gid=function(bg){return document.getElementById(bg);}
var gcls=function(bg){return document.getElementsByClassName(bg);}