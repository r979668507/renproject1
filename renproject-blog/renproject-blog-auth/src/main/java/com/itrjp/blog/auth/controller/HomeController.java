package com.itrjp.blog.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by r9796 on 2018/3/25.
 * @author renjp
 *
 */
@RestController
public class HomeController {
    @RequestMapping(method = RequestMethod.GET,value = {"/","index"})
    public String index(){

        return "index";
    }
}
