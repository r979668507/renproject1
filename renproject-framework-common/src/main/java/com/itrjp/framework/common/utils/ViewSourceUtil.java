package com.itrjp.framework.common.utils;

import com.itrjp.framework.common.core.model.BaseEntity;

import java.util.Date;

/**
 * ,工具类
 *
 * @author zhangqing
 * @date 2016年09月06日
 */
public class ViewSourceUtil {
    /**
     * 增加操作的时候,调用当前方法,对共用字段(createBy和createDate)进行初始化
     * @param baseEntity
     */
    public static void insertInit(BaseEntity baseEntity) {
        if(HelpUtils.isNotEmpty(baseEntity)){
            baseEntity.setCreateBy("admin");
            baseEntity.setCreateDate(new Date());
            /* 主键处理 */
            if (HelpUtils.isEmpty(baseEntity.getId())) {
                baseEntity.setId(HelpUtils.getUUID());
            }
        }
    }

    /**
     * 修改操作的时候,调用当前方法,对共用字段(updateBy和updateDate)进行修改
     * @param baseEntity
     */
    public static void updateInit(BaseEntity baseEntity) {
        if(HelpUtils.isNotEmpty(baseEntity)){
            baseEntity.setUpdateBy("admin");
            baseEntity.setUpdateDate(new Date());
        }
    }
}
