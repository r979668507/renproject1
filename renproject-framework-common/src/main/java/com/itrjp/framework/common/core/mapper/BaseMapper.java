package com.itrjp.framework.common.core.mapper;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/**
 * 共用Mapper
 *
 * @author zhangqing
 * @date 2016年08月29日
 */

public interface BaseMapper<T> extends Mapper<T>,MySqlMapper<T> {

}
