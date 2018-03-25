//# sourceURL=joysuccess-table-model.js
/**
 * joysuccess-table-model针对特定业务(表格列表展现,ToolBar按钮为增删改查,弹出框,from表单提交)的共用js
 * 所以这里特定的id是写死的
 * 表格的id为:joyModalTable
 * 弹出框里面表单的id为:joyModalForm
 * 弹出框的id为:joyModal
 */
var JoyTableModal = function () {


    return {
        //初始化表格列表
        init: function (queryUrl,colums) {
            $('#joyModalTable').bootstrapTable({
                method: 'get',
                url: queryUrl,
                dataType: "json",
                striped: false,	 //使表格带有条纹
                sortable: true,
                pagination: true,	//在表格底部显示分页工具栏
                pageSize: 10,
                pageNumber: 1,
                pageList: [5,10,15,20,30],
                idField: "id",  //标识哪个字段为id主键
                showToggle: false,   //名片格式
                cardView: false,//设置为True时显示名片（card）布局
                showColumns: false, //显示隐藏列
                showRefresh: false,  //显示刷新按钮
                singleSelect: false,//复选框只能选择一条记录
                search: false,//是否显示右上角的搜索框
                clickToSelect: true,//点击行即可选中单选/复选框
                sidePagination: "server",//表格分页的位置
                queryParamsType: "", //参数格式,发送标准的RESTFul类型的参数请求
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
                onLoadError: function (data) {

                },
                columns: colums
            });
        },
        //重置form表单和清楚验证
        clearForm:function () {
            $("#joyModalForm")[0].reset();//重置表单
            //清空下拉框值
            $("#joyModalForm select option:first").prop("selected", 'selected');
            $('#joyModalForm select').trigger('change.select2');
            //解除表单验证
            $("#joyModalForm").validationEngine("hideAll");
        },
        //保存表单数据数据
        saveData:function (saveUrl) {

            bootbox.setLocale("zh_CN");
            bootbox.confirm("确定?", function(result) {
                if (result) {
                    $.ajax({
                        type:'post',
                        cache:false,
                        url:saveUrl,
                        data:$("#joyModalForm").serialize(),
                        dataType : "json",
                        success:function(result){
                            $("#joyModal").modal("hide");
                            //resetForm("#"+formId);
                            JoySuccCommon.jsucessToastr("操作成功","操作用户","success");
                            $('#joyModalTable').bootstrapTable('refresh');
                        },
                        beforeSend:function(XMLHttpRequest){
                            //请求之前方法增强处理 ,显示遮罩层
                            Metronic.blockUI({target: '#joyModalForm',animate: true});
                        },
                        complete:function(XMLHttpRequest, textStatus){
                            //请求结束方法增强处理  ,隐藏遮罩层
                            Metronic.unblockUI('#joyModalForm');
                        }
                    });
                }
            });
        },
        //修改表单数据数据
        updateData:function (updateUrl) {
            bootbox.setLocale("zh_CN");
            bootbox.confirm("确定?", function(result) {
                if (result) {
                    $.ajax({
                        type:'put',
                        cache:false,
                        url:updateUrl,
                        data:$("#joyModalForm").serialize(),
                        dataType : "json",
                        success:function(result){
                            $("#joyModal").modal("hide");
                            //resetForm("#"+formId);
                            JoySuccCommon.jsucessToastr("操作成功","操作用户","success");
                            $('#joyModalTable').bootstrapTable('refresh');
                        },
                        beforeSend:function(XMLHttpRequest){
                            //请求之前方法增强处理 ,显示遮罩层
                            Metronic.blockUI({target: '#joyModalForm',animate: true});
                        },
                        complete:function(XMLHttpRequest, textStatus){
                            //请求结束方法增强处理  ,隐藏遮罩层
                            Metronic.unblockUI('#joyModalForm');
                        }
                    });
                }
            });
        },
        //批量删除选中的行
        deleteRows:function (delUrl) {
            $("#deletRow").on("click",function () {
                var selects = $('#joyModalTable').bootstrapTable('getSelections');
                if(selects.length==0){
                    JoySuccCommon.jsucessToastr("请选择需要删除的行","删除用户","warning");
                    return false;
                }
                bootbox.setLocale("zh_CN");
                bootbox.confirm("确定删除?", function(result) {
                    if(result){
                        var idDataAry=[];
                        $.each(selects, function(i, user) {
                            idDataAry.push(user.id);
                        });
                        if(idDataAry.length>0){
                            $.ajax({
                                url: delUrl,
                                method: "DELETE",
                                dataType: "json",
                                contentType:"application/json",//加入contentType,后端需要用requestBody接受参数,此时的参数不在request里面了
                                data: JSON.stringify(idDataAry),
                                success: function (responseJSON) {
                                    if(responseJSON){
                                        JoySuccCommon.jsucessToastr("删除成功","删除用户","success");
                                        $('#joyModalTable').bootstrapTable('refresh');
                                    }else{
                                        JoySuccCommon.jsucessToastr("删除失败,没有选择用户","删除用户","warning");
                                        $('#joyModalTable').bootstrapTable('refresh');
                                    }
                                },
                                error: function (response) {
                                    JoySuccCommon.jsucessToastr("删除失败","删除用户","warning");
                                }
                            });
                        }
                    }
                });
            });
        },
        validateForm:function (formId,addSaveId,editSaveId,url) {
            /**
             * 参数说明
             * formId:表单id
             * addSaveId:新增时的保存按钮id
             * editSaveId：编辑时的保存按钮id
             * url：新增时的保存和编辑时的保存按钮的请求地址
             */
            //给弹出框里面的form表单绑定前端验证
            var validate = $("#"+formId).validationEngine('attach', {
                onValidationComplete : function(form, status) {
                    //如果校验成功
                    if (status) {
                        //如果添加按钮显示(不隐藏)
                        if (!$("#"+addSaveId).is(":hidden")) {
                            //增加操作
                            JoyTableModal.saveData(url)
                        }
                        //如果修改按钮显示(不隐藏)
                        if (!$("#"+editSaveId).is(":hidden")) {
                            JoyTableModal.updateData(url)
                        }

                    }
                }
            });
        },
        doSearch:function () {
            //search按钮绑定查询事件
            $('#dosearch').click(function() {

                var params = $('#joyModalTable').bootstrapTable('getOptions');
                params.queryParams = function(params) {
                    //定义参数
                    var search = {};
                    //遍历form 组装json
                    $.each($("#conSearch").serializeArray(), function(i, field) {
                        //可以添加提交验证
                        if(null!=field.value && ""!=field.value){
                            params[field.name] = field.value;
                        }
                    });
                    return params;
                }
                $('#joyModalTable').bootstrapTable('refresh', params);
            });
        }
    };

}();