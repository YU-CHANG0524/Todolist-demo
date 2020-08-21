// 'use strict'


$(document).ready(function () {
    

    

    let mainTaskData = [
        
    ];

    let classIndex = {
        important:[],
        normal:[],
        completed:[]
    }

    
    let taskEditContent = {
        'index':'',
        'title': '',
        'deadline': {
            'value1': '',
            'value2': ''
        },
        'file':{
            'name':'',
            'date':''
        },
        'comment':'',
        'markValue':'',
        'status':'',
        'taskIconView':{
            'calendar':'',
            'file':'',
            'comment':''
        }
    };

    let mark = 0 ;
    let completedStatus = 0 ; 
    let count = 0;
    let remainingAmount = 0;


    let taskItemClassChange = function () {
        taskItemDelete();
        taskItemImportant();
        taskItemEdit();
    };


    readLocalStorage();


    clickAniamteEvent();

    datashow(mainTaskData,classIndex);

    // FormData

    deleteFromData();

    upLoadFile();

    toggleClassName('.jq-markImportant','.jq-edit-title','active-important');

    addTaskItem();

    taskItemClassChange();

    tabPage();

    $('.jq-deleteFrom').on('click', function () {
        deleteFromData();
    });




    function deleteFromData() {

            $('#task-date,#task-time,#task-commemt,#title-text,#file').val('');
            $('.jq-file-name > span').detach();
            
            if ((checkhasClass('.jq-edit-title','active-important'))==true) {
                $('.jq-edit-title').trigger("click");
                $('.jq-edit-title').removeClass('active-important');
            }

        
    }

    function toggleClassName(onTarget,addTarget,name) {

        $(onTarget).on('click', function (e) {
            $(addTarget).toggleClass(name);
        });

    }

    function checkhasClass(target,name) {

        let status =  $(target).hasClass(name);

        // console.log(status);
        return status ;
    }


    function upLoadFile() {

        let fileName;

        let date = new Date();
        let date1 = date.toLocaleDateString()

        //點plus 觸發 input
        $('.jq-file-plus').on('click', function () {
            $('#file').trigger("click");
        });

        //將檔案名字出現
        $('input[type="file"]').change(function(e){
            fileName = e.target.files[0].name;
            $('.jq-file-name').html(`<span class="file_name_value">${fileName}</span><span class="file_name_date">uploaded ${date1}</span>`);
        });

    }
    
    // 將每筆資料標記的計數器
    function indexCount() {
        count += 1 ;
    }


    function saveFromData() {

        indexCount();


        let date = new Date();

        let date1 = $('#file').val() ? date.toLocaleDateString() : '' ;

        

        taskEditContent.index = count ;
        taskEditContent.title =  $('.jq-edit-title-text').val();
        taskEditContent.deadline.value1 =  $('#task-date').val();
        taskEditContent.deadline.value2 =  $('#task-time').val();
        taskEditContent.file.name =  $('#file').val().replace(/^.+?\\([^\\]+?\.[^\.\\]*?)?$/gi,"$1");
        taskEditContent.file.date =  date1 ;
        taskEditContent.comment =  $('#task-commemt').val();
        taskEditContent.markValue = checkhasClass('.jq-edit-title','active-important') ;
        taskEditContent.status = false ;

        if ((taskEditContent.deadline.value1)=="") {
            taskEditContent.taskIconView.calendar = 'jq-icon-false' ;
        }
        if ((taskEditContent.file.name)==="") {
            taskEditContent.taskIconView.file = 'jq-icon-false' ;
        }

        // console.log(taskEditContent.file.name);

        if ((taskEditContent.comment)=="") {
            taskEditContent.taskIconView.comment = 'jq-icon-false' ;
        }


        // console.log(taskEditContent);
        mainTaskData.push(taskEditContent);

        
        // console.log(mainTaskData);

    }

    // 確認是否為重要資料
    function dataimportant() {

        saveFromData();
        // console.log(taskEditContent);

        deleteFromData();

        // console.log(taskEditContent);

        if(taskEditContent.markValue ==true){
            mark = true ; 
        }else{
            mark = false ;
        }

        // console.log(mark);

    }

    function addTaskItem() {

        $('.jq-saveFrom').click(function (e) { 

            dataimportant();

            if(mark == true){
                //task_content_item 有加active-important
                //title_buttons_love 有加 jq-button-love
                $(`<div class="task_content_item active-important" data-index=${taskEditContent.index}>
                    <div class="task_add_edit_title">
                        <div class="title_input">
                            <input class="title_input_checkbox"type="checkbox"id="task-checkbox"/>
                                <div class="task_title">
                                    <p>${taskEditContent.title}</p>
                                </div>
                            </div>
                            <div class="title_buttons">
                                <div class="title_buttons_love jq-button-love">
                                    <i class="material-icons">favorite</i>
                                </div>
                                <div class="title_buttons_edit jq-button-edit">
                                    <i class="material-icons">create</i>
                                </div>
                            </div>
                        </div>
                    <div class="status">
                    <div class="date ${taskEditContent.taskIconView.calendar}">
                        <i class="far fa-calendar-alt "></i>
                        <p>${taskEditContent.deadline.value1}</p>
                    </div>
                        <i class="far fa-file ${taskEditContent.taskIconView.file}"></i>
                        <i class="far fa-comment-dots ${taskEditContent.taskIconView.comment}"></i>
                    </div>
                    <div class="dropBlock">
                        <span class="circle"></span>
                    </div>
                </div>`).appendTo('.jq-important-task');
            }else{
                $(`<div class="task_content_item" data-index=${taskEditContent.index}>
                    <div class="task_add_edit_title">
                        <div class="title_input">
                            <input class="title_input_checkbox"type="checkbox"id="task-checkbox"/>
                                <div class="task_title">
                                    <p>${taskEditContent.title}</p>
                                </div>
                            </div>
                            <div class="title_buttons">
                                <div class="title_buttons_love jq-button-love">
                                    <i class="material-icons">favorite</i>
                                </div>
                                <div class="title_buttons_edit jq-button-edit">
                                    <i class="material-icons">create</i>
                                </div>
                            </div>
                        </div>
                    <div class="status">
                        <div class="date ${taskEditContent.taskIconView.calendar}">
                            <i class="far fa-calendar-alt "></i>
                            <p>${taskEditContent.deadline.value1}</p>
                        </div>
                        <i class="far fa-file ${taskEditContent.taskIconView.file}"></i>
                        <i class="far fa-comment-dots ${taskEditContent.taskIconView.comment}"></i>
                    </div>
                    <div class="dropBlock">
                        <span class="circle"></span>
                    </div>
                </div>`).appendTo('.jq-normal-task');
            }




            //標記位置
            if(mark == true){
                classIndex.important.push(taskEditContent.index);
            }else{
                classIndex.normal.push(taskEditContent.index)
            }
            
            showRemainingAmount();

            taskEditContent = {
                'index':'',
                'title': '',
                'deadline': {
                    'value1': '',
                    'value2': ''
                },
                'file':{
                    'name':'',
                    'date':''
                },
                'comment':'',
                'markValue':'',
                'status':'',
                'taskIconView':{
                    'calendar':'',
                    'file':'',
                    'comment':''
                }
            };
        
            mark = 0 ;
            completedStatus = 0 ; 


            console.log(mainTaskData);
            console.log(classIndex);
            

            //綁定拖拉事件
            drop('.jq-important-task');
            drop('.jq-normal-task');
            drop('.jq-completed-task');


            updataToLocalStorage(mainTaskData,classIndex);

            

        }); 

    }

    function taskItemImportant() {

        //重新綁定 appendTo的元素  (綁定原有的上層元素)
        $('.jq-important-task,.jq-normal-task').on('click','.jq-button-love', function () {

            // 辨別該筆資料是否有重要標記 0:未完成 1:完成
            let importantDecide = $(this).parent().parent().parent('.active-important').length;
            let index = $(this).parent().parent().parent('.task_content_item').data('index');


            if( importantDecide == 0 ){

                //加上重要效果

                $(this).parent().parent().parent('.task_content_item').addClass('active-important');

                //把資料移到jq-completed-task

                    // 1.先刪除原本的內容但保留綁定的事件
                        let clone2 = $($(this).parent().parent().parent('.task_content_item')).clone(true);
                        $($(this).parent().parent().parent('.task_content_item')).detach();
                    // 2.新增到 jq-normal-task
                        $('.jq-important-task').append(clone2);


                        
                    // 3.更新該筆資料的classindex

                        deleteDataAddArray(classIndex.normal,classIndex.important,index);
                        
                        for (let i = 0; i < mainTaskData.length; i++) {
                            
                            if ( index == mainTaskData[i].index ) {
                                mainTaskData[i].markValue = true ;
                            }
                            
                        }

                    // 4.更改剩餘
                        showRemainingAmount();



            }else{
                
                
                // 效果跟上面相反，但是所有資料會被丟回.jq-normal-task 不管有沒有important

                $(this).parent().parent().parent('.active-important').removeClass('active-important');
                        let clone2 = $($(this).parent().parent().parent('.task_content_item')).clone(true);
                        $($(this).parent().parent().parent('.task_content_item')).detach();
                        $('.jq-normal-task').append(clone2);

                        deleteDataAddArray(classIndex.important,classIndex.normal,index);

                        for (let i = 0; i < mainTaskData.length; i++) {
                            
                            if ( index == mainTaskData[i].index ) {
                                mainTaskData[i].markValue = false ;
                            }
                        
                        }

                        showRemainingAmount();

                        
                        

            }

            console.log(mainTaskData);
            console.log(classIndex);
            updataToLocalStorage(mainTaskData,classIndex);
        });
    }

    function taskItemDelete() {

        //重新綁定 appendTo的元素  (綁定原有的上層元素)
        $('.jq-important-task,.jq-normal-task,.jq-completed-task').on('click','.title_input_checkbox', function () {

            // 辨別該筆資料是否完成 0:未完成 1:完成
            let checkBoxDecide = $(this).siblings('.task-delete').length;
            let index = $(this).parent().parent().parent('.task_content_item').data('index');
            let importantMark = $(this).parent().parent().parent('.active-important').length ;

            

            if( checkBoxDecide == 0 ){

                //加上刪除線效果,以及刪除important效果
                $(this).siblings('.task_title').addClass('task-delete');
                $(this).parent().parent().parent('.task_content_item').removeClass('active-important');
                //把資料移到jq-completed-task

                    // 1.先刪除原本的內容但保留綁定的事件
                        let clone1 = $($(this).parent().parent().parent('.task_content_item')).clone(true);
                        $($(this).parent().parent().parent('.task_content_item')).detach();
                    // 2.新增到 jq-completed-task
                        $('.jq-completed-task').append(clone1);


                    // 3.更新該筆資料的classindex,與資料
                        if (importantMark==0) {
                            deleteDataAddArray(classIndex.normal,classIndex.completed,index);
                        } else {
                            deleteDataAddArray(classIndex.important,classIndex.completed,index);
                        }

                        for (let i = 0; i < mainTaskData.length; i++) {
                            
                            if ( index == mainTaskData[i].index ) {
                                mainTaskData[i].markValue = false ;
                                mainTaskData[i].status = true ;
                            }
                        
                        }


                        
                    // 4.更改剩餘
                        showRemainingAmount();

                    // let a = $(this).parent().parent().parent('.task_content_item').data('index');             

            }else{
                
                
                // 效果跟上面相反，但是所有資料會被丟回.jq-normal-task 不管有沒有important

                $(this).siblings('.task_title').removeClass('task-delete');
                        let clone1 = $($(this).parent().parent().parent('.task_content_item')).clone(true);
                        $($(this).parent().parent().parent('.task_content_item')).detach();
                        $('.jq-normal-task').append(clone1);
                        deleteDataAddArray(classIndex.completed,classIndex.normal,index);

                        for (let i = 0; i < mainTaskData.length; i++) {
                            
                            if ( index == mainTaskData[i].index ) {
                                mainTaskData[i].status = false ;
                            }
                        
                        }
                        
                        showRemainingAmount();
            }


            console.log(mainTaskData);
            console.log(classIndex);
            updataToLocalStorage(mainTaskData,classIndex);

        });
    }

    function taskItemEdit() {
        
        //重新綁定 appendTo的元素  (綁定原有的上層元素)
        $('.jq-important-task,.jq-normal-task').on('click','.jq-button-edit', function () {

            $('.jq-open').slideUp(1000);
            $('.jq-task-edit').slideDown(1000);

            
            let editIndex =  $(this).parent().parent().parent('.task_content_item').data('index');

            let importantMark = $(this).parent().parent().parent('.active-important').length ;

            for (let i = 0; i < mainTaskData.length; i++) {

                let num = mainTaskData[i].index;

                if ( num==editIndex ) {
                    
                    // console.log(mainTaskData[i].title);

                    $('.jq-edit-title-text').val(mainTaskData[i].title);

                    $('#task-date').val(mainTaskData[i].deadline.value1);

                    $('#task-time').val(mainTaskData[i].deadline.value2);

                    if (mainTaskData[i].file.name) {

                        $('.jq-file-name').append(`<span class="file_name_value">${mainTaskData[i].file.name}</span>`);

                        $('.jq-file-name').append(`<span class="file_name_date">${mainTaskData[i].file.date}</span>`);
                        
                    }



                    $('#task-commemt').val(mainTaskData[i].comment);


                    if (mainTaskData[i].markValue == true) {
                        $('.jq-edit-title').addClass('active-important');
                    }

                    $(this).parent().parent().parent('.task_content_item').remove();


                    for (let i = 0; i < mainTaskData.length; i++) {
                            
                        if ( editIndex == mainTaskData[i].index ) {
                            mainTaskData.splice(i,1);
                        }
                        
                    }

                    if ( importantMark==1 ) {
                        for (let i = 0; i < classIndex.important.length; i++) {

                            if( classIndex.important[i] == editIndex){
                
                                classIndex.important.splice(i,1);
                                
                                console.log(classIndex);

                                break;
                            }
                            
                        }
                    } else if( importantMark!==1 ){

                        for (let i = 0; i < classIndex.normal.length; i++) {

                            if( classIndex.normal[i] == editIndex){
                
                                classIndex.normal.splice(i,1);

                                console.log(classIndex);

                                break;
                            }
                            
                        }
                    }


                    showRemainingAmount();

                    break;
                } 

                

                
            }

            console.log(mainTaskData);
            console.log(classIndex);
            updataToLocalStorage(mainTaskData,classIndex);

        });
    }

    function deleteDataAddArray(data,dataTo,value) {

        // 先刪除

        for (let i = 0; i < data.length; i++) {

            if( data[i] == value){

                data.splice(i,1);

                break;
            }
            
        }

        // 再新增

        dataTo.push(value);

        console.log(classIndex);
    }

    function clickAniamteEvent() { 

        
    
        $('.jq-open').click(function (e) { 
            e.preventDefault();
            $('.jq-open').slideUp(1000);
            $('.jq-task-edit').slideDown(1000);
        });
    
        $('.jq-close').click(function (e) { 
            e.preventDefault();
            $('.jq-task-edit').slideUp(1000);
            $('.jq-open').slideDown(1000);
        });
    }

    function showRemainingAmount() {

        remainingAmount = classIndex.normal.length + classIndex.important.length

        if( remainingAmount !== 0 ){
            $('.prompt_message').html(`<p>${remainingAmount} tasks left</p>`);
        }else{
            $('.prompt_message').html('');
        }

        

        
        
    }

    function drop(val) {


        $( val ).sortable({
            containment: val,
            scroll: false,
            update:function () {

                let item = $( val ).find('.task_content_item');
                let arrayName ;
                let array = [];

                for (let i = 0; i < item.length; i++) {
                    
                    array.push(item.eq(i).data('index'));

                }

                if ( val=='.jq-important-task' ) {
                    classIndex.important = array;
                } else if( val == '.jq-normal-task' ){
                    classIndex.normal = array ;
                } else if( val == '.jq-completed-task'){
                    classIndex.completed = array;
                }


                updataToLocalStorage(mainTaskData,classIndex);

                console.log(mainTaskData);
                console.log(classIndex);

            }
        });
        // task_content_item

        $( val ).sortable( "disable" );

        $('.dropBlock').hover(function () {
                
                $( val ).sortable( "enable" );
                
            }, function () {

                $( val ).sortable( "disable" );
            }
        );
        


        
    }
    
    function updataToLocalStorage(data,index) {
        
        localStorage.clear();

        let  localStorageString = JSON.stringify(data);
        let  localStorageString_index = JSON.stringify(index);

        localStorage.setItem("todolist",localStorageString);
        localStorage.setItem("todolist_index",localStorageString_index);

        
    }

    function readLocalStorage() {
        
        // localStorage.clear();

        if( localStorage.getItem("todolist") && localStorage.getItem("todolist_index") !==null){

            mainTaskData =  JSON.parse(localStorage.getItem("todolist")) ;
            classIndex = JSON.parse(localStorage.getItem("todolist_index")) ;

            
        }
        console.log(mainTaskData);
        console.log(classIndex);

    }
    
    function datashow(data,index) {
        
        

        for (let i = 0; i < index.important.length; i++) {

            let valueA = index.important[i];
            // console.log(valueA);

            if( valueA !== '' ){

                for (let j = 0; j < data.length; j++) {

                    if (data[j].index==valueA) {

                        $(`<div class="task_content_item active-important" data-index=${data[j].index}>
                            <div class="task_add_edit_title">
                                <div class="title_input">
                                    <input class="title_input_checkbox"type="checkbox"id="task-checkbox"/>
                                        <div class="task_title">
                                            <p>${data[j].title}</p>
                                        </div>
                                    </div>
                                    <div class="title_buttons">
                                        <div class="title_buttons_love jq-button-love">
                                            <i class="material-icons">favorite</i>
                                        </div>
                                        <div class="title_buttons_edit jq-button-edit">
                                            <i class="material-icons">create</i>
                                        </div>
                                    </div>
                                </div>
                            <div class="status">
                            <div class="date ${data[j].taskIconView.calendar}">
                                <i class="far fa-calendar-alt "></i>
                                <p>${data[j].deadline.value1}</p>
                            </div>
                                <i class="far fa-file ${data[j].taskIconView.file}"></i>
                                <i class="far fa-comment-dots ${data[j].taskIconView.comment}"></i>
                            </div>
                            <div class="dropBlock">
                                <span class="circle"></span>
                            </div>
                        </div>`).appendTo('.jq-important-task');


                        break;
                    }

                }
            }
        }


        for (let i = 0; i < index.normal.length; i++) {

            let valueB = index.normal[i];

            // console.log(valueB);

            if( valueB !== '' ){

                for (let j = 0; j < data.length; j++) {

                    if (data[j].index==valueB) {

                        $(`<div class="task_content_item " data-index=${data[j].index}>
                            <div class="task_add_edit_title">
                                <div class="title_input">
                                    <input class="title_input_checkbox"type="checkbox"id="task-checkbox"/>
                                        <div class="task_title">
                                            <p>${data[j].title}</p>
                                        </div>
                                    </div>
                                    <div class="title_buttons">
                                        <div class="title_buttons_love jq-button-love">
                                            <i class="material-icons">favorite</i>
                                        </div>
                                        <div class="title_buttons_edit jq-button-edit">
                                            <i class="material-icons">create</i>
                                        </div>
                                    </div>
                                </div>
                            <div class="status">
                            <div class="date ${data[j].taskIconView.calendar}">
                                <i class="far fa-calendar-alt "></i>
                                <p>${data[j].deadline.value1}</p>
                            </div>
                                <i class="far fa-file ${data[j].taskIconView.file}"></i>
                                <i class="far fa-comment-dots ${data[j].taskIconView.comment}"></i>
                            </div>
                            <div class="dropBlock">
                                <span class="circle"></span>
                            </div>
                        </div>`).appendTo('.jq-normal-task');


                        break;
                    }

                }
            }
            
        }


        for (let i = 0; i < index.completed.length; i++) {

            let valueC = index.completed[i];

            // console.log(valueC);

            if( valueC !== '' ){

                for (let j = 0; j < data.length; j++) {

                    if (data[j].index==valueC) {

                        $(`<div class="task_content_item " data-index=${data[j].index}>
                            <div class="task_add_edit_title">
                                <div class="title_input">
                                    <input class="title_input_checkbox"type="checkbox"id="task-checkbox" checked>
                                        <div class="task_title task-delete">
                                            <p>${data[j].title}</p>
                                        </div>
                                    </div>
                                    <div class="title_buttons">
                                        <div class="title_buttons_love jq-button-love">
                                            <i class="material-icons">favorite</i>
                                        </div>
                                        <div class="title_buttons_edit jq-button-edit">
                                            <i class="material-icons">create</i>
                                        </div>
                                    </div>
                                </div>
                            <div class="status">
                            <div class="date ${data[j].taskIconView.calendar}">
                                <i class="far fa-calendar-alt "></i>
                                <p>${data[j].deadline.value1}</p>
                            </div>
                                <i class="far fa-file ${data[j].taskIconView.file}"></i>
                                <i class="far fa-comment-dots ${data[j].taskIconView.comment}"></i>
                            </div>
                            <div class="dropBlock">
                                <span class="circle"></span>
                            </div>
                        </div>`).appendTo('.jq-completed-task');


                        break;
                    }

                }
            }
            
        }

        drop('.jq-important-task');
        drop('.jq-normal-task');
        drop('.jq-completed-task');

        showRemainingAmount();

    }

    function tabPage() {

        $('.menu_list_item').on('click', function () {


            let has = $(this).hasClass('active') ;
            
            // console.log(pageName);


            if ( has == false ) {
                
                $(this).toggleClass('active').siblings().removeClass('active');

                    let path = $(this).data('page');

                    console.log(path);
                
                if (path == 'all') {

                    console.log('a');
                    $('.jq-important-task').css('display', 'block');
                    $('.jq-normal-task').css('display', 'block');
                    $('.jq-completed-task').css('display', 'block');
                    $('.prompt_message').css('display', 'block');

                } else if(path =='inProgress') {

                    console.log('b');
                    $('.jq-important-task').css('display', 'block');
                    $('.jq-normal-task').css('display', 'block');
                    $('.jq-completed-task').css('display', 'none');
                    $('.prompt_message').css('display', 'block');

                } else if(path=='completedTask') {

                    console.log('c');
                    $('.jq-important-task').css('display', 'none');
                    $('.jq-normal-task').css('display', 'none');
                    $('.jq-completed-task').css('display', 'block');
                    $('.prompt_message').css('display', 'none');

                }



            }




        });


    }

    


});