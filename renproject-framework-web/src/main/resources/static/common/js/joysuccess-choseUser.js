//@source=initChosePage;
var JoySuccChoseUser = function () {
    var root = JoySuccCommon.getContextPath();
    var setting = {
        view: {
            showLine: true,//不显示连线关系
            showIcon: false
        },
        data: {
            simpleData: {
                enable: true,
                rootPId: 'ORG-100',
                idKey: "id",
                pIdKey: "pid",
            }
        },
        check: {
            enable: true,//在节点前显示checkbox
            chkStyle: "checkBox",
            chkboxType: {"Y": "", "N": ""}//父节点和字节不级联
        },
        callback: {
            onCheck: function (event, treeId, treeNode) {
                var userZtree = $.fn.zTree.getZTreeObj("userZtree");
                var depZtree = $.fn.zTree.getZTreeObj("depZtree");
                var groupZtree = $.fn.zTree.getZTreeObj("groupZtree");
                var user_node = userZtree.getNodeByParam("id", treeNode.id, null);
                var dep_node = depZtree.getNodeByParam("id", treeNode.id, null);
                var group_node = groupZtree.getNodeByParam("id", treeNode.id, null);
                if (user_node) {
                    userZtree.checkNode(user_node, treeNode.checked, true);
                }
                if (dep_node) {
                    depZtree.checkNode(dep_node, treeNode.checked, true);
                }
                if (group_node) {
                    groupZtree.checkNode(group_node, treeNode.checked, true);
                }
            },
            beforeCheck: function (treeId, treeNode) {
                var result = $.inArray(treeNode.id, forceChose);
                if (result != -1) {
                    layer.alert(treeNode.name + '为必选项');
                    return false;
                }
            }
        }
    };
    var setting_Single = {
        view: {
            showLine: true,//不显示连线关系
            showIcon: false
        },
        data: {
            simpleData: {
                enable: true,
                rootPId: 'ORG-100',
                idKey: "id",
                pIdKey: "pid",
            }
        },
        check: {
            enable: true,//在节点前显示checkbox
            chkStyle: "radio",
            radioType: 'all',
            chkboxType: {"Y": "", "N": ""}//父节点和字节不级联
        },
        callback: {
            onCheck: function (event, treeId, treeNode) {
                var userZtree = $.fn.zTree.getZTreeObj("userZtree");
                var depZtree = $.fn.zTree.getZTreeObj("depZtree");
                var groupZtree = $.fn.zTree.getZTreeObj("groupZtree");
                var user_node = userZtree.getNodeByParam("id", treeNode.id, null);
                var dep_node = depZtree.getNodeByParam("id", treeNode.id, null);
                var group_node = groupZtree.getNodeByParam("id", treeNode.id, null);
                if (user_node) {
                    userZtree.checkNode(user_node, treeNode.checked, true);
                }
                if (dep_node) {
                    depZtree.checkNode(dep_node, treeNode.checked, true);
                }
                if (group_node) {
                    groupZtree.checkNode(group_node, treeNode.checked, true);
                }
            }, beforeCheck: function (treeId, treeNode) {
                var result = $.inArray(treeNode.id, forceChose);
                if (result != -1) {
                    layer.alert(treeNode.name + '为必选项');
                    return false;
                }
            }
        }
    };
    var forceChose = [];

    function getUser(single_, treeId, ids) {
        $.ajax({
            url: root + "/resources/choseUser/getUser",
            type: 'GET',
            cache: false,
            success: function (responseJson) {
                if (responseJson != null) {
                    var treeObj;
                    if (single_) {
                        treeObj = $.fn.zTree.init($("#" + treeId), setting_Single, responseJson);
                    } else {
                        treeObj = $.fn.zTree.init($("#" + treeId), setting, responseJson);
                    }
                    treeObj.expandAll(true);
                    var nodes = treeObj.getNodes();
                    $.each(nodes, function (i, obj) {
                        if (!obj.asUser == true) {
                            if (obj.children == null) {
                                treeObj.hideNode(obj);
                            } else {
                                $(".select_head a[name=" + obj.name + "]").addClass("haveValue");
                            }
                        }
                    });
                    $.each(ids, function (i, obj) {
                        var node = treeObj.getNodeByParam("id", obj, null);
                        if (node) {
                            treeObj.checkNode(node, true, true);
                        }
                    })
                }
            }
        });
    }

    function getUserByDep(single_, treeId, ids) {
        $.ajax({
            url: root + "/resources/choseUser/getUserByDep",
            type: 'GET',
            cache: false,
            success: function (responseJson) {
                if (responseJson != null) {
                    if (single_) {
                        var treeObj = $.fn.zTree.init($("#" + treeId), setting_Single, responseJson);
                    } else {
                        var treeObj = $.fn.zTree.init($("#" + treeId), setting, responseJson);
                    }
                    var nodes = treeObj.getNodes();
                    treeObj.expandNode(nodes[0]);
                    $.each(ids, function (i, obj) {
                        var node = treeObj.getNodeByParam("id", obj, null);
                        if (node) {
                            treeObj.checkNode(node, true, true);
                        }
                    })
                }
            }
        });
    }

    function getUserByGroup(single_, treeId, ids) {
        $.ajax({
            url: root + "/resources/choseUser/getUserByGroup",
            type: 'GET',
            cache: false,
            success: function (responseJson) {
                if (responseJson != null) {
                    if (single_) {
                        var treeObj = $.fn.zTree.init($("#" + treeId), setting_Single, responseJson);
                    } else {
                        var treeObj = $.fn.zTree.init($("#" + treeId), setting, responseJson);
                    }
                    var nodes = treeObj.getNodes();
                    treeObj.expandNode(nodes[0], true, true, true);
                    $.each(nodes, function (i, obj) {
                        if (!obj.asUser == true) {
                            if (obj.children == null) {
                                treeObj.hideNode(obj);
                            }
                        }
                    });
                    $.each(ids, function (i, obj) {
                        var node = treeObj.getNodeByParam("id", obj, null);
                        if (node) {
                            treeObj.checkNode(node, true, true);
                        }
                    })
                }
            }
        });
    }

    function initClick() {
        $("#allExpend").toggle(
            function () {
                var userZtree = $.fn.zTree.getZTreeObj("userZtree");
                userZtree.expandAll(true);
            },
            function () {
                var userZtree = $.fn.zTree.getZTreeObj("userZtree");
                userZtree.expandAll(false);
            }
        );
        $(".select_head a:not(#allExpend)").die('click').live('click', function (e) {
            var name = $(this).find("b").text();
            var userZtree = $.fn.zTree.getZTreeObj("userZtree");
            var user_node = userZtree.getNodeByParam("name", name, null);
            userZtree.expandAll(false);
            userZtree.expandNode(user_node, true, true, true);
            return;
        });
    }

    function singleSave($el) {
        $("#cancel").die('click').live('click', function (e) {
            $("#" + $el, window.parent.document).val("");
            $("#" + $el, window.parent.document).attr('ids', "");
            parent.$("#" + $el).trigger("change");
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        });
        $("#save").die('click').live('click', function (e) {
            var treeObj = $.fn.zTree.getZTreeObj("userZtree");
            var checkedNodes = treeObj.getCheckedNodes(true);
            if (checkedNodes.length == 0) {
                layer.alert('没有选择人员', {});
                return;
            }
            var id_arr = new Array();
            var name_arr = new Array();
            $.each(checkedNodes, function (i, obj) {
                if (obj.id == 'admin') {
                    id_arr.splice(i);
                    id_arr.unshift(obj.id);
                    name_arr.splice(i);
                    name_arr.unshift(obj.name);
                } else {
                    id_arr.push(obj.id);
                    name_arr.push(obj.name);
                }
            });
            var name = JSON.stringify(name_arr).replace("[", "").replace("]", "").replace(/\"/g, "");
            var ids = JSON.stringify(id_arr).replace("[", "").replace("]", "").replace(/\"/g, "");
            $("#" + $el, window.parent.document).empty();
            $("#" + $el, window.parent.document).append('<option></option>');
            $("#" + $el, window.parent.document).append('<option value="' + ids + '">' + name + '</option>');
            $("#" + $el, window.parent.document).attr('value', ids);
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index); //再执行关闭
        });
    }

    function multipleSave(input, count) {
        $("#cancel").die('click').live('click', function (e) {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        });
        $("#save").die('click').live('click', function (e) {
            var treeObj = $.fn.zTree.getZTreeObj("userZtree");
            var checkedNodes = treeObj.getCheckedNodes(true);
            if (checkedNodes.length == 0) {
                layer.alert('没有选择人员');
                return;
            } else {
                if (checkedNodes.length > count) {
                    layer.alert('你只能选择' + count + "项", {});
                    return;
                }
            }
            var id_arr = new Array();
            var name_arr = new Array();
            $.each(checkedNodes, function (i, obj) {
                if (obj.id == 'admin') {
                    id_arr.splice(i);
                    id_arr.unshift(obj.id);
                    name_arr.splice(i);
                    name_arr.unshift(obj.name);
                } else {
                    id_arr.push(obj.id);
                    name_arr.push(obj.name);
                }
            });
            parent.$("#" + input).tagsinput({
                itemValue: 'id',
                itemText: 'text',
            });
            parent.$("#" + input).tagsinput('removeAll');
            $.each(id_arr, function (i, obj) {
                parent.$("#" + input).tagsinput('add', {id: obj, text: name_arr[i]});
            });
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index); //再执行关闭
        });
    }

    function initMultipleFunction(btn, input, count) {
        if (typeof count != 'number') {
            count = 1000;
        }
        $("#" + btn).on('click', function () {
            var index = layer.open({
                type: 2,
                zIndex: 9999,
                title: "选择人员",
                area: ['341px', '550px'],
                fix: true, //不固定
                scrollbar: false,
                moveType: 1,
                offset: '100px',
                closeBtn: 1,
                content: root + '/resources/choseUser/choseMultiple?btn=' + btn + "&input=" + input + "&count=" + count,
                end: function () {

                }
            });
        })
    }

    function layerOpenChosePage($el) {
        $("#" + $el).on('click', function () {
            $("#" + $el).find('option').css('display', 'none');
            var index = layer.open({
                type: 2,
                zIndex: 9999,
                title: "选择人员",
                area: ['341px', '550px'],
                fix: false, //不固定
                scrollbar: false,
                moveType: 1,
                offset: '100px',
                closeBtn: 1,
                content: root + '/resources/choseUser/choseSingle?$el=' + $el,
                end: function () {
                    $("#" + $el).find('option').css('display', 'none');
                }
            });
        })
    }

    return {
        commInit: function () {
            $(".tab-vertical .tab-item").click(function () {
                $(this).parents(".tab-vertical").find(".tab-item").removeClass("active");
                $(this).addClass("active");
                var index = $(this).index(".tab-item");
                $(".week-content").hide();
                $(".week-content").eq(index).show();
            });
            initClick();
        },
        singleInit: function (inputId) {
            var ids = $("#" + inputId, window.parent.document).attr("value");
            if (ids != null && ids != 'undefine') {
                ids = ids.split(',');
            } else {
                ids = [];
            }
            getUser(true, 'userZtree', ids);
            getUserByDep(true, "depZtree", ids);
            getUserByGroup(true, "groupZtree", ids);
            singleSave(inputId);
        },
        multipleInit: function (input, count) {
            var forceChoseStr = $("#" + input, window.parent.document).attr("forceChose");
            var ids = $("#" + input, window.parent.document).attr("value");
            if (ids != null && ids != 'undefine') {
                ids = ids.split(',');
            } else {
                ids = [];
            }
            if (forceChoseStr != null && forceChoseStr != 'undefine') {
                forceChose = forceChoseStr.split(',');
            } else {
                forceChose = [];
            }
            if (count == 1) {
                getUser(true, 'userZtree', ids, forceChose);
                getUserByDep(true, "depZtree", ids, forceChose);
                getUserByGroup(true, "groupZtree", ids, forceChose);
            } else {
                getUser(false, 'userZtree', ids, forceChose);
                getUserByDep(false, "depZtree", ids, forceChose);
                getUserByGroup(false, "groupZtree", ids, forceChose);
            }
            multipleSave(input, count);
        },
        initSingleClick: function ($el) {
            layerOpenChosePage($el);
        },
        initMultipleClick: function (btn, input, count) {
            initMultipleFunction(btn, input, count);
        }
    }
}();