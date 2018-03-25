package com.itrjp.framework.common.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * swagger配置
 *
 * @author zhangqing
 * @date 2017年03月28日
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket visualApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("visual")
                .apiInfo(visualInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.itrjp.dcim.visual.controller"))
                .paths(PathSelectors.any()).build();
    }
    @Bean
    public Docket mobileApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("mobile")
                .apiInfo(mobileInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.itrjp.dcim.mobile.controller"))
                .paths(PathSelectors.any()).build();
    }


    private ApiInfo visualInfo() {
        return new ApiInfoBuilder()
                .title("北京卓益达科技有限公司可视化接口规范")
                .description("")
                .termsOfServiceUrl("")
                .contact("zhangqing")
                .version("1.0")
                .build();
    }
    private ApiInfo mobileInfo() {
        return new ApiInfoBuilder()
                .title("北京卓益达科技有限公司手持接口规范")
                .description("")
                .termsOfServiceUrl("")
                .contact("zhangqing")
                .version("1.0")
                .build();
    }
}
