package com.itrjp.framework.common.utils;

/**
 * 分页Bean
 *
 * @author zhangqing
 * @date 2016年09月01日
 */
public class PageBean {
    private Integer pageNumber;
    private Integer pageSize;

    public Integer getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
}
