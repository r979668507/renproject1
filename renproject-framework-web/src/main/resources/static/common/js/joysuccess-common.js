/**
 ViewSource 前端通用组件
 author:@唐扬
 **/
var JoySuccCommon = function () {
    var bpmPath = "http://192.168.1.14:8081/";//bpm服务器地址和端口号
    var getContextPath = function () {
        var pathName = document.location.pathname;
        var index = pathName.substr(1).indexOf("/");
        var result = pathName.substr(0, index + 1);
        return result;
    }
    var root = getContextPath();

    var MyFormat = function (time, format) {
        var t = new Date(time);
        var tf = function (i) {
            return (i < 10 ? '0' : '') + i
        };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    }

    //url传值字符串转义通用
    var transferredStr = function (str) {
        var rStr = str;
        if (rStr != "" && rStr != null) {
            rStr = encodeURI(encodeURI(rStr.replace("/", '%2F')));
            return rStr;
        } else {
            return "";
        }
    }

    function stopPropagation(e) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    }

    /**
     * param 将要转为URL参数字符串的对象
     * key URL参数字符串的前缀
     * encode true/false 是否进行URL编码,默认为true
     *
     * return URL参数字符串
     */
    var urlEncode = function (param, key, encode) {
        if (param == null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += urlEncode(param[i], k, encode);
            }
        }
        return paramStr;
    };

    function getUserInfo(inputId,fun) {
        /*$("#" + inputId).attr("data_id", TypeCode);*/
        var inputId = inputId;
        var url = url;
        if (params != "" && params != null) {
            url += "?" + urlEncode(params)
        }
        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            success: function (responseJson) {
                $("#" + inputId).next().remove();
                $("#" + inputId).after('<div class="select_All" id="' + inputId + "_random" + '" hidden> <div class="select_head"><p>' +
                    '<a name="A"><b>A</b></a><a name="B"><b>B</b></a><a name="C"><b>C</b></a><a name="D"><b>D</b></a>' +
                    '<a name="E"><b>E</b></a><a name="F"><b>F</b></a><a name="G"><b>G</b></a> <a name="H"><b>H</b></a>' +
                    '<a name="I"><b>I</b></a><a name="J"><b>J</b></a><a name="K"><b>K</b></a><a name="L"><b>L</b></a>' +
                    '<a name="M"><b>M</b></a><a name="N"><b>N</b></a>' +
                    '</p><p>' +
                    '<a name="O"><b>O</b></a><a name="P"><b>P</b></a><a name="Q"><b>Q</b></a><a name="R"><b>R</b></a>' +
                    '<a name="S"><b>S</b></a><a name="T"><b>T</b></a><a name="U"><b>U</b></a><a name="V"><b>V</b></a>' +
                    '<a name="W"><b>W</b></a><a name="X"><b>X</b></a><a name="Y"><b>Y</b></a><a name="Z"><b>Z</b></a>' +
                    '<a name="1"><b>#</b></a>' +
                    '</p></div> <div class="select_div_mode"> <div class="select_body"></div></div> </div>');
                if (responseJson != null) {
                    for (var k in responseJson) {
                        var docList = responseJson[k];
                        if (docList != "" && docList != null) {
                            $("#" + inputId).next().find('a[name="' + k + '"] b').addClass("haveValue");
                            if (k == "1") {
                                $("#" + inputId).next().find('.select_div_mode .select_body').append('<div id=' + inputId + k + ' name=' + inputId + k + '><span class="span1">#</span></div>');
                            } else {
                                $("#" + inputId).next().find('.select_div_mode .select_body').append('<div id=' + inputId + k + ' name=' + inputId + k + '><span class="span1">' + k + '</span></div>');
                            }
                            for (var i in docList) {
                                {
                                    $("#" + inputId).next().find(".select_div_mode #" + inputId + k + " span").after('<p id=' + inputId + "_" + docList[i].id + '>' + docList[i].value + '</p>');
                                }
                            }
                        }
                    }
                }
            }
        });
        $("#" + inputId + "_random .select_head a").die('click').live('click', function (e) {
            var val = $(this).attr("name");
            var container = $("#" + inputId + "_random .select_div_mode")
            scrollTo = $("#" + inputId + val + ":first");
            container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());
            return;
        });
        $("#" + inputId).off('click').on('click', function (e) {
            if ($(this).val() == "" || $(this).val() == null) {
                $("#" + inputId).attr("data_id", "");
            }
            $("#" + inputId + "_random").toggle();
            stopPropagation(e);
            $("#" + inputId + "_random .select_div_mode p").removeClass("hover");
            var val = $(this).attr("data_id");
            var container = $("#" + inputId + "_random .select_div_mode");
            scrollTo = $("#" + inputId + "_" + val);
            if (scrollTo.length != 0) {
                scrollTo.addClass("hover");
                container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());
            } else {
                container.scrollTop(0)
            }
        });
        $(document).live('click', function () {
            $("#" + inputId + "_random").hide();
        });
        $("#" + inputId + "_random").live('click', function (e) {
            $("#" + inputId + "_random").show();
            stopPropagation(e);
        });
        $("#" + inputId + "_random .select_body p").die('click').live('click', function (e) {
            $("#" + inputId).val($(this).text());
            $("#" + inputId).attr("data_id", $(this).attr("id").split("_")[1]);
            $("#" + inputId + "_random").hide();
            $("#" + inputId).validationEngine('hide');
            $("#" + inputId).trigger('change');
            /*if (fun != null && fun != "") {
             fun();
             }*/
            stopPropagation(e);
        });
    }
    /**
     @Author   liyunhe
     @Date  2017/10/24 14:48
     url   : 请求地址
     inputId  : 输入框id
     params  : 参数，格式{ a:xx,b:xx,c:xx}
     fun : inputId输入框值改变时回调函数
     注  **  input改变后的值
     id:$("#" + inputId).attr("data_id");
     val:$("#" + inputId).val();
     */
    function getSelectInfo(url, inputId, params, fun) {
        /*$("#" + inputId).attr("data_id", TypeCode);*/
        var inputId = inputId;
        var url = url;
        if (params != "" && params != null) {
            url += "?" + urlEncode(params)
        }
        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            success: function (responseJson) {
                $("#" + inputId).next().remove();
                $("#" + inputId).after('<div class="select_All" id="' + inputId + "_random" + '" hidden> <div class="select_head"><p>' +
                    '<a name="A"><b>A</b></a><a name="B"><b>B</b></a><a name="C"><b>C</b></a><a name="D"><b>D</b></a>' +
                    '<a name="E"><b>E</b></a><a name="F"><b>F</b></a><a name="G"><b>G</b></a> <a name="H"><b>H</b></a>' +
                    '<a name="I"><b>I</b></a><a name="J"><b>J</b></a><a name="K"><b>K</b></a><a name="L"><b>L</b></a>' +
                    '<a name="M"><b>M</b></a><a name="N"><b>N</b></a>' +
                    '</p><p>' +
                    '<a name="O"><b>O</b></a><a name="P"><b>P</b></a><a name="Q"><b>Q</b></a><a name="R"><b>R</b></a>' +
                    '<a name="S"><b>S</b></a><a name="T"><b>T</b></a><a name="U"><b>U</b></a><a name="V"><b>V</b></a>' +
                    '<a name="W"><b>W</b></a><a name="X"><b>X</b></a><a name="Y"><b>Y</b></a><a name="Z"><b>Z</b></a>' +
                    '<a name="1"><b>#</b></a>' +
                    '</p></div> <div class="select_div_mode"> <div class="select_body"></div></div> </div>');
                if (responseJson != null) {
                    for (var k in responseJson) {
                        var docList = responseJson[k];
                        if (docList != "" && docList != null) {
                            $("#" + inputId).next().find('a[name="' + k + '"] b').addClass("haveValue");
                            if (k == "1") {
                                $("#" + inputId).next().find('.select_div_mode .select_body').append('<div id=' + inputId + k + ' name=' + inputId + k + '><span class="span1">#</span></div>');
                            } else {
                                $("#" + inputId).next().find('.select_div_mode .select_body').append('<div id=' + inputId + k + ' name=' + inputId + k + '><span class="span1">' + k + '</span></div>');
                            }
                            for (var i in docList) {
                                {
                                    $("#" + inputId).next().find(".select_div_mode #" + inputId + k + " span").after('<p id=' + inputId + "_" + docList[i].id + '>' + docList[i].value + '</p>');
                                }
                            }
                        }
                    }
                }
            }
        });
        $("#" + inputId + "_random .select_head a").die('click').live('click', function (e) {
            var val = $(this).attr("name");
            var container = $("#" + inputId + "_random .select_div_mode")
            scrollTo = $("#" + inputId + val + ":first");
            container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());
            return;
        });
        $("#" + inputId).off('click').on('click', function (e) {
            if ($(this).val() == "" || $(this).val() == null) {
                $("#" + inputId).attr("data_id", "");
            }
            $("#" + inputId + "_random").toggle();
            stopPropagation(e);
            $("#" + inputId + "_random .select_div_mode p").removeClass("hover");
            var val = $(this).attr("data_id");
            var container = $("#" + inputId + "_random .select_div_mode");
            scrollTo = $("#" + inputId + "_" + val);
            if (scrollTo.length != 0) {
                scrollTo.addClass("hover");
                container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());
            } else {
                container.scrollTop(0)
            }
        });
        $(document).live('click', function () {
            $("#" + inputId + "_random").hide();
        });
        $("#" + inputId + "_random").live('click', function (e) {
            $("#" + inputId + "_random").show();
            stopPropagation(e);
        });
        $("#" + inputId + "_random .select_body p").die('click').live('click', function (e) {
            $("#" + inputId).val($(this).text());
            $("#" + inputId).attr("data_id", $(this).attr("id").split("_")[1]);
            $("#" + inputId + "_random").hide();
            $("#" + inputId).validationEngine('hide');
            $("#" + inputId).trigger('change');
            /*if (fun != null && fun != "") {
             fun();
             }*/
            stopPropagation(e);
        });
    }

    //解除告警信息
    function releaseAlarms(releaseAlarmId, tableId, url) {
        $("#" + releaseAlarmId).on("click", function () {
            var $table = $("#" + tableId);
            var rows = $table.bootstrapTable('getSelections');
            if (rows.length == 0) {
                JoySuccCommon.layerTips("请先选择一条记录", "#" + releaseAlarmId);
                return false;
            }
            layer.alert('确定解除告警吗?', {
                skin: 'layui-layer-molv' //样式类名
            }, function (index1) {
                var idDataAry = [];
                $.each(rows, function (i, obj) {
                    idDataAry.push(obj.id);
                });
                if (idDataAry.length > 0) {
                    $.ajax({
                        type: "POST",
                        url: url,
                        contentType: "application/json",//加入contentType,后端需要用requestBody接受参数,此时的参数不在request里面了
                        data: JSON.stringify(idDataAry),
                        dataType: "json",
                        success: function (responseJson) {
                            if (responseJson.success == true) {//返回true
                                joySuccSweetAlertSuccess(responseJson.msg);
                                var index = layer.index; //获取窗口索引
                                layer.close(index);
                                $table.bootstrapTable('refresh');
                            }
                            if (responseJson.success == false) {//返回false
                                joySuccSweetAlertFail(responseJson.msg);
                                layer.close(index);
                            }
                        },
                        beforeSend: function (XMLHttpRequest) {
                            //请求之前方法增强处理 ,显示遮罩层
                            Metronic.blockUI({target: '#schedulerForm', animate: true});
                        },
                        complete: function (XMLHttpRequest, textStatus) {
                            //请求结束方法增强处理  ,隐藏遮罩层
                            Metronic.unblockUI('#schedulerForm');
                        },
                        error: function (XMLHttpRequest, textStatus) {
                            layer.msg("系统错误,请联系管理员!!");
                        }
                    });
                }
            });
        });
    }

    function releaseThisTableAllAlarms(releaseAlarmId, tableId, url) {
        $("#" + releaseAlarmId).on("click", function () {
            var $table = $("#" + tableId);
            var rows = $table.bootstrapTable('getData');
            if (rows.length == 0) {
                JoySuccCommon.layerTips("请先选择一条记录", "#" + releaseAlarmId);
                return false;
            }
            layer.alert('确定解除当页全部告警吗?', {
                skin: 'layui-layer-molv' //样式类名
            }, function (index1) {
                var idDataAry = [];
                $.each(rows, function (i, obj) {
                    idDataAry.push(obj.id);
                });
                if (idDataAry.length > 0) {
                    $.ajax({
                        type: "POST",
                        url: url,
                        contentType: "application/json",//加入contentType,后端需要用requestBody接受参数,此时的参数不在request里面了
                        data: JSON.stringify(idDataAry),
                        dataType: "json",
                        success: function (responseJson) {
                            if (responseJson.success == true) {//返回true
                                joySuccSweetAlertSuccess(responseJson.msg);
                                ;
                                var index = layer.index; //获取窗口索引
                                layer.close(index);
                                $table.bootstrapTable('refresh');
                            }
                            if (responseJson.success == false) {//返回false
                                joySuccSweetAlertFail(responseJson.msg);
                                layer.close(index);
                            }
                        },
                        beforeSend: function (XMLHttpRequest) {
                            //请求之前方法增强处理 ,显示遮罩层
                            Metronic.blockUI({target: '#schedulerForm', animate: true});
                        },
                        complete: function (XMLHttpRequest, textStatus) {
                            //请求结束方法增强处理  ,隐藏遮罩层
                            Metronic.unblockUI('#schedulerForm');
                        },
                        error: function (XMLHttpRequest, textStatus) {
                            layer.msg("系统错误,请联系管理员!!");
                        }
                    });
                }
            });
        });
    }

    /**
     * 表格多条件搜索,非模糊搜索
     * @param btnSearchId
     * @param tableId
     * @param searchFormId
     */
    var searchTable = function (btnSearchId, tableId, searchFormId) {
        /*
         * 按钮点击搜索
         * */
        $("#" + btnSearchId).on("click", function () {
            var params = $('#' + tableId).bootstrapTable('getOptions');
            params.queryParams = function (params) {
                //定义参数
                var search = {};
                //遍历form 组装json
                $.each($("#" + searchFormId).serializeArray(), function (i, field) {
                    //可以添加提交验证
                    if (null != field.value && "" != field.value) {
                        params[field.name] = field.value;
                    }
                });
                return params;
            }
            $('#' + tableId).bootstrapTable('refresh', params);
        })
        /*
         * 输入框回车搜索
         * */
        $("#" + btnSearchId).keydown(function (event) {
            if (event.keyCode == 13) {
                var params = $('#' + tableId).bootstrapTable('getOptions');
                params.queryParams = function (params) {
                    //定义参数
                    var search = {};
                    //遍历form 组装json
                    $.each($("#" + searchFormId).serializeArray(), function (i, field) {
                        //可以添加提交验证
                        if (null != field.value && "" != field.value) {
                            params[field.name] = field.value;
                        }
                    });
                    return params;
                }
                $('#' + tableId).bootstrapTable('refresh', params);
                return false;
            }

        })

    }
    /**
     * 搜索ztree数节点的方法
     * @param searchId
     * @param treeId
     * */
    var searchZtree = function (searchId, treeId) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        $("#" + searchId).keyup(function () {
            var params = $('#' + searchId).val();
            //如果input框中的值为空，则不搜索
            if (params == "") {
                var nodeList = treeObj.transformToArray(treeObj.getNodes());
                for (var i = 0; i < nodeList.length; i++) {  //遍历节点数组，并递归展开自该节点至根节点的所有父节点
                    nodeList[i].highlight = false;
                    treeObj.updateNode(nodeList[i]);
                }
                return;
            }
            var rootNode = treeObj.getNodes();
            //input框中值变化一次，就要清空以前高亮显示的节点
            var allNodes = treeObj.transformToArray(rootNode);
            for (var i = 0; i < allNodes.length; i++) {  //遍历节点数组，并递归展开自该节点至根节点的所有父节点
                allNodes[i].highlight = false;
                treeObj.updateNode(allNodes[i]);
            }
            //将本次符合搜索条件的节点高亮显示
            var nodeList = treeObj.getNodesByParamFuzzy("name", params, null);
            for (var i = 0; i < nodeList.length; i++) {  //遍历节点数组，并递归展开自该节点至根节点的所有父节点
                OpenParentNode(nodeList[i], treeObj);
                nodeList[i].highlight = true;
                treeObj.updateNode(nodeList[i]);
            }
            function OpenParentNode(node, treeObj) { //递归展开节点及父节点
                //获取当前节点的父节点
                var parentNode = node.getParentNode();
                if (parentNode != null) {
                    //展开父节点
                    treeObj.expandNode(parentNode, true, null, null, null);
                    //继续递归向上查找
                    OpenParentNode(parentNode, treeObj);
                    getFontCss(treeId, node);
                }
            }
        })
    }
    /**
     * 刷新表格方法
     * @param tableId
     */
    var refreshTable = function (tableId) {
        $("#" + tableId).bootstrapTable('refresh');
    }
    /**
     * 初始化基本表格
     * @param tableId
     * @param queryUrl
     * @param columns
     * @returns {jQuery}
     */
    var initTableOption = function (tableId, queryUrl, columns, queryParams, pageList) {
        if (pageList === "" || pageList === null) {
            pageList = [10, 15, 20];
        }
        $('#' + tableId).bootstrapTable({
            method: 'get',
            url: queryUrl,
            cache: false,
            height: "355",
            dataType: "json",
            striped: false,	 //使表格带有条纹
            sortable: true,
            pagination: true,	//在表格底部显示分页工具栏
            pageSize: 15,
            pageNumber: 1,
            pageList: pageList,
            idField: "id",  //标识哪个字段为id主键
            showToggle: false,   //名片格式
            cardView: false,//设置为True时显示名片（card）布局
            singleSelect: false,//复选框只能选择一条记录
            search: false,//是否显示右上角的搜索框
            clickToSelect: true,//点击行即可选中单选/复选框
            sidePagination: "server",//表格分页的位置
            queryParamsType: "", //参数格式,发送标准的RESTFul类型的参数请求
            strictSearch: true,
            showColumns: false,     //是否显示所有的列
            showRefresh: false,     //是否显示刷新按钮
            minimumCountColumns: 2,    //最少允许的列数
            queryParams: queryParams,
            responseHandler: function (res) {
                return {
                    "rows": res.dataList,
                    "total": res.total
                };
            },
            silent: true,  //刷新事件必须设置
            formatNoMatches: function () {  //没有匹配的结果
                return '无符合条件的记录';
            },
            rowStyle: function (row, index) {
                return {classes: "cursorHand"}
            },
            columns: columns,
            d: function () {

            }
        });
    }

    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }

    /**
     * 初始化基本表格  不分页
     * @param tableId
     * @param queryUrl
     * @param columns
     * @param queryParams   查询条件
     * @returns {jQuery}
     */
    var initTableOptionNoPage = function (tableId, queryUrl, columns, queryParams) {
        $('#' + tableId).bootstrapTable({
            method: 'GET',
            url: queryUrl,
            cache: false,
            dataType: "json",
            striped: false,	 //使表格带有条纹
            sortable: true,
            pagination: false,	//在表格底部显示分页工具栏
            idField: "id",  //标识哪个字段为id主键
            uniqueId: "uuid",
            showToggle: false,   //名片格式
            cardView: false,//设置为True时显示名片（card）布局
            singleSelect: false,//复选框只能选择一条记录
            search: false,//是否显示右上角的搜索框
            clickToSelect: true,//点击行即可选中单选/复选框
            sidePagination: "server",//表格分页的位置
            queryParamsType: "", //参数格式,发送标准的RESTFul类型的参数请求
            strictSearch: true,
            showColumns: false,     //是否显示所有的列
            showRefresh: false,     //是否显示刷新按钮
            minimumCountColumns: 2,    //最少允许的列数
            queryParams: queryParams,
            responseHandler: function (res) {
                return {
                    "rows": res.dataList,
                    "total": res.total
                };
            },
            silent: true,  //刷新事件必须设置
            formatNoMatches: function () {  //没有匹配的结果
                return '无符合条件的记录';
            },
            rowStyle: function (row, index) {
                return {classes: "cursorHand"}
            },
            columns: columns,
            d: function () {

            }
        });
    }
    /**
     * input 组件右边叉叉事件注册
     */
    var joySuccInputX = function () {
        $(".fa-times").click(function () {
            $(this).next().val("");
        })
    }

    /**
     * 点击重置按钮,弹出重置页面的事件
     * @param formId 表单id
     * @param resetId 重置按钮ID
     */
    function joySuccReset(formId, resetId, fun) {
        //重置单击事件
        $("#" + resetId).on("click", function () {
            layer.alert('确定重置吗?', {
                skin: 'layui-layer-molv' //样式类名
            }, function (index) {
                $("#" + formId)[0].reset();
                $("#" + formId).validationEngine("hideAll");
                if (fun != null && fun != "") {
                    fun();
                }
                layer.close(index);
            });
        });
    }

    function getFontCss(treeNode) {//"#A60000"
        return (!!treeNode.highlight) ? {color: "#A60000", "font-weight": "bold"} : {
            color: "#00bfa8",
            "font-weight": "normal"
        };
    }

    /**
     * 页面初始化时加载三级联动下拉框
     * @param firstId 第一级下拉框id
     * @param secondId 第二级下拉框id
     */
    function selectDictionaryStart(firstId, secondId, secondType) {
        $.ajax({
            type: 'POST',
            cache: false,
            url: root + "/bi/equipment/selectDictionary?dicId=" + $("#" + firstId).val(),
            success: function (responseJson) {
                var obj = responseJson.obj;
                $("#" + secondId).append("<option></option>");//添加option
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].id != 0) {//拼接设备分类的option
                        $("#" + secondId).append("<option value='" + obj[i].dicInfoCode + "'>" + obj[i].dicInfoName + "</option>");//添加option
                    }
                }
                if (secondType != "") {
                    $("#" + secondId).find("option[value='" + secondType + "']").attr("selected", true);//修改时确定之前所选的下拉框
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                parent.layer.msg("系统错误,请联系管理员!!");
            }
        });
    }

    function getAreaS(AreaId, roomId) {
        $.ajax({
            url: root + "/sm/positionInformation/getAllAreas?roomId=" + roomId,
            success: function (data) {
                if (data != null) {
                    $("#" + AreaId).empty();
                    $("#" + AreaId).append("<option></option>");
                    for (var i in data) {
                        $("#" + AreaId).append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
                    }
                }
            }
        });
    }

    function selectSystemName(systemNameId) {
        $.ajax({
            type: 'POST',
            cache: false,
            url: root + "/bi/equipment/selectDictionary?dicId=A83DFE4AF5DE4DCE9B2C5919BBE0574C",
            success: function (responseJson) {
                $("#" + systemNameId).empty();//清空option
                $("#" + systemNameId).append("<option></option>");
                var obj = responseJson.obj;
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].id != 0) {//拼接设备类型的option
                        $("#" + systemNameId).append("<option value='" + obj[i].dicInfoCode + "'>" + obj[i].dicInfoName + "</option>");//添加option
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                parent.layer.msg("系统错误,请联系管理员!!");
            }
        });
    }

    /**
     * 页面初始化时加载三级联动下拉框
     * @param thirdId 第三级下拉框id
     * @param secondId 第二级下拉框id
     */
    function selectDictionary(secondId, thirdId, secondType, thirdType) {
        if (secondType != "" && thirdType != "") {
            $.ajax({
                type: 'POST',
                cache: false,
                url: root + "/bi/equipment/selectDictionary?dicId=" + secondType,
                success: function (responseJson) {
                    $("#" + thirdId).empty();//清空option
                    var obj = responseJson.obj;
                    $("#" + thirdId).append("<option></option>");//添加option
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].id != 0) {//拼接设备类型的option
                            $("#" + thirdId).append("<option value='" + obj[i].dicInfoCode + "'>" + obj[i].dicInfoName + "</option>");//添加option
                        }
                    }
                    $("#" + thirdId).find("option[value='" + thirdType + "']").attr("selected", true);//修改时确定之前所选的下拉框
                },
                error: function (XMLHttpRequest, textStatus) {
                    parent.layer.msg("系统错误,请联系管理员!!");
                }
            });
        }
        $("#" + secondId).on("change", function () {
            $.ajax({
                type: 'POST',
                cache: false,
                url: root + "/bi/equipment/selectDictionary?dicId=" + $("#" + secondId).val(),
                success: function (responseJson) {
                    $("#" + thirdId).empty();//清空option
                    var obj = responseJson.obj;
                    $("#" + thirdId).append("<option></option>");//添加option
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].id != 0) {//拼接设备类型的option
                            $("#" + thirdId).append("<option value='" + obj[i].dicInfoCode + "'>" + obj[i].dicInfoName + "</option>");//添加option
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus) {
                    parent.layer.msg("系统错误,请联系管理员!!");
                }
            });
        });
    }

    /**
     * 点击关闭按钮,弹出关闭页面的事件
     * @param closeId 取消按钮ID
     */
    function joySuccClose(closeId) {
        //重置单击事件
        $("#" + closeId).on("click", function () {
            layer.alert('确定取消吗?', {
                skin: 'layui-layer-molv' //样式类名
            }, function (index) {
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);
            });
        });
    }

    /**
     * 删除事件
     * @param deleteId:删除按钮Id
     * @param url:地址
     * @param libTable:表单
     */
    function joySuccDelete(deleteId, url, table, opt) {
        //注册单击事件
        $("#" + deleteId).on("click", function () {
            var rows = table.bootstrapTable('getSelections');
            if (rows.length == 0) {
                JoySuccCommon.layerTips("请先选择一条记录", "#" + deleteId);
                return false;
            }
            layer.alert('确定删除吗?', {
                skin: 'layui-layer-molv' //样式类名
            }, function (index1) {
                var idDataAry = [];
                $.each(rows, function (i, obj) {
                    idDataAry.push(obj.id);
                });
                if (idDataAry.length > 0) {
                    $.ajax({
                        type: 'DELETE',
                        url: url,
                        contentType: "application/json",//加入contentType,后端需要用requestBody接受参数,此时的参数不在request里面了
                        data: JSON.stringify(idDataAry),
                        dataType: "json",
                        success: function (responseJson) {
                            if (responseJson.success == true) {
                                layer.close(index1);
                                joySuccSweetAlertSuccess(responseJson.msg);
                                //joySuccLayerMsg(index,responseJson.msg);
                                table.bootstrapTable('refresh', opt);
                            } else {
                                layer.close(index1);
                                joySuccSweetAlertFail(responseJson.msg);
                            }
                        },
                        error: function (response) {
                            layer.msg("系统错误,请联系管理员!!");
                        }
                    });
                }
            });
        });
    }

    /**
     * 非弹窗删除事件
     * @param deleteId:删除按钮Id
     * @param url:地址
     * @param libTable:表单
     */
    function joySuccNonPopFormDelete(deleteId, url, table) {
        //注册单击事件
        $("#" + deleteId).on("click", function () {
            var rows = table.bootstrapTable('getSelections');
            if (rows.length == 0) {
                JoySuccCommon.layerTips("请先选择一条记录", "#" + deleteId);
                return false;
            }
            layer.alert('确定删除吗?', {
                skin: 'layui-layer-molv' //样式类名
            }, function (index1) {
                var idDataAry = [];
                $.each(rows, function (i, obj) {
                    idDataAry.push(obj.id);
                });
                if (idDataAry.length > 0) {
                    $.ajax({
                        type: 'DELETE',
                        url: url,
                        contentType: "application/json",//加入contentType,后端需要用requestBody接受参数,此时的参数不在request里面了
                        data: JSON.stringify(idDataAry),
                        dataType: "json",
                        success: function (responseJson) {
                            if (responseJson.success == true) {
                                layer.close(index1);
                                joySuccSweetAlertSuccess(responseJson.msg);
                                $("#reportName").val("");
                                $("#reportConditionId tbody").html("");
                                $("#columnDisplayId tbody").html("");
                                table.bootstrapTable('refresh');
                            } else {
                                layer.close(index1);
                                joySuccSweetAlertFail(responseJson.msg);
                            }
                        },
                        error: function (response) {
                            layer.msg("系统错误,请联系管理员!!");
                        }
                    });
                }
            });
        });
    }

    function joySuccPSweetAlertSuccess(title) {
        parent.swal({
            title: title,
            type: "success",
            customClass: "joySuccSweetAlert",
            showConfirmButton: false,
            timer: 1000
        });
    }

    function joySuccPSweetAlertFail(title) {
        parent.swal({
            title: title,
            type: "error",
            customClass: "joySuccSweetAlert",
            showConfirmButton: false,
            timer: 1000
        });
    }

    function joySuccSweetAlertSuccess(title) {
        swal({
            title: title,
            type: "success",
            customClass: "joySuccSweetAlert",
            showConfirmButton: false,
            timer: 1000
        });
    }

    function joySuccSweetAlertFail(title) {
        swal({
            title: title,
            type: "error",
            customClass: "joySuccSweetAlert",
            showConfirmButton: false,
            timer: 1000
        });
    }

    function joySuccFormValidateCilent(formId) {
        $("#" + formId).validationEngine('attach', {
            promptPosition: "bottomLeft",
            showOneMessage: true,
            validationEventTrigger: "keyup blur",
            scroll: true,
            onFieldFailure: function () {
                return;
            }
        });
    }

    /**
     * 表单验证绑定:这里增加和修改都放在一起,业务逻辑可以按照操作进行区分
     * @param url 地址
     * @param method 请求方法
     * @param formId 表单id
     */
    function joySuccFormValidate(url, method, formId, cancelFunction) {
        $("#" + formId).validationEngine('attach', {
            promptPosition: "bottomLeft",
            showOneMessage: true,
            validationEventTrigger: "keyup blur",
            scroll: true,
            onValidationComplete: function (form, status) {
                //如果校验成功
                if (status) {
                    //墨绿深蓝风
                    layer.alert('确认提交?', {
                        skin: 'layui-layer-molv',//样式类名
                    }, function (index1) {
                        if(cancelFunction!=null&&cancelFunction!=""){
                            cancelFunction();
                        }
                        $.ajax({
                            type: method,
                            cache: false,
                            url: url,
                            data: $("#" + formId).serialize(),
                            success: function (responseJson) {
                                if (responseJson.success == true) {//返回true
                                    joySuccPSweetAlertSuccess(responseJson.msg);
                                    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                                    parent.layer.close(index);
                                }
                                if (responseJson.success == false) {//返回false
                                    //joySuccLayerMsg(index,responseJson.msg);
                                    joySuccSweetAlertFail(responseJson.msg);
                                    layer.close(index1);
                                }
                            },
                            beforeSend: function (XMLHttpRequest) {
                                //请求之前方法增强处理 ,显示遮罩层
                                Metronic.blockUI({target: '#' + formId, animate: true});
                                //var index = layer.index; //获取窗口索引
                                //layer.close(index);
                                //Metronic.blockUI({animate: true});
                            },
                            complete: function (XMLHttpRequest, textStatus) {
                                //请求结束方法增强处理  ,隐藏遮罩层
                                Metronic.unblockUI('#' + formId);
                                //Metronic.unblockUI('#overlay');
                            },
                            error: function (XMLHttpRequest, textStatus) {
                                parent.layer.msg("系统错误,请联系管理员!!");
                            }
                        });
                    });
                }
            },
        });
    }

    /** 提示文字与上一个不同   确认保存*/
    function joySuccFormValidate2(url, method, formId) {
        $("#" + formId).validationEngine('attach', {
            promptPosition: "bottomLeft",
            showOneMessage: true,
            validationEventTrigger: "keyup blur",
            scroll: true,
            onValidationComplete: function (form, status) {
                //如果校验成功
                if (status) {
                    //墨绿深蓝风
                    layer.alert('确认保存?', {
                        skin: 'layui-layer-molv' //样式类名
                    }, function (index1) {
                        $.ajax({
                            type: method,
                            cache: false,
                            url: url,
                            data: $("#" + formId).serialize(),
                            success: function (responseJson) {
                                if (responseJson.success == true) {//返回true
                                    joySuccPSweetAlertSuccess(responseJson.msg);
                                    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                                    parent.layer.close(index);
                                }
                                if (responseJson.success == false) {//返回false
                                    //joySuccLayerMsg(index,responseJson.msg);
                                    joySuccSweetAlertFail(responseJson.msg);
                                    layer.close(index1);
                                }
                            },
                            beforeSend: function (XMLHttpRequest) {
                                //请求之前方法增强处理 ,显示遮罩层
                                Metronic.blockUI({target: '#' + formId, animate: true});
                            },
                            complete: function (XMLHttpRequest, textStatus) {
                                //请求结束方法增强处理  ,隐藏遮罩层
                                Metronic.unblockUI('#' + formId);
                            },
                            error: function (XMLHttpRequest, textStatus) {
                                parent.layer.msg("系统错误,请联系管理员!!");
                            }
                        });
                    });
                }
            }
        });
    }

    /** 编辑和列表展示页在同一页面的通用*/
    function joySuccFormValidate3(url, method, formId, $table, fun) {
        $("#" + formId).validationEngine('attach', {
            promptPosition: "bottomLeft",
            showOneMessage: true,
            validationEventTrigger: "keyup blur",
            scroll: true,
            onValidationComplete: function (form, status) {
                //如果校验成功
                if (status) {
                    //墨绿深蓝风
                    layer.alert('确认提交?', {
                        skin: 'layui-layer-molv' //样式类名
                    }, function (index1) {
                        $.ajax({
                            type: method,
                            cache: false,
                            url: url,
                            data: $("#" + formId).serialize(),
                            success: function (responseJson) {
                                if (responseJson.success == true) {//返回true
                                    joySuccPSweetAlertSuccess(responseJson.msg);
                                    var index = layer.index; //获取窗口索引
                                    layer.close(index1);
                                    if ($table != null && $table != '') {
                                        $table.bootstrapTable('refresh');
                                    }
                                }
                                if (responseJson.success == false) {//返回false
                                    joySuccPSweetAlertFail(responseJson.msg);
                                    layer.close(index1);
                                }
                                if (fun != null && fun != "") {
                                    fun();
                                }
                            },
                            beforeSend: function (XMLHttpRequest) {
                                //请求之前方法增强处理 ,显示遮罩层
                                Metronic.blockUI({target: '#' + formId, animate: true});
                            },
                            complete: function (XMLHttpRequest, textStatus) {
                                //请求结束方法增强处理  ,隐藏遮罩层
                                Metronic.unblockUI('#' + formId);
                            },
                            error: function (XMLHttpRequest, textStatus) {
                                layer.msg("系统错误,请联系管理员!!");
                            }
                        });
                    });
                }
            }
        });
    }

    function reportOldView() {
        $("#id").val("");
        $("#reportName").val("");
        $("#reportConditionId tbody").html("");
        $("#columnDisplayId tbody").html("");
    }

    function reportNewView() {
        $(".addShow").hide();//添加时显示
        $(".editorShow").hide();//修改时显示
        $(".formtips").remove();
        $("#reportNewId").val("");
        $("#reportNameId").val("");
        $("#checkbox-10-1").attr('checked', false);
        $("#checkbox-10-2").attr('checked', false);
        $("#reportCycleId").find("option[value='3']").attr("selected", true);
        $("#email").val("");
        $("#reportCycleId").attr("disabled", "disabled");
        $("#email").attr("disabled", "disabled");
        $("#summaryFieldId").empty();
        $("#filedShowTable").bootstrapTable('removeAll');
        $("#screenTable").bootstrapTable('removeAll');
    }

    /**
     * 非弹出表单验证绑定:这里增加和修改都放在一起,业务逻辑可以按照操作进行区分
     * @param url 地址
     * @param method 请求方法
     * @param formId 表单id
     */
    function joySuccNonPopFormValidate(url, method, formId, table) {
        $("#" + formId).validationEngine('attach', {
            promptPosition: "bottomLeft",
            showOneMessage: true,
            validationEventTrigger: "keyup blur",
            scroll: true,
            onValidationComplete: function (form, status) {
                //如果校验成功
                if (status) {
                    //墨绿深蓝风
                    layer.alert('确认提交?', {
                        skin: 'layui-layer-molv' //样式类名
                    }, function (index1) {
                        $.ajax({
                            type: method,
                            cache: false,
                            url: url,
                            data: $("#" + formId).serialize(),
                            success: function (responseJson) {
                                if (responseJson.success == true) {//返回true
                                    joySuccPSweetAlertSuccess(responseJson.msg);
                                    table.bootstrapTable('refresh');
                                    reportOldView();
                                    // reportNewView();
                                    var index = layer.index; //获取当前弹层的索引号
                                    layer.close(index); //关闭当前弹层
                                }
                                if (responseJson.success == false) {//返回false
                                    joySuccSweetAlertFail(responseJson.msg);
                                    layer.close(index1);
                                }
                            },
                            beforeSend: function (XMLHttpRequest) {
                                //请求之前方法增强处理 ,显示遮罩层
                                Metronic.blockUI({target: '#' + formId, animate: true});
                            },
                            complete: function (XMLHttpRequest, textStatus) {
                                //请求结束方法增强处理  ,隐藏遮罩层
                                Metronic.unblockUI('#' + formId);
                            },
                            error: function (XMLHttpRequest, textStatus) {
                                parent.layer.msg("系统错误,请联系管理员!!");
                            }
                        });
                    });
                }
            }
        });
    }

    function joySuccParentLayerMsg(msg) {
        parent.layer.msg(msg);
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index);
    }

    function joySuccLayerMsg(index, msg) {
        layer.msg(msg);
        layer.close(index);
    }

    /**
     * 富文本编辑器
     * @param viewId
     * @param hiddenId
     */
    function joySuccSummernote(viewId, hiddenId, oldWorkContent) {
        $('#' + viewId).summernote({
            height: 150 + 'px',
            lang: 'zh-CN',
            toolbar: [
                ['style', ['clear']],
                ['para', ['ul', 'ol', 'paragraph']]],
            callbacks: {
                onBlur: function (a) {
                    var str = $('#' + viewId).summernote('code');
                    if (str.indexOf("<br>") > -1) {
                        str = str.replace("<br>", "<br/>");
                    }
                    $("#" + hiddenId).val(str);
                },
                onInit: function () {
                    $('#' + viewId).summernote('code', oldWorkContent);
                    $('#' + hiddenId).val(oldWorkContent);

                    // $('#'+viewId).summernote('disable');
                }
            }

        });
    }

    /**
     * 富文本编辑器只读
     * @param viewId
     * @param hiddenId
     */
    function joySuccSummernoteReadOnly(viewId, content) {
        $('#' + viewId).summernote({
            toolbar: false,
            lang: 'zh-CN',
            callbacks: {
                onInit: function () {
                    $('#' + viewId).summernote('code', content);
                    $('#' + viewId).summernote('disable');
                }
            }

        });
    }

    /**
     * 当前日期为准,忘前后推时间
     * @param day
     * @returns {string}
     */
    function getDay(day) {
        var today = new Date();

        var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

        today.setTime(targetday_milliseconds); //注意，这行是关键代码

        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = doHandleMonth(tMonth + 1);
        tDate = doHandleMonth(tDate);
        return tYear + "-" + tMonth + "-" + tDate;
    }

    function doHandleMonth(month) {
        var m = month;
        if (month.toString().length == 1) {
            m = "0" + month;
        }
        return m;
    }

    var joySuccToastr = function (info, title, type, endFn) {//系统Success提示
        toastr.options = {
            "closeButton": true, "debug": false, "positionClass": "toast-top-right", "onclick": null,
            "showDuration": "1000", "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000",
            "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut",
            "onHidden": endFn
        };
        switch (type) {
            case "success"://成功
                toastr.success(info, title);
                break;
            case "error"://出错
                toastr.error(info, title);
                break;
            case "info"://提示
                toastr.info(info, title);
                break;
            case "warning"://警告
                toastr.warning(info, title);
                break;
            default:
                toastr.error(info, title);
        }
    }
    //系统ajax从框架的左页面点击,在有页面显示页面的方法
    var getHtmlPageData = function (pageURL, data, classAttr) {
        if (null == classAttr || "" == classAttr) {
            classAttr = "page-content";
        }
        $.ajax({
            url: pageURL,
            data: data,
            dataType: "html",
            success: function (htmlData) {
                $("." + classAttr).html(htmlData);
            },
            beforeSend: function (XMLHttpRequest) {
                // 显示遮罩层
                Metronic.blockUI({target: '.' + classAttr, animate: true});
            },
            complete: function (XMLHttpRequest, textStatus) {
                //请求结束方法增强处理  ,隐藏遮罩层
                Metronic.unblockUI('.' + classAttr);
                //主页面默认显示位置
                $(".page-footer").find(".icon-arrow-up").click();
                $("body").css("overflow", "auto");
            },
            error: function (response) {
                $("." + classAttr).html(response.responseText);
            }
        });
    }
    //系统左侧菜单选中变化
    var joySuccLeftMenu = function () {
        $(".page-sidebar-menu").on('click', 'a[ajax=true]', function () {
            var $this = $(this);
            $(".page-sidebar-menu").find("li").removeClass("active");
            $this.closest("li").addClass("active");
            var level = $this.attr("level");
            var li;
            var titleStr = "&nbsp;>&nbsp;" + $this.text().trim();
            switch (level) {
                case '2'://二级菜单
                    var secondAValue = $($this.closest("ul").closest("li").children("a").get(0));
                    titleStr = secondAValue.text().trim() + "<small>" + titleStr + "</small>";
                    li = $this.closest("ul").closest("li");
                    break;
                case '3'://三级菜单
                    var secondAValue = $($this.closest("ul").closest("li").children("a").get(0));
                    titleStr = "<small> &nbsp;>&nbsp;" + secondAValue.text().trim() + titleStr + "</small>";
                    var firstAValue = $($this.closest("ul").closest("li").closest("ul").closest("li").children("a").get(0));
                    titleStr = firstAValue.text().trim() + titleStr;
                    li = $this.closest("ul").closest("li").closest("ul").closest("li");
                    break;
                default:

            }
            if (li) {
                li.addClass("active");
                li.find(".selected").remove();
                li.find(".title").after("<span class='selected' />");
                $("#titleContentVal").html(titleStr);
                //$(".scroll-to-top").click();
            }
        });

        $(".page-sidebar-menu").on('click', 'a[iframeuse=true]', function () {
            var $this = $(this);
            $(".page-sidebar-menu").find("li").removeClass("active");
            $this.closest("li").addClass("active");
            var level = $this.attr("level");
            var li;
            var titleStr = "&nbsp;>&nbsp;" + $this.text().trim();
            switch (level) {
                case '2'://二级菜单
                    var secondAValue = $($this.closest("ul").closest("li").children("a").get(0));
                    titleStr = secondAValue.text().trim() + "<small>" + titleStr + "</small>";
                    li = $this.closest("ul").closest("li");
                    break;
                case '3'://三级菜单
                    var secondAValue = $($this.closest("ul").closest("li").children("a").get(0));
                    titleStr = "<small> &nbsp;>&nbsp;" + secondAValue.text().trim() + titleStr + "</small>";
                    var firstAValue = $($this.closest("ul").closest("li").closest("ul").closest("li").children("a").get(0));
                    titleStr = firstAValue.text().trim() + titleStr;
                    li = $this.closest("ul").closest("li").closest("ul").closest("li");
                    break;
                default:

            }
            if (li) {
                li.addClass("active");
                li.find(".selected").remove();
                li.find(".title").after("<span class='selected' />");
                $("#titleContentVal").html(titleStr);
                //$(".scroll-to-top").click();
            }
        });
        // //绑定左侧菜单
        // $(".page-sidebar-menu").off("click","li > a").on("click","li > a",function(){
        //     var $this=$(this);
        //     //判断点击的为一级目录
        //     if ($this.attr('href').toLowerCase() === 'javascript:;' || $this.attr('href').toLowerCase() === '#') {
        //
        //     }else {
        //         //选中子菜单
        //         var pageURL=$(this).attr("href");
        //         JoySuccCommon.getPageData(pageURL);
        //         $(".page-sidebar-menu").find("li").removeClass("active");
        //         $(this).closest("li").addClass("active");
        //         var li;
        //         if($this.attr("data-class")=="thirdFunction"){
        //             li = $(this).closest("ul").closest("li").closest("ul").closest("li");
        //         }else{
        //             li = $(this).closest("ul").closest("li");
        //         }
        //         li.addClass("active");
        //         li.find(".selected").remove();
        //         li.find(".title").after("<span class='selected' />");
        //         return false;
        //     }
        // });
    }
    //checkbox样式//系统单选按钮radio//这两个字一个文件
    //文档http://icheck.fronteed.com/
    function joySuccCheckAndRadio() {
        $('input').iCheck({
            checkboxClass: 'icheckbox_flat-grey',
            radioClass: 'iradio_flat-grey'
        });
    }

    function select2InitAjax(selectId, ajaxUrl, isSearch, isICon) {
        $("#" + selectId).select2({
            theme: "bootstrap",
            placeholder: "请选择",
            tags: true,
            ajax: {
                url: ajaxUrl,
                processResults: function (data, page) {
                    console.log(data);
                    var parsed = data;
                    var arr = [];
                    for (var x in parsed) {
                        arr.push(parsed[x]); //这个应该是个json对象
                    }
                    console.log(arr);
                    return {
                        results: arr
                    };
                }
            },
            formatResult: function (state) {
                if (!state.id) {
                    return state.text; // optgroup
                }
                if (isICon) {
                    return "<img class='flag' src='" + Metronic.getGlobalImgPath() + "flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;

                } else {
                    return state.text;
                }
            },
            formatSelection: function (state) {
                if (!state.id) {
                    return state.text; // optgroup
                }
                if (isICon) {
                    return "<img class='flag' src='" + Metronic.getGlobalImgPath() + "flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;

                } else {
                    return state.text;
                }
            }
        });
    }

    function select2InitStatic(selectId, isSearch, isICon) {
        $("#" + selectId).select2({
            placeholder: "请选择",
            allowClear: true,
            formatResult: function () {
                if (!state.id) {
                    return state.text; // optgroup
                }
                if (isICon) {
                    return "<img class='flag' src='" + Metronic.getGlobalImgPath() + "flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;

                } else {
                    return state.text;
                }
            },
            formatSelection: function () {
                if (!state.id) {
                    return state.text; // optgroup
                }
                if (isICon) {
                    return "<img class='flag' src='" + Metronic.getGlobalImgPath() + "flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;

                } else {
                    return state.text;
                }
            },
            escapeMarkup: function (m) {
                return m;
            }
        });
    }

    /**
     *
     * @param selectId
     * @param ajaxUrl
     * @param isSearch
     * @param isICon
     */
    function select2Init(selectId, ajaxUrl, isSearch, isICon) {
        if (ajaxUrl) {//ajax请求
            select2InitAjax(selectId, ajaxUrl, isSearch, isICon);
        } else {//非ajax请求
            select2InitStatic(selectId, isSearch, isICon)
        }
    }

    //查询所有用户有权限的机房
    function getAllAllroomByUser(selectId, value, fun) {
        $.ajax({
            type: 'GET',
            cache: false,
            url: root + "/sm/positionInformation/allroom",
            success: function (responseJson) {
                if (responseJson != null) {//返回false
                    $("#" + selectId).empty();
                    $("#" + selectId).append("<option></option>");
                    for (var i = 0; i < responseJson.length; i++) {
                        $("#" + selectId).append("<option value='" + responseJson[i].id + "'>" + responseJson[i].name + " </option>");
                    }
                    if (value != null) {
                        $("#" + selectId).find("option[value='" + value + "']").attr("selected", true);
                    }
                    if (fun != null && fun != "") {
                        fun();
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                parent.layer.msg("系统错误,请联系管理员!!");
            }
        });
    }

    function getAllAllOnlyRoom(selectId, value, fun) {
        $.ajax({
            type: 'GET',
            cache: false,
            url: root + "/sm/positionInformation/allroomOnlyRoom",
            success: function (responseJson) {
                if (responseJson != null) {//返回false
                    $("#" + selectId).empty();
                    $("#" + selectId).append("<option></option>");
                    for (var i = 0; i < responseJson.length; i++) {
                        $("#" + selectId).append("<option value='" + responseJson[i].id + "'>" + responseJson[i].name + " </option>");
                    }
                    if (value != null) {
                        $("#" + selectId).find("option[value='" + value + "']").attr("selected", true);
                    }
                    if (fun != null && fun != "") {
                        fun();
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                parent.layer.msg("系统错误,请联系管理员!!");
            }
        });
    }

    //根据机房ID查询所有区域
    function getAllAllAreaByRoomId(roomId, selectId, value, fun) {
        $.ajax({
            url: root + "/sm/positionInformation/getAllAreas?roomId=" + roomId,
            success: function (responseJson) {
                if (responseJson != null) {
                    $("#" + selectId).empty();
                    $("#" + selectId).append("<option></option>");
                    for (var i = 0; i < responseJson.length; i++) {
                        $("#" + selectId).append("<option value='" + responseJson[i].id + "'>" + responseJson[i].name + " </option>");
                    }
                    if (value != null) {
                        $("#" + selectId).find("option[value='" + value + "']").attr("selected", true);
                    }
                    if (fun != null && fun != "") {
                        fun();
                    }
                }
            }
        });
    }

    //根据父ID查询数据字典所有子节点
    function getInfoInSysDicByParentCode(parentcode, selectId, value, fun) {
        $.ajax({
            type: 'POST',
            cache: false,
            url: root + "/bi/equipment/selectDictionary?dicId=" + parentcode,
            success: function (responseJson) {
                if (responseJson.obj != null) {
                    $("#" + selectId).empty();//清空option
                    $("#" + selectId).append("<option></option>");
                    var obj = responseJson.obj;
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].id != 0) {//拼接设备类型的option
                            $("#" + selectId).append("<option value='" + obj[i].dicInfoCode + "'>" + obj[i].dicInfoName + "</option>");//添加option
                        }
                    }
                    if (value != null) {
                        $("#" + selectId).find("option[value='" + value + "']").attr("selected", true);
                    }
                    if (fun != null && fun != "") {
                        fun();
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                parent.layer.msg("系统错误,请联系管理员!!");
            }
        });
    }

    //查询所有部门信息
    function getAllDepInfo(selectId, value, fun) {
        $.ajax({
            type: 'POST',
            cache: false,
            url: root + "/bi/assets/getAllDep",
            success: function (responseJson) {
                $("#" + selectId).empty();//清空option
                $("#" + selectId).append("<option></option>");
                var obj = responseJson.obj;
                for (var i = 0; i < obj.length; i++) {
                    $("#" + selectId).append("<option value='" + obj[i].id + "'>" + obj[i].depName + "</option>");//添加option
                }
                if (value != null) {
                    $("#" + selectId).find("option[value='" + value + "']").attr("selected", true);
                }
                if (fun != null && fun != "") {
                    fun();
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                parent.layer.msg("系统错误,请联系管理员!!");
            }
        });
    }

    //根据部门信息查询所有用户
    function getUserInfoByDepId(depId, selectId, value, fun) {
        $.ajax({
            type: 'POST',
            cache: false,
            url: root + "/bi/assets/getUsersByDepId?depId=" + depId,
            success: function (responseJson) {
                $("#" + selectId).empty();//清空option
                $("#" + selectId).append("<option></option>");
                var obj = responseJson.obj;
                for (var i = 0; i < obj.length; i++) {
                    $("#" + selectId).append("<option value='" + obj[i].loginName + "'>" + obj[i].userName + "</option>");//添加option
                }
                if (value != null) {
                    $("#" + selectId).find("option[value='" + value + "']").attr("selected", true);
                }
                if (fun != null && fun != "") {
                    fun();
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                parent.layer.msg("系统错误,请联系管理员!!");
            }
        });

    }

    var initDateRange = function (divId) {
        if (!jQuery().daterangepicker) {
            return;
        }
        var defaultDateRange = $('#' + divId + ' span').html();
        // var date = new Date();
        // var startDateString = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
        var dateRange = defaultDateRange.split("-");
        var startDate = new Date(dateRange[0]);
        var endDate = new Date(dateRange[1]);
        $('#' + divId).daterangepicker({
                opens: (Metronic.isRTL() ? 'right' : 'left'),
                startDate: startDate,
                endDate: endDate,
                minDate: new Date('1970/01/01'),
                maxDate: moment(),
                dateLimit: {
                    days: 60
                },
                showDropdowns: true,
                showWeekNumbers: true,
                timePicker: false,
                timePickerIncrement: 1,
                timePicker12Hour: false,
                ranges: {
                    '今日': [moment(), moment()],
                    '昨日': [moment().subtract('days', 1), moment().subtract('days', 1)],
                    '最近7日': [moment().subtract('days', 6), moment()],
                    '最近30日': [moment().subtract('days', 29), moment()],
                    '本月': [moment().startOf('month'), moment().endOf('month')],
                    '上月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                buttonClasses: ['btn btn-sm'],
                applyClass: ' blue',
                cancelClass: 'default',
                separator: ' to ',
                locale: {
                    format: 'YYYY/MM/DD',
                    separator: " -222 ",
                    applyLabel: '应用',
                    cancelLabel: "取消",
                    fromLabel: '起始时间',
                    toLabel: '结束时间',
                    customRangeLabel: '自定义',
                    daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
                    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    firstDay: 1
                }
            },
            function (start, end) {
                $('#' + divId + ' span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
            }
        );

        // $('#'+divId+' span').html(moment().subtract('years', 1).format('YYYY/MM/DD') + ' - ' + moment().format('YYYY/MM/DD'));
        $('#' + divId + ' span').html(defaultDateRange);
        $('#' + divId).show();

    }

    function ininDate(datetimepicker) {
        $("." + datetimepicker).datetimepicker('remove');
        $('.' + datetimepicker).datetimepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            //startDate:new Date(),
            autoclose: true,
            startView: 2,
            minView: 2,
            forceParse: false,
            language: 'zh-CN',
            minuteStep: 10,
            todayBtn: true,//今日按钮
            pickerPosition: "bottom-left"
        });
    }

    //转换服务器时区时间
    function getLocalTimeZone(t, utc) {
        //t传入的时间参数,utc传入的时区参数
        if (!t) return;
        //获取本地时间
        var d = new Date();
        //获得本地时区
        utc = utc ? parseFloat(utc) : d.getTimezoneOffset() / 60;
        //格式化传入时间
        var time = new Date(t);
        //转换传入时间为本地时间（默认传入服务器时间为东八区时间）
        time.setHours(time.getHours() + utc);
        //输出时间
        var yy = time.getFullYear();
        var MM = time.getMonth() + 1;
        MM = MM < 10 ? '0' + MM : MM;
        var dd = time.getDate();
        dd = dd < 10 ? '0' + dd : dd;
        var hh = time.getHours();
        hh = hh < 10 ? '0' + hh : hh;
        var mm = time.getMinutes();
        mm = mm < 10 ? '0' + mm : mm;
        var date = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm;
        return date;
    }

    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    return {
        /**
         * 流程定义编码
         */

        //main function to initiate the module
        init: function () {
            //绑定左侧带单击事件,跳转的地址和菜单选中变化
            joySuccLeftMenu();
        },
        JgetSelectInfo: function (url, inputId, params, fun) {
            getSelectInfo(url, inputId, params, fun);
        },
        jconfirmation: function () {
            joySuccConfirmation();
        },
        checkAndRadio: function () {
            joySuccCheckAndRadio();
        },
        getPageData: function (pageUrl, data, classAttr) {
            getHtmlPageData(pageUrl, data, classAttr);
        },
        jsucessToastr: function (info, title, type, endFn) {
            //系统提示
            joySuccToastr(info, title, type, endFn)
        },
        jInputX: function () {
            //输入框右边叉叉
            joySuccInputX();
        },
        getDay: function (day) {
            return getDay(day);
        },
        summernote: function (viewId, hiddenId, oldWorkContent) {
            return joySuccSummernote(viewId, hiddenId, oldWorkContent);
        },
        summernoteReadOnly: function (viewId, content) {
            return joySuccSummernoteReadOnly(viewId, content);
        },
        jInitTableOption: function (tableId, queryUrl, columns, queryParams, pageList) {
            initTableOption(tableId, queryUrl, columns, queryParams, pageList);
        },
        jInitTableOptionNoPage: function (tableId, queryUrl, columns, queryParams) {
            initTableOptionNoPage(tableId, queryUrl, columns, queryParams);
        },
        jSearchTable: function (btnSearchId, tableId, searchFormId) {
            searchTable(btnSearchId, tableId, searchFormId);
        },
        jSearchZtree: function (searchId, treeId) {
            searchZtree(searchId, treeId);
        },
        juuid: function () {
            return uuid();
        },
        /**
         * 弹出页面
         */
        layerOpenHtml: function (width, height, url, endFun) {
            return layer.open({
                type: 2,
                title: false,
                area: [width, height],
                fix: false, //不固定
                scrollbar: false,
                closeBtn: 1,
                content: url,
                end: endFun,
            });
        },
        /**
         * 端口布局 右上角  X  去除
         */
        OpenPHtml: function (width, height, url, endFun) {
            return layer.open({
                type: 2,
                title: false,
                area: [width, height],
                fix: false, //不固定
                scrollbar: false,
                closeBtn: 1,
                content: url,
                end: endFun
            });
        }
        ,
        openView: function () {
            $("#openProtLayOutView").on("click", function () {
                /**
                 * 跳转到端口布局
                 */
                JoySuccCommon.layerOpenHtml("85%", "95%", root + "/custom/pages/MainApp/PortInformation/index.html", function () {
                    //点击关闭刷新端口数列表
                    $("#datePortId").bootstrapTable('refresh');

                    $("#powerPortId").bootstrapTable('refresh');
                });
            });
        }
        , layerTips: function (title, id) {
            layer.tips(title, id, {
                tips: [1, '#3595CC'],
                time: 4000
            });
        }
        /**
         * 重置事件
         * @param formId 表单id
         * @param resetId 重置按钮ID
         */
        , joySuccReset: function (formId, resetId, fun) {
            joySuccReset(formId, resetId, fun);
        }
        /**
         * 初始化下拉框的三级联动查询
         *  @param firstId 第一级联动id
         *  @param secondId 第二级联动id
         *  @param thirdId 第三级联动id
         *  @param secondType 修改时返回的第二级联动的默认值，添加时默认为空
         *  @param thirdType 修改时返回的第三级联动的默认值，添加时默认为空
         */
        , joySuccSelectDictionary: function (firstId, secondId, thirdId, secondType, thirdType) {
            selectDictionaryStart(firstId, secondId, secondType);//加载设备分类下拉框的option
            selectDictionary(secondId, thirdId, secondType, thirdType);//加载设备类型下拉框的option
        }
        /**
         * 关闭事件
         * @param closeId 取消按钮ID
         */
        , joySuccClose: function (closeId) {
            joySuccClose(closeId);
        }
        /**
         * 加载初始化时间范围的控件
         */
        , joySuccInitDateRange: function (divId) {
            initDateRange(divId);
        }, JtoTransferredStr: function (str) {
            return transferredStr(str);
        },
        releaseAlarms: function (releaseAlarmId, tableId, url) {
            releaseAlarms(releaseAlarmId, tableId, url);
        }, releaseThisTableAllAlarms: function (releaseAlarmId, tableId, url) {
            releaseThisTableAllAlarms(releaseAlarmId, tableId, url);
        }
        /**
         * 表单验证绑定事件
         * @param url 地址
         * @param method 请求方法
         * @param formId 表单id
         */, joySuccFormValidateCilent: function (formId) {
            joySuccFormValidateCilent(formId);
        }
        , joySuccFormValidate: function (url, method, formId, cancelFunction) {
            joySuccFormValidate(url, method, formId, cancelFunction);
        }
        , joySuccFormValidate2: function (url, method, formId) {
            joySuccFormValidate2(url, method, formId);
        }, joySuccFormValidate3: function (url, method, formId, $table, fun) {
            joySuccFormValidate3(url, method, formId, $table, fun);
        }
        /**
         * 非弹出表单验证绑定事件
         * @param url 地址
         * @param method 请求方法
         * @param formId 表单id
         */
        , joySuccNonPopFormValidate: function (url, method, formId, table) {
            joySuccNonPopFormValidate(url, method, formId, table);
        }
        /**
         * 删除事件
         * @param deleteId:删除按钮Id
         * @param url:地址
         * @param libTable:表单
         */
        , joySuccDelete: function (deleteId, url, libTable, opt) {
            joySuccDelete(deleteId, url, libTable, opt);
        },
        joySuccNonPopFormDelete: function (deleteId, url, libTable) {
            joySuccNonPopFormDelete(deleteId, url, libTable);
        }
        , joySuccParentLayerMsg: function (msg) {
            joySuccParentLayerMsg(msg);
        }
        , joySuccLayerMsg: function (index, msg) {
            joySuccLayerMsg(index, msg);
        }
        ,
        jgetAreaS: function (AreaId, roomId) {
            getAreaS(AreaId, roomId);
        },
        jselectSystemName: function (systemNameId) {
            selectSystemName(systemNameId);
        },
        jinitDate: function (datetimepicker) {
            ininDate(datetimepicker);
        }
        /**
         * 刷新表格
         * @param tableId
         */
        , joySuccRefreshTable: function (tableId) {
            refreshTable(tableId);
        }
        , getContextPath: function () {
            return getContextPath();
        },
        JMyFormat: function (time, format) {
            return MyFormat(time, format);
        }, joySuccPSweetAlertSuccess: function (title) {
            joySuccPSweetAlertSuccess(title);
        }, joySuccPSweetAlertFail: function (title) {
            joySuccPSweetAlertFail(title);
        }
        , joySuccSweetAlertSuccess: function (title) {
            joySuccSweetAlertSuccess(title);
        }, joySuccSweetAlertFail: function (title) {
            joySuccSweetAlertFail(title);
        },
        joySuccgetAllAllroomByUser: function (selectId, value, fun) {
            getAllAllroomByUser(selectId, value, fun)
        },
        joySuccgetAllAllroomByUserOnlyRoom: function (selectId, value, fun) {
            getAllAllOnlyRoom(selectId, value, fun)
        },
        //根据机房ID查询所有区域
        joySuccgetAllAllAreaByRoomId: function (roomId, selectId, value, fun) {
            getAllAllAreaByRoomId(roomId, selectId, value, fun)
        },
        //根据父ID查询数据字典所有子节点
        joySuccgetInfoInSysDicByParentCode: function (parentcode, selectId, value, fun) {
            getInfoInSysDicByParentCode(parentcode, selectId, value, fun);
        },

        //查询所有部门信息
        joySuccgetAllDepInfo: function (selectId, value, fun) {
            getAllDepInfo(selectId, value, fun);
        },
        //根据部门信息查询所有用户
        joySuccgetUserInfoByDepId: function (depId, selectId, value, fun) {
            getUserInfoByDepId(depId, selectId, value, fun);

        },
        joySuccUserByDeoChange: function (depId, userId) {
            $("#" + depId).on("change", function () {
                getUserInfoByDepId($("#" + depId).val(), userId);
            });
        },
        getBpmPath: function () {
            return bpmPath;
        },
        getBpmBpd: function () {
            var BpmBpd = {
                USER_IN_OUT: "FLOW-b33b3335-07d1-47f2-a813-afea4776c692",//人员进出门FLOW-e6ca8e50-6873-4a4b-a56a-82cb7b40aea2
                EQUIP_IN_OUT: "FLOW-e8974336-2a9c-4404-ad98-6412cf838d97",//设备进出门
                STORAGE: "FLOW-70205380-a92c-40c4-a289-d9ae280aeed6",//入库
                OUT_BOUND: "FLOW-514dbf19-74ef-4cdf-9b3f-7a2da4d7d935",//出库
                ON_SHELL: "FLOW-b9c2789f-fde9-4180-846f-a13d45245292",//上架
                OFF_SHELL: "FLOW-36e39df4-da4d-43da-ae52-30e876dfcfae",//下架
                ALLOCATION: "FLOW-7dfe6282-9531-40f2-a234-b57b4ba8856f",//调拨FLOW-7dfe6282-9531-40f2-a234-b57b4ba8856f
                SCRAP: "FLOW-3f4ecee6-5cae-4c88-be88-ab70ee6f4ec5",//报废FLOW-3f4ecee6-5cae-4c88-be88-ab70ee6f4ec5
                SHELVES: "FLOW-9886a1cb-a317-4704-b8e9-17363ad1a05a",//上架4.1版本
                OFF_SHELVES: "FLOW-5f034525-da82-462b-88c5-d4a8ed798b12",//下架4.1版本
                DISCARD: "FLOW-7f30a726-f433-4dd2-953d-f930e67b2166"//报废4.1版本
            }
            return BpmBpd;
        },
        getOpenSize: function () {
            var WidthHight = {
                MAX_WIDTH: "95%",// 最大宽度
                MAX_HEIGHT: "95%",//最大高度
                MEDIUM_WIDTH: "80%",//中等宽度
                MEDIUM_HEIGHT: "85%",//中等高度
                MINI_WIDTH: "70%",//最小宽度
                MINI_HEIGHT: "75%",//最小高度
            }
            return WidthHight;
        }
        //获取当地时区的时间
        , getLocalTimeZone: function (t, utc) {
            return getLocalTimeZone(t, utc);
        }
    }
}();