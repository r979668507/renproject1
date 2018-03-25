package com.itrjp.framework.common.core.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 基础实体类
 *
 * @author zhangqing
 * @date 2016年08月30日
 */
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public  class BaseEntity implements Serializable {
    /**
     * 活跃的，及没有删除的记录
     */
    public static final Integer ACTIVE_FLAG_YES = 1;

    /**
     * 不活跃的，及删除的记录
     */
    public static final Integer ACTIVE_FLAG_NO = 0;

    /**
     * 主键
     */
    @Id
    @Column(name = "ID",length = 32)
    protected String id;

    /**
     * 删除标识
     */
    @Column(name = "ACTIVE_FLAG")
    protected Integer activeFlag;

    /**
     * 创建人
     */
    @Column(length = 32, name = "CREATE_BY")
    protected String createBy;

    /**
     * 创建时间 - 时间戳
     */
    @Column(name = "CREATE_DATE")
    protected Date createDate;

    /**
     * 修改人
     */
    @Column(length = 32, name = "UPDATE_BY")
    protected String updateBy;

    /**
     * 更新时间-时间戳
     */
    @Column(name = "UPDATE_DATE")
    private Date updateDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getActiveFlag() {
        return activeFlag;
    }

    public void setActiveFlag(Integer activeFlag) {
        this.activeFlag = activeFlag;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

}
