package com.itrjp.framework.common.utils;

/**
 * 返回json格式的数据
 *
 * @author zhangqing
 * @date 2016年11月22日
 */
public class ResponseJson implements java.io.Serializable{
    private static final long serialVersionUID = 1L;

    /** 是否成功返回*/
    private boolean success = false;

    /** 显示信息*/
    private String msg = "";

    /** 数据体*/
    private Object obj = null;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }
}
