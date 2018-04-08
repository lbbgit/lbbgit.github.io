var lang = "en";
var $ = function(id) { return document.getElementById(id); }
var Tasks = {
    show: function(obj) {
        obj.className = '';
        return this;
    },
    hide: function(obj) {
        obj.className = 'hide';
        return this;
    },
    //STORE dom
    $addItemDiv: $('addItemDiv'),
    $addItemInput: $('addItemInput'),
    $txtTaskTitle: $('txtTaskTitle'),
    $taskItemList: $('taskItemList'),
    //POINTER
    index: window.localStorage.getItem('Tasks:index'),
    //INIT
    init: function() {
        if (!Tasks.index) {
            window.localStorage.setItem('Tasks:index', Tasks.index = 0);
        }
        /*INIT EVENT*/
        //OPEN ADD INPUT TEXTBOX 
        Tasks.$addItemDiv.addEventListener('click', function() {
            Tasks.show(Tasks.$addItemInput).hide(Tasks.$addItemDiv);
            Tasks.$txtTaskTitle.focus();
        }, true);
        //ENTER TO ADD
        Tasks.$txtTaskTitle.addEventListener('keyup', function(ev) {
            var ev = ev || window.event;
            if (ev.keyCode == 13) {
                var task = {
                    id: 0,
                    task_item: $('txtTaskTitle').value,
                    add_time: new Date(),
                    is_finished: false,
                    score:{//-----------------------------------------
                        gold:0,
                        silver:0,
                        iron:0, 
                        wood:0
                    }
                };
                Tasks.Add(task);
                Tasks.AppendHtml(task);
                Tasks.$txtTaskTitle.value = '';
                Tasks.hide(Tasks.$addItemInput).show(Tasks.$addItemDiv);
            }
            ev.preventDefault();
        }, true);
        //CANCEL
        Tasks.$txtTaskTitle.addEventListener('blur', function() {
            Tasks.$txtTaskTitle.value = '';
            Tasks.hide(Tasks.$addItemInput).show(Tasks.$addItemDiv);
        }, true);
        //INIT DATA
        if (window.localStorage.length - 1) {
            var task_list = [];
            var key;
            for (var i = 0, len = window.localStorage.length; i < len; i++) {
                key = window.localStorage.key(i);
                if (/task:\d+/.test(key)) {
                    task_list.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }
            for (var i = 0, len = task_list.length; i < len; i++) {
                Tasks.AppendHtml(task_list[i]);
            }
        }
    },
    //ADD
    Add: function(task) {
        //REFRESH POINTE
        window.localStorage.setItem('Tasks:index', ++Tasks.index);
        task.id = Tasks.index;
        window.localStorage.setItem("task:" + Tasks.index, JSON.stringify(task));
    },
    //MEND
    Edit: function(task) {
        window.localStorage.setItem("task:" + task.id, JSON.stringify(task));
    },
    //DEL
    Del: function(task) {
        window.localStorage.removeItem("task:" + task.id);
    },
    AppendHtml: function(task) {
        var oDiv = document.createElement('div');
        oDiv.className = 'taskItem';
        oDiv.setAttribute('id', 'task_' + task.id);
        var addTime = new Date(task.add_time);
        var timeString = addTime.getMonth() + '-' + addTime.getDate() + ' ' + addTime.getHours() + ':' + addTime.getMinutes() + ':' + addTime.getSeconds();
        oDiv.setAttribute('title', timeString);
        var oLabel = document.createElement('label');
        oLabel.className = task.is_finished ? 'off' : 'on';
        var oSpan = document.createElement('span');
        oSpan.className = 'taskTitle'; 
        var oText = document.createTextNode(task.task_item);
        oSpan.appendChild(oText);


        //gold,silver,iron,wood
        var gold = document.createElement('span');
        gold.className = 'gold';
        var goldtext = document.createTextNode(' '+(task.score? task.score.gold:''));
        gold.appendChild(goldtext);
        
        var silver = document.createElement('span');
        silver.className = 'silver';
        var silvertext = document.createTextNode(' '+(task.score? task.score.silver:''));
        silver.appendChild(silvertext);
           
        var iron = document.createElement('span');
        iron.className = 'iron';
        var irontext = document.createTextNode(' '+(task.score? task.score.iron:''));
        iron.appendChild(irontext);

        var wood = document.createElement('span');
        wood.className = 'wood';
        var woodtext = document.createTextNode(' '+(task.score? task.score.wood:''));
        wood.appendChild(woodtext);
 


        oDiv.appendChild(oLabel);
        oDiv.appendChild(oSpan); 
        oDiv.appendChild(gold);
        oDiv.appendChild(silver);
        oDiv.appendChild(iron);
        oDiv.appendChild(wood);
 
        //INIT EVENT  // oDiv -> oLabel
        oLabel.addEventListener('click', function() {
            if (!task.is_finished) {
                task.is_finished = !task.is_finished;
                var lbl = this.getElementsByTagName('label')[0];
                lbl.className = (lbl.className == 'on') ? 'off' : 'on';
                Tasks.Edit(task);
            } else {
                if (confirm('ARE U SURE TO DELETE?')) {
                    Tasks.Del(task);
                    Tasks.RemoveHtml(task);
                } else {
                    task.is_finished = !task.is_finished;
                    var lbl = this.getElementsByTagName('label')[0];
                    lbl.className = (lbl.className == 'on') ? 'off' : 'on';
                    Tasks.Edit(task);
                }
            }
        }, true);

        gold.addEventListener('click', function() { 
            Tasks.ClickScore(this,task); //this.innerText=" "+task.score.gold++;
             });
        silver.addEventListener('click', function() {
            Tasks.ClickScore(this,task); //this.innerText=" "+task.score.silver++; 
            });
        iron.addEventListener('click', function() {
            Tasks.ClickScore(this,task); //this.innerText=" "+task.score.iron++; 
            });
        wood.addEventListener('click', function() {
            Tasks.ClickScore(this,task); //this.innerText=" "+task.score.wood++; 
            });
         
        oDiv.addEventListener('click', function() {
            this.blur();
        });
        Tasks.$taskItemList.appendChild(oDiv);

    },
    //统一的点击分数方法，然后保存更新信息
    ClickScore:function(obj,task){
        switch(obj.className)
        {
            case 'gold'  :obj.innerText=" " + ++task.score.gold; break;
            case 'silver':obj.innerText=" " + ++task.score.silver;break;
            case 'iron'  :obj.innerText=" " + ++task.score.iron;break;
            case 'wood'  :obj.innerText=" " + ++task.score.wood;break;
        }
        this.ReSave(task);    
    },
    //保存更新当前节点信息
    ReSave:function(task){ 
            if (window.localStorage.length - 1) {
            var task_list = [];
            var key;
            for (var i = 0, len = window.localStorage.length; i < len; i++) {
                key = window.localStorage.key(i);
                if (key.replace('task:','')==task.id) { 
                    //save node
                    window.localStorage.setItem("task:" + task.id, JSON.stringify(task));
                    return;
                }
            }
        }
    },
    RemoveHtml: function(task) {
        var taskListDiv = Tasks.$taskItemList.getElementsByTagName('div');
        for (var i = 0, len = taskListDiv.length; i < len; i++) {
            var id = parseInt(taskListDiv[i].getAttribute('id').substring(5));
            if (id == task.id) {
                Tasks.$taskItemList.removeChild(taskListDiv[i]);
                break;
            }
        }
    }
}
Tasks.init();