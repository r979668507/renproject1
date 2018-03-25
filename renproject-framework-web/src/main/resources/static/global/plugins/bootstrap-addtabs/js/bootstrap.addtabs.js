/**
 * Website: http://git.oschina.net/hbbcs/bootStrap-addTabs
 *
 * Version : 1.5
 *
 * Created by joe on 2016-2-4.
 */

$.fn.addtabs = function (options) {

    Addtabs.options = $.extend({
        content: '', //直接指定所有页面TABS内容
        close: true, //是否可以关闭
        monitor: 'body', //监视的区域
        iframeUse: true, //使用iframe还是ajax
        iframeHeight: '500px', //固定TAB中IFRAME高度,根据需要自己修改
        method: 'init',
        contextmenu: true,//是否使用右键菜单
        obj: $(this),
        callback: function () { //关闭后回调函数
        }
    }, options || {});

    $(Addtabs.options.monitor).on('click', '[data-addtab]', function () {
        Addtabs.add({
            id: $(this).attr('data-addtab'),
            title: $(this).attr('title') ? $(this).attr('title') : $(this).html(),
            content: Addtabs.options.content ? Addtabs.options.content : $(this).attr('content'),
            url: $(this).attr('url'),
            ajax: $(this).attr('ajax') ? true : false,
        });
    });

    Addtabs.options.obj.on('click', '.close-tab', function (envent) {
        var id = $(this).prev("a").attr("aria-controls");
        Addtabs.close(id);
        envent.stopPropagation();
    });

    if (Addtabs.options.contextmenu) {
        //obj上禁用右键菜单
        Addtabs.options.obj.on('contextmenu', 'li[role=presentation]', function () {
            var id = $(this).children('a').attr('aria-controls');
            Addtabs.pop(id, $(this));
            return false;
        });
        //关闭自身
        Addtabs.options.obj.on('click', 'ul.rightMenu a[data-right=remove]', function () {
            var id = $(this).parent("ul").attr("aria-controls");
            if (id.substring(0, 4) != 'tab_') return;
            Addtabs.close(id);
            $('#popMenu').fadeOut();
        });
    }

    Addtabs.options.obj.on('click', 'li[role = "presentation"]', function () {
        $('.activeAvb').removeClass('active activeAvb');
        $(this).find('a').addClass("active activeAvb");
    });

    Addtabs.options.obj.on('mouseover', 'li[role = "presentation"]', function () {
        $(this).find('a').addClass("avb");
        $(this).find('.close-tab').show();
    });

    Addtabs.options.obj.on('mouseleave', 'li[role = "presentation"]', function () {
        $(this).find('a').removeClass("avb");
        $(this).find('.close-tab').hide();
    });

    $(window).resize(function () {
        Addtabs.options.obj.find('iframe').attr('height', Addtabs.options.iframeHeight);
    });

};

window.Addtabs = {
    options: {},
    add: function (opts) {
        $("#showHome").show();
        var id = 'tab_' + opts.id;
        //如果TAB不存在，创建一个新的TAB
        if (!$("#" + id).length) {
            if (opts.url == "/dcim4/custom/index.html") {

            } else {
                 $('.activeAvb').removeClass('active activeAvb');
        $('div[role = "tabpanel"].active').removeClass('active');
                //创建新TAB的title
                var title = $('<li>', {
                    'role': 'presentation',
                    'id': 'tab_' + id,
                    'aria-url': opts.url,
                    'class': 'li-close-tab'
                }).append($('<i style="margin-left:4px;margin-right:4px;">|</i>')).append(
                    $('<a>', {
                        'href': '#' + id,
                        'aria-controls': id,
                        'role': 'tab',
                        'data-toggle': 'tab',
                        'style': 'text-decoration:none;',
                        'class': 'activeAvb'
                    }).html(opts.title));

                //是否允许关闭
                if (Addtabs.options.close) {
                    title.append(
                        $('<i class="close-tab fa fa-times-circle" style="display: none;"></i>')
                    )
                }
                //创建新TAB的内容
                var content = $('<div>', {
                    'class': 'tab-pane',
                    'id': id,
                    'role': 'tabpanel'
                });
                //加入TABS
                Addtabs.options.obj.children('.page-bar').children('.page-breadcrumb').append(title);
                Addtabs.options.obj.children(".tab-content").append(content);
            }
        } else if (!opts.refresh) {
             $('.activeAvb').removeClass('active activeAvb');
        $('div[role = "tabpanel"].active').removeClass('active');
            $('#tab_' + id).addClass('active activeAvb');
            $('#tab_' + id).find('a').addClass('activeAvb');
            $('#' + id).addClass('active');
            return;
        } else {
             $('.activeAvb').removeClass('active activeAvb');
        $('div[role = "tabpanel"].active').removeClass('active');
            var content = $('#' + id);
            content.html('');
        }

        //是否指定TAB内容
        if (opts.content) {
            content.append(opts.content);
        } else if (Addtabs.options.iframeUse && !opts.ajax) {//没有内容，使用IFRAME打开链接
            if (opts.url == "/dcim4/custom/index.html") {
                window.open(opts.url);
            } else {
                content.append(
                    $('<iframe>', {
                        'class': 'iframeClass',
                        'height': Addtabs.options.iframeHeight,
                        'frameborder': "no",
                        'border': "0",
                        'src': opts.url
                    })
                );
            }
        } else {
            $.get(opts.url, function (data) {
                content.append(data);
            });
        }

        //激活TAB
        $('#tab_' + id).addClass('active activeAvb');
        $('#' + id).addClass('active');
    },
    pop: function (id, e) {
        $('body').find('#popMenu').remove();
        var popHtml = $('<ul>', {
            'aria-controls': id,
            'class': 'rightMenu list-group',
            id: 'popMenu',
            'aria-url': e.attr('aria-url')
        }).append(
            '<a href="javascript:void(0);" class="list-group-item" data-right="remove"><i class="glyphicon glyphicon-remove"></i> 关闭此标签</a>'
        );
        popHtml.css({
            'top': e[0].offsetHeight - 10 + 'px',
            'left': e[0].offsetLeft + 50 + 'px'
        });
        popHtml.appendTo(Addtabs.options.obj).fadeIn('slow');
        popHtml.mouseleave(function () {
            $(this).fadeOut('slow');
        });
    },
    close: function (id) {
        //如果关闭的是当前激活的TAB，激活他的前一个TAB
        if (Addtabs.options.obj.find("li.activeAvb").attr('id') === "tab_" + id || Addtabs.options.obj.find("li.active").attr('id') === "tab_" + id) {
            $("#tab_" + id).prev().addClass('active');
            $("#tab_" + id).prev().find('a').addClass('activeAvb');
            $("#" + id).prev().addClass('active');
        }
        //关闭TAB
        $("#tab_" + id).remove();
        $("#" + id).remove();
        Addtabs.options.callback();
    }
}
