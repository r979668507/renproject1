package com.itrjp.framework.common.filter;

import java.lang.annotation.*;

/**
 *自定义注解 拦截Controller
 */
@Target({ElementType.PARAMETER, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SystemServiceLog {

    String description()  default "";//动作描述
    enum OperateType{ ADD,UPDATE, DELETE, SEARCH ,LOGIN,LOGOUT,DOWNLOAD,UPLOAD ,START,STOP};//操作类型
    OperateType type() default OperateType.SEARCH;
    String modular() default "";//模块
}

