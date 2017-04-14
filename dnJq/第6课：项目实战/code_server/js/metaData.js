var MetaData = (function(){
    var __PROTOTYPE__ = {
        //装载元数据
        "load" : function(jsonData){
            var jsonData = jsonData||{};
            for(var key in jsonData){
                if(this[key]){
                    this[key].lock = true;//打开渲染按钮
                    this[key].data = jsonData[key];
                }
            }
            this.driver();
        },
        "changeQuery" : function(form){
            var arr = $(form).serializeArray();
            var f;
            for(var i=0;i<arr.length;i++){
                f = arr[i];
                this.querys[f.name] = f.value;
            }
            return this.querys;
        },
        //驱动所有lock为true的模块的rende方法
        "driver" : function(){
            for(var module in this){
                var m = this[module];
                if(m.lock){
                    m.beforeRender&&m.beforeRender(this);//渲染模块之前回调
                    m.rende&&m.rende(this);//渲染模块
                    m.afterRender&&m.afterRender(this);//渲染模块之后回调
                    m.lock = false;//关闭渲染按钮
                }
            }
        }
    };
    return $.extend({
        //查询条件
        "querys" : {
            "querys.billAmt" : null,
            "querys.discountRate" : null,
            "querys.latestAccountDateFrom" : null,
            "querys.acceptBank" : null,
            "querys.acceptBankType" : null,
            "pageNo" : null,
            "pageSize": null,
            "totalPage": null
        },
        //详细数据模块
        "detail" : {
            "lock" : false, //开关，如果lock为true，就调用该模块渲染方法
            "data" : null,
            "rende" : function(){
                $.each(this.data,function(key,val){
                    var $obj = $("#"+key);
                    $obj.text(Utils.numberFormat($obj,val));
                });
            }
        },
        //当前可投票据
        "invest" : {
            "lock" : false,
            "data" : null,
            "renderPie" : function(jsonData){
                // 基于准备好的dom，初始化echarts实例
                var pie1 = document.getElementById('tab1-pie1');
                var pieDetail = $(pie1).next();
                var myChart = echarts.init(pie1);
                var legend = [],series = [];
                $.each(this.data.pie1,function(key,value){
                    legend.push(key);
                    series.push({value:value, name:key});
                    pieDetail.append("<dl><dt>"+key+"</dt><dd data-format-type='amount'>"+value+"</dd></dl>");
                });
                // for(var prop in this.data.pie1){
                //     legend.push(prop);
                //     series.push({value:this.data.pie1[prop], name:prop});
                //     pieDetail.append("<dl><dt>"+prop+"</dt><dd>"+this.data.pie1[prop]+"</dd></dl>");
                // }
                Utils.numberFormat();
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '可投票概览 （万）',
                        textStyle: {
                            color: '#91C7AE',
                            fontWeight: 'bolder',
                            fontFamily: 'sans-serif',
                            fontSize: 18,
                        },
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'bottom',
                        data:legend
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:series
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            "renderLine" : function(jsonData,month,data){
                // 基于准备好的dom，初始化echarts实例
                var line = document.getElementById('tab1-line');
                $(line).show().prev().hide();
                var lineDetail = $(line).next();
                var myChart = echarts.init(line);
                var axis = [],series = [];
                $.each(data,function(key,value){
                    axis.push(key);
                    series.push({value:value, name:key});
                });
                Utils.numberFormat();
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: month+'现金流量 （万）',
                        subtext: '日期/单位 （万）',
                        textStyle: {
                            color: '#91C7AE',
                            fontWeight: 'bolder',
                            fontFamily: 'sans-serif',
                            fontSize: 18,
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    calculable: true,
                    xAxis:[
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: axis
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    toolbox:{
                        show: true,
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {},
                            //自定义工具
                            myTool2: {
                                show: true,
                                title: '切换到月',
                                icon: 'image://http://echarts.baidu.com/images/favicon.png',
                                onclick: function (){
                                    $("#tab1-bar").show().next().hide();
                                }
                            }
                        },
                    },
                    series: [{
                        name: '最低金额',
                        type: 'line',
                        data: series
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            "renderBar" : function(jsonData){
                // 基于准备好的dom，初始化echarts实例
                var bar = document.getElementById('tab1-bar');
                var barDetail = $(bar).next().next();
                var myChart = echarts.init(bar);
                var data = [],dataAxis = [];
                $.each(this.data.bar,function(key,value){
                    data.push(key);
                    dataAxis.push({value:value, name:key});
                    barDetail.append("<dl><dt>"+key+"</dt><dd data-format-type='amount'>"+value+"</dd></dl>");
                });
                Utils.numberFormat();
                var _this = this;
                myChart.on('click', function (params) {
                    // console.log(param.value);
                    $.getJSON("data/line.json",{month:params.name},function(data){
                        _this.renderLine(jsonData,params.name,data);
                    })
                });
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '现金流量 （万）'
                    },
                    xAxis: {
                        data: data,
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            show: true
                        },
                        z: 10
                    },
                    yAxis: {
                        axisLine: {
                            show: true
                        },
                        axisTick: {
                            show: true
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#999'
                            }
                        }
                    },
                    series: [
                        {
                            type: 'bar',
                            data: dataAxis,
                            barCategoryGap: '40%',
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        var colorList = ['#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#FE8463'];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            "beforeRender" : function(){
                $('#tab1-pie1').next().empty();
                $('#tab1-line').next().empty();
            },
            "rende" : function(jsonData){
                this.renderPie();
                this.renderBar();
            }
        },
        //当前现金流量
        "flow" : {
            "lock" : false,
            "data" : null,
            "rende" : function(){
                console.log("flow==="+this);
            }
        },
        //已选票据概览
        "overview" : {
            "lock" : false,
            "data" : null,
            "rende" : function(){
                console.log("overview==="+this);
            }
        },
        // 投后现金流量预测
        "forecast" : {
            "lock" : false,
            "data" : null,
            "rende" : function(){
                console.log("forecast==="+this);
            }
        },
        "list": {
            "lock" : false,
            "data" : null,
            "target" : $("#billList tbody"),
            "lazy" : $(".lazy-load"),
            "beforeRender" : function(jsonData){
                var data = this.data;
                if(data.pageNo<data.totalPage){//当前页数小于总共页数
                    this.lazy.text("点击记载更多票据明细").prop("disabled",false);
                }else{
                    this.lazy.text("已全部加载完毕").prop("disabled",true);
                }
            },
            "rende" : function(jsonData){
                this.target.empty();//先清空静态数据
                this.data.result = this.data.result||[];
                // console.log(this.data.result.length);
                var row,$rows;
                (this.data.result.length==0)&&this.lazy.hide();//如果没有数据时，“加载更多”按钮隐藏
                for(var i=0;i<this.data.result.length;i++){
                    row = this.data.result[i];
                    $rows = $("<tr>"+
                        "<td><span data-stopPropagation class=\"ico inp-check\" id=\"r"+row.id+"\"></span><input type=\"checkbox\" style=\"display:none\" value=\""+row.id+"\"></td>"+
                        "<td>"+row.billNo+"</td>" +
                        "<td>"+row.acceptBankName+"</td>"+
                        "<td><span data-format-type='rate'>"+row.discountRate+"</span>%</td>"+
                        "<td><span data-format-type='amount'>"+row.faceAmt+"</span>元</td>"+
                        "<td><span data-format-type='amount'>"+row.subscriptionAmt+"</span>元</td>"+
                        "<td>"+row.remainDeadline+"天</td>"+
                        "<td>"+new Date(row.accountDate).toLocaleDateString()+"</td>"+
                        "</tr>");
                    $rows.find("td:first span").data("meta",row);
                    this.target.append($rows);
                }
            },
            "afterRender" : function(jsonData){
                Utils.numberFormat();
            }
        }
    },__PROTOTYPE__);
})();

