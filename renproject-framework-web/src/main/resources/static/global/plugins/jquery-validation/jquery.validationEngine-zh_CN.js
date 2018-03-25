(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* 此处不可空白",
                    "alertTextCheckboxMultiple": "* 请选择一个项目",
                    "alertTextCheckboxe": "* 您必须钩选此栏",
                    "alertTextDateRange": "* 日期范围不可空白"
                },
                "requiredInFunction": {
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* 无效的 ",
                    "alertText2": " 日期范围"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* 无效的 ",
                    "alertText2": " 时间范围"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* 最少 ",
                    "alertText2": " 个字符"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* 最多 ",
                    "alertText2": " 个字符"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "* 你必需选填其中一个栏位"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* 最小值为"
                },
                "max": {
                    "regex": "none",
                    "alertText": "* 最大值为 "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* 日期必需早于 "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* 日期必需晚于 "
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* 最多选取 ",
                    "alertText2": " 个项目"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* 请选择 ",
                    "alertText2": " 个项目"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* 请输入与上面相同的密码"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* 无效的信用卡号码"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    //"regex": /^([\+][0-9]{1,3}([ \.\-])?)?([\(][0-9]{1,6}[\)])?([0-9 \.\-]{1,32})(([A-Za-z \:]{1,11})?[0-9]{1,4}?)$/,
                	//(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
                	/*"regex": /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,*/
                	"regex": /(^(\d{3,4}-)?\d{7,8})$|((13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})$/,
                	"alertText": "* 无效的电话号码"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "* 邮件地址无效"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* 不是有效的整数"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "* 无效的数字"
                },
                "num": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "* 无效的数字"
                },
                "money": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/,
                    "alertText": "* 无效的数字"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "* 无效的日期，格式必需为 YYYY-MM-DD"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* 无效的 IP 地址"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* Invalid URL"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9]+$/,
                    "alertText": "* 只能填数字"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* 只接受英文字母大小写"
                },
                "onlyLetterNumber": {//有空格无中文字符
                    "regex": /^[0-9a-zA-Z_\ ]+$/,
                    "alertText": "* 不接受特殊字符"
                },
                "onlyLetterNumberNoSpace": {//无空格无中文字符
                "regex": /^[0-9a-zA-Z_]+$/,
                    "alertText": "* 不接受特殊字符"
                },
                "noSpace": {//无空格有中文字符
                    "regex": /^[0-9a-zA-Z_\u4e00-\u9fa5]+$/,
                    "alertText": "* 不接受特殊字符"
                },
                /*"hexadecimal":{
                	"regex": /^([0-9A-Fa-f]{2})+$/,
                    "alertText": "* 只能填写16进制数字"
                },*/
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
	            //tls warning:homegrown not fielded 
                "dateFormat": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* 无效的日期格式"
                },
                "timeFormat": {
                    "regex": /([01]\d|2[0-3]):([0-5]\d)$/,
                    "alertText": "* 无效的日期格式"
                },
                //tls warning:homegrown not fielded 
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* 无效的日期或时间格式",
                    "alertText2": "可接受的格式： ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM 或 ", 
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            },
	        	"ajaxLoginName": {
	               "url": "samples/jpa/exist",
	               /*"alertTextOk": "* 此登录名称可以使用",*/
	               "alertText": "* 此登录名称已被使用",
	              /* "alertTextLoad": "* 正在确认登录名称是否可用，请稍等。"*/
	        	},
                "ajaxCheckUserCode":{
                    "url": "/dcim4/resources/user/checkUserCode",
                    /*"alertTextOk": "* 此编号可以使用",*/
                    "alertText": "* 此编号已被使用",
                   /* "alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                },
	        	"ajaxCheckLoginName": {
	               "url": "/dcim4/resources/user/checkUserName",
                    /*"alertTextOk": "* 此登录名称可以使用",*/
	               "alertText": "* 此登录名称已被使用",
	               /*"alertTextLoad": "* 正在确认登录名称是否可用，请稍等。"*/
	        	},
                "ajaxCheckFunNum": {
                    "url": "/dcim4/resources/function/checkFunNum",
                   /* "alertTextOk": "* 此编号可以使用",*/
                    "alertText": "* 此编号已被使用",
                   /* "alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                },
                "ajaxCheckFunOrderNum":{
                    "url": "/dcim4/resources/function/checkFunOrderNum",
                    /* "alertTextOk": "* 此编号可以使用",*/
                    // "extraData":$("#parentId").val(),
                    "extraDataDynamic": ['#parentId'],
                    "alertText": "* 此排序号已被使用",
                    /* "alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                },
                "ajaxCheckRoleName": {
                    "url": "/dcim4/resources/role/checkRoleName",
                   /* "alertTextOk": "* 此名称可以使用",*/
                    "alertText": "* 此名称已被使用",
                 /*   "alertTextLoad": "* 正在确认该名称是否可用，请稍等。"*/
                },
                "ajaxCheckRoleCode": {
                    "url": "/dcim4/resources/role/checkRoleCode",
                    /*"alertTextOk": "* 此编号可以使用",*/
                    "alertText": "* 此编号已被使用",
                   /* "alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                },
                "ajaxCheckDicCode": {
                    "url": "/dcim4/sm/dictionary/checkDicCode",
                    /*"alertTextOk": "* 此编号可以使用",*/
                    "alertText": "* 此编号已被使用",
                    /*"alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                },
                "ajaxCheckDepName": {
                    "url": "/dcim4/resources/department/checkDepName",
                    /*"alertTextOk": "* 此名称可以使用",*/
                    "alertText": "* 此名称已被使用",
                   /* "alertTextLoad": "* 正在确认名称是否可用，请稍等。"*/
                },
                "ajaxCheckDepCode": {
                    "url": "/dcim4/resources/department/checkDepCode",
                    /*"alertTextOk": "* 此编号可以使用",*/
                    "alertText": "* 此编号已被使用",
                    /*"alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                },
                "ajaxCheckPositionCode":{
                    "url": "/dcim4/sm/positionInformation/checkPosCode",
                    /*"alertTextOk": "* 此编号可以使用",*/
                    "alertText": "* 此编号已被使用",
                    /*"alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                },
                "ajaxCheckPositionName":{
                    "url": "/dcim4/sm/positionInformation/checkPosName",
                    /*"alertTextOk": "* 此编号可以使用",*/
                    "alertText": "* 此名称已被使用",
                    /*"alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                },
                "ajaxCheckSmCode":{
                    "url": "/dcim4/sm/collection/checkSmCode",
                   /* "alertTextOk": "* 此编号可以使用",*/
                    "alertText": "* 此编号已被使用",
                   /* "alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                },
                "ajaxCheckManufacturerNum":{
                    "url": "/dcim4/om/mainVendor/checkNumber",
                    /*"alertTextOk": "* 此编号可以使用",*/
                    "alertText": "* 此编号已被使用",
                    /*"alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                },
                "ajaxCheckManufacturerName":{
                    "url": "/dcim4/om/mainVendor/checkName",
                    /*"alertTextOk": "* 此编号可以使用",*/
                    "alertText": "* 此名称已被使用",
                    /*"alertTextLoad": "* 正在确认编号是否可用，请稍等。"*/
                }
            };
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);
