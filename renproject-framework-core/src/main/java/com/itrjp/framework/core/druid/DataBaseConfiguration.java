package com.itrjp.framework.core.druid;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

/**
 * 数据源
 *
 * @author zhangqing
 * @date 2016年08月29日
 */
@Configuration
@EnableTransactionManagement
public class DataBaseConfiguration implements EnvironmentAware {
    private RelaxedPropertyResolver propertyResolver;
    @Override
    public void setEnvironment(Environment environment) {
        this.propertyResolver = new RelaxedPropertyResolver(environment, "spring.datasource.");
    }
    @Bean(destroyMethod = "close", initMethod = "init")
    public DataSource writeDataSource() {
        DruidDataSource datasource = new DruidDataSource();
        datasource.setUrl(propertyResolver.getProperty("url"));
        datasource.setDriverClassName(propertyResolver.getProperty("driver-class-name"));
        datasource.setUsername(propertyResolver.getProperty("username"));
        datasource.setPassword(propertyResolver.getProperty("password"));
        //datasource.setInitialSize(Integer.valueOf(propertyResolver.getProperty("initialSize")));
        //datasource.setMinIdle(Integer.valueOf(propertyResolver.getProperty("minIdle")));
        //datasource.setMaxWait(Long.valueOf(propertyResolver.getProperty("maxWait")));
        //datasource.setMaxActive(Integer.valueOf(propertyResolver.getProperty("maxActive")));
        //datasource.setMinEvictableIdleTimeMillis(Long.valueOf(propertyResolver.getProperty("minEvictableIdleTimeMillis")));
        return datasource;
    }
}
