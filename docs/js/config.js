    $(function(){
        $("#logs").append('<table class="table">');
        var isDraggable = false;
        var isResizable = true;
        //↓グローバルスコープ
        $sc = $("#schedule").timeSchedule({
            startTime: "10:00", // schedule start time(HH:ii)
            endTime: "23:00",   // schedule end time(HH:ii)
            widthTime: 60 * 10,  // cell timestamp example 10 minutes
            timeLineY: 110,       // height(px)
            verticalScrollbar: 20,   // scrollbar (px)
            timeLineBorder: 2,   // border(top and bottom)
            bundleMoveWidth: 6,  // width to move all schedules to the right of the clicked time line cell
            draggable: isDraggable,
            resizable: isResizable,
            resizableLeft: true,
            rows : {                
                '0' : {
                    title : 'カンファレンス',
                    schedule:[/*
                        {
                            start: '09:00',
                            end: '12:00',
                            text: 'Text Area',
                            data: {
                            }
                        },
                        {
                            start: '11:00',
                            end: '14:00',
                            text: 'Text Area',
                            data: {
                            }
                        }
                    */]
                },
                '1' : {
                    title : 'メリケンパーク',
                    schedule:[/*
                        {
                            start: '16:00',
                            end: '17:00',
                            text: 'Text Area',
                            data: {
                                "class":"example2",
                                "image":"./img/1.png"
                            }
                        }
                   */ ]
                },
                '2' : {
                    title : 'ファミリー',
                    schedule:[ ]
                },
                '3' : {
                    title : 'オデカケ',
                    schedule:[ ]
                },
                '4' : {
                    title : 'eスポーツ',
                    schedule:[ ]
                },
                '5' : {
                    title : 'その他',
                    schedule:[ ]
                }

            },
            onChange: function(node, data){
                addLog('onChange', data);
            },
            onInitRow: function(node, data){
                addLog('onInitRow', data);
            },
            onClick: function(node, data){
                addLog('onClick', data);
            },
            onAppendRow: function(node, data){
                addLog('onAppendRow', data);
            },
            onAppendSchedule: function(node, data){
                addLog('onAppendSchedule', data);
                if(data.data.class){
                    node.addClass(data.data.class);
                }
                if(data.data.image){
                    var $img = $('<div class="photo"><img></div>');
                    $img.find('img').attr('src', data.data.image);
                    node.prepend($img);
                    node.addClass('sc_bar_photo');
                }
            },
            /*
            onScheduleClick: function(node, time, timeline){
                var start = time;
                var end = $(this).timeSchedule('formatTime', $(this).timeSchedule('calcStringTime', time) + 3600);
                $(this).timeSchedule('addSchedule', timeline, {
                    start: start,
                    end: end,
                    text:'Insert Schedule',
                    data:{
                        class: 'sc_bar_insert'
                    }
                });
                addLog('onScheduleClick', time + ' ' + timeline);
            },
            addTest: function(){
                    $(this).timeSchedule('addSchedule', 0, {
                    start:'09:00',
                    end:'10:00',
                    text:'Insert Schedule',
                    data:{
                        class: 'sc_bar_insert'
                    }
                });
            }*/
        });
        $('#event_timelineData').on('click', function(){
            addLog('timelineData', $sc.timeSchedule('timelineData'));
        });
        $('#event_scheduleData').on('click', function(){
            addLog('scheduleData', $sc.timeSchedule('scheduleData'));
        });
        $('#event_resetData').on('click', function(){
            $sc.timeSchedule('resetData');
            addLog('resetData');
        });
        $('#event_resetRowData').on('click', function(){
            $sc.timeSchedule('resetRowData');
            addLog('resetRowData');
        });
        $('#event_setDraggable').on('click', function(){
            isDraggable = !isDraggable;
            $sc.timeSchedule('setDraggable', isDraggable);
            addLog('setDraggable', isDraggable ? 'enable' : 'disable');
        });
        $('#event_setResizable').on('click', function(){
            isResizable = !isResizable;
            $sc.timeSchedule('setResizable', isResizable);
            addLog('setResizable', isResizable ? 'enable' : 'disable');
        });
        $('.ajax-data').on('click', function(){
            $.ajax({url: 'https://2020.078kobe.jp/wp-json/wp/v2/events/?per_page=100&page=1&events_day=159'})
                .done( (data) => {
                    addLog('Ajax GetData', data);
                    console.log(data);
                    
                });
        });
        $('#clear-logs').on('click', function(){
            $('#logs .table').empty();
        });
        /*
        $sc.timeSchedule('addSchedule', 0, {
                        start:'09:00',
                        end:'10:00',
                        text:'Insert Schedule',
                        data:{
                            class: 'sc_bar_insert'
                        }
                    });*/
    });

    $(function() {
      // 日時の表示切り替え
      $('.btn-day').click(function() {
         let day= $(this).attr('data-target');
        $(".day0").fadeOut(); 
        $(".day1").fadeOut();
        $(".day2").fadeOut(); 
        $(day).hide();
        $(day).fadeIn();
      });
    });